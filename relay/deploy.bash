#!/bin/bash
docker build -t 0x77.page/tunneler/relay .

heroku container:push web -a tunl-relay-eu >> eu.log &
heroku container:push web -a tunl-relay-us >> us.log &
wait

heroku container:release web -a tunl-relay-eu >> eu.log &
heroku container:release web -a tunl-relay-us >> us.log &
wait

