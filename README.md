# Introduction

## Prerequisites

- [Node.js](https://nodejs.org) `7.9.0`

> Note: [nvm](https://github.com/creationix/nvm#installation) is recommended, so you can run `nvm use` to use recommended version of Node.js.

- [Yarn](https://yarnpkg.com/en/docs/install) `0.23.2` or higher
- [Docker Community Edition](https://www.docker.com/community-edition) `17.03.0-ce` or higher
- [Docker Compose](https://docs.docker.com/compose/install) `1.11.1` or higher
- [Angular CLI](https://github.com/angular/angular-cli#installation) `1.0.0` (installed globally)

## Introduction to Yarn

We use `Yarn` package manager instead of `npm` because it is faster and have better reliability on dependencies versioning. Do not forget to use `yarn` instead of `npm`.

Note that, in addition to `package.json` file, we also have `yarn.lock` file, which is generated/edited on running `yarn` command. For any changes to dependencies, do commit changes in `yarn.lock` along with the changes in `package.json` file.

### Useful Commands

Command | Description
--- | ---
`yarn` or `yarn install` | Install all packages listed in `package.json`.
`yarn add express` | Install package `express` and add as `dependencies` to `package.json`. This is equivalent to `npm install --save express`.
`yarn add --dev express` | Install package `express` and add as `devDependencies` to `package.json`. This is equivalent to `npm install --save-dev express`.
`yarn remove express` | Uninstall package `express` and remove from `package.json`. This is equivalent to `npm uninstall --save/--save-dev express`.
`yarn global add @angular/cli` | Install package `@angular/cli` globally on your machine. This is equivalent to `npm install --global @angular/cli`.
`yarn run test:all` or `yarn test:all` | Run script `test:all` as writen in `package.json` file. Note that unlike the `npm` , you can also omit the `run` keyword.
`yarn outdated` | List all the outdated package, i.e. the locally installed package that has a newer version.

You can have a further read on the commands in [Yarn's Docs](https://yarnpkg.com/en/docs/cli/).
