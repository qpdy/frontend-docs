---
sidebar_position: 3
title: 前端开发知识体系
---

# 前端开发知识体系

## 基础知识

### HTML

#### 语义化标签

HTML5引入了许多语义化标签，有助于提高网页的可访问性和SEO：

- `<header>`: 页面或章节的头部
- `<nav>`: 导航链接
- `<main>`: 页面主要内容
- `<article>`: 独立的文章内容
- `<section>`: 文档中的章节
- `<aside>`: 侧边栏内容
- `<footer>`: 页面或章节的底部

#### 表单验证

HTML5提供了内置的表单验证功能：

```html
<form>
  <input type="email" required placeholder="邮箱">
  <input type="tel" pattern="[0-9]{11}" placeholder="手机号">
  <input type="password" minlength="8" placeholder="密码">
  <button type="submit">提交</button>
</form>
```

### CSS

#### 盒模型

CSS盒模型包含四个部分：
1. Content（内容）
2. Padding（内边距）
3. Border（边框）
4. Margin（外边距）

```css
/* 标准盒模型 */
.box {
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 5px solid #000;
  /* 实际宽度 = 100 + 10*2 + 5*2 = 130px */
}

/* 怪异盒模型 */
.box-border {
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 5px solid #000;
  /* 实际宽度 = 100px（包含padding和border）*/
}
```

#### Flexbox布局

Flexbox是一个一维布局模型，适合处理对齐和分布空间：

```css
.container {
  display: flex;
  flex-direction: row; /* 主轴方向 */
  justify-content: center; /* 主轴对齐 */
  align-items: center; /* 交叉轴对齐 */
  flex-wrap: wrap; /* 换行 */
}

.item {
  flex: 1; /* 弹性增长 */
  flex-shrink: 0; /* 不收缩 */
  flex-basis: 200px; /* 基础大小 */
}
```

#### Grid布局

Grid是一个二维布局系统，适合复杂布局：

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 三列等宽 */
  grid-template-rows: auto; /* 行高自适应 */
  gap: 10px; /* 网格间距 */
}

.grid-item {
  grid-column: span 2; /* 跨越两列 */
  grid-row: 1; /* 放置在第一行 */
}
```

#### CSS预处理器

Sass/Less提供了变量、嵌套、混合等功能：

```scss
// Sass示例
$primary-color: #3498db;
$font-size: 14px;

.button {
  background-color: $primary-color;
  font-size: $font-size;
  
  &:hover {
    background-color: darken($primary-color, 10%);
  }
  
  &.large {
    font-size: $font-size * 1.2;
  }
}
```

### JavaScript

#### ES6+新特性

##### 箭头函数

```javascript
// 传统函数
function add(a, b) {
  return a + b;
}

// 箭头函数
const add = (a, b) => a + b;

// 箭头函数保持this指向
class Counter {
  constructor() {
    this.count = 0;
  }
  
  start() {
    setInterval(() => {
      this.count++; // this指向Counter实例
    }, 1000);
  }
}
```

##### 解构赋值

```javascript
// 数组解构
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// 对象解构
const { name, age, city = 'Unknown' } = { name: 'John', age: 30 };

// 函数参数解构
function greet({ name, greeting = 'Hello' }) {
  return `${greeting}, ${name}!`;
}
```

##### 模板字符串

```javascript
const name = 'John';
const age = 30;

const message = `Hello, my name is ${name} and I'm ${age} years old.`;

// 多行字符串
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;
```

##### Promise和异步处理

```javascript
// Promise
function fetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

// Async/Await
async function getData() {
  try {
    const data = await fetchData('/api/data');
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Promise.all 并行处理
async function fetchMultipleData() {
  const urls = ['/api/user', '/api/posts', '/api/comments'];
  const promises = urls.map(url => fetch(url).then(res => res.json()));
  const [user, posts, comments] = await Promise.all(promises);
  return { user, posts, comments };
}
```

## Vue.js

### 核心概念

#### 响应式原理

Vue 3使用Proxy实现响应式系统：

```javascript
// Vue 3 Composition API
import { reactive, ref, computed, watch } from 'vue';

export default {
  setup() {
    // reactive用于对象
    const state = reactive({
      count: 0,
      user: {
        name: 'John'
      }
    });
    
    // ref用于基本类型
    const count = ref(0);
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2);
    
    // 监听器
    watch(count, (newVal, oldVal) => {
      console.log(`count changed from ${oldVal} to ${newVal}`);
    });
    
    // 方法
    const increment = () => {
      count.value++;
    };
    
    return {
      state,
      count,
      doubleCount,
      increment
    };
  }
};
```

#### 组件通信

1. Props（父传子）
2. emit事件（子传父）
3. provide/inject（跨层级）
4. Vuex/Pinia（状态管理）

```vue
<!-- Parent.vue -->
<template>
  <div>
    <child-component 
      :message="parentMessage" 
      @child-event="handleChildEvent"
    />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  data() {
    return {
      parentMessage: 'Hello from parent'
    };
  },
  methods: {
    handleChildEvent(data) {
      console.log('Received from child:', data);
    }
  }
};
</script>

