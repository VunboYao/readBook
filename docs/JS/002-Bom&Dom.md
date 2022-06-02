# 第八章：BOM

## window 对象

在浏览器中， window 对象有双重角色，它既是通过 JavaScript 访问浏览器窗口的一个接口，又是 ECMAScript 规定的 Global 对象。

### 全局作用域

- 所有在全局作用域中声明的变量、函数都会变成 window 对象的属性和方法。
- 全局变量不能通过 delete 操作符删除，而直接在 window 对象上定义的属性可以。
- 因为全局中 var 声明的变量，有一个属性 [[Configurable]] 的特性，这个特性的值被设置为 false, 因此不能通过 delete 操作符删除。
- 通过 window 对象，可以查询某个未声明的变量是否存在。不会报错，返回 undefined

### 窗口位置

- window.screenLeft 表示窗口相对于屏幕左边的位置 === window.screenX
- window.screenTop 表示窗口相对于屏幕上边的位置 === window.screenY

> 使用 moveTo()和 moveBy() 方法倒是有可能将窗口精确地移动到一个新位置。这两个方法都接收两个参数，其中 moveTo() 接收的是新位置的 x 和 y 坐标值，而 moveBy() 接收的是在水平和垂直方向上移动的像素数。这两个方法可能会被浏览器禁用

### 窗口大小

- innerHeight 表示页面视图区的高度
- innerWidth 表示页面视图区的宽度
- outerWidth 和 outerHeight 返回浏览器窗口本身的尺寸
- 获取页面视口的信息
  - document.documentElement.clientHeight / clientWidth
  - document.body.clientHeight / clientWidth **(IE 中可用，chrome 中不可用)**

> 使用 resizeTo() 和 resizeBy() 方法可以调整浏览器窗口的大小。这两个方法都接收两个参数，其中 resizeTo() 接收浏览器窗口的新宽度和新高度，而 resizeBy() 接收新窗口与原窗口的宽度和高度之差。这两个方法可能会被浏览器禁用

### 导航和打开窗口

- window.open(),这个方法接收四个参数：要加载的 URL、窗口目标、一个特性字符串以及一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值。通常只须传递第一个参数，最后一个参数只在不打开新窗口的情况下使用。
- 如果传递第 2 个参数，而且该参数是已有窗口或框架的名称，那么就会在具有**该名称的窗口或框架中**加载第一个参数指定的 URL。

```
<iframe name="topFrame" height="100px" width="100px"></iframe>
//等同于< a href="http://www.wrox.com" target="topFrame"></a>
window.open('https://www.baidu.com/',"topFrame");
```

**1.弹出窗口**

> 如果给 window.open() 传递的第二个参数并不是一个已经存在的窗口或框架，那么该方法就会根
> 据在第三个参数位置上传入的字符串创建一个新窗口或新标签页。如果没有传入第三个参数，那么就会
> 打开一个带有全部默认设置（工具栏、地址栏和状态栏等）的新浏览器窗口（或者打开一个新标签页—
> —根据浏览器设置）。在不打开新窗口的情况下，会忽略第三个参数。**第三个参数是一个逗号分隔的设置字符串，表示在新窗口中都显示哪些特性。**

| 设置       | 值     | 说明                                                                                                                      |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| fullscreen | yes/no | 表示浏览器窗口是否最大化。仅限 IE                                                                                         |
| height     | 数值   | 表示新窗口的高度。                                                                                                        |
| width      | 数值   | 表示新窗口的宽度。                                                                                                        |
| left       | 数值   | 表示新窗口的左坐标。不能是负值                                                                                            |
| location   | yes/no | 表示是否在浏览器窗口中显示地址栏。不同浏览器的默认值不同。如果设置为 no，地址栏可能会隐藏，也可能会被禁用（取决于浏览器） |
| menubar    | yes/no | 表示是否在浏览器窗口中显示菜单栏。默认值为 no                                                                             |
| resizable  | yes/no | 表示是否可以通过拖动浏览器窗口的边框改变其大小。默认值为 no                                                               |
| scrollbars | yes/no | 表示如果内容在视口中显示不下，是否允许滚动。默认值为 no                                                                   |
| status     | yes/no | 表示是否在浏览器窗口中显示状态栏。默认值为 no                                                                             |
| toolbar    | yes/no | 表示是否在浏览器窗口中显示工具栏。默认值为 no                                                                             |
| top        | 数值   | 表示新窗口的上坐标。不能是负值                                                                                            |

- 整个特性字符串中不允许出现空格
- 允许我们针对通过 window.open() 创建的窗口调整大小或移动位置

  ```
  var wroxWin = window.open("http://www.wrox.com/","wroxWindow",
  "height=400,width=400,top=10,left=10,resizable=yes");
  //调整大小
  wroxWin.resizeTo(500,500);
  //移动位置
  wroxWin.moveTo(100,100);
  调用 close() 方法还可以关闭新打开的窗口。
  wroxWin.close();
  ```

- 新创建的 window 对象有一个 opener 属性，其中保存着打开它的原始窗口对象。

  ```
  var wroxWin = window.open("http://www.wrox.com/","wroxWindow",
  "height=400,width=400,top=10,left=10,resizable=yes");
  alert(wroxWin.opener == window); //true
  ```

- 将 opener 属性设置为 null 就是告诉浏览器新创建的标签页不需要与打开它的标签页通信，因此
  可以在独立的进程中运行。标签页之间的联系一旦切断，将没有办法恢复。

### 定时器

- setTimeout(函数，时间)，第一个参数可以是字符串（性能损失，不建议），函数。
- setInterval(函数，时间)。
- 调用定时器会返回一个 ID，该 ID 可以用来取消定时器。clearTimeout()/ clearInterval()
- 很少使用真正的间歇调用，原因是后一个间歇调用可能会在前一个间歇调用结束之前启动。所以，最好不要使用间歇调用。

### 系统对话框

- 通过 alert() 、 confirm() 和 prompt() 方法可以调用系统对话框向用户显示消息。
- 通过这几个方法打开的对话框都是同步和模态的。也就是说，显示这些对话框的时候代码会停止执行，而关掉这些对话框后代码又会恢复执行。
- confirm("Are you sure?"),取消/确认，返回布尔值。

  ```
  let a = confirm('Are you sure?');
  if (a) {
      alert('I am so glad you are sure！ ')
  } else {
      alert('I am sorry to hear you are not sure!')
  }
  ```

- prompt()方法接受两个参数：要显示给用户的文本提示和文本输入域的默认值（可以是一个空字符串）
  - 如果用户单击了 OK，返回数入的值。
  - 如果选择了 Cancel 或其他方式关闭了对话框，该方法返回 null
- window.print(),显示打印对话框

## location 对象

location 是最有用的 BOM 对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上， location 对象是很特别的一个对象，因为它既是 window 对象的属性，也是 document 对象的属性；换句话说， window.location 和 document.location 引用的是同一个对象。

| 属性名   | 例子                  | 说明                                                                             |
| -------- | --------------------- | -------------------------------------------------------------------------------- |
| hash     | "#contents"           | 返回 URL 中的 hash（#号后跟零或多个字符），如果 URL 中不包含散列，则返回空字符串 |
| host     | "www.wrox.com:80"     | 返回服务器名称和端口号（如果有）                                                 |
| hostname | "www.wrox.com"        | 返回不带端口号的服务器名称                                                       |
| href     | "http://www.wrox.com" | 返回当前加载页面的完整 URL。而 location 对象的 toString()方法也返回这个值        |
| pathname | "/WileyCDA/"          | 返回 URL 中的目录和（或）文件名                                                  |
| port     | "8080"                | 返回 URL 中指定的端口号。如果 URL 中不包含端口号，则这个属性返回空字符串         |
| protocol | "http:"               | 返回页面使用的协议。通常是 http:或 https:                                        |
| search   | "?q=javascript"       | 返回 URL 的查询字符串。这个字符串以问号开头                                      |

### 查询字符串参数

```
function getQueryStringArgs() {
    // 取得查询字符串并去掉开头的问好
    let qs = (location.search.length > 0 ? location.search.substring(1) : ""),
        // 保存数据的对象
        args = {},
        // 取得每一项
        items = qs.length ? qs.split('&') : [],
        item = null,
        name = null,
        value = null;
    // 逐个将每一项添加到args对象中
    for (let i = 0; i < items.length; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}
```

### 位置操作

使用 location 对象可以通过很多方式来改变浏览器的位置。

- 使用 assign()方法为其传递一个 URL。`location.assign("http://www.wrox.com");`
- location.href 或 window.location 设置为一个 URL 值，也会调用 assign() 方法。

  ```
  // 下列两行代码与显式调用 assign() 方法的效果完全一样。
   window.location = "http://www.wrox.com";
   location.href = "http://www.wrox.com";
  ```

- 设置 hash, search, hostname, pathname 和 port 属性来改变 URL，除了 hash 属性，都会重新加载页面。
- 当通过上述任何一种方式修改 URL 之后，浏览器的历史记录中就会生成一条新记录，因此用户通过单击“后退”按钮都会导航到前一个页面。
- 要禁用这种行为，可以使用 replace() 方法。这个方法只接受一个参数，即要导航到的 URL；结果虽然会导致浏览器位置改变，但不会在历史记录中生成新记录。

  ```
  <script type="text/javascript">
      setTimeout(function () {
          location.replace("http://www.wrox.com/");
      }, 1000);
  </script>
  ```

