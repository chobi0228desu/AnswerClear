# backend/Dockerfile
FROM golang:1.20-alpine AS builder

WORKDIR /app

# go.mod と go.sum を先にコピーして依存関係をダウンロード
COPY go.mod go.sum ./
RUN go mod download

# アプリケーションコードをコピー
COPY . .

# ビルド
RUN go build -o main .

# 最終的なイメージを作成
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .

# 実行コマンド
CMD ["./main"]
