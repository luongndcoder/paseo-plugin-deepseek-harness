# paseo-plugin-deepseek-harness

Plugin [Paseo](https://paseo.sh) thêm provider **DeepSeek Harness** (`dsh --profile acp`) qua ACP.

## Cài đặt

Yêu cầu Paseo `>= 0.10.0` và CLI `dsh` trên PATH (`npm i -g @deepseek-ai/dsh`).

```bash
paseo plugin install github:luongndcoder/paseo-plugin-deepseek-harness --ref main
```

## Xác thực

`dsh` đọc `DEEPSEEK_API_KEY` từ biến môi trường (hoặc file `.env`) của tiến trình daemon Paseo. Đặt biến này trước khi khởi động daemon, nếu không agent sẽ không gọi được API.

## Phát triển

```bash
npm install
npm run typecheck
npx vitest run
```
