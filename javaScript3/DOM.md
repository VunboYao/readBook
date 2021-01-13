# 元素尺寸

## 偏移尺寸

`offsetLeft`: 当前元素边框（左边框），距离父级元素内测的距离。约为**父级元素的padding**, **当前元素的margin**之和

`offsetTop`: 当前元素边框（上边框），距离父级元素内测的距离。约为**父级元素的padding, 当前元素的margin**之和

`offsetWidth`：元素水平方向尺寸，包含：宽度、垂直滚动条宽度、左右边框的宽度

`offsetHeight`：元素垂直方向尺寸，包含：高度、水平滚动条高度、上下边框的宽度

- 判断一个元素在页面中的偏移量，可以把它的`offsetLeft`和`offsetTop`属性分别与`offsetParent`的相同属性相加。

  ```js
    function getElementLeft(element) {
    	let actualLeft = element.offsetLeft
      let current = element.offsetParent
      while (current !== null) {
    		actualLeft += current.offsetLeft
        current = current.offsetParent
      }
      return actualLeft
    }
  ```

- **所有偏移尺寸属性都是只读的，每次访问会重新计算**

## 客户端尺寸

`clientWidth`、`clientHeight`。**等于视口的大小**

元素的宽度加左、右内边距宽度。不包含滚动条占用的空间。常用于确认浏览器视口尺寸。

## 滚动尺寸

`scrollHeight`，没有滚动条出现时，元素内容的总高度。**等于文档内容的高度**

`scrollLeft`，内容左侧隐藏的像素数，设置这个属性可以改变元素的滚动位置

`scrollTop`, 内容区顶部隐藏的像素数，设置这个属性可以改变元素的滚动位置

`scrollWidth`，没有滚动条出现时，元素的内容的总宽度。**等于文档内容的宽度**

- `document.documentElement.scrollHeight`，是整个页面垂直方向的总高度

# DOM

- 根节点的唯一子节点是`<html>`元素， 称为**文档元素（`documentElement`）**

## 节点关系

- 每个节点都有一个**实时**的`childNodes`属性，可通过中括号或`item()`方法访问
- 每个节点都有一个`parentNode`属性，指向其父元素。`childNodes`中所有节点都有同一个父元素
- `childNodes`中每个节点都是同一列表中其他节点的同胞节点。`previousSibling`和`nextSibling`

-  `firstChild` 和 `lastChild` 分别指向`childNodes` 中的第一个和最后一个子节点
- **`hasChildNodes（）`**，如果方法返回true, 说明有一个或多个子节点。

- **`ownerDocument`** 每个节点都有该属性。指向代表整个文档的文档节点的指针。

## 操纵节点

-  **`appendChild()`** 方法用于在 `childNodes `列表末尾添加节点，并**返回新添加的节点**

- **`insertBefore()`** 方法接收两个参数：要插入的节点和参照节点，**要插入的节点会变成参照节点的**
  **前一个同胞节点，并被返回**

- **`replaceChild()`** 方法接收两个参数：要插入的节点和要替换的节点。**要替换的节点会被返回并从文档**
  **树中完全移除。**
- **`removeChild()`** 方法。这个方法接收一个参数，即要移除的节点。被移除的节点会被返回

- **上面介绍的 4 个方法都用于操纵某个节点的子元素，也就是说使用它们之前必须先取得父节点**

- `cloneNode()` ，会返回与调用它的节点一模一样的节点。 `cloneNode()` 方法接收一个布尔值参数，表示是否深复制。**尚未指定父节点，只复制HTML属性，不会复制JS属性**
- **normalize()** ，处理文档子树中的文本节点。

## Document类型

文档对象 document 是 `HTMLDocument` 的实例（`HTMLDocument`继承自Document），表示整个页面。document是 window对象的属性，因此是一个全局对象

- `nodeType` 等于9
- `document.documentElement`属性，始终指向HTML页面中的<html>元素
- `document.body`属性，直接指向<body>元素

