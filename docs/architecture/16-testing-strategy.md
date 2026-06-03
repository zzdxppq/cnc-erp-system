# 16. Testing Strategy

## 16.1 Testing Pyramid

```
        E2E Tests
       /        \
  Integration Tests
     /         \
Frontend Unit  Backend Unit
```

## 16.2 Test Organization

### Frontend Tests

```
cnc-erp-web/tests/
├── unit/
│   ├── components/
│   ├── hooks/
│   └── services/
└── e2e/
    ├── specs/
    └── fixtures/
```

### Backend Tests

```
cnc-erp-system/src/test/
├── unit/
│   ├── service/
│   └── repository/
└── integration/
    └── controller/
```

## 16.3 Test Examples

### Frontend Component Test

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomerCard from '@/components/business/CustomerCard.vue'

describe('CustomerCard', () => {
  it('renders customer name', () => {
    const wrapper = mount(CustomerCard, {
      props: { customer: { name: '测试客户', code: 'CUST-001' } }
    })
    expect(wrapper.text()).toContain('测试客户')
  })
})
```

### Backend API Test

```java
@SpringBootTest
@AutoConfigureMockMvc
class CustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnCustomers() throws Exception {
        mockMvc.get("/api/customers")
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.data").isArray());
    }
}
```

---
