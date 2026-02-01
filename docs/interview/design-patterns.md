---
sidebar_position: 7
title: 设计模式面试题
---

# 设计模式面试题

## 目录
- [基本概念](#基本概念)
- [创建型模式](#创建型模式)
- [结构型模式](#结构型模式)
- [行为型模式](#行为型模式)
- [前端应用实践](#前端应用实践)
- [设计原则](#设计原则)

---

## 基本概念

### 什么是设计模式？

设计模式（Design Pattern）是在软件设计中对常见问题的通用、可重用的解决方案。它们是经过验证的最佳实践，能够帮助开发者写出可维护、可扩展和可复用的代码。

### 设计模式的三大分类

1. **创建型模式（Creational Patterns）**：关注对象的创建机制
2. **结构型模式（Structural Patterns）**：关注类和对象的组合
3. **行为型模式（Behavioral Patterns）**：关注对象之间的通信

### 设计模式的原则

- **开闭原则（OCP）**：对扩展开放，对修改关闭
- **里式替换原则（LSP）**：子类可以替换父类
- **依赖倒置原则（DIP）**：依赖抽象，不依赖具体实现
- **单一职责原则（SRP）**：一个类只负责一个职责
- **接口隔离原则（ISP）**：客户端不应该依赖它不需要的接口
- **迪米特法则（LoD）**：一个对象应该对其他对象有最少的了解

---

## 创建型模式

### 单例模式（Singleton Pattern）

**定义**：确保一个类只有一个实例，并提供一个访问它的全局访问点。

**应用场景**：
- 全局状态管理（如Redux Store、Vuex Store）
- 配置管理器
- 日志记录器
- 数据库连接池
- 浏览器中的window对象

**JavaScript实现**：
```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
    this.data = {};
    return this;
  }

  set(key, value) {
    this.data[key] = value;
  }

  get(key) {
    return this.data[key];
  }
}

// 使用示例
const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // true

// 前端实际应用：全局配置管理
class ConfigManager {
  constructor() {
    if (ConfigManager.instance) {
      return ConfigManager.instance;
    }
    this.config = {};
    ConfigManager.instance = this;
  }

  setConfig(key, value) {
    this.config[key] = value;
  }

  getConfig(key) {
    return this.config[key];
  }
}
```

**面试题**：
1. 如何实现一个线程安全的单例模式？（JavaScript是单线程的，但可以通过闭包实现）
2. 单例模式和全局变量有什么区别？
3. 在React/Vue中如何使用单例模式？

### 工厂模式（Factory Pattern）

**定义**：定义一个创建对象的接口，让子类决定实例化哪一个类。

**应用场景**：
- 创建不同类型的组件
- 根据条件创建不同的API客户端
- 表单验证器工厂
- 图表库中的图表创建

**简单工厂实现**：
```javascript
class Car {
  constructor(options) {
    this.doors = options.doors || 4;
    this.state = options.state || 'brand new';
    this.color = options.color || 'silver';
  }
}

class Truck {
  constructor(options) {
    this.state = options.state || 'used';
    this.wheelSize = options.wheelSize || 'large';
    this.color = options.color || 'blue';
  }
}

class VehicleFactory {
  static createVehicle(options) {
    switch(options.type) {
      case 'car':
        return new Car(options);
      case 'truck':
        return new Truck(options);
      default:
        return null;
    }
  }
}

// 使用示例
const car = VehicleFactory.createVehicle({
  type: 'car',
  doors: 4,
  color: 'red'
});

const truck = VehicleFactory.createVehicle({
  type: 'truck',
  wheelSize: 'medium',
  color: 'black'
});
```

**工厂方法模式实现**：
```javascript
class Product {
  getName() {
    throw new Error('Method must be implemented');
  }
}

class ConcreteProductA extends Product {
  getName() {
    return 'Product A';
  }
}

class ConcreteProductB extends Product {
  getName() {
    return 'Product B';
  }
}

class Creator {
  factoryMethod() {
    throw new Error('Method must be implemented');
  }

  someOperation() {
    const product = this.factoryMethod();
    return `Creator: ${product.getName()}`;
  }
}

class ConcreteCreatorA extends Creator {
  factoryMethod() {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  factoryMethod() {
    return new ConcreteProductB();
  }
}

// 前端实际应用：组件工厂
class ComponentFactory {
  static createComponent(type, props) {
    switch(type) {
      case 'button':
        return new ButtonComponent(props);
      case 'input':
        return new InputComponent(props);
      case 'select':
        return new SelectComponent(props);
      default:
        throw new Error(`Unknown component type: ${type}`);
    }
  }
}
```

**面试题**：
1. 简单工厂、工厂方法和抽象工厂有什么区别？
2. 在React中如何使用工厂模式创建组件？
3. 工厂模式和构造函数模式有什么区别？

### 建造者模式（Builder Pattern）

**定义**：将一个复杂对象的构建与其表示分离，使得同样的构建过程可以创建不同的表示。

**应用场景**：
- 构建复杂的配置对象
- 创建复杂的DOM结构
- SQL查询构建器
- 配置文件生成器

**实现示例**：
```javascript
class UserBuilder {
  constructor() {
    this.user = {};
  }

  setName(name) {
    this.user.name = name;
    return this;
  }

  setAge(age) {
    this.user.age = age;
    return this;
  }

  setEmail(email) {
    this.user.email = email;
    return this;
  }

  setAddress(address) {
    this.user.address = address;
    return this;
  }

  build() {
    return this.user;
  }
}

// 使用示例
const user = new UserBuilder()
  .setName('John')
  .setAge(30)
  .setEmail('john@example.com')
  .setAddress('Beijing')
  .build();

// 前端实际应用：API请求构建器
class ApiRequestBuilder {
  constructor(baseURL) {
    this.request = {
      url: baseURL,
      method: 'GET',
      headers: {},
      params: {},
      body: null
    };
  }

  method(method) {
    this.request.method = method;
    return this;
  }

  header(key, value) {
    this.request.headers[key] = value;
    return this;
  }

  param(key, value) {
    this.request.params[key] = value;
    return this;
  }

  body(data) {
    this.request.body = JSON.stringify(data);
    return this;
  }

  build() {
    return this.request;
  }
}

// 使用示例
const request = new ApiRequestBuilder('https://api.example.com/users')
  .method('POST')
  .header('Content-Type', 'application/json')
  .header('Authorization', 'Bearer token123')
  .body({ name: 'John', age: 30 })
  .build();
```

**面试题**：
1. 建造者模式和工厂模式有什么区别？
2. 在什么情况下应该使用建造者模式？
3. 如何实现一个链式调用的建造者？

### 原型模式（Prototype Pattern）

**定义**：用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。

**应用场景**：
- 创建复杂对象的副本
- 对象克隆
- 避免重复初始化

**JavaScript实现**：
```javascript
// 使用Object.create实现原型继承
const carPrototype = {
  init(model) {
    this.model = model;
  },

  getModel() {
    console.log(`The model of this car is ${this.model}`);
  }
};

const car1 = Object.create(carPrototype);
car1.init('Toyota');

const car2 = Object.create(carPrototype);
car2.init('Honda');

// 深拷贝实现
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }

  if (typeof obj === 'object') {
    const clonedObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

// 使用示例
const original = {
  name: 'John',
  age: 30,
  address: {
    city: 'Beijing',
    country: 'China'
  },
  hobbies: ['reading', 'coding']
};

const cloned = deepClone(original);
```

**面试题**：
1. 深拷贝和浅拷贝的区别是什么？
2. 如何实现一个完整的深拷贝函数？
3. 原型模式和原型继承有什么区别？

---

## 结构型模式

### 适配器模式（Adapter Pattern）

**定义**：将一个类的接口转换成客户希望的另一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

**应用场景**：
- API兼容性处理
- 第三方库适配
- 不同数据源统一接口
- 旧代码重构

**实现示例**：
```javascript
// 旧接口
class OldAPI {
  request() {
    return 'Old API response';
  }
}

// 新接口
class NewAPI {
  fetch() {
    return 'New API response';
  }
}

// 适配器
class APIService {
  constructor(api) {
    this.api = api;
  }

  getData() {
    // 统一接口，适配不同的API
    if (this.api.fetch) {
      return this.api.fetch();
    } else if (this.api.request) {
      return this.api.request();
    }
  }
}

// 使用示例
const oldService = new APIService(new OldAPI());
console.log(oldService.getData()); // Old API response

const newService = new APIService(new NewAPI());
console.log(newService.getData()); // New API response

// 前端实际应用：LocalStorage适配器
class StorageAdapter {
  constructor() {
    this.storage = window.localStorage;
  }

  set(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  }

  get(key) {
    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  }

  remove(key) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

// 还可以适配其他存储方式
class SessionStorageAdapter extends StorageAdapter {
  constructor() {
    super();
    this.storage = window.sessionStorage;
  }
}
```

**面试题**：
1. 适配器模式和装饰器模式有什么区别？
2. 在前端中如何使用适配器模式处理不同浏览器的差异？
3. 如何实现一个支持多种数据源的适配器？

### 装饰器模式（Decorator Pattern）

**定义**：动态地给一个对象添加一些额外的职责，就增加功能来说，装饰器模式相比生成子类更为灵活。

**应用场景**：
- AOP（面向切面编程）
- 日志记录
- 性能监控
- 权限验证
- 缓存机制

**JavaScript实现（ES6装饰器语法）**：
```javascript
// 日志装饰器
function logMethod(target, key, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args) {
    console.log(`调用 ${key} 方法，参数:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`方法 ${key} 返回:`, result);
    return result;
  };

  return descriptor;
}

// 性能监控装饰器
function measurePerformance(target, key, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${key} 执行耗时: ${end - start} 毫秒`);
    return result;
  };

  return descriptor;
}

// 使用示例
class UserService {
  @logMethod
  @measurePerformance
  getUser(id) {
    // 模拟API调用
    return fetch(`/api/users/${id}`).then(res => res.json());
  }

  @logMethod
  updateUser(id, data) {
    return fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }).then(res => res.json());
  }
}

// 使用高阶函数实现装饰器模式（兼容ES5）
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Person {
  constructor(name) {
    this._name = name;
  }

  @readonly
  get name() {
    return this._name;
  }
}

// 前端实际应用：表单验证装饰器
function validate(rules) {
  return function(target, key, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(formData) {
      const errors = {};

      rules.forEach(rule => {
        const value = formData[rule.field];
        if (rule.required && !value) {
          errors[rule.field] = `${rule.field} 是必填项`;
        }
        if (rule.pattern && value && !rule.pattern.test(value)) {
          errors[rule.field] = rule.message || `${rule.field} 格式不正确`;
        }
      });

      if (Object.keys(errors).length > 0) {
        throw new Error(JSON.stringify(errors));
      }

      return originalMethod.call(this, formData);
    };

    return descriptor;
  };
}
```

**面试题**：
1. 装饰器模式和代理模式有什么区别？
2. 如何实现一个支持多个装饰器的函数？
3. 在React或Vue中如何实现装饰器模式？

### 代理模式（Proxy Pattern）

**定义**：为其他对象提供一种代理以控制对这个对象的访问。

**应用场景**：
- 虚拟代理（图片懒加载）
- 保护代理（权限控制）
- 缓存代理
- 远程代理
- 性能监控

**ES6 Proxy实现**：
```javascript
// 虚拟代理示例：图片懒加载
class Image {
  constructor(url) {
    this.url = url;
    console.log(`从 ${url} 加载图片`);
  }

  display() {
    console.log(`显示图片: ${this.url}`);
  }
}

class ProxyImage {
  constructor(url) {
    this.url = url;
    this.image = null;
  }

  display() {
    if (!this.image) {
      this.image = new Image(this.url);
    }
    this.image.display();
  }
}

// 使用示例
const image = new ProxyImage('http://example.com/picture.jpg');
console.log('图片代理创建完成');
image.display(); // 第一次实际加载
image.display(); // 第二次使用缓存

// 缓存代理
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log('从缓存中获取结果');
      return cache.get(key);
    }

    console.log('计算新结果');
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// 使用示例
const expensiveCalculation = (n) => {
  console.log(`计算 ${n} 的平方`);
  return n * n;
};

const memoizedCalc = memoize(expensiveCalculation);

memoizedCalc(5); // 计算并缓存
memoizedCalc(5); // 直接使用缓存

// 前端实际应用：API代理
class ApiProxy {
  constructor(api) {
    this.api = api;
    this.cache = new Map();
    this.rateLimit = new Map();
  }

  async request(url, options = {}) {
    const cacheKey = `${url}-${JSON.stringify(options)}`;

    // 缓存逻辑
    if (options.cache && this.cache.has(cacheKey)) {
      console.log('从缓存获取');
      return this.cache.get(cacheKey);
    }

    // 限流逻辑
    const now = Date.now();
    const key = url.split('/')[3]; // 简单的限流key
    const window = this.rateLimit.get(key) || { count: 0, start: now };

    if (now - window.start < 60000 && window.count >= 10) {
      throw new Error('Rate limit exceeded');
    }

    // 更新限流
    if (now - window.start >= 60000) {
      this.rateLimit.set(key, { count: 1, start: now });
    } else {
      window.count++;
    }

    // 实际请求
    const response = await this.api.request(url, options);

    // 缓存结果
    if (options.cache) {
      this.cache.set(cacheKey, response);
    }

    return response;
  }
}
```

**面试题**：
1. Proxy和Object.defineProperty有什么区别？
2. 如何实现一个支持缓存和限流的代理？
3. 在Vue 3的响应式系统中如何实现代理模式？

### 外观模式（Facade Pattern）

**定义**：为子系统中的一组接口提供一个一致的界面，此模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。

**应用场景**：
- 封装复杂的API调用
- 提供简化的接口
- 跨浏览器兼容性处理
- 框架入口

**实现示例**：
```javascript
class CPU {
  start() {
    console.log('CPU started');
  }
}

class Memory {
  load(position, data) {
    console.log(`Loading data to memory at position ${position}`);
  }
}

class HardDrive {
  read(sector, size) {
    console.log(`Reading ${size} bytes from sector ${sector}`);
    return 'data';
  }
}

// 外观类
class Computer {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }

  start() {
    console.log('Starting computer...');
    this.cpu.start();
    this.memory.load(0, this.hardDrive.read(0, 1024));
    console.log('Computer started');
  }
}

// 使用示例
const computer = new Computer();
computer.start();

// 前端实际应用：Ajax库外观
class AjaxFacade {
  static get(url, params = {}) {
    return this.request(url, 'GET', params);
  }

  static post(url, data) {
    return this.request(url, 'POST', data);
  }

  static put(url, data) {
    return this.request(url, 'PUT', data);
  }

  static delete(url) {
    return this.request(url, 'DELETE');
  }

  static async request(url, method, data) {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }
}

// 使用示例
const loadUserData = async (userId) => {
  try {
    const user = await AjaxFacade.get(`/api/users/${userId}`);
    const posts = await AjaxFacade.get(`/api/users/${userId}/posts`);

    return { user, posts };
  } catch (error) {
    console.error('Failed to load user data:', error);
  }
};
```

**面试题**：
1. 外观模式和适配器模式有什么区别？
2. 如何设计一个统一的API外观层？
3. 外观模式在框架设计中有什么应用？

### 组合模式（Composite Pattern）

**定义**：将对象组合成树形结构以表示"部分-整体"的层次结构。使得用户对单个对象和组合对象的使用具有一致性。

**应用场景**：
- 树形组件（如文件系统、菜单、组织架构）
- 表单元素
- DOM操作
- 命令执行队列

**实现示例**：
```javascript
class Component {
  constructor(name) {
    this.name = name;
  }

  operation() {
    throw new Error('Method must be implemented');
  }

  add(component) {
    throw new Error('Method not supported');
  }

  remove(component) {
    throw new Error('Method not supported');
  }

  getChild(index) {
    throw new Error('Method not supported');
  }
}

class Leaf extends Component {
  operation() {
    console.log(`Leaf ${this.name} operation`);
  }
}

class Composite extends Component {
  constructor(name) {
    super(name);
    this.children = [];
  }

  operation() {
    console.log(`Composite ${this.name} operation`);
    this.children.forEach(child => child.operation());
  }

  add(component) {
    this.children.push(component);
  }

  remove(component) {
    const index = this.children.indexOf(component);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

  getChild(index) {
    return this.children[index];
  }
}

// 使用示例
const tree = new Composite('root');
const branch1 = new Composite('branch1');
const branch2 = new Composite('branch2');

const leaf1 = new Leaf('leaf1');
const leaf2 = new Leaf('leaf2');
const leaf3 = new Leaf('leaf3');

tree.add(branch1);
tree.add(branch2);
tree.add(leaf3);

branch1.add(leaf1);
branch2.add(leaf2);

tree.operation();

// 前端实际应用：React组件树
import React from 'react';

// 叶节点组件（具体的UI组件）
const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);

const Input = ({ value, onChange }) => (
  <input value={value} onChange={onChange} />
);

// 组合组件（容器组件）
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
  }

  submit() {
    console.log('Submitting form with children:', this.children);
  }

  render() {
    return (
      <form>
        {this.props.children}
      </form>
    );
  }
}

// 使用示例
const MyForm = () => (
  <Form>
    <Input value="" onChange={() => {}} />
    <Input value="" onChange={() => {}} />
    <Button text="Submit" onClick={() => {}} />
  </Form>
);

// 文件系统组件示例
class FileSystemComponent {
  constructor(name) {
    this.name = name;
  }

  display(indent = 0) {
    throw new Error('Method must be implemented');
  }
}

class File extends FileSystemComponent {
  display(indent = 0) {
    console.log(`${' '.repeat(indent)}📄 ${this.name}`);
  }
}

class Directory extends FileSystemComponent {
  constructor(name) {
    super(name);
    this.children = [];
  }

  add(component) {
    this.children.push(component);
  }

  display(indent = 0) {
    console.log(`${' '.repeat(indent)}📁 ${this.name}`);
    this.children.forEach(child => child.display(indent + 2));
  }
}

// 使用示例
const root = new Directory('root');
const docs = new Directory('docs');
const src = new Directory('src');

const readme = new File('README.md');
const app = new File('app.js');
const index = new File('index.js');

root.add(docs);
root.add(src);
docs.add(readme);
src.add(app);
src.add(index);

root.display();
```

**面试题**：
1. 组合模式和装饰器模式有什么区别？
2. 如何实现一个支持遍历的树形结构？
3. 在React或Vue中如何实现组合模式？

### 享元模式（Flyweight Pattern）

**定义**：运用共享技术有效地支持大量细粒度的对象。

**应用场景**：
- 大量相似对象的场景（如游戏中的粒子、字符渲染）
- 对象的大部分状态可以外部化
- 对象创建开销大

**实现示例**：
```javascript
// 享元类
class TreeType {
  constructor(name, color, texture) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }

  display(x, y, size) {
    console.log(`Display ${this.name} tree at (${x}, ${y}) with size ${size}`);
  }
}

// 享元工厂
class TreeFactory {
  constructor() {
    this.treeTypes = {};
  }

  getTreeType(name, color, texture) {
    const key = `${name}-${color}-${texture}`;

    if (!this.treeTypes[key]) {
      this.treeTypes[key] = new TreeType(name, color, texture);
    }

    return this.treeTypes[key];
  }

  getCount() {
    return Object.keys(this.treeTypes).length;
  }
}

// 使用享元的树对象
class Tree {
  constructor(x, y, size, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type; // 共享的享元对象
  }

  display() {
    this.type.display(this.x, this.y, this.size);
  }
}

// 森林类，管理所有的树
class Forest {
  constructor() {
    this.trees = [];
    this.factory = new TreeFactory();
  }

  plantTree(x, y, name, color, texture, size) {
    const type = this.factory.getTreeType(name, color, texture);
    const tree = new Tree(x, y, size, type);
    this.trees.push(tree);
  }

  display() {
    this.trees.forEach(tree => tree.display());
  }

  getTreeCount() {
    return this.trees.length;
  }

  getTreeTypeCount() {
    return this.factory.getCount();
  }
}

// 使用示例
const forest = new Forest();

// 种植大量树
for (let i = 0; i < 1000; i++) {
  forest.plantTree(
    Math.random() * 100,
    Math.random() * 100,
    'oak',
    'green',
    'rough',
    Math.random() * 10 + 1
  );
}

for (let i = 0; i < 1000; i++) {
  forest.plantTree(
    Math.random() * 100,
    Math.random() * 100,
    'pine',
    'darkgreen',
    'smooth',
    Math.random() * 10 + 1
  );
}

forest.display();
console.log(`Total trees: ${forest.getTreeCount()}`); // 2000
console.log(`Tree types: ${forest.getTreeTypeCount()}`); // 2

// 前端实际应用：事件处理享元
class EventHandler {
  constructor(action) {
    this.action = action;
  }

  handle(event) {
    console.log(`Handling event for ${this.action}`);
    this.action(event);
  }
}

class EventHandlerFactory {
  constructor() {
    this.handlers = new Map();
  }

  getHandler(action) {
    const key = action.toString();

    if (!this.handlers.has(key)) {
      this.handlers.set(key, new EventHandler(action));
    }

    return this.handlers.get(key);
  }
}

// 使用示例
const factory = new EventHandlerFactory();

// 即使有1000个点击事件，但只会有2个处理函数实例
const clickHandler1 = factory.getHandler(() => console.log('Button clicked'));
const clickHandler2 = factory.getHandler(() => console.log('Link clicked'));

// DOM元素可以共享这些处理函数
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', clickHandler1.handle.bind(clickHandler1));
});

document.querySelectorAll('.link').forEach(link => {
  link.addEventListener('click', clickHandler2.handle.bind(clickHandler2));
});
```

**面试题**：
1. 享元模式和对象池有什么区别？
2. 如何识别可以应用享元模式的场景？
3. 享元模式有哪些缺点？

---

## 行为型模式

### 观察者模式（Observer Pattern）

**定义**：定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

**应用场景**：
- 发布-订阅系统
- 事件系统
- 数据绑定（Vue响应式、React状态）
- Redux、Vuex等状态管理

**实现示例**：
```javascript
class Subject {
  constructor() {
    this.observers = [];
    this.state = null;
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify() {
    this.observers.forEach(observer => observer.update(this.state));
  }

  setState(state) {
    this.state = state;
    this.notify();
  }

  getState() {
    return this.state;
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(state) {
    console.log(`${this.name} received update: ${state}`);
  }
}

// 使用示例
const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

subject.attach(observer1);
subject.attach(observer2);

subject.setState('State 1'); // 两个观察者都会收到通知
subject.detach(observer1);
subject.setState('State 2'); // 只有observer2会收到通知

// 前端实际应用：发布-订阅模式（Event Emitter）
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event, callback) {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  emit(event, ...args) {
    if (!this.events[event]) {
      return;
    }

    this.events[event].forEach(callback => {
      callback.apply(this, args);
    });
  }

  once(event, callback) {
    const onceWrapper = (...args) => {
      callback.apply(this, args);
      this.off(event, onceWrapper);
    };

    this.on(event, onceWrapper);
  }
}

// 使用示例
const emitter = new EventEmitter();

// 注册多个监听器
emitter.on('data', (data) => {
  console.log('Listener 1:', data);
});

emitter.on('data', (data) => {
  console.log('Listener 2:', data);
});

emitter.on('error', (error) => {
  console.error('Error:', error);
});

// 触发事件
emitter.emit('data', { message: 'Hello' });
emitter.emit('error', new Error('Something went wrong'));

// 只触发一次的监听器
emitter.once('init', () => {
  console.log('Initialization complete');
});

emitter.emit('init'); // 会执行
emitter.emit('init'); // 不会执行

// Vue中的观察者模式实现（简化版）
class Dep {
  constructor() {
    this.subscribers = [];
  }

  depend() {
    if (Dep.target && !this.subscribers.includes(Dep.target)) {
      this.subscribers.push(Dep.target);
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

Dep.target = null;

function reactive(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        dep.depend();
        return value;
      },
      set(newValue) {
        value = newValue;
        dep.notify();
      }
    });
  });

  return obj;
}

function watchEffect(fn) {
  Dep.target = fn;
  fn();
  Dep.target = null;
}

// 使用示例
const state = reactive({ count: 0 });

watchEffect(() => {
  console.log(`Count changed: ${state.count}`);
});

state.count = 1; // 触发更新
state.count = 2; // 触发更新
```

**面试题**：
1. 观察者模式和发布订阅模式有什么区别？
2. 如何实现一个支持事件优先级的发布订阅系统？
3. Vue的响应式系统是如何使用观察者模式的？

### 策略模式（Strategy Pattern）

**定义**：定义一系列算法，把它们一个个封装起来，并且使它们可相互替换。

**应用场景**：
- 表单验证规则
- 支付方式选择
- 排序算法
- 数据格式化
- 图表渲染策略

**实现示例**：
```javascript
// 策略接口
class ValidationStrategy {
  validate(value) {
    throw new Error('Method must be implemented');
  }
}

// 具体策略
class RequiredValidation extends ValidationStrategy {
  validate(value) {
    return value !== null && value !== undefined && value !== '';
  }

  getErrorMessage() {
    return 'This field is required';
  }
}

class EmailValidation extends ValidationStrategy {
  validate(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  getErrorMessage() {
    return 'Please enter a valid email address';
  }
}

class MinLengthValidation extends ValidationStrategy {
  constructor(minLength) {
    super();
    this.minLength = minLength;
  }

  validate(value) {
    return value.length >= this.minLength;
  }

  getErrorMessage() {
    return `Minimum length is ${this.minLength} characters`;
  }
}

class MaxLengthValidation extends ValidationStrategy {
  constructor(maxLength) {
    super();
    this.maxLength = maxLength;
  }

  validate(value) {
    return value.length <= this.maxLength;
  }

  getErrorMessage() {
    return `Maximum length is ${this.maxLength} characters`;
  }
}

// 上下文
class Validator {
  constructor() {
    this.validations = [];
  }

  addValidation(strategy) {
    this.validations.push(strategy);
  }

  validate(value) {
    const errors = [];

    for (let validation of this.validations) {
      if (!validation.validate(value)) {
        errors.push(validation.getErrorMessage());
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// 使用示例
const emailValidator = new Validator();
emailValidator.addValidation(new RequiredValidation());
emailValidator.addValidation(new EmailValidation());
emailValidator.addValidation(new MinLengthValidation(5));

const result = emailValidator.validate('test@example.com');
console.log(result); // { isValid: true, errors: [] }

const result2 = emailValidator.validate('tes');
console.log(result2); // { isValid: false, errors: [...] }

// 前端实际应用：支付方式策略
class PaymentStrategy {
  pay(amount) {
    throw new Error('Method must be implemented');
  }
}

class CreditCardPayment extends PaymentStrategy {
  constructor(cardNumber, cvv) {
    super();
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }

  pay(amount) {
    console.log(`Paying $${amount} with credit card ${this.cardNumber}`);
    return { success: true, method: 'credit_card' };
  }
}

class PayPalPayment extends PaymentStrategy {
  constructor(email) {
    super();
    this.email = email;
  }

  pay(amount) {
    console.log(`Paying $${amount} with PayPal account ${this.email}`);
    return { success: true, method: 'paypal' };
  }
}

class WeChatPayment extends PaymentStrategy {
  constructor(openId) {
    super();
    this.openId = openId;
  }

  pay(amount) {
    console.log(`Paying $${amount} with WeChat ${this.openId}`);
    return { success: true, method: 'wechat' };
  }
}

// 支付上下文
class PaymentProcessor {
  constructor() {
    this.strategies = {
      credit_card: CreditCardPayment,
      paypal: PayPalPayment,
      wechat: WeChatPayment
    };
  }

  processPayment(method, amount, config) {
    const Strategy = this.strategies[method];
    if (!Strategy) {
      throw new Error(`Unsupported payment method: ${method}`);
    }

    const strategy = new Strategy(config);
    return strategy.pay(amount);
  }
}

// 使用示例
const processor = new PaymentProcessor();

processor.processPayment('credit_card', 100, {
  cardNumber: '1234-5678-9012-3456',
  cvv: '123'
});

processor.processPayment('paypal', 50, {
  email: 'user@example.com'
});

// 排序策略
class SortStrategy {
  sort(list) {
    throw new Error('Method must be implemented');
  }
}

class BubbleSort extends SortStrategy {
  sort(list) {
    console.log('Using Bubble Sort');
    const arr = [...list];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

class QuickSort extends SortStrategy {
  sort(list) {
    console.log('Using Quick Sort');
    if (list.length <= 1) return list;

    const pivot = list[0];
    const left = list.slice(1).filter(x => x < pivot);
    const right = list.slice(1).filter(x => x >= pivot);

    return [...this.sort(left), pivot, ...this.sort(right)];
  }
}

class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  sort(list) {
    return this.strategy.sort(list);
  }
}

// 使用示例
const numbers = [64, 34, 25, 12, 22, 11, 90];

const sorter = new Sorter(new BubbleSort());
console.log(sorter.sort(numbers));

sorter.setStrategy(new QuickSort());
console.log(sorter.sort(numbers));
```

**面试题**：
1. 策略模式和状态模式有什么区别？
2. 如何实现一个支持动态添加策略的策略模式？
3. 在表单验证中如何使用策略模式？

### 命令模式（Command Pattern）

**定义**：将一个请求封装为一个对象，从而使我们可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作。

**应用场景**：
- 撤销/重做功能
- 宏命令
- 操作队列
- 菜单系统
- 异步操作管理

**实现示例**：
```javascript
// 命令接口
class Command {
  execute() {
    throw new Error('Method must be implemented');
  }

  undo() {
    throw new Error('Method must be implemented');
  }
}

// 具体命令
class AddTextCommand extends Command {
  constructor(receiver, text) {
    super();
    this.receiver = receiver;
    this.text = text;
    this.previousText = null;
  }

  execute() {
    this.previousText = this.receiver.getText();
    this.receiver.addText(this.text);
  }

  undo() {
    if (this.previousText !== null) {
      this.receiver.setText(this.previousText);
    }
  }
}

class DeleteTextCommand extends Command {
  constructor(receiver, start, length) {
    super();
    this.receiver = receiver;
    this.start = start;
    this.length = length;
    this.deletedText = null;
  }

  execute() {
    this.deletedText = this.receiver.getText().substring(
      this.start,
      this.start + this.length
    );
    this.receiver.deleteText(this.start, this.length);
  }

  undo() {
    if (this.deletedText !== null) {
      this.receiver.insertText(this.start, this.deletedText);
    }
  }
}

// 接收者
class TextEditor {
  constructor() {
    this.text = '';
    this.commands = [];
    this.currentIndex = -1;
  }

  executeCommand(command) {
    command.execute();
    this.commands = this.commands.slice(0, this.currentIndex + 1);
    this.commands.push(command);
    this.currentIndex++;
  }

  undo() {
    if (this.currentIndex >= 0) {
      const command = this.commands[this.currentIndex];
      command.undo();
      this.currentIndex--;
    }
  }

  redo() {
    if (this.currentIndex < this.commands.length - 1) {
      this.currentIndex++;
      const command = this.commands[this.currentIndex];
      command.execute();
    }
  }

  getText() {
    return this.text;
  }

  setText(text) {
    this.text = text;
  }

  addText(text) {
    this.text += text;
  }

  deleteText(start, length) {
    this.text = this.text.substring(0, start) +
                this.text.substring(start + length);
  }

  insertText(position, text) {
    this.text = this.text.substring(0, position) +
                text +
                this.text.substring(position);
  }
}

// 使用示例
const editor = new TextEditor();

const command1 = new AddTextCommand(editor, 'Hello');
const command2 = new AddTextCommand(editor, ' World');
const command3 = new DeleteTextCommand(editor, 5, 6);

editor.executeCommand(command1);
console.log(editor.getText()); // "Hello"

editor.executeCommand(command2);
console.log(editor.getText()); // "Hello World"

editor.executeCommand(command3);
console.log(editor.getText()); // "Hello"

editor.undo();
console.log(editor.getText()); // "Hello World"

editor.undo();
console.log(editor.getText()); // "Hello"

// 前端实际应用：异步命令队列
class AsyncCommand {
  constructor(fn) {
    this.fn = fn;
    this.status = 'pending';
    this.result = null;
    this.error = null;
  }

  async execute() {
    try {
      this.status = 'running';
      this.result = await this.fn();
      this.status = 'success';
      return this.result;
    } catch (error) {
      this.status = 'failed';
      this.error = error;
      throw error;
    }
  }
}

class CommandQueue {
  constructor() {
    this.queue = [];
    this.isRunning = false;
  }

  add(fn) {
    const command = new AsyncCommand(fn);
    this.queue.push(command);
    this.run();
    return command;
  }

  async run() {
    if (this.isRunning || this.queue.length === 0) {
      return;
    }

    this.isRunning = true;

    while (this.queue.length > 0) {
      const command = this.queue.shift();
      try {
        await command.execute();
        console.log('Command executed successfully');
      } catch (error) {
        console.error('Command failed:', error);
      }
    }

    this.isRunning = false;
  }

  clear() {
    this.queue = [];
  }
}

// 使用示例
const queue = new CommandQueue();

// 添加多个异步命令
queue.add(() => fetch('/api/users').then(res => res.json()));
queue.add(() => fetch('/api/posts').then(res => res.json()));
queue.add(() => fetch('/api/comments').then(res => res.json()));

// 宏命令（组合命令）
class MacroCommand extends Command {
  constructor() {
    super();
    this.commands = [];
  }

  add(command) {
    this.commands.push(command);
  }

  remove(command) {
    const index = this.commands.indexOf(command);
    if (index > -1) {
      this.commands.splice(index, 1);
    }
  }

  execute() {
    this.commands.forEach(command => command.execute());
  }

  undo() {
    for (let i = this.commands.length - 1; i >= 0; i--) {
      this.commands[i].undo();
    }
  }
}

// 使用宏命令
const macro = new MacroCommand();
macro.add(new AddTextCommand(editor, 'First '));
macro.add(new AddTextCommand(editor, 'Second '));
macro.add(new AddTextCommand(editor, 'Third'));

editor.executeCommand(macro); // 执行三个命令
editor.undo(); // 撤销三个命令
```

**面试题**：
1. 命令模式和策略模式有什么区别？
2. 如何实现一个支持撤销/重做的命令系统？
3. 宏命令有什么优缺点？

### 迭代器模式（Iterator Pattern）

**定义**：提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。

**应用场景**：
- 遍历复杂数据结构
- 实现自定义迭代器
- 数据分页
- 异步迭代

**JavaScript实现**：
```javascript
// 迭代器接口
class Iterator {
  hasNext() {
    throw new Error('Method must be implemented');
  }

  next() {
    throw new Error('Method must be implemented');
  }
}

// 具体迭代器
class ArrayIterator extends Iterator {
  constructor(array) {
    super();
    this.array = array;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.array.length;
  }

  next() {
    if (!this.hasNext()) {
      throw new Error('No more elements');
    }
    return this.array[this.index++];
  }
}

// 聚合接口
class Aggregate {
  createIterator() {
    throw new Error('Method must be implemented');
  }
}

// 具体聚合
class NumbersCollection extends Aggregate {
  constructor() {
    super();
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  get(index) {
    return this.items[index];
  }

  getCount() {
    return this.items.length;
  }

  createIterator() {
    return new ArrayIterator(this.items);
  }
}

// 使用示例
const numbers = new NumbersCollection();
numbers.add(1);
numbers.add(2);
numbers.add(3);

const iterator = numbers.createIterator();
while (iterator.hasNext()) {
  console.log(iterator.next()); // 1, 2, 3
}

// ES6迭代器
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  add(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }

    this.length++;
  }

  [Symbol.iterator]() {
    let current = this.head;

    return {
      next() {
        if (current) {
          const value = current.value;
          current = current.next;
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }
}

// 使用示例
const list = new LinkedList();
list.add('a');
list.add('b');
list.add('c');

// 使用for...of遍历
for (let item of list) {
  console.log(item); // a, b, c
}

// 异步迭代器
class AsyncDataFetcher {
  constructor(pages) {
    this.pages = pages;
    this.currentPage = 0;
  }

  async *[Symbol.asyncIterator]() {
    while (this.currentPage < this.pages) {
      const data = await this.fetchPage(this.currentPage);
      yield data;
      this.currentPage++;
    }
  }

  async fetchPage(page) {
    // 模拟异步请求
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ page, data: [`item${page}1`, `item${page}2`, `item${page}3`] });
      }, 1000);
    });
  }
}

// 使用示例
const fetcher = new AsyncDataFetcher(3);

(async () => {
  for await (const pageData of fetcher) {
    console.log(pageData);
  }
})();

// 前端实际应用：分页迭代器
class PaginationIterator {
  constructor(apiClient, pageSize = 10) {
    this.apiClient = apiClient;
    this.pageSize = pageSize;
    this.currentPage = 0;
    this.totalPages = 0;
    this.currentItems = [];
    this.itemIndex = 0;
  }

  async next() {
    // 如果当前页的数据已经遍历完，加载下一页
    if (this.itemIndex >= this.currentItems.length) {
      this.currentPage++;

      if (this.currentPage > this.totalPages && this.currentPage > 1) {
        return { done: true };
      }

      const response = await this.apiClient.getPage(this.currentPage, this.pageSize);
      this.currentItems = response.items;
      this.itemIndex = 0;

      if (this.totalPages === 0) {
        this.totalPages = Math.ceil(response.total / this.pageSize);
      }

      // 如果没有数据了
      if (this.currentItems.length === 0) {
        return { done: true };
      }
    }

    const item = this.currentItems[this.itemIndex++];
    return { value: item, done: false };
  }

  [Symbol.asyncIterator]() {
    return {
      next: () => this.next()
    };
  }
}

// 使用示例
const apiClient = {
  async getPage(page, pageSize) {
    // 模拟API调用
    return {
      items: Array.from({ length: pageSize }, (_, i) => ({
        id: (page - 1) * pageSize + i,
        name: `Item ${(page - 1) * pageSize + i}`
      })),
      total: 50
    };
  }
};

// 遍历所有分页数据
(async () => {
  const iterator = new PaginationIterator(apiClient, 10);

  for await (const item of iterator) {
    console.log(item);
  }
})();
```

**面试题**：
1. 迭代器模式和观察者模式有什么区别？
2. 如何实现一个支持双向遍历的迭代器？
3. ES6的迭代器协议有什么特点？

### 状态模式（State Pattern）

**定义**：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。

**应用场景**：
- 工作流引擎
- 游戏状态机
- 订单状态流转
- 表单验证状态

**实现示例**：
```javascript
// 状态接口
class State {
  handle(context) {
    throw new Error('Method must be implemented');
  }
}

// 具体状态
class PendingState extends State {
  handle(order) {
    console.log('Order is pending payment');
    console.log('You can cancel or complete the payment');

    if (order.paymentReceived) {
      order.setState(new PaidState());
    } else if (order.cancelled) {
      order.setState(new CancelledState());
    }
  }
}

class PaidState extends State {
  handle(order) {
    console.log('Order has been paid');
    console.log('Preparing for shipment...');

    if (order.shipped) {
      order.setState(new ShippedState());
    }
  }
}

class ShippedState extends State {
  handle(order) {
    console.log('Order has been shipped');
    console.log('Tracking number:', order.trackingNumber);

    if (order.delivered) {
      order.setState(new DeliveredState());
    }
  }
}

class DeliveredState extends State {
  handle(order) {
    console.log('Order has been delivered');
    console.log('Thank you for your purchase!');
  }
}

class CancelledState extends State {
  handle(order) {
    console.log('Order has been cancelled');
    console.log('Refund will be processed within 3-5 business days');
  }
}

// 上下文
class Order {
  constructor() {
    this.state = new PendingState();
    this.paymentReceived = false;
    this.cancelled = false;
    this.shipped = false;
    this.delivered = false;
    this.trackingNumber = null;
  }

  setState(state) {
    this.state = state;
  }

  pay() {
    this.paymentReceived = true;
    this.state.handle(this);
  }

  cancel() {
    this.cancelled = true;
    this.state.handle(this);
  }

  ship(trackingNumber) {
    this.shipped = true;
    this.trackingNumber = trackingNumber;
    this.state.handle(this);
  }

  deliver() {
    this.delivered = true;
    this.state.handle(this);
  }

  process() {
    this.state.handle(this);
  }
}

// 使用示例
const order = new Order();
order.process(); // Order is pending payment

order.pay(); // Order has been paid
order.ship('TRK123456'); // Order has been shipped
order.deliver(); // Order has been delivered

// 前端实际应用：Promise状态机
class PromiseStateMachine {
  constructor(executor) {
    this.state = 'pending';
    this.value = null;
    this.reason = null;
    this.handlers = [];

    try {
      executor(
        (value) => this.transition('fulfilled', value),
        (reason) => this.transition('rejected', reason)
      );
    } catch (error) {
      this.transition('rejected', error);
    }
  }

  transition(state, result) {
    if (this.state !== 'pending') {
      return;
    }

    this.state = state;

    if (state === 'fulfilled') {
      this.value = result;
    } else if (state === 'rejected') {
      this.reason = result;
    }

    this.handlers.forEach(handler => this.handle(handler));
    this.handlers = [];
  }

  handle(handler) {
    const { onFulfilled, onRejected, resolve, reject } = handler;

    try {
      if (this.state === 'fulfilled') {
        if (onFulfilled) {
          resolve(onFulfilled(this.value));
        } else {
          resolve(this.value);
        }
      } else if (this.state === 'rejected') {
        if (onRejected) {
          resolve(onRejected(this.reason));
        } else {
          reject(this.reason);
        }
      }
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new PromiseStateMachine((resolve, reject) => {
      const handler = { onFulfilled, onRejected, resolve, reject };

      if (this.state === 'pending') {
        this.handlers.push(handler);
      } else {
        this.handle(handler);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// 使用示例
const promise = new PromiseStateMachine((resolve, reject) => {
  setTimeout(() => {
    console.log('Promise state:', promise.state); // pending
    resolve('Success!');
  }, 1000);
});

promise.then((value) => {
  console.log('Promise state:', promise.state); // fulfilled
  console.log('Value:', value);
});

// 前端实际应用：表单验证状态机
class FormState {
  handle(form) {
    throw new Error('Method must be implemented');
  }
}

class EmptyState extends FormState {
  handle(form) {
    form.valid = false;
    form.errors = [];
    form.canSubmit = false;
  }
}

class ValidatingState extends FormState {
  handle(form) {
    form.valid = false;
    form.isValidating = true;
    form.canSubmit = false;
  }
}

class ValidState extends FormState {
  handle(form) {
    form.valid = true;
    form.errors = [];
    form.canSubmit = true;
    form.isValidating = false;
  }
}

class InvalidState extends FormState {
  handle(form) {
    form.valid = false;
    form.canSubmit = false;
    form.isValidating = false;
  }
}

class SubmittingState extends FormState {
  handle(form) {
    form.canSubmit = false;
    form.isSubmitting = true;
  }
}

// 表单上下文
class Form {
  constructor() {
    this.fields = {};
    this.errors = {};
    this.valid = false;
    this.isValidating = false;
    this.isSubmitting = false;
    this.canSubmit = false;
    this.state = new EmptyState();
  }

  setState(state) {
    this.state = state;
    this.state.handle(this);
    this.onStateChange();
  }

  addField(name, value, validators = []) {
    this.fields[name] = { value, validators };
  }

  async validate() {
    this.setState(new ValidatingState());

    const errors = {};

    for (const [name, field] of Object.entries(this.fields)) {
      for (const validator of field.validators) {
        const error = await validator(field.value);
        if (error) {
          errors[name] = error;
          break;
        }
      }
    }

    this.errors = errors;

    if (Object.keys(errors).length === 0) {
      this.setState(new ValidState());
    } else {
      this.setState(new InvalidState());
    }
  }

  async submit() {
    if (!this.valid) {
      throw new Error('Form is not valid');
    }

    this.setState(new SubmittingState());

    try {
      // 模拟API提交
      await this.apiSubmit();
      this.setState(new EmptyState());
      return { success: true };
    } catch (error) {
      this.setState(new InvalidState());
      throw error;
    }
  }

  async apiSubmit() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  onStateChange() {
    console.log('Form state changed:', {
      valid: this.valid,
      isValidating: this.isValidating,
      isSubmitting: this.isSubmitting,
      canSubmit: this.canSubmit
    });
  }
}

// 使用示例
const form = new Form();
form.addField('email', 'test@example.com', [
  (value) => !value ? 'Email is required' : null,
  (value) => !value.includes('@') ? 'Invalid email format' : null
]);

form.addField('password', '123456', [
  (value) => value.length < 6 ? 'Password must be at least 6 characters' : null
]);

form.validate().then(() => {
  if (form.valid) {
    form.submit();
  }
});
```

**面试题**：
1. 状态模式和策略模式有什么区别？
2. 如何实现一个状态机引擎？
3. 状态模式在React或Vue中如何应用？

### 模板方法模式（Template Method Pattern）

**定义**：定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。

**应用场景**：
- 框架设计
- 算法骨架
- 流程控制
- 测试框架

**实现示例**：
```javascript
// 抽象类
class DataParser {
  parse(file) {
    const data = this.readData(file);
    const processedData = this.processData(data);
    const formattedData = this.formatData(processedData);
    return this.saveData(formattedData);
  }

  readData(file) {
    throw new Error('Method must be implemented');
  }

  processData(data) {
    // 默认实现
    return data.map(item => item.trim());
  }

  formatData(data) {
    throw new Error('Method must be implemented');
  }

  saveData(data) {
    console.log('Saving data:', data);
    return data;
  }
}

// 具体类：CSV解析器
class CsvParser extends DataParser {
  readData(file) {
    console.log('Reading CSV file');
    return file.split('\n').map(line => line.split(','));
  }

  formatData(data) {
    console.log('Formatting as CSV');
    return data.map(row => row.join(','));
  }
}

// 具体类：JSON解析器
class JsonParser extends DataParser {
  readData(file) {
    console.log('Reading JSON file');
    return JSON.parse(file);
  }

  processData(data) {
    console.log('Processing JSON data');
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }

  formatData(data) {
    console.log('Formatting as JSON');
    return JSON.stringify(data, null, 2);
  }
}

// 使用示例
const csvData = `name,age,city
John,30,NYC
Jane,25,LA`;

const jsonData = `[{"name":"John","age":30,"city":"NYC"},{"name":"Jane","age":25,"city":"LA"}]`;

const csvParser = new CsvParser();
const jsonParser = new JsonParser();

console.log(csvParser.parse(csvData));
console.log(jsonParser.parse(jsonData));

// 前端实际应用：组件生命周期
class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  // 模板方法
  render() {
    this.componentWillMount();
    const element = this.renderElement();
    this.componentDidMount();
    return element;
  }

  componentWillMount() {
    console.log('Component will mount');
    // 子类可以重写
  }

  renderElement() {
    throw new Error('renderElement must be implemented');
  }

  componentDidMount() {
    console.log('Component did mount');
    // 子类可以重写
  }

  setState(newState) {
    const oldState = this.state;
    this.shouldComponentUpdate(oldState, newState) && this.update(newState);
  }

  shouldComponentUpdate(oldState, newState) {
    return true; // 默认实现
  }

  update(newState) {
    this.componentWillUpdate();
    this.state = { ...this.state, ...newState };
    this.render();
    this.componentDidUpdate();
  }

  componentWillUpdate() {
    console.log('Component will update');
  }

  componentDidUpdate() {
    console.log('Component did update');
  }
}

class Button extends Component {
  componentWillMount() {
    console.log('Button will mount');
  }

  renderElement() {
    console.log('Rendering button');
    return `<button>${this.props.label}</button>`;
  }

  componentDidMount() {
    console.log('Button did mount');
    this.attachEventListeners();
  }

  attachEventListeners() {
    console.log('Attaching click listener to button');
  }

  shouldComponentUpdate(oldState, newState) {
    return oldState.disabled !== newState.disabled;
  }
}

// 使用示例
const button = new Button({ label: 'Click me' });
button.render();
button.setState({ disabled: true });

// 测试框架中的模板方法
class TestCase {
  constructor(name) {
    this.name = name;
  }

  // 模板方法
  run() {
    try {
      this.setUp();
      this[this.name]();
      this.tearDown();
      console.log(`${this.name}: PASSED`);
    } catch (error) {
      console.log(`${this.name}: FAILED - ${error.message}`);
    }
  }

  setUp() {
    // 子类可以重写
  }

  tearDown() {
    // 子类可以重写
  }
}

class UserServiceTest extends TestCase {
  constructor() {
    super('testCreateUser');
    this.db = null;
  }

  setUp() {
    console.log('Setting up test database');
    this.db = { users: [] };
  }

  testCreateUser() {
    console.log('Testing user creation');
    const user = { name: 'John', email: 'john@example.com' };
    this.db.users.push(user);

    if (this.db.users.length !== 1) {
      throw new Error('User not created');
    }
  }

  tearDown() {
    console.log('Cleaning up test database');
    this.db = null;
  }
}

// 使用示例
const test = new UserServiceTest();
test.run();

// 异步模板方法
class AsyncDataProcessor {
  async process() {
    try {
      await this.beforeProcess();
      const data = await this.fetchData();
      const processed = await this.transform(data);
      await this.save(processed);
      await this.afterProcess();
    } catch (error) {
      await this.onError(error);
    }
  }

  async beforeProcess() {
    console.log('Before processing...');
  }

  async fetchData() {
    throw new Error('fetchData must be implemented');
  }

  async transform(data) {
    return data; // 默认不转换
  }

  async save(data) {
    console.log('Saving data:', data);
  }

  async afterProcess() {
    console.log('Processing complete');
  }

  async onError(error) {
    console.error('Processing failed:', error);
  }
}

// 具体实现
class UserDataProcessor extends AsyncDataProcessor {
  async fetchData() {
    const response = await fetch('/api/users');
    return response.json();
  }

  async transform(users) {
    return users.map(user => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email.toLowerCase()
    }));
  }
}

// 具体实现：产品数据
class ProductDataProcessor extends AsyncDataProcessor {
  async fetchData() {
    const response = await fetch('/api/products');
    return response.json();
  }

  async transform(products) {
    return products.map(product => ({
      ...product,
      price: product.price * 1.1, // 加上税
      displayPrice: `$${(product.price * 1.1).toFixed(2)}`
    }));
  }

  async beforeProcess() {
    console.log('Initializing product cache...');
    this.cache = new Map();
  }

  async afterProcess() {
    console.log('Clearing product cache...');
    this.cache.clear();
  }
}
```

**面试题**：
1. 模板方法模式和策略模式有什么区别？
2. 钩子方法在模板方法模式中的作用是什么？
3. 如何防止模板方法被子类破坏？

---

## 前端应用实践

### 在React中的应用

**高阶组件（HOC）- 装饰器模式**：
```javascript
// 装饰器模式 - 高阶组件
function withLogger(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log(`${WrappedComponent.name} mounted`);
    }

    componentWillUnmount() {
      console.log(`${WrappedComponent.name} will unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

// 使用
const EnhancedComponent = withLogger(MyComponent);
```

**Context API - 观察者模式**：
```javascript
// Context使用了观察者模式
const ThemeContext = React.createContext();

// Provider作为Subject
class ThemeProvider extends React.Component {
  state = {
    theme: 'light',
    subscribers: []
  };

  setTheme = (theme) => {
    this.setState({ theme }, () => {
      // 通知所有观察者
      this.state.subscribers.forEach(callback => callback(theme));
    });
  };

  subscribe = (callback) => {
    this.setState(prev => ({
      subscribers: [...prev.subscribers, callback]
    }));
  };
}
```

**Redux - 观察者模式 + 命令模式**：
```javascript
// Redux结合了观察者模式和命令模式
// Action是命令
const action = { type: 'ADD_USER', payload: { name: 'John' } };

// Store是Subject
store.subscribe(() => {
  // 观察者收到通知
  console.log('State changed:', store.getState());
});

store.dispatch(action); // 执行命令
```

### 在Vue中的应用

**Vue 3 组合 API - 策略模式**：
```javascript
// 使用策略模式封装不同的数据获取策略
const useFetchStrategy = {
  rest: (url) => fetch(url).then(res => res.json()),
  graphql: (query) => fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  }).then(res => res.json()),
  websocket: (channel) => {
    const ws = new WebSocket(`ws://localhost:8080/${channel}`);
    return new Promise(resolve => {
      ws.onmessage = (event) => resolve(JSON.parse(event.data));
    });
  }
};

// 在组件中使用
export default {
  setup() {
    const data = ref(null);
    const strategy = 'rest';

    const load = async () => {
      data.value = await useFetchStrategy[strategy]('/api/data');
    };

    return { data, load };
  }
};
```

**Vue Router - 模板方法模式**：
```javascript
// Vue Router的导航守卫使用了模板方法模式
const router = createRouter({
  routes: [...]
});

// beforeEach是模板方法，允许插入自定义逻辑
router.beforeEach((to, from, next) => {
  // 验证逻辑
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next(); // 继续执行模板方法的后续步骤
  }
});
```

### 在Angular中的应用

**RxJS - 观察者模式**：
```javascript
// RxJS是观察者模式的实现
const subject = new Subject();

// 订阅（观察）
subject.subscribe(value => {
  console.log('Observer 1:', value);
});

subject.subscribe(value => {
  console.log('Observer 2:', value);
});

// 发布（通知）
subject.next('Hello');
subject.next('World');
```

**依赖注入 - 工厂模式**：
```javascript
// Angular的依赖注入使用工厂模式
@Injectable({
  providedIn: 'root',
  useFactory: (config: ConfigService) => {
    return config.useCache ? new CachedAPI() : new DirectAPI();
  },
  deps: [ConfigService]
})
export class DataService {}
```

### 在JavaScript框架中的应用

**模块模式 - 单例模式**：
```javascript
// 模块模式是单例模式的应用
const Module = (function() {
  // 私有状态
  let privateData = {};

  // 私有方法
  function privateMethod() {}

  // 公有方法
  return {
    publicMethod: function() {
      privateMethod();
    }
  };
})();
```

**Mixin模式 - 装饰器模式**：
```javascript
// Mixin是装饰器模式的应用
const TimestampMixin = {
  created() {
    this.createdAt = new Date();
  }
};

const LoggerMixin = {
  created() {
    console.log('Component created:', this.$options.name);
  }
};

// 混合多个Mixin
export default {
  mixins: [TimestampMixin, LoggerMixin],
  // 组件逻辑
};
```

---

## 设计原则

### SOLID原则详解

**S - 单一职责原则（Single Responsibility Principle）**：
```javascript
// ❌ 违反SRP
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  saveToDatabase() {
    // 保存到数据库
  }

  sendEmail() {
    // 发送邮件
  }

  log() {
    // 日志记录
  }
}

