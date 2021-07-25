import { Command } from '@oclif/command'
import { P2P, Protocol } from "@tunneler/lib"

export default class Consume extends Command {
  static description = 'tunnel remote port'

  static examples = [
    `$ tunneler consume 8080 8081 base64_connection_param==`,
  ]

  static args = [{ name: 'remotePort' }, { name: 'localPort' }, { name: 'connParam' }]

  async run() {
    const { args: { localPort, remotePort, connParam } } = this.parse(Consume)
    const p2p = await P2P.create()

    const protocol = new Protocol(p2p)
    await p2p.init()

    const { peerId, multiaddrs } = p2p.getHostData(connParam)

    p2p.addHost(peerId, multiaddrs)

    protocol.listen(peerId.toB58String(), remotePort, localPort)
  }
}
