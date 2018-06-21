# Git、nodejs、Gulpのインストール

## 概要

Git、Nodejs、Gulpのインストール方法がまとめられています。  
インストール済みの場合は、 [使い方](../#使い方) へ進んでください。

<br>

## Gitのインストール

<img src="https://git-for-windows.github.io/img/git_logo.png" width="50" alt="git for windows">  
  
◆Windowsの場合  
__Git for windows のダウンロード__  
-> https://git-scm.com/downloads/  
  
◆Macの場合  
既にインストールされているはずなので新規のインストールは不要  
  
インストールが完了したら、以下のコマンドで、正しく動作していることを確認  
  
``` bash
// gitの確認
$ git --version
git version 2.16.2.windows.1
```

<br>

## nodejsのインストール  

<img src="https://nodejs.org/static/images/logo.svg" width="70" alt="nodejs">  

◆Windows、Mac  
__nodejs のダウンロード__  
-> https://nodejs.org/download/  
  
インストールが完了したら、以下のコマンドで、正しく動作していることを確認  
  
``` bash
// nodejsの確認
$ node -v
v8.9.3
```

``` bash
// npmの確認
$ npm -v
v5.5.1
```
  
__windows の場合は`nodist`をインストールして、Nodejsのバージョン管理がおススメです。__  
◆Nodist  
-> Nodist公式 https://github.com/marcelklehr/nodist/releases/  
-> 参考URL http://qiita.com/yokoh9/items/20d6bdc6030a3a861189  

<br>

## Gulp (グローバルインストール)  

以下のコマンドをターミナルに入力して、Gulp本体をPCのグローバルにインストール  
※Gulpはグローバル、プロジェクトフォルダの両方にインストールします。
``` bash
$ npm install -g gulp
```
  
インストールが完了したら、以下のコマンドで、正しく動作していることを確認  

``` bash
$ gulp -v
CLI version 3.9.0
```

