# board
BBS


# バックエンド側の起動のやり方

Dockerfileのあるディレクトリでコンテナのイメージをビルドします。

```
$ docker build -t board-app .
```

コンテナのイメージからコンテナを実行します。ホストのポート番号：コンテナのポート番号を指定することでポートフォワードが行われ、`http://localhost:8080`にアクセスすればindex.htmlが表示されます。

```
$ docker run -p 8080:8080 board-app
```
