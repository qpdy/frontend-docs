import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  frontendSidebar: [
    {
      type: 'category',
      label: '前端开发规范',
      items: [
        'frontend-guidelines',
        'code-formatting',
        'comment-guidelines',
        'naming-conventions',
      ],
    },
    {
      type: 'category',
      label: '错误处理与性能优化',
      items: [
        'error-handling',
        'performance-optimization',
      ],
    },
    {
      type: 'category',
      label: '问题解决方案',
      items: [
        'frontend-issues',
        'vue-react-issues',
        'frontend-performance',
      ],
    },
    {
      type: 'category',
      label: '前端知识体系',
      items: [
        'frontend-knowledge',
      ],
    },
  ],
  interviewSidebar: [
    {
      type: 'category',
      label: 'HTML',
      items: [
        'interview/html',
      ],
    },
    {
      type: 'category',
      label: 'CSS',
      items: [
        'interview/css',
      ],
    },
    {
      type: 'category',
      label: 'JavaScript',
      items: [
        'interview/js',
      ],
    },
    {
      type: 'category',
      label: 'TypeScript',
      items: [
        'interview/typescript',
      ],
    },
    {
      type: 'category',
      label: 'Vue',
      items: [
        'interview/vue',
      ],
    },
    {
      type: 'category',
      label: '工程化/网络',
      items: [
        'interview/other',
      ],
    },
  ],
};

export default sidebars;
