# DEV TEMPLATE GULP

[![Build Status](https://travis-ci.org/yama-dev/dev-template-gulp.svg?branch=master)](https://travis-ci.org/yama-dev/dev-template-gulp)
[![](https://img.shields.io/github/repo-size/yama-dev/dev-template-gulp.svg)](https://github.com/yama-dev/dev-template-gulp/releases/latest)
![](https://img.shields.io/github/release/yama-dev/dev-template-gulp.svg)
![](https://img.shields.io/david/yama-dev/dev-template-gulp.svg)
![](https://img.shields.io/david/dev/yama-dev/dev-template-gulp.svg)
[![GitHub](https://img.shields.io/github/license/yama-dev/dev-template-gulp.svg)](https://github.com/yama-dev/dev-template-gulp/blob/master/LICENSE)

<br>

## 概要

webサイト制作用の開発環境になります。  
※[@gulp](https://github.com/gulpjs/gulp)の利用を前提に作成してありますが、staticファイルをそのままでも利用可能です。  
  
 - 可能な限りミニマムな構成としています。
 - 初期のHTML,Sass,javascriptファイルが同梱されています。

<br>

## 利用環境の構築

__1. Git インストール__
[インストール方法](./docs/install.md)

__2. Nodejs インストール__
[インストール方法](./docs/install.md)

__3. Gulp インストール__
[インストール方法](./docs/install.md)

<br>

## 使い方

### 1. dev-template-gulp をダウンロードして、作業フォルダに配置  

__ダウンロード__  
-> https://github.com/yama-dev/dev-template-gulp/releases  

### 2. npmから起動  

**ターミナルで以下のコマンドを入力**  
``` bash
npm start
```
※作業ディレクトリに移動してから以下のコマンドを実行  
※`package.json` に記述されたモジュールがインストールされる。  
※gulpコマンドを個別に実行する場合は「Gulpのタスク一覧」を参照  
※正常に起動すると`localhost:3000`がブラウザに表示されます。  

### 3. 納品ファイルを生成

ターミナルで以下のコマンドを入力
``` bash
gulp release
```
※ *.sass拡張子のファイル、*.es6拡張子のファイル、_(アンダーバー)から始まるファイル  
　を除くファイルが「release」フォルダにコピーされます。  

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
| `gulp --cssmin`      | Sassファイルの圧縮               |                                                                                                                                          | 
| `gulp --jsmin`       | javascriptファイルの圧縮         |                                                                                                                                          | 

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

