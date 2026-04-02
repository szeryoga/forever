FROM node:22-alpine AS build

WORKDIR /app

COPY package.json tsconfig.json tsconfig.node.json vite.config.ts index.html ./
COPY public ./public
COPY src ./src

RUN npm install
RUN npm run build

FROM alpine:3.22

WORKDIR /dist

COPY --from=build /app/dist ./

CMD ["sh", "-c", "rm -rf /out/* && cp -r /dist/. /out"]
