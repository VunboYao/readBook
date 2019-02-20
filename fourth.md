# 第16章：HTML5脚本编程

## 跨文档消息传递

**跨文档消息传送**（cross-document messaging），有时候简称为 XDM，指的是在来自不同域的页面间传递消息。
- XDM 的核心是 postMessage() 方法。向另一个地方传递数据。对于 XDM 而言，“另一个地方”指的是包含在当前页面中的 <iframe\> 元素，或者由当前页面弹出的窗口
- postMessage() 方法接收两个参数：一条消息和一个表示消息接收方来自哪个域的字符串。第二个参数对保障安全通信非常重要，可以防止浏览器把消息发送到不安全的地方。
    ```
    //注意：所有支持 XDM 的浏览器也支持 iframe 的 contentWindow 属性
    var iframeWindow = document.getElementById("myframe").contentWindow;
    iframeWindow.postMessage("A secret", "http://www.wrox.com"); 
    ```
接收到 XDM 消息时，会触发 window 对象的 message 事件。这个事件是以异步形式触发的，因此
从发送消息到接收消息（触发接收窗口的 message 事件）可能要经过一段时间的延迟。触发 message
事件后，传递给 onmessage 处理程序的事件对象包含以下三方面的重要信息。
- data: 作为 postMessage() 第一个参数传入的字符串数据    
- origin ：发送消息的文档所在的域，例如 "http://www.wrox.com" 。
- source ：发送消息的文档的 window 对象的代理。这个代理对象主要用于在发送上一条消息的
  窗口中调用 postMessage() 方法。如果发送消息的窗口来自同一个域，那这个对象就是
  window 。

接收到消息后验证发送窗口的来源是至关重要的。就像给 postMessage() 方法指定第二个参数，
以确保浏览器不会把消息发送给未知页面一样，在 onmessage 处理程序中检测消息来源可以确保传入
的消息来自已知的页面。基本的检测模式如下。
```
window.addEventListener('message', function (e) {
    // 确保发送消息的域是已知的域
    if (e.origin === 'http://localhost:63342') {
        // 处理接收到的数据
        processMessage(e.data);
        
        // 可选：向来源窗口发送回执
        e.source.postMessage("Received!", "http://localhost:63342");
    }
}) 
```

## 原生拖放

### 拖放事件

拖动元素时，依次触发下列事件：
1. dragstart
2. drag
3. dragend
按下鼠标并开始移动鼠标时，会触发dragstart事件，然后会触发drag事件，当拖动停止（无论是把元素放到了有效的放置目标，还是放到了无效的放置目标上），会触发dragend事件。

上述三个事件的目标都是被拖动的元素。默认情况下，浏览器不会在拖动期间改变被拖动元素的外观，但你可以自己修改。不过，大多数浏览器会为正被拖动的元素创建一个半透明的副本，这个副本始终跟随着光标移动。

当某个元素被拖动到一个有效的放置目标上时，下列事件会依次发生。
1. dragenter
2. dragover
3. dragleave 或 drop

只要有元素被拖动到放置目标上，就会触发 dragenter 事件（类似于 mouseover 事件）。紧随其
后的是 dragover 事件，而且在被拖动的元素还在放置目标的范围内移动时，就会持续触发该事件。如
果元素被拖出了放置目标， dragover 事件不再发生，但会触发 dragleave 事件（类似于 mouseout
事件）。如果元素被放到了放置目标中，则会触发 drop 事件而不是 dragleave 事件。上述三个事件的
目标都是作为放置目标的元素。

### 自定义放置目标

经过无效的放置目标时，可以看到一种特殊的光标，表示不能放置。重写dragenter和dragover事件的默认行为，可以把任何元素变成有效的放置目标。

```
document.getElementById('myframe').addEventListener('dragover', function (e) {
    e.preventDefault();
})
document.getElementById('myframe').addEventListener('dragenter', function (e) {
    e.preventDefault();
})
```
在FireFox3.5+中，拖放文件，会导致无效的URL错误。因此，为了让FireFox支持正常的拖放，还要取消drop事件的默认行为，阻止它打开URL。

### dataTransfer对象