- 如果将这个页面加载到浏览器中，浏览器就会在 1 秒钟后重新定向到 **www.wrox.com**.然后，“后退”按钮将处于禁用状态，如果不重新输入完整的 URL，则无法返回示例页面。
- reload(),重新加载当前显示的页面。不传递参数时，页面就会以最有效的方式重新加载。也就是说，如果页面自上次请求以来并没有改变过，页面就会从浏览器缓存中重新加载。

  ```
  location.reload(); //重新加载（有可能从缓存中加载）
  location.reload(true); //重新加载（从服务器重新加载）
  ```

- 位于 reload() 调用之后的代码可能会也可能不会执行，这要取决于网络延迟或系统资源等因素。为此，最好将 reload() 放在代码的最后一行。

### navigator 对象

### 检查插件

- navigator.plugins，检测插件
- 包含下列属性： - name: 插件的名字 - description: 插件的描述 - filename： 插件的文件名 - length: 插件所处理的 MIME 类型数量

  `//检测插件（在 IE 中无效） function hasPlugin(name){ name = name.toLowerCase(); for (var i=0; i < navigator.plugins.length; i++){ if (navigator. plugins [i].name.toLowerCase().indexOf(name) > -1){ return true; } } return false; } //检测 Flash alert(hasPlugin("Flash")); //检测 QuickTime alert(hasPlugin("QuickTime"));`

  > 每个插件对象本身也是一个 MimeType 对象的数组，这些对象可以通过方括号语法来访问。每个 MimeType 对象有 4 个属性：包含 MIME 类型描述的 description 、回指插件对象的 enabledPlugin 、表示与 MIME 类型对应的文件扩展名的字符串 suffixes （以逗号分隔）和表示完整 MIME 类型字符串的 type 。

> plugins 集合有一个名叫 refresh() 的方法，用于刷新 plugins 以反映最新安装的插件。这个方法接收一个参数：表示是否应该重新加载页面的一个布尔值。如果将这个值设置为 true ，则会重新加载包含插件的所有页面；否则，只更新 plugins 集合，不重新加载页面。

## history 对象

- history.go(), 接收一个参数。负数表示向后跳转，整数表示向前跳转。也可以给 go()方法传递一个字符串参数。跳转到历史记录中包含该字符的第一个位置。
- 简写 history.back() 后退 和 history.forward()前进。
- history.length，保存历史记录的数量。
  `if (history.length === 1){ //这应该是用户打开窗口后的第一个页面 }`
  > 当页面的 URL 改变时，就会生成一条历史记录。这里所说的改变包括 URL 中 hash 的变化（因此，设置 location.hash 会在这些浏览器中生成一条新的历史记录）。

## 小结

浏览器对象模型（BOM）以 window 对象为依托，表示浏览器窗口以及页面可见区域。同时， window
对象还是 ECMAScript 中的 Global 对象，因而所有全局变量和函数都是它的属性，且所有原生的构造
函数及其他函数也都存在于它的命名空间下

- 在使用框架时，每个框架都有自己的 window 对象以及所有原生构造函数及其他函数的副本。每个框架都保存在 frames 集合中，可以通过位置或通过名称来访问。
- 有一些窗口指针，可以用来引用其他框架，包括父框架。
- top 对象始终指向最外围的框架，也就是整个浏览器窗口
- 使用 location 对象可以通过编程方式来访问浏览器的导航系统。设置相应的属性，可以逐段或整体性地修改浏览器的 URL。
- 调用 replace() 方法可以导航到一个新 URL，同时该 URL 会替换浏览器历史记录中当前显示的页面。
- navigator 对象提供了与浏览器有关的信息。到底提供哪些信息，很大程度上取决于用户的浏览器；不过，也有一些公共的属性（如 userAgent ）存在于所有浏览器中。

# 第九章：客户端检测

## 能力检测

能力检测的目标不是识别特定的浏览器，而是识别浏览器的能力。采用这种方式不必顾及特定的浏览器如何如何，只要确定浏览器支持特定的能力，就可以给出解决方案。

```
function getElement(id) {
    if (document.getElementById) {
        return document.getElementById(id);
    } else if (document.all) {
        return document.all[id];
    } else {
        throw new Error('No way to retrieve element');
    }
}
```

- 安卓操作系统检测

  ```
  // "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Mobile Safari/537.36"
  // 搜索字符串 "Android" 并取得紧随其后的版本号。
  let android = /Android (\d+\.\d+)/.test(navigator.userAgent);
  console.log(RegExp.$1);
  ```

- IOS 操作系统检测

  ```javascript
  // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
  let iOS = /CPU (?:iPhone )?OS (\d+_\d+)/.test(navigator.userAgent)
  console.log(RegExp.$1) // 11_0
  let system = RegExp.$1.replace('_', '.')
  console.log(system) // 11.0
  ```

# 第 10 章：DOM

## 节点层次

### Node 类型

JavaScript 中的所有节点类型都继承自 Node 类型，因此所有节点类型都共享着相同的基本属性和方法。每个节点都有一个 nodeType 属性，用于表明节点的类型。

- Node.ELEMENT_NODE (1)；
- Node.ATTRIBUTE_NODE (2)；
- Node.TEXT_NODE (3)；
- Node.CDATA_SECTION_NODE (4)；
- Node.ENTITY_REFERENCE_NODE (5)；
- Node.ENTITY_NODE (6)；
- Node.PROCESSING_INSTRUCTION_NODE (7)；
- Node.COMMENT_NODE (8)；
- Node.DOCUMENT_NODE (9)；
- Node.DOCUMENT_TYPE_NODE (10)；
- Node.DOCUMENT_FRAGMENT_NODE (11)；
- Node.NOTATION_NODE (12)。

  ```
  if (someNode.nodeType == Node.ELEMENT_NODE){ //在 IE 中无效
      alert("Node is an element.");
  }
  // 为了确保跨浏览器兼容，最好还是将 nodeType 属性与数字值进行比较
  if (someNode.nodeType == 1){ // 适用于所有浏览器
      alert("Node is an element.");
  }
  ```

**1.nodeName 和 nodeValue 属性**

```
if (someNode.nodeType == 1){
    value = someNode.nodeName; //nodeName 的值是元素的标签名
}
```

**2.节点关系**

- 每个节点都有一个 childNodes 属性，其中保存着一个 NodeList 对象。
- NodeList 是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问它们。
- 可以通过方括号语法来访问 NodeList 的值，也有 length 属性，但不是 Array 的实例。
- 可以通过方括号、也可以使用 item()方法。访问保存在 NodeList 中的节点。

  ```
  var firstChild = someNode.childNodes[0];
  var secondChild = someNode.childNodes.item(1);
  var count = someNode.childNodes.length;
  ```

- 对 arguments 对象使用 Array.prototype.slice() 方法可以将其转换为数组
- 每个节点都有一个 parentNode 属性，该属性指向文档树中的父节点
- 在 childNodes 列表中的每个节点相互之间都是同胞节点。通过使用列表中每个节点的 previousSibling 和 nextSibling 属性，可以访问同一列表中的其他节点。列表中第一个节点的 previousSibling 属性值为 null ，而列表中最后一个节点的 nextSibling 属性的值同样也为 null
- 父节点的 firstChild 和 lastChild 属性分别指向其 childNodes 列表中的第一个和最后一个节点。
- hasChildNodes() 方法在节点包含一或多个子节点的情况下返回 true.
- 所有节点都有一个属性 ownerDocument, 该属性指向表示整个文档的文档节点。#document。通过这个属性，可以不必在节点层次中通过层层回溯到达顶端，而是直接访问文档节点。

**3.操作节点**

- appendChild()添加节点，用于向 childNodes 列表的末尾添加一个节点。返回新增的节点。
- insertBefore()插入节点，该方法接收 2 个参数：要插入的节点和作为参照的节点。
  - 插入节点后，被插入的节点会变成参照节点的前一个同胞节点（previousSibling），同时被方法返回。
  - 如果参照节点是 null,则 insertBefore() 和 appendChild() 执行相同的操作。
- replaceChild()替换节点，该方法接收 2 个参数：要插入的节点和要替换的节点。
- removeChild()移除一个节点，接收一个参数。
- **以上方法操作的都是某个节点的子节点，使用这几个方法必须先取得父节点(使用 parentNode 属性)**

**4.其他方法**

- cloneNode(),用于创建调用这个方法的节点的一个完全的副本。
  - 接受一个布尔值参数，表示是否执行深复制。参数为 true 时，执行深复制;为 false 时，执行浅复制。
  - 复制后返回的节点属于文档所有，但没有为它指定父节点，除非使用以上 appendChild() 、 insertBefore() 或 replaceChild()将它添加到文档中，否则是一个“孤儿”。

  ```
   let deepList = a.cloneNode(true)
   console.log(deepList.childNodes.length); // 7
   let shallowList = a.cloneNode(false);
   console.log(shallowList.childNodes.length); // 0
  ```

### Document 类型

