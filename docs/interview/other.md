---
sidebar_position: 6
title: 工程化与其他话题（面试要点）
---

# 工程化与其他话题面试要点

## 1、说说面向对象编程思想?

面向对象编程（Object-Oriented Programming，OOP）是一种编程范式，它将现实世界中的事物抽象为对象，通过对象之间的交互来解决问题。

### 核心概念

1. **类（Class）**：类是对象的模板或蓝图，定义了对象的属性和方法。
2. **对象（Object）**：对象是类的实例，具有类定义的属性和方法。
3. **属性（Attribute）**：对象的特征或状态。
4. **方法（Method）**：对象的行为或功能。

### 四大基本特征

1. **封装（Encapsulation）**：
   - 将对象的属性和方法包装在一起，隐藏内部实现细节。
   - 通过访问控制（如public、private、protected）保护数据安全。
   - 提供公共接口供外部访问。

2. **继承（Inheritance）**：
   - 子类可以继承父类的属性和方法。
   - 实现代码复用，减少重复代码。
   - 支持多层继承和多重继承（某些语言）。

3. **多态（Polymorphism）**：
   - 同一个接口可以有不同的实现方式。
   - 运行时根据对象的实际类型调用相应的方法。
   - 提高代码的灵活性和可扩展性。

4. **抽象（Abstraction）**：
   - 抽取事物的本质特征，忽略非关键细节。
   - 通过抽象类和接口定义规范。
   - 简化复杂系统的理解和设计。

### 优势

- **模块化**：代码结构清晰，易于维护。
- **可重用性**：通过继承和组合实现代码复用。
- **可扩展性**：通过继承和多态支持功能扩展。
- **易维护性**：封装降低了模块间的耦合度。

## 白屏时间和首屏时间如何计算？

### 白屏时间(First Paint)

是指浏览器从响应用户输入网址地址，到浏览器开始显示内容的时间。

```
白屏时间 = 页面开始展示的时间点 - 开始请求的时间点
```

### 首屏时间(First Contentful Paint)

是指浏览器从响应用户输入网络地址，到首屏内容渲染完成的时间。

```
首屏时间 = 首屏内容渲染结束时间点 - 开始请求的时间点
```

### 性能指标测量方法

1. **Navigation Timing API**：
```javascript
const timing = performance.timing;
const whiteScreenTime = timing.responseStart - timing.navigationStart;
const firstScreenTime = timing.domContentLoadedEventEnd - timing.navigationStart;
```

2. **PerformanceObserver API**（推荐）：
```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.name === 'first-contentful-paint') {
      console.log('FCP:', entry.startTime);
    }
  }
});
observer.observe({ entryTypes: ['paint'] });
```

## 页面样式兼容如何解决？

### 一、常见兼容性问题

#### 浏览器渲染差异

- **盒模型差异**：不同浏览器对box-sizing属性的默认值处理不同，可能导致元素尺寸计算不一致。
- **浮动与清除浮动**：浮动元素在不同浏览器中的表现可能不同，清除浮动的方式也可能需要调整。
- **Flexbox/Grid布局**：虽然现代浏览器对Flexbox和Grid的支持较好，但旧版浏览器（如IE10及以下）可能存在兼容性问题。

#### CSS属性支持差异

- **前缀问题**：某些CSS属性需要添加浏览器前缀（如-webkit-、-moz-、-ms-）才能在特定浏览器中生效。
- **属性值差异**：同一属性的不同值在不同浏览器中的支持程度可能不同。

#### JavaScript兼容性问题

- **API差异**：不同浏览器对JavaScript API的支持程度不同，如fetch、Promise等在旧版浏览器中可能不可用。
- **事件处理**：事件监听和事件处理的方式在不同浏览器中可能存在差异。

#### 响应式设计问题

- **媒体查询**：不同浏览器对媒体查询的支持程度可能不同，特别是在处理复杂媒体查询时。
- **视口设置**：视口（viewport）设置不当可能导致移动设备上的显示问题。

### 二、解决方案

#### 使用CSS Reset或Normalize.css

- **CSS Reset**：通过重置所有元素的默认样式，减少浏览器之间的差异。
- **Normalize.css**：提供了一种更温和的样式重置方式，保留了有用的默认样式，同时修复了浏览器之间的不一致性。

#### 添加浏览器前缀

- 使用工具如Autoprefixer自动为CSS属性添加浏览器前缀，确保在不同浏览器中都能生效。

#### 使用Polyfill和Shim

- **Polyfill**：为旧版浏览器提供缺失的API实现，如使用core-js或babel-polyfill来支持ES6+特性。
- **Shim**：用于修复或增强浏览器中的特定功能，如html5shiv用于支持HTML5元素在IE8及以下浏览器中的使用。

#### 响应式设计技术

- **媒体查询**：使用媒体查询根据设备的屏幕尺寸和分辨率应用不同的样式。
- **视口设置**：在HTML的`<head>`部分添加视口元标签，确保移动设备上的正确显示。

#### 测试与调试

- **跨浏览器测试**：使用BrowserStack、Sauce Labs等工具进行跨浏览器测试，确保网页在不同浏览器中的表现一致。
- **开发者工具**：利用浏览器的开发者工具进行调试，检查元素样式、网络请求等，快速定位问题。

## 从输入url到页面加载完成中间发生了什么？

