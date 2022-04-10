function GetWebData(URL) {
  // 1.新建XMLHttpRequest请求对象
  let xhr = new XMLHttpRequest()

  // 2.注册相关事件回调处理函数
  xhr.onreadystatechange = function () {
    switch (xhr.readyState) {
      case 0:
        console.log('请求未初始化,尚未调用open方法')
        break
      case 1:
        console.log('OPENED，尚未调用send方法')
        break
      case 2:
        console.log('Sent.已调用send方法，尚未收到响应')
        break
      case 3:
        console.log('Receiving，已收到部分响应')
        break
      case 4:
        if (this.status >= 200 && this.status < 300) {
          console.log('Complete,已收到所有的响应了')
        }
        console.log('DONE')
        break;
    }
  }

  xhr.ontimeout = function () {
    console.log('ontimeout');
  }

  xhr.onerror = function () {
    console.log('onerror');
  }
  
  // 3.打开请求
  xhr.open('Get', URL, true) // 创建一个Get请求，采用异步

  // 4.配置参数
  xhr.timeout = 3000
  xhr.responseType = 'text'
  xhr.setRequestHeader('X_TEST', 'vunbo.com')

  // 5.发送请求
  xhr.send()
}