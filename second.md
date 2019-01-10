# 第八章：BOM

## window 对象
在浏览器中， window 对象有双重角色，它既是通过 JavaScript访问浏览器窗口的一个接口，又是 ECMAScript 规定的 Global 对象。

### 全局作用域

- 所有在全局作用域中声明的变量、函数都会变成window对象的属性和方法。
- 全局变量不能通过 delete 操作符删除，而直接在 window 对象上定义的属性可以。 
- 因为全局中 var 声明的变量，有一个属性 [[Configurable]] 的特性，这个特性的值被设置为 false, 因此不能通过 delete 操作符删除。
- 通过 window 对象，可以查询某个未声明的变量是否存在。不会报错，返回 undefined

### 窗口位置

- window.screenLeft 表示窗口相对于屏幕左边的位置 === window.screenX
- window.screenTop 表示窗口相对于屏幕上边的位置 === window.screenY

> 使用 moveTo()和 moveBy() 方法倒是有可能将窗口精确地移动到一个新位置。这两个方法都接收两个参数，其中moveTo() 接收的是新位置的 x 和 y 坐标值，而 moveBy() 接收的是在水平和垂直方向上移动的像素数。这两个方法可能会被浏览器禁用

### 窗口大小

- innerHeight 表示页面视图区的高度
- innerWidth 表示页面视图区的宽度
- outerWidth 和 outerHeight 返回浏览器窗口本身的尺寸
- 获取页面视口的信息
    - document.documentElement.clientHeight / clientWidth
    - document.body.clientHeight / clientWidth  **(IE中可用，chrome中不可用)**

> 使用 resizeTo() 和 resizeBy() 方法可以调整浏览器窗口的大小。这两个方法都接收两个参数，其中 resizeTo() 接收浏览器窗口的新宽度和新高度，而 resizeBy() 接收新窗口与原窗口的宽度和高度之差。这两个方法可能会被浏览器禁用

### 导航和打开窗口

- window.open(),这个方法接收四个参数：要加载的URL、窗口目标、一个特性字符串以及一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值。通常只须传递第一个参数，最后一个参数只在不打开新窗口的情况下使用。
- 如果传递第2个参数，而且该参数是已有窗口或框架的名称，那么就会在具有**该名称的窗口或框架中**加载第一个参数指定的 URL。

```
<iframe name="topFrame" height="100px" width="100px"></iframe>
//等同于< a href="http://www.wrox.com" target="topFrame"></a>
window.open('https://www.baidu.com/',"topFrame");
```
**1.弹出窗口**

> 如果给 window.open() 传递的第二个参数并不是一个已经存在的窗口或框架，那么该方法就会根
据在第三个参数位置上传入的字符串创建一个新窗口或新标签页。如果没有传入第三个参数，那么就会
打开一个带有全部默认设置（工具栏、地址栏和状态栏等）的新浏览器窗口（或者打开一个新标签页—
—根据浏览器设置）。在不打开新窗口的情况下，会忽略第三个参数。**第三个参数是一个逗号分隔的设置字符串，表示在新窗口中都显示哪些特性。**

设置|值|说明
---|---|---|
fullscreen|yes/no|表示浏览器窗口是否最大化。仅限IE
height|数值|表示新窗口的高度。
width|数值|表示新窗口的宽度。
left|数值| 表示新窗口的左坐标。不能是负值
location|yes/no |表示是否在浏览器窗口中显示地址栏。不同浏览器的默认值不同。如果设置为no，地址栏可能会隐藏，也可能会被禁用（取决于浏览器）
menubar|yes/no|表示是否在浏览器窗口中显示菜单栏。默认值为 no
resizable|yes/no|表示是否可以通过拖动浏览器窗口的边框改变其大小。默认值为 no
scrollbars|yes/no|表示如果内容在视口中显示不下，是否允许滚动。默认值为 no
status|yes/no|表示是否在浏览器窗口中显示状态栏。默认值为 no
toolbar|yes/no|表示是否在浏览器窗口中显示工具栏。默认值为 no
top|数值|表示新窗口的上坐标。不能是负值

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
- 调用定时器会返回一个ID，该ID可以用来取消定时器。clearTimeout()/ clearInterval()
- 很少使用真正的间歇调用，原因是后一个间歇调用可能会在前一个间歇调用结束之前启动。所以，最好不要使用间歇调用。