1. 浏览器的地址栏输入URL并按下回车。
2. 浏览器查找当前URL是否存在缓存，并比较缓存是否过期。
3. DNS解析URL对应的IP。
4. 根据IP建立TCP连接（三次握手）。
5. HTTP发起请求。
6. 服务器处理请求，浏览器接收HTTP响应。
7. 关闭TCP连接（四次挥手）。
8. 渲染页面，构建DOM树。

### 详细过程分解：

#### 1. URL解析与缓存检查
- 浏览器解析URL，检查是否有协议、域名等
- 检查浏览器缓存、系统缓存、路由器缓存等

#### 2. DNS解析
- 检查浏览器DNS缓存
- 检查操作系统DNS缓存
- 检查路由器缓存
- 向ISP DNS服务器查询
- 递归查询直到获得IP地址

#### 3. TCP连接建立
- 客户端发送SYN包
- 服务器回复SYN+ACK包
- 客户端发送ACK包
- TCP连接建立完成

#### 4. HTTP请求处理
- 浏览器发送HTTP请求
- 服务器处理请求并返回响应
- 浏览器接收响应头和响应体

#### 5. 页面渲染
- 解析HTML构建DOM树
- 解析CSS构建CSSOM树
- 执行JavaScript
- 构建渲染树
- 布局计算
- 绘制页面

## GET和POST请求有什么区别？

| 特性 | GET | POST |
|------|-----|------|
| 主要用途 | 请求数据（从服务器获取资源） | 提交数据（向服务器发送数据） |
| 数据传输位置 | URL 参数（查询字符串） | 请求体（Request Body） |
| 数据可见性 | 数据可见于 URL，可被缓存、书签 | 数据不可见，不可缓存 |
| 数据长度限制 | 受 URL 长度限制（通常约 2048 字符） | 无明确限制（受服务器配置影响） |
| 安全性 | 较低（数据暴露在 URL 中） | 较高（数据在请求体中） |
| 幂等性 | 是（多次请求结果相同） | 否（多次请求可能产生不同结果） |
| 缓存 | 可缓存 | 不可缓存 |
| 书签/历史记录 | 可保存为书签或历史记录 | 不可保存 |

### 安全性考虑：

1. **GET请求**：
   - 数据在URL中可见，容易被记录在服务器日志、浏览器历史等地方
   - 不应用于传输敏感信息

2. **POST请求**：
   - 数据在请求体中，相对安全
   - 但仍需HTTPS加密传输敏感数据

## webpack常用的插件有哪些？

### 核心插件

1. **HtmlWebpackPlugin**：自动生成HTML文件并引入打包后的资源
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
```

2. **MiniCssExtractPlugin**：将CSS提取到单独的文件中
```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
};
```

3. **CleanWebpackPlugin**：清理构建目录
```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
};
```

4. **DefinePlugin**：定义环境变量
```javascript
const webpack = require('webpack');
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
```

### 优化插件

1. **SplitChunksPlugin**：代码分割优化
2. **TerserPlugin**：JavaScript压缩
3. **OptimizeCSSAssetsPlugin**：CSS压缩
4. **CompressionPlugin**：Gzip压缩
5. **ImageMinimizerPlugin**：图片压缩优化
6. **CssMinimizerPlugin**：CSS压缩（Webpack 5推荐）

### 开发辅助插件

1. **HotModuleReplacementPlugin**：热模块替换
2. **ProgressPlugin**：显示构建进度
3. **BundleAnalyzerPlugin**：分析打包结果
4. **DotenvPlugin**：环境变量管理
5. **CopyWebpackPlugin**：复制静态资源
6. **ProvidePlugin**：自动加载模块

## git常用命令有哪些？

### 基础操作

| 命令 | 说明 |
|------|------|
| `git init` | 初始化Git仓库 |
| `git clone <url>` | 克隆远程仓库 |
| `git add <file>` | 添加文件到暂存区 |
| `git commit -m "message"` | 提交更改 |
| `git status` | 查看仓库状态 |
| `git log` | 查看提交历史 |

### 分支操作

| 命令 | 说明 |
|------|------|
| `git branch` | 查看分支 |
| `git branch <name>` | 创建分支 |
| `git checkout <name>` | 切换分支 |
| `git merge <name>` | 合并分支 |
| `git branch -d <name>` | 删除分支 |

### 远程操作

| 命令 | 说明 |
|------|------|
| `git remote -v` | 查看远程仓库 |
| `git push origin <branch>` | 推送到远程仓库 |
| `git pull origin <branch>` | 从远程仓库拉取 |
| `git fetch` | 获取远程更新 |

### 撤销操作

| 命令 | 说明 |
|------|------|
| `git checkout -- <file>` | 撤销工作区修改 |
| `git reset HEAD <file>` | 撤销暂存区修改 |
| `git reset --hard <commit>` | 回退到指定版本 |
| `git revert <commit>` | 创建新提交撤销指定提交 |
| `git restore <file>` | 撤销工作区修改（Git 2.23+） |
| `git restore --staged <file>` | 撤销暂存区修改（Git 2.23+） |

## 解决代码冲突有哪几种方式？

### 1. 手动解决冲突

当Git无法自动合并时，会在冲突文件中标记冲突区域：

```text
<<<<<<< HEAD
当前分支的代码
=======
要合并分支的代码
>>>>>>> branch-name
```

解决步骤：
1. 打开冲突文件
2. 手动编辑冲突区域，保留需要的代码
3. 删除冲突标记（`<<<<<<<` `=======` `>>>>>>>`）
4. 保存文件
5. `git add .` 添加解决后的文件
6. `git commit` 完成合并

### 2. 使用合并工具

```bash
# 配置合并工具
git config --global merge.tool vimdiff

