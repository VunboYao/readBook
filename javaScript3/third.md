# 第13章：事件

## 事件流

### 事件冒泡

> IE 的事件流叫做事件冒泡（event bubbling），即事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。

### 事件捕获

> Netscape Communicator团队提出的另一种事件流叫做事件捕获（event capturing）。事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。事件捕获的用意在于在事件到达预定目标之前捕获它。

### DOM事件流

> “DOM2级事件”规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。首先发生的是事件捕获，为截获事件提供了机会。然后是实际的目标接收到事件。最后一个阶段是冒泡阶段，可以在这个阶段对事件做出响应。

## 事件处理程序

> 事件就是用户或浏览器自身执行的某种动作。诸如 click 、 load 和 mouseover ，都是事件的名字。而响应某个事件的函数就叫做事件处理程序（或事件侦听器）。事件处理程序的名字以 "on" 开头，因此click事件的事件处理程序就是 onclick ， load 事件的事件处理程序就是 onload 。

### DOM0 级事件处理程序

```
var btn = document.getElementById("myBtn");
btn.onclick = function(){
    alert("Clicked");
}; 
```
> 单击按钮显示的是元素的 ID，这个 ID 是通过 this.id 取得的。不仅仅是 ID，实际上可以在事件处理程序中通过 this 访问元素的任何属性和方法。以这种方式添加的事件处理程序会在事件流的冒泡阶段被处理
> 也可以删除通过DOM0级方法指定的事件处理程序 `btn.onclick = null; // 删除事件处理程序`

### DOM2 级事件处理程序

- “DOM2级事件”定义了两个方法，用于处理指定和删除事件处理程序的操作： addEventListener()和 removeEventListener() 。
- 所有 DOM 节点中都包含这两个方法，并且它们都接受 3 个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。
- 最后这个布尔值参数如果是 true ，表示在捕获阶段调用事件处理程序；如果是 false ，表示在冒泡阶段调用事件处理程序
- **使用 DOM2 级方法添加事件处理程序的主要好处是可以添加多个事件处理程序。**
    - 通过 addEventListener() 添加的事件处理程序只能使用 removeEventListener() 来移除；
    - **移除时传入的参数与添加处理程序时使用的参数相同**。这也意味着通过 addEventListener() 添加的**匿名函数**将无法移除

> 大多数情况下，都是将事件处理程序添加到事件流的冒泡阶段，这样可以最大限度地兼容各种浏览器。最好只在需要在事件到达目标之前截获它的时候将事件处理程序添加到捕获阶段。如果不是特别需要，我们不建议在事件捕获阶段注册事件处理程序

## 事件对象

### DOM中的事件对象

- event 对象
- event 对象包含与创建它的特定事件有关的属性和方法

属性/方法|类型|读/写|说明
---|---|---|---
bubbles|Boolean|只读|表明事件是否冒泡
cancelable|Boolean|只读|表明是否可以取消事件的默认行为
currentTarget|Element|只读|其事件处理程序当前正在处理事件的那个元素
defaultPrevented|Boolean|只读|为true表示已经调用了 preventDefault() （DOM3中新增）
detail|Integer|只读|与事件相关的细节信息
eventPhase|Integer|只读|调用事件处理程序的阶段：1表示捕获阶段，2表示处于目标，3表示冒泡阶段
preventDefault()|Function|只读|取消事件的默认行为。如果cancelable是true,则可以使用这个方法
stopImmediatePropagation()|Function|只读|取消事件的进一步捕获或冒泡，同时阻止任何事件处理程序被调用(DOM3新增)
stopPropagation()|Function|只读|取消事件的进一步捕获或冒泡。如果bubbles为true，则可以使用这个方法
target|Element|只读|事件的目标
trusted|Boolean|只读|为true表示事件是浏览器生成的。为false表示事件是由开发人员通过JS创建的（DOM3中新增）
type|String|只读|被触发的事件的类型
view|AbstractView|只读|与事件关联的抽象试图。等同于发生事件的window对象

- 在事件处理程序内部，对象this始终等于currentTarget的值，而target则只包含事件的实际目标。
- 要阻止特定事件的默认行为，可以使用 preventDefault() 方法。如超链接默认跳转。当cancelable为true,才可以用此方法。
- stopPropagation() 方法用于立即停止事件在DOM层次中的传播，即取消进一步的事件捕获或冒泡。
- 事件对象的 eventPhase 属性，可以用来确定事件当前正位于事件流的哪个阶段。

> 只有在事件处理程序执行期间， event 对象才会存在；一旦事件处理程序执行完成， event 对象就会被销毁。

### IE中的事件对象

- 在使用 DOM0 级方法添加事件处理程序时， event 对象作为 window 对象的一个属性存在。
- srcElement 事件目标，与DOM中的target属性相同
- returnValue，默认为true,将其设置为false可以取消事件的默认行为（与DOM中的preventDefault()方法相同）
- cancelBubble 属性与 DOM 中的 stopPropagation() 方法作用相同

## 事件类型

- UI（User Interface，用户界面）事件，当用户与页面上的元素交互时触发；
- 焦点事件，当元素获得或失去焦点时触发；
- 鼠标事件，当用户通过鼠标在页面上执行操作时触发；
- 滚轮事件，当使用鼠标滚轮（或类似设备）时触发；
- 文本事件，当在文档中输入文本时触发；
- 键盘事件，当用户通过键盘在页面上执行操作时触发；
- 合成事件，当为 IME（Input Method Editor，输入法编辑器）输入字符时触发；
- 变动（mutation）事件，当底层 DOM 结构发生变化时触发。

### UI事件

UI 事件指的是那些不一定与用户操作有关的事件。这些事件在 DOM 规范出现之前，都是以这种或那种形式存在的，而在 DOM规范中保留是为了向后兼容
- load: 当页面完全加载后在window上面触发，当所有框架都加载完毕时在框架集上面触发，当图像加载完毕时在<img\>元素上面触发，或者当嵌入的内容加载完毕时在<object\>元素上面触发。
- unload: 当页面完全卸载后在window上面触发，当所有框架都卸载后在框架集上面触发，或者当嵌入的内容卸载完毕后在<object\>元素上面触发。
- abort: 在用户停止下载过程时，如果嵌入的内容没有加载完，则在<object\>元素上面触发。
- error: 当发生 JavaScript 错误时在 window 上面触发.
- select: 当用户选择文本框（ <input\> 或 <textarea\> ）中的一或多个字符时触发。
- resize: 当窗口或框架的大小变化时在 window 或框架上面触发。
- scroll: 当用户滚动带滚动条的元素中的内容时，在该元素上面触发。 <body\>元素中包含所加载页面的滚动条。
- 要确定浏览器是否支持 DOM2 级事件规定的 HTML 事件.`var isSupported = document.implementation.hasFeature("HTMLEvents", "2.0");`

**1.load事件**
- JavaScript 中最常用的一个事件就是load。当页面完全加载后（包括所有图像、JavaScript事件、CSS文件等外部资源），就会触发window上面的load事件。
    ```
     img.addEventListener('load', function (e) {
         console.log(e.target.src);
     });
    ```
    
**2.unload事件**
- 与 load 事件对应的是 unload 事件，这个事件在文档被完全卸载后触发。只要用户从一个页面切换到另一个页面，就会发生 unload 事件。而利用这个事件最多的情况是清除引用，以避免内存泄漏。

**3.resize事件**
- 当浏览器窗口被调整到一个新的高度或宽度时，就会触发resize事件。
- 注意不要在这个事件的处理程序中加入大计算量的代码，因为这些代码有可能被频繁执行，从而导致浏览器反应明显变慢。
- > 浏览器窗口最小化或最大化时也会触发 resize 事件。

**4.scroll事件**
- 虽然scroll事件是在window对象上发生的，但它实际表示的则是页面中相应元素的变化。
    ```
    window.addEventListener('scroll', (e) => {
        alert(document.documentElement.scrollTop)
    }) 
    ```
- 与 resize 事件类似， scroll 事件也会在文档被滚动期间重复被触发，所以有必要尽量保持事件处理程序的代码简单。

```
// 无限加载
let loading = document.querySelector('.loading');
let flag = true;
window.addEventListener('scroll', (e) => {
    let top = document.documentElement.scrollTop; // 获取页面滚动的高度
    let allH = document.documentElement.offsetHeight; // 获取页面总高度
    let crH = document.documentElement.clientHeight;// 视图区高度
    console.log("当前滚动高度" + top);
    console.log("总的高度" + allH);
    // 500的误差即继续加载
    if (top > (allH - crH - 500)) { // 加载区间判定
        if (flag) {
            // 中间件判定正在加载
            flag = false;
            loading.style.display = 'block'; // 显示loading
            f();
        }
    }
})
async function f() { // 异步判定
    let b = await setTimeout(() => {
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < 50; i++) {
            let p = document.createElement('li');
            p.textContent = i;
            fragment.appendChild(p);
        }
        document.getElementById('ul').appendChild(fragment);
        flag = true; // 加载结束
        loading.style.display = 'none'; // 关闭loading
    }, 1000);
}
```

### 焦点事件

焦点事件会在页面元素获得或失去焦点时触发。利用这些事件并与document.hasFocus（）方法及document.activeElement属性配合，可以知晓用户在页面上的行踪。

- blur: 在元素失去焦点时触发。这个事件不会冒泡；所有浏览器支持它。
- DOMFocusIn: 元素获得焦点吃触发。与HTML事件 focus 等价，但它冒泡。DOM3废弃，选择了focusin。
- DOMFocusOut:元素失去焦点时触发。这个事件是HTML事件blur的通用版本。DOM3废弃，选择了focusout.
- focus： 在元素获得焦点时触发。这个事件不会冒泡；所有浏览器支持它。
- focusin: 在元素获得焦点时触发。与HTML事件focus等价，但它冒泡。
- focusout:在元素失去焦点时触发，是HTML事件blur的通用版本

当焦点从页面中的一个元素移动到另一个元素，会依次触发下列事件：
1. focusout 在失去焦点的元素上触发；
2. focusin 在获得焦点的元素上触发；
3. blur 在失去焦点的元素上触发；
4. DOMFocusOut 在失去焦点的元素上触发；
5. focus 在获得焦点的元素上触发；
6. DOMFocusIn 在获得焦点的元素上触发。

其中， blur 、 DOMFocusOut 和 focusout 的事件目标是失去焦点的元素；而 focus 、 DOMFocusIn和 focusin 的事件目标是获得焦点的元素。

> 即使 focus 和 blur 不冒泡，也可以在捕获阶段侦听到它们

### 鼠标与滚轮事件

- click：在用户单击主鼠标（一般是左边的按钮）或者按下回车键时触发。这一点对确保易访问性很重要，意味着onclick事件处理程序既可以通过键盘也可以通过鼠标执行。
- dblclick:在用户双击主鼠标按钮 （一般是左边的按钮）时触发。
- mousedown: 在用户按下了任意鼠标按钮时触发。
- mouseenter: 在鼠标光标从元素外部首次移动到元素范围之内时触发。该事件不冒泡。
- mouseleave: 在位于元素上方的鼠标光标移动到元素范围之外时触发。该事件不冒泡。
- mousemove: 当鼠标指针在元素内部移动时重复地触发。
- mouseout: 在鼠标指针位于一个元素上方，然后用户将其移入另一个元素时触发。又移入的另一个元素可能位于前一个元素的外部，也可能是这个元素的子元素。
- mouseover: 在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触发。
- mouseup: 在用户释放鼠标按钮时触发。

**页面上的所有元素都支持鼠标事件。除了 mouseenter 和 mouseleave ，所有鼠标事件都会冒泡**

