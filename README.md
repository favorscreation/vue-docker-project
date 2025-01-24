# Vue.js Development with Docker (Detailed Guide)

このプロジェクトは、Docker を使用して Vue.js 開発環境を構築するための詳細なガイドです。
ホスト PC に Node.js や Yarn をインストールすることなく、Vue.js アプリケーションを開発できます。

## プロジェクト構成

このプロジェクトは、以下のディレクトリ構造で構成されています。

```
vue-docker-project/
├── .dockerignore      # Docker ビルド時に無視するファイルやディレクトリ
├── .env              # 環境変数を定義するファイル
├── README.md         # プロジェクトの説明ファイル (このファイル)
├── docker-compose.yml # Docker Compose の設定ファイル
└── vue-app/          # Vue.js プロジェクトのファイル
    ├── .gitignore    # Git で管理しないファイルを記述するファイル
    ├── node_modules/ # (Gitで管理しない)依存パッケージがインストールされるディレクトリ
    ├── package.json  # プロジェクトの依存関係を記述するファイル
    ├── index.html     # Vue.js アプリのエントリーポイント
    ├── vite.config.js # (Viteの設定ファイル)
    ├── src/         # Vue.js アプリケーションのソースコード
    │   ├── App.vue  # メインのコンポーネント
    │   ├── assets/ # 画像などの静的アセット
    │   └── main.js  # アプリケーションのエントリーポイント
    └── yarn.lock    # (Yarnの依存関係固定ファイル)
```

**各ファイルの役割**

*   `.dockerignore`: Docker イメージをビルドする際に、無視するファイルやディレクトリを指定します。
*   `.env`: 環境変数を定義するファイルです。ここではコンテナ名を定義しています。
*   `README.md`: このプロジェクトの説明が記述されたファイルです。
*   `docker-compose.yml`: Docker Compose の設定ファイルで、コンテナの定義やネットワーク設定などを記述します。
*   `vue-app/`: Vue.js アプリケーションのファイルが格納されるディレクトリです。
    *   `.gitignore`: Git で管理しないファイルやディレクトリを定義します。
    *   `node_modules/`: 依存パッケージがインストールされるディレクトリです（Git管理対象外）。
    *   `package.json`: プロジェクトの依存関係、スクリプトなどを記述する JSON ファイルです。
    *   `index.html`: Vue.js アプリケーションのエントリーポイントとなる HTML ファイルです。
    *   `vite.config.js`: Vite の設定ファイルです。
    *   `src/`: Vue.js アプリケーションのソースコードを格納するディレクトリです。
        *   `App.vue`: ルートコンポーネントです。
        *   `assets/`: 画像などの静的アセットを格納するディレクトリです。
        *   `main.js`: Vue.js アプリケーションのエントリーポイントとなる JavaScript ファイルです。
    *   `yarn.lock`: Yarn によって生成される依存関係固定ファイルです。
 
## 通常セットアップ手順 (クイック)

1.  **リポジトリのクローン (ホストPC)**

    ```bash
    git clone https://github.com/favorscreation/vue-docker-project.git
    cd vue-docker-project
    ```
    
2.  **Docker コンテナの起動 (ホストPC)**

    ```bash
    docker compose up --build
    ```
    バックグラウンドで実行の場合
    ```bash
    docker compose up -d --build
    ```

    *   初回起動時は、イメージのダウンロードとパッケージのインストールに時間がかかる場合があります。

3.  **ブラウザでアプリケーションにアクセス (ホストPC)**

    ブラウザで `http://localhost:8080` にアクセスすると、Vue.js アプリケーションが表示されます。

---

## 初期セットアップ手順 (テンプレートプロジェクト作成全手順)

以下の手順で、Docker を使用した Vue.js 開発環境をセットアップしてください。

1.  **リポジトリのクローン (ホストPC)**

    ```bash
    git clone https://github.com/favorscreation/vue-docker-project.git
    cd vue-docker-project
    ```

2.  **`.env` ファイルの確認 (ホストPC)**

    必要に応じて、`.env` ファイル内の `CONTAINER_NAME` 環境変数を変更してください。

    ```env
    CONTAINER_NAME=my-vue-app
    ```

3. **`docker-compose.yml` の修正 (ホストPC)**

   `vue-docker-project/docker-compose.yml` ファイルを以下の内容に修正します。
   ```yaml
    version: "3.8"
    services:
      vue-app:
        image: node:20.13.0-alpine
        container_name: ${CONTAINER_NAME}
        working_dir: /app
        volumes:
          - ./vue-app:/app
        ports:
          - "8080:5173"
        command: sh -c "yarn dev --host 0.0.0.0"
   ```

   * `ports` 設定で、ホストPCの `8080` ポートをコンテナの `5173` ポートにマッピングします。
   * `command` で `yarn dev --host 0.0.0.0` を実行するようにします。

4.  **`vite.config.js` の作成または修正 (ホストPC)**

    `vue-docker-project/vue-app/vite.config.js` ファイルを作成または修正し、以下の内容を記述します。

    ```javascript
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [vue()],
      server: {
        host: '0.0.0.0'
      }
    })
    ```

    *   Vite の設定でホストを `0.0.0.0` に設定し、外部からのアクセスを許可します。

5.  **`vue-app` ディレクトリを空にする (ホストPC)**

    以前の手順で作成したファイルがある場合は、`vue-app` ディレクトリの中身をすべて削除してください。

    ```bash
    cd vue-app
    rm -rf *
    cd ..
    ```

6.  **一時コンテナで `yarn create vite` を実行 (ホストPC)**

    ```bash
    docker run --rm -it -v $(pwd)/vue-app:/app -w /app node:20.13.0-alpine sh -c "yarn create vite . --template vue"
    ```

    *   対話プロンプトが表示されるので、`Remove existing files and continue` または `Ignore files and continue` を選択し、Enterキーで確定します。

7.  **Docker コンテナの起動 (ホストPC)**

    ```bash
    docker compose up --build
    ```
    バックグラウンドで実行の場合
    ```bash
    docker compose up -d --build
    ```

    *   初回起動時は、イメージのダウンロードとパッケージのインストールに時間がかかる場合があります。

8.  **ブラウザでアプリケーションにアクセス (ホストPC)**

    ブラウザで `http://localhost:8080` にアクセスすると、Vue.js アプリケーションが表示されます。

## 開発

`vue-app` ディレクトリ内のファイルを編集すると、リアルタイムで変更がアプリケーションに反映されます。

## 依存関係の管理

Vue.js の依存関係は `vue-app/package.json` に記述されています。依存関係の追加や更新を行う場合は、`vue-app/package.json` を編集し、手順 7 でコンテナを再起動してください。

## コンテナの停止

```bash
docker compose stop
```

## コンテナの削除

```bash
docker compose down
```

## その他

*   このプロジェクトでは、Docker Compose を使用して開発環境を構築しています。
*   `.dockerignore` ファイルを使用して、Docker イメージに不要なファイルが含まれることを防いでいます。
*   `.gitignore` ファイルを使用して、Git リポジトリに不要なファイルが含まれることを防いでいます。
*   Vite のデフォルトポートは `5173` です。`docker-compose.yml` でホスト側の `8080` ポートをコンテナの `5173` ポートにマッピングしています。
