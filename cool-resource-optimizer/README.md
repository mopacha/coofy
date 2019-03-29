
### 功能说明

#### clean
清除跟目录下 `build`, `dist` 目录。

#### pkStaic 
 1. 压缩优化&版本化：将 `dist` 下 `.js`, `.css`, `jpg,png,gif` 文件打包版本化到 `build/static/`
 2. 打包到 `build/deploy/${项目名去除web后缀}-static` 目录

#### babelNode
Node 代码预编译到 `build/node`

#### pkNode
将一些配置文件与`build/node` 编译好的node文件 打包到`build/deploy/${项目名去除web后缀}-node`目录


