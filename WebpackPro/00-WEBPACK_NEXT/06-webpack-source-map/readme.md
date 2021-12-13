# production

    - 默认不生成 soure-map
    - eval: 无 source-map.代码后拼接sourceUrl.精确显示行列
    -  false: 无 source-map.无行列
    - source-map: 独立source-map文件，bundle中注释地址指向source-map文件.精确行列
    - eval-source-map: 会生成sourcemap，但是source-map是以DataUrl添加到eval函数的后面。
    - inline-source-map: 会生成sourcemap，但是source-map是以DataUrl添加到bundle文件的后面.精确行列
    - cheap-source-map: 无
    - cheap-module-source-map: 无

# development

    - 默认：eval.无 source-map.代码后拼接sourceUrl.精确显示行列
    - false: 无 source-map.无行列
    - source-map: 独立source-map文件，bundle中注释地址指向source-map文件.未压缩bundle。精确行列
    - eval-source-map:会生成sourcemap，但是source-map是以DataUrl添加到eval函数的后面.
    - inline-source-map: 会生成sourcemap，但是source-map是以DataUrl添加到bundle文件的后面。精确行列
    - cheap-source-map： 生成sourcemap.包含loader处理的代码位置会变更
    - cheap-module-source-map: 生成sourcemap。对loader模块的支持更好。保证代码的位置不会变更
    - nosources-source-map：会生成sourcemap，但是生成的sourcemap只有错误信息的提示，不会生成源代码文件；
    - hidden-source-map：会生成sourcemap，但是不会对source-map文件进行引用；相当于删除了打包文件中对sourcemap的引用注释；


# 组合规则

    - inline|hidden|eval: 三选一
    - nosources: 可选
    - cheap可选。可以跟随module
    - [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

# 开发中
    
    - 开发阶段： cheap-moduel-source-map
    - 测试阶段： source-map或者 cheap-module-source-map
    - 生产阶段： false、不写
