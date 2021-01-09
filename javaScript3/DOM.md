# 元素尺寸

## 偏移尺寸

`offsetLeft`: 当前元素边框（左边框），距离父级元素内测的距离。约为**父级元素的padding**, **当前元素的margin**之和

`offsetTop`: 当前元素边框（上边框），距离父级元素内测的距离。约为**父级元素的padding, 当前元素的margin**之和

`offsetWidth`：元素水平方向尺寸，包含：宽度、垂直滚动条宽度、左右边框的宽度

`offsetHeight`：元素垂直方向尺寸，包含：高度、水平滚动条高度、上下边框的宽度

## 客户端尺寸

`clientWidth`、`clientHeight`

元素的宽度加左、右内边距宽度。不包含滚动条占用的空间。常用于确认浏览器视口尺寸。

# DOM

- 根节点的唯一子节点是`<html>`元素， 称为**文档元素（documentElement）**

## 节点关系

- 每个节点都有一个**实时**的`childNodes`属性，可通过中括号或`item()`方法访问
- 每个节点都有一个`parentNode`属性，指向其父元素。`childNodes`中所有节点都有同一个父元素
- `childNodes`中每个节点都是同一列表中其他节点的同胞节点。`previousSibling`和`nextSibling`

-  `firstChild` 和 `lastChild` 分别指向`childNodes` 中的第一个和最后一个子节点
- **hasChildNodes（）**，如果方法返回true, 说明有一个或多个子节点。

- **ownerDocument** 每个节点都有该属性。指向代表整个文档的文档节点的指针。

## 操纵节点

-  **appendChild()** 方法用于在 childNodes 列表末尾添加节点，并**返回新添加的节点**

- **insertBefore**() 方法接收两个参数：要插入的节点和参照节点，**要插入的节点会变成参照节点的**
  **前一个同胞节点，并被返回**

- **replaceChild()** 方法接收两个参数：要插入的节点和要替换的节点。**要替换的节点会被返回并从文档**
  **树中完全移除。**
- **removeChild()** 方法。这个方法接收一个参数，即要移除的节点。被移除的节点会被返回

- **上面介绍的 4 个方法都用于操纵某个节点的子元素，也就是说使用它们之前必须先取得父节点**

- cloneNode() ，会返回与调用它的节点一模一样的节点。 cloneNode() 方法接收一个布尔值参数，表示是否深复制。**尚未指定父节点，只复制HTML属性，不会复制JS属性**
- **normalize()** ，处理文档子树中的文本节点。

## Document类型

文档对象 document 是 HTMLDocument 的实例（HTMLDocument继承自Document），表示整个页面。document是 window对象的属性，因此是一个全局对象

- nodeType 等于9
- `document.documentElement`属性，始终指向HTML页面中的<html>元素
- `document.body`属性，直接指向<body>元素

- 其他可读属性：title、Url、domain、referrer（来源）

## 定位元素

- `document.getElementById()`， 获取ID

- `document.getElementsByTagName()`, 获取元素标签名，返回零个或多个元素的NodeList。在 HTML 文档中，这个方法返回一个HTMLCollection 对象。

- **HTMLCollection** 对象还有一个额外的方法 **namedItem()** ，可通过标签的 name 属性取得某一项的引用

  ```js
  <img src="myimage.gif" name="myImage">
  let images = document.getElementsByTagName("img");
  let myImage = images.namedItem("myImage");
  // 对 HTMLCollection 对象而言，中括号既可以接收数值索引，也可以接收字符串索引。而在后台，
  // 数值索引会调用 item() ，字符串索引会调用 namedItem() 。
  ```

- `document. getElementsByName()`， 返回具有给定 name 属性的所有元素。

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
- ` querySelectorAll()`.接收一个用于查询的参数，但它会返回所有匹配的节点，而不止一个**.这个方法返回的是一个 NodeList 的静态实例。非“实时”的查询**
- `matches`，使用这个方法可以方便地检测某个元素会不会被 querySelector() 或 querySelectorAll() 方法返回。匹配则返回true, 否则返回 false

## 元素遍历

