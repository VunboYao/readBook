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
- HTML5 新增了 hashchange 事件，以便在 URL 的参数列表（及 URL 中“#”号后面的所有字符串）
  发生变化时通知开发人员。
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
多选列表|<select multiple\>...</select\>|'select-multiple'
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
        return window.clipboardData.setData('text/plain', newText);
    }
}); 
```

> 禁止复制、剪切、右键等。事件 return false 或者 e.preventDefault()阻止默认事件。
> CSS 中 user-select: none; 禁止文本选择














