#!/bin/bash

function set_env {
    echo ++ Setting $1

    heroku config:set -a tunl-relay-eu $1=$2 >> eu.log &
    heroku config:set -a tunl-relay-us $1=$2 >> us.log &
    wait

    echo ++ Setting $1 done
}

function populate_peerid {
    if [ ! -f id.json ]; then
        echo + Generating PeerId
        yarn --silent peer-id --type=ed25519 > id.json
    else
        echo + PeerId has been already generated
    fi

    echo + Setting \$PEERID to Heroku
    PEERID=$(cat id.json | tr -d "\n" | tr -d " " | base64 -w 0)
    set_env PEERID $PEERID
    wait
}

echo + Populating \$PEERID
populate_peerid
