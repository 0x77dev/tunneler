@tunl/cli
=============

Tunneler CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@tunl/cli.svg)](https://npmjs.org/package/@tunl/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@tunl/cli.svg)](https://npmjs.org/package/@tunl/cli)
[![License](https://img.shields.io/npm/l/@tunl/cli.svg)](https://github.com/0x77dev/tunneler/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @tunl/cli
$ tunneler COMMAND
running command...
$ tunneler (-v|--version|version)
@tunl/cli/0.1.1 darwin-x64 node-v16.4.2
$ tunneler --help [COMMAND]
USAGE
  $ tunneler COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`tunneler consume [REMOTEPORT] [LOCALPORT] [CONNPARAM]`](#tunneler-consume-remoteport-localport-connparam)
* [`tunneler expose [PORT]`](#tunneler-expose-port)
* [`tunneler help [COMMAND]`](#tunneler-help-command)

## `tunneler consume [REMOTEPORT] [LOCALPORT] [CONNPARAM]`

tunnel remote port

```
USAGE
  $ tunneler consume [REMOTEPORT] [LOCALPORT] [CONNPARAM]

EXAMPLE
  $ tunneler consume 8080 8081 base64_connection_param==
```

_See code: [src/commands/consume.ts](https://github.com/0x77dev/tunneler/blob/v0.1.1/src/commands/consume.ts)_

## `tunneler expose [PORT]`

expose local port

```
USAGE
  $ tunneler expose [PORT]

EXAMPLE
  $ tunneler expose 8080
```

_See code: [src/commands/expose.ts](https://github.com/0x77dev/tunneler/blob/v0.1.1/src/commands/expose.ts)_

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
