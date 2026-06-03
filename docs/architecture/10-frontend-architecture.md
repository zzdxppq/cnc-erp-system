# 10. Frontend Architecture

## 10.1 Component Architecture

### Component Organization

```
cnc-erp-web/src/
├── components/           # 通用组件
│   ├── common/          # Button, Input, Card, Table, Modal
│   ├── layout/          # Header, Sidebar, Footer
│   └── business/        # CustomerCard, QuotationForm, WorkOrderTable
├── pages/               # 页面组件
│   ├── dashboard/       # 首页/仪表盘
│   ├── customer/        # 客户管理
│   ├── quotation/       # 报价管理
│   ├── order/           # 订单管理
│   ├── drawing/         # 图纸管理
│   ├── production/      # 生产排产
│   ├── workshop/        # 车间执行
│   ├── warehouse/       # 仓储管理
│   ├── quality/         # 品质管理
│   ├── outsourcing/     # 委外管理
│   ├── report/          # 报表看板
│   └── system/          # 系统管理
├── hooks/               # 自定义Hooks
│   ├── useAuth.ts      # 认证状态
│   ├── useCustomer.ts   # 客户相关
│   └── useWorkOrder.ts  # 工单相关
├── services/            # API服务层
│   ├── auth.ts         # 认证服务
│   ├── customer.ts     # 客户服务
│   ├── quotation.ts    # 报价服务
│   └── ...
├── stores/             # Pinia状态管理
│   ├── auth.ts         # 认证状态
│   ├── user.ts         # 用户信息
│   └── settings.ts     # 系统设置
├── router/              # 路由配置
├── styles/              # 全局样式
└── utils/               # 工具函数
```

### Component Template

```typescript
<!-- Vue3 Composition API + TypeScript -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElCard } from 'element-plus'

interface Props {
  title: string
  data: Record<string, any>
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', value: any): void
}>()

const localData = ref(props.data)
const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    emit('update', localData.value)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <ElCard class="component-card">
    <template #header>
      <span>{{ props.title }}</span>
    </template>
    <div class="content">
      <!-- Content here -->
    </div>
  </ElCard>
</template>

<style scoped>
.component-card {
  --el-card-bg: var(--color-bg-surface);
}
</style>
```

---

## 10.2 State Management Architecture

### State Structure

```typescript
// stores/auth.ts
interface AuthState {
  token: string | null
  refreshToken: string | null
  user: User | null
  permissions: string[]
}

// stores/workOrder.ts
interface WorkOrderState {
  workOrders: WorkOrder[]
  currentWorkOrder: WorkOrder | null
  filters: WorkOrderFilters
  pagination: Pagination
}
```

### State Management Patterns

- ** Authentication State:** 集中管理登录状态，Token自动刷新
- ** Business Data State:** 按模块分离，Lazy Loading优化性能
- ** UI State:** 本地组件状态管理，不上浮到全局Store
- ** Server State:** 使用useFetch等工具，统一错误处理和Loading状态

---

## 10.3 Routing Architecture

### Route Organization

```typescript
// router/index.ts
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', component: () => import('@/pages/dashboard/index.vue') },
      { path: 'customers', component: () => import('@/pages/customer/index.vue') },
      { path: 'quotations', component: () => import('@/pages/quotation/index.vue') },
      // ...
    ]
  },
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue')
  }
]
```

### Protected Route Pattern

```typescript
// router guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```

---

## 10.4 Frontend Services Layer

### API Client Setup

```typescript
// services/api.ts
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

api.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Handle token refresh
    }
    return Promise.reject(error)
  }
)

export default api
```

### Service Example

```typescript
// services/customer.ts
import api from './api'
import type { Customer, Pagination, QueryParams } from '@/types'

export const customerService = {
  list(params: QueryParams) {
    return api.get<{ data: Customer[]; total: number }>('/customers', { params })
  },
  get(id: string) {
    return api.get<Customer>(`/customers/${id}`)
  },
  create(data: Partial<Customer>) {
    return api.post<Customer>('/customers', data)
  },
  update(id: string, data: Partial<Customer>) {
    return api.put<Customer>(`/customers/${id}`, data)
  },
  delete(id: string) {
    return api.delete(`/customers/${id}`)
  }
}
```

### File Upload Service

```typescript
// services/file.ts
import api from './api'

export const fileService = {
  upload(file: File, bucket: 'drawings' | 'attachments' | 'temp') {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('bucket', bucket)
    return api.post<{ fileId: string; url: string; size: number }>('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  getUrl(fileId: string) {
    return api.get<{ url: string }>(`/files/${fileId}/url`)
  },
  getPreviewUrl(fileId: string) {
    return api.get<{ url: string }>(`/files/${fileId}/preview-url`)
  }
}
```

---
