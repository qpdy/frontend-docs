---
sidebar_position: 8
title: 错误处理规范
---

# 错误处理规范

## 原则

1. **预防优于处理**：编写防御性代码，尽量避免错误发生
2. **早发现早处理**：在错误发生的地方立即处理，不要传递未处理的错误
3. **明确错误类型**：区分业务错误和系统错误
4. **记录错误日志**：适当记录错误信息，便于排查问题
5. **用户友好提示**：向用户展示友好的错误信息，避免暴露系统细节

## 异常处理策略

### 检查型异常 vs 非检查型异常

- 对于可预见且调用方应该处理的错误情况，使用检查型异常
- 对于程序错误或不可恢复的错误，使用非检查型异常(RuntimeException)

### 异常捕获

1. **避免空的catch块**：不要忽略捕获到的异常
   ```java
   // 错误示例
   try {
       // some code
   } catch (Exception e) {
       // 空的catch块
   }
   
   // 正确示例
   try {
       // some code
   } catch (Exception e) {
       logger.error("操作失败", e);
       // 或者重新抛出
       throw new ServiceException("操作失败", e);
   }
   ```

2. **具体异常优于通用异常**：捕获具体的异常类型而不是通用的Exception
   ```java
   // 更好的做法
   try {
       // some code
   } catch (IOException e) {
       // 处理IO异常
   } catch (SQLException e) {
       // 处理SQL异常
   }
   ```

### 自定义异常

1. 创建有意义的自定义异常类，继承合适的父类
2. 异常类命名应以Exception结尾
3. 提供丰富的构造函数，便于传递错误信息和原因

```java
public class InsufficientBalanceException extends BusinessException {
    public InsufficientBalanceException(String message) {
        super(message);
    }
    
    public InsufficientBalanceException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

## 日志记录

### 日志级别选择

- **ERROR**：系统错误、数据不一致、功能无法正常使用
- **WARN**：潜在问题、可预期的错误情况、不影响系统运行的问题
- **INFO**：关键业务流程、系统状态变化
- **DEBUG**：详细调试信息，仅在开发和测试环境启用

### 敏感信息处理

- 不要在日志中记录密码、密钥等敏感信息
- 对于用户隐私数据，需要脱敏处理后再记录

## 错误码设计

1. 统一错误码格式，便于识别和管理
2. 错误码应具有唯一性和可读性
3. 提供错误码与错误信息的映射关系
4. 错误码应分类管理，如系统级错误、业务级错误等

示例：
```
USER_001: 用户不存在
ORDER_001: 订单金额不足
PAY_001: 支付失败
```