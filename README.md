# TiSampleNoTabbed
This is a no tabbed application sample (Titanium Alloy, iOS/Android).

# 問題点

iOSにおいて開いたWindowから戻りたい時は、一般的にタイトルバー左端のナビゲーションで戻ります。Androidにおいて開いたWindowから戻りたい時は、バックキーで戻ります。
これらの遷移を利用したい場合、タブの有無によって次のようなトップレベルビューを使い分けなければいけません。


各種アプリケーションのトップレベルビュー

|-|iOS|Android|
|---|---|---|
|no tabbed application|NavigationWindow(*1)|Window|
|tabbed application|TabGroup|TabGroup|

*1: iOSではtabBarHiddenプロパティをtrueとすると、代わりにTabGroupが使用できます。

補足：TabGroupに揃えられればいいのですが、残念ながらAndroidではTagGroupを使用してtabBarHiddenプロパティをtrueに設定しても不自然なスペースが表示されてしまいます。

例えばWindow AからWindow Xを開く場合を考えてみます。単にWindow Xを開きたいだけなのに、単純に呼び出すと次のようにコードを書き分けないといけなくなります。
**Windowを開くのに、このような断片化したコードは書きたくありません。**

|-|iOS|Android|
|---|---|---|
|no tabbed application|navWin.openWindow(winX)|winX.open()|
|tabbed application|activeTab.open(winX)|activeTab.open(winX)|



# 解決方法
裏技でTabGroupで統一する方法も有るのですが、SDKのバージョンが変わると動かなくなるなど安定しておらず、コードも複雑となりメンテナンス性が落ちます。そこで上記テーブルのトップレベルビューを素直に使用したままで、同じコードでWindowを開く方法を考えました。
index.jsファイルにAlloy.Globals.UI.openWindowというメソッドを用意し、Alloy.Globals.UI.openWindow('winX');といったコードでウィンドウを開けるようにしました。これによって次の４パターンにおいてWindowを開くコードが同じとなり、ソースがメンテナンスしやすくなり、iOS/Android両対応もスムーズとなります。

- iOS タブ無しアプリ
- iOS タブ有りアプリ
- Android タブ無しアプリ
- Android タブ有りアプリ

補足１：Alloy.Globals.UI.openWindowの中身は４パターンで違うのですが、ここはアプリが変わっても内容は変わりません。別Windowを開くコードはアプリ内で複数有ることが多く、今回のようにしてここが統一されるメリットは大きいです。

補足２：Alloy.Globals.openWindowでもいいのですが、他にもiOSとAndroidで同じように呼べるUIを増やして整理したいのでUIを付けています。



# コード
具体的なサンプルコードについてはタブ無しとタブ有りに分けて、GitHubで公開しています。

- iOS/Android タブ無しアプリ
https://github.com/papuujp/TiSampleNoTabbed
- iOS/Android タブ有りアプリ
https://github.com/papuujp/TiSampleTwoTabbed

[サンプル動作動画](https://youtu.be/xanEh02FKBo)


---
(English)
#How to open a window in same code on a tabbed or no tabbed application(Titanium Alloy, iOS/Android)

# Problem
Here are top level views on a tabbed or no tabbed application.

|-|iOS|Android|
|---|---|---|
|no tabbed application|NavigationWindow|Window|
|tabbed application|TabGroup|TabGroup|

If I open Window X from Window A, I have to write these code.
**I don't want to write these fragmented code!!!**

|-|iOS|Android|
|---|---|---|
|no tabbed application|navWin.openWindow(winX)|winX.open()|
|tabbed application|activeTab.open(winX)|activeTab.open(winX)|

# Solution
So I made Alloy.Globals.UI.openWindow in index.js. And I can open a window in the same code on the four pattern. 
Alloy.Globals.UI.openWindow('winX');

- no tabbed iOS application
- tabbed iOS application
- no tabbed Android application
- tabbed Android application

It's easy to maintenance and portable between iOS and Android.

# Code
Codes are on GitHub.
- no tabbed iOS/Android application
https://github.com/papuujp/TiSampleNoTabbed
- tabbed iOS/Android application
https://github.com/papuujp/TiSampleTwoTabbed

[Sample movie](https://youtu.be/xanEh02FKBo)
