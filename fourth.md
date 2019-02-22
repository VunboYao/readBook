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
canplaythrough|播放可继续，而且应该不会中断；readyState值为3
canshowcurrentframe|当前帧已经下载完成；readyState值为1
dataunavailable|因为没有数据而不能播放；readyState值为0
durationchange|duration属性的值改变
emptied|网络连接关闭
empty|发生错误阻止了媒体下载
ended|媒体已播放到末尾，播放停止
error|下载期间发生网络错误
load|所有媒体已加载完成。这个事件可能会被放弃，建议使用canplaythrough
loadeddata|媒体的第一帧已加载完成
loadedmetadata|媒体的元数据已加载完成
loadstart|下载已开始
pause|播放已暂停
play|媒体已接收到指令开始播放
playing|媒体已实际开始播放
progress|正在下载
ratechange|播放媒体的速度改变
seeked|搜索结束
seeking|正移动到新位置
stalled|浏览器尝试下载，但未接收到数据
timeupdate|currentTime被以不合理或意外的方式更新
volumechange|volume属性值或muted属性值已改变
waiting|播放暂停，等待下载更多数据
element.requestFullScreen()|全屏显示
document.exitFullScreen()|退出全屏模式

### 自定义媒体播放器

```
<div class="mediaplayer">
    <div class="video">
        <video src="./assets/mp4.mp4" poster="images/timg.jpg" id="player">Video player not available</video>
    </div>
    <div class="controls">
        <input type="button" value="Play" id="video-btn">
        <span id="curtime">0</span>/<span id="duration">0</span>
        <input type="button" value="rate2" id="rate2">
        <input type="button" value="rate3" id="rate3">
        <input type="button" value="fullScreen" id="fullScreen">
    </div>
</div>

/*播放时间格式化*/
function formatTime(time) {
    // 设定初始时间
    let minute = 0,
        seconds = 0;
    minute = parseInt(time / 60); // 求余获取分数整数
    seconds = parseInt(time % 60); // 秒数

    // 时间格式补全--00：00
    // 转换成字符串再使用ES6语法补全
    let strMinute = minute.toString().padStart(2, '0');
    let strSec = seconds.toString().padStart(2, '0');
    return `${strMinute}:${strSec}`;
} 

window.onload = function () {
    let player = document.getElementById('player'),
        btn = document.getElementById('video-btn'),
        curtime = document.getElementById('curtime'),
        rate2 = document.getElementById('rate2'),
        rate3 = document.getElementById('rate3'),
        fullScreen = document.getElementById('fullScreen'),
        setInterval1,
        duration = document.getElementById('duration');

    btn.addEventListener('click', function (e) {
        if (player.paused) {
            player.play();
            btn.value = 'Pause';
        } else {
            player.pause();
            btn.value = 'Play';
            // 暂停时清楚获取播放时间的定时器
            clearInterval(setInterval1);
        }
    })

    // 2倍速率
    rate2.addEventListener('click', function () {
        player.playbackRate = 2;
    })

    // 3倍速率
    rate3.addEventListener('click', function () {
        player.playbackRate = 3;
    })

    // 全屏
    fullScreen.addEventListener('click', function () {
        player.requestFullscreen();
    })

    // 初始化时显示当前播放时间00：00
    curtime.innerHTML = formatTime(player.currentTime);

    /* 初始化时，定时器获取总播放时间 */
    setTimeout(function () {
        duration.innerHTML = formatTime(player.duration);
    },100);

    // 监听播放时，获取当前播放时间。
    player.addEventListener('playing', function (e) {
        setInterval1 = setInterval(function () {
            curtime.innerHTML = formatTime(player.currentTime);
        },250);
    })
}
```

### 检测编解码器的支持情况

canPlayType() 方法，该方法接收一种格式/编解码器字符串，返回"probably" 、 "maybe" 或 "" （ 空字符串）。空字符串是假值

```
if (audio.canPlayType("audio/mpeg")){
    //进一步处理
} 
```
音频|字符串|
---|---
AAC|audio/mp4; codecs="mp4a.40.2"
MP3|audio/mpeg
Vorbis|audio/ogg; codecs='vorbis'
WAV|audio/wav;codecs='1'

