@tunneler/cli
=============

Tunneler CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@tunneler/cli.svg)](https://npmjs.org/package/@tunneler/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@tunneler/cli.svg)](https://npmjs.org/package/@tunneler/cli)
[![License](https://img.shields.io/npm/l/@tunneler/cli.svg)](https://github.com/0x77dev/tunneler/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @tunneler/cli
$ tunneler COMMAND
running command...
$ tunneler (-v|--version|version)
@tunneler/cli/0.0.0 darwin-x64 node-v16.4.2
$ tunneler --help [COMMAND]
USAGE
  $ tunneler COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`tunneler hello [FILE]`](#tunneler-hello-file)
* [`tunneler help [COMMAND]`](#tunneler-help-command)

## `tunneler hello [FILE]`

describe the command here

```
USAGE
  $ tunneler hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ tunneler hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/0x77dev/tunneler/blob/v0.0.0/src/commands/hello.ts)_

## `tunneler help [COMMAND]`

display help for tunneler

```
USAGE
  $ tunneler help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
