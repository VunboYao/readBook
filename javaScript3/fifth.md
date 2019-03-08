# 第20章 JSON

一种数据格式，不是一种编程语言。

## 语法

**JSON的语法可以表示以下三种类型的值**：
- 简单值：使用与 JavaScript 相同的语法，可以在 JSON 中表示字符串、数值、布尔值和 null 。但 JSON 不支持 JavaScript 中的特殊值 undefined 。
- 对象：对象作为一种复杂数据类型，表示的是一组无序的键值对儿。而每个键值对儿中的值可以是简单值，也可以是复杂数据类型的值。
- 数组：数组也是一种复杂数据类型，表示一组有序的值的列表，可以通过数值索引来访问其中的值。数组的值也可以是任意类型——简单值、对象或数组。

### 简单值

JavaScript 字符串与 JSON 字符串的最大区别在于，JSON 字符串必须使用双引号（单引号会导致语法错误）。布尔值和 null 也是有效的 JSON 形式。

### 对象

- 对象的属性必须加双引号，这在 JSON 中是必需的。属性的值可以是简单值，也可以是复杂类型值
- 没有声明变量和末尾的分号

### 数组

- JSON 数组也没有变量和分号

### JSON对象

- stringify()，把 JavaScript 对象序列化为JSON字符串。
- parse()，把JSON字符串解析为原生JavaScript值。

```
let book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C.Za'
    ],
    edition: 3,
    year: 2011
};
let jsonText = JSON.stringify(book);

这个例子使用 JSON.stringify() 把一个 JavaScript 对象序列化为一个 JSON 字符串，然后将它保
存在变量 jsonText 中。默认情况下， JSON.stringify() 输出的 JSON 字符串不包含任何空格字符或
缩进，因此保存在 jsonText 中的字符串如下所示

// {"title":"Professional JavaScript","authors":["Nicholas C. Za"],"edition":3,"year":2011}


将 JSON 字符串直接传递给 JSON.parse() 就可以得到相应的 JavaScript 值。例如，使用下列代码
就可以创建与 book 类似的对象

let bookCopy = JSON.parse(jsonText);

注意，虽然 book 与 bookCopy 具有相同的属性，但它们是两个独立的、没有任何关系的对象。
```

> **在序列化 JavaScript 对象时，所有函数及原型成员都会被有意忽略，不体现在结果中。此外，值为 undefined 的任何属性也都会被跳过。结果中最终都是值为有效 JSON 数据类型的实例属性**

> **如果传给 JSON.parse() 的字符串不是有效的 JSON，该方法会抛出错误。**

### 序列化选项

 JSON.stringify() 除了要序列化的 JavaScript 对象外，还可以接收另外两个参数，这两个参数用于指定以不同的方式序列化 JavaScript 对象。第一个参数是个过滤器，可以是一个数组，也可以是一个函数；第二个参数是一个选项，表示是否在 JSON 字符串中保留缩进。单独或组合使用这两个参数，可以更全面深入地控制 JSON 的序列化。

1.**过滤结果**
- 如果过滤器参数是数组，那么 JSON.stringify() 的结果中将只包含数组中列出的属性。
- 如果第二个参数是函数，行为稍有不同。传入的函数接收两个参数，属性名和属性值。属性名只能是字符串，而在值并非键值对儿的值时，键名可以是空字符串。**如果函数返回了 undefined，那么相应的属性会被忽略。**

```
let book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C. Za'
    ],
    edition: 3,
    year: 2011
};

let jsonText = JSON.stringify(book,function (key, value) {
  switch (key) {
      case 'authors':
          return value.join(',')
      case 'year':
          return 5000
      case 'edition':
          return undefined;
      default:
          return value;
  }
})
console.log(jsonText); 
// {"title":"Professional JavaScript","authors":"Nicholas C. Za","year":5000} 
```

2. **字符串缩进**

JSON.stringify() 方法的第三个参数用于控制结果中的缩进和空白符。
- 如果这个参数是一个数值，那它表示的是每个级别缩进的空格数。最大缩进值10
- 如果缩进参数是一个字符串而非数值，则这个字符串将在JSON字符串中被用作缩进字符（不再使用空格）


