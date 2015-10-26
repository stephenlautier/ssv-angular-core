[projectUri]: https://github.com/stephenlautier/ssv-angular-core
[projectGit]: https://github.com/stephenlautier/ssv-angular-core.git
[changeLog]: ./doc/CHANGELOG.md

[contribWiki]: ./doc/CONTRIBUTION.md
[releaseWorkflowWiki]: ./doc/CONTRIBUTION.md


# ssv-angular-angular
ssv angular core components and services

In order to contribute please read the [Contribution guidelines][contribWiki].

**Quick links**

[Change logs][changeLog] | [Project Repository][projectUri] | [Contribution guidelines][contribWiki]

# Getting Started


## Setup Machine for Development
Install/setup the following:

- NodeJS
- Visual Studio Code or similar code editor
- TypeScript 1.6+
- SourceTree, SmartGit (or similar)
- Ensure to install **global NPM modules** using the following:


```
npm install -g git bower gulp tsd karma-cli
```


### Cloning Repo

- Open SourceTree
- Clone project repo from [project git][projectGit]
- Switch to `dev` branch


## Project Setup
The following process need to be executed in order to get started.

```
npm install
```
**NOTE: npm install will automatically install bower as if manually invoking `bower install`** 


## Building the code

```
gulp build
```
In order to view all other tasks invoke `gulp` or check the gulp tasks directly.

## Running the tests

```
gulp test
```


## Development utils

### Trigger gulp watch
Handles compiling of changes.
```
gulp watch
```


### Running Continuous Tests
Spawns test runner and keep watching for changes.
```
gulp tdd
```


## Preparation for Release

```
gulp prepare-release --bump major|minor|patch|prerelease (default: patch)
```
Check out the [release workflow guide][releaseWorkflowWiki] in order to guide you creating a release and distributing it.