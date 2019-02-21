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

作为开发人员，你也可以在 dragstart 事件处理程序中调用 setData() ，手工保存自己要传输的数据，以便将来使用。

将数据保存为文本和保存为 URL 是有区别的。如果将数据保存为文本格式，那么数据不会得到任何特殊处理。而如果将数据保存为 URL，浏览器会将其当成网页中的链接。换句话说，如果你把它放置
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

## 媒体元素

* 视频标签video
* 音频标签audio

```
<video src="./assets/mp4.mp4" id="myVideo" controls poster="images/timg.jpg">Video player not available.</video> 
// 默认状态下，不添加controls属性，音频标签隐藏不显示
<audio src="./assets/next.mp3" id="myAudio" controls>Audio player not available.</audio>
```
其他属性：
- 可以设置 width 和 height 属性以指定视频播放器的大小，为**poster**属性指定图像的 URI 可以在加载视频内容期间显示一幅图像
- 位于开始和结束标签之间的任何内容都将作为后备内容，在浏览器不支持这两个媒体元素的情况下显示

因为并非所有浏览器都支持所有媒体格式，所以可以指定多个不同的媒体来源。为此，不用在标签
中指定 src 属性，而是要像下面这样使用一或多个 <source> 元素。

```
<!-- 嵌入视频 -->
<video id="myVideo">
    <source src="conference.webm" type="video/webm; codecs='vp8, vorbis'">
    <source src="conference.ogv" type="video/ogg; codecs='theora, vorbis'">
    <source src="conference.mpg">
    Video player not available.
</video>
<!-- 嵌入音频 -->
<audio id="myAudio">
    <source src="song.ogg" type="audio/ogg">
    <source src="song.mp3" type="audio/mpeg">
    Audio player not available.
</audio> 
```

### H5相关属性：

- autoplay，自动播放。当不能播放时，浏览器屏蔽。添加muted可播放。
- controls，出现该属性，则向用户显示控件，比如播放按钮。
- height，设置视频播放器的高度。**video没有该属性**
- loop，循环播放
- muted，静音播放
- poster, 海报，播放前显示图片。**video没有该属性**
- preload，如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性。
- src，url,播放视频的url
- width,设置视频播放器的宽度。**video没有该属性**

### 属性

<video\> 和 <audio\> 元素都提供了完善的 JavaScript 接口

属性|数据类型|说明
---|---|---
autoplay|布尔值|取得或设置autoplay标志
buffered|事件范围|表示已下载的缓冲的事件范围的对象
bufferedBytes|字节范围|表示已下载的缓冲的字节范围的对象
bufferingRate|整数|下载过程中每秒钟平均接受到的位数
bufferingThrottled|布尔值|表示浏览器是否对缓冲进行了节流
controls|布尔值|取得或设置controls属性，用于显示或隐藏浏览器内置的控件
currentLoop|整数|媒体已经循环的次数
currentSrc|字符串|当前播放的媒体文件的URL
currentTime|浮点数|已经播放的秒数
defaultPlaybackRate|浮点数|取得或设置默认的播放速度。默认值为1.0秒
duration|浮点数|媒体的总播放时间（秒数）
ended|布尔值|表示媒体文件是否播放完成
loop|布尔值|取得或设置媒体文件在播放完成后是否再从头开始播放
muted|布尔值|取得或设置媒体文件是否静音
networkState|整数|表示当前媒体的网络链接状态：0表示空，1正在加载，2正在加载元数据，3已经加载了第一帧，4加载完成
paused|布尔值|表示播放器是否暂停
playbackRate|浮点数|取得或设置当前的播放速度。用户可以改变这个值，让媒体速度变快或者变慢，这与defaultPlaybackRate只能由开发人员修改的defaultPlaybackRate不同
played|时间范围|到目前为止已经播放的时间范围
readyState|整数|表示媒体是否已经就绪（可以播放了）。0数据不可用，1可以显示当前帧，2可以开始播放，3媒体可以从头到尾播放
seekable|时间范围|可以搜索的时间范围
seeking|布尔值|表示播放器是否正移动到媒体文件中新位置
src|字符串|每天文件的来源。任何时候都可以重写这个属性。
start|浮点数|取得或设置媒体文件中开始播放位置，以秒表示
totalBytes|整数|当前资源所需的总字节数
videoHeight|整数|返回视频（不一定是元素）的高度。只适用于video
videoWidth|整数|返回视频（不一定是元素）的宽度。只适用于video
volume|浮点数|取得或设置当前音量，值为0.0到1.0

> 很多属性也可以直接在 <audio> 和 <video> 元素中设置。

### 事件

事件|触发时机
---|---
abort|下载中断
canplay|可以播放时；readyState值为2
canplaythrough|播放可继续，而且应该不会终端；readyState值为3
canshowcurrentframe|当前帧已经下载完成；readyState值为1
dataunavailable|因为没有数据而不能播放；readyState值为0
durationchange|duration属性的值改变
emptied|网络连接关闭
empty|发生错误阻止了媒体下载
ended|媒体已播放到末尾，播放停止


