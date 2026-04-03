FROM node:22-alpine AS build

WORKDIR /app

ARG VITE_API_BASE_URL=http://api-demo.etalonfood.com:9000
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

COPY package.json tsconfig.json tsconfig.node.json vite.config.ts index.html ./
COPY public ./public
COPY src ./src

RUN npm install
RUN npm run build

FROM alpine:3.22

WORKDIR /dist

COPY --from=build /app/dist ./

CMD ["sh", "-c", "rm -rf /out/* && cp -r /dist/. /out"]
