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
- **clear**, 清理git面板
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

## 获取文件

- `git clone 远程地址`, 克隆获取远程项目仓库地址


## 修改文件

- `git diff `:  查看文件最新修改的地方

## 添加文件

- `git add -u`:  添加所有修改, 删除的文件 (跟踪操作过的文件)
- `git add -A(--all)`:  添加所有修改, 新建, 删除的文件
- `git add .`: 等价于 `git add -A`

## 提交文件

- `git commit -m 'xxxxx'`
- **-m**表示对此次提交进行注释，简述此次提交的相关信息
- 如果不加**-m**, 那么点击回车之后， 会默认弹出自带的VIM编辑器。
- Git push origin master
- Git remote add origin <server>

# 查看历史

- `git log --all` 查看所有分支的历史
- `git log --all --graph` 查看图形化的log历史
- `git log --oneline` 查看单行的简洁历史
- `git log --oneline -n4` 查看最近4条简洁历史
- `git log --oneline --all -n4 --graph` 查看所有分支最近4条单行的图形化历史
- `git help --web log` 跳转到git log 的帮转文档网页

# Git删除与恢复

- `git rm --cached a.txt` 删除暂存区指定文件,工作区不受影响
- `git checkout a.txt`，工作区的内容不满意，将暂存区内容还原到工作区

# 分支操作

- 查看分支：`git branch`。
  
  - 查看每个分支的最后一次提交：`git branch -v`
- 创建分支：`git branch 分支名称`
- 切换分支：`git switch 分支名称`
  - **2.23** 低版本中，使用命令：`git checkout 分支名称`
  
  - 新建分支并切换过去
  
    > **低版本**: `git checkout -b 分支名称`
    >
    > **新版本**: `git switch -c 分支名称`
- 查看远程分支：`git branch -r`
- 分支合并：`git merge dev`. 将 dev分支合并到当前分支
- 删除分支：`git branch -D 分支名称`
- 删除远程分支：`git push origin --delete 分支名称`
- 更新远程分支：`git remote prune origin`

# 回滚相关

1. `git log / git reflog` 查看项目历史
2. `git reset --hard 版本号(hash)`, 任意版本之间切换
   1. 回退到上一个版本：`git reset --hard HEAD^`
   2. 回退到上上一个版本：`git reset ––hard HEAD^^`
   3. 回退到上N个版本：`git reset ––hard HEAD~N（N是一个整数）`
   4. 回退到任意一个版本：`git reset ––hard 版本号（版本号用7位即可）`

# 忽略文件

`.gitignore`文件

- `#`, 表示注释
- `*.a`, 表示忽略所有 .a 结尾的文件
- `!lib.a`, 表示 lib.a 除外
- `/TODO`, 表示忽略项目根目录下的 TODO 文件, 不包括 subdir/TODO
- `build/`, 表示忽略 build/ 目录下的所有文件, 过滤整个build 文件夹

# 公钥私钥

- cd ~/.ssh

- ls -al 检查是否有公钥私钥

- 生成密钥

  ```shell
  ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
  ```

- 将 id_rsa.pub 文件复制到 SSH

# 本地托管至远程

```shell
git remote add origin https://github.com/user/repo.git
```

