# Changelog

All notable changes to this project will be documented in this file.

## [1.0.24] - 2025-07-23

- Annotate enum default value and support any typename for enum underyling type.

## [1.0.23] - 2025-07-23

- Fixed a packaging issue

## [1.0.22] - 2025-07-23

- FPP Topology Diagrams as a webview

## [1.0.21] - 2025-07-02

- Resolve imported port interfaces in component definitions

## [1.0.20] - 2025-06-06

- Improve handling of broken includes

## [1.0.19] - 2025-05-06

- Added interfaces (a future feature)
- Telemetry packet syntax
- Cleaned more annotation bugs

## [1.0.18] - 2025-05-06

- Fixes the handling of special DP ports by adding their instances to the symbol table and resolving the keyword combinations

## [1.0.17] - 2025-05-06

- Fixed some subtle parsing issues with comments and annotations
- Fixed parsing errors with non-literal string type sizes
- Fixed parsing issue with choice definitions
- Added type checking on string size type

## [1.0.16] - 2025-04-14

- Update QueueFullBehavior to recognize hook keyword

## [1.0.15] - 2025-02-26

- Fix recursive type checking in complex expr types

## [1.0.14] - 2025-01-31

- Missed state annotation on top-level state machine initial transisition

## [1.0.13] - 2025-01-31

- Fixed a bug that caused reparse requests to overlap and cancel each other. That meant only their initial project load would actually parse the file, any subsequent changes were not parsed.

## [1.0.12] - 2025-01-31

- Added a second project scanning mode for loading all .fpp files in workspace
- Cleaned up parse queuing
- Cleaned up some issues with .fppi parenting
- Fixed some edge case parsing errors with special ports

## [1.0.11] - 2025-01-29

- Fixed scoping sematics of state machine states
- Added completions for a couple state machine expressions

## [1.0.10] - 2025-01-29

- Added support for state machines

## [1.0.9] - 2024-06-12

- Re-release of 1.0.8 since package.json had some incorrect setting contributions

## [1.0.8] - 2024-06-12

- Configure FPP locs search paths and select from locs found in project

## [1.0.7] - 2024-03-18

- Clean up some annotation parsing
- Fix resolution of nested (included) ports
- Update all parent files of included `.fppi`
- Place `$` before keyworded completion item

## [1.0.6] - 2024-01-11

Bug fixes

## [1.0.5] - 2024-01-10

Added support for data product records and containers.

## [1.0.1] - 2023-07-12

### Fixed

- Annotation refreshes not running through all files causing missed references

## [1.0.0] - 2023-07-12

- Initial release
