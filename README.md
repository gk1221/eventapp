# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### db setup
#### MAC image : eventstore/eventstore:23.6.0-alpha-arm64v8
#### Windows image : image: eventstore/eventstore:23.10.0-bookworm-slim

```
mkdir certs
docker compose up
```

### DB Projection setup

進到 UI 介面 projection->New projection
copy Eventstore/project.js -> create projecttion

### 網頁前端部分＝>

```sh
npm run dev
```

### DB 後段部分(Eventstore)=>

```sh
npm run server
```

### 查看機器狀況

```
⬆⬆⬇⬇⬅➡️⬅➡BABA
```

### 先進行替換商品 -> 再下單