- 其他可读属性：`title、Url、domain、referrer`（来源）

## 定位元素

- `document.getElementById()`， 获取ID

- `document.getElementsByTagName()`, 获取元素标签名，返回零个或多个元素的`NodeList`。在 HTML 文档中，这个方法返回一个`HTMLCollection` 对象。

- **`HTMLCollection`** 对象还有一个额外的方法 **`namedItem()`** ，可通过标签的 name 属性取得某一项的引用

  ```js
  <img src="myimage.gif" name="myImage">
  let images = document.getElementsByTagName("img");
  let myImage = images.namedItem("myImage");
  // 对 HTMLCollection 对象而言，中括号既可以接收数值索引，也可以接收字符串索引。而在后台，
  // 数值索引会调用 item() ，字符串索引会调用 namedItem() 。
  ```

- `document.getElementsByName()`，返回具有给定 name 属性的所有元素。

  ```javascript
  let radios = document.getElementsByName("color")
      for (let i = 0; i < radios.length; i++) {
          if (radios[i].checked) {
              console.log(radios[i].value)
          }
      }
  // 获取单选框并获取其中的值
  ```

- `document.anchors`包含文档中所有带 name 属性的 <a> 元素
- `document.forms` 包含文档中所有 <form> 元素（与 `document.getElementsByTagName ("form")`返回的结果相同）
- `document.images` 包含文档中所有 <img> 元素（与` document.getElementsByTagName ("img")`返回的结果相同）

- `document.links` 包含文档中所有带 `href` 属性的 <a> 元素。

## Element 类型

- `nodeType` 等于1
- `parentNode`值为 `Document`或`Element`对象
- 可以通过`nodeName`或`tagName`属性来获取元素的标签名。**返回同样的值**
- **在 HTML 中，元素标签名始终以全大写表示**

### 获取元素的属性

- ` getAttribute()`， 属性名与它们实际的属性名是一样的，因此**针对类名传`class`**。**也能取得不是 HTML 语言正式属性的自定义属性的值**
- `setAttribute()`， 接收两个参数：要设置的属性名和属性的值

- `removeAttribute()`

- 自定义属性名应该前缀 **data-** 以方便验证

### 创建元素

使用`document.createElement()` 方法创建新元素

## Text类型

- `nodeType` 等于3
- `parentNode` 的值为 Element 对象

## `DocumentFragment` 类型

- `nodeType` 等于 11

- `document.createDocumentFragment()`， 创建文档片段

# DOM 扩展

- `querySelector()`，接收 CSS 选择符参数，返回匹配该模式的第一个后代元素，如果没有匹配
  项则返回 `null`
- ` querySelectorAll()`.接收一个用于查询的参数，但它会返回所有匹配的节点，而不止一个**.这个方法返回的是一个 `NodeList` 的静态实例。非“实时”的查询**
- `matches`，使用这个方法可以方便地检测某个元素会不会被 `querySelector()` 或 `querySelectorAll() `方法返回。匹配则返回true, 否则返回 false

## 元素遍历

Element Traversal API 为 DOM 元素添加了 5 个属性**IE9及以上，现代浏览器都支持该属性**

- `childElementCount`, 返回子元素数量（不包含文本节点和注释）
- `firstElementChild`，指向第一个 Element 类型的子元素（ `Element 版 firstChild` ）
- `lastElementChild`，指向最后一个 Element 类型的子元素（ `Element 版 lastChild` ）；
- `previousElementSibling` ， 指 向 前 一 个 Element 类 型 的 同 胞 元 素
- `nextElementSibling` ，指向后一个 Element 类型的同胞元素

## HTML5

### CSS类扩展

- **`getElementsByClassName()`**，接收一个参数，即包含一个或**多个类名**的字符串，返回类名中包含相应类的元素的 `NodeList` 。如果提供了多个类名，则顺序无关紧要。

