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
