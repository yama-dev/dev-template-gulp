# dev template gulp

## 概要

webサイト制作用の開発環境になります。  
※[@gulp](https://github.com/gulpjs/gulp)の利用を前提に作成してありますが、どちらでも利用可能です。  
  
 - 可能な限りミニマムな構成としています。
 - 初期のHTML,Sass,javascriptファイルが同梱されています。

<br>

## 使い方

### 1. 各種インストール

※Git、Nodejs、Gulpがインストール済みの場合は、 [2. 開発環境の構築](#2. 開発環境の構築) へ進んでください。

#### 1-1. Git  

<img src="https://git-for-windows.github.io/img/git_logo.png" width="100" alt="git for windows">  
  
◆Windowsの場合  
__Git for windows のダウンロード__  
-> https://git-scm.com/downloads/  
  
◆Macの場合  
既にインストールされているはずですので新規のインストールは不要  
  
インストールが完了したら、以下のコマンドで、正しく動作していることを確認  
  
``` bash
// gitの確認
$ git --version
git version 2.16.2.windows.1
```

#### 1-2. nodejs  

<img src="https://nodejs.org/static/images/logo.svg" width="120" alt="nodejs">  

◆Windows、Mac  
__nodejs のダウンロード__  
-> https://nodejs.org/download/  
  
インストールが完了したら、以下のコマンドで、正しく動作していることを確認  
  
``` bash
// nodejsの確認
$ node -v
v8.9.3

// npmの確認
$ npm -v
v5.5.1
```
  
``` text
◆Nodist
windows の場合は`nodist`をインストールして、Nodejsのバージョン管理がおススメです。
-> Nodist公式 https://github.com/marcelklehr/nodist/releases/  
-> 参考URL http://qiita.com/yokoh9/items/20d6bdc6030a3a861189  
```

#### 1-3. Gulp (グローバルインストール)  

以下のコマンドをターミナルに入力して、Gulp本体をPCのグローバルにインストール  
``` bash
$ npm install -g gulp
```
  
インストールが完了したら、以下のコマンドで、正しく動作していることを確認  

``` bash
$ gulp -v
CLI version 3.9.0
```

### 2. 開発環境の構築

#### 2-1. `dev-template-gulp`をダウンロードして、作業フォルダに配置  

__ダウンロード__  
-> https://github.com/yama-dev/dev-template-gulp/releases/latest  

#### 2-2. npmを使用して関連するモジュールをインストール  

ターミナルで以下のコマンドを入力  
``` bash
// 作業ディレクトリに移動してから以下のコマンドを実行
// ※ `package.json` に記述されたモジュールがインストールされる。  
npm install
```

#### 2-3. Gulpを起動

ターミナルで以下のコマンドを入力  
※コマンド一覧は「Gulpのタスク一覧」を参照  

``` bash
gulp
```

<br>

## Gulpのタスク一覧

| コマンド             | 内容                             | 補足                                                                                                                                     | 
| ---                  | ---                              | ---                                                                                                                                      | 
| `gulp`               | 通常の起動                       | - サーバーの起動<br> - htmlファイルの構文チェック <br>- Sassファイルのコンパイル <br>- 各種ファイルの監視 <br>- ブラウザリンク、リロード | 
| `gulp watch`         | ファイルの変更監視               |                                                                                                                                          | 
| `gulp htmllint`      | HTMLファイルの構文チェック       |                                                                                                                                          | 
| `gulp sass`          | Sassファイルのコンパイル         | ※SCSS記法<br>※gulp-sass + gulp-postcss + autoprefixer + csscomb                                                                        | 
| `gulp js`            | javascriptファイルの構文チェック |                                                                                                                                          | 
| `gulp release`       | ファイルのリリース               | 公開ファイルのみを`/release/`ディレクトリにまとめる。                                                                                    | 
| `gulp php-twig`      |                                  |                                                                                                                                          | 
| `gulp --proxy [url]` | プロキシサーバーを立ち上げ       |                                                                                                                                          | 

<br>

## 主な仕様

| パッケージ    | 役割               | 補足 | 
| ---           | ---                | ---  | 
| gulp          | Gulp本体           |      | 
| gulp-sass     | Sassのコンパイル   |      | 
| gulp-postcss  |                    |      | 
| autoprefixer  |                    |      | 
| gulp-csscomb  |                    |      | 
| gulp-cached   | 差分検出、更新     |      | 
| gulp-plumber  | エラー検出、制御   |      | 
| gulp-htmlhint | HTMLのLINT         |      | 
| gulp-eslint   | javascriptのLINT   |      | 
| gulp-notify   | デスクトップ通知   |      | 
| gulp-replace  | 文字置換           |      | 
| browser-sync  | ブラウザのリロード |      | 
| run-sequence  |                    |      | 

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
       │          _reset.scss
       │          _sanitize.css
       │
       └─js
           └─vender
                   jquery-3.2.1.min.js
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

