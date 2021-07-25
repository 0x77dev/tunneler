import pipe from 'it-pipe'
import { createConnection, createServer } from 'net'
import { P2P } from './p2p'
import lp from 'it-length-prefixed'
import PeerId from 'peer-id'

export class Protocol {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public p2p: P2P,
    public ports: number[] = []
  ) {
    if (ports.length) {
      this.handlePorts()
    }
  }

  public async handlePorts(): Promise<void> {
    await Promise.all(this.ports.map((port) => this.handle(port)))
  }

  public async handle(port: number): Promise<void> {
    this.p2p.handle(`/tunneler/0.0.0/${port}`, ({ stream }) => {
      const connection = createConnection({ host: 'localhost', port })

      pipe(
        connection,
        lp.encode(),
        stream.sink
      )

      pipe(
        stream.source,
        lp.decode(),
        async (source) => {
          for await (const msg of source) {
            connection.write(msg._bufs[0])
          }
        }
      )
    })
  }

  public async listen(b58: string, remotePort: number, localPort: number): Promise<true> {
    const multiaddrs = this.p2p.peerStore.addressBook.getMultiaddrsForPeer(PeerId.createFromB58String(b58))

    // eslint-disable-next-line no-unreachable-loop
    for (const multiaddr of multiaddrs) {
      try {
        const server = createServer(async (socket) => {
          const { stream } = await this.p2p.dialProtocol(multiaddr, `/tunneler/0.0.0/${remotePort}`)

          pipe(
            socket,
            lp.encode(),
            stream.sink
          )

          pipe(
            stream.source,
            lp.decode(),
            async (source) => {
              for await (const msg of source) {
                socket.write(msg._bufs[0])
              }
            }
          )
        })

        server.listen(localPort)

        return true
      } catch (error) {
        console.warn(error)
        break
      }
    }
  }
}