视频|字符串
---|---
H.264|video/mp4;codecs="avc1.42E01E,mp4a.40.2"
Theora|video/ogg; codecs="theora"
WebM|video/webm; codecs="vp8, vorbis"

### Audio类型

<audio\> 元素还有一个原生的 JavaScript 构造函数 Audio ，可以在任何时候播放音频。从同为 DOM 元素的角度看， Audio 与 Image 很相似，但 Audio 不用像 Image 那样必须插入到文档中。只要创建一个新实例，并传入音频源文件即可
```
var audio = new Audio('./assets/kiro.mp3')
// canplaythrough 播放可继续
audio.addEventListener('canplaythrough', function (e) {
    audio.play();
}) 
```

## 历史状态管理

HTML5 通过更新 history 对象为管理历史状态提供了方便。通过 hashchange 事件，可以知道 URL 的参数什么时候发生了变化，即什么时候该有所反应。而通过状态管理 API，能够在不加载新页面的情况下改变浏览器的 URL。

**history.pushState() 方法，该方法可以接收三个参数：状态对象、新状态的标题和可选的相对 URL。**

```
history.pushState({name:"Nicholas"}, "Nicholas' page", "nicholas.html"); 
```
- 执行 pushState() 方法后，新的状态信息就会被加入历史状态栈，而浏览器地址栏也会变成新的相对 URL。
- 浏览器并不会真的向服务器发送请求，即使状态改变之后查询 location.href 也会返回与地址栏中相同的地址
- 第二个参数目前还没有浏览器实现，因此完全可以只传入一个空字符串，或者一个短标题也可以。而第一个参数则应该尽可能提供初始化页面状态所需的各种信息
- 确保使用 pushState() 创造的每一个“假”URL，在 Web 服务器上都有一个真的、实际存在的 URL 与之对应。否则，单击“刷新”按钮会导致 404 错误

因为 pushState() 会创建新的历史状态，所以你会发现“后退”按钮也能使用了。按下“后退”按钮，会触发 window 对象的 popstate 事件（popstate 事件发生后，事件对象中的状态对象（event.state）是当前状态）。popstate事件的事件对象有一个 state 属性，这个属性就包含着当初以第一个参数传递给 pushState() 的状态对象

```
window.addEventListener('popstate', function (e) {
    let state = e.state;
    if (state) {
        console.log(state);
    }
}) 
```
得到这个状态对象后，必须把页面重置为状态对象中的数据表示的状态（因为浏览器不会自动为你做这些）。记住，浏览器加载的第一个页面没有状态，因此单击“后退”按钮返回浏览器加载的第一个页面时， event.state 值为 null 。此时history.state为 null.

要更新当前状态，可以调用 replaceState() ，传入的参数与 pushState() 的前两个参数相同。调用这个方法不会在历史状态栈中创建新状态，只会重写当前状态。

```
history.replaceState({name:"Greg"}, "Greg's page");
history.state查询时，为 {name:"Greg"}，没有历史状态
```

# 第17章：错误处理与调试

## 错误处理

### try-catch

```
try {
    // 可能会导致错误的代码
} catch (error) {
    // 在错误发生时怎么处理
} 
```
- 也就是说，我们应该把所有可能会抛出错误的代码都放在 try 语句块中，而把那些用于错误处理的代码放在 catch 块中.
- 如果 try 块中的任何代码发生了错误，就会立即退出代码执行过程，然后接着执行 catch 块。此时， catch 块会接收到一个包含错误信息的对象
- 与在其他语言中不同的是，即使你不想使用这个错误对象，也要给它起个名字。
- 这个对象中包含的实际信息会因浏览器而异，但共同的是有一个保存着错误消息的 message 属性。ECMA-262 还规定了一个保存错误类型的 name 属性；当前所有浏览器都支持这个属性

```
try {
    window.someNonexistentFunction();
} catch (error){
    alert(error.message);
} 
```

**1.finally 子句**