3. **toJSON()方法**

可以给对象定义 toJSON() 方法，返回其自身的 JSON 数据格式。这个对象也将被序列化为一个简单的字符串而非对象。

```
let book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C. Za'
    ],
    edition: 3,
    year: 2011,
    toJSON: function () {
        return this.title;
    }
};
let json = JSON.stringify(book);
console.log(json); // "Professional JavaScript" 
```

toJSON() 可以作为函数过滤器的补充，因此理解序列化的内部顺序十分重要。假设把一个对象传入 JSON.stringify() ，序列化该对象的顺序如下
1. 如果存在 toJSON() 方法而且能通过它取得有效的值，则调用该方法。否则，返回对象本身。
2. 如果提供了第二个参数，应用这个函数过滤器。传入函数过滤器的值是第(1)步返回的值。
3. 对第(2)步返回的每个值进行相应的序列化
4. 如果提供了第三个参数，执行相应的格式化。

### 解析选项

JSON.parse()方法也可以接收另一个参数，该参数是一个函数，将在每个键值对儿上调用。为了区别 JSON.stringify() 接收的替换（过滤）函数（replacer），这个函数被称为还原函数（reviver），但实际上这两个函数的签名是相同的——它们都接收两个参数，一个键和一个值，而且都需要返回一个值。

如果还原函数返回 undefined ，则表示要从结果中删除相应的键；如果返回其他值，则将该值插
入到结果中。在将日期字符串转换为 Date 对象时，经常要用到还原函数。

```
let book = {
    title: 'Professional JavaScript',
    authors: [
        'Nicholas C. Za'
    ],
    edition: 3,
    year: 2011,
    releaseDate: new Date(2011,11,1)
};
let jsonText = JSON.stringify(book);
let bookCopy = JSON.parse(jsonText, function(key, value) {
    if (key === 'releaseDate') {
        return new Date(value);
    } else {
        return value;
    }
});
console.log(bookCopy.releaseDate.getFullYear()); // 2011 
```

# Ajax 与 Comet

## XMLHttpRequest 对象

let xhr = new XMLHttpRequest();

### XHR 的用法

```
// 1.创建一个异步对象
let xhr = new XMLHttpRequest();

// 2.设置请求方式与地址
/*
* method: 请求的类型： GET 或 POST
* url: 文件在服务器上的位置
* async: true(异步) 或 false(同步)
* */
xhr.open('get', 'example.php', false);
// 3.发送请求
/*这里的 send() 方法接收一个参数，即要作为请求主体发送的数据。如果不需要通过请求主体发送数据，则必须传入 null ，因为这个参数对有些浏览器来说是必需的。调用 send() 之后，请求就会被分派到服务器。*/
xhr.send(null);

// 4.监听状态的变化
xhr.onreadystatechange = function() {
    /*
    * 0：未初始化。尚未调用open(方法）
    * 1：启动。已经调用 open() 方法，但尚未调用 send() 方法。
    * 2：发送。已经调用send()方法，但尚未接收到响应
    * 3：接收。已经接收到部分响应数据
    * 4：完成。已经接收到全部响应数据，而且已经可以在客户端使用了。
    * */
    if (xhr.readyState === 4) {
        // 判断是否请求成功
        if ((xhr.status >= 200 && xhr.status < 300) ||  xhr.status === 304) {
            // 5.处理结果
            console.log(xhr.responseText);
        } else {
            alert('Request was unsuccessful: ' + xhr.status);
        }
    }
} 
```

- send 请求发送并收到响应之后，响应的数据会自动填充XHR对象的属性。
    - responseText: 作为响应主体被返回的文本
    - responseXML: 如果响应的内容类型是 "text/xml" 或 "application/xml" ，这个属性中将保存包含着响应数据的 XML DOM 文档。
    - status: 响应的 HTTP 状态
    - statusText: HTTP 状态的说明

