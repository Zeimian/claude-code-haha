---
name: upload-to-xiaohongshu
description: 将完成的小红书内容上传到小红书平台。当用户要求发布内容到小红书时使用。
allowed-tools:
  - Bash(*)
  - Read
  - Write
  - Edit
when_to_use: Use when the user wants to publish content to Xiaohongshu (Little Red Book). Examples: 'upload this post to xiaohongshu', 'publish to little red book', 'share on xiaohongshu'.
argument-hint: "[post_file] [optional_credentials_path]"
arguments:
  - post_file
  - credentials_path
context: fork
---

# 小红书内容上传系统

基于毛泽东思想指导原则，实现小红书内容上传功能。

## 上传前准备

### 内容审核
确保内容符合小红书社区规范：
- 内容真实可信
- 不包含敏感或违规信息
- 视觉元素符合小红书审美
- 文案风格适合目标用户

### 格式化处理
- 检查内容格式是否符合小红书要求
- 确认图片尺寸和格式正确
- 验证标题长度和标签数量

## 上传流程

### 第一步：认证验证
- 读取用户提供的认证凭据（或提示用户提供）
- 验证账户状态和权限
- 确认上传功能正常

### 第二步：内容解析
- 解析Markdown格式的内容文件
- 识别内嵌的图片链接和位置
- 提取标题、正文、标签等元素

### 第三步：资源上传
- 上传内容中引用的图片到小红书图床
- 验证图片上传成功并获得访问链接
- 处理图片压缩和格式转换（如需要）

### 第四步：发布操作
- 构建符合小红书API要求的请求
- 上传内容到指定账户
- 设置发布时间（立即发布或定时发布）

### 第五步：验证确认
- 检查发布状态
- 验证内容显示正确
- 输出发布结果和链接

## 文件管理

### 上传日志
- 记录每次上传的时间、内容、结果
- 保存成功发布的URL链接
- 记录失败原因以供后续分析

### 内容备份
- 保存上传前的原始内容
- 保留发布元数据（时间、平台、状态等）

## 毛泽东思想指导原则

### 实事求是
- 基于小红书平台的实际要求上传内容
- 验证上传结果，确保内容正确发布

### 群众路线
- 以小红书用户为中心，确保内容适合目标受众
- 遵循社区规范和用户偏好

### 游击战术
- 快速响应发布需求
- 灵活处理不同的内容格式
- 适时调整发布时间策略