> 只有在同一个元素上相继触发 mousedown 和 mouseup 事件，才会触发 click 事件；如果mousedown 或 mouseup中的一个被取消，就不会触发 click 事件。类似地，只有触发两次 click 事件，才会触发一次 dblclick 事件。如果有代码阻止了连续两次触发 click 事件（可能是直接取消 click事件，也可能通过取消 mousedown 或 mouseup 间接实现），那么就不会触发 dblclick 事件了。这 4个事件触发的顺序始终如下：

1. mousedown
2. mouseup
3. click
4. mousedown
5. mouseup
6. click
7. dblclick

> 使用以下代码可以检测浏览器是否支持以上 DOM2 级事件（除 dbclick 、 mouseenter 和 mouseleave 之外）：`var isSupported = document.implementation.hasFeature("MouseEvents", "2.0");`

**1.客户区坐标位置**

- clientX: 鼠标指针在视口中的水平位置
- clientY: 鼠标指针在视口中的垂直位置。

**2.页面坐标位置**
- pageX: 鼠标在页面中的水品位置
- pageY: 鼠标在页面中的垂直位置

*在页面没有滚动的情况下， pageX 和 pageY 的值与 clientX 和 clientY 的值相等。*

**3.屏幕坐标位置**

- screenX: 鼠标在屏幕上的水平坐标
- screenY: 鼠标在屏幕上的垂直坐标

**4.修改键**

- Shift: shiftKey
- Ctrl: ctrlKey
- Alt: altKey
- Meta(windows\Cmd): metaKey

```
document.addEventListener('click', function (e) {
    let keys = [];
    if (e.shiftKey) {
        keys.push('shift');
    }
    if (e.ctrlKey) {
        keys.push('ctrl');
    }
    if (e.altKey) {
        keys.push('alt')
    }
    if (e.metaKey) {
        keys.push('meta')
    }
    alert('keys: ' + keys.join(','))
}) 
```

**5.相关元素**

> 在发生 mouseover 和 mouserout 事件时，还会涉及更多的元素。这两个事件都会涉及把鼠标指针从一个元素的边界之内移动到另一个元素的边界之内。对 mouseover 事件而言，事件的主目标是获得光标的元素，而相关元素就是那个失去光标的元素。类似地，对 mouseout 事件而言，事件的主目标是失去光标的元素，而相关元素则是获得光标的元素。

- DOM通过 event 对象的 **relatedTarget 属性提供了相关元素的信息**。这个属性只对于 mouseover 和 mouseout 事件才包含值；对于其他事件，这个属性的值是 null 

**6.鼠标按钮**

- 对于 mousedown 和 mouseup 事件来说，在其 event 对象存在一个button属性，表示按下或释放的按钮。
- DOM的 button 属性可能有如下3个值： 0 表示主鼠标按钮， 1 表示中间的鼠标按钮（鼠标滚轮按钮）， 2表示次鼠标按钮。**(实测只有0)**

**7.更多的事件信息**

- “DOM2 级事件”规范在 event 对象中还提供了 detail 属性，用于给出有关事件的更多信息
- 对于鼠标事件来说，detail中包含了一个数值，表示在给定的位置上发生了多少次单击。
- 在同一个元素上相继地发生一次mousedown和mouseup事件算作一次单击。
- offsetX ：光标相对于目标元素边界的 x 坐标。（事件目标上的坐标）
- offsetY ：光标相对于目标元素边界的 y 坐标。

**8.鼠标滚轮事件**

- mousewheel 鼠标滚轮事件。包含一个特殊的wheelDelta 属性，当用户向前滚动时，wheelDelta 是120的倍数；当用户向后滚动鼠标滚轮时，wheelDelta 是 -120 的倍数。
- Firefox 中是DOMMouseScroll事件，滚动信息则保存在detail属性中了.当向前滚动鼠标滚轮时，这个属性的值是 -3 的倍数，当向后滚动鼠标滚轮时，这个属性的值是 3 的倍数

```
getWheelDelta: function (e) {
        if (e.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    }, 
```

**9. 触摸设备**
- 不支持dblclick 事件
- 轻击可单击元素会触发 mousemove 事件。如果此操作会导致内容变化，将不再有其他事件发生
- mousemove 事件也会触发 mouseover 和 mouseout 事件
- 两个手指放在屏幕上且页面随手指移动而滚动时会触发 mousewheel 和 scroll 事件。

### 键盘与文本事件

- keydown: 当用户按下键盘上的任意键时触发，而且如果按住不放，会重复触发此事件。
- keypress: 当用户按下键盘上的字符键时触发，而且如果按住不放，会重复触发此事件。
- keyup: 当用户释放键盘上的键时触发。

只有一个文本事件：textInput。这个事件是对keypress 的补充，用意是在将文本显示给用户之前更容易拦截文本。在文本插入文本框之前会触发textInput事件。

> 在用户按了一下键盘上的字符键时，首先会触发 keydown 事件，然后紧跟着是 keypress 事件，最后会触发 keyup 事件。其中， keydown 和 keypress 都是在文本框发生变化之前被触发的；而 keyup事件则是在文本框已经发生变化之后被触发的。如果用户按下了一个字符键不放，就会重复触发 keydown 和 keypress 事件，直到用户松开该键为止。

**1.键码**
- 在发生keydown和keyup事件时，event 对象的**keyCode** 属性中会包含一个代码，与键盘上一个特定的键对应。
- 对数字字母字符键，keyCode 属性的值与ASCII码中对应小写字母或数字的编码相同。
- 在Firefox 和 Opera 中，按分号键时keyCode值为59，但IE和Safari返回186.

**所有非字符键的键码**