dataTransfer对象是事件对象的一个属性，用于从被拖动元素向放置目标传递字符串格式的数据。
- dataTransfer 对象有两个主要方法： getData() 和 setData() 
- setData() 方法的第一个参数，也是 getData() 方法唯一的一个参数，是一个字符串，表示保存的数据类型，取值为 "text" 或 "URL"
    ```
    //设置和接收文本数据
    event.dataTransfer.setData("text", "some text");
    var text = event.dataTransfer.getData("text");
    //设置和接收 URL
    event.dataTransfer.setData("URL", "http://www.wrox.com/");
    var url = event.dataTransfer.getData("URL"); 
    ```
- 考虑到向后兼容，HTML5 也支持 "text" 和 "URL" ，但这两种类型会被映射为 "text/plain" 和"text/uri-list" 。

    在拖动文本框中的文本时，浏览器会调用 setData() 方法，将拖动的文本以 "text" 格式保存在
dataTransfer 对象中。类似地，在拖放链接或图像时，会调用 setData() 方法并保存 URL。然后，
在这些元素被拖放到放置目标时，就可以通过 getData() 读到这些数据。当然，作为开发人员，你也
可以在 dragstart 事件处理程序中调用 setData() ，手工保存自己要传输的数据，以便将来使用。

    将数据保存为文本和保存为 URL 是有区别的。如果将数据保存为文本格式，那么数据不会得到任
何特殊处理。而如果将数据保存为 URL，浏览器会将其当成网页中的链接。换句话说，如果你把它放置
到另一个浏览器窗口中，浏览器就会打开该 URL。

### dropEffect 与 effectAllowed

> 通过访问 dataTransfer 对象的两个属性：dropEffect 和 effectAllowed 可以确定被拖动元素以及作为放置目标能够接收什么操作。

其中，通过 dropEffect 属性可以知道被拖动的元素能够执行哪种放置行为。这个属性有下列4个可能的值。
- "none" ：不能把拖动的元素放在这里。这是除文本框之外所有元素的默认值。
- "move" ：应该把拖动的元素移动到放置目标。
- "copy" ：应该把拖动的元素复制到放置目标。
- "link" ：表示放置目标会打开拖动的元素（但拖动的元素必须是一个链接，有 URL）。

**浏览器只能改变光标的样式，其他的需要自己实现。使用dropEffect属性，必须在ondragenter事件处理程序中针对放置目标来设置**

dropEffect 属性只有搭配 effectAllowed 属性才有用。 effectAllowed 属性表示允许拖动元素的哪种 dropEffect ， effectAllowed 属性可能的值如下。
- "uninitialized" ：没有给被拖动的元素设置任何放置行为。
- "none" ：被拖动的元素不能有任何行为。
- "copy" ：只允许值为 "copy" 的 dropEffect 。
- "link" ：只允许值为 "link" 的 dropEffect 。
- "move" ：只允许值为 "move" 的 dropEffect 。
- "copyLink" ：允许值为 "copy" 和 "link" 的 dropEffect 。
- "copyMove" ：允许值为 "copy" 和 "move" 的 dropEffect 。
- "linkMove" ：允许值为 "link" 和 "move" 的 dropEffect 。
- "all" ：允许任意 dropEffect 。

**必须在 ondragstart 事件处理程序中设置 effectAllowed 属性。**

### 可拖动

图像、链接、文本默认是可以拖动的。图像和链接的 draggable 属性自动被设置成了 true，而其他元素这个属性的默认值都是 false 。

### 其他成员

HTML5 规范规定 dataTransfer 对象还应该包含下列方法和属性。
- addElement(element) ：为拖动操作添加一个元素。添加这个元素只影响数据（即增加作为拖动源而响应回调的对象），不会影响拖动操作时页面元素的外观
- clearData(format) ：清除以特定格式保存的数据。
- setDragImage(element, x, y) ：指定一幅图像，当拖动发生时，显示在光标下方。这个方法接收的三个参数分别是：HTML元素和光标在图像中的x,y坐标。其中，HTML元素可以是一副图像，也可以是其他元素。
- types: 当前保存的数据类型。这是一个类似数组的集合，以 "text" 这样的字符串形式保存着数据类型。


