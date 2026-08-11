import * as vscode from 'vscode';
import { execFile } from 'child_process';

import * as Settings from './settings';
import { PIP_PACKAGE, pipInstall, ServerResolution } from './serverPath';

/**
 * Installed-version detection and PyPI update checks for `fprime-fpp-lsp`.
 *
 * The server binary is a clap program built with `#[command(version)]`, so
 * `fpp_lsp_server --version` prints its package version. We compare that against
 * the latest release on PyPI and, when newer, offer to `pip install --upgrade`.
 */

/** How often to poll PyPI, at most, regardless of window reloads. */
const CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24h
const LAST_CHECK_KEY = 'fpp.lastUpdateCheck';
/** A `version` the user chose to skip; we won't re-prompt for it. */
const SKIPPED_VERSION_KEY = 'fpp.skippedUpdateVersion';

/** Run `<exe> --version` and return the parsed semver-ish string, or undefined. */
export function installedVersion(serverPath: string): Promise<string | undefined> {
    return new Promise((resolve) => {
        execFile(serverPath, ['--version'], { timeout: 5000 }, (err, stdout) => {
            if (err) {
                resolve(undefined);
                return;
            }
            // clap prints e.g. "fpp_lsp_server 0.3.1"; grab the version token.
            const match = stdout.match(/(\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?)/);
            resolve(match?.[1]);
        });
    });
}

/** Result of a PyPI lookup: the version, or a human-readable failure reason. */
interface LatestResult {
    version?: string;
    error?: string;
}

/**
 * Fetch the latest released version of the package from PyPI.
 *
 * Uses the global `fetch` (undici, provided by VSCode's Node runtime) rather
 * than the `https` module: VSCode's proxy agent monkey-patches `https` when
 * `http.proxySupport` is `override` (the default), and its llhttp parser can
 * fail on some responses with "Parse Error: JS Exception". `fetch` avoids that
 * patched path while still honoring the user's proxy. On any failure we return a
 * reason string so the caller can surface it.
 */
async function latestVersion(): Promise<LatestResult> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
        const res = await fetch(`https://pypi.org/pypi/${PIP_PACKAGE}/json`, {
            headers: { 'Accept': 'application/json', 'User-Agent': 'fpp-vscode-extension' },
            signal: controller.signal,
        });
        if (!res.ok) {
            return { error: `PyPI returned HTTP ${res.status}` };
        }
        const data = await res.json() as { info?: { version?: unknown } };
        const version = data?.info?.version;
        return typeof version === 'string'
            ? { version }
            : { error: 'PyPI response missing info.version' };
    } catch (e) {
        const err = e as Error;
        return { error: err.name === 'AbortError' ? 'request timed out' : err.message };
    } finally {
        clearTimeout(timeout);
    }
}

/**
 * Compare two dotted version strings. Returns >0 if `a` > `b`, <0 if `a` < `b`,
 * 0 if equal. Pre-release/build suffixes on a component are ignored for ordering.
 */
export function compareVersions(a: string, b: string): number {
    const parts = (v: string) =>
        v.split('.').map((p) => parseInt(p, 10) || 0);
    const pa = parts(a);
    const pb = parts(b);
    const len = Math.max(pa.length, pb.length);
    for (let i = 0; i < len; i++) {
        const d = (pa[i] ?? 0) - (pb[i] ?? 0);
        if (d !== 0) {
            return d > 0 ? 1 : -1;
        }
    }
    return 0;
}

/**
 * Check PyPI for a newer `fprime-fpp-lsp` and, if the resolved server lives in a
 * venv we can upgrade, prompt the user. `force` bypasses the interval throttle
 * and the "skipped version" memory (used by the manual command).
 *
 * Returns true if an upgrade was installed (so the caller can restart the client).
 */
export async function checkForUpdate(
    context: vscode.ExtensionContext,
    resolved: ServerResolution,
    installed: string | undefined,
    force: boolean
): Promise<boolean> {
    if (!force && !Settings.checkForUpdates()) {
        return false;
    }
    // We can only offer an in-place upgrade for venv installs.
    if (!resolved.pythonPath || !installed) {
        if (force) {
            vscode.window.showInformationMessage(
                'FPP: automatic updates are only available for venv installs of ' +
                    `${PIP_PACKAGE}.`
            );
        }
        return false;
    }

    if (!force) {
        const last = context.globalState.get<number>(LAST_CHECK_KEY) ?? 0;
        if (Date.now() - last < CHECK_INTERVAL_MS) {
            return false;
        }
    }

    const { version: latest, error } = await latestVersion();
    if (!latest) {
        // Don't advance the throttle on failure, so the next window reload retries
        // rather than staying silent for a day on a transient network blip.
        if (force) {
            vscode.window.showWarningMessage(
                `FPP: could not reach PyPI to check for ${PIP_PACKAGE} updates` +
                    (error ? ` (${error}).` : '.')
            );
        }
        return false;
    }
    // Successful fetch — record it so we don't re-poll for the interval.
    await context.globalState.update(LAST_CHECK_KEY, Date.now());

    if (compareVersions(latest, installed) <= 0) {
        if (force) {
            vscode.window.showInformationMessage(
                `FPP: ${PIP_PACKAGE} is up to date (${installed}).`
            );
        }
        return false;
    }

    if (!force && context.globalState.get<string>(SKIPPED_VERSION_KEY) === latest) {
        return false;
    }

    const choice = await vscode.window.showInformationMessage(
        `A new FPP language server is available (${installed} → ${latest}). Update?`,
        'Update',
        'Skip This Version'
    );
    if (choice === 'Skip This Version') {
        await context.globalState.update(SKIPPED_VERSION_KEY, latest);
        return false;
    }
    if (choice !== 'Update') {
        return false;
    }

    return await pipInstall(resolved.pythonPath, true);
}