// ✅ 符合SRP
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  save(user) {
    // 保存到数据库
  }
}

class EmailService {
  send(user, message) {
    // 发送邮件
  }
}

class Logger {
  log(message) {
    // 日志记录
  }
}
```

**O - 开闭原则（Open/Closed Principle）**：
```javascript
// ❌ 违反OCP
class AreaCalculator {
  calculate(shapes) {
    return shapes.reduce((total, shape) => {
      if (shape.type === 'circle') {
        return total + Math.PI * shape.radius ** 2;
      } else if (shape.type === 'rectangle') {
        return total + shape.width * shape.height;
      }
      // 如果要添加新形状，必须修改这个方法
    }, 0);
  }
}

// ✅ 符合OCP
class Shape {
  area() {
    throw new Error('area method must be implemented');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

class AreaCalculator {
  calculate(shapes) {
    return shapes.reduce((total, shape) => total + shape.area(), 0);
  }
}
```

**L - 里氏替换原则（Liskov Substitution Principle）**：
```javascript
// ❌ 违反LSP
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.height = height;
    this.width = height;
  }
}

// Square不能替换Rectangle，因为它的行为不同
function calculateArea(rectangle) {
  rectangle.setWidth(5);
  rectangle.setHeight(4);
  return rectangle.area(); // 期望20，但Square会返回16
}