![keycode](http://www.vunbo.com/usr/uploads/2019/01/3685867797.png)

**2.字符编码**
- 发生keypress事件时，通过charCode属性，可以获取按下的键的字符编码。如果charCode不可用，则使用keyCode。
- 在取得字符编码之后，就可以使用 String.fromCharCode()将其转换成实际的字符。

**3.DOM3级变化**
- DOM3级事件中的键盘事件，不再包含charCode属性，而是包含两个新属性：key 和 char.
- key 属性是为了取代 keyCode 而新增的，它的值是一个字符串。按下某个字符键时，key的值就是相应的文本字符。
- char 属性在按下字符键时的行为与key相同，但在按下非字符键时值为null(实测为undefined和null)
- 不推荐使用key，keyIdentifier 或 char
- location 属性，表示按下了什么位置上的键。chrome始终为0，不推荐使用。
- 最后是给 event 对象添加了 getModifierState() 方法。这个方法接收一个参数，即等于 Shift 、Control 、 AltGraph 或 Meta 的字符串，表示要检测的修改键。如果指定的修改键是活动的（也就是处于被按下的状态），这个方法返回 true ，否则返回 false 。
- IE9 是唯一支持 getModifierState() 方法的浏览器。

**4.textInput事件**
- 任何可以获得焦点的元素都可以触发keypress事件，但只有可编辑区域才能触发textInput事件。
- textInput事件只会在用户按下能够输入实际字符的键时才会被触发，而keypress事件则在按下那些能够影响文本显示的键时也会触发。（如退格键）
- textInput 事件主要考虑的是字符，因此它的 event 对象中还包含着一个data属性，该属性的值就是用户输入的字符（而非字符编码）。

```
let textbox = document.getElementById('myText')
textbox.addEventListener('textInput', function (e) {
    console.log(e.data);
}) 
```

- event 对象还有一个属性，叫 inputMethod, 表示把文本输入到文本框中的方式。
-  0，表示浏览器不确定是怎么输入的。
-  1，表示是使用键盘输入的。
-  2，表示文本是粘贴进来的。
-  3，表示文本是拖放进来的。
-  4，表示文本是使用 IME 输入的。
-  5，表示文本是通过在表单中选择某一项输入的。
-  6，表示文本是通过手写输入的（比如使用手写笔）。
-  7，表示文本是通过语音输入的。
-  8，表示文本是通过几种方法组合输入的。
-  9，表示文本是通过脚本输入的。    

- 只有IE支持inputMethod属性

### 复合事件

- 复合事件（composition event）是 DOM3 级事件中新添加的一类事件，用于处理 IME 的输入序列。IME（Input Method Editor，输入法编辑器）可以让用户输入在物理键盘上找不到的字符。
- IE9支持。

### 变动事件

DOM2 级的变动（mutation）事件能在 DOM中的某一部分发生变化时给出提示。

- DOMSubtreeModified ：在 DOM 结构中发生任何变化时触发。这个事件在其他任何事件触发后都会触发。
- DOMNodeInserted ：在一个节点作为子节点被插入到另一个节点中时触发
- DOMNodeRemoved ：在节点从其父节点中被移除时触发。
- DOMNodeInsertedIntoDocument ：在一个节点被直接插入文档或通过子树间接插入文档之后触发。这个事件在 DOMNodeInserted 之后触发
- DOMNodeRemovedFromDocument ：在一个节点被直接从文档中移除或通过子树间接从文档中移除之前触发。这个事件在 DOMNodeRemoved 之后触发。
- DOMAttrModified ：在特性被修改之后触发
- DOMCharacterDataModified ：在文本节点的值发生变化时触发。

**1.删除节点**

- 在使用removeChild() 或 replaceChild() 从DOM中删除节点时，首先会触发 DOMNodeRemoved事件。
- 这个事件的目标（event.target）是被删除的节点,而event.relatedNode属性中包含着对目标节点父节点的引用。
- 这个事件触发时，节点尚未从其父节点删除， 因此其parentNode 属性仍然指向父节点（与 event.relatedNode相同）。
- 这个事件会冒泡，因此可以在DOM的任何层次处理。
- 如果被移除的节点包含子节点，那么在其所有子节点以及这个被移除的的节点上会相继触发 DOMNodeRemovedFromDocument事件。该事件不会冒泡，所以只有直接指定给其中一个子节点的事件处理程序才会被调用。
- 紧随其后的DOMSubtreeModified事件，这个事件的目标是被移除节点的父节点；

```
<! DOCTYPE html>
<html>
<head>
    <title>Node Removal Events Example</title>
</head>
<body>
    <ul id="myList">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</body>
</html> 

window.addEventListener('load', function (e) {
    let ul = document.getElementById('myList')

    document.addEventListener('DOMSubtreeModified', function (e) {
        console.log(e.type);
        console.log(e.target);
    });
    document.addEventListener('DOMNodeRemoved', function (e) {
        console.log(e.type);
        console.log(e.target);
        console.log(e.relatedNode);
    })
    //  DOMNodeRemovedFromDocument不冒泡，所以针对ul的第一个子节点
    ul.firstChild.addEventListener('DOMNodeRemovedFromDocument', function (e) {
        console.log(e.type);
        console.log(e.target);
    })
    ul.parentNode.removeChild(ul);
})

// 在这个例子中，我们假设要移除 <ul> 元素。此时，就会依次触发以下事件。
1. 在 <ul> 元素上触发 DOMNodeRemoved 事件。 relatedNode 属性等于 document.body 。
2. 在 <ul> 元素上触发 DOMNodeRemovedFromDocument 事件。
3. 在身为 <ul> 元素子节点的每个 <li> 元素及文本节点上触发 DOMNodeRemovedFromDocument事件。
4. 在 document.body 上触发 DOMSubtreeModified 事件，因为 <ul> 元素是 document.body的直接子元素。
```

**2.插入节点**

- 在使用 appendChild() 、 replaceChild() 或 insertBefore() 向 DOM 中插入节点时，首先会触发 DOMNodeInserted 事件
- 这个事件的目标是被插入的节点，而 event.relatedNode 属性中包含一个对父节点的引用。
- 在这个事件触发时，节点已经被插入到了新的父节点中。这个事件是冒泡的，因此可以在 DOM的各个层次上处理它。
- 紧接着，会在新插入的节点上面触发 DOMNodeInsertedIntoDocument 事件。这个事件不冒泡，因此必须在插入节点之前为它添加这个事件处理程序。
- 最后一个触发的事件是 DOMSubtreeModified ，触发于新插入节点的父节点。

```
window.addEventListener('load', function (e) {
    let list = document.getElementById('myList')
    let item = document.createElement('li')
    item.appendChild(document.createTextNode('Item 4'))

    document.addEventListener('DOMSubtreeModified', function (e) {
        console.log(e.type);
        console.log(e.target);
    })
    document.addEventListener('DOMNodeInserted', function (e) {
        console.log(e.type);
        console.log(e.target);
        console.log(e.relatedNode);
    });
    item.addEventListener('DOMNodeInsertedIntoDocument', function (e) {
        console.log(e.type);
        console.log(e.target);
    })
    list.appendChild(item);
}) 

以上代码首先创建了一个包含文本 "Item 4" 的新 <li> 元素。由于 DOMSubtreeModified 和
DOMNodeInserted 事件是冒泡的，所以把它们的事件处理程序添加到了文档中。在将列表项插入到其
父节点之前，先将 DOMNodeInsertedIntoDocument 事件的事件处理程序添加给它。最后一步就是使
用 appendChild() 来添加这个列表项；此时，事件开始依次被触发。首先是在新 <li> 元素项上触发
DOMNodeInserted 事件，其 relatedNode 是 <ul> 元素。然后是触发新 <li> 元素上的 DOMNode-
InsertedIntoDocument 事件，最后触发的是 <ul> 元素上的 DOMSubtreeModified 事件。
```

### HTML5事件

**1.contextmenu事件**

- 通过单机鼠标右键可以调出上下文菜单。
- 由于contextmenu事件是冒泡的，因此可以为document指定一个事件处理程序，用以处理页面上发生的所有此类事件。
- 这个事件的目标是发生用户操作的元素，可以通过event.preventDefault()来取消。IE中event.returnValue的值设置为false.
- 因为contextmenu事件属于鼠标事件，所以其事件对象中包含与光标位置有关的所有属性。
- 通过使用contextmenu 事件来显示自定义的上下文菜单，而使用onclick事件来隐藏该菜单。

```
window.addEventListener('load', function (e) {
    let div = document.getElementById('myDiv')
    div.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        let menu = document.getElementById('myMenu')
        menu.style.left = e.clientX + 'px';
        menu.style.top = e.clientY + 'px'
        menu.style.visibility = 'visible';
    })
    document.addEventListener('click', function (e) {
        document.getElementById('myMenu').style.visibility = 'hidden';
    })
}) 
```

**2.beforeunload事件**

- window 对象上的beforeunload 事件，是为了让开发人员有可能在页面卸载前阻止这一操作。
- 必须将event.returnValue 的值设置为要显示给用户的字符串。（对IE和Fiefox而言），同时作为函数的值返回（对Safari 和 Chrome 而言）

**3.DOMContentLoaded事件**

- 在形成完整的DOM数之后就会触发，不理会图像、JavaScript文件、CSS文件或其他资源是否已经下载完毕。
- 与load 事件不同，DOMContentLoaded 支持在页面下载的早期添加事件处理程序，这也就意味着用户能够尽早地与页面进行交互。
- 要处理DOMContentLoaded 事件，可以为document或 window 添加相应的事件处理程序（尽管这个事件会冒泡到window,但它的目标实际上是document）

**4.readystatechange 事件**

支持 readystatechange 事件的每个对象都有一个 readyState 属性，可能包含下列5个值中的一个。
- uninitialized(未初始化)： 对象存在但尚未初始化
- loading(正在加载)： 对象正在加载数据
- loaded(加载完毕): 对象加载数据完成
- interactive(交互)： 可以操作对象了，但还没有完成加载
- complete(完成)：对象已经加载完毕

> 这些状态看起来很直观，但并非所有对象都会经历 readyState 的这几个阶段。换句话说，如果某个阶段不适用某个对象，则该对象完全可能跳过该阶段；并没有规定哪个阶段适用于哪个对象。显然，这意味着 readystatechange 事件经常会少于 4 次，而 readyState 属性的值也不总是连续的。

> 对于 document 而言，值为 "interactive" 的 readyState 会在与 DOMContentLoaded 大致相同的时刻触发 readystatechange 事件。此时，DOM树已经加载完毕，可以安全地操作它了，因此就会进入交互（interactive）阶段。但与此同时，图像及其他外部文件不一定可用。

**5.pageshow 和 pagehide 事件**

- “往返缓存（back-forward cache,或bfcache）”，可以在用户使用浏览器的‘后退’和‘前进’按钮时加快页面的转换速度。
- 该缓存不仅保存着页面数据，还保存了DOM和JavaScript的状态。
- pageshow 事件会在页面显示时触发，无论该页面是否来自bfcache。虽然这个事件的目标是 document，但必须将其事件处理程序添加到 window 
- pageshow事件的event对象还包含一个名为 persisted 的布尔值属性。如果页面保存在了bfcache中，则这个属性的值为true;否则，这个属性的值为false.
- 与 pageshow 事件对应的是 pagehide 事件，该事件会在浏览器卸载页面的时候触发，而且是在 unload 事件之前触发.这个事件的 event 对象也包含 persisted 属性，如果页面卸载后会被保存在bfcache中，则 persisted的值也会被设置为true.

> 指定了 onunload 事件处理程序的页面会被自动排除在 bfcache 之外，即使事件处理程序是空的。原因在于， onunload 最常用于撤销在 onload 中所执行的操作，而跳过 onload 后再次显示页面很可能就会导致页面不正常。

**6.haschange事件**
- HTML5 新增了 hashchange 事件，以便在 URL 的参数列表（及 URL 中“#”号后面的所有字符串）发生变化时通知开发人员。
- 必须要把 hashchange 事件处理程序添加给 window 对象，然后 URL 参数列表只要变化就会调用它。此时的 event 对象应该额外包含两个属性： oldURL 和 newURL 。这两个属性分别保存着参数列表变化前后的完整 URL。
- 最好使用location对象来确定当前的参数列表。`location.hash`
- var isSupported = ("onhashchange" in window); //这里有 bug
- 如果 IE8 是在 IE7 文档模式下运行，即使功能无效它也会返回 true 。为解决这个问题，可以使用以下这个更稳妥的检测方式：
- var isSupported = ("onhashchange" in window) && (document.documentMode === undefined || document.documentMode > 7);
- document.documentMode 检测IE浏览器版本

### 设备事件

**1.orientationchange 事件**
- window.orientation 属性中包含3个值：0表示肖像模式， 90 表示向左旋转的横向模式，-90 表示向右旋转的横向模式。
- 当用户改变了设备的查看模式，就会触发 orientationchange事件，可以通过window.orientation 访问到信息。

```
window.addEventListener('load', function (e) {
    let div = document.getElementById('myDiv');
    div.innerHTML = 'Current orientation is ' + window.orientation;
    window.addEventListener('orientationchange', function (e) {
        div.innerHTML = 'Current orientation is ' + window.orientation;
    })
}) 
```

**2.deviceorientation事件**

触发 deviceorientation 事件时，事件对象中包含着每个轴相对于设备静止状态下发生变化的信息。事件对象包含以下 5 个属性

- alpha: 在围绕 z轴旋转时（即左右旋转时），y 轴的度数差；是一个介于 0 到 360 之间的浮点数。
- beta: 在围绕 x轴旋转时（即前后旋转时），z轴的度数差；是一个介于180到 180之间的浮点数。
- gamma ：在围绕 y轴旋转时（即扭转设备时），z轴的度数差；是一个介于90到 90之间的浮点数。
- absolute ：布尔值，表示设备是否返回一个绝对值。
- compassCalibrated ：布尔值，表示设备的指南针是否校准过。
- 这个例子只能在移动 WebKit 浏览器中运行，因为它使用了专有的 webkitTransform 属性（即 CSS标准属性 transform 的临时版）。

**3.devicemotion事件**

devicemotion事件包含以下属性。
- acceleration: 一个包含x、y和z属性的对象，在不考虑重力的情况下，告诉你在每个方向上的加速度。
- accelerationIncludingGravity: 一个包含 x 、 y 和 z 属性的对象，在考虑 z 轴自然重力加速度的情况下，告诉你在每个方向上的加速度
- interval ：以毫秒表示的时间值，必须在另一个 devicemotion 事件触发前传入。这个值在每个事件中应该是一个常量。
- rotationRate ：一个包含表示方向的 alpha 、 beta 和 gamma 属性的对象。
- 如果读取不到 acceleration 、 accelerationIncludingGravity 和 rotationRate 值，应该先检测确定它们的值不是null.`if (event.rotationRate !== null){`

### 触摸与手势事件

- touchstart: 当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
- touchmove: 当手指在屏幕上滑动时连续地触发。在这个事件发生期间，调用preventDefault()可以阻止滚动。
- touchend: 当手指从屏幕上移开时触发。
- touchcancel: 当系统停止跟踪触摸时触发。
- 这些事件都会冒泡，也都可以取消。

跟踪触摸的属性
- touches: 表示当前跟踪的触摸操作的Touch对象的数组。
- targetTouches: 特定于事件目标的Touch对象的数组。
- changedTouches: 表示自上次触摸以来发生了什么改变的Touch对象的数组。

每个Touch对象包含下列属性：
- clientX ：触摸目标在视口中的 x 坐标。
- clientY ：触摸目标在视口中的 y 坐标。
- identifier ：标识触摸的唯一 ID。
- pageX ：触摸目标在页面中的 x 坐标。
- pageY ：触摸目标在页面中的 y 坐标。
- screenX ：触摸目标在屏幕中的 x 坐标。
- screenY ：触摸目标在屏幕中的 y 坐标。
- target ：触摸的 DOM 节点目标。

**2.手势事件**

- gesturestart: 当一个手指已经按在屏幕上而另一个手指又触摸屏幕时触发。
- gesturechange: 当触摸屏幕的任何一个手指的位置发生变化时触发。
- gestureend: 当任何一个手指从屏幕上面移开时触发。

只有两个手指都触摸到事件的接收容器时才会触发这些事件。在一个元素上设置事件处理程序，意味着两个手指必须同时位于该元素的范围之内，才能触发手势事件（这个元素就是目标）。由于这些事件冒泡，所以将事件处理程序放在文档上也可以处理所有手势事件。此时，事件的目标就是两个手指都位于其范围内的那个元素

触摸事件和手势事件之间存在某种关系。当一个手指放在屏幕上时，会触发 touchstart 事件。如
果另一个手指又放在了屏幕上，则会先触发 gesturestart 事件，随后触发基于该手指的 touchstart
事件。如果一个或两个手指在屏幕上滑动，将会触发 gesturechange 事件。但只要有一个手指移开，
就会触发 gestureend 事件，紧接着又会触发基于该手指的 touchend 事件。

与触摸事件一样，每个手势事件的 event 对象都包含着标准的鼠标事件属性： bubbles 、
cancelable 、 view 、 clientX 、 clientY 、 screenX 、 screenY 、 detail 、 altKey 、 shiftKey 、
ctrlKey 和 metaKey 。此外，还包含两个额外的属性： rotation 和 scale 。其中， rotation 属性表
示手指变化引起的旋转角度，负值表示逆时针旋转，正值表示顺时针旋转（该值从 0 开始）。而 scale
属性表示两个手指间距离的变化情况（例如向内收缩会缩短距离）；这个值从 1 开始，并随距离拉大而
增长，随距离缩短而减小。

## 内存和性能

### 事件委托

利用事件委托，在DOM树中尽量高的层次上添加一个事件处理程序，通过监听（addEventListener）该元素，实现对子DOM元素的事件目标（event.target）进行相关操作。

为document对象添加一个事件处理程序的优点：
- document 对象很快就可以访问，而且可以在页面生命周期的任何时点上为它添加事件处理程序（无需等待 DOMContentLoaded 或 load 事件）。换句话说，只要可单击的元素呈现在页面上，就可以立即具备适当的功能。
- 在页面中设置事件处理程序所需的时间更少。只添加一个事件处理程序所需的 DOM引用更少，所花的时间也更少。
- 整个页面占用的内存空间更少，能够提升整体性能。

> 最适合采用事件委托技术的事件包括 click 、 mousedown 、 mouseup 、 keydown 、 keyup 和 keypress 。
  虽然 mouseover 和 mouseout 事件也冒泡，但要适当处理它们并不容易，而且经常需要计算元素的位置。
  （因为当鼠标从一个元素移到其子节点时，或者当鼠标移出该元素时，都会触发 mouseout 事件。）

### 移除事件处理程序

- 显式的将事件处理程序 = null
- 通过 onunload 事件处理程序移除所有事件处理程序

## 模拟事件

### DOM中的事件模拟

- 可以在document 对象上使用 createEvent() 方法创建 event 对象。该方法接收一个参数，即表示要创建的事件类型的字符串。在DOM2中，所有这些字符串都使用英文复数形势。而在DOM3中，都变成了单数。
    - UIEvents: 一般化的UI事件，鼠标事件和键盘事件都继承自UI事件。DOM3级中是UIEvent.
    - MouseEvents ：一般化的鼠标事件。DOM3 级中是 MouseEvent 。
    - MutationEvents: 一般化的DOM变动事件。DOM3级中是MutationEvent。
    - HTMLEvents ：一般化的 HTML 事件。没有对应的 DOM3 级事件

- 模拟事件的最后一步就是触发事件。这一步需要使用dispatchEvent()方法。需要传入一个参数，即表示要触发事件的 event 对象。

**1.模拟鼠标事件**

创建鼠标事件对象的方法是为 createEvent() 传如字符串 "MouseEvents"。返回对象有一个名为initMouseEvent()方法，用于指定与该鼠标事件相关的信息。接收15个参数。
- type （字符串）：表示要触发的事件类型，例如 "click" 。
- bubbles （布尔值）：表示事件是否应该冒泡。为精确地模拟鼠标事件，应该把这个参数设置为 true 。
- cancelable （布尔值）：表示事件是否可以取消。为精确地模拟鼠标事件，应该把这个参数设置为 true 。
- view （AbstractView）：与事件关联的视图。这个参数几乎总是要设置为 document.defaultView 
- detail （整数）：与事件有关的详细信息。这个值一般只有事件处理程序使用，但通常都设置为 0 
- screenX （整数）：事件相对于屏幕的 X 坐标。
- screenY （整数）：事件相对于屏幕的 Y 坐标。
- clientX （整数）：事件相对于视口的 X 坐标。
- clientY （整数）：事件想对于视口的 Y 坐标。
- ctrlKey （布尔值）：表示是否按下了 Ctrl 键。默认值为 false 。
- altKey （布尔值）：表示是否按下了 Alt 键。默认值为 false 。
- shiftKey （布尔值）：表示是否按下了 Shift 键。默认值为 false 。
- metaKey （布尔值）：表示是否按下了 Meta 键。默认值为 false 。
- button （整数）：表示按下了哪一个鼠标键。默认值为 0 。
- relatedTarget （对象）：表示与事件相关的对象。这个参数只在模拟 mouseover 或 mouseout 时使用。

```
let btn = document.getElementById('myBtn')
// 创建事件对象
let event = document.createEvent('MouseEvents');
// 初始化事件对象
event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0,0,false,false,false,false,0, null);
// 触发事件
btn.dispatchEvent(event); 
```

**2.模拟键盘事件**

DOM3级规定，调用 createEvent() 并传入 ‘KeyboardEvent' 就可以创建一个键盘事件。返回的事件对象会包含一个initKeyEvent()方法，这个方法接收下列参数。
- type(字符串)：表示要触发的事件类型，如"keydown".
- bubbles(布尔值)：表示事件是否应该冒泡。为精确模拟鼠标事件，应该设置为true.
- cancelable（布尔值）：表示事件是否可以取消。为精确模拟鼠标事件，应该设置为true.
- view(AbstractView): 与事件关联的视图。这个参数几乎总是要设置为 document.defaultView.
- key(布尔值)：表示按下的键盘。
- location(整数)：表示按下了哪里的键。0 表示默认的主键盘，1表示左，2表示右，3表示数字键盘，4表示移动设备（即虚拟键盘）,5表示手柄。
- modifiers(字符串)：空格分隔的修改键列表，如‘shift'.
- repeat(整数)： 在一行中按了这个键多次。

# 第14章：表单脚本

HTMLFormElement 类型表示表单 <form\>
- acceptCharset: 服务器能够处理的字符集；等价于 HTML 中的 accept-charset 特性。
- action: 接受请求的 URL；等价于 HTML 中的 action 特性。
- elements: 表单中所有控件的集合（HTMLCollection）
- enctype: 请求的编码类型；等价于 HTML 中的 enctype 特性
- length: 表单中控件的数量
- method: 要发送的 HTTP 请求类型，通常是 'get'或'post';等价于 HTML 的 method 特性
- name: 表单的名称；等价于 HTML 的 name 特性
- reset(): 将所有表单域重置为默认值
- submit(): 提交表单。
- target: 用于发送请求和接收响应的窗口名称；等价于 HTML 的 target 特性。

取得<form\>元素引用的方式
- 通过ID获取
- 通过 document.forms 可以取得页面中所有的表单。通过数值索引或 name 值来获取特定的表单。

### 提交表单

用户单击按钮或图像按钮时，就会提交表单。使用<input\>或<button\>都可以定义提交按钮。将其type特性设置为‘submit'即可。图像按钮则是<input\>的特性设置为'image'来定义。
- 只要表单中有提交按钮，就可以通过回车键提交表单。
- 通过 preventDefault() 方法可以阻止事件的默认行为，取消表单提交。
- 编程方式提交表单：form.submit()。**不会触发 submit 事件，调用之前先验证表单数据**
- 提交表单的问题: **重复提交表单**,因此，在第一次提交表单后，就禁用提交按钮，或利用 onsubmit 事件处理程序取消后续的表单提交操作。

### 重置表单

- type特性值为 'reset'的 input 或 button 都可以创建重置按钮。
- 可以通过 preventDefault() 来阻止重置表单。
- 编程方式重置表单：form.reset().**与调用 submit() 方法不同，调用 reset() 方法会像单击重置按钮一样触发 reset 事件**
- 少用

### 表单字段

- 每个表单都有 elements 属性，该属性是表单中所有表单元素（字段）的集合。elements 集合是一个有序列表，可以通过位置和 name 特性来访问。
- 如果有多个表单控件都在使用同一个 name(如单选按钮)，那么就会返回以该 name 命名的一个 NodeList.
- 如果通过 elements[0] 访问相同 name 的控件，则只返回第一个。

**1. 共有的表单字段属性**
- disabled: 布尔值，表示当前字段是否被禁用
- form： 指向当前字段所属表单的指针；只读。
- name: 当前字段的名称。
- readOnly: 布尔值，表示当前字段是否只读。
- tabIndex: 表示当前字段的切换(tab)序号
- type: 当前字段的类型，如'checkbox', 'radio'，and so on.
- value: 当前字段将被提交给服务器的值。对文件字段来说，只读。包含着文件在计算机中的路径
- 防止重复提交：监听提交事件后，设置 disabled = true; 不能通过 onclick 事件处理程序来实现这个功能，原因是不同浏览器之间存在‘时差’.

说明|HTML示例|type属性的值
---|---|---
单选列表|<select\>...</select\>|'select-one'
多选列表|<select&nbsp;multiple\>...</select\>|'select-multiple'
自定义按钮|<button\>...</button\>|'submit'
自定义非提交按钮|<button type='button'\>...</button\>|'button'
自定义重置按钮|<button type='reset'\>...</button\>|'reset'
自定义提交按钮|<button type='submit'\>...</button\>|'submit'

> input 和 button 元素的 type 属性是可以动态修改的，而 select 元素的type属性是只读的。

**2.共有的表单字段方法**
- focus() 和 blur() 方法。
- autofocus 属性能自动把焦点移动到相应字段。布尔值。
- 默认情况下，只有表单字段可以获得焦点。对于其他元素，如果先将其**tabIndex**属性设置为-1，然后再调用 focus() 方法，可以让这些元素获得焦点。

**3.共有的表单字段事件**
- blur:当前字段失去焦点时触发。
- change: 对于 input 和 textarea 元素，在它们失去焦点且 value 值改变时触发；对于 select 元素，在其选项改变时触发。
- focus: 当前字段获得焦点时触发。

## 文本框脚本

- input 元素，单行文本框，type 特性设置为 'text'，通过 size 特性，指定文本框中显式的字符数。通过 value 设置本文的初始值，而 maxlength 特性则可以指定文本框接受的最大字符数。
- textarea元素；多行文本框；rows 和 cols 特性，rows 指定文本框的字符行数， cols指定文本框的字符列数。初始值放在 <textarea\>和<\/textarea\>之间。**不能指定最大字符数**
- 无论这两种文本框在标记中有什么区别，但它们都会将用户输入的内存保存在 value 属性中。可通过这个属性读取和设置文本框的值。
- 建议使用 value 属性读取或设置文本框的值，不建议使用标准的DOM方法。即 setAttribute() 设置 <input\>元素的value特性，也不要去修改<textarea\>元素的第一个子节点。原因很简单：对value属性所作的修改，不一定会反映在DOM中。

### 选择文本

- input 和 textarea 都支持 select()方法，这个方法用于选择文本框中的所有文本。获得焦点并选择所有文本。**大幅度提升表单的易用性**

**1.选择(select)事件**
- 与select()方法对应的，是一个select事件。在选择了文本框中的文本（而且要释放鼠标）时，就会触发事件。IE8中，选择后就会触发，不必释放鼠标。

**2.取得选择文本**
- selectionStart 和 selectionEnd。保存基于0的数值，表示所选择文本的范围。
    ```
    textbox.addEventListener('select', function (e) {
        console.log(getSelectedText(this));
    })
    
    function getSelectedText(text) {
        return text.value.substring(text.selectionStart, text.selectionEnd);
    } 
    ```

**3.选择部分文本**
- setSelectionRange()方法。接收2个参数：要选择的第一个字符的索引和要选择的最后一个字符之后的索引（类似substring()方法的两个参数）。
    ```
    textbox.value = 'Hello World';
    textbox.focus();
    console.log(textbox.setSelectionRange(0, 3));
    // 要看到选择的文本，必须在调用 setSelectionRange()之前或之后立即将焦点设置到文本框. 
    ```

### 过滤输入

**1.屏蔽字符**
- 屏蔽所有输入，文本框只读。
    ```
    textbox.addEventListener('keypress', function(e){
        e.preventDefault();
    }) 
    ```
- 只允许输入数字
    ```
    textbox.addEventListener('keypress', function(e){
        let charCode = e.charCode;
        if (!/\d/.test(String.fromCharCode(charCode))) {
            e.preventDefault();
        }
    }) 
    // 当复制时会输入字符串
    ```

**2.操作剪贴板**
- beforecopy: 在发生复制操作前触发
- copy: 在发生复制操作时触发。
- beforecut:在发生剪切操作前触发
- cut: 在发生剪切操作时触发
- beforepaste: 在发生粘贴操作前触发
- paste: 在发生粘贴操作时触发

**访问剪贴板中的数据，使用 clipboardData 对象：**
- IE中，这个对象是在 window 对象中的属性；
- 其他是在 event 对象的属性中。
- 其他只在发生剪贴板事件期间使用该对象。IE中随时可以使用。
- 防止对剪贴板未授权使用。最后在事件期间使用。

**clipboardData 对象的方法**
- getData(),获取剪贴板数据。IE中两种数据格式：'text'和‘URL’，其他是一种MIME类型；可用‘text'代表 ‘text/plain'。
- setData(),设置数据。第一个参数也是数据类型，第二个参数是要放在剪贴板中的文本。第一个参数，IE支持 ‘text’和 'URL'，其他支持MIME类型。但不能识别‘text'，支持 'text/plain'。
- clearData(),清除剪贴板数据。

```
    // 兼容模式
    getClipboardText: function (e) {
        let clipboardData = e.clipboardData || window.clipboardData;
        return clipboardData.getData('text');
    },
    setClipboardText: function (e, value) {
        if (e.clipboardData) {
            return e.clipboardData.setData('text/plain', value);
        } else if (window.clipboardData) {
            return window.clipboardData.setData('text', value);
        }
    } 
```

```
textbox.addEventListener('paste', function (e) {
    let text = e.clipboardData.getData('text'); // 获取剪贴板数据
    // 如果是非数字，禁止粘贴
    if (!/^\d*$/.test(text)) {
        e.preventDefault();
    }
}) 
```

```
// 复制版权后缀
document.body.addEventListener('copy', function (e) {
    // 禁止默认的复制事件
    e.preventDefault();

    // 新的剪切板数据
    let newText = null;

    // 获取复制的文本
    let copyText = window.getSelection().toString();

    // 如果超出10字符，则添加版权
    if (copyText.length >= 10) {
        newText = copyText + `\n${'作者：YYB'}\n${'链接：http://www.vunbo.com/'}\n${'著作版权归作者所有，未经转载，请勿转载！'}`;
    } else {
        newText = copyText;
    }
    
    // 兼容模式
    if (e.clipboardData) {
        return e.clipboardData.setData('text/plain', newText);
    } else {
        // IE模式下
        return window.clipboardData.setData('text', newText);
    }
}); 
```

> 禁止复制、剪切、右键等。事件 return false 或者 e.preventDefault()阻止默认事件。
> CSS 中 user-select: none; 禁止文本选择

### 自动切换焦点

```
<form action="">
    <input type="text" name="tel1" id="texTel1" maxlength="3">
    <input type="text" name="tel1" id="texTel2" maxlength="3">
    <input type="text" name="tel1" id="texTel3" maxlength="4">
</form> 
;(function () { // 立即执行函数
   function tabForward(e) {
       let target = e.target; // 获取target
       // 判断当前输入的值长度
       if (target.value.length === target.maxLength) {
           // 获取父级表单
           let form = target.form;
           for (let i = 0; i < form.elements.length; i++) {
               // 判断当前input
               if (form.elements[i] === target) {
                   // 如果存在下一个则跳转并自动focus
                   if (form.elements[i+1]) {
                       form.elements[i+1].focus();
                   }
                   return;
               }
           }
       }
   }
   let textbox1 = document.getElementById('texTel1');
   let textbox2 = document.getElementById('texTel2');
   let textbox3 = document.getElementById('texTel3');
    textbox1.addEventListener('keyup', tabForward)
    textbox2.addEventListener('keyup', tabForward)
    textbox3.addEventListener('keyup', tabForward)
})()
```

### HTML5约束验证API

**1.必填字段**
- require属性。适用于 input, textarea, select
- 通过该属性可以检测某个字段是否为必填字段
    `let isUsernameRequired = document.forms[0].elements['username'].required`
- 使用下面的代码可以测试浏览器是否支持required属性。
    `let isRequiredSupported = 'required' in document.createElement('input')`

**2.其他输入类型**
- email, 电子邮件格式
- url, URL模式。

**3.数值范围**
- number
- range
- datetime-local
- date
- month
- week
- time
- step属性（从min到max的两个刻度间的差值）
- stepUp()和stepDown()，接受一个可选参数：要在当前值基础上加上或减去的数值。（默认加或减1）

**4.输入模式**
- HTML5新增pattern属性。该属性的值是一个正则表达式，用于匹配文本框中的值。
- `<input type='text' pattern='\d+' name='count'>`
- 注意，模式的开头和末尾不用加^和$符号。与其他输入类型相似，指定的pattern也不能阻止用户输入无效的文本。这个模式应用给值，浏览器来判断值是否有效，还是无效。在JavaScript中可以通过pattern 属性访问模式。

**5.检测有效性**
- 使用checkValidity()方法可以检测表单中的某个字段是否有效。所有表单字段都有个方法，如果字段的值有效，这个方法返回 true, 否则返回 false。
- 要检测整个表单是否有效，可以在表单自身调用 checkValidity() 方法。如果所有表单字段都有效，这个方法返回 true;如果一个字段无效，则返回 false
    ```
    if (document.forms[0].checkValidity()) {
        // 表单有效，继续
    } else {
        // 表单无效
    } 
    ```
- validity 属性详细描述字段为什么有效/无效。这个对象中包含一系列属性，每个属性会返回一个布尔值。
    - customError: 如果设置了 setCustomValidity()，则为true, 否则返回 false
    - patternMismatch: 如果值与指定的pattern属性不匹配，返回true
    - rangeOverflow: 如果值比max值大，返回true
    - rangeUnderflow: 如果值比min值小，返回true
    - stepMisMatch: 如果min和max之间的步长值不合理，返回true
    - tooLong: 如果值的长度超过了maxlength属性的长度。返回true
    - typeMisMatch: 如果值不是‘mail' 或 'url'要求的格式，返回true
    - valid: 如果这里的其他属性都是false, 返回true.
    - valueMissing: 如果标注为 required 的字段中没有值，返回true
    ```
    if (input.validity && !input.validity.valid) {
        if (input.validity.valueMissing) {
            alert('Please specify a value')
        } else if (input.validity.typeMismatch) {
            alert('Please enter an email address')
        } else {
            alert('Value is invalid')
        }
    } 
    ```

**6.禁用验证**
- 通过给 form 设置 novalidate 属性，可以告诉表单不进行验证
- 在 JavaScript 中使用 noValidate 属性可以取得或设置这个属性的值，如果存在，值为true,如果不存在，值为 false  `<form action="" novalidate>`
- 如果一个表单中有多个提交按钮，为了指定点击某个提交按钮不必验证表单，可以在相应的按钮上添加 formnovalidate 属性。  `<input type="submit" value="提交" formnovalidate>`  
- 通过 JavaScript 设置这个属性。`document.forms[0].elements["btnNoValidate"].formNoValidate = true; // 禁用验证`    
    
## 选择框脚本

选择框是通过 select 和 option 元素创建的。提供了下列属性和方法
- add(newOption, relOption): 向控件中插入新的 option 元素，其位置在相关项(relOption)之前。
- multiple: 布尔值，表示是否允许多项选择；等价于HTML中的multiple 特性。
- options: 控件中所有 option 元素的 HTMLCollection
- remove(index): 移除给定位置的选项
- selectedIndex: 基于0的选中项的索引，如果没有选中项，则值为-1。对于支持多选的控件，只保存选中项中第一项的索引。
- size: 选中框中可见的行数；等价于HTML中的size特性

选择框的 type 属性不是 'select-one',就是‘select-multiple'，取决于 HTML 代码中有没有 multiple 特性。选择框的 value 属性由当前选中项决定。
- 如果没有选中的项，则选择框的 value 属性保存空字符串
- 如果有一个选中项，而且该项的value特性已经在HTML中指定，则选择框的 value 属性等于选中项的 value 特性。即使 value 特性的值是空字符串，也同样遵循此规则
- 如果有一个选中项，但该项的 value 特性在HTML中未指定，则选择框的value属性等于该项的文本
- 如果有多个选中项，则选择框的value属性将依据前两条规则取得第一个选中项的值。    
    
在DOM中，每个 option 元素都有一个 HTMLOptionElement 对象表示。具有下列属性：
- index: 当前选项在 options 集合中的索引。
- label: 当前选项的标签；等价于HTML中的label特性
- selected: 布尔值。表示当前是否被选中。
- text: 选项的文本
- value: 选项的值

> 在操作选项时，我们建议最好是使用特定于选项的属性，因为所有浏览器都支持这些属性。在将表单控件作为 DOM 节点的情况下，实际的交互方式则会因浏览器而异。我们不推荐使用标准 DOM 技术修改 <option\> 元素的文本或者值。    
> 选择框的 change 事件与其他表单字段的 change 事件触发的条件不一样。其他表单字段的 change 事件是在值被修改且焦点离开当前字段时触发，而选择框的change 事件只要选中了选项就会触发。    
    
### 选择选项

对于只允许选择一项的选择框，访问选中项的最简单的方式，就是使用选择框的 selectedIndex 属性。
`var selectedOption = selectbox.options[selectbox.selectedIndex]`
```
// 循环遍历选项集合，测试每个选项的 selected 属性。
function getSelectedOptions(selectbox) {
    let result = []
    let option = null;
    // 遍历option,如果被选中，则添加到数组中。
    for (let i = 0; i < selectbox.options.length; i++) {
        option = selectbox.options[i];
        if (option.selected) {
            result.push(option)
        }
    }
    return result;
} 
``` 
    
### 添加选项
    
三种添加选项方式：
```
let newOption = document.createElement('option')
newOption.appendChild(document.createTextNode('Option text'))
newOption.setAttribute('value', 'Option value')
let selectbox = document.forms[0].elements['location'];
selectbox.appendChild(newOption)

// 通过 Option 构造函数创建新选项，接受两个参数：文本(text)和值(value).
let otherOption = new Option('OtherOption text', 'Option value');
selectbox.appendChild(otherOption)

// add() 方法：要添加的新选项和将位于新选项之后的选项。如果想在列表的最后添加一个选项，应该将第二个参数设置为null. 在IE中，第二个参数是可选的。
let thirdOption = new Option('third Option text', 'Option value')
selectbox.add(thirdOption, undefined); // 最佳方案 
```    
    
### 移除选项

- removeChild()方法
- remove()方法。接受一个参数，即要移除选项的索引
- 将相应选项的索引设置为 null

### 移动和重排选项
    
- appendChild() 方法，可以将第一个选择框中的选项直接移动到第二个选择框中。 
- insertBefore() 移动选项和移除选项有一个共同之处，即会重置每一个选项的 index 属性   
    ```
    // 将选择框中的第二个选项移动到第一个
    let optionToMove = selectbox1.options[1];
    selectbox1.insertBefore(optionToMove, selectbox1.options[optionToMove.index - 1]) 
    ```    
 ## 表单序列化
    
在 JavaScript 中，利用表单字段的 type 属性, 连同 name 和 value 属性一起实现对表单的序列化。在编写代码之前，必须搞清楚在表单提交期间，浏览器是怎样将数据发送给服务器的。
- 对表单字段的名称和值进行 URL 编码，使用和好（&）分隔
- 不发送禁用的表单字段
- 只发送勾选的复选框和单选按钮
- 不发送 type 为 ‘reset'和‘button’的按钮
- 多选选择框中的每个选中的值单独一个条目
- 在单击提交按钮提交表单的情况下，也会发送提交按钮；否则，不发送提交按钮。包括 type 为 image 的 <input\>元素
- <select\> 元素的值，就是选中的<option\>元素的 value 特性的值。如果<option\>元素没有 value 特性，则是<option\>元素的文本值。    
    
```
function serialize(form) {
function serialize(form) {
    let parts = [],
        field = null,
        i,
        len,
        j,
        optLen,
        option,
        optValue;
    // 遍历所有的元素
    for (i = 0; i < form.elements.length; i++) {
        field = form.elements[i];
        // 判断类型
        switch (field.type) {
            // 单选与多选
            case 'select-one':
            case 'select-multiple':
                if (field.name.length) {
                    for (j = 0; j < field.options.length; j++) {
                        option = field.options[j];
                        // 如果元素被选中
                        if (option.selected) {
                            optValue = '';
                            // 兼容性判断
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute('value') ? option.value : option.text);
                            } else {
                                optValue = (option.attributes['value'].specified ? option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue));
                        }
                    }
                }
                break;
            case undefined:
            case 'file':
            case 'submit':
            case 'reset':
            case 'button':
                break;
            case 'radio':
            case 'checkbox':
                if (!field.checked) {
                    break;
                }
            default:
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
                }
        }
    }
    return parts.join('&');
} 
```    
    
## 富文本编辑

富文本编辑器，又称为WYSIWYG（What You See Is What You Get, 所见即所得）。
- 页面中嵌入一个包含空HTML页面的iframe。通过设置designMode属性，这个空白的HTML页面可以编辑，编辑对象则是该页面<body\>元素的HTML代码。designMode 属性有两个可能的值：‘off’和‘on’。on 时整个文档可以编辑。
- 要让它可以编辑，必须要将 designMode 设置为 "on" ，但只有在页面完全加载之后才能设置这个属性。因此，在包含页面中，需要使用 onload 事件处理程序来在恰当的时刻设置 designMode    

```
// html
 <iframe name="richedit" src="iframe.html" frameborder="1" style="height: 100px;width: 100px;"></iframe>
 
 // JS
 window.addEventListener('load', function () {
     frames['richedit'].document.designMode = 'on';
 }) 
```
    
### 使用contenteditable属性

通过使用名为 contenteditable 的特殊属性，可以立即编辑该元素。
- 该元素有三个可能的值：‘true’表示打开、‘false’表示关闭、‘inherit’表示从父元素那里继承（因为可以在 contenteditable 元素中创建或删除元素）
```
     <div class="editable" id="richedit" contenteditable="true"></div>
```    
    
### 操作富文本

与富文本编辑器交互的主要方式，就是使用 document.execCommand()。这个方法可以对文档执行预定义的命令。
- 可以为 document.execCommand() 方法传递3个参数：要执行的命令名称、表示浏览器是否应该为当前命令提供用户界面的一个布尔值和执行命令必须的一个值（如果不需要值，则传递null）。
- 确保跨浏览器的兼容性，第二个参数应该设置为 false

命令|值(第三个参数)|说明
---|---|---
backcolor|颜色字符串|设置文档的背景颜色
bold|null|将选择的文本转化为粗体
copy|null|将选择的文本复制到剪贴板
createlink|URL字符串|将选择的文本转换成一个链接，指向指定的URL
cut|null|将选择的文本剪切到剪贴板
delete|null|删除选择的文本
fontname|字体名称|将选择的文本修改为指定字体
fontsize|1～7|将选择的文本修改为指定字体大小
forecolor|颜色字符串|将选择的文本修改为指定的颜色
formatblock|要包围当前文本块的HTML标签；如<h1\>|使用指定的HTML标签来格式化选择的文本块
indent|null|缩进文本 
inserthorizontalrule|null|在插入字符处插入一个 <hr\> 元素
insertimage|图像的URL|在插入字符处插入一个图像
insertorderedlist|null|在插入字符处插入一个 <ol\> 元素
insertunorderedlist|null|在插入字符处插入一个 <ul\> 元素
insertparagraph|null|在插入字符处插入一个 <p\> 元素
italic|null|将选择的文本转换成斜体
justifycenter|null|将插入光标所在文本块居中对齐
justifyleft|null|将插入光标所在文本块左对齐
outdent|null|凸排文本（减少缩进）
paste|null|将剪贴板中的文本粘贴到选择的文本
removeformat|null|移除插入光标所在文本块的块级格式。这是撤销 formatblock 命令的操作
selectall|null|选择文档中的所有文本
underline|null|为选择的文本添加下划线
unlink|null|移除文本的链接。这是撤销 createlink 命令的操作

> Opera 根本没有实现任何剪贴板命令，而Firefox 在默认情况下会禁用它们（必须修改用户的首选项来启用它们）。Safari 和 Chrome实现了 cut 和copy ，但没有实现 paste 。
  
相关命令方法：
- queryCommandEnabled()：检测是否可以针对当前选择的文本，或者当前插入字符所在位置执行某个命令。接收一个参数，即要检测的命令。返回布尔值。`var result = frames["richedit"].document.queryCommandEnabled("bold");`
- queryCommandState() 方法用于确定是否已将指定命令应用到了选择的文本。`var isBold = frames["richedit"].document.queryCommandState("bold");`
- queryCommandValue() ，用于取得执行命令时传入的值（即前面例子中传给 document.execCommand() 的第三个参数）。`var fontSize = frames["richedit"].document.queryCommandValue("fontsize");`

```
// iframe中编辑
 <iframe src="iframe.html" id='HtmlEdit' style="width:400px; height: 300px" marginWidth='2px' marginHeight='2px'></iframe>
 <div id="butGroup">
     <button id="bold">bold</button>
     <button id="copy">copy</button>
     <button id="big">big</button>
     <button id="italic">italic</button>
     <button id="underline">underline</button>
     <button id="backColor">backColor</button>
     <button id="p">p</button>
 </div>
 
 window.onload = function () {
     var editor, bugGroup, doc, box;
     // 获取iframe window
     editor = document.getElementById('HtmlEdit').contentWindow;
     // 获取iframe document
     doc = document.getElementById('HtmlEdit').contentDocument;
     bugGroup = document.getElementById('butGroup')
     bugGroup.addEventListener('click', function (e) {
         switch(e.target.id) {
             case 'bold': addBold(); break;
             case 'copy': copy(); break;
             case 'big': big(); break;
             case 'italic': italic(); break;
             case 'underline': insertorderedlist(); break;
             case 'backColor': createlink(); break;
             case 'p':insertparagraph();break;
         }
     })
     editor.document.designMode = 'on'
     function addBold() {
         editor.document.execCommand('Bold', false, null);
         document.execCommand('Bold', false, null)
     }
     function copy() {
         editor.document.execCommand('copy', false, null);
     }
     function big() {
         editor.document.execCommand('fontsize', false, '3');
         console.log(doc.body.innerHTML);
     }
     function italic() {
         editor.document.execCommand('italic', false, null);
     }
     function insertorderedlist() {
         editor.document.execCommand('insertorderedlist', false, null);
         console.log(doc.body.innerHTML);
     }
     function createlink() {
         editor.document.execCommand('createlink', false, 'https://www.baidu.com/')
     }
     function insertparagraph() {
         editor.document.execCommand('insertparagraph', false, null);
         console.log(doc.body.innerHTML);
     }
 }
```

### 富文本选区

**使用框架的getSelection()方法，可以确定实际选择的文本。这个方式是window对象和document对象的属性，调用它会返回一个表示当前选择文本的 Selection 对象**，每个Selection对象都有下列属性。
- anchorNode:选区起点所在的节点。
- anchorOffset: 在到达选区起点位置之前跳过的 anchorNode 中的字符数量
- focusNode: 选区终点所在的节点
- focusOffset: focusNode中包含在选区之内的字符数量
- isCollapsed: 布尔值，表示选区的起点和终点是否重合
- rangeCount: 选区中包含的DOM范围的数量

更多信息：

- addRange(range) ：将指定的 DOM 范围添加到选区中。
- collapse(node, offset) ：将选区折叠到指定节点中的相应的文本偏移位置
- collapseToEnd() ：将选区折叠到终点位置。
- collapseToStart() ：将选区折叠到起点位置。
- containsNode(node) ：确定指定的节点是否包含在选区中。
- deleteFromDocument() ：从文档中删除选区中的文本，与 document.execCommand("delete",false, null) 命令的结果相同。
- extend(node, offset) ：通过将 focusNode 和 focusOffset 移动到指定的值来扩展选区。
- getRangeAt(index) ：返回索引对应的选区中的 DOM 范围。
- removeAllRanges() ：从选区中移除所有 DOM 范围。实际上，这样会移除选区，因为选区中至少要有一个范围
- removeRange(range) ：从选区中移除指定的 DOM 范围。
- selectAllChildren(node) ：清除选区并选择指定节点的所有子节点。
- toString() ：返回选区所包含的文本内容。
    ```
    // 高亮选择的文本
    document.getElementById('bold').addEventListener('click', function (e) {
        let selection = frames['richedit'].getSelection(); // 获取选择的文本
        let selectedText = selection.toString(); // 取得选择的文本
        let range = selection.getRangeAt(0); // 取得代表选区的范围
        let span = frames['richedit'].document.createElement('span'); // 突出显示选择的文本
        span.style.backgroundColor = 'yellow';
        range.surroundContents(span); // 将选区添加到了带有黄色背景的 <span> 元素中
    }) 
    ```
    
### 表单与富文本

手工提取富文本编辑器中的HTML

```
 EventUtil.addHandler(form, "submit", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    target.elements["comments"].value = frames["richedit"].document.body.innerHTML;
 });
```    
```
// contenteditable元素
 EventUtil.addHandler(form, "submit", function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    target.elements["comments"].value = document.getElementById("richedit").innerHTML;
 });
```
    
## 小结

- Firefox、Safari 和 Chrome 只允许在 paste 事件发生时读取剪贴板数据，而 IE没有这个限制。    
- Firefox、Safari 和 Chrome 只允许在发生剪贴板事件时访问与剪贴板相关的信息，而 IE 允许在任何时候访问相关信息
- 在文本框内容必须限制为某些特定字符的情况下，就可以利用剪贴板事件来屏蔽通过粘贴向文本框中插入内容的操作。
- 选择框也是经常要通过 JavaScript 来控制的一个表单字段。由于有了 DOM，对选择框的操作比以前
  要方便多了。添加选项、移除选项、将选项从一个选择框移动到另一个选择框，甚至对选项进行排序等
  操作，都可以使用标准的 DOM技术来实现    
    
富文本编辑功能是通过一个包含空 HTML 文档的 iframe 元素来实现的。通过将空文档的
designMode 属性设置为 "on" ，就可以将该页面转换为可编辑状态，此时其表现如同字处理软件。另外，
也可以将某个元素设置为 contenteditable 。在默认情况下，可以将字体加粗或者将文本转换为斜体，
还可以使用剪贴板。JavaScript 通过使用 execCommand() 方法也可以实现相同的一些功能。另外，使用
queryCommandEnabled() 、 queryCommandState() 和 queryCommandValue() 方法则可以取得有关
文本选区的信息。由于以这种方式构建的富文本编辑器并不是一个表单字段，因此在将其内容提交给
服务器之前，必须将 iframe 或 contenteditable 元素中的 HTML 复制到一个表单字段中    
    
    
    
    
    

# 第15章：使用Canvas绘图

## 基本用法

- `<canvas id="drawing" width=" 200" height="200">A drawing of something.</canvas>`
- 取得上下文的引用：需要调用getContext() 方法并传入上下文的名字。传入 "2d" ，就可以取得 2D 上下文对象。
- 在使用 <canvas\> 元素之前，首先要检测 getContext() 方法是否存在，这一步非常重要
- 使用 toDataURL() 方法，可以导出在 <canvas\> 元素上绘制的图像。这个方法接受一个参数，即图像的 MIME 类型格式，而且适合用于创建图像的任何上下文。
    ```
    // 导出canvas，转换为图片
    let drawing = document.getElementById('drawing');
    if (drawing.getContext) {
        // let ctx = drawing.getContext('2d');
        let imgUrl = drawing.toDataURL('image/png');
        let image = document.createElement('img')
        image.src = imgUrl;
        document.body.appendChild(image);
    } 
    ```

> 如果绘制到画布上的图像源自不同的域， toDataURL() 方法会抛出错误。本章后面还将介绍更多相关内容。

## 2D上下文

### 填充和描边

- fillStyle 填充
- strokeStyle 描边

### 绘制矩形

- fillRect(),strokeRect()和clearRect()。这三个方法都接收4个参数： 矩形的x坐标，矩形的y坐标，矩形宽度和矩形高度。这些单位都是像素
- fillRect()方法在画布上绘制的矩形会填充指定的颜色
    ```
    let ctx = drawing.getContext('2d');
        // 绘制蓝色矩形
        ctx.fillStyle = '#00f';
        ctx.fillRect(10,10, 50, 50);
        // 绘制半透明的粉色矩形
        ctx.fillStyle = 'rgba(240,100,100,.5)';
        ctx.fillRect(30,30,50,50); 
    ```

- strokeRect()方法在画布上绘制的矩形会使用指定的颜色描边，描边颜色通过strokeStyle 属性制定
    ```
        // 绘制红色描边矩形
        ctx.strokeStyle = 'red';
        ctx.strokeRect(10,10,50,50);
        // 绘制半透明的蓝色描边矩形
        ctx.strokeStyle = 'rgba(0,0,255,.5)';
        ctx.strokeRect(30,30,50,50); 
    ```
    - 描边线条的宽度由lineWidth 属性控制，该属性的值可以是任意整数。在描边之前设定
    - lineCap 属性可以控制线条末端的形状是平头、圆头还是方头（ "butt" 、"round" 或 "square" ）
    - lineJoin 属性可以控制线条相交的方式是圆交、斜交还是斜接（ "round" 、 "bevel" 或 "miter" ）
- clearRect(),通过绘制形状，然后清楚制定区域。

### 绘制路径

**要绘制路径，必须先调用 beginPath() 方法，表示开始绘制新路径.**然后，通过下列方法来实际地绘制路径
- arc(x, y, radius, startAngle, endAngle, counterclockwise):以（x，y)为圆心绘制一条弧线，弧线半径为radius，起始和结束角度（弧度表示）分别为 startAngle 和 endAngle。最后一个参数表示 startAngle 和 endAngle 是否按逆时针方向计算，值为 false表示按顺时针方向计算。
- arcTo(x1, y1, x2, y2, radius) ：从上一点开始绘制一条弧线，到 (x2,y2) 为止，并且以给定的半径 radius 穿过 (x1,y1) 。
- bezierCurveTo(c1x, c1y, c2x, c2y, x, y) ：从上一点开始绘制一条曲线，到 (x,y) 为止，并且以 (c1x,c1y) 和 (c2x,c2y) 为控制点。
- lineTo(x, y) ：从上一点开始绘制一条直线，到 (x,y) 为止。
- moveTo(x, y) ：将绘图游标移动到 (x,y) ，不画线。
- quadraticCurveTo(cx, cy, x, y) ：从上一点开始绘制一条二次曲线，到 (x,y) 为止，并
  且以 (cx,cy) 作为控制点。
