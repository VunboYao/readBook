# 常用 linux 操作
- pwd 当前路径
- clear 清理界面
- ls -al 显示当前目录下的所有文件及文件夹包括隐藏的.和..等的详细信息
- cp file1 file2 复制文件1到文件2中 #cp ../file1 .
- cp -r 复制文件目录下所有文件 # git -r ../images/
- vi 查看文件
# 配置 user 信息
- git config --global user.name 'your_name'
- git config --global user.email 'your_email@domain.com'
- 清除相关信息: git config --unset --global user.name(user.email)

## config 的三个作用域

**缺省等同于 local**
- git config --local 只对某个仓库有效
- git config --global 对当前用户所有仓库有效
- git config --system 对系统所有登录的用户有效

**显示 config 的配置，加 --list**

- git config --list --local
- git config --list --global
- git config --list --system

**查看固定的属性**

- git config --local user.name

# 搭建 Git 仓库
1. 把已有的项目代码纳入 Git 管理
    - cd 项目代码所在文件夹
    - git init
2. 新建的项目直接使用 Git 管理
    - cd 某个文件夹
    - git init your_project 会在当前路径下创建和项目名称同名的文件夹
    - cd your_project
3. global 和 local 参数同时存在时，local 优先级更高

# 常用命令
- git commit -a
    - Tell the command to automatically stage files that have been modified and deleted, but new files you have not told Git about are not affected
- git add
    - git add . 添加所有删除、添加、修改的文件
    - git add -u 添加所有修改、删除的文件（跟踪操作过的文件）
    - git add -A(--all) 等价于 git add .
- git mv 源文件名 新文件名 （git 文件重命名）
- git log 查看版本演变历史
  - git log --oneline 简洁版历史（单行历史）
  - git log -n3 查看最近的3次历史（可以与--oneline结合使用）
  - git log --all 查看全部分支的实例
  - git log --all --graph 查看所有分支图像化的 log 历史
  - git log --oneline --all -n4 --graph 查看所有分支最近4条单行的图形化历史
- git help --web log 跳转到 git log 的帮助文档网页

# .git 目录

- HEAD: 表示当前工作在那个分支上
- config: 存放相关配置信息
- refs: 存放分支
  - refs/tags: 存放tag, 又叫里程碑(当这次commit是具有里程碑意义的, 如项目1.0时, 就可以使用tag)
  - refs/heads, 存放分支

- objects：存放对象 .git/objects/ 文件夹中的子文件夹都是以哈希值的前两位字符命名 每个object由40位字符组成，前两位字符用来当文件夹，后38位做文件。
  - git cat-file -t 前2位+后28位, 类型位 **tree**

- cat 命令主要用来查看文件内容，创建文件，文件合并，追加文件内容等功能

  ​	- cat HEAD

- git cat-file 命令, 显示版本库对象的内容, 类型及大小信息
  - git cat-file -t  62340de0774   显示版本库对象的类型
  - git cat-file -p  62340de0774 显示版本库对象的内容, 文件类型位 **blob**
  - git cat-file -s  62340de0774  显示版本库对象的大小

- 查看分支: git branch -av
- 切换分支: git checkout master