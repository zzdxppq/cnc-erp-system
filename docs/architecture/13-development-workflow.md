# 13. Development Workflow

## 13.1 Local Development Setup

### Prerequisites

```bash
# Java 17
java -version  # openjdk 17.0.x

# Node.js 20
node -v # v20.x.x

# Maven 3.9
mvn -v # Apache Maven 3.9.x

# MySQL 8.0 (Docker)
docker pull mysql:8.0

# Redis 7 (Docker)
docker pull redis:7.2

# MinIO (Docker)
docker pull minio/minio
```

### Initial Setup

```bash
# Clone and setup
git clone git@github.com:your-org/cnc-erp-system.git
cd cnc-erp-system

# Backend setup
cd cnc-erp-system
mysql -u root -p < src/main/resources/db/init.sql
mvn clean install -DskipTests

# Frontend setup
cd ../cnc-erp-web
npm install

# Start infrastructure
docker run -d --name mysql -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=root123 \
  mysql:8.0

docker run -d --name redis -p 6379:6379 \
  redis:7.2

# Start MinIO
docker run -d --name minio -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=minioadmin \
  minio/minio server /data --console-address ":9001"
```

### Development Commands

```bash
# Start all services
cd cnc-erp-system && mvn spring-boot:run &
cd cnc-erp-system-service-sys && mvn spring-boot:run &
cd cnc-erp-system-service-report && mvn spring-boot:run &
cd cnc-erp-system-gateway && mvn spring-boot:run &

# Start frontend only
cd cnc-erp-web && npm run dev

# Run tests
cd cnc-erp-system && mvn test
cd cnc-erp-web && npm run test:unit && npm run test:e2e
```

## 13.2 Environment Configuration

### Required Environment Variables

```bash
# Backend (.env)
SPRING_PROFILES_ACTIVE=development
SERVER_PORT=8081
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=cnc_erp
MYSQL_USERNAME=root
MYSQL_PASSWORD=root123
REDIS_HOST=localhost
REDIS_PORT=6379
MINIO_ENDPOINT=http://localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
JWT_SECRET=your-secret-key-at-least-32-characters
JWT_EXPIRATION=900000
JWT_REFRESH_EXPIRATION=604800000

# Frontend (.env.local)
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_TITLE=CNC加工厂ERP系统
```

---