JavaScript 通过 Document 类型表示文档。在浏览器中， document 对象是 HTMLDocument （继承
自 Document 类型）的一个实例，表示整个 HTML 页面。而且， document 对象是 window 对象的一个
属性，因此可以将其作为全局对象来访问。 Document 节点具有下列特征：

- nodeType 的值为 9；
- nodeName 的值为 "#document" ；
- nodeValue 的值为 null ；
- parentNode 的值为 null ；
- ownerDocument 的值为 null ；
- 其子节点可能是一个 DocumentType （最多一个）、 Element （最多一个）、 ProcessingInstruction 或 Comment 。

**1.文档的子节点**

- documentElement 属性，该属性始终指向 HTML 页面中的`<html>`元素。=== document.childNodes[0] === document.firstChild
- document.body 属性，取得对`<body\>`的引用
- document.doctype 属性，取得对<!DOCTYPE>的引用

**2.文档信息**

- document.title, 获取当前页面的标题，也可以修改当前的页面标题。
- document.URL, 包含页面完整的 URL（即地址栏中显示的 URL）
- document.domain，属性中包含页面的域名
- document.referrer，保存着连接到当前页面的那个页面的 URL，在没有来源页面的情况下，referrer 属性中可能会包含空字符串。
- 只有 domain 可以设置，但必须是包含的域。

  ```
  //假设页面来自 p2p.wrox.com 域
  document.domain = "wrox.com"; // 成功
  document.domain = "nczonline.net"; // 出错！
  ```

- 浏览器对 domain 属性还有一个限制，即如果域名一开始是“松散的”（loose），那么不能将它再设置为“紧绷的”（tight）。换句话说，在将 document.domain 设置为 "wrox.com" 之后，就不能再将其设置回 "p2p.wrox.com" ，否则将会导致错误.

**3.查找元素**

- getElementById(), 如果不存在相应的 ID 则返回 null
- getElementByTagName(), 返回包含零或多个元素的 NodeList。在 HTML 中，返回一个 HTMLCollection 对象。 可以使用**方括号语法**或 item()来访问，通过 length 获取元素的数量
- HTMLCollection 对象还有一个方法，叫做 namedItem() ，使用这个方法可以通过元素的 name 特性取得集合中的项。
- 在后台，对数值索引就会调用 item() ，而对字符串索引就会调用 namedItem()
- 要想取得文档中的所有元素，可以向 getElementsByTagName() 中传入 "\*"
- getElementsByName()，会返回带有给定 name 特性的所有元素。最常使用 getElementsByName() 方法的情况是取得单选按钮。对于这里的单选按钮来说， namedItem() 方法则只会取得第一项（因为每一项的 name 特性都相同）。

**4.特殊集合**

- document.anchors, 包含文档中所有带 name 特性的<a\>元素
- document.forms, 包含文档中所有的<form\>元素，与 document.getElementByTagName('form')得到的结果相同
- document.images, 包含文档中所有的<img\>元素， 与 document.getElementsByTagName("img")得到的结果相同；
- document.links ，包含文档中所有带 href 特性的 <a\> 元素。

**5.DOM 一致性检测**

document.implementation 属性就是为此提供相应信息和功能的对象，与浏览器对 DOM 的实现直接对应。DOM1 级只为 document.implementation 规定了一个方法，即 hasFeature() 。这个方法接受两个参数：要检测的 DOM 功能的名称及版本号。如果浏览器支持给定名称和版本的功能，则该方法返回 true

> 尽管使用 hasFeature() 确实方便，但也有缺点。因为实现者可以自行决定是否与 DOM 规范的不
> 同部分保持一致。事实上，要想让 hasFearture() 方法针对所有值都返回 true 很容易，但返回 true
> 有时候也不意味着实现与规范一致。

`var hasXmlDom = document.implementation.hasFeature("XML", "1.0");`

**6.文档写入**

- document.write()
- document.writeln(),末尾添加了一个换行符（\n）
- 方法 open() 和 close() 分别用于打开和关闭网页的输出流。

### Element 类型

Element 节点具有以下的特征：

- nodeType 的值为 1；
- nodeName 的值为元素的标签名
- nodeValue 的值为 null;
- parentNode 可能是 Document 或 Element；
- 其子节点可能是 Element 、 Text 、 Comment 、 ProcessingInstruction 、 CDATASection 或 EntityReference 。

要访问元素的标签名，可以使用 nodeName 属性，也可以使用 tagName 属性；这两个属性会返回相同的值（使用后者主要是为了清晰起见）

```
var div = document.getElementById("myDiv");
alert(div.tagName); //"DIV"
alert(div.tagName == div.nodeName); //true
```

**1.HTML 元素**

- id, 元素在文档中的唯一标识符
- title, 有关元素的附加说明信息，一般通过工具提示条显示出来。
- lang ，元素内容的语言代码，很少使用
- dir ，语言的方向，值为 "ltr" （left-to-right，从左至右）或 "rtl" （right-to-left，从右至左），也很少使用
- className ，与元素的 class 特性对应，即为元素指定的 CSS 类。没有将这个属性命名为 class ，是因为 class 是 ECMAScript 的保留字

**2.特性**

- getAttribute()，获取特性
- setAttribute(),接受 2 个参数，要设置的特性名和值。
- removeAttribute(),删除特性

**3.attributes 属性**

> Element 类型是使用 attributes 属性的唯一一个 DOM 节点类型。 attributes 属性中包含一个 NamedNodeMap ，与 NodeList 类似，也是一个“动态”的集合。元素的每一个特性都由一个 Attr 节点表示，每个节点都保存在 NamedNodeMap 对象中。 NamedNodeMap 对象拥有下列方法

-  getNamedItem(name) ：返回 nodeName 属性等于 name 的节点；
-  removeNamedItem(name) ：从列表中移除 nodeName 属性等于 name 的节点；
-  setNamedItem(node) ：向列表中添加节点，以节点的 nodeName 属性为索引；
-  item(pos) ：返回位于数字 pos 位置处的节点

> attributes 属性中包含一系列节点，每个节点的 nodeName 就是特性的名称，而节点的 nodeValue 就是特性的值。要取得元素的 id 特性，可以使用以下代码。

`var id = element.attributes.getNamedItem("id").nodeValue;`

以下是使用方括号语法通过特性名称访问节点的简写方式。

`var id = element.attributes["id"].nodeValue;`

- 想要遍历元素的特性， attributes 可以派上用场

**4.创建元素**

- document.createElement() 方法可以创建新元素
- 使用 createElement() 方法创建新元素的同时，也为新元素设置了 ownerDocument 属性。此
  时，还可以操作元素的特性，为它添加更多子节点，以及执行其他操作。

**5.元素的子节点**

- 元素的 childNodes 属性中包含了它的所有子节点，这些子节点有可能是元素、文本节点、注释或处理指令
- 不同浏览器在看待这些节点方面存在显著的不同

  ```
  <ul id="myList">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
  </ul>
  // IE下，ul会有3个子节点。但在其他的节点中，会有7个元素。包括3个li元素和4个文本节点（表示li元素之间的空白符）
  //如果像下面这样将元素间的空白符删除，那么所有浏览器都会返回相同数目的子节点。
  <ul id="myList"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>
  ```

- 遍历子节点，先检查一下 nodeType 属性。

  ```
  let sum = null;
  for (let i = 0; i < a.childNodes.length; i++) {
      if (a.childNodes[i].nodeType === 1) {
          sum++;
      }
  }
  console.log(sum);
  // 这个例子会循环遍历特定元素的每一个子节点，然后只在子节点的 nodeType 等于 1（表示是元素
     节点）的情况下，才会执行某些操作。
  ```

### Text 类型

- nodeType 的值为 3
- nodeName 的值为 “#text”
- nodeValue 的值为节点所包含的文本
- parentNode 是一个 Element
- 没有子节点

操作节点中的文本：

- appendData(text): 将 text 添加到节点的末尾。
- deleteData(offset, count) ：从 offset 指定的位置开始删除 count 个字符。
- insertData(offset, text) ：在 offset 指定的位置插入 text 。
- replaceData(offset, count, text) ：用 text 替换从 offset 指定的位置开始到 offset+count 为止处的文本。
- splitText(offset) ：从 offset 指定的位置将当前文本节点分成两个文本节点。
- substringData(offset, count) ：提取从 offset 指定的位置开始到 offset+count 为止处的字符串
- 文本节点还有一个 length 属性，保存着节点中字符的数目。而且，nodeValue.length 和 data.length 中也保存着同样的值。

**1.创建文本节点**

- document.createTextNode()创建文本节点。同时为其设置 ownerDocument 属性。添加到文档树之后，才可以看见。

**2.规范化文本节点**

- normalize()，在一个包含两个或多个文本节点的父元素上调用 normalize() 方法，则会将所有文本节点合并成一个节点，结果节点的 nodeValue 等于将合并前每个文本节点的 nodeValue 值拼接起来的值

**3.分割文本节点**

- splitText(),这个方法会将一个文本节点分成两个文本节点，即按照指定的位置分割 nodeValue 值。

### Comment 类型

- nodeType 的值为 8；
- nodeName 的值为 "#comment" ；
- nodeValue 的值是注释的内容；
- parentNode 可能是 Document 或 Element ；
- 不支持（没有）子节点。

