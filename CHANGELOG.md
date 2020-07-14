更新日志
## [2.5.0](https://github.com/fjc0k/yapi-x/compare/v2.4.0...v2.5.0) (2020-07-14)


### 特性

* YApi-X 浏览器插件正式发布 ([bb521ed](https://github.com/fjc0k/yapi-x/commit/bb521ed7bd4cf6a19e3b8ecc1b45220746b4ea8e))


### 修复

* **Dockerfile:** 锁定依赖版本 ([30e896b](https://github.com/fjc0k/yapi-x/commit/30e896b5ff1a71130e8c831a2eab9f89548a98fe))
* 在测试集合中克隆测试用例时，如果该用例来自于外部项目，克隆结束后路由跳转到外部项目了 ([#21](https://github.com/fjc0k/yapi-x/issues/21)) ([d76c5ce](https://github.com/fjc0k/yapi-x/commit/d76c5ce10db26bb6bd40890accef7cadb1b9c56a))
* 生成 iife 格式的浏览器插件 ([fe08743](https://github.com/fjc0k/yapi-x/commit/fe08743e76a857a023c66d953367bc1e7f91e0ca))

## [2.4.0](https://github.com/fjc0k/yapi-x/compare/v2.3.4...v2.4.0) (2020-04-04)


### 特性

* 完成 YApi-X 浏览器插件开发 ([be6016c](https://github.com/fjc0k/yapi-x/commit/be6016cdf3217cc32b40bf55cbf417bdd953833a))
* 完成浏览器插件开发 (close: [#5](https://github.com/fjc0k/yapi-x/issues/5)) ([9a660f3](https://github.com/fjc0k/yapi-x/commit/9a660f3fa436b38801ac8ec435a5bdd2c401d530))
* 支持自动预览图片、音视频 (close: [#4](https://github.com/fjc0k/yapi-x/issues/4)) ([41f207c](https://github.com/fjc0k/yapi-x/commit/41f207ce21853d011e154c3e3a1a1895f9d4f51d))

### [2.3.4](https://github.com/fjc0k/yapi-x/compare/v2.3.3...v2.3.4) (2020-03-03)


### 修复

* **项目图标:** 保证自传项目图标在各种场景下正常显示 (close: [#11](https://github.com/fjc0k/yapi-x/issues/11)) ([a0561cb](https://github.com/fjc0k/yapi-x/commit/a0561cb2333b38c1c42a21f6c7b54cadc43b472f))

### [2.3.3](https://github.com/fjc0k/yapi-x/compare/v2.3.2...v2.3.3) (2020-03-02)


### 修复

* 更改项目图标接口逻辑调整 ([c143474](https://github.com/fjc0k/yapi-x/commit/c143474dbf5d609032d9aad0bf3ebb4706631b3f))

### [2.3.2](https://github.com/fjc0k/yapi-x/compare/v2.3.1...v2.3.2) (2020-03-02)


### 修复

* 正确处理内置图标和上传图标的关系 ([e9665d8](https://github.com/fjc0k/yapi-x/commit/e9665d8ab19a7c98be51642bf998fd313e7d04cf))

### [2.3.1](https://github.com/fjc0k/yapi-x/compare/v2.3.0...v2.3.1) (2020-03-02)


### 修复

* 去除可能导致文件下载产生错误的因素 ([16f5a90](https://github.com/fjc0k/yapi-x/commit/16f5a909e207ed7b4450def97b6951345fe351ac))

## [2.3.0](https://github.com/fjc0k/yapi-x/compare/v2.2.0...v2.3.0) (2020-03-02)


### 特性

* 项目图标支持自传图片 (close: [#9](https://github.com/fjc0k/yapi-x/issues/9)) ([3ae25fe](https://github.com/fjc0k/yapi-x/commit/3ae25fe9dfe0dd9f701723e5e438fb05f65b881e))

## [2.2.0](https://github.com/fjc0k/yapi-x/compare/v2.1.0...v2.2.0) (2020-03-01)


### 特性

* **复制分类:** 复制时加载效果、复制完成后自动跳至新分类 ([307e0cd](https://github.com/fjc0k/yapi-x/commit/307e0cdee53ea87faa637173bdc44968076e1558))


### 修复

* 支持 Windows 下开发 (close: [#3](https://github.com/fjc0k/yapi-x/issues/3)) ([f4996d4](https://github.com/fjc0k/yapi-x/commit/f4996d4939d45044874cc33129f1dcb07fb8ac3f))
* **复制分类:** 修复接口复制信息不全 ([25aeaca](https://github.com/fjc0k/yapi-x/commit/25aeacaa6c75cc7e945dc8b81400c4dddc7e20d5))

## [2.1.0](https://github.com/fjc0k/yapi-x/compare/v2.0.0...v2.1.0) (2020-02-27)


### 特性

* 支持复制分类 ([3ca2385](https://github.com/fjc0k/yapi-x/commit/3ca2385f861a210811cf7cbc53a9670583d1ff12))

## 2.0.0 (2020-02-27)


### 文档

* 增加安装、配置说明 ([e6da91a](https://github.com/fjc0k/yapi-x/commit/e6da91a125704f55c963f975b171da66996c8be4))


### 修复

* Dockerfile ([2c30c22](https://github.com/fjc0k/yapi-x/commit/2c30c222c78231172407fe0a90465d14bb4afca1))
* 更灵活的 path 验证 ([4d64687](https://github.com/fjc0k/yapi-x/commit/4d646870d1a2d5ad9dead076d5b8fd1f42804e82))
* **Docker:** dockerignore 去除 static ([1e6b1eb](https://github.com/fjc0k/yapi-x/commit/1e6b1eb5a723b2e018da920e3b7e74611f3f1015))


### 特性

* 代码风格调整 ([e32c656](https://github.com/fjc0k/yapi-x/commit/e32c65659d24e26fb9dd22ee9876d3b52dbcd55e))
* 导入 YApi [1.8.8] ([4533b2c](https://github.com/fjc0k/yapi-x/commit/4533b2c726932028ac7726f299b5189b3a6c0994))
* 支持 adminPassword 设置管理员密码 ([7639332](https://github.com/fjc0k/yapi-x/commit/7639332de9e5e42e80ab408a3ea9170db367917b))
* 构建 Docker 镜像 ([d17e8e5](https://github.com/fjc0k/yapi-x/commit/d17e8e58138bd0491c14f542bbee35234da299ca))
