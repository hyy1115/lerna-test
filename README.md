# lerna(多包管理工具)

[lerna官网地址](https://lerna.js.org/)

**用途有2大类**

- npm包管理
- monorepo架构管理（全称Monorepository：单一存储库）
  

**安装方式**

- 全局安装和局部安装，推荐使用全局安装。
```
npm i -g lerna@4.0.0
```
生成配置文件lerna.json，常用配置项如下：
- packages：通常，我们把每个需要单独发布的子项目叫做一个package。
- version：有2种设置模式，在单个package管理的项目中，可以把version设置成具体的版本号，比如：1.0.0。而在多个package管理的项目中，version设置为independent，表示每个子项目各自维护自己的版本号。

### 管理子package

1、手动创建2个子package：hyy-pack-a, hyy-pack-b，每个package有独立的package.json文件来管理各自的version。

2、设置workspaces模式，因为每个package都有自己的package.json文件，如果workspaces为FALSE，则每个package都会安装node_modules。为了方便管理依赖包和减少重复安装，推荐使用workspaces：TRUE。这样只会在最外层有一个node_modules。

在package.json文件设置
```
"workspaces": [
    "packages/**"
]
```
在lerna.json文件设置
```
"useWorkspaces": true,
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
    "bootstrap": "lerna bootstrap",
    "clean": "lerna clean",
    "publish": "lerna publish"
  }
```
bootstrap和clean分别是安装依赖和卸载依赖，这里主要介绍一下publish。

lerna publish [bump] Options: publish的可选项非常多，可以通过 lerna publish --help 查看。

[发布npm包的详细配置](https://docs.npmjs.com/creating-a-package-json-file)


# 演示

- 添加新的package，自动生成package，并且type package.json文件
  ```
    lerna create hyy-pack-c
  ```

- 给所有文件添加lodash依赖，--exact表示固定版本号
  ```
    lerna add lodash --exact
  ```
  也可以给单个package添加依赖，--peer全称是peerDependencies，他的作用是将所有安装的依赖拍平管理。在npm安装的模式中，他很有用，可以避免node_modules多层嵌套node_modules的问题，但在pnpm模式下，他的作用并不存在
  ```
    lerna add lodash packages/hyy-pack-c --peer --exact
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
