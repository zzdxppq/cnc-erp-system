# 4. Data Models

## 4.1 Customer (客户)

**Purpose:** 客户档案管理，业务入口

**Key Attributes:**
- customerId: UUID - 客户唯一标识
- customerCode: VARCHAR(20) - 客户编码（CUST-YYYYMMDD-XXXX）
- customerName: VARCHAR(100) - 客户名称
- customerType: ENUM - 客户类型（potential/active/inactive）
- industry: VARCHAR(50) - 行业分类
- creditLimit: DECIMAL(15,2) - 信用额度
- ownerId: UUID - 负责人（销售人员）

**TypeScript Interface:**
```typescript
interface Customer {
  id: string;
  code: string;
  name: string;
  type: 'potential' | 'active' | 'inactive';
  industry?: string;
  creditLimit: number;
  ownerId: string;
  contacts: Contact[];
  createdAt: string;
  updatedAt: string;
}
```

**Relationships:**
- Customer → Contact (1:N)
- Customer → Quotation (1:N)
- Customer → Order (1:N)

---

## 4.2 Quotation (报价单)

**Purpose:** 报价管理，记录客户需求和价格

**Key Attributes:**
- quotationId: UUID - 报价单唯一标识
- quotationCode: VARCHAR(20) - 报价单编码（QUOT-YYYYMMDD-XXXX）
- customerId: UUID - 客户ID
- deliveryDate: DATE - 交期
- validUntil: DATE - 有效期
- status: ENUM - 状态（draft/submitted/approved/rejected/converted）
- totalAmount: DECIMAL(15,2) - 总价
- profitMargin: DECIMAL(5,2) - 利润率

**TypeScript Interface:**
```typescript
interface Quotation {
  id: string;
  code: string;
  customerId: string;
  deliveryDate: string;
  validUntil: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'converted';
  totalAmount: number;
  profitMargin: number;
  items: QuotationItem[];
  drawings: Drawing[];
  createdAt: string;
  updatedAt: string;
}
```

**Relationships:**
- Quotation → Customer (N:1)
- Quotation → QuotationItem (1:N)
- Quotation → Drawing (1:N)
- Quotation → Order (1:1)

---

## 4.3 WorkOrder (工单)

**Purpose:** 生产工单，追踪生产进度

**Key Attributes:**
- workOrderId: UUID - 工单唯一标识
- workOrderCode: VARCHAR(20) - 工单编码（WO-YYYYMMDD-XXXX）
- orderId: UUID - 销售订单ID
- status: ENUM - 状态（planned/released/in_progress/paused/completed/cancelled）
- plannedStartDate: DATETIME - 计划开始时间
- plannedEndDate: DATETIME - 计划结束时间
- actualStartDate: DATETIME - 实际开始时间
- actualEndDate: DATETIME - 实际结束时间

**TypeScript Interface:**
```typescript
interface WorkOrder {
  id: string;
  code: string;
  orderId: string;
  status: 'planned' | 'released' | 'in_progress' | 'paused' | 'completed' | 'cancelled';
  plannedStartDate: string;
  plannedEndDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  operations: WorkOrderOperation[];
  createdAt: string;
  updatedAt: string;
}
```

**Relationships:**
- WorkOrder → Order (N:1)
- WorkOrder → WorkOrderOperation (1:N)
- WorkOrder → ProductionReport (1:N)

---

## 4.4 Material (物料)

**Purpose:** 物料管理，支持生产配料和库存追踪

**Key Attributes:**
- materialId: UUID - 物料唯一标识
- materialCode: VARCHAR(30) - 物料编码
- materialName: VARCHAR(100) - 物料名称
- category: ENUM - 类别（raw_material/wip/finished_goods）
- unit: VARCHAR(10) - 单位
- unitPrice: DECIMAL(15,4) - 单价
- safetyStock: INTEGER - 安全库存

**TypeScript Interface:**
```typescript
interface Material {
  id: string;
  code: string;
  name: string;
  category: 'raw_material' | 'wip' | 'finished_goods';
  unit: string;
  unitPrice: number;
  safetyStock: number;
}
```

**Relationships:**
- Material → Inventory (1:N)
- Material → BOMItem (1:N)

---
