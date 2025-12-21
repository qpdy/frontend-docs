---
sidebar_position: 1
title: HTML（面试要点）
---

## 1. HTML5有哪些新特性？

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

## 2. display: inline、display: block 和 display: inline-block 有什么区别？

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

## 3. link和@import引入CSS样式有什么区别？

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

## 4. title与h1标签、b与strong标签、i与em标签有什么区别？

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

## 5. img标签的title和alt属性有什么区别？

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

## 6. 什么是语义化标签？使用语义化标签有什么好处？

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

## 7. 为什么img标签的src属性不能为空？应该如何正确处理？

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

## 8. DOCTYPE有什么作用？

**DOCTYPE的作用**：

DOCTYPE（Document Type Declaration，文档类型声明）是HTML文档的第一行声明，用于告诉浏览器应该使用哪种HTML或XHTML规范来解析文档。

**主要作用**：

1. **触发标准模式**：声明DOCTYPE可以让浏览器以标准模式（Standards Mode）渲染页面，确保页面在不同浏览器中表现一致
2. **避免怪异模式**：如果没有DOCTYPE声明，浏览器会进入怪异模式（Quirks Mode），导致CSS渲染和JavaScript行为不一致
3. **验证文档**：帮助验证器检查HTML文档是否符合规范

**HTML5的DOCTYPE**：

```html
<!DOCTYPE html>
```

**特点**：
- 简洁明了，不区分大小写
- 向后兼容，适用于所有现代浏览器
- 不需要引用DTD（Document Type Definition）

## 9. 行内元素、块级元素和空元素分别有哪些？

### 行内元素（Inline Elements）

行内元素不会独占一行，只占据它所需要的宽度。

**常见行内元素**：
- `<span>`：通用行内容器
- `<a>`：超链接
- `<strong>`、`<b>`：粗体文本
- `<em>`、`<i>`：斜体文本
- `<img>`：图片
- `<input>`：输入框
- `<label>`：表单标签
- `<select>`：下拉列表
- `<textarea>`：多行文本框
- `<br>`：换行
- `<code>`：代码片段

### 块级元素（Block Elements）

块级元素会独占一行，宽度默认为父元素的100%。

**常见块级元素**：
- `<div>`：通用块级容器
- `<p>`：段落
- `<h1>`-`<h6>`：标题
- `<ul>`、`<ol>`、`<li>`：列表
- `<table>`：表格
- `<form>`：表单
- `<header>`、`<footer>`、`<nav>`、`<section>`、`<article>`、`<aside>`：HTML5语义化标签
- `<pre>`：预格式化文本
- `<blockquote>`：引用块

### 空元素（Void Elements）

空元素是没有内容的HTML元素，不需要闭合标签。

**常见空元素**：
- `<br>`：换行
- `<hr>`：水平分割线
- `<img>`：图片
- `<input>`：输入框
- `<link>`：引入外部资源
- `<meta>`：元数据
- `<area>`：图像映射区域
- `<base>`：基础URL
- `<col>`：表格列属性
- `<embed>`：嵌入外部内容
- `<source>`：媒体资源
- `<track>`：文本轨道
- `<wbr>`：可能的换行点

## 10. iframe有哪些优缺点？

### iframe的优点：

1. **页面隔离**：iframe内容与主页面隔离，样式和脚本互不影响
2. **模块化加载**：可以在页面中嵌入独立的HTML页面，实现模块化
3. **跨域内容展示**：可以嵌入第三方网站内容（如地图、视频等）
4. **并行加载**：iframe可以与主页面并行加载，不会阻塞主页面渲染
5. **历史记录管理**：iframe有自己的浏览历史，不影响主页面

### iframe的缺点：

1. **SEO不友好**：搜索引擎难以索引iframe内的内容
2. **增加HTTP请求**：每个iframe都会产生额外的HTTP请求，影响性能
3. **阻塞主页面加载**：iframe会阻塞主页面的onload事件
4. **移动端体验差**：在移动设备上，iframe可能导致滚动和触摸问题
5. **安全风险**：如果嵌入不可信的第三方内容，可能存在XSS攻击风险
6. **内存占用**：每个iframe都是一个完整的document，占用较多内存
7. **响应式布局困难**：iframe固定尺寸，难以实现响应式设计

### 安全使用iframe的建议：

```html
<!-- 使用sandbox属性限制iframe权限 -->
<iframe 
  src="https://example.com" 
  sandbox="allow-scripts allow-same-origin"
  loading="lazy"
  title="示例页面"
></iframe>
```

**sandbox属性值**：
- `allow-scripts`：允许执行脚本
- `allow-same-origin`：允许同源访问
- `allow-forms`：允许表单提交
- `allow-popups`：允许弹出窗口
- `allow-top-navigation`：允许导航到顶层窗口

## 11. HTML5的离线存储如何工作？

### 离线存储方案对比：

| 特性 | Cookie | localStorage | sessionStorage | IndexedDB |
|------|--------|-------------|----------------|----------|
| 存储大小 | 4KB | 5-10MB | 5-10MB | >250MB |
| 生命周期 | 可设置过期时间 | 永久存储 | 会话结束时清除 | 永久存储 |
| 与服务器通信 | 每次HTTP请求都会携带 | 不会自动发送 | 不会自动发送 | 不会自动发送 |
| 使用场景 | 身份验证、追踪 | 本地缓存 | 临时数据 | 大量结构化数据 |

### localStorage使用示例：

```javascript
// 存储数据
localStorage.setItem('username', '张三');
localStorage.setItem('userInfo', JSON.stringify({ name: '张三', age: 25 }));

// 读取数据
const username = localStorage.getItem('username');
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

// 删除数据
localStorage.removeItem('username');

// 清空所有数据
localStorage.clear();
```

### Service Worker离线缓存：

Service Worker是HTML5提供的更强大的离线存储方案，可以拦截网络请求并缓存资源。

**特点**：
1. 运行在独立的线程中，不会阻塞主线程
2. 可以完全控制页面的网络请求
3. 支持离线访问和后台同步
4. 必须在HTTPS环境下使用

## 12. meta标签有哪些常用的属性和作用？

### 常用的meta标签：

#### 1. 字符编码

```html
<meta charset="UTF-8">
```

#### 2. 视口设置（移动端必备）

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

**viewport参数说明**：
- `width=device-width`：宽度等于设备宽度
- `initial-scale=1.0`：初始缩放比例为1
- `maximum-scale=1.0`：最大缩放比例为1
- `user-scalable=no`：禁止用户缩放

#### 3. SEO相关

```html
<!-- 页面描述 -->
<meta name="description" content="这是一个前端知识库，包含HTML、CSS、JavaScript等面试题">

<!-- 关键词 -->
<meta name="keywords" content="前端,HTML,CSS,JavaScript,面试题">

<!-- 作者 -->
<meta name="author" content="张三">
```

#### 4. HTTP缓存控制

```html
<!-- 禁止缓存 -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

#### 5. IE兼容模式

```html
<!-- 使用最新的IE渲染引擎 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

#### 6. 移动端优化

```html
<!-- iOS Safari -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<!-- Android Chrome -->
<meta name="mobile-web-app-capable" content="yes">
```

#### 7. 社交媒体分享（Open Graph）

```html
<meta property="og:title" content="页面标题">
<meta property="og:description" content="页面描述">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com">
```

---