> Comment 类型与 Text 类型继承自相同的基类，因此它拥有除 splitText() 之外的所有字符串操
> 作方法。与 Text 类型相似，也可以通过 nodeValue 或 data 属性来取得注释的内容。

- 使用 document.createComment() 并为其传递注释文本也可以创建注释节点

### CDATASection 类型

- nodeType 的值为 4；

### DocumentType 类型

- nodeType 的值为 10
- nodeName 的值为 doctype 的名称；
- nodeValue 的值为 null ；
- parentNode 是 Document ；
- document.doctype 获取文档类型。

### DocumentFragment 类型

- 在所有节点类型中，只有 DocumentFragment 在文档中没有对应的标记。
- DOM 规定文档片段（document fragment）是一种“轻量级”的文档，可以包含和控制节点，但不会像完整的文档那样占用额外的资源。 DocumentFragment 节点具有下列特征：
  - nodeType 的值为 11
  - nodeName 的值为 "#document-fragment"
  - nodeValue 的值为 null ；
  - parentNode 的值为 null ；
  - 子节点可以是 Element 、 ProcessingInstruction 、 Comment 、 Text 、 CDATASection 或 EntityReference 。
    `var fragment = document.createDocumentFragment();`

### Attr 类型

- nodeType 的值为 2；
- nodeName 的值是特性的名称；
- nodeValue 的值是特性的值；
- parentNode 的值为 null ；
- 在 HTML 中不支持（没有）子节点；

> 尽管它们也是节点，但特性却不被认为是 DOM 文档树的一部分。开发人员最常使用的是 getAttribute() 、 setAttribute() 和 removeAttribute() 方法，很少直接引用特性节点。

> Attr 对象有 3 个属性： name 、 value 和 specified 。其中， name 是特性名称（与 nodeName 的
> 值相同）， value 是特性的值（与 nodeValue 的值相同），而 specified 是一个布尔值，用以区别特
> 性是在代码中指定的，还是默认的。

> 使用 document.createAttribute() 并传入特性的名称可以创建新的特性节点。例如，要为元素
> 添加 align 特性，可以使用下列代码：

```
var attr = document.createAttribute("align");
attr.value = "left";
element.setAttributeNode(attr);
alert(element.attributes["align"].value); //"left"
alert(element.getAttributeNode("align").value); //"left"
alert(element.getAttribute("align")); //"left"
```

> 我们并不建议直接访问特性节点。实际上，使用 getAttribute() 、 setAttribute()
> 和 removeAttribute() 方法远比操作特性节点更为方便。

## DOM 操作技术

### 动态脚本

```
function loadScript(url){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}
loadScript("client.js");
```

### 动态 CSS 样式

```
function loadStyles(url) {
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    let head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}
loadStyles("styles.css");
```

### 操作表格

> <table\> 元素是 HTML 中最复杂的结构之一。要想创建表格，一般都必须涉及表示表格行、单元格、
> 表头等方面的标签。由于涉及的标签多，因而使用核心 DOM 方法创建和修改表格往往都免不了要编写
> 大量的代码。

**<table\>元素添加的属性和方法**

- caption: 保存着对<caption\>元素（如果有）的指针
- tBodies: 是一个 <tbody\> 元素的 HTMLCollection 。
- tFoot ：保存着对 <tfoot\> 元素（如果有）的指针。
- tHead ：保存着对 <thead\> 元素（如果有）的指针。
- rows ：是一个表格中所有行的 HTMLCollection 。
- createTHead() ：创建 <thead\> 元素，将其放到表格中，返回引用。
- createTFoot() ：创建 <tfoot\> 元素，将其放到表格中，返回引用。
- createCaption() ：创建 <caption\> 元素，将其放到表格中，返回引用。
- deleteTHead() ：删除 <thead\> 元素。
- deleteTFoot() ：删除 <tfoot\> 元素。
- deleteCaption() ：删除 <caption\> 元素。
- deleteRow(pos) ：删除指定位置的行。
- insertRow(pos) ：向 rows 集合中的指定位置插入一行。

**<tbody\>元素添加的属性和方法**

- rows ：保存着 <tbody\> 元素中行的 HTMLCollection 。
- deleteRow(pos) ：删除指定位置的行
- insertRow(pos) ：向 rows 集合中的指定位置插入一行，返回对新插入行的引用。

**<tr\> 元素添加的属性和方法**

- cells ：保存着 <tr\> 元素中单元格的 HTMLCollection 。
- deleteCell(pos) ：删除指定位置的单元格。
- insertCell(pos) ：向 cells 集合中的指定位置插入一个单元格，返回对新插入单元格的引用。

### 使用 NodeList

> 理解 NodeList 及其“近亲” NamedNodeMap 和 HTMLCollection ，是从整体上透彻理解 DOM 的
> 关键所在。这三个集合都是“动态的”；换句话说，每当文档结构发生变化时，它们都会得到更新。因
> 此，它们始终都会保存着最新、最准确的信息。从本质上说，所有 NodeList 对象都是在访问 DOM 文
> 档时实时运行的查询。例如，下列代码会导致无限循环：

```
 var divs = document.getElementsByTagName("div"),
    i,
    div;
 for (i=0; i < divs.length; i++){
     div = document.createElement("div");
     document.body.appendChild(div);
 }
```

**由于这个集合是“动态的”，因此只要有新的<div\>元素被添加到页面中，这个元素就会被添加到该集合中。浏览器不会将创建的所有集合都保存在一个列表中，而是在下次访问集合时再更新集合。因此每次循环对 i < divs.length 求值，它们的值永远不可能相等。**

**解决办法：如果想要迭代一个 NodeList ，最好是使用 length 属性初始化第二个变量，然后将迭代器与该变量进行比较**

`for (i=0, len=divs.length; i < len; i++){`

## 小结

DOM 由各种节点构成，简要总结如下。

- 最基本的节点类型是 Node ，用于抽象地表示文档中一个独立的部分；所有其他类型都继承自 Node
- Document 类型表示整个文档，是一组分层节点的根节点。在 JavaScript 中， document 对象是 Document 的一个实例。使用 document 对象，有很多种方式可以查询和取得节点。
- Element 节点表示文档中的所有 HTML 或 XML 元素，可以用来操作这些元素的内容和特性。
- DOM 操作往往是 JavaScript 程序中开销最大的部分，而因访问 NodeList 导致的问题为最多。 NodeList 对象都是“动态的”，这就意味着每次访问 NodeList 对象，都会运行一次查询。有鉴于此，最好的办法就是尽量减少 DOM 操作

# 第 11 章：DOM 扩展

## 选择符 API

### querySelector() 方法

该方法接收一个 CSS 选择符。

### querySelectorAll() 方法

该方法接收一个 CSS 选择符，返回一个 NodeList 的实例。要取得返回的 NodeList 中的每一个元素，可以使用 item() 方法，也可以使用方括号语法

### matchesSelector() 方法

这个方法接收一个参数，即 CSS 选择符，如果调用元素与该选择符匹配，返回 true ；否则，返回 false 。

```
// 实验性实现
function matchesSelector(element, selector) {
    if (element.matchesSelector) {
        return element.matchesSelector(selector);
    } else if (element.msMatchesSelector) {
        return element.msMatchesSelector(selector);
    } else if (element.mozMatchesSelector) {
        return element.mozMatchesSelector(selector);
    } else if (element.webkitMatchesSelector) {
        return element.webkitMatchesSelector(selector);
    } else {
        throw new Error('Not supported.')
    }
}
```

## 元素遍历

> 对于元素间的空格，IE9 及之前版本不会返回文本节点，而其他所有浏览器都会返回文本节点。这样，
> 就导致了在使用 childNodes 和 firstChild 等属性时的行为不一致。为了弥补这一差异，而同时又保
> 持 DOM 规范不变，Element Traversal 规范（www.w3.org/TR/ElementTraversal/）新定义了一组属性。

- **利用这些元素不必担心空白文本节点**
- childElementCount: 返回子元素（不包括文本节点和注释）的个数
- firstElementCount: 指向第一个子元素；firstChild 的元素版。
- lastElementChild： 指向最后一个子元素；lastChild 的元素版
- previousElementSibling: 指向前一个同辈元素； previousSibling 的元素版
- nextElementSibling ：指向后一个同辈元素； nextSibling 的元素版。

## HTML5

### 与类相关的扩展

**1.getElementsByClassName() 方法**

> getElementsByClassName() 方法接收一个参数，即一个包含一或多个类名的字符串，返回带有
> 指定类的所有元素的 NodeList 。传入多个类名时，类名的先后顺序不重要

**2. classList 属性**

> 这个 classList 属性是新集合类型 DOMTokenList 的实例。与其他 DOM 集合类似，DOMTokenList 有一个表示自己包含多少元素的 length 属性，而要取得每个元素可以使用 item()方法，也可以使用方括号语法。

- add(value): 将给定的字符串值添加到列表中。如果值已经存在，就不添加了。
- contains(value): 表示列表中是否存在给定的值，如果存在则返回 true ，否则返回 false 。
- remove(value) ：从列表中删除给定的字符串。
- toggle(value) ：如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它。

```javascript
// tab 切换实例实现。该方法只支持Firefox 和 Chrome
let activeList = document.getElementsByTagName('li')
let a = 0 // 暂存当前 active 类
Array.from(activeList).forEach((item, index) => {
  item.onclick = function() {
    activeList[a].classList.toggle('active') // 移除当前的类
    this.classList.add('active') // 添加类
    a = index
  }
})
```

