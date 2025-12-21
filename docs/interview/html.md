---
sidebar_position: 1
title: HTML（面试要点）
---

## HTML5有哪些新特性？

1. **语义化标签**：`<header>`、`<nav>`、`<main>`、`<article>`、`<section>`、`<aside>`、`<footer>` 等，使代码结构更清晰，有利于SEO和无障碍访问。
2. **表单功能增强**：新增多种input类型（email、url、number、range、date等）和属性（placeholder、required、autofocus等），提供更好的用户输入体验和数据验证。
3. **多媒体支持**：`<video>` 和 `<audio>` 标签原生支持音视频播放，无需Flash插件。
4. **图形绘制**：`<canvas>` 用于2D/3D图形绘制；SVG支持矢量图形。
5. **拖放API**：通过 `draggable` 属性和相关事件实现元素拖拽功能。
6. **Web存储**：localStorage（持久化存储）和 sessionStorage（会话存储）替代cookie，提供更大的存储空间和更好的性能。
7. **地理定位**：Geolocation API允许获取用户地理位置信息。
8. **Web Workers**：允许JavaScript在后台线程中运行，避免阻塞UI。
9. **WebSocket**：实现服务器和客户端之间的全双工通信。
10. **离线应用**：Application Cache和Service Workers支持离线访问。

## display: inline、display: block 和 display: inline-block 有什么区别？

- **display: inline;** 
  - 元素显示为行内元素，不会独占一行
  - 无法设置width和height属性
  - margin和padding的上下部分不会影响其他元素
  - 典型例子：`<span>`、`<a>`、`<strong>`

- **display: block;**
  - 元素显示为块级元素，独占一行
  - 可以设置width、height、margin、padding等所有属性
  - 默认宽度为父元素的100%
  - 典型例子：`<div>`、`<p>`、`<h1>-<h6>`

- **display: inline-block;**
  - 结合了inline和block的特性
  - 元素不会独占一行（类似inline）
  - 可以设置width、height、margin、padding等所有属性（类似block）
  - 典型例子：按钮、图标等需要并排显示但又需要设置尺寸的元素

## link和@import引入CSS样式有什么区别？

- **从属关系**：
  - `<link>` 是HTML标签，属于HTML范畴
  - `@import` 是CSS提供的规则，属于CSS范畴

- **加载顺序**：
  - `<link>` 在页面加载时同时加载CSS文件
  - `@import` 在页面全部下载完后再加载CSS文件，可能导致页面闪烁

- **兼容性**：
  - `<link>` 兼容所有浏览器
  - `@import` 在IE5以下版本不被支持

- **DOM操作**：
  - `<link>` 可以通过JavaScript操作DOM动态添加或修改
  - `@import` 无法通过JavaScript动态操作

- **权重**：
  - `<link>` 引入的CSS文件权重高于`@import`

## title与h1标签、b与strong标签、i与em标签有什么区别？

### title与h1的区别：

**title**：
- 位于HTML文档的`<head>`部分，不在页面正文中显示
- 作为浏览器标签页标题和搜索引擎结果页面的标题显示
- 对SEO非常重要，是搜索引擎判断页面内容的重要依据

**h1**：
- 位于HTML文档的`<body>`部分，在页面正文中显示
- 代表页面主要内容的标题
- 对SEO同样重要，但重要性略低于title

### b与strong的区别：

**b标签**：
- 仅表示文本应该以粗体显示，无语义含义
- 纯粹的样式标签

**strong标签**：
- 表示文本内容具有很强的重要性、严重性或紧急性
- 具有语义含义，有助于SEO和无障碍访问
- 屏幕阅读器会对strong标签的内容加重语气

### i与em的区别：

**i标签**：
- 仅表示文本应该以斜体显示，无语义含义
- 通常用于表示专业术语、外来语等

**em标签**：
- 表示文本内容需要强调
- 具有语义含义，有助于SEO和无障碍访问
- 屏幕阅读器会对em标签的内容加重语气

## img标签的title和alt属性有什么区别？

**alt属性**：
- 当图片无法加载时显示的替代文本
- 对SEO和无障碍访问至关重要
- 搜索引擎通过alt文本理解图片内容
- 屏幕阅读器会朗读alt文本给视障用户

**title属性**：
- 鼠标悬停在图片上时显示的提示文本
- 对SEO帮助较小
- 不会被屏幕阅读器主动读取
- 主要用于提供额外的信息说明

## 什么是语义化标签？使用语义化标签有什么好处？

**语义化标签定义**：
语义化标签是指能够清楚表达其包含内容含义和作用的HTML标签，不仅用于页面布局或样式展示，更重要的是传达内容的结构和意义。

**常见的语义化标签**：
- `<header>`：页面或章节的头部
- `<nav>`：导航链接
- `<main>`：页面主要内容
- `<article>`：独立的文章内容
- `<section>`：文档中的节
- `<aside>`：侧边栏内容
- `<footer>`：页面或章节的底部

**语义化的好处**：
1. **提高代码可读性和可维护性**：开发者能更容易理解页面结构
2. **有利于SEO**：搜索引擎更好地理解页面内容和结构
3. **提升无障碍体验**：屏幕阅读器能更准确地解读页面内容
4. **便于团队协作**：统一的语义化标准有助于团队沟通
5. **适应未来发展**：符合Web标准，便于新技术的应用

## 为什么img标签的src属性不能为空？应该如何正确处理？

**空src的问题**：

1. **违反HTML规范**：src是`<img>`标签的必需属性，不能为空
2. **无效HTTP请求**：浏览器会向当前页面URL发起图片请求，造成404错误和日志污染
3. **可访问性问题**：屏幕阅读器无法正确识别图片用途
4. **布局偏移**：即使src为空，浏览器仍会为`<img>`保留占位空间，可能导致布局抖动
5. **性能浪费**：不必要的网络请求消耗带宽和处理时间

**正确做法**：

- **使用有效图片URL**：确保src指向有效的图片资源
- **条件渲染**：如果图片是可选的，应在URL存在时才渲染`<img>`标签
- **占位图**：使用默认占位图或灰色背景作为临时显示
- **懒加载**：使用`loading="lazy"`属性延迟加载非关键图片
- **始终提供alt文本**：为所有图片提供有意义的alt描述
- **装饰性图片**：如果是纯装饰用途，可使用`role="presentation"`或CSS背景图

## 示例：拖放与无障碍图片

### 拖放示例：

```html
<div id="drag" draggable="true">拖动我</div>
<div id="drop">放到这里</div>

<script>
const drag = document.getElementById('drag');
const drop = document.getElementById('drop');

drag.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', 'drag-data');
});

drop.addEventListener('dragover', (e) => e.preventDefault());
drop.addEventListener('drop', (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  drop.textContent = '已放下: ' + data;
});
</script>
```

### 无障碍图片写法示例：

```html
<img src="/assets/avatar.jpg" alt="作者头像：张三，前端工程师" title="张三">
```

---

(文件已按"题目 + 答案"格式写入 `html.md`，覆盖原有简短版，便于面试复习与打印。)