// ✅ 符合LSP
class Shape {
  area() {
    throw new Error('area method must be implemented');
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }

  area() {
    return this.side ** 2;
  }
}
```

**I - 接口隔离原则（Interface Segregation Principle）**：
```javascript
// ❌ 违反ISP
class Animal {
  walk() {
    throw new Error('walk method must be implemented');
  }

  fly() {
    throw new Error('fly method must be implemented');
  }

  swim() {
    throw new Error('swim method must be implemented');
  }
}

class Dog extends Animal {
  walk() {
    console.log('Dog walks');
  }

  fly() {
    throw new Error('Dogs cannot fly'); // 被迫实现不需要的方法
  }

  swim() {
    console.log('Dog swims');
  }
}

// ✅ 符合ISP
class Walker {
  walk() {
    throw new Error('walk method must be implemented');
  }
}

class Flyer {
  fly() {
    throw new Error('fly method must be implemented');
  }
}

class Swimmer {
  swim() {
    throw new Error('swim method must be implemented');
  }
}

class Dog extends Walker {
  walk() {
    console.log('Dog walks');
  }
}

class Duck extends Walker {
  walk() {
    console.log('Duck walks');
  }
}

// 或者使用Mixin
const Flyable = {
  fly() {
    console.log(`${this.name} flies`);
  }
};