### 焦点管理

document.activeElement 获取 DOM 焦点。这个属性始终会引用 DOM 中当前获得了焦点的元素。元素获得焦点的方式有页面加载、用户输入（通常是通过按 Tab 键）和在代码中调用 focus() 方法。

```
let button = document.getElementById('myButton');
button.focus();
console.log(document.activeElement === button); // true
```

> 默认情况下，文档刚刚加载完成时， document.activeElement 中保存的是 document.body 元
> 素的引用。文档加载期间， document.activeElement 的值为 null 。

新增 document.hasFocus()方法，这个方法确定文档是否获得了焦点。

```
let button = document.getElementById('myButton');
button.focus();
console.log(document.activeElement === button); // true
console.log(document.hasFocus()); // true
```

### HTMLDocument 的变化

**1.readyState 属性**

- loading,正在加载文档；
- complete,已经加载完文档。
  > 在这个属性得到广泛支持之前，要实现这样一个指示器，必须借助 onload 事件处理程序设置一
  > 个标签，表明文档已经加载完毕。

**2.兼容模式**

> 自从 IE6 开始区分渲染页面的模式是标准的还是混杂的，检测页面的兼容模式就成为浏览器的必要
> 功能。IE 为此给 document 添加了一个名为 compatMode 的属性，这个属性就是为了告诉开发人员浏
> 览器采用了哪种渲染模式。

```
if (document.compatMode === 'CSS1Compat') {
    alert('Standards mode')
} else {
    alert('Quirks mode')
}
```

**3.head 属性**

- document.head 属性，作为对<head\>元素的引用
- `var head = document.head || document.getElementsByTagName('head')[0]`
- 实现 document.head 属性的浏览器包括 Chrome 和 Safari .

### 字符集属性

- charset 属性表示文档中实际使用的字符集，也可以用来指定新字符集。
- `document.charset`, // UTF-8

### 自定义数据属性

- HTML5 规定可以为元素添加非标准的属性，但要添加前缀 data-,目的是为元素提供与渲染无关的信息，或者提供语义信息。
- 添加了自定义属性之后，可以通过元素的 dataset 属性来访问自定义属性的值。属性名没有 data-前缀。

### 插入标记

**1.innerHTML 属性**

- 在读模式下，innerHTML 属性返回与调用元素的所有子节点（包括元素、注释和文本节点）对应的 HTML 标记。
- 在写模式下，innerHTML 会根据指定的值创建新的 DOM 树，然后用这个 DOM 树完全替换调用元素原先的所有子节点。

**2.outerHTML 属性**

- 在读模式下， outerHTML 返回调用它的元素及所有子节点的 HTML 标签。
- 在写模式下， outerHTML 会根据指定的 HTML 字符串创建新的 DOM 子树，然后用这个 DOM 子树完全替换调用元素。

~~**3.insertAdjacentHTML()方法**~~
**3.insertAdjacentElement()方法**, FireFox 48+
~~- 该方法接收两个参数：插入位置和要插入的 HTML 文本。第一个参数必须是下列值之一~~

- 该方法接收两个参数：插入位置和要插入的 DOM 节点。第一个参数必须是下列值之一
- "beforebegin" ，在当前元素之前插入一个紧邻的同辈元素；
- "afterbegin" ，在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素；
- "beforeend" ，在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素；
- "afterend" ，在当前元素之后插入一个紧邻的同辈元素。

```
// 作为前一个同辈元素插入
a.insertAdjacentHTML('beforebegin', '<p>Hello world!</p>');
// 作为第一个子元素插入
a.insertAdjacentHTML('afterbegin', '<p>Hello world!</p>');
// 最为最后一个子元素插入
a.insertAdjacentHTML('beforeend', '<p>Hello world!</p>');
// 作为后一个同辈元素插入
a.insertAdjacentHTML('afterend', '<p>Hello world!</p>');
```

**4.内存与性能问题**

> 在使用 innerHTML 、outerHTML 属性和 insertAdjacentHTML() 方法时，最好先手工删除要被替换的元素的所有事件处理程序和 JavaScript 对象属性

### scrollIntoView() 方法

- 可以在所有 HTML 元素上调用。
- 如果给这个方法传入 true 作为参数，或者不传入任何参数，那么窗口滚动之后会让调用元素的顶部与视口顶部尽可能平齐。
- 如果传入 false 作为参数，调用元素会尽可能全部出现在视口中，（可能的话，调用元素的底部会与视口顶部平齐。）不过顶部不一定平齐。

## 专有扩展

### 文档模式

> IE8 引入了一个新的概念叫‘文档模式’(document mode)。页面的文档模式决定了可以使用什么功能。文档模式决定了你可以使用哪个级别的 CSS，可以在 JavaScript 中使用哪些 API，以及如何对待文档类型。

### children 属性

> 由于 IE9 之前的版本与其他浏览器在处理文本节点中的空白符时有差异，因此就出现了 children 属性。该属性是 HTMLCollections 的实例，只包含元素中同样还是元素的子节点。除此之外，children 属性与 childNodes 没有什么区别，即在元素只包含元素字节点时，这两个属性的值相同。

### contains() 方法

- 查询某个节点是不是另一个节点的后代。
- 接收一个参数，即要检测的后代节点。
- 使用 DOM Level 3 compareDocumentPosition()也能够确定节点间的关系。返回一个表示该关系的位掩码（bitmask)。

| 掩码 | 节点关系                                    |
| ---- | ------------------------------------------- |
| 1    | 无关(给定的节点不在当前文档中)              |
| 2    | 居前(给定的节点在 DOM 树中位于参考节点之前) |
| 4    | 居后(给定的节点在 DOM 树中位于参考节点之后) |
| 8    | 包含(给定的节点是参考节点的祖先)            |
| 16   | 被包含(给定的节点是参考节点的后代)          |

`document.documentElement.compareDocumentPosition(document.body); // 20 body被包含，同时在html的后面`

### 插入文本

**1.innerText 属性**

- innerText 读取值时，它会按照由浅入深的顺序，将子文档树中的所有文本拼接起来。
- innerText 写入值时，结果会删除元素的子节点，插入包含相应文本值的文本节点。
- Firefox 不支持 innerText,但支持作用类似的 textContent 属性。
- textContent 是 DOM Level 3 规定的一个属性。IE9 以上支持。

```
// 检测这个元素是否有textContent属性，如果有，则类型检测是 string。如果没有，则使用innerText
function getInnerText(element) {
    return (typeof element.textContent === 'string') ? element.textContent : element.innerText;
}
```

> 实际上， innerText 与 textContent 返回的内容并不完全一样。比如，
> innerText 会忽略行内的样式和脚本，而 textContent 则会像返回其他文本一样返
> 回行内的样式和脚本代码。避免跨浏览器兼容问题的最佳途径，就是从不包含行内样
> 式或行内脚本的 DOM 子树副本或 DOM 片段中读取文本。

**2.outerText 属性**

- outerText 不只是替换调用它的元素的子节点，而是会替换整个元素（包括子节点）
- 少用

### 滚动

- scrollIntoViewIfNeeded(alignCenter) ：只在当前元素在视口中不可见的情况下，才滚动浏览器窗口或容器元素，最终让它可见。如果当前元素在视口中可见，这个方法什么也不做。如果将可选的 alignCenter 参数设置为 true ，则表示尽量将元素显示在视口中部（垂直方向）。
- scrollByLines(lineCount) ：将元素的内容滚动指定的行高， lineCount 值可以是正值，也可以是负值。
- scrollByPages(pageCount) ：将元素的内容滚动指定的页面高度，具体高度由元素的高度决定。

# 第 12 章：DOM2 和 DOM3

## DOM 变化

检测浏览器是否支持 DOM 模块

```
let supportsDOM2Core = document.implementation.hasFeature('Core', '2.0');
let supportsDOM3Core = document.implementation.hasFeature('Core', '3.0');
let supportsDOM2HTML = document.implementation.hasFeature('HTML', '2.0');
let supportsDOM2Views = document.implementation.hasFeature('Views', '2.0');
let supportsDOM2XML = document.implementation.hasFeature('XML', '2.0');
```

- createHTMLDocument(),创建一个完整的 HTML 文档。包含 <html\> 、 <head\> 、 <title\> 和 <body\>元素。这个方法只接受一个参数，即新创建文档的标题（放在 <title\> 元素中的字符串），返回新的 HTML 文档。只有 Opera 和 Safari 支持这个方法

```
var htmldoc = document.implementation.createHTMLDocument("New Doc");
alert(htmldoc.title); //"New Doc"
alert(typeof htmldoc.body); //"obje
```

- isSupported() 方法。与 DOM1 级为 document.implementation 引入的 hasFeature()方法类似， isSupported()方法用于确定当前节点具有什么能力。接收两个参数：特性名和特性版本号。

```
if (document.body.isSupported("HTML", "2.0")){
//执行只有"DOM2 级 HTML"才支持的操作
}
```