### 系统对话框

- 通过 alert() 、 confirm() 和 prompt() 方法可以调用系统对话框向用户显示消息。
- 通过这几个方法打开的对话框都是同步和模态的。也就是说，显示这些对话框的时候代码会停止执行，而关掉这些对话框后代码又会恢复执行。
- confirm("Are you sure?"),取消/确认，返回布尔值。
    ```
    let a = confirm('Are you sure?');
    if (a) {
        alert('I am so glad you re sure！ ')
    } else {
        alert('I am sorry to hear you are not sure!')
    } 
    ```
- prompt()方法接受两个参数：要显示给用户的文本提示和文本输入域的默认值（可以是一个空字符串）
    - 如果用户单击了OK，返回数入的值。
    - 如果选择了Cancel或其他方式关闭了对话框，该方法返回null
- window.print(),显示打印对话框

## location 对象

location 是最有用的 BOM对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上， location 对象是很特别的一个对象，因为它既是 window 对象的属性，也是document 对象的属性；换句话说， window.location 和 document.location 引用的是同一个对象。

属性名|例子|说明
---|---|---
hash|"#contents"|返回URL中的hash（#号后跟零或多个字符），如果URL中不包含散列，则返回空字符串
host|"www.wrox.com:80"|返回服务器名称和端口号（如果有）
hostname|"www.wrox.com"|返回不带端口号的服务器名称
href|"http:/www.wrox.com"|返回当前加载页面的完整URL。而location对象的toString()方法也返回这个值
pathname|"/WileyCDA/"|返回URL中的目录和（或）文件名
port|"8080"|返回URL中指定的端口号。如果URL中不包含端口号，则这个属性返回空字符串
protocol|"http:"|返回页面使用的协议。通常是http:或https:
search|"?q=javascript"|返回URL的查询字符串。这个字符串以问号开头

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

使用location 对象可以通过很多方式来改变浏览器的位置。
- 使用assign()方法为其传递一个URL。`location.assign("http://www.wrox.com");`
- location.href 或 window.location 设置为一个URL值，也会调用 assign() 方法。
    ```
    // 下列两行代码与显式调用 assign() 方法的效果完全一样。
     window.location = "http://www.wrox.com";
     location.href = "http://www.wrox.com";
    ```
- 设置hash, search, hostname, pathname和post属性来改变URL，除了hash属性，都会重新加载页面。
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
- 包含下列属性：
    - name: 插件的名字
    - description: 插件的描述
    - filename： 插件的文件名
    - length: 插件所处理的MIME类型数量
    
    ```
    //检测插件（在 IE 中无效）
    function hasPlugin(name){
    name = name.toLowerCase();
    for (var i=0; i < navigator.plugins.length; i++){
    if (navigator. plugins [i].name.toLowerCase().indexOf(name) > -1){
    return true;
    }
    }
    return false;
    }
    //检测 Flash
    alert(hasPlugin("Flash"));
    //检测 QuickTime
    alert(hasPlugin("QuickTime")); 
    ```
> 每个插件对象本身也是一个 MimeType 对象的数组，这些对象可以通过方括号语
  法来访问。每个 MimeType 对象有 4 个属性：包含 MIME 类型描述的 description 、
  回指插件对象的 enabledPlugin 、表示与 MIME 类型对应的文件扩展名的字符串
  suffixes （以逗号分隔）和表示完整 MIME 类型字符串的 type 。    