# 启动合并工具
git mergetool
```

常用合并工具：
- **vimdiff**：命令行工具
- **meld**：图形化工具
- **VS Code**：内置冲突解决功能

### 3. 选择特定版本

```bash
# 选择当前分支版本
git checkout --ours `<file>`

# 选择合并分支版本
git checkout --theirs `<file>`
```

### 4. 放弃合并

```bash
# 放弃合并，回到合并前状态
git merge --abort
```

### 5. 预防冲突的策略

1. **频繁同步**：定期拉取主分支更新
2. **功能分支**：为每个功能创建独立分支
3. **小步提交**：将大功能拆分为多个小提交
4. **代码审查**：通过Pull Request进行代码审查
5. **沟通协调**：团队成员之间及时沟通，避免同时修改同一文件
6. **原子提交**：确保每次提交只解决一个问题
7. **合理分工**：在大型项目中合理分配任务，减少重叠修改

## 登录功能如何保证安全？

### 1. 密码安全

- **密码加密**：使用bcrypt等单向加密算法
- **盐值**：为每个密码生成唯一盐值
- **强度要求**：设置密码复杂度要求

```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10;

// 加密密码
const hash = await bcrypt.hash(password, saltRounds);

// 验证密码
const isValid = await bcrypt.compare(password, hash);
```

### 2. 会话管理

- **JWT令牌**：使用JSON Web Token进行身份验证
- **HttpOnly Cookie**：防止XSS攻击
- **Secure标志**：仅通过HTTPS传输
- **SameSite属性**：防止CSRF攻击

```javascript
// 设置安全Cookie
res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 3600000 // 1小时
});
```

### 3. 传输安全

- **HTTPS**：强制使用HTTPS传输
- **HSTS**：启用HTTP严格传输安全
- **内容安全策略**：防止恶意内容注入

### 4. 防护措施

- **验证码**：防止暴力破解
- **登录失败限制**：限制登录尝试次数
- **多因素认证**：增加额外安全层
- **日志记录**：记录登录活动
- **设备指纹**：识别和验证用户设备
- **会话超时**：设置合理的会话过期时间
- **异常检测**：监控异常登录行为
- **速率限制**：限制单位时间内请求次数

## 小程序和Vue有什么区别？

| 特性 | 小程序 | Vue.js |
|------|--------|--------|
| **设计目标** | 跨平台轻量级应用（如微信生态内） | 通用前端框架（Web、移动端、桌面端） |
| **运行环境** | 封闭的沙箱环境（如微信小程序容器） | 浏览器或 Node.js 环境 |
| **开发模式** | 组件化 + 特定框架 API | 组件化 + 虚拟 DOM + 响应式系统 |
| **数据绑定** | 双向绑定（部分场景） + 手动更新 | 双向绑定（v-model） + 响应式更新 |
| **路由管理** | 框架内置（如微信小程序的页面栈） | 需手动实现或依赖插件（如 Vue Router） |
| **性能优化** | 依赖平台优化（如微信的预加载机制） | 需开发者手动优化（如代码分割、懒加载） |
| **生态扩展** | 依赖平台能力（如微信支付、分享） | 丰富的插件生态（如 Vuex、Vue Router） |
| **学习曲线** | 较低（特定平台 API） | 较高（需理解响应式原理、虚拟 DOM） |

### 开发体验对比：

1. **小程序**：
   - 学习成本低，文档完善
   - 开发工具集成度高
   - 调试方便，真机预览快捷

2. **Vue**：
   - 生态丰富，社区活跃
   - 灵活性高，可定制性强
   - 工具链完善（Vue DevTools等）

## 微信小程序如何自定义头部？

### 1. 配置navigationStyle

在页面或全局配置中设置自定义导航栏：

```json
{
  "navigationStyle": "custom"
}
```

### 2. 创建自定义头部组件

```xml
<!-- custom-header.wxml -->
<view class="custom-header">
  <view class="status-bar" style="height: {{statusBarHeight}}px;"></view>
  <view class="nav-bar">
    <view class="nav-back" bindtap="goBack">
      <icon type="arrow-left" size="20"></icon>
    </view>
    <view class="nav-title">{{title}}</view>
    <view class="nav-more">
      <icon type="more" size="20"></icon>
    </view>
  </view>
</view>
```

```css
/* custom-header.wxss */
.custom-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.status-bar {
  width: 100%;
}

.nav-bar {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 15px;
}

