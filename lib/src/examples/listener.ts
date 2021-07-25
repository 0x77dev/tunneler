import { P2P, Protocol } from '..'

const run = async () => {
  const p2p = await P2P.create()
  const protocol = new Protocol(p2p, [8080])
  await protocol.handlePorts()
  await p2p.init()

  p2p.connectionManager.on('peer:connect', (connection) => {
    console.log('connected to: ', connection.remotePeer.toB58String())
  })

  console.log('connect to:', p2p.getConnectionData())
}

run()
