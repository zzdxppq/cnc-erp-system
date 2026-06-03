# 12. Source Tree

```
cnc-erp-system/
├── .github/
│   └── workflows/
│       ├── ci.yaml
│       └── deploy.yaml
├── cnc-erp-system/                    # 主应用模块
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/cnc/erp/
│   │   │   │   ├── controller/
│   │   │   │   ├── service/
│   │   │   │   ├── repository/
│   │   │   │   ├── entity/
│   │   │   │   ├── dto/
│   │   │   │   ├── config/
│   │   │   │   └── util/
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── mapper/
│   │   └── test/
│   │       └── java/
│   └── pom.xml
├── cnc-erp-system-service-sys/        # 系统服务模块
├── cnc-erp-system-service-report/      # 报表服务模块
├── cnc-erp-system-gateway/             # API网关模块
├── cnc-erp-web/                        # 前端Web应用
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── stores/
│   │   ├── router/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
│   ├── tests/
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── cnc-erp-android/                   # Android APP应用
│   ├── app/
│   │   └── src/main/
│   │       ├── java/com/cnc/erp/
│   │       │   ├── ui/
│   │       │   ├── viewmodel/
│   │       │   ├── repository/
│   │       │   └── di/
│   │       └── res/
│   ├── build.gradle
│   └── settings.gradle
├── docs/                               # 文档
│   ├── prd.md
│   ├── front-end-spec.md
│   └── fullstack-architecture.md
├── infrastructure/                      # IaC定义
│   └── ansible/
├── scripts/                            # 构建脚本
├── .env.example
├── pom.xml                            # 父POM
└── README.md
```

---
