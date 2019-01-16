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
    // 300的误差即继续加载
    if (top > (allH - crH - 500)) { // 加载区间判定
        if (flag) {
            // 中间件判定正在加载
            flag = false;
            loading.style.display = 'block'; // 显示loading
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
            f();
        }
    }
}) 
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

> 使用以下代码可以检测浏览器是否支持以上 DOM2 级事件（除 dbclick 、 mouseenter 和mouseleave 之外）：`var isSupported = document.implementation.hasFeature("MouseEvents", "2.0");`

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

**所有非字符键的键码**

![keycode](http://www.vunbo.com/usr/uploads/2019/01/3685867797.png)















































































































