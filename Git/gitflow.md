#  GitFlow

![1610533941465](C:\Users\VunboYao\AppData\Roaming\Typora\typora-user-images\1610533941465.png)

- master: 保存上线版本
- develop: 开发分支
- feature/home: 基于develop的功能开发分支
- feature/login:基于develop的功能开发分支
- release：基于develop的测试分支
- bugfix:基于release的测试未通过缺陷修复分支
- hotFix:紧急生产缺陷问题修复

# 优点

​		**利用gitFlow工作流程，功能点通过不同分支处理开发，方便问题定位，版本回退，缺陷修复。减少各类人为操作移动生产代码，避免代码遗漏，缺失导致的生产问题。**

主要包含的命令操作：

- `git branch 分支名称`： 建立分支

- `git merge 分支名称`：分支合并
- `git checkout Dev`： 分支切换。
- `git branch -d 分支名称`： 删除分支
- `git tag`：每一次生产版本标签定义。
- `git stash`：本地文件暂存。

- **以上命令均包含webstorm中可视化工具实现**

# 工作流程

团队成员

- 管理员
- 开发A
- 开发B

开发流程

- **以下演示代码均可用可视化工具实现**

- 常规新需求工单A=>开发A

  - 新建分支：基于现有开发功能分支develop，新建分支newFeature/A,交易开发

    ```c
    git branch // 查看分支
    git branch newFeature/A // 创建新分支
    ```

    

  - 开发完成: 合并 **当前分支newFeature/A** 代码至 **功能分支develop**，

    ```c
    // 开发完成后，提交代码
    git switch develop // 切换至develop分支
    git merge newFeature/A // 合并newFeature/A
    ```

  - 代码送测：**管理员**基于develop分支建立 **送测分支release/FeatureA**

    ```c
    git status // 查看当前状态，所在分支
    git checkout -b release/FeatureA // 建立送测分支(包含功能A)并自动切换至release/FeatureA
    ```

  - 测试通过：测试通过则**合并newFeature/A分支至生产分支master**

  - **警告：测试失败**

    1. 测试失败常常发生,失败时，基于当前测试分支release/FeatureA，新建bugFix/featureA

    2. 基于bugFix/featureA修复后，将代码提交至 release/FeatureA，重新发版测试

    3. 重复（1，2）直到通过为止
    4. **合并release/FeatureA至develop与master分支**。此处与直接测试通过不同，需要将测试分支中通过后的版本合并回develop总开发分支与生产分支。同时删除功能分支newFeature/A

