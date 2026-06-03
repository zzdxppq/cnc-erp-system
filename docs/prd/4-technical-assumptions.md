# 4. Technical Assumptions

## 4.1 Repository Structure

Monorepo（单仓库Maven多模块项目）
- 4个后端模块：主应用、系统服务、报表服务、API网关
- 1个前端Web应用
- 1个Android移动APP

## 4.2 Service Architecture

Monolith + 2 Microservices（单仓库多模块Maven项目）
- 主应用：业务服务（客户/报价/订单/生产/仓储/委外/品质/财务/人事）
- 微服务1：系统服务（用户/权限/工作流/字典）
- 微服务2：报表服务（产值/交期/库存/财务报表）
- API网关：Spring Cloud Gateway（路由 + 认证鉴权）

## 4.3 Testing Requirements

Unit + Integration（前端单元测试、后端集成测试）

## 4.4 Repository Details

| Repository Name | Type | Technology | Team | 说明 |
|-----------------|------|------------|------|------|
| cnc-erp-system | monorepo (multi-module) | Java + Spring Boot 2.7.x + Maven | 后端团队 | 后端单体，包含主应用、系统服务、报表服务、网关模块 |
| cnc-erp-web | frontend | Vue3 + Element Plus | 前端团队 | Web前端应用 |
| cnc-erp-android | mobile | Android + Kotlin | 移动团队 | Android移动APP |

> **架构说明:** 后端采用Maven多模块单仓库架构，各模块（主应用、系统服务、报表服务、网关）在一个Git仓库中通过Maven子项目组织，通过`pom.xml`统一依赖版本管理。

## 4.5 Additional Technical Assumptions and Requests

- 数据库：MySQL 8.0（单主库）
- 缓存：Redis（热点数据缓存、Session共享）
- 文件存储：本地存储（2T，按需扩容）/ 阿里云OSS（可选）
- 定时任务：XXL-JOB（统一调度管理）
- 与智邦ERP数据对接需求（具体接口规范待确认）
- JWT + 验证码认证，细粒度权限控制（角色+金额分级）
- 操作日志完整记录，敏感数据AES加密存储

---
