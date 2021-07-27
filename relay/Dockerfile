FROM node:lts-alpine
RUN apk add --update git build-base python3 bash

RUN mkdir /relay

WORKDIR /relay
COPY . . 

RUN yarn global add --silent libp2p-relay-server@0.2.0

USER node

CMD bash run.bash
