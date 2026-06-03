# 2. High Level Architecture

## 2.1 Technical Summary

CNC加工厂ERP系统采用前后端分离的分布式架构，前端使用Vue3+Element Plus构建响应式Web应用配合Android Native APP，后端采用Java Spring Boot微服务架构，通过Spring Cloud Gateway统一API网关。系统设计为私有化部署，支持单台8核32G服务器运行，MySQL单主库加Redis缓存提供数据存储与高性能访问能力。文件存储采用MinIO对象存储方案，支持S3协议兼容。系统以"图纸管理"和"扫码执行"为核心，支撑从客户需求到成品交付的全链路数字化。

## 2.2 Platform and Infrastructure Choice

**Recommendation: 私有化部署（Linux Server）**

**Selected Platform:** 私有化部署 - 单台服务器All-in-One部署

**Key Services:**
- 应用服务器：Tomcat 9.x（Spring Boot嵌入式）
- 数据库：MySQL 8.0（单主库）
- 缓存：Redis 7.x（热点数据缓存、Session共享）
- 对象存储：MinIO（兼容S3协议，图纸文件存储）
- 任务调度：XXL-JOB 2.3.x（定时任务统一管理）

**Deployment Host and Regions:**
- 单台服务器：8核32G起步，按需扩容
- 部署区域：中国大陆（私有化部署）

**Rationale:** 本项目为CNC加工厂私有化部署场景，MinIO提供企业级对象存储能力，兼容S3协议便于未来迁移到云存储（阿里云OSS、AWS S3等）。相比本地/NAS，MinIO提供更好的数据可靠性（纠删码模式）和扩展性。

## 2.3 Repository Structure

**Structure:** Monorepo（多模块单仓库）

**Monorepo Tool:** Maven Multi-Module Project

**Package Organization:**
```
cnc-erp-system/                    # 父项目
├── cnc-erp-system/                 # 主应用模块（Monolith）
├── cnc-erp-system-service-sys/     # 系统服务模块（微服务）
├── cnc-erp-system-service-report/  # 报表服务模块（微服务）
├── cnc-erp-system-gateway/         # API网关模块
├── cnc-erp-web/                    # 前端Web应用
└── cnc-erp-android/               # Android APP应用
```

**Rationale:** 使用Maven多模块项目结构，便于统一版本管理和依赖管控，同时支持未来按需拆分为独立Git仓库。

## 2.4 High Level Architecture Diagram

```mermaid
graph TB
    subgraph Client["客户端层"]
        Web["Web端<br/>Vue3 + Element Plus"]
        Android["Android APP<br/>Kotlin + Jetpack Compose"]
    end

    subgraph Gateway["API网关层"]
        Gateway["Spring Cloud Gateway<br/>:8080"]
    end

    subgraph Backend["后端服务层"]
        Main["主应用<br/>Spring Boot 2.7.x<br/>:8081"]
        SysService["系统服务<br/>Spring Boot 2.7.x<br/>:8082"]
        ReportService["报表服务<br/>Spring Boot 2.7.x<br/>:8083"]
    end

    subgraph Infra["基础设施层"]
        MySQL["MySQL 8.0<br/>:3306"]
        Redis["Redis 7.x<br/>:6379"]
        MinIO["MinIO对象存储<br/>:9000"]
        XXL["XXL-JOB<br/>:8080"]
    end

    Web --> Gateway
    Android --> Gateway
    Gateway --> Main
    Gateway --> SysService
    Gateway --> ReportService
    Main --> MySQL
    Main --> Redis
    Main --> MinIO
    SysService --> MySQL
    SysService --> Redis
    ReportService --> MySQL
    ReportService --> Redis
    XXL -.-> Main
```

## 2.5 Architectural Patterns

- **Monolith + Microservices:** 核心业务使用单一主应用，微服务拆分为系统服务和报表服务 - _Rationale:_ 平衡开发效率和系统复杂度，符合当前业务规模
- **API Gateway Pattern:** Spring Cloud Gateway统一路由、认证鉴权、日志记录 - _Rationale:_ 客户端单一入口，便于安全管理和服务治理
- **Repository Pattern:** 抽象数据访问逻辑，支持测试和数据库迁移 - _Rationale:_ 解耦业务逻辑与数据访问，提高可测试性
- **JWT Authentication:** 无状态认证，JWT + 验证码 - _Rationale:_ 支持分布式部署，适合微服务架构
- **Event-driven for Cross-service:** 跨服务场景通过最终一致性解决 - _Rationale:_ 避免分布式事务复杂性
- **Object Storage Pattern:** 使用MinIO作为对象存储服务，兼容S3协议 - _Rationale:_ 支持大文件存储（图纸CAD），提供高可靠性和弹性扩展能力

---
