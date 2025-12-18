---
sidebar_position: 10
title: 性能优化规范
---

# 性能优化规范

## 通用原则

1. **先测量再优化**：不要过早优化，在确定性能瓶颈后再进行针对性优化
2. **关注算法复杂度**：选择合适的数据结构和算法比微优化更重要
3. **避免 premature optimization**：过早优化是万恶之源
4. **权衡时间和空间**：根据实际需求平衡时间和空间复杂度

## 代码层面优化

### 循环优化

1. **减少循环内重复计算**：
   ```java
   // 不推荐
   for (int i = 0; i < list.size(); i++) {
       // ...
   }
   
   // 推荐
   int size = list.size();
   for (int i = 0; i < size; i++) {
       // ...
   }
   ```

2. **避免在循环中创建对象**：
   ```java
   // 不推荐
   for (String item : list) {
       StringBuilder sb = new StringBuilder(); // 循环内创建对象
       // ...
   }
   
   // 推荐
   StringBuilder sb = new StringBuilder(); // 循环外创建对象
   for (String item : list) {
       sb.setLength(0); // 重置而非重新创建
       // ...
   }
   ```

### 字符串操作优化

1. **大量字符串拼接使用StringBuilder**：
   ```java
   // 不推荐
   String result = "";
   for (String item : list) {
       result += item; // 每次都创建新对象
   }
   
   // 推荐
   StringBuilder sb = new StringBuilder();
   for (String item : list) {
       sb.append(item);
   }
   String result = sb.toString();
   ```

2. **正则表达式预编译**：
   ```java
   // 不推荐（每次都要编译）
   if (str.matches("\\d+")) {
       // ...
   }
   
   // 推荐（预编译）
   private static final Pattern NUMBER_PATTERN = Pattern.compile("\\d+");
   
   if (NUMBER_PATTERN.matcher(str).matches()) {
       // ...
   }
   ```

### 集合操作优化

1. **合理选择数据结构**：
   - 需要频繁查找：使用HashSet或HashMap
   - 需要有序：使用TreeSet或TreeMap
   - 需要随机访问：使用ArrayList
   - 频繁插入删除：使用LinkedList

2. **初始化集合容量**：
   ```java
   // 如果知道大概大小，预先设置容量避免扩容
   List<String> list = new ArrayList<>(1000);
   Map<String, Object> map = new HashMap<>(512);
   ```

## 数据库优化

### SQL优化

1. **避免SELECT ***：只查询需要的字段
2. **合理使用索引**：在WHERE、ORDER BY、JOIN子句涉及的字段上建立索引
3. **避免N+1查询**：使用JOIN或批量查询代替循环查询
4. **分页优化**：大数据量分页使用游标而非OFFSET

### 连接池配置

1. 设置合理的连接池大小
2. 配置连接超时时间
3. 定期检查连接有效性

## 缓存策略

### 缓存选择

1. **本地缓存**：适用于数据量小、更新频率低的场景
2. **分布式缓存**：适用于多实例部署、大数据量场景

### 缓存更新策略

1. **Cache-Aside模式**：应用代码负责维护缓存
2. **Write-Through模式**：数据写入时同时更新缓存
3. **Write-Behind模式**：异步更新缓存

### 缓存失效策略

1. 设置合理的TTL（Time To Live）
2. 根据数据特点选择LRU、LFU等淘汰策略
3. 主动失效：当数据更新时主动清除缓存

## 内存优化

### 对象复用

1. 使用对象池减少GC压力
2. 享元模式共享细粒度对象

### 避免内存泄漏

1. 及时关闭资源（文件、网络连接、数据库连接等）
2. 注销监听器和回调
3. 清理ThreadLocal变量
4. 注意静态集合类的使用

## 并发优化

### 合理使用线程池

1. 根据任务类型选择合适的线程池
2. 设置合理的线程数和队列大小
3. 正确处理异常和中断

### 减少锁竞争

1. 使用无锁数据结构
2. 减小锁的粒度
3. 使用读写锁分离读写操作
4. 使用CAS操作替代部分同步

## JVM优化

### 堆内存配置

1. 根据应用特点设置初始堆和最大堆
2. 合理分配新生代和老年代比例

### GC调优

1. 选择合适的垃圾收集器
2. 根据应用特点调整GC参数
3. 监控GC日志分析性能瓶颈