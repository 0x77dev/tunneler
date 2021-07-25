import { P2P, Protocol } from '..'

const run = async () => {
  const p2p = await P2P.create()
  const protocol = new Protocol(p2p)
  await p2p.init()

  p2p.connectionManager.on('peer:connect', (connection) => {
    console.log('connected to: ', connection.remotePeer.toB58String())
  })

  const { peerId, multiaddrs } = p2p.getHostData(process.argv[2])

  p2p.addHost(peerId, multiaddrs)

  protocol.listen(peerId.toB58String(), 8080, 65531)
}

run()