.nav-back, .nav-more {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-title {
  flex: 1;
  text-align: center;
  font-weight: bold;
}
```

```javascript
// custom-header.js
Component({
  properties: {
    title: {
      type: String,
      value: ''
    }
  },
  
  lifetimes: {
    attached() {
      // 获取状态栏高度
      const systemInfo = wx.getSystemInfoSync();
      this.setData({
        statusBarHeight: systemInfo.statusBarHeight
      });
    }
  },
  
  methods: {
    goBack() {
      wx.navigateBack();
    }
  }
});
```

### 3. 在页面中使用

```json
{
  "usingComponents": {
    "custom-header": "/components/custom-header/custom-header"
  }
}
```

```xml
<custom-header title="页面标题"></custom-header>
```

## 如何解决不同浏览器兼容问题？

### 1. 渐进增强和优雅降级

**渐进增强**：从基本功能开始，逐步增强功能
```css
/* 基础样式 */
.button {
  padding: 10px 20px;
  background: #007cba;
  color: white;
  border: none;
}

/* 增强样式 */
@supports (border-radius: 5px) {
  .button {
    border-radius: 5px;
  }
}
```

**优雅降级**：从最新功能开始，为旧浏览器提供备选方案
```css
/* 现代浏览器 */
.flex-container {
  display: flex;
  justify-content: space-between;
}

/* 旧浏览器备选 */
.no-flex .flex-container {
  display: block;
}
.flex-container > * {
  float: left;
  width: 30%;
}
```

### 2. 使用Polyfill

```html
<!-- polyfill.io 自动检测浏览器并提供所需polyfill -->
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>

<!-- 或者使用特定polyfill -->
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
```

### 3. CSS前缀和特性检测

```css
/* 使用Autoprefixer自动添加前缀 */
.transform-element {
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}

/* 特性检测 */
@supports (display: grid) {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 4. 浏览器测试策略

1. **确定目标浏览器**：根据用户数据分析确定支持的浏览器版本
2. **自动化测试**：使用Selenium、Cypress等工具进行跨浏览器测试
3. **云测试平台**：使用BrowserStack、Sauce Labs等服务测试真实设备

## 浏览器缓存、服务器缓存、CDN缓存有什么区别？

### 1. 浏览器缓存

浏览器缓存是指浏览器在本地存储资源（如 HTML、CSS、JS、图片等），当用户再次访问同一资源时，直接从本地读取而无需重新请求服务器。

#### 缓存机制

**强制缓存**：
- 浏览器通过 Cache-Control 和 Expires 头判断资源是否过期。
- 若未过期，直接使用本地缓存，不发送请求到服务器。
- 示例：Cache-Control: max-age=3600（缓存 1 小时）。

**协商缓存**：
- 若资源过期，浏览器发送请求到服务器，携带 If-Modified-Since 或 If-None-Match 头。
- 服务器检查资源是否修改，若未修改返回 304 Not Modified，浏览器使用本地缓存；若修改则返回新资源。
- 示例：ETag: "123456"，Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT。

#### 缓存策略

**静态资源**：
- 对 CSS、JS、图片等不常变更的资源设置较长的缓存时间（如 max-age=31536000，即 1 年）。
- 通过文件名加哈希（如 style.123456.css）实现强制更新。

**动态资源**：
- 对 API 响应或动态内容设置较短的缓存时间或禁用缓存（Cache-Control: no-store）。

#### 优点

- 减少服务器负载和带宽消耗。
- 提升页面加载速度，尤其是弱网环境。

#### 缺点

- 缓存更新不及时可能导致用户看到旧内容。
- 需要合理设置缓存策略，避免缓存过期或永久缓存。

### 2. 服务器缓存

服务器缓存是指服务器在内存或磁盘中存储动态生成的页面或数据，避免重复计算或数据库查询。

#### 缓存机制

**内存缓存**：
- 将计算结果或数据库查询结果存储在内存（如 Redis、Memcached）中，读取速度快。
- 示例：Redis 缓存 API 响应。

**磁盘缓存**：
- 将生成的 HTML 页面或静态资源存储在磁盘（如 Nginx 缓存）。
- 示例：Nginx 的 proxy_cache。

#### 缓存策略

**页面缓存**：
- 对不常变更的页面（如博客文章）缓存整个 HTML。
- 示例：Nginx 缓存静态页面。

**数据缓存**：
- 对频繁查询的数据（如用户信息）缓存查询结果。
- 示例：Redis 缓存数据库查询。

#### 优点

- 显著降低服务器负载，提升响应速度。
- 减少数据库查询，提升系统吞吐量。

#### 缺点

- 缓存失效或更新不及时可能导致数据不一致。
- 需要处理缓存穿透、雪崩等问题。

### 3. CDN 缓存

CDN 缓存是指将资源部署到全球分布的 CDN 节点，用户从最近的节点获取资源，减少网络延迟。

#### 缓存机制

**边缘节点缓存**：
- CDN 节点（如 Cloudflare、Akamai）缓存静态资源（如 JS、CSS、图片）。
- 用户请求资源时，CDN 直接返回缓存内容，无需回源到源站。

**缓存规则**：
- 通过 CDN 配置设置缓存时间（TTL）和缓存策略。
- 示例：设置 Cache-Control: public, max-age=86400（缓存 1 天）。

#### 缓存策略

**静态资源**：
- 对 CSS、JS、图片等资源设置较长的缓存时间。
- 通过文件名加哈希或版本号实现强制更新。

**动态资源**：
- 对 API 响应或动态内容设置较短的缓存时间或禁用缓存。
- 示例：CDN 配置中排除动态路径。

#### 优点

- 显著减少网络延迟，提升全球用户访问速度。
- 降低源站负载，节省带宽成本。

#### 缺点

- 缓存更新不及时可能导致用户看到旧内容。
- 需要合理配置缓存规则，避免缓存敏感数据。

## 如何禁止浏览器缓存？

### 一、通过HTTP响应头设置

HTTP响应头是服务器端控制缓存的核心方式，优先级最高且效果稳定。

#### Cache-Control

- **no-store**：完全禁止缓存，浏览器和代理服务器均不存储响应内容。
  ```
  Cache-Control: no-store
  ```

- **no-cache**：强制每次请求前验证资源是否过期（需配合ETag或Last-Modified）。
  ```
  Cache-Control: no-cache
  ```

- **max-age=0**：资源立即过期，但允许缓存（需配合no-cache使用以避免误用）。
  ```
  Cache-Control: no-cache, max-age=0
  ```

#### Pragma（兼容HTTP/1.0）

```
Pragma: no-cache
```
(现代浏览器已优先使用Cache-Control，此头仅作兼容。)

#### Expires

设置过期时间为过去时间，强制资源过期。

### 二、通过HTML元标签（Meta Tags）

在HTML头部添加`<meta>`标签，但仅对当前页面有效，且部分浏览器可能忽略。

```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

### 三、通过JavaScript动态控制

在页面加载时通过JavaScript清除缓存或强制重新加载资源。

**强制页面刷新**：
```javascript
location.reload(true); // true表示强制从服务器获取
```

**动态修改资源URL**

通过添加随机参数或版本号，使浏览器认为资源是新的。

```javascript
const script = document.createElement('script');
script.src = 'script.js?v=' + Date.now(); // 使用时间戳
document.head.appendChild(script);
```

### 四、通过URL参数禁用缓存

在资源URL后添加随机参数或版本号，避免浏览器复用缓存。

#### 时间戳

```html
<script src="script.js?t=1633046400"></script> <!-- 动态生成时间戳 -->
```

#### 版本号

```html
<link rel="stylesheet" href="style.css?v=1.2"> <!-- 发布时更新版本号 -->
```

#### 哈希值

使用构建工具（如Webpack）生成文件哈希，确保内容变更时URL自动更新。

```html
<script src="bundle.js?hash=abc123"></script>
```

## 单页面应用和多页面应用有什么区别？

### 单页面应用（SPA）

**特点**：
- 整个应用只有一个HTML页面
- 通过JavaScript动态更新内容
- 页面切换无刷新，用户体验流畅

**优点**：
- 用户体验好，页面切换流畅
- 前后端分离，便于开发和维护
- 减少服务器压力

**缺点**：
- 首屏加载时间长
- SEO不友好（需要服务端渲染解决）
- 前进后退需要特殊处理

### 多页面应用（MPA）

**特点**：
- 每个页面都是独立的HTML文件
- 页面跳转需要重新加载整个页面
- 传统的Web应用模式

**优点**：
- SEO友好
- 首屏加载快
- 架构简单，易于理解

**缺点**：
- 页面切换有白屏
- 重复加载公共资源
- 用户体验相对较差

### 对比表格：

| 特性 | SPA | MPA |
|------|-----|-----|
| 页面数量 | 单页面 | 多页面 |
| 页面切换 | 无刷新 | 重新加载 |
| 首屏加载 | 较慢 | 较快 |
| SEO | 需特殊处理 | 友好 |
| 用户体验 | 流畅 | 有白屏 |
| 开发复杂度 | 较高 | 较低 |
| 适用场景 | 后台管理系统、复杂应用 | 企业官网、博客 |

## 跨域问题如何解决？

### 1. CORS（跨域资源共享，推荐方案）

**原理**：服务器通过响应头声明允许哪些源访问资源，浏览器根据响应头决定是否放行。

**关键响应头**：
- Access-Control-Allow-Origin: 允许的源（如*或具体域名http://example.com）。
- Access-Control-Allow-Methods: 允许的HTTP方法（如GET, POST, PUT）。
- Access-Control-Allow-Headers: 允许的请求头（如Content-Type, Authorization）。
- Access-Control-Allow-Credentials: 是否允许携带Cookie（需配合withCredentials: true）。

```javascript
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://example.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
```

**适用场景**：前后端分离、第三方API调用。

### 2. JSONP（仅限GET请求）

**原理**：利用`<script>`标签不受同源策略限制的特性，通过动态创建脚本请求数据，服务端返回函数调用（而非JSON）。

**步骤**：
- 前端定义回调函数（如handleData）。
- 动态创建`<script>`标签，URL包含回调函数名（如?callback=handleData）。
- 服务端返回`handleData({"data": "value"})`，前端自动执行。

**缺点**：仅支持GET请求，存在XSS风险。

```javascript
function handleData(data) {
  console.log(data);
}

const script = document.createElement('script');
script.src = 'http://api.example.com?callback=handleData';
document.body.appendChild(script);
```

### 3. 代理服务器（开发/生产环境通用）

**原理**：通过同源的代理服务器转发请求，隐藏真实跨域。

**实现方式**：

**开发环境**：配置Webpack DevServer或Vite的proxy选项。

```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://backend.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
};
```

**生产环境**：使用Nginx反向代理。

```nginx
location /api/ {
  proxy_pass http://backend.example.com;
  proxy_set_header Host $host;
}
```

**适用场景**：前后端同源部署困难时。

### 4. postMessage（跨窗口通信）

**原理**：通过window.postMessage方法在不同窗口（如iframe、弹出窗）间安全传递数据。

**步骤**：
- 发送方调用targetWindow.postMessage(data, targetOrigin)。
- 接收方监听message事件。

```javascript
// 父窗口
const iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage('Hello from parent!', 'http://child.example.com');

// 子窗口（iframe内）
window.addEventListener('message', (event) => {
  if (event.origin === 'http://parent.example.com') {
    console.log(event.data); // 'Hello from parent!'
  }
});
```

**适用场景**：跨域iframe通信、微前端架构。

### 5. WebSocket（全双工通信）

**原理**：WebSocket协议本身无跨域限制，建立连接后即可双向通信。

```javascript
const socket = new WebSocket('ws://api.example.com');
socket.onmessage = (event) => {
  console.log(event.data);
};
```

**适用场景**：实时应用（如聊天、股票行情）。

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| CORS | 标准、安全、支持复杂请求（如带Cookie） | 需后端配合 | 前后端分离、第三方API |
| JSONP | 兼容性好（IE6+） | 仅支持GET，存在XSS风险 | 遗留系统、简单数据获取 |
| 代理服务器 | 无需后端修改，支持所有请求方法 | 需额外维护代理层 | 开发/生产环境通用 |
| postMessage | 安全、支持复杂数据类型 | 仅限窗口间通信 | 跨域iframe、微前端 |
| WebSocket | 实时性强，无跨域限制 | 协议较复杂，需持久连接 | 实时应用 |

## HTTP和HTTPS有什么区别？

### 1. 安全性

| 特性 | HTTP | HTTPS |
|------|------|-------|
| 加密 | 数据以明文形式传输，易被窃听或篡改。 | 数据通过 SSL/TLS 加密，安全性高。 |
| 认证 | 无身份验证机制，服务器和客户端身份无法确认。 | 使用数字证书验证服务器身份（可选双向认证）。 |
| 完整性 | 数据可能被中间人攻击（MITM）篡改。 | 数据完整性通过加密哈希验证，防止篡改。 |
| 性能 | 无加密开销，速度较快。 | 有加密开销，但可通过HTTP/2、TLS 1.3等技术优化。 |
| 端口 | 默认使用80端口。 | 默认使用443端口。 |
| SEO | 搜索引擎可能标记为不安全。 | 搜索引擎优先排名，提升信任度。 |

### 2. 性能

| 特性 | HTTP | HTTPS |
|------|------|-------|
| 速度 | 更快（无需加密/解密）。 | 较慢（加密/解密增加 CPU 开销）。 |
| 优化 | 无额外开销。 | 可通过 HTTP/2、TLS 1.3 等技术优化。 |

### 3. 端口号

- **HTTP**：默认使用端口 80。
- **HTTPS**：默认使用端口 443。

### 4. 证书与成本

| 特性 | HTTP | HTTPS |
|------|------|-------|
| 证书 | 不需要。 | 需要 SSL/TLS 证书（可免费或付费）。 |
| 成本 | 零成本。 | 免费证书（如 Let's Encrypt）或付费证书（如 DigiCert）。 |

### 5. SEO 与用户体验

**HTTP**：
- Google 等搜索引擎会标记为"不安全"。
- 用户可能因安全警告而离开网站。

**HTTPS**：
- 搜索引擎优先排名。
- 浏览器显示"安全"标识，提升用户信任。

| 特性 | HTTP | HTTPS |
|------|------|-------|
| 加密 | 无 | SSL/TLS 加密 |
| 端口 | 80 | 443 |
| 速度 | 更快（无加密开销） | 稍慢（但 HTTP/2/3 可优化） |
| 证书 | 不需要 | 需要 CA 颁发的数字证书 |
| 安全性 | 低（易窃听/篡改） | 高（加密+身份验证） |
| SEO | 无优势 | 搜索引擎优先排名 |
| 浏览器标识 | 显示"不安全"警告 | 显示锁形图标，增强信任 |

## Token认证机制是什么？

### JWT（JSON Web Token）

**组成结构**：
1. **Header**：包含令牌类型和签名算法
2. **Payload**：包含声明（用户信息、过期时间等）
3. **Signature**：用于验证令牌完整性

```javascript
// JWT结构示例
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

// Header部分
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload部分
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

**工作流程**：
1. 用户登录，服务器验证身份
2. 服务器生成JWT并返回给客户端
3. 客户端在后续请求中携带JWT
4. 服务器验证JWT有效性

```javascript
// 生成JWT
const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { userId: user.id, username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// 验证JWT
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // 验证成功，处理业务逻辑
} catch (err) {
  // 验证失败，返回错误
}
```

### Token vs Session

| 特性 | Token | Session |
|------|-------|---------|
| 存储位置 | 客户端 | 服务器端 |
| 扩展性 | 好（无状态） | 差（有状态） |
| 安全性 | 需防范XSS/CSRF | 需防范Session劫持 |
| 性能 | 无需查询数据库 | 需查询Session存储 |
| 过期管理 | 自包含过期时间 | 需服务器管理过期 |

### 现代认证方式

1. **OAuth 2.0**：第三方授权框架
2. **OpenID Connect**：基于OAuth 2.0的身份认证层
3. **JWT with JWK**：使用JSON Web Key进行签名验证
4. **Opaque Tokens**：不透明令牌，需服务器验证
5. **Refresh Tokens**：用于获取新的访问令牌

## SEO优化有哪些方法？

### 1. 技术SEO

**页面结构优化**：
- 使用语义化HTML标签
- 合理的标题层级（H1-H6）
- 添加alt属性到图片

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <title>页面标题 - 网站名称</title>
  <meta name="description" content="页面描述，不超过160个字符">
  <meta name="keywords" content="关键词1,关键词2,关键词3">
</head>
<body>
  <h1>主标题</h1>
  <h2>副标题</h2>
  <img src="image.jpg" alt="图片描述">
</body>
</html>
```

**网站性能优化**：
- 提升页面加载速度
- 优化图片大小和格式
- 使用CDN加速

**移动端适配**：
- 响应式设计
- 添加viewport meta标签
- 移动端友好的交互

### 2. 内容SEO

**高质量内容**：
- 原创、有价值的内容
- 合理的关键词密度
- 定期更新内容

**内容结构**：
- 使用清晰的段落结构
- 添加内部链接
- 使用列表和标题组织内容

### 3. 外部优化

**外链建设**：
- 获取高质量的外部链接
- 参与行业讨论和合作
- 社交媒体分享
- Guest Blogging（客座博客）
- 目录提交

**本地SEO**：
- Google My Business优化
- 本地关键词优化
- 获取本地评价和引用
- 本地结构化数据标记
- 本地目录列表

### 4. 技术SEO进阶

**结构化数据**：
- 使用Schema.org标记
- 提升搜索结果展示效果

**站点地图**：
- XML网站地图
- HTML站点地图

**robots.txt**：
- 控制搜索引擎爬虫访问
- 防止敏感内容被抓取

## 小程序如何实现对数据的监听？

### 1. Page页面数据监听

在小程序Page中，可以使用`observers`字段监听数据变化：

```javascript
Page({
  data: {
    name: 'John',
    age: 30,
    userInfo: {
      nickName: 'Jack',
      city: 'Beijing'
    }
  },
  
  observers: {
    // 监听单个字段
    'name'(newVal) {
      console.log('name changed to:', newVal);
    },
    
    // 监听多个字段
    'name, age'(newName, newAge) {
      console.log('name or age changed');
    },
    
    // 监听对象属性
    'userInfo.nickName'(newNickName) {
      console.log('nickName changed to:', newNickName);
    },
    
    // 监听整个对象
    'userInfo'(newUserInfo) {
      console.log('userInfo changed:', newUserInfo);
    }
  },
  
  updateName() {
    this.setData({
      name: 'Jane'
    });
  }
});
```

### 2. Component组件数据监听

在自定义组件中，可以使用`observers`监听properties和data：

```javascript
Component({
  properties: {
    title: {
      type: String,
      value: ''
    }
  },
  
  data: {
    count: 0
  },
  
  observers: {
    // 监听properties
    'title'(newTitle) {
      console.log('title changed to:', newTitle);
    },
    
    // 监听data
    'count'(newCount) {
      console.log('count changed to:', newCount);
    },
    
    // 监听多个字段
    'title, count'(newTitle, newCount) {
      console.log('title or count changed');
    }
  },
  
  methods: {
    updateCount() {
      this.setData({
        count: this.data.count + 1
      });
    }
  }
});
```

### 3. 使用watch函数（需要引入第三方库）

```javascript
// 引入watch.js
const watch = require('../../utils/watch.js');

Page({
  data: {
    user: {
      name: 'John',
      age: 30
    }
  },
  
  onLoad() {
    // 监听数据变化
    watch(this, {
      'user.name'(newVal, oldVal) {
        console.log('user.name changed from', oldVal, 'to', newVal);
      }
    });
  }
});
```

## HTTP状态码有哪些？

### 1xx：信息性状态码

表示服务器已接收到请求并且正在处理。
- **100 Continue**：客户端应当继续发送请求。
- **101 Switching Protocols**：服务器已经理解了客户端的请求。
- **102 Processing**：服务器已接收并正在处理请求，但尚未有最终响应。

### 2xx：成功状态码

表示服务器成功处理了请求。
- **200 OK**：请求成功，服务器成功返回所请求的资源。
- **201 Created**：请求成功，服务器创建了新的资源。
- **204 No Content**：请求成功，但服务器没有返回任何内容。

### 3xx：重定向状态码

表示需要进一步操作以完成请求。
- **301 Moved Permanently**：请求的资源已永久移动到新位置。
- **302 Found**：请求的资源暂时移动到新位置。
- **304 Not Modified**：客户端缓存的资源未修改，可以直接使用缓存。

### 4xx：客户端错误状态码

表示客户端发送的请求有误。
- **400 Bad Request**：请求无效，服务器无法理解请求。
- **403 Forbidden**：请求被服务器拒绝，权限不足。
- **404 Not Found**：请求的资源不存在。
- **405 Method Not Allowed**：请求方法不被允许。
- **429 Too Many Requests**：请求过于频繁，被限流。

### 5xx：服务器错误状态码

表示服务器在处理请求时出现了错误。
- **500 Internal Server Error**：服务器内部错误，无法完成请求。
- **502 Bad Gateway**：服务器作为网关或代理，从上游服务器收到无效的响应。
- **503 Service Unavailable**：服务器暂时无法处理请求，通常是由于过载或维护。
- **504 Gateway Timeout**：服务器作为网关或代理，未能及时从上游服务器收到响应。

## HTTP请求方法有哪些？

| 方法 | 幂等性 | 请求体 | 典型用途 | 安全性 |
|------|--------|--------|----------|--------|
| GET | 是 | 无 | 获取资源 | 高 |
| POST | 否 | 有 | 创建资源 | 中 |
| PUT | 是 | 有 | 替换资源 | 中 |
| PATCH | 是 | 有 | 部分更新资源 | 中 |
| DELETE | 是 | 无 | 删除资源 | 中 |
| HEAD | 是 | 无 | 获取元信息 | 高 |
| OPTIONS | 是 | 可选 | 查询支持的方法或 CORS 预检 | 高 |
| CONNECT | - | 有 | 建立隧道 | 低 |
| TRACE | 是 | 无 | 调试（已不推荐） | 低 |

**幂等性说明**：多次执行相同操作产生的结果一致。

**安全性说明**：安全方法不会修改服务器状态。

### 各方法详解：

**GET**：
- 用于获取资源
- 参数通过URL传递
- 应该是幂等的

**POST**：
- 用于创建资源
- 数据在请求体中传递
- 不是幂等的

**PUT**：
- 用于更新或创建资源
- 完整替换资源
- 应该是幂等的

**PATCH**：
- 用于部分更新资源
- 只更新提供的字段
- 应该是幂等的

**DELETE**：
- 用于删除资源
- 应该是幂等的

## 如何判断一个元素进入视窗？

### 1. 使用 IntersectionObserver API

IntersectionObserver 是现代浏览器提供的原生 API，用于高效地监听元素与视口的交叉状态（即是否进入视窗）。

```javascript
// 创建观察器
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 元素进入视窗
      console.log('Element entered viewport');
      // 执行相关逻辑，如加载图片、启动动画等
      
      // 停止观察（可选）
      observer.unobserve(entry.target);
    }
  });
}, {
  // 配置选项
  threshold: 0.1, // 当10%的元素可见时触发
  rootMargin: '0px' // 根边距
});

