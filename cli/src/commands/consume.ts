import { Command } from '@oclif/command'
import { P2P, Protocol } from "@tunl/lib"
import cli from 'cli-ux'

export default class Consume extends Command {
  static description = 'tunnel remote port'

  static examples = [
    `$ tunneler consume 8080 8081 base64_connection_param==`,
  ]

  static args = [{ name: 'remotePort' }, { name: 'localPort' }, { name: 'connParam' }]

  async run() {
    let { args: { localPort, remotePort, connParam } } = this.parse(Consume)
    const p2p = await P2P.create()

    const protocol = new Protocol(p2p)
    await p2p.init()

    const { peerId, multiaddrs } = p2p.getHostData(connParam)

    if (!remotePort) {
      remotePort = await cli.prompt('remotePort:')
    }

    if (!localPort) {
      localPort = await cli.prompt('localPort:')
    }

    if (!connParam) {
      connParam = await cli.prompt('connParam:', { type: 'mask' })
    }

    p2p.addHost(peerId, multiaddrs)

    p2p.on('peer:discovery', (peerId) => {
      cli.info(`discovered peer: ${peerId.toB58String()}`)
    })

    p2p.connectionManager.on('peer:connect', (connection) => {
      cli.info(`peer connected: ${connection.remotePeer.toB58String()}`)
    })

    p2p.connectionManager.on('peer:disconnect', (connection) => {
      const b58 = connection.remotePeer.toB58String()

      cli.info(`peer disconnected: ${b58}`)

      if (peerId.toB58String() === b58) {
        cli.warn('peer that have exposed port has been disconnected, exiting')
        process.exit()
      }
    })

    await protocol.listen(peerId.toB58String(), remotePort, localPort)
    cli.info('ready to accept connections on', `:${localPort}`)
  }
}
