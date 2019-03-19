# 第 20 章 JSON

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

# 第 21 章 Ajax 与 Comet

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
        xhr.send(str);
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
- document.domain——**一级域名和二级域名使用**
- window.name.——转换,a与b同源，c不同源。a引用c,c把值放到window.name.a把引用转换为b。a再去b拿window.name
- location.hash——a通过iframe将hash传给c,c把hash传给b,b再传给a
- http-proxy
- nginx—— 配置请求头信息
- websocket。高级API

### 其他浏览器对CORS的实现

要请求位于另一个域中的资源，使用标准的XHR对象并在 open() 方法中传入绝对的URL即可。

```
let xhr = new XMLHttpRequest();
xhr.open('get','http://127.0.0.1/example.php', true); // 绝对路径
xhr.send(null)
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            console.log(xhr.response);
        }
    }
} 
```
跨越XHR对象也有一些限制，但为了安全这些限制是必须的
- 不能使用setRequestHeader()设置自定义头部
- 不能发送和接收 cookie
- 调用 getAllResponseHeaders() 方法总会返回空字符串
> 由于无论同源请求还是跨越请求都使用相同的接口，因此对于本地资源，最好使用相对URL，在访问远程资源时再使用绝对URL。这样做能消除歧义，避免出现限制访问头部或本地 cookie 信息等问题。

### Preflighted Requests（预检）

CORS 通过一种叫做 Preflighted Requests 的透明服务器验证机制支持开发人员使用自定义的头部、 GET 或 POST 之外的方法，以及不同类型的主要内容。在使用下列高级选项来发送请求时，就会向服务器发送一个 Preflight 请求。这种请求使用 OPTIONS 方法，发送下列头部。
- Origin： 与简单的请求相同。
- Access-Control-Request-Method: 请求自身使用的方法。
- Access-Control-Request-Headers: (可选)自定义的头部信息，多个头部以逗号分隔
    ```
    Origin: http://www.nczonline.net
    Access-Control-Request-Method: POST
    Access-Control-Request-Headers: NCZ 
    ```
发送这个请求后，服务器可以决定是否允许这种类型的请求。服务器通过在响应中发送如下头部与浏览器进行沟通
- Access-Control-Allow-Origin ：与简单的请求相同
- Access-Control-Allow-Methods ：允许的方法，多个方法以逗号分隔
- Access-Control-Allow-Headers ：允许的头部，多个头部以逗号分隔
- Access-Control-Max-Age ：应该将这个 Preflight 请求缓存多长时间（以秒表示）
    ```
    Access-Control-Allow-Origin: http://www.nczonline.net
    Access-Control-Allow-Methods: POST, GET
    Access-Control-Allow-Headers: NCZ
    Access-Control-Max-Age: 1728000 
    ```
> Preflight 请求结束后，结果将按照响应中指定的时间缓存起来。而为此付出的代价只是第一次发送这种请求时会多一次 HTTP 请求。

### 带凭据的请求

> 默认情况下，跨源请求不提供凭据（cookie、HTTP 认证及客户端 SSL 证明等）。通过将 withCredentials 属性设置为 true ，可以指定某个请求应该发送凭据。如果服务器接受带凭据的请求，会用下面的 HTTP 头部来响应。

    ```
    Access-Control-Allow-Credentials: true 
    ```
> 如果发送的是带凭据的请求，但服务器的响应中没有包含这个头部，那么浏览器就不会把响应交给JavaScript（于是， responseText 中将是空字符串， status 的值为 0，而且会调用 onerror() 事件处理程序）。另外，服务器还可以在 Preflight 响应中发送这个 HTTP 头部，表示允许源发送带凭据的请求。

## 其他跨域技术

### 图像Ping

- 动态创建图像经常用于图像Ping.图像Ping是与服务器进行简单、单向的跨域通信的一种方式。请求的数据是通过查询字符串形式发送的，而响应可以是任意内容，但通常是像素图或204响应。通过图像Ping，浏览器得不到任何具体的数据，但通过侦听 load 和 error 事件，能知道响应是什么时候接收到的。
- 图像 Ping 最常用于跟踪用户点击页面或动态广告曝光次数。图像 Ping 有两个主要的缺点，一是只
能发送 GET 请求，二是无法访问服务器的响应文本。因此，图像 Ping 只能用于浏览器与服务器间的单
向通信。

```
<input id="btn" type="button" value="跨域请求">
<div id="result"></div>
<script>
    let add = (function(){
        let counter = 0;
        return function () {
            return ++counter;
        }
    })();
    document.getElementById('btn').onclick = function () {
        let sum = add();
        let result = document.getElementById('result');
        let img = result.getElementsByTagName('img')[0];
        if (!img) {
            img = new Image();
        }
        img.height = 100;
        img.onload = img.onerror = function () {
            result.appendChild(img);
            let oSpan = document.getElementById('sum');
            if (!oSpan) {
                oSpan = document.createElement('span');
                oSpan.id = 'sum';
            }
            oSpan.innerHTML = '发送请求的次数：' + sum;
            result.appendChild(oSpan);
        }
        if (sum % 2) {
            img.src = 'https://timgsa.baidu.com/timg?sum='+sum;
        } else {
            img.src = 'https://timgsa.baidu.com/timg?sum='+sum;
        }
    }
</script> 
```

### JSONP

JSONP 是 JSON with padding (填充式 JSON 或参数式 JSON) 的简写，是应用 JSON 的一种新方法，再后来的 Web 服务中非常流行。 JSONP 看起来与 JSON 差不多，只不过是被包含在函数调用中的 JSON。
    ```
    callback({"name": "Nicholas" }); 
    ```