- xhr.abort().接收到响应之前，可以通过调用该方法来取消异步请求。
- IE兼容老版本，5，6
    ```
    // 1.创建对象
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    } 
    ```
- 在IE浏览器中，缓存问题，当修改内容后，仍然是第一次的内容。所以需要保证每次请求的内容都不一样。
    ```
    xhr.open("GET","01.txt?t="+(new Date().getTime()),true);
    // 或者 Math.random() 
    ```

### HTTP头部信息

默认情况下，发送 XHR 请求的同时，还会发生下列头部信息
- Accept: 浏览器能够处理的内容类型
- Accept-Charset: 浏览器能够识别的字符集
- Accept-Encoding: 浏览器能够处理的压缩编码。
- Accept-Language: 浏览器当前设置的语言
- Connection: 浏览器与服务器之间连接的类型
- Cookie: 当前页面设置的任何 Cookie
- Host: 发出请求的页面所在的域。
- Referer: 发出请求的页面的URL。注意，HTTP 规范将这个头部字段拼写错了，而为保证与规范一致，也只能将错就错了。（这个英文单词的正确拼法应该是 referrer。）
- User-Agent: 浏览器的用户代理字符串

**使用 setRequestHeader() 方法可以设置自定义的请求头部信息。这个方法接受两个参数：头部字段的名称和头部字段的值。要成功发送请求头部信息，必须在调用 open() 方法之后且调用 send() 方法之前调用 setRequestHeader()**

```
xhr.setRequestHeader("MyHeader", "MyValue"); 
```
- 调用 XHR 对象的 getResponseHeader() 方法并传入头部字段名称，可以取得相应的响应头部信息。
- 调用 getAllResponseHeaders() 方法则可以取得一个包含所有头部信息的长字符串。

### GET请求

> 使用 GET 请求经常会发生的一个错误，就是查询字符串的格式有问题。查询字符串中每个参的名称和值都必须使用 encodeURIComponent() 进行编码，然后才能放到 URL的末尾；而且所有名-值对儿都必须由和号（&）分隔。如下所示：

```
 xhr.open("get", "example.php?name1=value1&name2=value2", true);
```

下面这个函数可以辅助向现有 URL 的末尾添加查询字符串参数：

```
function addURLParam(url, name, value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
} 

//这个 addURLParam() 函数接受三个参数：要添加参数的 URL、参数的名称和参数的值。这个函数
首先检查 URL 是否包含问号（以确定是否已经有参数存在）。如果没有，就添加一个问号；否则，就添
加一个和号。然后，将参数名称和值进行编码，再添加到 URL 的末尾。最后返回添加参数之后的 URL。
```

### POST请求

- 将 Content-Type 头部信息设置为 application/x-www-form-urlencoded

### 实现jQuery中的AJAX

```
function obj2str(data) {
    // 定义时间戳
    data.t = new Date().getTime();
    let res = []
    for (let key in data) {
        // 遍历对象，转换成字符串，加入数组。同时中文转码处理
        res.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    // 用 & 符号链接字符串
    return res.join('&');
}

function ajax(option) {
    // 0 将对象转换为字符串
    let str = obj2str(option.data);
    // 1.创建对象,定时器
    let xhr, timer;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // 2.设置请求方式和地址,并解决IE中缓存问题
    if (option.type.toLocaleUpperCase() === 'GET') {
        xhr.open(option.type, option.url + "?" + str, true);
        // 3. 发送请求
        xhr.send(null);
    } else {
        // Post 提交
        xhr.open(option.type, option.url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(option.str);
    }
    // 4. 监听状态变化
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            clearInterval(timer); // 清除定时器
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                option.success(xhr);
            } else {
                option.error(xhr);
            }
        }
    }

    // 判断超时
    if (option.timeout) {
        timer = setInterval(function () {
            console.log('中断请求');
            xhr.abort(); // 中断请求
            clearInterval(timer);
        }, option.timeout)
    }
} 
```

## XMLHttpRequest2级

### FormData

