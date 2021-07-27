import Libp2p from 'libp2p'
import { Multiaddr } from 'multiaddr'
import PeerId, { JSONPeerId } from 'peer-id'
import Conf from 'conf'
import TCP from 'libp2p-tcp'
import { NOISE } from 'libp2p-noise'
import Bootstrap from 'libp2p-bootstrap'

const store = new Conf()

export class P2P extends Libp2p {
  public static async create(): Promise<P2P> {
    let peerIdJson = store.get('peerId') as JSONPeerId | null
    let peerId: PeerId

    if (peerIdJson) {
      peerId = await PeerId.createFromJSON(peerIdJson)
    } else {
      peerId = await PeerId.create()
      peerIdJson = peerId.toJSON()
      store.set('peerId', peerIdJson)
    }

    return new this({
      peerId,
      addresses: {
        listen: ['/ip4/0.0.0.0/tcp/0']
      },
      modules: {
        transport: [TCP],
        connEncryption: [NOISE],
        // FIXME: Do not use require
        streamMuxer: [require('libp2p-mplex')],
        pubsub: require('libp2p-gossipsub'),
        peerDiscovery: [Bootstrap, require('libp2p-pubsub-peer-discovery')]
      },
      config: {
        peerDiscovery: {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          [require('libp2p-pubsub-peer-discovery').tag]: {
            interval: 1000,
            enabled: true
          },
          [Bootstrap.tag]: {
            interval: 60e3,
            enabled: true,
            list: ['/dns4/tunl-relay-us.herokuapp.com/tcp/443/wss/p2p/12D3KooWFynALLMhxYbLaxuNELJgWkJ8UuQMjGGdeP321u8SvFtE', '/dns4/tunl-relay-eu.herokuapp.com/tcp/443/wss/p2p/12D3KooWFynALLMhxYbLaxuNELJgWkJ8UuQMjGGdeP321u8SvFtE']
          }
        }
      }
    })
  }

  public async init(): Promise<void> {
    const hosts = store.get('hosts') as string[] | null

    if (hosts) {
      for (const host of hosts) {
        const { peerId, multiaddrs } = JSON.parse(host) as { peerId: JSONPeerId, multiaddrs: string[] }

        this.addHost(
          await PeerId.createFromJSON(peerId),
          multiaddrs.map((addr) => new Multiaddr(addr))
        )
      }
    }

    await this.start()
  }

  private multiaddrsToStringArray(b58: string, multiaddrs: Multiaddr[]): string[] {
    return multiaddrs.map((ma) => ma.toString() + '/p2p/' + b58)
  }

  public getConnectionData(): string {
    const b58 = this.peerId.toB58String()
    const multiaddrs = this.multiaddrsToStringArray(b58, this.multiaddrs)

    return Buffer.from(JSON.stringify({ b58, multiaddrs })).toString('base64')
  }

  public getHostData(connData: string): { peerId: PeerId, multiaddrs: Multiaddr[] } {
    const { b58, multiaddrs } = JSON.parse(Buffer.from(connData, 'base64').toString())

    return {
      peerId: PeerId.createFromB58String(b58),
      multiaddrs: multiaddrs.map((str: string) => new Multiaddr(str))
    }
  }

  public addHost(peerId: PeerId, multiaddrs: Multiaddr[]): this {
    let hosts = store.get('hosts') as string[] | null

    if (!hosts) {
      hosts = []
    }

    hosts.push(
      JSON.stringify({
        peerId: peerId.toJSON(),
        multiaddrs: multiaddrs.map((ma) => ma.toString() + '/p2p/' + peerId.toB58String())
      })
    )

    this.peerStore.addressBook.add(peerId, multiaddrs)

    return this
  }

  public async destroy(): Promise<void> {
    await this.stop()
  }
}