- JSONP 由两部分组成：回调函数和数据。回调函数是当响应到来时应该在页面中调用的函数。回调函数的名字一般是在请求中指定的。而数据就是传入回调函数中的JSON数据。下面是一个典型的JSONP请求。
    ```
     function handleResponse(response) {
         alert("'You' re at IP address " + response.ip + ", which is in " + response.city + ", " + response.region_name);
     }
     
     let script = document.createElement('script')
     script.src = "http://freegeoip.net/json/?callback=handleResponse";
     document.body.insertBefore(script, document.body.firstChild);
    ```

- 与图像 Ping 相比，它的优点在于能够直接访问响应文本，支持在浏览器与服务器之间双向通信。不过，JSONP 也有两点不足。
    - 首先，JSONP 是从其他域中加载代码执行。如果其他域不安全，很可能会在响应中夹带一些恶意代码，而此时除了完全放弃 JSONP 调用之外，没有办法追究。因此在使用不是你自己运维的 Web 服务时， 一定得保证它安全可靠
    - 其次，要确定 JSONP 请求是否失败并不容易。

### Comet

- Ajax 是一种从页面向服务器请求数据的技术，而 Comet 则是一种服务器向页面推送数据的技术。
- Comet 能够让信息近乎实时地被推送到页面上，非常适合处理体育比赛的分数和股票报价。
- 有两种实现 Comet 的方式： 长轮询和流。
    - 长轮询是传统轮询（也称为短轮询）的一个翻版，即浏览器定时向服务器发送请求，看有没有更新的数据
