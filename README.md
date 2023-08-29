# mmmall 开发纪要

## 项目搭建

1. 模版 taro+react+typescript+less+default
2. eslint 使用模版自带
3. 添加 prettier
   prettier - 格式化文件
   eslint-config-prettier - 解决 eslint 和 prettier 的配置冲突
   eslint-plugin-prettier - 使 eslint 可以使用 prettier 做格式化检查
4. 添加 husky 和 lint-stage
   husky - 管理使用 git hooks
   lint-stage - 筛选文件做检查
5. 安装 zustand 做状态管理， 安装 immer 做复杂状态的更新

## 目录结构
