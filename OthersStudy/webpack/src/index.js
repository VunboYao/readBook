let button = document.createElement('button');
button.innerHTML = 'Hello';

// vue的懒加载
button.addEventListener('click', function() {
  // 草案中的语法， jsonP实现动态加载文件
  import('./other.js').then(data => {
    console.log(data.default);
  })
})

document.body.appendChild(button);
