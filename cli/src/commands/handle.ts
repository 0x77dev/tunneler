import { Command } from '@oclif/command'
import { P2P, Protocol } from "@tunl/lib"

export default class Handle extends Command {
  static description = 'expose local port'

  static examples = [
    `$ tunneler handle 8080`,
  ]

  static args = [{ name: 'port' }]

  async run() {
    const { args } = this.parse(Handle)
    const p2p = await P2P.create()

    const protocol = new Protocol(p2p, [args.port])
    await protocol.handlePorts()
    await p2p.init()

    p2p.on('peer:discovery', (peerId) => {
      console.log(`discovered peer: ${peerId.toB58String()}`)
    })

    p2p.connectionManager.on('peer:disconnect', (connection) => {
      console.log(`peer disconnected: ${connection.remotePeer.toB58String()}`)
    })

    p2p.natManager.start()

    this.log("Connection Param:\n", p2p.getConnectionData())
  }
}
