#!/bin/bash

if [[ -z "${PEERID}" ]]; then
  echo "\$PEERID is not specified, \n please execute: \n $ yarn seed \n in relay folder to populate env variables on heroku"
fi

if [[ -z "${PORT}" ]]; then
  PORT=1024
fi

echo + Getting PeerId from \$PEERID

MULTIADDR="/ip4/0.0.0.0/tcp/$PORT/ws"
echo $PEERID | base64 -d > /tmp/peerid.json

libp2p-relay-server --listenMultiaddr $MULTIADDR --metricsPort $PORT --peerId /tmp/peerid.json
