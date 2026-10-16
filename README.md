# paseo-plugin-deepseek-harness

Plugin [Paseo](https://paseo.sh) thêm provider **DeepSeek Harness** (`dsh --profile acp`) qua ACP, hỗ trợ các model DeepSeek V3/V4.

## Cài đặt

Yêu cầu Paseo `>= 0.11.0` và CLI `dsh` trên PATH (`npm i -g @deepseek-ai/dsh`).

```bash
paseo plugin install github:luongndcoder/paseo-plugin-deepseek-harness --ref main
```

## Phát triển

```bash
npm install
npm run typecheck
npx vitest run
```