- DOM3 级引入了两个辅助比较节点的方法： isSameNode() 和 isEqualNode() 。
  > 这两个方法都接受一个节点参数，并在传入节点与引用的节点相同或相等时返回 true 。所谓相同，指的是两个节点引用的是同一个对象。所谓相等，指的是两个节点是相同的类型，具有相等的属性（ nodeName 、 nodeValue ，等等），而且它们的 attributes 和 childNodes 属性也相等（相同位置包含相同的值）。

```
var div1 = document.createElement("div");
div1.setAttribute("class", "box");
var div2 = document.createElement("div");
div2.setAttribute("class", "box");
alert(div1.isSameNode(div1)); //true
alert(div1.isEqualNode(div2)); //true
alert(div1.isSameNode(div2)); //false
```

- DOM3 级还针对为 DOM 节点添加额外数据引入了新方法。其中， setUserData() 方法会将数据指定给节点，它接受 3 个参数：要设置的键、实际的数据（可以是任何数据类型）和处理函数。

`document.body.setUserData("name", "Nicholas", function(){});`

- 通过使用 getUserData()并传入相同的键，就可以取得该数据。

  > 传入 setUserData() 中的处理函数会在带有数据的节点被复制、删除、重命名或引入一个文档时
  > 调用，因而你可以事先决定在上述操作发生时如何处理用户数据。处理函数接受 5 个参数：表示操作类
  > 型的数值（1 表示复制，2 表示导入，3 表示删除，4 表示重命名）、数据键、数据值、源节点和目标节
  > 点。在删除节点时，源节点是 null ；除在复制节点时，目标节点均为 null 。在函数内部，你可以决定
  > 如何存储数据。

- 框架和内嵌框架分别用 HTMLFrameElement 和 HTMLIFrameElement 表示，在 DOM2 级中多有一个新属性，叫 contentDocument。该属性包含一个指针，指向表示框架内容的文档对象。contentWindow,指向 window 对象

  ```
   var iframe = document.getElementById("myIframe");
   var iframeDoc = iframe.contentDocument; //在 IE8
  ```

## 样式

**定义样式的方式有 3 种**

- 通过 <link\/> 元素包含外部样式表文件
- 使用 <style\/> 元素定义嵌入式样式
- 使用 style 特性定义针对特定元素的样式

### 访问元素的样式

任何支持 style 特性的 HTML 元素在 JavaScript 中都有一个对应的 style 属性。这个 style 对象是 CSSStyleDeclaration 的实例，包含着通过 HTML 的 style 特性指定的所有样式信息，但不包含与外部样式表或嵌入样式表经层叠而来的样式。

| CSS 属性         | JavaScript 属性       |
| ---------------- | --------------------- |
| background-image | style.backgroundImage |
| color            | style.color           |
| display          | style.display         |
| font-family      | style.fontFamily      |

**由于 float 是 JavaScript 中的保留字，因此不能用作属性名。“DOM2 级样式”规范规定样式对象上相应的属性名应该是 cssFloat**

**1.DOM 样式属性和方法**

- cssText:能够访问到 style 特性中的 CSS 代码
- length: 应用给元素的 CSS 属性的数量
- parentRule: 表示 CSS 信息的 CSSRule 对象
- getPropertyCSSValue(propertyName) ：返回包含给定属性值的 CSSValue 对象。
- getPropertyPriority(propertyName) ：如果给定的属性使用了 !important 设置，则返回 "important" ；否则，返回空字符串。
- getPropertyValue(propertyName) ：返回给定属性的字符串值。
- item(index) ：返回给定位置的 CSS 属性的名称。
- removeProperty(propertyName) ：从样式中删除给定属性。
- setProperty(propertyName,value,priority) ：将给定属性设置为相应的值，并加上优先
  权标志（ "important" 或者一个空字符串）。

**2.计算的样式**

- DOM2 级样式增强了 document.defaultView,提供了 getComputedStyle()方法。
- 也可以通过 window.getComputedStyle() 获取改方法
- getComputedStyle()方法，接受 2 个参数：要取得计算样式的元素和一个伪元素字符串（例如":after"）。如果不需要伪元素，第二个参数可以是 null.
- 能够获取到<style\>中定义的 CSS 样式
- IE 中使用 元素的 currentStyle 属性

```
let div = document.getElementById('myDiv')
let computedStyle = document.defaultView.getComputedStyle(div, null);
console.log(computedStyle.border);
```

> 无论在哪个浏览器中，最重要的一条是要记住所有计算的样式都是只读的；不能修改计算后样式对
> 象中的 CSS 属性。此外，计算后的样式也包含属于浏览器内部样式表的样式信息，因此任何具有默认值
> 的 CSS 属性都会表现在计算后的样式中。例如，所有浏览器中的 visibility 属性都有一个默认值，
> 但这个值会因实现而异。在默认情况下，有的浏览器将 visibility 属性设置为 "visible" ，而有的
> 浏览器则将其设置为 "inherit" 。换句话说，不能指望某个 CSS 属性的默认值在不同浏览器中是相同
> 的。如果你需要元素具有某个特定的默认值，应该手工在样式表中指定该值

### 操作样式表

CSSStyleSheet 类型表示的是样式表，包括通过 <link\> 元素包含的样式表和在 <style\> 元素中定义的样式表。这两个元素本身分别是由 HTMLLinkElement 和 HTMLStyleElement 类型表示的

- document.implementation.hasFeature("StyleSheets", "2.0"),检测是否支持 DOM2 级样式表

**1.CSS 规则**

- cssText ：返回整条规则对应的文本。
- style ：一个 CSSStyleDeclaration 对象，可以通过它设置和取得规则中特定的样式值。

**2.创建规则**

insertRule() 方法。向现有样式表中添加新规则。这个方法接受两个参数：规则文本和表示在哪里插入规则的索引。

**3.删除规则**
deleteRule()方法，接收一个参数，要删除的的规则的位置。

### 元素的大小

**1.偏移量**

- offsetHeight: 元素在垂直方向上占用的空间大小，像素计算。包括元素的高度、可见的水平滚动条的高度、上下边框的高度。
- offsetWeight: 元素在水平方向上占用的空间大小，以像素计。包括元素的宽度、（可见的）垂直滚动条的宽度、左边框宽度和右边框宽度。
- offsetLeft ：元素的左外边框至包含元素的左内边框之间的像素距离。
- offsetTop ：元素的上外边框至包含元素的上内边框之间的像素距离。

![偏移量](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548060621&di=be498e21241e36f290ab413f67b7670d&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.th7.cn%2Fd%2Ffile%2Fp%2F2016%2F06%2F26%2F4e5175de1dbdc9ce0f9dfd178134b5db.jpg)

```
// 取得元素在页面上的偏移量
function getElementLeft(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}
```

> 所有这些偏移量属性都是只读的，而且每次访问它们都需要重新计算。因此，应该尽量避免重复访问这些属性；如果需要重复使用其中某些属性的值，可以将它们保存在局部变量中，以提高性能。

**2.客户区大小**

- clientWidth:元素内容区宽度加上左右内边距宽度
- clientHeight: 元素内容区高度加上上下内边距高度
  > 与偏移量相似，客户区大小也是只读的，也是每次访问都要重新计算的。

**3.滚动大小**（可以设置）

- scrollHeight: 在没有滚动条的情况下，元素内容的总高度
- scrollWidth: 在没有滚动条的情况下，元素内容的总宽度
- scrollLeft: 被隐藏在内容区域左侧的像素数。通过设置这个属性可以改变元素的滚动位置。
- scrollTop ：被隐藏在内容区域上方的像素数。通过设置这个属性可以改变元素的滚动位置。

![滚动](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547539718511&di=6ee0eed7bd0485e012182e52693aa1e5&imgtype=jpg&src=http%3A%2F%2Fs1.knowsky.com%2F20170206%2Feohsizo4zso00.png)

**4.确定元素大小**

- getBoundingClientRect()，返回一个矩形对象。包含四个属性：left, top, right 和 bottom.
- IE8 及更早版本左上角坐标是（2，2），IE9 及其他传统是（0，0）

## 遍历

> “DOM2 级遍历和范围”模块定义了两个用于辅助完成顺序遍历 DOM 结构的类型： NodeIterator 和 TreeWalker 。这两个类型能够基于给定的起点对 DOM 结构执行深度优先（depth-first）的遍历操作。

### NodeIterator

- 可以使用 document.createNodeIterator() 方法创建它的新实例。
- root: 想要作为搜索起点的树中的节点
- whatToShow: 表示要访问哪些节点的数字代码
- filter: 是一个 NodeFilter 对象，或者一个表示应该接受还是拒绝某种特定节点的函数。
- entityReferenceExpansion: 布尔值，表示是否要扩展实体引用。

whatToShow 参数是一个位掩码，通过应用一或多个过滤器（filter）来确定要访问哪些节点。这个参数的值以常量形式在 NodeFilter 类型中定义

- NodeFilter.SHOW_ALL ：显示所有类型的节点。
- NodeFilter.SHOW_ELEMENT ：显示元素节点。
- NodeFilter.SHOW_TEXT ：显示文本节点
- NodeFilter.SHOW_COMMENT ：显示注释节点。
- NodeFilter.SHOW_DOCUMENT ：显示文档节点。
- NodeFilter.SHOW_DOCUMENT_TYPE ：显示文档类型节点。