FormData 为序列化表单以及创建与表单格式相同的数据(用于通过XHR传输)提供了便利。
```
let data = new FormData();
data.append("name","Nicholas"); 
```
这个 append() 方法接收两个参数：键和值，分别对应表单字段的名字和字段中包含的值。可以像这样添加任意多个键值对儿。而通过向 FormData 构造函数中传入表单元素，也可以用表单元素的数据预先向其中填入键值对儿。
```
let data = new FormData(document.forms[0]); 
```
创建了 FormData 的实例后，可以将它直接传给 XHR 的 send() 方法。使用 FormData 的方便之处体现在不必明确地在 XHR 对象上设置请求头部。XHR 对象能够识别传入的数据类型是 FormData 的实例，并配置适当的头部信息

### 超时设定

在给 timeout 设置一个数值后，如果在规定的时间内浏览器还没有接收到响应，那么就会触发 timeout 事件，进而会调用 ontimeout 事件处理程序.

### overrideMimeType() 方法

该方法重写XHR响应的MIME类型。必须在 send() 方法之前，才能保证重写响应的 MIME 类型。

## 进度事件

- loadstart: 在接收到响应数据的第一个字节时触发。
- progress: 在接收到响应期间持续不断地触发。
- error: 在请求发生错误时触发
- abort: 在因为调用 abort() 方法而终止连接时触发。
- load: 在接收到完整的响应数据时触发。
- loadend: 在通信完成或者触发 error、abort 或 load 事件后触发。

每个请求都从触发 loadstart 事件开始，接下来是一或多个 progress 事件，然后触发 error 、abort 或 load 事件中的一个，最后以触发 loadend 事件结束。

### load事件

只要浏览器接收到服务器的响应，不管其状态如何，都会触发 load 事件。而这意味着你必须要检查 status 属性，才能确定数据是否真的已经可用了

```
var xhr = new XMLHttpRequest();
xhr.onload = function(){
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
        alert(xhr.responseText);
    } else {
        alert("Request was unsuccessful: " + xhr.status);
    }
};
xhr.open("get", "altevents.php", true);
xhr.send(null); 
```
### progress事件

upload属性，定义了 progress 事件，这个事件会在浏览器接收新数据期间周期性地触发。而 onprogress 事件处理程序会接收到一个 event 对象，其 target 属性是 XHR 对象，包含着三个额外的属性： lengthComputable、loaded 和 total。
 - lengthComputable表示进度信息是否可用的布尔值
 - loaded，表示已经接收的字节数。
 - total, 表示根据 Content-Length 响应头部确定的预期字节数

```
xhr.upload.onprogress = function (e) {
    console.log(e.loaded / e.total);
} 
```

## 跨越资源共享

CORS (Cross-Origin Resource Sharing，跨越资源共享)基本思想，使用自定义的 HTTP 头部让浏览器与服务器进行沟通，从而决定请求或响应是否应该成功or失败。

> 比如一个简单的使用 GET 或 POST 发送的请求，它没有自定义的头部，而主体内容是 text/plain。在发送该请求时，需要给它附加一个额外的 Origin 头部，其中包含请求页面的源信息（协议、域名和端口），以便服务器根据这个头部信息来决定是否给予响应。下面是 Origin 头部的一个示例：
  ```
   Origin: http://www.nczonline.net
  ```
> 如果服务器认为这个请求可以接受，就在 Access-Control-Allow-Origin 头部中回发相同的源信息（如果是公共资源，可以回发 "*" ）。例如：
```
Access-Control-Allow-Origin: http://www.nczonline.net 
```

### 同源策略

协议 域名 端口 同域

### 为什么不支持跨域

- cookie LocalStorage
- DOM元素也有同源策略 iframe
- ajax

### 实现跨越

- jsonp, 只能发送get请求，不支持post, put, delete。不安全，xss攻击，不采用
- cors，服务器设置相应的头
- postMessage.——XDM
- document.domain
- window.name.——转换,a与b同源，c不同源。a引用c,c把值放到window.name.a把引用转换为b。a再去b拿window.name
- location.hash
- http-proxy
- nginx
- websocket




















