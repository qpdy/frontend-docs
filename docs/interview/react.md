# React 面试题

## React 基础

### 1. React 生命周期

#### 类组件生命周期

**挂载阶段（Mounting）**
- `constructor()` - 初始化 state，绑定方法
- `static getDerivedStateFromProps()` - 从 props 派生 state
- `render()` - 渲染 UI
- `componentDidMount()` - DOM 挂载后，适合发送请求

**更新阶段（Updating）**
- `static getDerivedStateFromProps()`
- `shouldComponentUpdate()` - 性能优化，控制是否重新渲染
- `render()`
- `getSnapshotBeforeUpdate()` - 获取更新前的快照
- `componentDidUpdate()` - 更新后执行

**卸载阶段（Unmounting）**
- `componentWillUnmount()` - 清理定时器、取消请求

#### 函数组件 Hooks 生命周期
- `useEffect` - 相当于 `componentDidMount`、`componentDidUpdate`、`componentWillUnmount` 的组合
- `useLayoutEffect` - 同步执行，类似 `componentDidMount` 和 `componentDidUpdate`
- `useInsertionEffect` - CSS-in-JS 库专用

### 2. React Hooks

#### 常用 Hooks
| Hook | 用途 |
|------|------|
| `useState` | 状态管理 |
| `useEffect` | 副作用处理 |
| `useContext` | 跨组件状态共享 |
| `useReducer` | 复杂状态管理 |
| `useCallback` | 缓存函数，优化子组件渲染 |
| `useMemo` | 缓存计算结果 |
| `useRef` | 获取 DOM 或存储可变值 |
| `useImperativeHandle` | 自定义暴露给父组件的实例值 |
| `useLayoutEffect` | 同步副作用 |
| `useDebugValue` | DevTools 中显示自定义 hook 标签 |

#### 自定义 Hooks 规则
- 必须以 `use` 开头
- 可以调用其他 Hooks
- 只能在函数组件或其他自定义 Hook 中调用

### 3. 类组件 vs 函数组件

| 特性 | 类组件 | 函数组件 |
|------|--------|----------|
| 语法 | ES6 Class | 函数 |
| 生命周期 | 完整生命周期方法 | Hooks 实现 |
| 状态管理 | this.state | useState/useReducer |
| this 指向 | 需要绑定 | 无 this |
| 性能 | 相对较重 | 轻量，易优化 |
| 代码复用 | HOC、Render Props | 自定义 Hooks |
| 推荐程度 | 逐渐淘汰 | 官方推荐 |

### 4. 虚拟 DOM

**优势**
- 减少 DOM 操作，提升性能
- 跨浏览器兼容
- 批量更新

**流程**
1. JSX 编译为 React.createElement
2. 生成虚拟 DOM 树
3. Diff 算法比较差异
4. 最小化更新真实 DOM

### 5. Fiber 架构

**核心思想**
- 将渲染任务拆分为可中断的小单元
- 实现任务调度和优先级控制
- 支持并发渲染

**优势**
- 大组件渲染不阻塞主线程
- 更好的动画流畅度
- 支持时间切片（Time Slicing）

---

## React 状态管理

### 1. Redux

**核心概念**
- **Store** - 单一数据源
- **Action** - 描述发生什么
- **Reducer** - 计算新状态
- **Dispatch** - 发送 Action

**中间件**
- `redux-thunk` - 异步 Action
- `redux-saga` - 复杂异步流程
- `redux-observable` - 响应式编程

### 2. MobX

**特点**
- 可观察状态（Observable）
- 自动追踪依赖
- 简单的 API，学习曲线低

### 3. Context API

**适用场景**
- 主题切换
- 用户信息
- 语言设置

**局限**
- 性能问题（ Consumers 会全部重新渲染 ）
- 不适合高频更新

### 4. Recoil

**特点**
- 原子状态管理
- 派生状态自动更新
- 支持 React 并发模式

### 5. Zustand

**特点**
- 轻量级
- 无需 Provider 包裹
- 支持 DevTools
- API 简洁

---

## React 性能优化

### 1. React.memo

```jsx
const MemoComponent = React.memo(function MyComponent(props) {
  // 只在 props 变化时重新渲染
});
```

### 2. useMemo

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### 3. useCallback

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 4. 代码分割

```jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

### 5. 其他优化技巧
- 避免内联函数和对象
- 列表渲染使用唯一 key
- 虚拟列表（ react-window ）
- 服务端渲染（ SSR ）

---

## React 常见问题

### 1. setState 是同步还是异步？

**React 18 之前**
- 在 React 事件处理中：异步（批量更新）
- 在 setTimeout/Promise 中：同步

**React 18 之后**
- 默认自动批处理（ Automatic Batching ）
- 所有状态更新都是异步批处理

### 2. React 事件机制

**合成事件（SyntheticEvent）**
- 包装原生事件，跨浏览器兼容
- 事件委托到 document
- 模拟事件冒泡和捕获

**事件池**
- 早期版本使用事件池复用对象
- React 17 移除了事件池

### 3. React Diff 算法

**三个假设**
1. 不同类型元素产生不同树
2. 开发者可以通过 key 暗示子元素稳定性
3. 只比较同层级节点

**策略**
- O(n) 复杂度
- 单向比较，不回溯
- key 的作用：标识节点，优化复用

### 4. React Key 的作用

**正确使用**
```jsx
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

**避免使用索引作为 key**
- 列表重排时性能差
- 可能导致状态错乱

### 5. Portal 的使用

```jsx
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    children,
    document.getElementById('modal-root')
  );
}
```

**用途**
- 模态框
- 下拉菜单
- 提示框

---

## React 进阶

### 1. 高阶组件（HOC）

```jsx
function withLoading(WrappedComponent) {
  return function(props) {
    if (props.isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}
```

### 2. Render Props

```jsx
<DataProvider render={data => <Child data={data} />} />
```

### 3. Error Boundary

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logError(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>出错了</h1>;
    }
    return this.props.children;
  }
}
```

### 4. Suspense

```jsx
<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
```

---

## 面试常问

1. **React 的设计思想是什么？**
   - 组件化、单向数据流、声明式编程

2. **为什么 React 要引入 JSX？**
   - 语法简洁、类型安全、编译时优化

3. **React 如何避免 XSS 攻击？**
   - 自动转义内容，`dangerouslySetInnerHTML` 需谨慎使用

4. **React 服务端渲染（SSR）的优势？**
   - 首屏快、SEO 友好、社交分享好

5. **函数组件捕获了什么？**
   - 每次渲染都有独立的 props 和 state 闭包
