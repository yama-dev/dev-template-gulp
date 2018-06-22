# DEV TEMPLATE GULP

<br>

## 概要

webサイト制作用の開発環境になります。  
※[@gulp](https://github.com/gulpjs/gulp)の利用を前提に作成してありますが、そのままでも利用可能です。  
  
 - 可能な限りミニマムな構成としています。
 - 初期のHTML,Sass,javascriptファイルが同梱されています。

<br>

## 利用環境の構築

__1. Git インストール__

インストールしていない場合は下記参照

[インストール方法](./docs/install.md)

__2. Nodejs インストール__

インストールしていない場合は下記参照

[インストール方法](./docs/install.md)

__3. Gulp インストール__

インストールしていない場合は下記参照

[インストール方法](./docs/install.md)

<br>

## 使い方

### 1. dev-template-gulp をダウンロードして、作業フォルダに配置  

__ダウンロード__  
-> https://github.com/yama-dev/dev-template-gulp/releases/latest  

### 2. npmで関連モジュールをインストール  

ターミナルで以下のコマンドを入力  

※作業ディレクトリに移動してから以下のコマンドを実行  
※`package.json` に記述されたモジュールがインストールされる。  
``` bash
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
| `gulp js_babel`      | javascriptファイルのコンパイル   |                                                                                                                                          | 
| `gulp js`            | javascriptファイルの構文チェック |                                                                                                                                          | 
| `gulp release`       | ファイルのリリース               | 公開ファイルのみを`/release/`ディレクトリにまとめる。                                                                                    |
| `gulp --proxy [url]` | プロキシサーバーを立ち上げ       |                                                                                                                                          | 

<br>

## 主な仕様

| パッケージ    | 役割                 | 補足                                        | 
| ---           | ---                  | ---                                         | 
| gulp          | Gulp本体             | https://www.npmjs.com/package/gulp          | 
| gulp-htmlhint | HTMLのLINT           | https://www.npmjs.com/package/gulp-htmlhint | 
| gulp-sass     | Sassのコンパイル     | https://www.npmjs.com/package/gulp-sass     | 
| gulp-postcss  | css最適化            | https://www.npmjs.com/package/gulp-postcss  | 
| autoprefixer  | プレフィックスの付与 | https://www.npmjs.com/package/autoprefixer  | 
| gulp-csscomb  | セレクタの整理       | https://www.npmjs.com/package/gulp-csscomb  | 
| gulp-babel    | ECMAScriptコンパイル | https://www.npmjs.com/package/gulp-babel    | 
| gulp-eslint   | javascriptのLINT     | https://www.npmjs.com/package/gulp-eslint   | 
| gulp-cached   | 差分検出、更新       | https://www.npmjs.com/package/gulp-cached   | 
| gulp-plumber  | エラー検出、制御     | https://www.npmjs.com/package/gulp-plumber  | 
| gulp-notify   | デスクトップ通知     | https://www.npmjs.com/package/gulp-notify   | 
| browser-sync  | ブラウザのリロード   | https://www.npmjs.com/package/browser-sync  | 

#### ファイル構造

``` html
root  
│  .csscomb.json
│  .gitignore
│  gulpfile.js
│  LICENSE
│  package.json
│  README.md
│
├─docs
│      install.md
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
        │          _eric_reset_scss.scss
        │          _html5reset.css
        │          _html5reset_scss.scss
        │          _normalize.css
        │          _normalize_scss.scss
        │          _reset.css
        │          _reset_scss.scss
        │          _sanitize.css
        │          _sanitize_scss.scss
        │          
        └─js
            │  script.js
            │  
            └─vender
                    jquery-3.3.1.min.js
                    jquery.easing.1.3.js
```

<br>

## Download

Zip -> https://github.com/yama-dev/dev-template-gulp/releases/latest

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

