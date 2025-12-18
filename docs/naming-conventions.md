---
sidebar_position: 9
title: 命名规范
---

# 命名规范

## 通用原则

1. 命名应具有描述性，能够清楚表达变量、函数或类的用途
2. 避免使用缩写，除非是广泛认可的缩写（如 HTML、URL）
3. 使用英文命名，保持一致性

## 文件命名

- 使用小写字母
- 多个单词之间用下划线分隔，例如：`user_service.go`、`data_processor.py`

## 变量命名

### Java/JavaScript/C++

- 使用驼峰命名法（camelCase）
- 布尔值变量建议以 is、has、can 等开头，例如：`isValid`、`hasPermission`

### Python

- 使用下划线分隔（snake_case），例如：`user_name`、`calculate_total`

## 函数/方法命名

- 使用动词或动词短语，表示执行的动作
- Java/JavaScript/C++ 使用驼峰命名法，例如：`getUserInfo()`、`calculateTotalAmount()`
- Python 使用下划线分隔，例如：`get_user_info()`、`calculate_total_amount()`

## 类/接口命名

- 使用帕斯卡命名法（PascalCase），例如：`UserService`、`DataProcessor`
- 接口名称可以加上 I 前缀（可选），例如：`IAuthenticator`

## 常量命名

- 全部大写，单词间用下划线分隔，例如：`MAX_RETRY_COUNT`、`DEFAULT_TIMEOUT`

## 包/模块命名

- 使用小写字母，避免特殊字符
- 尽量使用单个单词，必要时可用下划线分隔