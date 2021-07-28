import { Command } from '@oclif/command'
import { P2P, Protocol } from "@tunl/lib"
import cli from 'cli-ux'

export default class Expose extends Command {
  static description = 'expose local port'

  static examples = [
    `$ tunneler expose 8080`,
  ]

  static args = [{ name: 'port' }]

  async run() {
    const { args } = this.parse(Expose)
    const p2p = await P2P.create()

    const protocol = new Protocol(p2p, [args.port])
    await protocol.handlePorts()

    await p2p.init()
    cli.info('ready, port', args.port, 'have been exposed \nshare fresh connection param to open a tunnel on another machine')

    p2p.on('peer:discovery', (peerId) => {
      cli.info(`discovered peer: ${peerId.toB58String()}`)
    })

    p2p.connectionManager.on('peer:connect', (connection) => {
      cli.info(`peer connected: ${connection.remotePeer.toB58String()}`)
    })

    p2p.connectionManager.on('peer:disconnect', (connection) => {
      cli.warn(`peer disconnected: ${connection.remotePeer.toB58String()}`)
    })

    p2p.natManager.start()

    cli.info("connection param:\n\t", p2p.getConnectionData())

    p2p.addressManager.on('change:addresses', () => {
      cli.info("\n new connection param:\n\t", p2p.getConnectionData())
    })
  }
}