const Swimmable = {
  swim() {
    console.log(`${this.name} swims`);
  }
};

class Eagle {
  constructor() {
    this.name = 'Eagle';
  }
}

Object.assign(Eagle.prototype, Flyable);

class Swan {
  constructor() {
    this.name = 'Swan';
  }
}

Object.assign(Swan.prototype, Flyable, Swimmable);
```

**D - 依赖倒置原则（Dependency Inversion Principle）**：
```javascript
// ❌ 违反DIP
class UserService {
  constructor() {
    this.database = new MySQLDatabase(); // 依赖具体实现
  }

  createUser(user) {
    this.database.save(user);
  }
}

class MySQLDatabase {
  save(data) {
    console.log('Saving to MySQL:', data);
  }
}

// 如果需要更换数据库，必须修改UserService

// ✅ 符合DIP
class Database {
  save(data) {
    throw new Error('save method must be implemented');
  }
}

class UserService {
  constructor(database) {
    // 依赖抽象，不依赖具体实现
    if (!(database instanceof Database)) {
      throw new Error('Must provide a Database');
    }
    this.database = database;
  }

  createUser(user) {
    this.database.save(user);
  }
}

class MySQLDatabase extends Database {
  save(data) {
    console.log('Saving to MySQL:', data);
  }
}

