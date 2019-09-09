# Git 简介

## 工作区(Working Directory)

仓库文件夹里面, 除了`.git`以外的内容

## 版本库(Repository)

`.git`目录, 用于存储记录版本信息

- 工作区
- 暂存区
- 分支(master), git 自动创建的第一个分支
- HEAD指针, 用于指向当前分支

# 配置命令

- `git init`, 初始化`git`
- `git config -l`, 查看配置
- `git config --global user.name 'xxxx'`, 添加用户名 for global
- `git config --global user.email 'xxxx'`, Add Email for global
  - if in the current project, no `--global`

# 基础命令



# 回滚相关

1. `git log / git reflog` 查看项目历史
2. `git reset --hard 版本号(hash)`, 任意版本之间切换