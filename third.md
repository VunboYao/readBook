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

































































































































































