> 可以通过 createNodeIterator() 方法的 filter 参数来指定自定义的 NodeFilter 对象，或者指定一个功能类似节点过滤器（node filter）的函数。每个 NodeFilter 对象只有一个方法，即 acceptNode() ；如果应该访问给定的节点，该方法返回 NodeFilter.FILTER_ACCEPT ，如果不应该访问给定的节点，该方法返回 NodeFilter.FILTER_SKIP 。由于 NodeFilter 是一个抽象的类型，因此不能直接创建它的实例。在必要时，只要创建一个包含 acceptNode() 方法的对象，然后将这个对象传入 createNodeIterator() 中即可。

```
let filter = {
    acceptNode: function (node) {
        return node.tagName.toLocaleLowerCase() === 'p' ?
            NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
}

let iterator = document.createNodeIterator(root, NodeFilter.SHOW_ELEMENT, filter, false);
// 如果不指定过滤器，则第三个参数为空
let iterator = document.createNodeIterator(root, NodeFilter.SHOW_ELEMENT, null, false);
```

> NodeIterator 类型的两个主要方法是 nextNode() 和 previousNode() 。顾名思义，在深度优先的 DOM 子树遍历中， nextNode() 方法用于向前前进一步，而 previousNode() 用于向后后退一步。在刚刚创建的 NodeIterator 对象中，有一个内部指针指向根节点，因此第一次调用 nextNode() 会返回根节点。当遍历到 DOM 子树的最后一个节点时， nextNode() 返回 null 。 previousNode() 方法的工作机制类似。当遍历到 DOM 子树的最后一个节点，且 previousNode() 返回根节点之后，再次调用它就会返回 null 。

```
<div id="div1">
    <p><b>Hello</b> world!</p>
    <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
    </ul>
</div>

let div = document.getElementById('div1');
let iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT, null, false)

let node = iterator.nextNode();
while(node !== null) {
    console.log(node.tagName);
    node = iterator.nextNode();
}

DIV
P
B
UL
LI
LI
LI
```

### TReeWalker

> TreeWalker 是 NodeIterator 的一个更高级的版本。除了包括 nextNode() 和 previousNode()在内的相同的功能之外，这个类型还提供了下列用于在不同方向上遍历 DOM 结构的方法。

- parentNode()：遍历到当前节点的父节点；
- firstChild(): 遍历到当前节点的第一个子节点；
- lastChild(): 遍历到当前节点的最后一个子节点；
- nextSibling(): 遍历到当前节点的下一个同辈节点；
- previousSibling(): 遍历到当前节点的上一个同辈节点。

创建 TreeWalker 对象要使用 document.createTreeWalker() 方法，这个方法接受的 4 个参数与 document.createNodeIterator() 方法相同：作为遍历起点的根节点、要显示的节点类型、过滤器和一个表示是否扩展实体引用的布尔值。由于这两个创建方法很相似，所以很容易用 TreeWalker 来代替 NodeIterator

- filter 可以返回的值有所不同。除了 NodeFilter.FILTER_ACCEPT 和 NodeFilter.FILTER_SKIP 之外，还可以使用 NodeFilter.FILTER_REJECT 。
- NodeFilter.FILTER_SKIP 与 NodeFilter.FILTER_REJECT 的作用相同：跳过指定的节点。
- 但在使用 TreeWalker 对象时， NodeFilter.FILTER_SKIP 会跳过相应节点继续前进到子树中的下一个节点，而 **NodeFilter.FILTER_REJECT 则会跳过相应节点及该节点的整个子树**。
- TreeWalker 类型还有一个属性，名叫 currentNode ，表示任何遍历方法在上一次遍历中返回的节点。通过设置这个属性也可以修改遍历继续进行的起点

## 范围

### DOM 中的范围

DOM2 级在 Document 类型中定义了 createRange() 方法。使用 hasFeature() 或直接检测该方法，都可以确定浏览器是否支持范围。兼容浏览器中，这个方法属于 document 对象。

```
let supportsRange = document.implementation.hasFeature('Range', '2.0');
let alsoSupportsRange = (typeof document.createRange === 'function');
console.log(supportsRange, alsoSupportsRange);
```

如果浏览器支持范围，就可以使用 createRange() 来创建 DOM 范围

```
let range = document.createRange();
```

> 与节点类似，新创建的范围也直接与创建它的文档关联在一起，不能用于其他文档。创建了范围之后，接下来就可以使用它在后台选择文档中的特定部分。而创建范围并设置了其位置之后，还可以针对范围的内容执行很多的操作，从而实现对底层 DOM 树的更精细的控制。

每个范围由一个 Range 类型的实例表示，这个实例拥有很多属性和方法。

- startContainer: 包含范围起点的节点（即选区中第一个节点的父节点）
- startOffset ：范围在 startContainer 中起点的偏移量。如果 startContainer 是文本节点、注释节点或 CDATA 节点，那么 startOffset 就是范围起点之前跳过的字符数量。否则，startOffset 就是范围中第一个子节点的索引。
- endContainer ：包含范围终点的节点（即选区中最后一个节点的父节点）。
- endOffset ：范围在 endContainer 中终点的偏移量（与 startOffset 遵循相同的取值规则）
- commonAncestorContainer ： startContainer 和 endContainer 共同的祖先节点在文档树中位置最深的那个

**1.用 DOM 范围实现简单选择**

```
 <!DOCTYPE html>
 <html>
     <body>
        <p id="p1"><b>Hello</b> world!</p>
     </body>
 </html>

 var range1 = document.createRange();
 range2 = document.createRange();
 p1 = document.getElementById("p1");
 range1.selectNode(p1);
 range2.selectNodeContents(p1);
```

要使用范围来选择文档中的一部分，最简的方式就是使用 selectNode()或 selectNodeContents().这两个方法都接受一个参数，即一个 DOM 节点，然后使用该节点中的信息来填充范围。其中，selectNode()方法选择整个节点，包括其子节点；而 selectNodeContents()方法则只选择节点的子节点。

> 在调用 selectNode() 时， startContainer 、 endContainer 和 commonAncestorContainer 都等于传入节点的父节点，也就是这个例子中的 document.body 。而 startOffset 属性等于给定节点在其父节点的 childNodes 集合中的索引（在这个例子中是 1——因为兼容 DOM 的浏览器将空格算作一个文本节点）， endOffset 等于 startOffset 加 1（因为只选择了一个节点）。
> 在调用 selectNodeContents() 时， startContainer 、 endContainer 和 commonAncestorContainer 等于传入的节点，即这个例子中的 <p> 元素。而 startOffset 属性始终等于 0，因为范围从给定节点的第一个子节点开始。最后， endOffset 等于子节点的数量（ node.childNodes.length ），在这个例子中是 2。

**为了更精细地控制将哪些节点包含在范围中，还可以使用下列方法**

- setStartBefore(refNode) ：将范围的起点设置在 refNode 之前，因此 refNode 也就是范围选区中的第一个子节点。同时会将 startContainer 属性设置为 refNode.parentNode ，将 startOffset 属性设置为 refNode 在其父节点的 childNodes 集合中的索引
- setStartAfter(refNode) ：将范围的起点设置在 refNode 之后，因此 refNode 也就不在范围之内了，其下一个同辈节点才是范围选区中的第一个子节点。同时会将 startContainer 属性设置为 refNode.parentNode ，将 startOffset 属性设置为 refNode 在其父节点的 childNodes 集合中的索引加 1。
- setEndBefore(refNode) ：将范围的终点设置在 refNode 之前，因此 refNode 也就不在范围之内了，其上一个同辈节点才是范围选区中的最后一个子节点。同时会将 endContainer 属性设置为 refNode.parentNode ，将 endOffset 属性设置为 refNode 在其父节点的 childNodes 集合中的索引。
- setEndAfter(refNode) ：将范围的终点设置在 refNode 之后，因此 refNode 也就是范围选区中的最后一个子节点。同时会将 endContainer 属性设置为 refNode.parentNode ，将 endOffset 属性设置为 refNode 在其父节点的 childNodes 集合中的索引加 1。

**2. 用 DOM 范围实现复杂选择**

- setStart()和 setEnd()方法。都接受两个参数： 一个参照节点和一个偏移量。对 setStart() 来说，参照节点会变成 startContainer ，而偏移量值会变成 startOffset 。对于 setEnd() 来说，参照节点会变成 endContainer ，而偏移量值会变成 endOffset 。

```
var range1 = document.createRange();
var range2 = document.createRange();
var p1 = document.getElementById('p1');
var p1Index = -1;
var i, len;
for (i = 0, len = p1.parentNode.childNodes.length; i < len; i++) {
    if (p1.parentNode.childNodes[i] === p1) {
        p1Index = i;
        break;
    }
}
range1.setStart(p1.parentNode, p1Index);
range1.setEnd(p1.parentNode, p1Index + 1);
range2.setStart(p1, 0);
range2.setEnd(p1, p1.childNodes.length);
```

**3.操作 DOM 范围中的内容**