虽然在 try-catch 语句中是可选的，但 finally 子句一经使用，其代码无论如何都会执行。 try 语句块中的代码全部正常执行， finally 子句会执行；如果因为出错而执行了 catch 语句块， finally 子句照样还会执行。只要代码中包含 finally 子句，则无论 try 或 catch 语句块中包含什么代码——甚至 return 语句，都不会阻止 finally 子句的执行。

```
function testFinally() {
    try {
        return 2;
    } catch (error) {
        return 1;
    } finally {
        return 0;
    }
} 
// 这个函数在 try-catch 语句的每一部分都放了一条 return 语句。表面上看，调用这个函数会返
   回 2，因为返回 2 的 return 语句位于 try 语句块中，而执行该语句又不会出错。可是，由于最后还有
   一个 finally 子句，结果就会导致该 return 语句被忽略；也就是说，调用这个函数只能返回 0。如果
   把 finally 子句拿掉，这个函数将返回 2。
```
- 如果提供 finally 子句，则 catch 子句就成了可选的（ catch 或 finally 有一个即可）
- 只要代码中包含 finally 子句，那么无论 try 还是 catch 语句块中的 return 语句都将被忽略。因此，在使用 finally 子句之前，一定要非常清楚你想让代码怎么样。

**2.错误类型**

执行代码期间可能会发生的错误有多种类型。每种错误都有对应的错误类型，而当错误发生时，就会抛出相应类型的错误对象。ECMA-262 定义了下列 7 种错误类型：
- ERROR
- EvalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

- 其中， Error 是基类型，其他错误类型都继承自该类型。因此，所有错误类型共享了一组相同的属性（错误对象中的方法全是默认的对象方法）。 Error 类型的错误很少见，如果有也是浏览器抛出的；这个基类型的主要目的是供开发人员抛出自定义错误。
- EvalError 类型的错误会在使用 eval() 函数而发生异常时被抛出.如果没有把 eval() 当成函数调用，就会抛出错误
    ```
     new eval(); //抛出 EvalError
     eval = foo; //抛出 EvalError
    ```
- RangeError 类型的错误会在数值超出相应范围时触发.
- 在找不到对象的情况下，会发生 ReferenceError （这种情况下，会直接导致人所共知的 "object expected" 浏览器错误）。通常，在访问不存在的变量时，就会发生这种错误，例如：
    ```
     var obj = x; //在 x 并未声明的情况下抛出 ReferenceError
    ```
- 至于 SyntaxError ，当我们把语法错误的 JavaScript 字符串传入 eval() 函数时，就会导致此类错误。
    ```eval("a ++ b"); //抛出 SyntaxError```如果语法错误的代码出现在 eval() 函数之外，则不太可能使用 SyntaxError ，因为此时的语法错误会导致 JavaScript 代码立即停止执行。
- TypeError 类型在 JavaScript 中会经常用到，在变量中保存着意外的类型时，或者在访问不存在的
  方法时，都会导致这种错误。最常发生类型错误的情况，就是传递给函数的参数事先未经检查，结果传入类型与预期类型不相符。
- 在使用 encodeURI() 或 decodeURI() ，而 URI 格式不正确时，就会导致 URIError 错误。这种错误也很少见，因为前面说的这两个函数的容错性非常高。

> 利用不同的错误类型，可以获悉更多有关异常的信息，从而有助于对错误作出恰当的处理。要想知道错误的类型，可以像下面这样在 try-catch 语句的 catch 语句中使用 instanceof 操作符

```
try {
    someFunction();
} catch (error){
    if (error instanceof TypeError){
// 处理类型错误
    } else if (error instanceof ReferenceError){
// 处理引用错误
    } else {
// 处理其他类型的错误
    }
} 
```

**3.合理使用 try-catch**

> 使用 try-catch 最适合处理那些我们无法控制的错误。假设你在使用一个大型 JavaScript 库中的
函数，该函数可能会有意无意地抛出一些错误。由于我们不能修改这个库的源代码，所以大可将对该函
数的调用放在 try-catch 语句当中，万一有什么错误发生，也好恰当地处理它们。
*在明明白白地知道自己的代码会发生错误时，再使用 try-catch 语句就不太合适了*

