# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```


### db selection
於 https://www.eventstore.com/downloads/23.10
選擇對應版本後替換 docker-compose.yaml 檔案 L20
```
  node1.eventstore: &template
    image: <docker url>
```
e.g.
MAC image : eventstore/eventstore:23.6.0-alpha-arm64v8
Windows image : eventstore/eventstore:23.10.0-bookworm-slim

```
mkdir certs
docker compose up
```

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