![短轮询](http://www.vunbo.com/usr/uploads/2019/03/3861257271.png)        
    - 长轮询把短轮询颠倒了一下。页面发起一个到服务器的请求，然后服务器一直保持连接打开，直到有数据可发送。发送完数据之后，浏览器关闭连接，随即又发起一个到服务器的新请求。这一过程在页面打开期间一直持续不断。
![长轮询](http://www.vunbo.com/usr/uploads/2019/03/242969576.png)
> 无论是短轮询还是长轮询，浏览器都要在接收数据之前，先发起对服务器的连接。两者最大的区别在于服务器如何发送数据。短轮询是服务器立即发送响应，无论数据是否有效，而长轮询是等待发送响应。轮询的优势是所有浏览器都支持，因为使用 XHR 对象和 setTimeout() 就能实现。而你要做的就是决定什么时候发送请求。

- 第二种流行的 Comet 实现是 HTTP 流。流不同于上述两种轮询，因为它在页面的整个生命周期内只使用一个 HTTP 连接。浏览器向服务器发送一个请求，而服务器保持连接打开，然后周期性地向浏览器发送数据。

### 服务器发送事件

> SSE（Server-Sent Events，服务器发送事件）是围绕只读 Comet 交互推出的 API 或者模式。SSE API用于创建到服务器的单向连接，服务器通过这个连接可以发送任意数量的数据。服务器响应的 MIME类型必须是 text/event-stream ，而且是浏览器中的 JavaScript API 能解析格式输出。SSE 支持短轮询、长轮询和 HTTP 流，而且能在断开连接时自动确定何时重新连接。

**1.SSE API**

- SSE 的 JavaScript API 与其他传递消息的 JavaScript API 很相似。要预订新的事件流，首先要创建一个新的 EventSource 对象，并传进一个入口点：
    ```
    var source = new EventSource("myevents.php"); 
    ```
> 注意，传入的 URL 必须与创建对象的页面同源（相同的 URL 模式、域及端口）。 EventSource 的实例有一个 readyState 属性，值为 0 表示正连接到服务器，值为 1 表示打开了连接，值为 2 表示关闭了连接。

另外，还有以下三个事件。
- open ：在建立连接时触发。 
- message ：在从服务器接收到新事件时触发。
- error ：在无法建立连接时触发。

就一般的用法而言， onmessage 事件处理程序也没有什么特别的。

```
source.onmessage = function(event){
var data = event.data;
//处理数据
};
```
服务器发回的数据以字符串形式保存在 event.data 中

默认情况下， EventSource 对象会保持与服务器的活动连接。如果连接断开，还会重新连接。这
就意味着 SSE 适合长轮询和 HTTP 流。如果想强制立即断开连接并且不再重新连接，可以调用 close()
方法。

```
source.close(); 
```

**2.事件流**

所谓的服务器事件会通过一个持久的 HTTP 响应发送，这个响应的 MIME 类型为 text/event-stream 。响应的格式是纯文本，最简单的情况是每个数据项都带有前缀 data: ，例如
- data: foo
- data: bar
- data: foo
- data: bar 

对以上响应而言，事件流中的第一个 message 事件返回的 event.data 值为 "foo" ，第二个
message 事件返回的 event.data 值为 "bar" ，第三个 message 事件返回的 event.data 值为
"foo\nbar" （注意中间的换行符）。对于多个连续的以 data: 开头的数据行，将作为多段数据解析，
每个值之间以一个换行符分隔。只有在包含 data: 的数据行后面有空行时，才会触发 message 事件，
因此在服务器上生成事件流时不能忘了多添加这一行。

通过 id: 前缀可以给特定的事件指定一个关联的 ID，这个 ID 行位于 data: 行前面或后面皆可：
- data: foo
- id: 1

设置了 ID 后， EventSource 对象会跟踪上一次触发的事件。如果连接断开，会向服务器发送一个
包含名为 Last-Event-ID 的特殊 HTTP 头部的请求，以便服务器知道下一次该触发哪个事件。在多次
连接的事件流中，这种机制可以确保浏览器以正确的顺序收到连接的数据段

### Web Sockets

- 在 JavaScript 中创建了 Web Socket 之后，会有一个 HTTP 请求发送到浏览器以发起连接。在取得服务器响应后，建立的连接会使用 HTTP 升级从 HTTP 协议交换为 Web Socket 协议。
- 未加密的连接不再是 http:// ，而是 ws:// ；加密的连接也不是 https:// ，而是 wss:// 。
- 使用自定义协议而非 HTTP 协议的好处是，能够在客户端和服务器之间发送非常少量的数据，而不必担心 HTTP 那样字节级的开销。由于传递的数据包很小，因此 Web Sockets非常适合移动应用

**1.Web Sockets API**

要创建 Web Socket，先实例一个 WebSocket 对象并传入要连接的 URL：

```
 let socket = new WebSocket("ws://www.example.com/server.php"); 
```
> 必须给 WebSocket 构造函数传入绝对URL。同源策略对 Web Socket 不适用，因此可以通过它打开到任何站点的连接。

- 实例化了 WebSocket 对象后，浏览器就会马上尝试创建连接。与 XHR 类似， WebSocket 也有一个表示当前状态的 readyState 属性。
    - WebSocket.OPENING (0)：正在建立连接。
    - WebSocket.OPEN (1)：已经建立连接。
    - WebSocket.CLOSING (2)：正在关闭连接。
    - WebSocket.CLOSE (3)：已经关闭连接。
- 要关闭 Web Socket 连接，可以在任何时候调用 close() 方法。`socket.close()`
- 调用了 close() 之后， readyState 的值立即变为 2（正在关闭），而在关闭连接后就会变成 3

**2.发送和接收数据**

- 向服务器发送数据，使用send()方法并传入任意字符串。
    ```
     let socket = new WebSocket('ws://localhost:3000');
     socket.onopen = function () {
         socket.send('Hello world!');
     }
    ```
> 因为 Web Sockets只能通过连接发送纯文本数据，所以对于复杂的数据结构，在通过连接发送之前，必须进行序列化

- 当服务器向客户端发来消息时，WebSocket 对象就会触发 message 事件。返回的数据保存在 event.data 中
    ```
    socket.onmessage = function (ev) {
        console.log(ev.data);
    } 
    ```

**3.其他事件**

WebSocket 对象还有其他三个事件，在连接生命周期的不同阶段触发
- open: 在成功建立连接时触发。
- error: 在发生错误时触发，连接不能持续
- close: 在连接关闭时触发。
WebSocket 对象不支持 DOM 2 级事件侦听器，因此必须使用 DOM 0 级语法分别定义每个事件处理程序

```
let socket = new WebSocket('ws://localhost:3000');
socket.onopen = function () {
    socket.send('Hello world!');
}
socket.onmessage = function (ev) {
    console.log(ev.data);
}
socket.onclose = function () {
    console.log('关闭服务');
} 
```

在这三个事件中，只有 close 事件的event 对象有额外的信息。这个事件的事件对象有三个额外的属性：wasClean、code 和 reason。 其中，wasClean 是一个布尔值，表示连接是否已经明确关闭； code 是服务器返回的数值状态码； 而 reason 是一个字符串，包含服务器发回的信息。

### SSE 与 Web Sockets

> 面对某个具体的用例，在考虑是使用 SSE 还是使用 Web Sockets 时，可以考虑如下几个因素。首先，你是否有自由度建立和维护 Web Sockets服务器？因为 Web Socket 协议不同于 HTTP，所以现有服务器不能用于 Web Socket 通信。SSE 倒是通过常规 HTTP 通信，因此现有服务器就可以满足需求。
  
> 第二个要考虑的问题是到底需不需要双向通信。如果用例只需读取服务器数据（如比赛成绩），那么 SSE 比较容易实现。如果用例必须双向通信（如聊天室），那么 Web Sockets 显然更好。别忘了，在不能选择 Web Sockets 的情况下，组合 XHR 和 SSE 也是能实现双向通信的。

## 安全

对于未被授权系统有权访问某个资源的情况，我们称之为 CSRF（Cross-Site Request Forgery，跨站点请求伪造）。未被授权系统会伪装自己，让处理请求的服务器认为它是合法的。受到 CSRF 攻击的 Ajax程序有大有小，攻击行为既有旨在揭示系统漏洞的恶作剧，也有恶意的数据窃取或数据销毁。为确保通过 XHR 访问的 URL 安全，通行的做法就是验证发送请求者是否有权限访问相应的资源

- 要求以 SSL 连接来访问可以通过 XHR 请求的资源。
- 要求每一次请求都要附带经过相应算法计算得到的验证码。

请注意，下列措施对防范 CSRF 攻击不起作用。

- 要求发送 POST 而不是 GET 请求——很容易改变。
- 检查来源 URL 以确定是否可信——来源记录很容易伪造。
- 基于 cookie 信息进行验证——同样很容易伪造。

## 小结

Ajax 是无需刷新页面就能够从服务器取得数据的一种方法。关于 Ajax，可以从以下几方面来总结一下。
- 负责 Ajax 运作的核心对象是 XMLHttpRequest （XHR）对象。
- XHR 对象由微软最早在 IE5 中引入，用于通过 JavaScript 从服务器取得 XML 数据。

同源策略是对 XHR 的一个主要约束，它为通信设置了“相同的域、相同的端口、相同的协议”这一限制。试图访问上述限制之外的资源，都会引发安全错误，除非采用被认可的跨域解决方案。这个解决方案叫做 CORS（Cross-Origin Resource Sharing，跨源资源共享），IE8 通过 XDomainRequest 对象支持CORS，其他浏览器通过 XHR 对象原生支持 CORS。图像 Ping 和 JSONP 是另外两种跨域通信的技术，但不如 CORS 稳妥

Comet 是对 Ajax 的进一步扩展，让服务器几乎能够实时地向客户端推送数据。实现 Comet 的手段主要有两个：长轮询和 HTTP 流。所有浏览器都支持长轮询，而只有部分浏览器原生支持 HTTP 流。SSE（Server-Sent Events，服务器发送事件）是一种实现 Comet 交互的浏览器 API，既支持长轮询，也支持HTTP 流。

Web Sockets是一种与服务器进行全双工、双向通信的信道。与其他方案不同，Web Sockets 不使用 HTTP 协议，而使用一种自定义的协议。这种协议专门为快速传输小数据设计。虽然要求使用不同的 Web 服务器，但却具有速度上的优势。

# 第 22 章 高级技巧

## 高级函数

### 安全的类型检测

在任何值上调用 Object 原生的 toString() 方法，都会返回一个 **[object NativeConstructorName]** 格式的字符串。每个类在内部都有一个[[Class]]属性，这个属性中就指定了上述字符串中的构造函数名。

- 由于原生数组的构造函数名与全局作用域无关，因此使用 toString() 就能保证返回一致的值。
    ```
    function isArray(value) {
        return Object.prototype.toString.call(value) === '[object Array]'
    } 
    ```
- 同样，也可以基于这一思路来测试某个值是不是原生函数或正则表达式：
    ```
    function isFunction(value) {
        return Object.prototype.toString.call(value) === '[object Function]'
    }
    function isRegExp(value) {
        return Object.prototype.toString.call(value) === '[object RegExp]'
    } 
    ```

### 作用域安全的构造函数

构造函数的注意点，首字母大写以及调用时注意 **new**

### 惰性载入函数

### 函数绑定

### 函数柯里化

## 防篡改对象

### 不可扩展对象

- 默认情况下，所有对象都是可以扩展的。任何时候都可以向对象中添加属性和方法。
- Object.preventExtensions() 方法可以改变这个行为，让你不能再给对象添加属性和方法
- 使用 Object.istExtensible() 方法还可以确定对象是否可以扩展。

### 密封的对象

- 密封对象不可扩展，而且已有成员的 **[Configurable]** 特性将被设置成 false.这就意味着不能删除属性和方法，因为不能使用 Object.defineProperty() 把数据属性修改为访问器属性，或者相反。属性值是可以修改的。
- 要密封对象，可以使用 Object.seal() 方法。
- 使用 Object.isSealed() 方法可以确定对象是否被密封了
- 因为被密封的对象不可扩展，所以用 Object.isExtensible() 检测密封的对象也会返回 false 。

### 冻结的对象

最严格的防篡改级别是冻结对象（frozen object）。冻结的对象既不可扩展，又是密封的，而且对象数据属性的 [[Writable]] 特性会被设置为 false 。如果定义 [[Set]] 函数，访问器属性仍然是可写的。ECMAScript 5定义的 Object.freeze() 方法可以用来冻结对象。

```
var person = { name: "Nicholas" };
Object.freeze(person);

person.age = 29;
alert(person.age); //undefined

delete person.name;
alert(person.name); //"Nicholas"

person.name = "Greg";
alert(person.name); //"Nicholas" 
```
-  Object.isFrozen() 方法用于检测冻结对象
- 因为冻结对象既是密封的又是不可扩展的，所以用 Object.isExtensible() 和 Object.isSealed() 检测冻结对象将分别返回 false 和 true 。

## 高级定时器

- setTimeout() 和 setInterval()创建的定时器可以用于实现有趣且有用的功能。定时器对队列的工作方式是，当特定时间过去后将代码插入。注意，给队列添加代码并不意味着对它立刻执行，而只能表示它会尽快执行。
- 设定一个 150ms 后执行的定时器不代表到了 150ms代码就立刻执行，它表示代码会在 150ms 后被加入到队列中。如果在这个时间点上，队列中没有其他东西，那么这段代码就会被执行，表面上看上去好像代码就在精确指定的时间点上执行了

### 重复的定时器

### Yielding Processes

### 函数节流

函数节流背后的基本思想是指，某些代码不可以在没有间断的情况连续重复执行。第一次调用函数，创建一个定时器，在指定的时间间隔之后运行代码。当第二次调用该函数时，它会清除前一次的定时器并设置另一个。如果前一个定时器已经执行过了，这个操作就没有任何意义。

## 自定义事件

## 拖放
- e.clientX - target.offsetLeft = diffX;
- div.style.left = e.clientX - diffX;

## 小结

JavaScript 中的函数非常强大，因为它们是第一类对象。使用闭包和函数环境切换，还可以有很多使用函数的强大方法。可以创建作用域安全的构造函数，确保在缺少 new 操作符时调用构造函数不会改变错误的环境对象。

- 可以使用惰性载入函数，将任何代码分支推迟到第一次调用函数的时候。
- 函数绑定可以让你创建始终在指定环境中运行的函数，同时函数柯里化可以让你创建已经填了某些参数的函数
- 将绑定和柯里化组合起来，就能够给你一种在任意环境中以任意参数执行任意函数的方法。

ECMAScript 5允许通过以下几种方式来创建防篡改对象。
- 不可扩展的对象，不允许给对象添加新的属性或方法
- 密封的对象，也是不可扩展的对象，不允许删除已有的属性和方法。
- 冻结的对象，也是密封的对象，不允许重写对象的成员。

# 第 23 章 离线应用与客户端存储

## 离线检测

- navigator.onLine, 这个属性值为 true 表示设备能上网，值为 false 设备离线。
- 除了 navigator.onLine 属性之外，为了更好地确定网络是否可用，H5定义了两个事件： online 和 offline。当网络从离线变为在线或者从在线变为离线时，分别触发这两个事件。在 window 对象上触发。

```
alert(navigator.onLine);
window.addEventListener('online', function () {
    alert('online');
})
window.addEventListener('offline', function () {
    alert('offline');
}) 

为了检测应用是否离线，在页面加载后，最好先通过 navigator.onLine 取得初始的状态。然后，
就是通过上述两个事件来确定网络连接状态是否变化。当上述事件触发时， navigator.onLine 属性
的值也会改变，不过必须要手工轮询这个属性才能检测到网络状态的变化
```

## 应用缓存
HTML5 的应用缓存（application cache），或者简称为 appcache，是专门为开发离线 Web 应用而设计的。Appcache 就是从浏览器的缓存中分出来的一块缓存区。要想在这个缓存中保存数据，可以使用一个描述文件（manifest file），列出要下载和缓存的资源。

要将描述文件与页面关联起来，可以在 <html> 中的 manifest 属性中指定这个文件的路径，例如：
```
<html manifest="/offline.manifest">
// 以上代码告诉页面， /offline.manifest 中包含着描述文件。这个文件的 MIME 类型必须是
   text/cache-manifest
```
这个 API 的核心是 applicationCache 对象，这个对象有一个 status 属性，属性的值是常量，表示应用缓存的如下当前状态。
- 0：无缓存，即没有与页面相关的应用缓存。
- 1：闲置，即应用缓存未得到更新。
- 2：检查中，即正在下载描述文件并检查更新。
- 3：下载中，即应用缓存正在下载描述文件中指定的资源。
- 4：更新完成，即应用缓存已经更新了资源，而且所有资源都已下载完毕，可以通过 swapCache()
来使用了。
- 5：废弃，即应用缓存的描述文件已经不存在了，因此页面无法再访问应用缓存

应用缓存还有很多相关的事件，表示其状态的改变。
- checking ：在浏览器为应用缓存查找更新时触发。
- error ：在检查更新或下载资源期间发生错误时触发。
- noupdate ：在检查描述文件发现文件无变化时触发。
- downloading ：在开始下载应用缓存资源时触发。
- progress ：在文件下载应用缓存的过程中持续不断地触发。
- updateready ：在页面新的应用缓存下载完毕且可以通过 swapCache() 使用时触发。
- cached ：在应用缓存完整可用时触发。

一般来讲，这些事件会随着页面加载按上述顺序依次触发。不过，通过调用 update() 方法也可以手工干预，让应用缓存为检查更新而触发上述事件。
- applicationCache.update().

update() 一经调用，应用缓存就会去检查描述文件是否更新（触发 checking 事件），然后就像页面刚刚加载一样，继续执行后续操作。如果触发了 cached 事件，就说明应用缓存已经准备就绪，不会再发生其他操作了。如果触发了 updateready 事件，则说明新版本的应用缓存已经可用，而此时你需要调用 swapCache() 来启用新应用缓存。

## 数据存储

### Cookie

HTTP Cookie, 通常叫做 cookie. 该标准要求服务器对任意 HTTP 请求发送 Set-Cookie HTTP 头作为响应的一部分，其中包含会话信息。

```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: nam=value
Other-header: other-heaer-value 
```
这个 HTTP 响应设置以 name 为名称、以 value 为值的一个 cookie，名称和值在传送时都必须是URL 编码的。浏览器会存储这样的会话信息，并在这之后，通过为每个请求添加 Cookie HTTP 头将信息发送回服务器

```
GET /index.html HTTP/1.1
Cookie: name=value
Other-header: other-header-value
```
发送回服务器的额外信息可以用于唯一验证客户来自于发送的哪个请求

**1.限制**
cookie 在性质上是绑定在特定的域名下的。当设定了一个 cookie 后，再给创建它的域名发送请求时，都会包含这个 cookie。这个限制确保了储存在 cookie 中的信息只能让批准的接受者访问，而无法被其他域访问。

由于 cookie 是存在客户端计算机上的，还加入了一些限制确保 cookie 不会被恶意使用，同时不会占据太多磁盘空间。每个域的 cookie 总数是有限的，不过浏览器之间各有不同

浏览器中对于 cookie 的尺寸也有限制。大多数浏览器都有大约 4096B（加减 1）的长度限制。为了最佳的浏览器兼容性，最好将整个 cookie 长度限制在 4095B（含 4095）以内。尺寸限制影响到一个域下所有的 cookie，而并非每个 cookie 单独限制

**2.cookie 的构成**

cookie 由浏览器保存的以下几块信息构成
- 名称： 一个唯一确定 cookie 的名称。cookie 名称是不区分大小写的，所以 myCookie 和 MyCookie 被认为是同一个 cookie. 然而，实践中最好将 cookie 名称看作是区分大小写的，因为某些服务器会这样处理 cookie。cookie 的名称必须是经过 URL 编码的
- 值：储存在 cookie 中的字符串值。值必须被 URL 编码。
- 域：cookie 对于哪个域是有效的。所有向该域发送的请求中都会包含这个 cookie 信息。这个值可以包含子域（subdomain，如 www.wrox.com ），也可以不包含它（如. wrox.com ，则对于wrox.com的所有子域都有效）。如果没有明确设定，那么这个域会被认作来自设置 cookie 的那个域
- 路径：对于指定域中的那个路径，应该向服务器发送 cookie。例如，你可以指定 cookie 只有从 http://www.wrox.com/books/ 中才能访问，那么 http://www.wrox.com 的页面就不会发送 cookie 信息，即使请求都是来自同一个域的。
- 失效时间：表示 cookie 何时应该被删除的时间戳（也就是，何时应该停止向服务器发送这个cookie）。默认情况下，浏览器会话结束时即将所有 cookie 删除；不过也可以自己设置删除时间。这个值是个 GMT 格式的日期（Wdy, DD-Mon-YYYY HH:MM:SS GMT），用于指定应该删除cookie 的准确时间。因此，cookie 可在浏览器关闭后依然保存在用户的机器上。如果你设置的失效日期是个以前的时间，则 cookie 会被立刻删除
- 安全标志：指定后，cookie 只有在使用 SSL 连接的时候才发送到服务器。例如，cookie 信息只能发送给 https://www.wrox.com ，而 http://www.wrox.com 的请求则不能发送 cookie。

```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value; expires=Mon, 22-Jan-07 07:10:24 GMT; domain=.wrox.com
Other-header: other-header-value
```
该头信息指定了一个叫做 name 的 cookie，它会在格林威治时间 2007 年 1 月 22 日 7:10:24 失效，同时对于 www.wrox.com 和 wrox.com 的任何子域（如 p2p.wrox.com ）都有效。

secure 标志是 cookie 中唯一一个非名值对儿的部分，直接包含一个 secure 单词。如下：
```
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value; domain=.wrox.com; path=/; secure
Other-header: other-header-value
```
> 这里，创建了一个对于所有 wrox.com 的子域和域名下（由 path 参数指定的）所有页面都有效的cookie。因为设置了 secure 标志，这个 cookie 只能通过 SSL 连接才能传输。尤其要注意，域、路径、失效时间和 secure 标志都是服务器给浏览器的指示，以指定何时应该发送 cookie。这些参数并不会作为发送到服务器的 cookie 信息的一部分，只有名值对儿才会被发送。

**3.JavaScript 中的 cookie**
- document.cookie 返回当前页面可用的（根据 cookie 的域、路径、失效时间和安全设置）所有 cookie 的字符串，一系列由分号隔开的名值对儿
- **所有名字和值都是经过 URL 编码的，所以必须使用 decodeURIComponent() 来解码。**
- 设置 document.cookie 并不会覆盖 cookie，除非设置的 cookie 的名称已经存在.和 Set-Cookie 头中使用的格式一样。
    ```
    document.cookie = encodeURIComponent('name') + '=' + encodeURIComponent('Nicholas姚');
    console.log(decodeURIComponent(document.cookie));
    ```
- 要给被创建的 cookie 指定额外的信息，只要将参数追加到该字符串，和 Set-Cookie 头中的格式一样
    ```
    document.cookie = encodeURIComponent("name") + "=" + encodeURIComponent("Nicholas") + "; domain=.wrox.com; path=/"; 
    ```

```
let CookieUtil = {
    get: function (name) {
        let cookieName = encodeURIComponent(name) + '=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;
        if (cookieStart > -1) {
            let cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
        }
        return cookieValue;
    },
    set: function (name, value, expires, path, domain, secure) {
        let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += '; expires=' + expires.toUTCString()
        }
        if (path) {
            cookieText += '; path=' + path;
        }
        if (domain) {
            cookieText += '; domain=' + domain;
        }
        if (secure) {
            cookieText += '; secure';
        }
        document.cookie = cookieText;
    },
    unset: function (name, path, domain, secure) {
        this.set(name, '', new Date(0), path, domain, secure);
    }
}
```

**4.子 cookie**

为了绕开浏览器的单域名下的 cookie 数限制，一些开发人员使用了一种称为子 cookie（subcookie）的概念。子 cookie 是存放在单个 cookie 中的更小段的数据。也就是使用 cookie 值来存储多个名称值对儿。子 cookie 最常见的的格式如下所示。
```
 name=name1=value1&name2=value2&name3=value3&name4=value4&name5=value5
```

- 获取子cookie

```
let SubCookieUtil = {
    get: function (name, subName) {
        let subCookies = this.getAll(name);
        if (subCookies) {
            return subCookies[subName]
        } else {
            return null;
        }
    },
    getAll: function (name) {
        let cookieName = encodeURIComponent(name) + '=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd,
            subCookies,
            i,
            parts,
            result = {};
        if (cookieStart > -1) {
            cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd === -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
            if (cookieValue.length > 0) {
                /*
                * name=name1=value1&name2=value2&name3=value3&name4=value4&name5=value5
                *
                * [name2=value,name3=value3,name4=value4]
                * */
                subCookies = cookieValue.split('&');
                for (i = 0, len = subCookies.length; i < len; i++) {
                    parts = subCookies[i].split('=');
                    /* ["name2", "value"] */
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                }
                return result;
            }
        }
        return null;
    }
}

// eg.
document.cookie ="data=name=Nicholas&book=Professional%20JavaScript"

// getAll subCookie
let data = SubCookieUtil.getAll('data')
console.log(data.name); // "Nicholas"
console.log(data.book); // Professional JavaScript

// getCookie
console.log(SubCookieUtil.get('data', 'name')); // Nicholas
console.log(SubCookieUtil.get('data', 'book')); // Professional JavaScript 
```

- 设置子 cookie

```
let SubCookieUtil = {
    set: function (name, subName, value, expires, path, domain, secure) {
        let subCookies = this.getAll(name) || {};
        subCookies[subName] = value;
        this.setAll(name, subCookies, expires, path, domain, secure);
    },
    setAll: function (name, subCookies, expires, path, domain, secure) {
        let cookieText = encodeURIComponent(name) + '=',
            subCookieParts = new Array(),
            subName;
        for (subName in subCookies) {
            if (subName.length > 0 && subCookies.hasOwnProperty(subName)) {
                subCookieParts.push(encodeURIComponent(subName) + '=' + encodeURIComponent(subCookies[subName]));
            }
        }
        if (subCookieParts.length > 0) {
            cookieText += subCookieParts.join('&');
            if (expires instanceof Date) {
                cookieText += "; expires=" + expires.toUTCString();
            }
            if (path) {
                cookieText += "; path=" + path;
            }
            if (domain) {
                cookieText += "; domain=" + domain;
            }
            if (secure) {
                cookieText += "; secure";
            }
        } else {
            cookieText += "; expires=" + (new Date(0)).toUTCString();
        }
        document.cookie = cookieText;
    }
}

// 设置全部子 cookie 和 失效日期
SubCookieUtil.setAll("data", { name: "Nicholas", book: "Professional JavaScript" },
    new Date("January 1, 2020"));

// 修改名字的值，并修改cookie 失效的时间
SubCookieUtil.set("data", "name", "Michael", new Date("February 1, 2020")); 
```

- 删除子 cookie

> 子 cookie 的最后一组方法是用于删除子 cookie 的。普通 cookie 可以通过将失效时间设置为过去的时间的方法来删除，但是子 cookie 不能这样做。为了删除一个子 cookie，首先必须获取包含在某个 cookie中的所有子 cookie，然后仅删除需要删除的那个子 cookie，然后再将余下的子 cookie 的值保存为 cookie的值。

```
let SubCookieUtil = {
    unset: function (name, subName, path, domain, secure) {
        let subcookies = this.getAll(name)
        if (subcookies) {
            delete subcookies[subName];
            this.setAll(name, subcookies, null, path, domain, secure);
        }
    },
    unsetAll: function (name, path, domain, secure) {
        this.setAll(name, null, new Date(0), path, domain, secure);
    }
} 
```

### Web存储机制

- 提供一种在 cookie 之外存储会话数据的途径
- 提供一种存储大量可以跨会话存在的数据的机制。

**1.Storage 类型**

- clear(): 删除所有值
- getItem(name): 根据指定的名字 name 获取对应的值
- key(index): 获得 index 位置处得值得名字
- removeItem(name): 删除由name指定的名值对儿
- setItem(name, value): 为指定的 name 设置一个对应的值。

其中， getItem() 、 removeItem() 和 setItem() 方法可以直接调用，也可通过 Storage 对象间接调用。因为每个项目都是作为属性存储在该对象上的，所以可以通过点语法或者方括号语法访问属性来读取值，设置也一样，或者通过 delete 操作符进行删除。不过，我们还建议读者使用方法而不是属性来访问数据，以免某个键会意外重写该对象上已经存在的成员

> Storage 类型只能存储字符串。非字符串的数据在存储之前会被转换成字符串

**2.sessionStorage对象**

sessionStorage 对象存储特定于某个会话的数据，也就是该数据只保持到浏览器关闭。这个对象就像会话 cookie，也会在浏览器关闭后消失。存储在 sessionStorage 中的数据可以跨越页面刷新而存在，同时如果浏览器支持，浏览器崩溃并重启之后依然可用（Firefox 和 WebKit 都支持，IE 则不行）。

因为 seesionStorage 对象绑定于某个服务器会话，所以当文件在本地运行的时候是不可用的。存储在 sessionStorage 中的数据只能由最初给对象存储数据的页面访问到，所以对多页面应用有限制

由于 sessionStorage 对象其实是 Storage 的一个实例，所以可以使用 setItem() 或者直接设置新的属性来存储数据。下面是这两种方法的例子。

```
// IE8见书P639
sessionStorage.setItem('name','yyb')
sessionStorage.book = 'JavaScript' 
```
sessionStorage 中有数据时，可以使用 getItem() 或者通过直接访问属性名来获取数据。两种方法的例子如下。

```
let name = sessionStorage.getItem('name')
let book = sessionStorage.book;
console.log(name, book);
```

迭代 sessionStorage 中的值

```
for (var i = 0, len = sessionStorage.length; i < len; i++) {
    var key = sessionStorage.key(i);
    var value = sessionStorage.getItem(key);
    alert(key + "=" + value);
}
for (var key in sessionStorage){
    var value = sessionStorage.getItem(key);
    alert(key + "=" + value);
}
```

删除 sessionStorage 中的数据

```
//使用 delete 删除一个值——在 WebKit 中无效
delete sessionStorage.name;
 
 // 使用方法删除一个值
 sessionStorage.removeItem('book');
```

**3.globalStorage对象**

FireFox 中实现 globalStorage 对象。要使用 globalStorage ，首先要指定哪些域可以访问该数据。可以通过方括号标记使用属性来实现，如以下例子所示

```
//保存数据
globalStorage["wrox.com"].name = "Nicholas";
//获取数据
var name = globalStorage["wrox.com"].name;
```

这里所指定的存储空间只能由来自 www.wrox.com 的页面访问，其他子域名都不行。
某些浏览器允许更加宽泛的访问限制，比如只根据顶级域名进行限制或者允许全局访问，如下面例
子所示。

```
//存储数据，任何人都可以访问——不要这样做！
globalStorage[""].name = "Nicholas";
//存储数据，可以让任何以.net 结尾的域名访问——不要这样做！
globalStorage["net"].name = "Nicholas"; 
```

对 globalStorage 空间的访问，是依据发起请求的页面的域名、协议和端口来限制的。例如，如果使用 HTTPS 协议在 wrox.com 中存储了数据，那么通过 HTTP 访问的 wrox.com 的页面就不能访问该数据。同样，通过 80 端口访问的页面则无法与同一个域同样协议但通过 8080 端口访问的页面共享数据。这类似于 Ajax 请求的同源策略。

globalStorage 的每个属性都是 Storage 的实例。因此，可以像如下代码中这样使用

```
globalStorage["www.wrox.com"].name = "Nicholas";
globalStorage["www.wrox.com"].book = "Professional JavaScript";
globalStorage["www.wrox.com"].removeItem("name");
var book = globalStorage["www.wrox.com"].getItem("book"); 
```

如果你事先不能确定域名，那么使用 location.host 作为属性名比较安全

```
globalStorage[location.host].name = "Nicholas";
var book = globalStorage[location.host].getItem("book"); 
```
如果不使用 removeItem() 或者 delete 删除，或者用户未清除浏览器缓存，存储在 globalStorage 属性中的数据会一直保留在磁盘上。这让 globalStorage 非常适合在客户端存储文档或者长期保存用户偏好设置

**4.localStorage对象**

localStorage 对象在修订过的 HTML 5 规范中作为持久保存客户端数据的方案取代了globalStorage 。与 globalStorage 不同，不能给 localStorage 指定任何访问规则；规则事先就设定好了。要访问同一个 localStorage 对象，页面必须来自同一个域名（子域名无效），使用同一种协议，在同一个端口上。这相当于 globalStorage[location.host] 。

由于 localStorage 是 Storage 的实例，所以可以像使用 sessionStorage 一样来使用它

```
// 使用方法存储数据
localStorage.setItem('name', 'YYB');

// 使用属性存储数据
localStorage.book = 'JavaScript';

// 使用方法读取数据
let name = localStorage.getItem('name')

// 使用属性来读取数据
let book = localStorage.book; 
```
数据保存到通过JavaScript 删除或者是用户清除浏览器缓存。

**5.storage 事件**

对 Storage 对象进行任何修改，都会在文档上触发 storage 事件。当通过属性或 setItem() 方法保存数据，使用 delete 操作符或 removeItem() 删除数据，或者调用 clear() 方法时，都会发生该事件。这个事件的 event 对象有以下属性

- domain：发生变化的存储空间的域名
- key: 设置或删除的键名
- newValue: 如果是设置值，则是新值。如果是删除值，则是null
- oldValue: 键被更改之前的值。

**6.限制**

- 对于 localStorage 而言，大多数桌面浏览器会设置每个来源 5MB 的限制。Chrome 和 Safari 对每个来源的限制是 2.5MB。而 iOS 版 Safari 和 Android 版 WebKit 的限制也是 2.5MB。

- 对 sessionStorage 的限制也是因浏览器而异。有的浏览器对 sessionStorage 的大小没有限制，但 Chrome、Safari、iOS 版 Safari 和 Android 版 WebKit 都有限制，也都是 2.5MB。IE8+和 Opera 对sessionStorage 的限制是 5MB

### IndexedDB

[参考文章](https://wangdoc.com/javascript/bom/indexeddb.html#indexeddb-%E5%AF%B9%E8%B1%A1)

# 第24章 最佳实践

## 可维护性

- 可理解性——其他人可以接手代码并理解它的意图和一般途径，而无需原开发人员的完整解释。
- 直观性——代码中的东西一看就能明白，不管其操作过程多么复杂。
- 可适应性——代码以一种数据上的变化不要求完全重写的方法撰写。
- 可扩展性——在代码架构上已考虑到在未来允许对核心功能进行扩展。
- 可调试性——当有地方出错时，代码可以给予你足够的信息来尽可能直接地确定问题所在。

## 代码约定

**1.可读性**
- 函数和方法——每个函数或方法都应该包含一个注释，描述其目的和用于完成任务所可能使用的算法。陈述事先的假设也非常重要，如参数代表什么，函数是否有返回值（因为这不能从函数定义中推断出来）。
- 大段代码——用于完成单个任务的多行代码应该在前面放一个描述任务的注释
- 复杂的算法——如果使用了一种独特的方式解决某个问题，则要在注释中解释你是如何做的。这不仅仅可以帮助其他浏览你代码的人，也能在下次你自己查阅代码的时候帮助理解
- Hack——因为存在浏览器差异，JavaScript 代码一般会包含一些 hack。不要假设其他人在看代码的时候能够理解 hack 所要应付的浏览器问题。如果因为某种浏览器无法使用普通的方法，所以你需要用一些不同的方法，那么请将这些信息放在注释中。这样可以减少出现这种情况的可能性：有人偶然看到你的 hack，然后“修正”了它，最后重新引入了你本来修正了的错误。缩进和注释可以带来更可读的代码，在未来则更容易维护。

**2.变量和函数命名**

匈牙利标记法：
- 'o' 代表对象
- 's' 代表字符串
- 'i' 代表整数
- 'f' 代表浮点数
- 'b' 代表布尔型
- 'r' 代表正则

## 松散耦合

- 解耦HTML/JavaScript
- 解耦 CSS/JavaScript
- 解耦应用逻辑／事件处理程序 

## 编程实践

- 尊重对象所有权
- 避免全局变量
- 避免与 null 进行比较
    - 如果看到了与 null 比较的代码，尝试使用以下技术替换：
    - 如果值应为一个引用类型，使用 instanceof 操作符检查其构造函数；
    - 如果值应为一个基本类型，使用 typeof 检查其类型
    - 如果是希望对象包含某个特定的方法名，则使用 typeof 操作符确保指定名字的方法存在于对象上。
- 使用常量

## 性能

- 避免全局查找（document 可存为本地 doc )
- 避免 with 语句
- 避免不必要的属性查找
- 优化循环
- 原生方法较快
- Switch 语句较快
- 单个 var/let 语句声明
- 使用数组和对象字面量
- 使用fragment来更伤心 DOM 结构
- 使用 innerHTML
- 使用事件代理
- 注意 HTMLCollection （for循环中的长度移入初始化部分计算）

# 第 25 章 新兴的API

- requestAnimationFrame()，下次重绘
- cancelAnimationFrame(), 取消之前的重绘
- Page Visibility API
    - document.hidden：表示页面是否隐藏的布尔值
    - document.visibilityState:只读属性，返回 document 的可见性
        - visible: 页面可见，未最小化
        - hidden: 页面不可见，最小化状态。
        - prerender: 页面此时正在渲染中
        - unloaded: 页面从内存中卸载、清楚。
    - visibilitychange 事件：当文档从可见变为不可见或从不可见变为可见时，触发该事件。
- Geolocation API (地理定位)









