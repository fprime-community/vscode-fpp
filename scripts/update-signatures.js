const fs = require('fs');

const signatures = JSON.parse(fs.readFileSync(process.argv[2]));
const parser = fs.readFileSync(process.argv[3], {encoding: 'utf-8' });

function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function log(msg) {
    process.stderr.write(msg + '\n');
}

for (const [key, signature] of Object.entries(signatures)) {
    if (signature.stateMap?.offset !== undefined) {
        const idx = parser.indexOf(`// @RuleVersion(0)\n\tpublic ${key}(): ${capitalizeWord(key)}Context {`);
        if (idx < 0) {
            log(`could not find ${key}: public ${key}(): ${capitalizeWord(key)}Context {`);
            continue;
        }

        const stateIdx = parser.substring(idx).indexOf("this.state = ");
        if (stateIdx < 0) {
            log(`could not find state setting of ${key}`);
            continue;
        }

        const stateIdxActual = stateIdx + "this.state = ".length;
        const semiIdx = parser.substring(idx + stateIdxActual).indexOf(';');
        if (semiIdx < 0) {
            log(`could not find semi colon after state setting of ${key}`);
            continue;
        }

        const numStr = parser.substring(idx + stateIdxActual, idx + stateIdxActual + semiIdx);
        const state = Number.parseInt(numStr);
        if (Number.isNaN(state)) {
            log(`could not parse state number '${numStr}' for ${key}`);
            continue;
        }

        if (signature.stateMap.offset !== state) {
            log(`updating ${key} from ${signature.stateMap.offset} to ${state}`);
            signature.stateMap.offset = state;
        }
    }
}

fs.writeFileSync(process.argv[2], JSON.stringify(signatures, undefined, 4));