- rect(x, y, width, height) ：从点 (x,y) 开始绘制一个矩形，宽度和高度分别由 width 和 height 指定。这个方法绘制的是矩形路径，而不是 strokeRect() 和 fillRect() 所绘制的独立的形状。

> 如果想绘制一条连接到路径起点的线条，可以调用closePath() 。如果路径已经完成，你想用 fillStyle 填充它，可以调用 fill() 方法。另外，还可以调用 stroke()方法对路径描边，描边使用的是 strokeStyle 。最后还可以调用 clip() ，这个方法可以在路径上创建一个剪切区域。


```
// 绘制不带数字的始终表盘
// 开始路径
    ctx.beginPath();

    // 绘制外圆
    ctx.arc(100, 100, 99, 0, 2 * Math.PI, false);

    // 绘制内圆
    ctx.moveTo(194, 100);
    ctx.arc(100,100,94, 0, 2 * Math.PI, false);

    // 绘制分针
    ctx.moveTo(100, 100);
    ctx.lineTo(100, 15);

    // 绘制时针
    ctx.moveTo(100, 100);
    ctx.lineTo(35, 100);

    // 描边路径
    ctx.stroke(); 
```

在 2D 绘图上下文中，路径是一种主要的绘图方式，因为路径能为要绘制的图形提供更多控制。由
于路径的使用很频繁，所以就有了一个名为 isPointInPath() 的方法。这个方法接收 x 和 y 坐标作为参数，用于在路径被关闭之前确定画布上的某一点是否位于路径上

