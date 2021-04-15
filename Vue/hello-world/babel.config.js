module.exports = {
  presets: [
    // 嵌套[]
    [
      '@vue/cli-plugin-babel/preset',{ 
        "modules": false
      }
    ]
  ],
  plugins: [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}