在创建范围时 ，内部会为这个范围创建一个文档片段，范围所属的全部节点都被添加到了这个文档片段中。为了创建这个文档片段，范围内容的格式必须正确有效。在前面的例子中，我们创建的选区分别开始和结束于两个文本节点的内部，因此不能算是格式良好的 DOM 结构，也就无法通过 DOM 来表示。但是，范围知道自身缺少哪些开标签和闭标签，它能够重新构建有效的 DOM 结构以便我们对其进行操作。
对于前面的例子而言，范围经过计算知道选区中缺少一个开始的 <b> 标签，因此就会在后台动态加入一个该标签，同时还会在前面加入一个表示结束的 </b> 标签以结束 "He" 。于是，修改后的 DOM 就变成了如下所示。

```
 <p><b>He</b><b>llo</b> world!</p>
```

![如图](https://files.jb51.net/file_images/article/201702/201721390922635.png?20171139930)

- deleteContents(),这个方法能够从文档中删除范围所包含的内容。

  ```
  let p1 = document.getElementById('p1'),
      helloNode = p1.firstChild.firstChild,
      worldNode = p1.lastChild,
      range = document.createRange();
  range.setStart(helloNode, 2);
  range.setEnd(worldNode, 3);
  range.deleteContents();

  执行以上代码后，页面中会显示如下 HTML 代码：
  <p><b>He</b>rld!</p>
  ```

- 与 deleteContents() 方法相似， extractContents() 也会从文档中移除范围选区。但这两个方法的区别在于， extractContents() 会返回范围的文档片段。利用这个返回的值，可以将范围的内容插入到文档中的其他地方.

  ```
  let p1 = document.getElementById('p1'),
      helloNode = p1.firstChild.firstChild,
      worldNode = p1.lastChild,
      range = document.createRange();
  range.setStart(helloNode, 2);
  range.setEnd(worldNode, 3);

  var fragment = range.extractContents()
  p1.parentNode.appendChild(fragment)

  在这个例子中，我们将提取出来的文档片段添加到了文档 <body> 元素的末尾。（记住，在将文档片
  段传入 appendChild() 方法中时，添加到文档中的只是片段的子节点，而非片段本身。）结果得到如
  下HTML 代码：

  <p><b>He</b>rld!</p>
  <b>llo</b> wo
  ```

- cloneContents() 创建范围对象的一个副本，然后在文档的其他地方插入该副本

  ```
  let p1 = document.getElementById('p1'),
      helloNode = p1.firstChild.firstChild,
      worldNode = p1.lastChild,
      range = document.createRange();
  range.setStart(helloNode, 2);
  range.setEnd(worldNode, 3);

  var fragment = range.cloneContents()
  p1.parentNode.appendChild(fragment)

  这个方法与 extractContents() 非常类似，因为它们都返回文档片段。它们的主要区别在于，
  cloneContents() 返回的文档片段包含的是范围中节点的副本，而不是实际的节点。执行上面的操作
  后，页面中的 HTML 代码应该如下所示：

  <p><b>Hello</b> world!</p>
  <b>llo</b> wo
  ```

- 调用上面介绍的方法之前，拆分的节点并不会产生格式良好的文档片段。换句话说，原始的 HTML 在 DOM 被修改之前会始终保持不变。

**4.插入 DOM 范围中的内容**

- insertNode()，可以向范围选区的开始处插入一个节点。

  ```
  let p1 = document.getElementById('p1'),
      helloNode = p1.firstChild.firstChild,
      worldNode = p1.lastChild,
      range = document.createRange();
  range.setStart(helloNode, 2);
  range.setEnd(worldNode, 3);

  var span = document.createElement('span')
  span.style.color = 'red'
  span.appendChild(document.createTextNode('Inserted text'))
  range.insertNode(span)
  ```

- surroundContents(),环绕范围插入内容。接受一个参数，即环绕范围内容的节点。在环绕范围插入内容时，后台会执行下列步骤。

  - 提取出范围中的内容（类似执行 extractContent)
  - 将给定节点插入到文档中原来范围所在的位置上。
  - 将文档片段的内容添加到给定节点中。

  ```
  let p1 = document.getElementById('p1'),
      helloNode = p1.firstChild.firstChild,
      worldNode = p1.lastChild,
      range = document.createRange();

  range.selectNode(helloNode)
  var span = document.createElement('span')
  span.style.color = 'red'
  range.surroundContents(span);

  会给范围选区加上一个黄色的背景。得到的 HTML 代码如下所示：

  <p><b><span style="background-color:yellow">Hello</span></b> world!</p>

  为了插入 <span> ，范围必须包含整个 DOM选区（不能仅仅包含选中的 DOM 节点）。
  ```

**5.折叠 DOM 范围**

所谓折叠范围，就是指范围中未选择文档的任何部分。可以用文本框来描述折叠范围的过程。假设
文本框中有一行文本，你用鼠标选择了其中一个完整的单词。然后，你单击鼠标左键，选区消失，而光
标则落在了其中两个字母之间。同样，在折叠范围时，其位置会落在文档中的两个部分之间，可能是范
围选区的开始位置，也可能是结束位置。

使用 collapse() 方法来折叠范围，这个方法接受一个参数，一个布尔值，表示要折叠到范围的哪
一端。参数 true 表示折叠到范围的起点，参数 false 表示折叠到范围的终点。要确定范围已经折叠完
毕，可以检查 collapsed 属性，如下所示：

```
range.collapse(true) // 折叠到起点
alert(range.collapsed)  // 输出 true
```

![](https://files.jb51.net/file_images/article/201702/201721391601665.png?201711391612)

检测某个范围是否处于折叠状态，可以帮我们确定范围中的两个节点是否紧密相邻。例如，对于下
面的 HTML 代码：

```
 <p id="p1">Paragraph 1</p><p id="p2">Paragraph 2</p>

 var p1 = document.getElementById("p1"),
     p2 = document.getElementById("p2"),
     range = document.createRange();
 range.setStartAfter(p1);
 range.setStartBefore(p2);
 alert(range.collapsed); //输出 true
 在这个例子中，新创建的范围是折叠的，因为 p1 的后面和 p2 的前面什么也没有。
```

**6.比较 DOM 范围**

在多个范围的情况下，可以使用 compareBoundaryPoints() 方法来确定这些范围是否有公共的边界（起点或终点）.接受两个参数：表示比较方式的常量值和要比较的范围。比较方式的常量值如下：

- Range.START_TO_START(0) ：比较第一个范围和第二个范围的起点；
- Range.START_TO_END(1) ：比较第一个范围的起点和第二个范围的终点；
- Range.END_TO_END(2) ：比较第一个范围和第二个范围的终点
- Range.END_TO_START(3) ：比较第一个范围的终点和第一个范围的起点。

compareBoundaryPoints() 方法可能的返回值如下：如果第一个范围中的点位于第二个范围中的
点之前，返回 -1 ；如果两个点相等，返回 0 ；如果第一个范围中的点位于第二个范围中的点之后，返回
1 。

```
var range1 = document.createRange()
var range2 = document.createRange()
var p1 = document.getElementById('p1')
range1.selectNodeContents(p1);
range2.selectNodeContents(p1)
range2.setEndBefore(p1.lastChild);
console.log(range1.compareBoundaryPoints(Range.START_TO_START, range2));// 0
console.log(range1.compareBoundaryPoints(Range.END_TO_END, range2)); // 1

在这个例子中，两个范围的起点实际上是相同的，因为它们的起点都是由 selectNodeContents()
方法设置的默认值来指定的。因此，第一次比较返回 0 。但是， range2 的终点由于调用 setEndBefore()
已经改变了，结果是 range1 的终点位于 range2 的终点后面（见图 12-10），因此第二次比较返回 1 。
```

**7.复制 DOM 范围**

```
可以使用 cloneRange() 方法复制范围。这个方法会创建调用它的范围的一个副本。
var newRange = range.cloneRange();
新创建的范围与原来的范围包含相同的属性，而修改它的端点不会影响原来的范围。
```

**8.清理 DOM 范围**

```
在使用完范围之后，最好是调用 detach() 方法，以便从创建范围的文档中分离出该范围。调用
detach() 之后，就可以放心地解除对范围的引用，从而让垃圾回收机制回收其内存了。来看下面的
例子。
range.detach(); //从文档中分离
range = null; //解除引用
在使用范围的最后再执行这两个步骤是我们推荐的方式。一旦分离范围，就不能再恢复使用了
```

## 小结

**"DOM2 级样式" 模块主要针对操作元素的样式信息而开发**

- 每个元素都有一个关联的 style 对象，可以用来确定和修改行内的样式。
- 要确定某个元素的计算样式（包括应用给它的所有 CSS 规则），可以使用 getComputedStyle()方法。
- IE 不支持 getComputedStyle() 方法，但为所有元素都提供了能够返回相同信息 currentStyle 属性。
- 可以通过 document.styleSheets 集合访问样式表。

**“DOM2 级遍历和范围”模块提供了与 DOM 结构交互的不同方式**

- 遍历即使用 NodeIterator 或 TreeWalker 对 DOM 执行深度优先的遍历。
- NodeIterator 是一个简单的接口，只允许以一个节点的步幅前后移动。而 TreeWalker 在提供相同功能的同时，还支持在 DOM 结构的各个方向上移动，包括父节点、同辈节点和子节点等方向。
- 范围是选择 DOM 结构中特定部分，然后再执行相应操作的一种手段。
- 使用范围选区可以在删除文档中某些部分的同时，保持文档结构的格式良好，或者复制文档中的相应部分。
