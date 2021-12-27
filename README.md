# lerna(多包管理工具)

[lerna官网地址](https://lerna.js.org/)

**用途有2大类**

- npm包管理
- monorepo架构管理（全称Monorepository：单一存储库）
  
<a href="https://www.icode9.com/i/ll/?i=1d2a2dc0d73743da83af7d1f5713a26f.png" target="_blank"><img src="https://www.icode9.com/i/ll/?i=1d2a2dc0d73743da83af7d1f5713a26f.png"></a>

**安装方式**

- 全局安装和局部安装，推荐使用全局安装。
```
npm i -g lerna@4.0.0
```
生成配置文件lerna.json，常用配置项如下：
- packages：通常，我们把每个需要单独发布的子项目叫做一个package。
- version：有2种设置模式，在单个package管理的项目中，可以把version设置成具体的版本号，比如：1.0.0。而在多个package管理的项目中，version设置为independent，表示每个子项目各自维护自己的版本号。

### 管理子package

1、创建子package：pack-test-a, package有独立的package.json文件来自己的version和其他配置。

2、设置pnpm安装模式：添加pnpm-workspace.yaml文件。

- pnpm-workspace.yaml
```
packages:
  # 所有在 packages子目录下的 package
  - 'packages/**'
  # 不包括在 test 文件夹下的 package
  - '!**/__test__/**'
```
- lerna.json
```
"npmClient": "pnpm"
```

3、管理package的lerna命令
```
  lerna add <pkg> [globs..]  给所有的packages安装指定的npm包
  lerna bootstrap            链接本地的package同时安装所有package.json里的npm包
  lerna changed              列出自上次标记的发行版以来已更改的本地包[aliases: updated]
  lerna clean                从所有包中删除node_modules目录
  lerna create <name> [loc]  创建新的lerna托管包
  lerna diff [pkgName]       区分自上次发布以来的所有包或单个包
  lerna exec [cmd] [args..]  在每个包中执行任意命令
  lerna import <dir>         将具有提交历史记录的包导入monorepo
  lerna info                 打印有关本地环境的调试信息
  lerna init                 创建新的Lerna repo 或将现有 repo 升级至Lerna的当前版本
  lerna link                 将相互依赖的所有包dependencies链接在一起
  lerna list                 列出本地[aliases: ls, la, ll]
  lerna publish [bump]       在当前项目中发布包
  lerna run <script>         在包含该脚本的每个包中运行npm脚本
  lerna version [bump]       自上次发布以来，包的版本已更改
```

4、常用的命令

```
"scripts": {
    "bootstrap": "lerna bootstrap --force-local",
    "clean": "lerna clean --yes",
    "publish": "lerna publish --conventional-commits --yes"
  }
```
bootstrap: 安装依赖，一般在第一次clone项目的时候执行一遍

clean: 卸载依赖，只卸载子package的依赖

lerna publish [bump] Options: publish的可选项非常多，可以通过 lerna publish --help 查看。

[发布npm包的详细配置](https://docs.npmjs.com/creating-a-package-json-file)


# 演示

- 添加新的package，自动生成package，并且type package.json文件
  ```
    lerna create pack-test-a
  ```

- 给所有package添加lodash依赖，---exact表示固定版本号
  ```
    lerna add lodash --exact
  ```
- 也可以给指定的package添加依赖，使用lerna管理package的依赖
  ```
    lerna add svelte packages/pack-test-a --exact
  ```

- 修改pack-test-a.js
  ```javascript
  'use strict';
  import isDate from 'lodash/isDate';

  module.exports = packTestA;

  function packTestA() {
      const time = new Date();
      console.log('is Date-------', isDate(time));
  }
  ```

- 发布npm包，这里我们测试发布到官方npm仓库 [lerna/publish文档](https://github.com/lerna/lerna/tree/main/commands/publish#publishconfigaccess)
 ```
  lerna publish
 ``` 

 发布之前，我们需要git commit，记住，不需要push，因为lerna会自动帮你做这个操作，commit需要遵守规范（不遵守则无法发布）：[conventionalcommits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)，下面是规范的demo
 ```
    git commit -m 'fix: xxx'
    git commit -m 'feat: xxx'
    git commit -m 'docs: xxx'
    git commit -m 'style: xxx'
    git commit -m 'test: xxx'
    ....
 ```

 查看发布好的public npm 包：[npm packages](https://www.npmjs.com/settings/yongyue/packages)

- 添加新的package：pack-test-b
  ```
  lerna create pack-test-b
  ```

 - 在pack-test-b.js引入pack-test-a的npm包
  ```
    lerna add pack-test-a packages/pack-test-b --exact
  ```

  - 修改pack-test-b.js文件
  ```javascript
  'use strict';

  import packTestA from 'pack-test-a';

  module.exports = packTestB;

  function packTestB() {
      return packTestA();
  }

  packTestB();
  ```

    
  - 全量发布
  ```
    lerna publish --conventional-commits --yes
  ```