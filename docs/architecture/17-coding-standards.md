# 17. Coding Standards

## 17.1 Critical Fullstack Rules

- **Type Sharing:** 前后端共享类型定义在 `packages/shared` 包，前端通过 npm 包引用
- **API Calls:** 前端只通过 Service 层调用API，不直接使用 axios
- **Environment Variables:** 后端通过 `@ConfigurationProperties` 注入，前端通过 import.meta.env 读取
- **Error Handling:** Controller 层统一异常处理，返回标准 Result 格式
- **State Updates:** Vue 使用 Pinia，React 使用 useReducer，禁止直接 mutation
- **Database Access:** 统一使用 Repository 模式，禁止在 Service 层直接写SQL
- **File Storage:** 所有文件通过 MinIO 存储，不使用本地文件系统
- **Code Reviews:** 所有 PR 必须通过至少1人 review 才能合并

## 17.2 Naming Conventions

| Element | Frontend | Backend | Example |
|---------|----------|---------|---------|
| Components | PascalCase | - | `CustomerCard.vue` |
| Hooks | camelCase with 'use' | - | `useAuth.ts` |
| API Routes | kebab-case | kebab-case | `/api/customer-profile` |
| Database Tables | snake_case | snake_case | `customer_profiles` |
| Java Classes | PascalCase | PascalCase | `CustomerService` |
| Java Methods | camelCase | camelCase | `getCustomerById` |
| Variables | camelCase | camelCase | `customerName` |
| Constants | UPPER_SNAKE_CASE | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| MinIO Buckets | kebab-case | kebab-case | `customer-drawings` |

---
