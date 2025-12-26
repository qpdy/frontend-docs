# 杨展鹏的个人网站

这是一个基于Docusaurus构建的杨展鹏的个人网站，包含了Vue和React框架的开发规范、问题解决方案、性能优化等内容。

## 项目结构

```
frontend-docs/
├── docs/                    # 文档内容
│   ├── frontend-guidelines.md     # 前端开发规范
│   ├── code-formatting.md         # 代码格式化规范
│   ├── comment-guidelines.md      # 注释规范
│   ├── naming-conventions.md      # 命名规范
│   ├── error-handling.md          # 错误处理
│   ├── performance-optimization.md  # 性能优化
│   ├── frontend-issues.md         # 前端问题解决方案
│   ├── vue-react-issues.md        # Vue和React问题解决
│   ├── frontend-knowledge.md      # 前端知识体系
│   ├── frontend-performance.md    # 前端性能优化
│   └── interview/                 # 前端面试题
│       ├── html.md                # HTML面试题
│       ├── css.md                 # CSS面试题
│       ├── js.md                  # JavaScript面试题
│       ├── typescript.md          # TypeScript面试题
│       ├── vue.md                 # Vue面试题
│       ├── engineering.md         # 前端工程化面试题
│       └── other.md               # 网络与浏览器面试题
├── blog/                    # 博客文章
├── src/                     # 源代码
├── static/                  # 静态资源
├── docusaurus.config.ts     # 配置文件
└── sidebars.ts             # 侧边栏配置
```

## 本地开发

1. 安装依赖：
   ```bash
   pnpm install
   ```

2. 启动开发服务器：
   ```bash
   pnpm run start
   ```
   然后在浏览器中访问 http://localhost:3000

3. 构建静态网站：
   ```bash
   pnpm run build
   ```

## 文档内容

### 前端开发规范
- HTML、CSS、JavaScript编码规范
- 代码格式化规范
- 注释规范
- 命名规范
- Vue和React开发规范

### 错误处理与性能优化
- 前端错误处理的最佳实践
- 性能优化策略与技巧

### 问题解决方案
- 前端常见问题汇总
- Vue和React开发中的问题及解决方案
- 前端性能问题解决方案

### 前端知识体系
- HTML、CSS、JavaScript核心知识
- Vue.js核心概念与实战
- React核心概念与实战
- 前端工程化最佳实践

### 前端面试指南
- HTML面试题详解
- CSS面试题详解
- JavaScript面试题详解
- TypeScript面试题详解
- Vue框架面试题详解
- 前端工程化面试题
- 网络与浏览器面试题

## 技术栈

- [Docusaurus](https://docusaurus.io/) - 静态网站生成器
- [React](https://reactjs.org/) - UI库
- [TypeScript](https://www.typescriptlang.org/) - JavaScript超集

## 部署

可以部署到GitHub Pages、Netlify、Vercel等平台。

## 作者 & 源码

- 源码仓库: https://github.com/qpdy/frontend-docs
