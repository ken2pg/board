# board

BBS

# フロントエンド側の確認手順

ルートから`./frontend`に移動し
`npm i`を行い`node_modules`をインストールした後に、
`npm start`を実行することで、フロント側を起動できる。

# バックエンド側の起動のやり方

`./backend`下で以下のコマンドを実行してください。`http://localhost:8080`にアクセスすれば index.html が表示されます。

```
$ cargo run --bin board
```

# コンテナで動かす場合

Dockerfile のあるディレクトリ(ルートディレクトリ)でコンテナのイメージをビルドします。

```
$ docker build -t board .
```

コンテナのイメージからコンテナを実行します。ホストのポート番号：コンテナのポート番号を指定することでポートフォワードが行われ、`http://localhost:8080`にアクセスすれば index.html が表示されます。

```
$ docker run -p 8080:8080 board
```
