# 14. Deployment Architecture

## 14.1 Deployment Strategy

**Frontend Deployment:**
- **Platform:** Nginx
- **Build Command:** `npm run build`
- **Output Directory:** `dist/`
- **CDN/Edge:** 可选CDN加速

**Backend Deployment:**
- **Platform:** 私有化服务器 (Linux)
- **Build Command:** `mvn clean package -DskipTests`
- **Deployment Method:** Systemd服务管理

**MinIO Deployment:**
- **Platform:** Docker Compose 或独立部署
- **Data Volume:** /data/volumes/minio
- **Console:** :9001 (可选关闭)
- **Mode:** 纠删码模式（生产环境）

## 14.2 CI/CD Pipeline

```yaml
# .github/workflows/ci.yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Build with Maven
        run: mvn clean package -DskipTests
      - name: Build Frontend
        run: |
          cd cnc-erp-web
          npm install
          npm run build
```

## 14.3 Environments

| Environment | Frontend URL | Backend URL | MinIO Console |
|-------------|--------------|-------------|---------------|
| Development | http://localhost:3000 | http://localhost:8080 | http://localhost:9001 |
| Staging | http://staging.cnc-erp.internal | http://staging-api.cnc-erp.internal | http://staging-minio.cnc-erp.internal |
| Production | http://erp.cnc-erp.com | http://api.cnc-erp.com | http://minio.cnc-erp.com/console |

---
