# ベースイメージとしてNode.jsを使用
FROM node:22

# 作業ディレクトリを作成
WORKDIR /app

# ソースコードをコピー
COPY . .

# アプリケーションを起動
CMD ["pnpm", "dev"]
