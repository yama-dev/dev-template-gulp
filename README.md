# dev template gulp

## 概要

webサイト制作用の開発環境になります。  
※[@gulp](https://github.com/gulpjs/gulp)の利用を前提に作成してありますが、どちらでも利用可能です。  
  
 - 可能な限りミニマムな構成としています。
 - 初期のHTML,Sass,javascriptファイルが同梱されています。

<br>

## 利用環境の構築

__1. Git インストール__

インストールしていない場合は下記参照

[インストール方法](./docs/indtall.md)

__2. Nodejs インストール__

インストールしていない場合は下記参照

[インストール方法](./docs/indtall.md)

__3. Gulp インストール__

インストールしていない場合は下記参照

[インストール方法](./docs/indtall.md)

<br>

## 使い方

### 1. dev-template-gulp をダウンロードして、作業フォルダに配置  

__ダウンロード__  
-> https://github.com/yama-dev/dev-template-gulp/releases/latest  

### 2. npmで関連モジュールをインストール  

ターミナルで以下のコマンドを入力  

``` bash
// 作業ディレクトリに移動してから以下のコマンドを実行
// ※ `package.json` に記述されたモジュールがインストールされる。  
npm install
```

### 3. Gulpを起動

ターミナルで以下のコマンドを入力  
※コマンド一覧は「Gulpのタスク一覧」を参照  

``` bash
gulp
```

正常に起動すると「localhost:3000」がブラウザに表示されます。

コーディングを行ってください。

### 4. 納品ファイルを生成

ターミナルで以下のコマンドを入力

※ *.sass拡張子のファイル、*.es6拡張子のファイル、_(アンダーバー)から始まるファイル  
　を除くファイルが「release」フォルダにコピーされます。

``` bash
gulp release
```

<br>

## Gulpのタスク一覧

| コマンド             | 内容                             | 補足                                                                                                                                     | 
| ---                  | ---                              | ---                                                                                                                                      | 
| `gulp`               | 通常の起動                       | - サーバーの起動<br> - htmlファイルの構文チェック <br>- Sassファイルのコンパイル <br>- 各種ファイルの監視 <br>- ブラウザシンク、リロード | 
| `gulp watch`         | ファイルの変更監視               |                                                                                                                                          | 
| `gulp htmllint`      | HTMLファイルの構文チェック       |                                                                                                                                          | 
| `gulp sass`          | Sassファイルのコンパイル         | ※SCSS記法<br>※gulp-sass + gulp-postcss + autoprefixer + csscomb                                                                        | 
| `gulp js`            | javascriptファイルの構文チェック |                                                                                                                                          | 
| `gulp release`       | ファイルのリリース               | 公開ファイルのみを`/release/`ディレクトリにまとめる。                                                                                    |                                                                                                                         | 
| `gulp --proxy [url]` | プロキシサーバーを立ち上げ       |                                                                                                                                          | 

<br>

## 主な仕様

| パッケージ    | 役割               | 補足 | 
| ---           | ---                | ---  | 
| gulp          | Gulp本体           |      | 
| gulp-sass     | Sassのコンパイル   |      | 
| gulp-postcss  | css最適化 |      | 
| autoprefixer  | プレフィックスの付与 |      | 
| gulp-csscomb  | セレクタの整理 |      | 
| gulp-cached   | 差分検出、更新     |      | 
| gulp-plumber  | エラー検出、制御   |      | 
| gulp-htmlhint | HTMLのLINT         |      | 
| gulp-eslint   | javascriptのLINT   |      | 
| gulp-notify   | デスクトップ通知   |      | 
| browser-sync  | ブラウザのリロード |      | 

#### ファイル構造

``` html
root  
│  .csscomb.json
│  .gitignore
│  gulpfile.js
│  LICENSE
│  package-lock.json
│  package.json
│  README.md
│
└─src
   │  index.html
   │
   └─assets
       ├─css
       │  │  style.css
       │  │  style.scss
       │  │
       │  ├─modules
       │  │      _button.scss
       │  │      _hover.scss
       │  │      _layout.scss
       │  │      _settings.scss
       │  │
       │  └─vender
       │          _eric_reset.css
       │          _html5reset.css
       │          _normalize.css
       │          _reset.css
       │          _sanitize.css
       │
       └─js
           └─vender
                   jquery-3.3.1.min.js
                   jquery.easing.1.3.js
```

<br>

## インストール

__ダウンロード__  
-> https://github.com/yama-dev/dev-template-gulp/releases/latest

<br>

## Contribution

1. Fork it ( https://github.com/yama-dev/dev-template-gulp/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

<br>

## Licence

[MIT](https://mit-license.org/)

<br>

## Author

[yama-dev](https://github.com/yama-dev)