<!-- Child.vue -->
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="sendToParent">Send to parent</button>
  </div>
</template>

<script>
export default {
  props: ['message'],
  methods: {
    sendToParent() {
      this.$emit('child-event', { data: 'Hello from child' });
    }
  }
};
</script>
```

#### 生命周期

Vue 3生命周期钩子：

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue';

export default {
  setup() {
    onMounted(() => {
      console.log('组件已挂载');
    });
    
    onUpdated(() => {
      console.log('组件已更新');
    });
    
    onUnmounted(() => {
      console.log('组件已卸载');
    });
  }
};
```

### Vue Router

路由配置和导航：

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/User.vue'),
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

### Vuex/Pinia状态管理

Pinia作为Vue 3推荐的状态管理库：

```javascript
// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'John'
  }),
  
  getters: {
    doubleCount: (state) => state.count * 2
  },
  
  actions: {
    increment() {
      this.count++;
    },
    
    async fetchUserInfo() {
      try {
        const response = await fetch('/api/user');
        const user = await response.json();
        this.name = user.name;
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    }
  }
});
```

## React

### 核心概念

#### JSX语法

JSX是JavaScript的语法扩展：

```jsx
// JSX元素
const element = <h1>Hello, world!</h1>;

// JSX中使用表达式
const name = 'John';
const element = <h1>Hello, {name}!</h1>;

// JSX属性
const element = <img src={user.avatarUrl} alt="Avatar" />;

// JSX子元素
const element = (
  <div>
    <h1>Hello!</h1>
    <p>Good to see you here.</p>
  </div>
);
```

#### 组件

函数组件和类组件：

```jsx
// 函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// 使用箭头函数
const Welcome = (props) => <h1>Hello, {props.name}!</h1>;

// 类组件
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

#### Hooks

React Hooks让函数组件拥有状态和其他React特性：

```jsx
import React, { useState, useEffect, useContext, useReducer } from 'react';

// useState Hook
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// useEffect Hook
function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // 组件挂载后执行
    fetchUsers();
    
    // 清理函数（组件卸载前执行）
    return () => {
      console.log('Component will unmount');
    };
  }, []); // 空数组表示只在挂载时执行一次
  
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// 自定义Hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to set localStorage:', error);
    }
  };
  
  return [storedValue, setValue];
}
```

#### Context API

跨组件传递数据：

```jsx
// 创建Context
const UserContext = React.createContext();

// Provider组件
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 使用Context
function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  
  return (
    <div>
      {user ? <p>Welcome, {user.name}!</p> : <p>Please log in</p>}
    </div>
  );
}

// App组件
function App() {
  return (
    <UserProvider>
      <UserProfile />
    </UserProvider>
  );
}
```

### React Router

单页应用路由管理：

```jsx
// App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import User from './components/User';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/user/123">User</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </Router>
  );
}

// User组件获取路由参数
import { useParams } from 'react-router-dom';

function User() {
  const { id } = useParams();
  
  return <div>User ID: {id}</div>;
}
```

### 状态管理

Redux Toolkit简化Redux使用：

```javascript
// store/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 异步action
export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    entities: [],
    loading: 'idle',
    currentUser: null
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities.push(action.payload);
      });
  }
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
```

## 构建工具

### Webpack

模块打包工具配置：

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
```

### Vite

新一代构建工具：

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
```

## 性能优化

### 加载优化

1. 代码分割
2. 懒加载
3. 预加载

```javascript
// 动态导入实现代码分割
const HomePage = () => import('./HomePage.vue');
const AboutPage = () => import('./AboutPage.vue');

// React懒加载组件
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// 预加载关键资源
<link rel="preload" href="/critical.css" as="style">
<link rel="prefetch" href="/other-page.html">
```

### 渲染优化

1. 虚拟滚动
2. 防抖节流
3. React.memo/PureComponent

```javascript
// React.memo优化函数组件
const MyComponent = React.memo(function MyComponent(props) {
  /* 只有props变化时才重新渲染 */
  return <div>{props.children}</div>;
});

// useMemo缓存计算结果
function ExpensiveComponent({ list }) {
  const expensiveValue = useMemo(() => {
    return list.reduce((acc, item) => acc + item.value, 0);
  }, [list]);
  
  return <div>{expensiveValue}</div>;
}
```

### 网络优化

1. HTTP/2
2. 资源压缩
3. 缓存策略

```javascript
// Service Worker缓存策略
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images').then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  }
});
```

以上是前端开发的核心知识点，涵盖了从基础到高级的各个方面。随着技术的发展，前端生态系统还在不断演进，需要持续学习和实践。