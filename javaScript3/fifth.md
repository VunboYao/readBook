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

