### 抛出错误

与 try-catch 语句相配的还有一个 throw 操作符，用于随时抛出自定义错误。抛出错误时，必须要给 throw 操作符指定一个值，这个值是什么类型，没有要求。下列代码都是有效的。

```
throw 12345;
throw "Hello world!";
throw true;
throw { name: "JavaScript"}; 
```
在遇到 throw 操作符时，代码会立即停止执行。仅当有 try-catch 语句捕获到被抛出的值时，代码才会继续执行

通过使用某种内置错误类型，可以更真实地模拟浏览器错误。每种错误类型的构造函数接收一个参数，即实际的错误消息。下面是一个例子。

```
 throw new Error("Something bad happened.");
 这行代码抛出了一个通用错误，带有一条自定义错误消息。浏览器会像处理自己生成的错误一样，
 来处理这行代码抛出的错误。换句话说，浏览器会以常规方式报告这一错误，并且会显示这里的自定义
 错误消息。
 
 像下面使用其他错误类型，也可以模拟出类似的浏览器错误。
 throw new SyntaxError("I don’t like your syntax.");
 throw new TypeError("What type of variable do you take me for?");
 throw new RangeError("Sorry, you just don’t have the range.");
 throw new EvalError("That doesn’t evaluate.");
 throw new URIError("Uri, is that you?");
 throw new ReferenceError("You didn’t cite your references properly.");
```

利用原型链还可以通过继承 Error 来创建自定义错误类型.此时，需要为新创建的错误类型指定 name 和 message 属性

```
function CustomError(message) {
    this.name = 'CustomError'
    this.message = message;
}
CustomError.prototype = new Error();
throw new CustomError('My message'); 
```
浏览器对待继承自 Error 的自定义错误类型，就像对待其他错误类型一样。如果要捕获自己抛出
的错误并且把它与浏览器错误区别对待的话，创建自定义错误是很有用的

**1.抛出错误的时机**

如果执行这个函数时传给它一个字符串参数，那么对 sort() 的调用就会失败。对此，不同浏览器会给出不同的错误消息，但都不是特别明确

```
function process(values) {
    values.sort();
    for (let i = 0; i < values.length; i++) {
        if (values[i] > 100) {
            return values[i];
        }
    }
    return -1;
} 
```

在面对包含数千行 JavaScript 代码的复杂的 Web 应用程序时，要想查找错误来源就没有那么容易了。这种情况下，带有适当信息的自定义错误能够显著提升代码的可维护性。

```
function process(values) {

    // 自定义错误类型
    if (!(values instanceof Array)) {
        throw new Error('process(): Argument must be an array.');
    }

    values.sort();
    for (let i = 0; i < values.length; i++) {
        if (values[i] > 100) {
            return values[i];
        }
    }
    return -1;

} 
在重写后的这个函数中，如果 values 参数不是数组，就会抛出一个错误。错误消息中包含了函数
的名称，以及为什么会发生错误的明确描述。如果一个复杂的 Web 应用程序发生了这个错误，那么查
找问题的根源也就容易多了。
建议读者在开发 JavaScript 代码的过程中，重点关注函数和可能导致函数执行失败的因素。良好的
错误处理机制应该可以确保代码中只发生你自己抛出的错误。
```

**2.抛出错误与使用 try-catch**

> 关于何时该抛出错误，而何时该使用 try-catch 来捕获它们，是一个老生常谈的问题。一般来说，应用程序架构的较低层次中经常会抛出错误，但这个层次并不会影响当前执行的代码，因而错误通常得不到真正的处理。如果你打算编写一个要在很多应用程序中使用的 JavaScript 库，甚至只编写一个可能会在应用程序内部多个地方使用的辅助函数，我都强烈建议你在抛出错误时提供详尽的信息。然后，即可在应用程序中捕获并适当地处理这些错误。说到抛出错误与捕获错误，我们认为只应该捕获那些你确切地知道该如何处理的错误。捕获错误的目的在于避免浏览器以默认方式处理它们；而抛出错误的目的在于提供错误发生具体原因的消息。







