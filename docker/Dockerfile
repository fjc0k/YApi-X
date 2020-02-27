######## 构建 ########
FROM jayfong/front-end-builder:latest as builder

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
FROM node:alpine

WORKDIR /yapi

COPY --from=builder /yapi .

EXPOSE 3000

CMD ["node", "./start.js"]