// 开始观察目标元素
const target = document.querySelector('.target-element');
observer.observe(target);
```

### 2. 使用 getBoundingClientRect 手动计算

通过比较元素的位置和视口的大小，手动判断元素是否进入视窗。

```javascript
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= windowHeight &&
    rect.right <= windowWidth
  );
}

// 检测元素是否在视口中
const element = document.querySelector('.target-element');
if (isInViewport(element)) {
  console.log('Element is in viewport');
}

// 监听滚动事件（需要节流优化）
window.addEventListener('scroll', () => {
  if (isInViewport(element)) {
    console.log('Element entered viewport');
  }
});
```

### 3. 使用第三方库

```javascript
// 使用InView库
import { useInView } from 'react-intersection-observer';

function MyComponent() {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  
  return (
    <div ref={ref}>
      {inView ? 'Element is visible!' : 'Element is not visible'}
    </div>
  );
}
```

## 微信小程序调用接口的原理是什么？

### 1. 小程序网络请求的底层机制

微信小程序的网络请求本质是通过 微信客户端的封装 实现的，底层基于 HTTP/HTTPS 协议与服务器通信。开发者无需直接操作原生网络库（如浏览器中的 XMLHttpRequest 或 fetch），而是通过小程序提供的 wx.request API 发起请求。

**关键流程**：

1. **开发者调用 wx.request**：
   在 JavaScript 代码中调用 wx.request 方法，传入请求参数（如 URL、方法、数据等）。

2. **微信客户端代理请求**：
   微信客户端接收到请求后，会通过其内置的网络模块发起 HTTP/HTTPS 请求。

3. **服务器响应**：
   服务器返回响应数据，微信客户端将数据解析后传递给小程序。

4. **回调函数处理**：
   小程序通过回调函数（success、fail、complete）处理响应数据或错误。

### 2. 小程序网络请求的特点

#### (1) 域名白名单限制

- 小程序的网络请求必须配置 合法域名（在微信公众平台后台设置）。
- 未经配置的域名无法发起请求（出于安全考虑）。

#### (2) HTTPS 强制要求

- 所有请求必须使用 HTTPS 协议（HTTP 不支持）。
- 微信小程序要求服务器证书有效且可信。

#### (3) 请求并发限制

- 小程序对并发请求数量有限制（通常为 10 个），避免过度占用资源。
- 超出限制的请求会被排队等待
- 可以通过请求池管理并发请求

#### (4) 数据格式支持

- 支持 JSON、XML 等常见数据格式。
- 响应数据会被自动解析为 JavaScript 对象（JSON）或字符串（其他格式）。

#### 参数说明

- **url**：请求的服务器地址（必须配置在合法域名中）。
- **method**：请求方法（GET、POST、PUT 等）。
- **data**：请求参数（会自动转换为 URL 查询字符串或请求体）。
- **header**：请求头（如 Content-Type）。
- **success**：请求成功的回调函数。
- **fail**：请求失败的回调函数。
- **complete**：请求完成的回调函数（无论成功或失败都会触发）。

### 3. 与浏览器网络请求的区别

| 特性 | 微信小程序 | 浏览器 |
|------|------------|--------|
| 请求方式 | 通过 wx.request API 发起 | 通过 XMLHttpRequest 或 fetch 发起 |
| 域名限制 | 必须配置合法域名 | 无强制限制（但可能受 CORS 限制） |
| 协议要求 | 必须 HTTPS | 支持 HTTP 和 HTTPS |
| 并发限制 | 有限制（通常 10 个） | 无明确限制 |
| 跨域问题 | 无跨域问题（微信客户端代理） | 可能受 CORS 限制 |

### 4. 最佳实践

```javascript
// 封装网络请求
function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        ...options.header
      },
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(`Request failed with status ${res.statusCode}`));
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
}

// 使用示例
request({
  url: 'https://api.example.com/users',
  method: 'GET'
}).then(data => {
  console.log('Success:', data);
}).catch(err => {
  console.error('Error:', err);
});
```