```
 if (context.isPointInPath(100, 100)){
    alert("Point (100, 100) is in the path.");
 }
```

### 绘制文本

- 绘制文本主要有两个方法：fillText()和strokeText().这两个方法都接收4个参数：要绘制的文本字符串、x坐标、y坐标和可选的最大像素宽度。都以下列3个属性为基础。
    - font: 表示文本的样式、大小及字体，用CSS中指定字体的格式来制定，例如：‘10px Arial’
    - textAlign: 表示文本对齐方式。可能的值有‘start’、‘end’、‘left’、‘right’和‘center'。建议使用‘start'和‘end’，不要使用‘left’和‘right’。
    - textBaseline: 表示文本的基线。可能的值有‘top’、‘hanging’、‘middle'、‘alphabetic'、ideographic和bottom.
    - 这几个属性都有默认值，没有必要每次使用都重新设置一遍。
    - fillText()方法使用fillStyle属性绘制文本，而strokeText()方法使用strokeStyle属性为文本描边。
- measureText().这个方法接受一个参数，即要绘制的文本；返回一个TextMetrics对象。返回的对象目前只有一个width属性。measureText() 方法利用 font 、 textAlign 和 textBaseline 的当前值计算指定文本的大小
    ```
    // 比如，假设你想在一个 140 像素宽的矩形区域中绘制文本 Hello world!，下面的代码从 100 像素的字体大小开始递减，最终会找到合适的字体大小
     var fontSize = 100;
         ctx.font = fontSize + 'px Arial';
         while(ctx.measureText('Hello world!').width > 130) {
             fontSize--;
             ctx.font = fontSize + 'px Arial';
         }
         ctx.fillText('Hello world!',10, 10);
         ctx.fillText('Font size is ' + fontSize + 'px', 10, 50);
    ```
