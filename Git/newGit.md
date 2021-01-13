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

- 查看远程库信息：`git remote -v`

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

# 撤销

- 撤销对文件的修改
  - 低版本：`git checkout -- <file>`
  - 高版本：`git restore <file>`
- 撤销暂存的文件
  - 低版本：`git reset HEAD <file>`
  - 高版本：`git restore --staged <file>`
- 重新提交
  - `git commit --amend` 修改提交信息。

- `git revert`
  - 本质上是一个逆向的`git cherry-pick`。将提交中的变更以完全相反的方式应用到一个新创建的提交中，**本质上是撤销、倒转**

# 查看历史

- `git log --all` 查看所有分支的历史
- `git log --all --graph` 查看图形化的log历史
- `git log --oneline` 查看单行的简洁历史
- `git log --oneline -n4` 查看最近4条简洁历史
- `git log --oneline --all -n4 --graph` 查看所有分支最近4条单行的图形化历史
- `git help --web log` 跳转到git log 的帮转文档网页

# 回滚历史版本

:1st_place_medal: `git reset --soft HEAD~`。*撤销上一次提交 `git commit` 命令*，**undo commit**

- 此时文件恢复至暂存区，待`git commit`

:2nd_place_medal: `git reset [--mixed] HEAD~`。撤销上一次**提交**， 但还会**取消暂存** 所有的东西**

- 此时文件恢复至初始修改状态，未暂存，需要重新执行`git add .`

:3rd_place_medal: `git reset --hard HEAD~`。撤销上一次提交、`git add` 和 `git commit `命令 以及 工作目录中的所有工作。 

- **危险操作，此操作会清空当前目录中所有记录**

# Git删除与恢复

- `git rm --cached a.txt` 删除暂存区指定文件,工作区不受影响
- `git checkout a.txt`，工作区的内容不满意，将暂存区内容还原到工作区

# 分支操作

- 查看分支：`git branch`
  
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

  > 通常合并分支时， *Git* 会用 `Fast forward` 模式，但这种模式下，删除分支后，会丢掉分支信息。为了保留分支信息，禁用 `Fast forward` 模式。合并分支时使用 **`--no-ff`**。
  >
  > **`git merge --no-ff -m '合并分支时的描述' dev`**

- 删除分支：`git branch -D 分支名称`， 强制删除

- 删除远程分支：`git push origin --delete 分支名称`

- 更新远程分支：`git remote prune origin`

  :stuck_out_tongue:`master` 分支是主分支。需要与远程同步

  :blonde_woman:`dev` 分支是开发分支，团队成员都需要在上面工作。也需要远程同步

  :last_quarter_moon_with_face:`bug` 分支只在本地修复，不用推送到远程。

# 标签

:grey_question:标签是版本库的一个快照。本质是指向某个`commit`的指针。**分支可以移动, 标签不能移动**

- 创建一个新标签：

  - `git tag v1.0`
  - 特定的 commit 打标签：`git tag v1.1 f53c132`

- 查看所有标签：`git tag`

- 查看标签信息：`git show v1.1`

- 创建带有说明的标签：`git tag -a <tagname> -m 'somebalaba' `。 `-a`指定标签名， `-m`指定说明文字

- 删除标签：`git tag -d v1.1`

- 推送标签至远程：`git push origin <tagname>`

  - 一次性推送到远程：`git push origin --tags`

  - 删除远程标签：

    > 先删除本地：`git tag -d v1.1`
    >
    > 远程删除：`git push origin :refs/tags/v1.1`

- **应用标签**：`git checkout -b <branchName> <tagName>`。

  > :1st_place_medal:`tag` 相当于一个快照，不能更改它的代码。如果要在 `tag` 代码的基础上做修改，需要创建一个分支。

# 暂存

- 存储：`git stash`
- 查看：`git stash list`
- 恢复贮藏
  - 获取刚刚贮藏的：`git stash apply`
  - 获取更久的：`git stash apply stash@{2}`

- 删除贮藏
  - 删除最近的：`git stash drop`
  - 删除某一个：`git stash drop stash@{1}`
- **应用并删除: `git stash pop`**
- **指定贮藏应用并删除：`git stash pop stash@{2}`**
- 在master分支上修复的bug，想要合并到当前dev分支，可以用**`git cherry-pick <commit>`**命令，把bug提交的修改“复制”到当前分支，避免重复劳动。

:face_with_thermometer:可以在一个分支上保存一个贮藏，切换到另一个分支，然后尝试重新应用这些修改

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
