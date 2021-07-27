# Tunneler 

Free, open-source, [libp2p](https://libp2p.io) based TCP tunneling toolkit with built-in encryption and relay written in Node.js

## Basic usage with CLI

### Requirements

- Node.js 14.x or newer
- `yarn` or `npm`
- Internet connection

### Installing

| NPM                  | Yarn *(recommended)*        |
| -------------------- | --------------------------- |
| `npm i -g @tunl/cli` | `yarn global add @tunl/cli` |

### Forwarding local port

```console
$ tunl expose {{localPort}}
Connection Param:
 ey...==
```

### Connecting to forwarded port

```console
$ tunl consume {{remotePort}} {{localPort}} ey...==
```

## Source

- [@tunl/cli](./cli)
- [@tunl/lib](./lib/docs)
- [@tunl/relay](./relay)