-  fillText 和 strokeText() 方法都可以接收第四个参数，也就是文本的最大像素宽度.提供这个参数后，调用 fillText() 或时如果传入的字符串大于最大宽度，则绘制的文本字符的高度正确，但宽度会收缩以适应最大宽度。

### 变换

通过如下方法来修改变换矩阵
- rotate(angle) ：围绕原点旋转图像 angle 弧度
- scale(scaleX, scaleY) ：缩放图像，在 x 方向乘以 scaleX ，在 y 方向乘以 scaleY 。scaleX和 scaleY 的默认值都是 1.0
- translate(x, y) ：将坐标原点移动到 (x,y) 。执行这个变换之后，坐标(0,0)会变成之前由 (x,y)表示的点。
- transform(m1_1, m1_2, m2_1, m2_2, dx, dy) ：直接修改变换矩阵，方式是乘以如下矩阵。
    ```
      m1_1 m1_2 dx
      m2_1 m2_2 dy
      0 0 1 
    ```
- setTransform(m1_1, m1_2, m2_1, m2_2, dx, dy) ：将变换矩阵重置为默认状态，然后再调用 transform() 。

```
比如，就拿前面例子中绘制表针来说，
如果把原点变换到表盘的中心，然后再绘制表针就容易多了。请看下面的例子。
// 开始路径
    ctx.beginPath();
    // 绘制外圆
    ctx.arc(100,100,99,0,2*Math.PI, false)
    // 绘制内圆
    ctx.moveTo(194,100)
    ctx.arc(100,100,94,0, 2*Math.PI, false)

    // 变换原点
    ctx.translate(100,100)
    
    // 旋转表针
    ctx.rotate(1);
    // 绘制分针
    ctx.moveTo(0,0)
    ctx.lineTo(0,-85)
    // 绘制时针
    ctx.moveTo(0,0)
    ctx.lineTo(-65, 0);
    // 描边路径
    ctx.stroke() 
```

