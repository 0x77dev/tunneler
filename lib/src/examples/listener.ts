import { P2P, Protocol } from '..'

const run = async () => {
  const tunneler = await P2P.create()
  const protocol = new Protocol(tunneler, [8080])
  await protocol.handlePorts()
  await tunneler.init()

  tunneler.connectionManager.on('peer:connect', (connection) => {
    console.log('connected to: ', connection.remotePeer.toB58String())
  })

  console.log('connect to:', tunneler.getConnectionData())
}

run()