> plugins 集合有一个名叫 refresh() 的方法，用于刷新 plugins 以反映最新安
  装的插件。这个方法接收一个参数：表示是否应该重新加载页面的一个布尔值。如果
  将这个值设置为 true ，则会重新加载包含插件的所有页面；否则，只更新 plugins
  集合，不重新加载页面。

## history 对象

- history.go(), 接收一个参数。负数表示向后跳转，整数表示向前跳转。也可以给go()方法传递一个字符串参数。跳转到历史记录中包含该字符的第一个位置。
- 简写 history.back() 后退  和  history.forward()前进。
- history.length，保存历史记录的数量。
    ```
    if (history.length === 1){
    //这应该是用户打开窗口后的第一个页面
    } 
    ```
> 当页面的 URL 改变时，就会生成一条历史记录。这里所说的改变包括 URL 中 hash 的变化（因此，设置 location.hash 会在这些浏览器中生成一条新的历史记录）。

## 小结

浏览器对象模型（BOM）以 window 对象为依托，表示浏览器窗口以及页面可见区域。同时， window
对象还是 ECMAScript 中的 Global 对象，因而所有全局变量和函数都是它的属性，且所有原生的构造
函数及其他函数也都存在于它的命名空间下
- 在使用框架时，每个框架都有自己的 window 对象以及所有原生构造函数及其他函数的副本。每个框架都保存在 frames 集合中，可以通过位置或通过名称来访问。
- 有一些窗口指针，可以用来引用其他框架，包括父框架。
-  top 对象始终指向最外围的框架，也就是整个浏览器窗口
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
    // 搜索字符串 "Android" 并取得紧随其后的版本号。
    let android = /Android (\d+\.\d+)/.test(navigator.userAgent);
    console.log(RegExp.$1); 
    ```
- IOS操作系统检测
    ```
    let iOS = /CPU (?:iPhone )?OS (\d+_\d+)/.test(navigator.userAgent);
    console.log(RegExp.$1); // 11_0
    let system = RegExp.$1.replace('_', '.');
    console.log(system); // 11.0 
    ```

# 第10章：DOM

## 节点层次

### Node类型

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
- 每个节点都有一个childNodes属性，其中保存着一个 NodeList 对象。
- NodeList 是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问它们。
- 可以通过方括号语法来访问 NodeList 的值，也有length 属性，但不是Array的实例。
- 可以通过方括号、也可以使用item()方法。访问保存在NodeList 中的节点。
    ```
    var firstChild = someNode.childNodes[0];
    var secondChild = someNode.childNodes.item(1);
    var count = someNode.childNodes.length; 
    ```
- 对 arguments 对象使用 Array.prototype.slice() 方法可以将其转换为数组
- 每个节点都有一个 parentNode 属性，该属性指向文档树中的父节点
- 在childNodes 列表中的每个节点相互之间都是同胞节点。通过使用列表中每个节点的 previousSibling和 nextSibling 属性，可以访问同一列表中的其他节点。列表中第一个节点的 previousSibling 属性值为 null ，而列表中最后一个节点的 nextSibling 属性的值同样也为 null
- 父节点的 firstChild 和 lastChild属性分别指向其 childNodes 列表中的第一个和最后一个节点。
-  hasChildNodes() 方法在节点包含一或多个子节点的情况下返回true.
- 所有节点都有一个属性 ownerDocument, 该属性指向表示整个文档的文档节点。#document。通过整个属性，可以不必在节点层次中通过层层回溯到达顶端，而是直接访问文档节点。

**3.操作节点** 

- appendChild()添加节点，用于向 childNodes 列表的末尾添加一个节点。返回新增的节点。
- insertBefore()插入节点，该方法接收2个参数：要插入的节点和作为参照的节点。
    - 插入节点后，被插入的节点会变成参照节点的前一个同胞节点（previousSibling），同时被方法返回。
    - 如果参照节点是null,则 insertBefore() 和 appendChild() 执行相同的操作。
- replaceChild()替换节点，该方法接收2个参数：要插入的节点和要替换的节点。
- removeChild()移除一个节点，接收一个参数。
- **以上方法操作的都是某个节点的子节点，使用这几个方法必须先取得父节点(使用 parentNode 属性)**

**4.其他方法**

- cloneNode(),用于创建调用这个方法的节点的一个完全的副本。
    - 接受一个布尔值参数，表示是否执行深复制。参数为true时，执行深复制;为false时，执行浅复制。
    - 复制后返回的节点属于文档所有，但没有为它指定父节点，除非使用以上appendChild() 、 insertBefore() 或 replaceChild()将它添加到文档中，否则是一个“孤儿”。
    ```
     let deepList = a.cloneNode(true)
     console.log(deepList.childNodes.length); // 7
     let shallowList = a.cloneNode(false);
     console.log(shallowList.childNodes.length); // 0
    ```

### Document类型

JavaScript 通过 Document 类型表示文档。在浏览器中， document 对象是 HTMLDocument （继承
自 Document 类型）的一个实例，表示整个 HTML 页面。而且， document 对象是 window 对象的一个
属性，因此可以将其作为全局对象来访问。 Document 节点具有下列特征：
- nodeType 的值为 9；
- nodeName 的值为 "#document" ；
- nodeValue 的值为 null ；
- parentNode 的值为 null ；
- ownerDocument 的值为 null ；
- 其子节点可能是一个 DocumentType （最多一个）、 Element （最多一个）、 ProcessingInstruction或 Comment 。

**1.文档的子节点**
- documentElement属性，该属性始终指向HTML页面中的<html>元素。=== document.childNodes[0] === document.firstChild
- document.body属性，取得对<body>的引用
- document.doctype属性，取得对<!DOCTYPE>的引用

**2.文档信息**
- document.title, 获取当前页面的标题，也可以修改当前的页面标题。
- document.URL, 包含页面完整的URL（即地址栏中显示的URL）
- document.domain，属性中包含页面的域名
- document.referrer，保存着连接到当前页面的那个页面的URL，在没有来源页面的情况下，referrer属性中可能会包含空字符串。
- 只有domain可以设置，但必须是包含的域。
    ```
    //假设页面来自 p2p.wrox.com 域
    document.domain = "wrox.com"; // 成功
    document.domain = "nczonline.net"; // 出错！ 
    ```
- 浏览器对 domain 属性还有一个限制，即如果域名一开始是“松散的”（loose），那么不能将它再设置为“紧绷的”（tight）。换句话说，在将 document.domain 设置为 "wrox.com" 之后，就不能再将其设置回 "p2p.wrox.com" ，否则将会导致错误.    

**3.查找元素**
- getElementById(), 如果不存在相应的ID则返回null
- getElementByTagName(), 返回包含零或多个元素的 NodeList。在HTML中，返回一个HTMLCollection 对象。 可以使用方括号语法或item()来访问，通过length获取元素的数量
- HTMLCollection 对象还有一个方法，叫做 namedItem() ，使用这个方法可以通过元素的 name特性取得集合中的项。
- 在后台，对数值索引就会调用 item() ，而对字符串索引就会调用 namedItem()
- 要想取得文档中的所有元素，可以向 getElementsByTagName() 中传入 "*" 
-  getElementsByName()，会返回带有给定 name 特性的所有元素。最常使用 getElementsByName() 方法的情况是取得单选按钮。对于这里的单选按钮来说， namedItem() 方法则只会取得第一项（因为每一项的 name 特性都相同）。

**4.特殊集合**
- document.anchors, 包含文档中所有带 name 特性的<a>元素
- document.forms, 包含文档中所有的<form>元素，与document.getElementByTagName('form')得到的结果相同
- document.images, 包含文档中所有的<img>元素， 与document.getElementsByTagName("img")得到的结果相同；
- document.links ，包含文档中所有带 href 特性的 <a> 元素。

**5.DOM 一致性检测**























































