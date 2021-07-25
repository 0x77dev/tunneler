import { Command } from '@oclif/command'
import { P2P, Protocol } from "@tunneler/lib"

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


    this.log("Connection Param:\n", p2p.getConnectionData())
  }
}
