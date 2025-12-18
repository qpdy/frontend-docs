---
sidebar_position: 1
title: 前端开发规范
---

# 前端开发规范

## HTML 规范

### 语义化标签

1. 尽量使用语义化的HTML标签
2. 正确使用标题层级（h1-h6）
3. 表单元素要有对应的label标签

```html
<!-- 推荐 -->
<header>
  <h1>网站标题</h1>
  <nav>
    <ul>
      <li><a href="/">首页</a></li>
      <li><a href="/about">关于</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>文章标题</h2>
    <p>文章内容</p>
  </article>
</main>

<footer>
  <p>&copy; 2023 版权信息</p>
</footer>

<!-- 不推荐 -->
<div class="header">
  <div class="title">网站标题</div>
  <div class="nav">
    <div class="nav-item"><a href="/">首页</a></div>
    <div class="nav-item"><a href="/about">关于</a></div>
  </div>
</div>

<div class="content">
  <div class="article">
    <div class="article-title">文章标题</div>
    <div class="article-content">文章内容</div>
  </div>
</div>

<div class="footer">
  <div class="copyright">&copy; 2023 版权信息</div>
</div>
```

### 属性书写顺序

1. class
2. id, name
3. data-*
4. src, for, type, href
5. title, alt
6. aria-*, role

### 标签闭合

- 自闭合标签不要加斜杠（HTML5规范）
- 非自闭合标签必须闭合

```html
<!-- 推荐 -->
<input type="text" placeholder="请输入">
<img src="image.jpg" alt="描述">
<br>

<!-- 不推荐 -->
<input type="text" placeholder="请输入" />
<img src="image.jpg" alt="描述" />
<br />
```

## CSS 规范

### 命名规范

1. 使用有意义的英文单词命名
2. 类名使用小写字母，多个单词用连字符分隔
3. ID命名遵循驼峰命名法
4. 禁止使用拼音命名

```css
/* 推荐 */
.header {}
.nav-menu {}
.user-avatar {}
.sidebar {}

#navigationBar {}
#loginForm {}

/* 不推荐 */
.touxiang {} /* 拼音 */
.left_bar {} /* 下划线 */
.Header {} /* 大写字母 */
```

### 选择器规范

1. 尽量避免使用ID选择器
2. 避免选择器嵌套过深（不超过3层）
3. 避免使用通配符选择器
4. 使用语义化类名，避免样式相关的类名

```css
/* 推荐 */
.article-header {}
.article-title {}
.article-content {}

/* 不推荐 */
.red {} /* 样式相关 */
.left {} /* 样式相关 */
#header {} /* ID选择器 */
.container .sidebar .menu .item .link {} /* 嵌套过深 */
* {} /* 通配符 */
```

### 属性书写顺序

1. Positioning（定位）
2. Box Model（盒模型）
3. Typographic（排版）
4. Visual（视觉效果）
5. Other（其他）

```css
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box Model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;

  /* Typographic */
  font: normal 13px "Helvetica Neue", sans-serif;
  line-height: 1.5;
  text-align: center;

  /* Visual */
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;

  /* Other */
  opacity: 1;
}
```

## JavaScript 规范

### 变量声明

1. 优先使用 const，需要重新赋值时使用 let
2. 避免使用 var
3. 变量命名使用驼峰命名法

```javascript
// 推荐
const userName = 'John';
let userAge = 25;
const userList = [];

// 不推荐
var userName = 'John'; // 使用了 var
const user_list = []; // 命名不规范
```

### 函数命名

1. 函数名使用动词开头
2. 使用驼峰命名法
3. 事件处理函数以 handle 开头
4. 条件判断函数以 is/has/can 开头

```javascript
// 推荐
function getUserInfo() {}
function handleSubmit() {}
function isValid() {}
function hasPermission() {}

// 不推荐
function user_info() {} // 命名不规范
function click() {} // 没有语义
function valid() {} // 没有前缀
```

### 对象和数组

1. 使用字面量创建对象和数组
2. 对象属性使用简写形式
3. 使用扩展运算符进行数组拷贝

```javascript
// 推荐
const obj = {
  name: 'John',
  age: 25,
  // 属性简写
  getName() {
    return this.name;
  }
};

const arr = [1, 2, 3];
const newArr = [...arr]; // 数组拷贝

// 不推荐
const obj = new Object();
obj.name = 'John';
obj['age'] = 25;

const arr = new Array();
const newArr = arr.slice(); // 数组拷贝方式不够简洁
```

### 异步处理

1. 优先使用 async/await
2. 合理处理错误
3. 避免回调地狱

```javascript
// 推荐
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('获取用户数据失败:', error);
    throw error;
  }
}

// 不推荐
function fetchUserData(userId, callback) {
  fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(userData => {
      callback(null, userData);
    })
    .catch(error => {
      callback(error);
    });
}
```

## Vue 开发规范

### 组件命名

1. 组件名使用大写字母开头的驼峰命名法
2. 组件名应该包含多个单词，避免与HTML元素冲突

```javascript
// 推荐
export default {
  name: 'UserProfile'
}

// 不推荐
export default {
  name: 'user' // 与HTML元素冲突
}
```

### 组件结构

1. 按照固定的顺序组织组件选项
2. 使用 template/script/style 的顺序

```vue
<template>
  <!-- 模板内容 -->
</template>

<script>
// 脚本内容
export default {
  name: 'ComponentName',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped>
/* 样式内容 */
</style>
```

### Props 定义

1. 使用对象形式定义props
2. 明确指定类型和默认值

```javascript
// 推荐
props: {
  status: {
    type: String,
    default: 'default',
    validator(value) {
      return ['default', 'success', 'warning', 'error'].includes(value);
    }
  },
  count: {
    type: Number,
    required: true
  }
}

// 不推荐
props: ['status', 'count']
```

## React 开发规范

### 组件定义

1. 优先使用函数组件和Hooks
2. 组件名使用大写字母开头的驼峰命名法

```jsx
// 推荐
function UserProfile({ user }) {
  const [editing, setEditing] = useState(false);
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      {/* 其他内容 */}
    </div>
  );
}

// 不推荐
class UserProfile extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="user-profile">
        <h2>{user.name}</h2>
        {/* 其他内容 */}
      </div>
    );
  }
}
```

### Hooks 使用

1. Hooks只能在函数组件顶层调用
2. Hooks命名以use开头
3. 遵循Hooks规则

```jsx
// 推荐
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading };
}

// 使用自定义Hook
function UserList() {
  const { data: users, loading } = useApi('/api/users');
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## 性能优化

### 图片优化

1. 选择合适的图片格式
2. 使用适当的图片尺寸
3. 实现图片懒加载

```html
<!-- 使用WebP格式 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="描述">
</picture>

<!-- 响应式图片 -->
<img 
  srcset="small.jpg 300w, medium.jpg 600w, large.jpg 1200w"
  sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
  src="medium.jpg" 
  alt="描述"
>
```

### 代码分割

1. 使用动态导入实现路由级别的代码分割
2. 对大型组件进行代码分割

```javascript
// Vue Router 代码分割
const UserProfile = () => import('@/views/UserProfile.vue');

// React 代码分割
const UserProfile = lazy(() => import('./UserProfile'));
```

### 防抖和节流

```javascript
// 防抖函数
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// 节流函数
function throttle(func, delay) {
  let lastExecTime = 0;
  return function (...args) {
    const currentTime = Date.now();
    if (currentTime - lastExecTime >= delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    }
  };
}
```