- **`classList属性`**: 是一个新的集合类型 `DOMTokenList` 的实例。与其他 DOM 集合类型一样.`DOMTokenList`也有 length 属性表示自己包含多少项，也可以通过 **`item()` 或中括号**取得个别的元素
  - add(value):向类名列表中添加指定的字符串值 value 。如果这个值已经存在，则什么也不做
  - contains(value) ，返回布尔值，表示给定的 value 是否存在
  - remove(value) ，从类名列表中删除指定的字符串值 value
  - toggle(value) ，如果类名列表中已经存在指定的 value ，则删除；如果不存在，则添加

### 焦点管理

- `document.activeElement`，始终包含当前拥有焦点的**DOM**元素。默认情况下, 在页面刚加载完之后会设置为 `document.body` 。而在页面完全加载之前， `document.activeElement` 的值为 null 。

- `document.hasFocus()` 方法, 该方法返回布尔值，表示文档是否拥有焦点。*确定文档是否获得了焦点，就可以帮助确定用户是否在操作页面。*

### `HTMLDocument`扩展

- `document.readyState属性`
  - `loading`， 表示文档正在加载
  - `complete`， 表示文档加载完成
- `document.compatMode`属性
  - `CSS1Compat`， 标准模式
  - `BackCompat`， 混合模式

### 字符集属性

`document.characterSet`属性表示文档实际使用的字符集，也可以指定新字符集。

### 自定义数据属性

- HTML5允许使用前缀 **`data-`** 为元素指定非标准的属性。
- 可通过元素的 **`dataset`** 属性访问，data-my-name 需要 myName 来访问

### 插入标记

- innerHTML属性。根据提供的字符串值以新的 DOM 子树**替代元素中原来包含的所有节点**

- outerHTML 属性，**调用它的元素**会被传入的 HTML 字符串经解释之后生成的 DOM 子树取代

- `insertAdjacentHTML()`与`insertAdjacentText()`: 接收两个参数：要插入标记的位置和要插入的 HTML 或文本
  - "beforebegin" ，插入当前元素前面，作为前一个同胞节点
  - "afterbegin" ，插入当前元素内部，作为新的子节点或放在第一个子节点前面
  - "beforeend" ，插入当前元素内部，作为新的子节点或放在最后一个子节点后面
  - "afterend" ，插入当前元素后面，作为下一个同胞节点

# DOM2和DOM3

## 样式

- Dom2 Style规定 float 在 style 对象中对应的属性是 cssFloat
- JS 中 CSS 属性必须使用**驼峰大小写**形式

## DOM 样式属性和方法

- **cssText**， 存取样式的 CSS 代码。**是一次性修改元素多个样式最快捷的方式**
- length, 应用给元素的 CSS 属性数量
- `getPropertyPriority(propertyName)`, 如果 CSS 属性 `propertyName` 使用了 !important 则返回 “important", 否则返回空字符串
- `getPropertyValue(propertyName)`， 返回属性 *propertyName* 的字符串值

## 计算样式

- `document.defaultView`, 该属性返回当前 `document `对象所关联的 `window` 对象，如果没有，会返回 `null`。只读
- **`getComputedStyle()`**方法返回一个 CSSStyleDeclaration对象，包含元素的计算样式。**只读**。包含自身style属性的样式与`<style></style>`表中样式，以及`<link>`引入的样式

## 操作样式表

`document.styleSheets`属性

- `disabled`， 布尔值，表示样式表是否被禁用。**可读写**
- `href`， 如果是使用`<link>`包含的样式表，则返回样式表的 `URL`，否则返回 **null**
- `ownerNode`, 指向拥有当前样式表的节点。在HTML中要么是`<link>`元素要么是`<style>`元素

## 确定元素的尺寸

`element.getBoundingClientRect()`, 返回6个属性：`left, top, right, bottom, height, width`。**只读**
