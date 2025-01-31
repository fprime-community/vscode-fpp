# Changelog

All notable changes to this project will be documented in this file.

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
