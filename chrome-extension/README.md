# yapi-x-chrome-extension

接口管理平台 [YApi-X](https://github.com/fjc0k/YApi-X) 浏览器插件。

## 介绍

### 支持 YApi-X

- 提供跨域请求能力；
- 支持文件上传。

### 支持 YApi 官方版

- 提供跨域请求能力；
- 支持文件上传（需修改 YApi 源码）：

  删除文件 `client/components/Postman/Postman.js` 的第 `875` 行，然后将它下面代码的注释取消掉即可，如下：

  ![](https://tva1.sinaimg.cn/mw690/007M6Cofgy1gdhwotmfcsj31dk0eqn1y)

## 安装

### 通过 Chrome 官方商店安装

尚在审核。

### 手动安装

#### 下载插件并解压

点击下面的链接下载最新版插件，并且解压：

[https://cdn.jsdelivr.net/npm/yapi-x-chrome-extension/archive.zip](https://cdn.jsdelivr.net/npm/yapi-x-chrome-extension/archive.zip)

#### 加载插件

首先，点击下面的链接打开 Chrome 的扩展程序：

[chrome://extensions](chrome://extensions)

然后，打开 `开发者模式`：

![](https://tva1.sinaimg.cn/mw690/007M6Cofgy1gdhx06q03nj30qh09u3zu)

最后，点击 `加载已解压的扩展程序` 导入插件即可：

![](https://tva1.sinaimg.cn/mw690/007M6Cofgy1gdhxjwhbvjj30va09pmyz)

## 许可

Jay Fong (c) MIT