class MongoDatabase extends Database {
  save(data) {
    console.log('Saving to MongoDB:', data);
  }
}

// 使用示例
const mysqlDb = new MySQLDatabase();
const mongoDb = new MongoDatabase();

const userService1 = new UserService(mysqlDb);
const userService2 = new UserService(mongoDb);

userService1.createUser({ name: 'John' });
userService2.createUser({ name: 'Jane' });
```

---

## 设计模式的优缺点和选择

### 优点

1. **提高代码复用性**：通过封装和抽象，减少代码重复
2. **增强可维护性**：结构清晰，易于理解和修改
3. **促进团队协作**：统一的设计语言，降低沟通成本
4. **提高代码质量**：经过验证的最佳实践
5. **增强扩展性**：符合开闭原则，易于扩展

### 缺点

1. **增加复杂度**：简单的场景使用设计模式可能过度设计
2. **学习曲线**：需要理解模式的意图和实现
3. **性能影响**：一些模式会引入额外的抽象层
4. ** misuse风险**：在不合适的场景使用不合适的模式

### 如何选择设计模式

| 问题场景 | 推荐模式 |
|---------|---------|
| 需要创建对象，但不知道具体类 | 工厂模式、建造者模式 |
| 需要全局访问点 | 单例模式 |
| 需要克隆对象 | 原型模式 |
| 需要适配不同接口 | 适配器模式 |
| 需要动态添加功能 | 装饰器模式 |
| 需要控制对象访问 | 代理模式 |
| 需要简化复杂系统接口 | 外观模式 |
| 需要树形结构 | 组合模式 |
| 需要共享大量细粒度对象 | 享元模式 |
| 需要事件通知机制 | 观察者模式 |
| 需要封装请求 | 命令模式 |
| 需要遍历集合 | 迭代器模式 |
| 需要根据状态改变行为 | 状态模式 |
| 需要替换算法 | 策略模式 |
| 需要定义算法骨架 | 模板方法模式 |

### 设计模式使用建议

1. **不要过度设计**：从简单开始，需要时再重构
2. **理解模式意图**：不要为了用模式而用模式
3. **结合实际情况**：根据具体问题选择合适的模式
4. **优先考虑组合**：组合优于继承
5. **保持代码可读性**：模式的目的是提高代码质量

---

## 常见面试题总结

### 基础问题

1. **设计模式是什么**？
   - 设计模式是软件设计中常见问题的通用、可重复使用的解决方案。

2. **设计模式有哪些分类**？
   - 创建型（5种）、结构型（7种）、行为型（11种）。

3. **你最常用的设计模式有哪些**？
   - 单例、工厂、观察者、装饰器、策略等。

### 深入问题

1. **单例模式有什么缺点**？
   - 全局状态、难以测试、违反单一职责、难以扩展。

2. **观察者模式和发布订阅模式的区别**？
   - 观察者模式是紧耦合，发布订阅模式是松耦合，有事件通道。

3. **Vue的响应式系统使用了哪些设计模式**？
   - 观察者模式、发布订阅模式、代理模式。

4. **React Hooks是哪种设计模式的体现**？
   - 组合模式、策略模式。

5. **如何实现一个支持中间件的状态管理器**？
   - 使用命令模式和装饰器模式。

### 场景问题

1. **如何实现一个撤销/重做功能**？
   - 使用命令模式。

2. **如何实现主题切换功能**？
   - 使用策略模式。

3. **如何实现表单验证**？
   - 使用策略模式和组合模式。

4. **如何优化大量相似对象的内存占用**？
   - 使用享元模式。

5. **如何实现一个插件系统**？
   - 使用装饰器模式和工厂模式。

---

## 参考资料

- 《设计模式：可复用面向对象软件的基础》（GoF）
- 《JavaScript设计模式与开发实践》
- 《Head First 设计模式》
- [JavaScript Design Patterns](https://www.patterns.dev/posts/classic-design-patterns/)
- [Refactoring.Guru - 设计模式](https://refactoring.guru/design-patterns)
