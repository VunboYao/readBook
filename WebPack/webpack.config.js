const path = require('path')

module.exports = {
    /* 
    devtool: 配置 source map
    */
    devtool: 'none',
    /*
    mode: 指定打包的模式，两种
    开发模式（development）: 不会对打包的JS代码进行压缩
    生产模式（production）: 会对打包的JS代码进行压缩
    */
    mode: 'development', // "production" | "development" | "none"

    /*
    entry: 指定打包需要的文件
    */
    entry: './src/entry',

    /*
    output: 指定打包之后的文件输出的路径和输出的文件名称
    */
    output: {
        /**
         * filename: 指定打包之后的JS文件的名称
         */
        filename: 'main.js',
        /**
         *  path: 指定打包之后的文件存储到什么地方
         */
        path: path.resolve(__dirname, 'dist')
    },
    /* 
    module: 告诉 webpack 如何处理 webpack 不能够识别的文件
    */
    module: {
        rules: [
            /* {
                        test: /\.(png|jpg|gif)$/,
                        use: [{
                            loader: 'file-loader',
                            options: {
                                publicPath: 'dist/images', // 文件的公共路径
                                name: '[name].[ext]', // 文件名称
                                outputPath: 'images' // 文件输出的目录
                            }
                        }]
                    } */
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 3,
                        publicPath: 'dist/images', // 文件的公共路径
                        name: '[name].[ext]', // 文件名称
                        outputPath: 'images' // 文件输出的目录
                    }
                }]
            }
        ]
    }
}