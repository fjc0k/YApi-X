######## 构建 ########
FROM node:12.16.3-alpine3.11 as builder

RUN apk add --update --no-cache ca-certificates curl wget cmake build-base git bash python make gcc g++ zlib-dev autoconf automake file nasm \
  && update-ca-certificates

WORKDIR /yapi/vendors

SHELL ["/bin/bash", "-c"]

COPY . .

RUN echo '{"adminAccount":"admin@docker.yapi","db":{"servername":"yapi-mongo","port":27017,"DATABASE":"yapi"},"mail":{"enable":false},"ldapLogin":{"enable":false},"closeRegister":true,"plugins":[]}' > /yapi/config.json
RUN npm ci
RUN npm run build-client \
  && yarn tsc --module commonjs --outDir .. --esModuleInterop ./docker/start.ts
RUN cd .. \
  && yarn add deepmerge \
  && shopt -s globstar \
  && rm -rf **/*.{map,lock,log,md,yml}

######## 镜像 ########
FROM node:12.16.3-alpine3.11

WORKDIR /yapi

COPY --from=builder /yapi .

EXPOSE 3000

CMD ["node", "./start.js"]