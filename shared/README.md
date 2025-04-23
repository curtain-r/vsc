存放 vscode 和 webview 代码公用的逻辑

和原先 shared 目录(`src/shared`)目的相同

但原先 shared 在 src 下面，从 webview 引用不规范， 且直接引用源码容易造成编译问题

因此放到公共 npm 包中