无论是刚才执行的变换，还是 **fillStyle 、 strokeStyle 等属性**，都会在当前上下文中一直有效，
除非再对上下文进行什么修改。虽然没有什么办法把上下文中的一切都重置回默认值，但有两个方法可
以跟踪上下文的状态变化。

> 如果你知道将来还要返回某组属性与变换的组合，可以调用 save() 方法。
  调用这个方法后，当时的所有设置都会进入一个栈结构，得以妥善保管。然后可以对上下文进行其他修
  改。等想要回到之前保存的设置时，可以调用 restore() 方法，在保存设置的栈结构中向前返回一级，
  恢复之前的状态。连续调用 save() 可以把更多设置保存到栈结构中，之后再连续调用 restore() 则可
  以一级一级返回。

```
ctx.fillStyle = '#f00'
    ctx.save();
    ctx.fillStyle = '#0f0'
    ctx.translate(100,100)
    ctx.save();

    ctx.fillStyle = '#00f'
    ctx.fillRect(0,0,100,200); //  从点（100，100）开始绘制蓝色矩形

    ctx.restore();
    ctx.fillRect(10,10,100,200); // 从点（110，110）开始绘制绿色矩形

    ctx.restore();
    ctx.fillRect(0,0,100,200); // 从点（0，0）开始绘制红色矩形 
    首先：将 fillStyle 设置为红色，并调用 save() 保存上下文状态
    其次：把 fillStyle 修改为绿色，把坐标原点变换到(100,100)，再调用 save() 保存上下文状态。
    然后：把 fillStyle 修改为蓝色并绘制蓝色的矩形。因为此时的坐标原点已经变了，所以矩形的左上角
          坐标实际上是(100,100)。
    
    然后调用 restore() ，之后 fillStyle 变回了绿色，因而第二个矩形就是绿色。之所以第二个矩形的起点坐标
            是(110,110)，是因为坐标位置的变换仍然起作用。
    再调用一次restore() ，变换就被取消了，而fillStyle 也返回了红色。
    所以最后一个矩形是红色的，而且绘制的起点是(0,0)
```
**需要注意的是， save() 方法保存的只是对绘图上下文的设置和变换，不会保存绘图上下文的内容。**

### 绘制图像

2D 绘图上下文内置了对图像的支持。如果你想把一幅图像绘制到画布上，可以使用 drawImage()方法。调用这个方法时，可以使用三种不同的参数组合。
- 最简单的调用方式是传入一个 HTML <img\> 元素，以及绘制该图像的起点的 x 和 y 坐标。
    ```
    var image = document.images[0];
    context.drawImage(image, 10, 10); 
    ```
