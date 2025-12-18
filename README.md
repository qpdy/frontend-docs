# 前端开发知识库

这是一个基于Docusaurus构建的前端开发知识库，包含了Vue和React框架的开发规范、问题解决方案、性能优化等内容。

## 项目结构

```
frontend-docs/
├── docs/                    # 文档内容
│   ├── frontend-guidelines.md     # 前端开发规范
│   ├── vue-react-issues.md        # Vue和React问题解决
│   ├── frontend-knowledge.md      # 前端知识体系
│   └── frontend-performance.md    # 前端性能优化
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
- Vue和React开发规范

### 框架问题解决
- Vue.js常见问题及解决方案
- React常见问题及解决方案

### 前端知识体系
- HTML、CSS、JavaScript基础知识
- Vue.js核心概念
- React核心概念
- 构建工具使用

### 性能优化
- 加载性能优化
- 渲染性能优化
- 交互性能优化

## 技术栈

- [Docusaurus](https://docusaurus.io/) - 静态网站生成器
- [React](https://reactjs.org/) - UI库
- [TypeScript](https://www.typescriptlang.org/) - JavaScript超集

## 部署

可以部署到GitHub Pages、Netlify、Vercel等平台。