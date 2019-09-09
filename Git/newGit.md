# Git 简介

## 工作区(Working Directory)

仓库文件夹里面, 除了`.git`以外的内容

## 版本库(Repository)

`.git`目录, 用于存储记录版本信息

- 工作区
- 暂存区
- 分支(master), git 自动创建的第一个分支
- HEAD指针, 用于指向当前分支

# 常用终端命令

- **cd /E**, 切换到 E 盘; **cd ..**, 切换到当前目录的上一级目录
- **pwd命令**, 列出当前所在的目录
- **ls命令**, 可以列出当前目录所有的文件及目录
  - **ls -al**,当前目录下的所有文件及文件夹包括隐藏的.和..等的详细信息
  -  a 表示以点开头的文件也会显示
  - l 表示档案的权限, 拥有者以及建立,修改时间
- **touch**命令, 创建新文件.如果已经存在同名文件，那么只会修改此文件的修改时间，内容保持不变
- **mkdir命令**, 创建新目录,
- **cp file1 file2命令**, 复制文件1到文件2
- **mv命令**,重命名文件, `mv a.txt a.html`
- **rm 命令**, 删除文件
  - **rm *.html**, 删除所有html文件
- **cat 命令**, 查看文件内容
- 将内容写入文件:
  - **echo xx > a.txt**, 此命令是将a.txt中内容清空，然后再写入指定内容。
  - **`echo` `xx >> a.txt`**, 追加内容

# 配置命令

- `git init`, 初始化`git`

- `git config -l`, 查看配置

- `git config --global user.name 'xxxx'`, 添加用户名 for global

- `git config --global user.email 'xxxx'`, Add Email for global
  
  - if in the current project, no `--global`
  
- 清除相关信息: `git config --unset --global user.name(user.email)`

- `git config [--local|--global|--system] -e`, 修改配置文件, **默认采用--local**

  ## config 的三个作用域

  **等同于 local**

  - `git config --local` 只针对某个仓库有效
  - `git config --global`, 对当前用户所有仓库有效
  - `git config --system`, 对系统所有登录的用户有效

  ## 查看固定的属性

  - git config --local user.name

  ## global 和 local 参数同事存在时, local优先级更高

# 基础命令

## 添加文件

- `git add -u`:  添加所有修改, 删除的文件 (跟踪操作过的文件)
- `git add -A(--all)`:  添加所有修改, 新建, 删除的文件
- `git add .`: 等价于 `git add -A`

# 回滚相关

1. `git log / git reflog` 查看项目历史
2. `git reset --hard 版本号(hash)`, 任意版本之间切换