- 如果你想改变绘制后图像的大小，可以再多传入两个参数，分别表示目标宽度和目标高度。
    ```
    context.drawImage(image, 50, 10, 20, 30); 
    // 执行代码后，绘制出来的图像大小会变成 20×30 像素
    ```
- 还可以选择把图像中的某个区域绘制到上下文中。 drawImage() 方法的这种调用方式总共需要传入 9 个参数：要绘制的图像、源图像的 x 坐标、源图像的 y 坐标、源图像的宽度、源图像的高度、目标图像的 x 坐标、目标图像的 y 坐标、目标图像的宽度、目标图像的高度。
    ```
    context.drawImage(image, 0, 10, 50, 50, 0, 100, 40, 60); 
    // 这行代码只会把原始图像的一部分绘制到画布上。原始图像的这一部分的起点为(0,10)，宽和高都
       是 50 像素。最终绘制到上下文中的图像的起点是(0,100)，而大小变成了 40×60 像素。
    ```
- 除了给 drawImage() 方法传入 HTML <img\> 元素外，还可以传入另一个 <canvas\> 元素作为其第一个参数。这样，就可以把另一个画布内容绘制到当前画布上。
- **操作的结果可以通过 toDataURL() 方法获得**,不过，有一个例外，即图像不能来自其他域。如果图像来自其他域，调用toDataURL() 会抛出一个错误.**但 toDataURL()是 Canvas 对象的方法，不是上下文对象的方法。**

### 阴影

2D 上下文会根据以下几个属性的值，自动为形状或路径绘制出阴影。
- shadowColor ：用 CSS 颜色格式表示的阴影颜色，默认为黑色。
- shadowOffsetX ：形状或路径 x 轴方向的阴影偏移量，默认为 0
- shadowOffsetY ：形状或路径 y 轴方向的阴影偏移量，默认为 0
- shadowBlur ：模糊的像素数，默认 0，即不模糊

### 渐变

渐变由 CanvasGradient 实例表示，很容易通过 2D 上下文来创建和修改。
- 要创建一个新的**线性渐变**，可以调用 createLinearGradient() 方法。这个方法接收 4 个参数：起点的 x 坐标、起点的 y 坐标、终点的 x 坐标、终点的 y 坐标。调用这个方法后，它就会创建一个指定大小的渐变，并返回CanvasGradient 对象的实例
- 创建了渐变对象后，下一步就是使用 addColorStop() 方法来指定色标。这个方法接收两个参数：色标位置和 CSS 颜色值。色标位置是一个 0（开始的颜色）到 1（结束的颜色）之间的数字
    ```
        var gradient = createRectLinearGradient(ctx,30,30,70,70)
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(1, 'black'); 
         // gradient 对象表示的是一个从画布上点(30,30)到点(70,70)的渐变。起点的色标是白色，终
         点的色标是黑色。然后就可以把 fillStyle 或 strokeStyle 设置为这个对象，从而使用渐变来绘制
         形状或描边
    ```
    ```
        // 绘制红色矩形
        ctx.fillStyle = '#f00'
        ctx.fillRect(10,10, 50,50);
    
        // 绘制渐变矩形
        ctx.fillStyle = gradient;
        ctx.fillRect(30,30,70,70); 
    ```
- 如果没有把矩形绘制到恰当的位置，那可能就只会显示部分渐变效果.确保渐变与形状对齐非常重要，有时候可以考虑使用函数来确保坐标合适。
    ```
     function createRectLinearGradient(ctx, x, y, width, height) {
         return ctx.createLinearGradient(x, y, x + width, y + height)
     }
     var gradient = createRectLinearGradient(ctx,30,30,70,70)
     gradient.addColorStop(0, 'white');
     gradient.addColorStop(1, 'black');
 
     // 绘制红色矩形
     ctx.fillStyle = '#f00'
     ctx.fillRect(10,10, 50,50);
 
     // 绘制渐变矩形
     ctx.fillStyle = gradient;
     ctx.fillRect(30,30,70,70);
    ```
- 创建**径向渐变**使用 createRadialGradient() 方法。接受6个参数。对应着两个圆的圆心和半径
    ```
    var gradient1 = ctx.createRadialGradient(55,55,10,55,55,30)
        gradient1.addColorStop(0, 'white');
        gradient1.addColorStop(1, 'black')
    
        ctx.fillStyle = '#f00'
        ctx.fillRect(10,10,50,50)
    
        ctx.fillStyle = gradient1;
        ctx.fillRect(30,30,50,50); 
    ```

### 模式

模式其实就是重复的图像，可以用来填充或描边图形。要创建一个新模式，可以调用 createPattern() 方法并传入两个参数：一个 HTML <img> 元素和一个表示如何重复图像的字符串。第二个参数的值与 CSS 的 background-repeat 属性值相同，包括 "repeat" 、 "repeat-x" 、"repeat-y" 和 "no-repeat" 。

```
    var image = document.images[0]
    var pattern = ctx.createPattern(image, 'repeat');
    
    // 绘制矩形
    ctx.fillStyle = pattern
    ctx.fillRect(10,10,600,600); 
```
- createPattern() 方法的第一个参数也可以是一个 <video> 元素，或者另一个 <canvas> 元素。

### 使用图像数据

2D 上下文的一个明显的长处就是，可以通过 getImageData() 取得原始图像数据。这个方法接收 4 个参数：要取得其数据的画面区域的 x 和 y 坐标以及该区域的像素宽度和高度。

```
    // 例如，要取得左上角坐标为(10,5)、大小为 50×50 像素的区域的图像数据，可以使用以下代码：
    var imageData = ctx.getImageData(10,5,50,50);
    
    // 这里返回的对象是 ImageData 的实例。每个 ImageData 对象都有三个属性： width 、 height 和
       data 。其中 data 属性是一个数组，保存着图像中每一个像素的数据。在 data 数组中，每一个像素用
       4 个元素来保存，分别表示红、绿、蓝和透明度值。因此，第一个像素的数据就保存在数组的第 0 到第
       3 个元素中
    var data = imageData.data,
        red = data[0],
        green = data[1],
        blue = data[2],
        alpha = data[3];
```
```
// 例如，通过修改图像数据，可以像下面这样创建一个简单的灰阶过滤器。
let drawing = document.getElementById('drawing');
if (drawing.getContext) {
    let ctx = drawing.getContext('2d'),
        image = document.images[0],
        imageData, data,
        i, len, average,
        red, green, blue, alpha;

    // 绘制原始图像
    ctx.drawImage(image, 0, 0);

    // 取得图像数据
    imageData = ctx.getImageData(0,0,image.width, image.height);
    data = imageData.data;

    for (i = 0, len = data.length; i < len; i+=4) {
        red = data[i];
        green = data[i + 1];
        blue = data[i + 2];
        alpha = data[i + 3];

        average = Math.floor((red + green + blue) / 3);
        data[i] = average;
        data[i + 1] = average;
        data[i + 2] = average;
    }
    // 回写图像数据并显示结果
    imageData.data = data;
    ctx.putImageData(imageData, 0, 0);
} 
// 这个例子首先在画面上绘制了一幅图像，然后取得了原始图像数据。其中的 for 循环遍历了图像数
   据中的每一个像素。这里要注意的是，每次循环控制变量 i 都递增 4。在取得每个像素的红、绿、蓝颜
   色值后，计算出它们的平均值。再把这个平均值设置为每个颜色的值，结果就是去掉了每个像素的颜色，
   只保留了亮度接近的灰度值（即彩色变黑白）。在把 data 数组回写到 imageData 对象后，调用
   putImageData() 方法把图像数据绘制到画布上。最终得到了图像的黑白版。
```

### 合成

- globalAlpha 是一个介于0和1之间的值（包括0和1），用于指定所有绘制的透明度。默认为0.如果后续所有操作都要基于相同的透明度，就可以先把globalAlpha设置为恰当的值，然后绘制，最后再把它设置回默认值0.
    ```
    // 绘制红色矩形
        ctx.fillStyle = '#f00'
        ctx.fillRect(10,10,50,50)
    
        // 修改全局透明度
        ctx.globalAlpha = 0.5;
    
        // 绘制蓝色矩形
        ctx.fillStyle = 'rgba(0,0,255,1)'
        ctx.fillRect(30,30,50,50)
        
        // 重置全局透明度
        ctx.globalAlpha = 0; 
    ```
- globalCompositionOperation 表示后绘制的图形怎样与先绘制的图形结合。这个属性的值是字符串，可能的值如下：
    - source-over （默认值）：后绘制的图形位于先绘制的图形上方。
    - source-in ：后绘制的图形与先绘制的图形重叠的部分可见，两者其他部分完全透明
    - source-out ：后绘制的图形与先绘制的图形不重叠的部分可见，先绘制的图形完全透明
    - source-atop ：后绘制的图形与先绘制的图形重叠的部分可见，先绘制图形不受影响。
    - destination-over ：后绘制的图形位于先绘制的图形下方，只有之前透明像素下的部分才可见。
    - destination-in ：后绘制的图形位于先绘制的图形下方，两者不重叠的部分完全透明
    - destination-out ：后绘制的图形擦除与先绘制的图形重叠的部分
    - destination-atop ：后绘制的图形位于先绘制的图形下方，在两者不重叠的地方，先绘制的图形会变透明
    - lighter ：后绘制的图形与先绘制的图形重叠部分的值相加，使该部分变亮
    - copy ：后绘制的图形完全替代与之重叠的先绘制图形
    - xor ：后绘制的图形与先绘制的图形重叠的部分执行“异或”操作。
    ```
    ctx.fillStyle = '#f00'
    ctx.fillRect(10,10,50,50)
    
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = 'rgba(0,0,255,1)'
    ctx.fillRect(30,30,50,50) 
    如果不修改 globalCompositionOperation ，那么蓝色矩形应该位于红色矩形之上。但把
    globalCompositionOperation 设置为 "destination-over" 之后，红色矩形跑到了蓝色矩形上面。
    ```

## WebGL

### 类型化数组

WebGL 涉及的复杂计算需要提前知道数值的精度，而标准的 JavaScript 数值无法满足需要。因此，WebGL引入了一个概念，叫类型化数组。类型化数组也是数组，只不过其元素被设置为特定类型的值。

> 类型化数组的核心就是一个名为 ArrayBuffer 的类型。每个 ArrayBuffer 对象表示的只是内存
  中指定的字节数，但不会指定这些字节用于保存什么类型的数据。通过 ArrayBuffer 所能做的，就是
  为了将来使用而分配一定数量的字节。例如，下面这行代码会在内存中分配 20B
  ```
  var buffer = new ArrayBuffer(20) 
  
  // 创建了 ArrayBuffer 对象后，能够通过该对象获得的信息只有它包含的字节数，方法是访问其
     byteLength 属性
     var bytes = buffer.byteLength;
  ```

**1.视图**

- 使用 ArrayBuffer （数组缓冲器类型）的一种特别的方式就是用它来创建数组缓冲器视图.其中，最常见的视图是 DataView ，通过它可以选择 ArrayBuffer 中一小段字节。为此，可以在创建 DataView 实例的时候传入一个 ArrayBuffer 、一个可选的字节偏移量（从该字节开始选择）和一个可选的要选择的字节数
    ```
    // 基于整个缓冲器创建一个新视图
    var view = new DataView(buffer);
    // 创建一个开始于字节 9 的新视图
    var view = new DataView(buffer, 9)
    // 创建一个从字节 9 开始到字节 18 的新视图
    var view = new DataView(buffer, 9 , 10);
    
    // 实例化之后， DataView 对象会把字节偏移量以及字节长度信息分别保存在 byteOffset 和
       byteLength 属性中。 
    ```







