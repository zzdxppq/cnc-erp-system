# Epic 7: Outsourcing & Supplier Management

**Epic Summary:** 实现委外加工全流程管理：外协厂商管理、委外下单、委外进度跟踪、委外对账。打通自加工与委外加工的混合生产模式。

**Target Repositories:** cnc-erp-system (后端), cnc-erp-web (前端)

```yaml
epic_id: 7
title: "Outsourcing & Supplier Management"
description: |
  委外加工是CNC行业的常见模式。本Epic管理外协厂商的档案、合作记录、
  委外订单下发、进度跟踪（送货预测、回货追踪）、委外对账付款。
  与自加工无缝衔接，统一在工单视图中追踪。

stories:
  - id: "7.1"
    title: "Supplier Management - Basic Info"
    repository_type: monolith
    estimated_complexity: medium
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Manage outsourcing supplier profiles"
        scenario:
          given: "System admin is authenticated"
          when: "Admin creates supplier via POST /api/suppliers"
          then:
            - "Supplier record is created with name, contact, capabilities, ratings"
            - "Supplier code is auto-generated (format: SUPP-XXXX)"
            - "Supplier categories (oxidation, plating, heat treatment, inspection, etc.) are tagged"
            - "Supplier status: active, suspended, blacklisted"

        business_rules:
          - id: "BR-1.1"
            rule: "Supplier name must be unique"
          - id: "BR-1.2"
            rule: "Supplier can have multiple capabilities"
          - id: "BR-1.3"
            rule: "Blacklisted supplier cannot receive new orders"

        data_validation:
          - field: "name"
            type: "string"
            required: true
            rules: "Non-empty, max 100 chars"
            error_message: "请输入厂商名称"
          - field: "capabilities"
            type: "array"
            required: true
            rules: "At least one capability"
            error_message: "请选择加工能力"

        error_handling:
          - scenario: "Duplicate supplier name"
            code: "409"
            message: "该厂商名称已存在"
            action: "返回409"

    provides_apis:
      - "POST /api/suppliers"
      - "GET /api/suppliers"
      - "GET /api/suppliers/:id"
      - "PUT /api/suppliers/:id"
      - "DELETE /api/suppliers/:id"
    consumes_apis: []
    dependencies: ["1.1"]
    sm_hints:
      front_end_spec:
        file: "epic-7-front-end-spec.md"
        sections:
          - "Story 7.1: Supplier Management"
      architecture: null

  - id: "7.2"
    title: "Outsourcing Order Creation"
    repository_type: monolith
    estimated_complexity: medium
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Create outsourcing order from work order operation"
        scenario:
          given: "Work order has operation marked as outsourced"
          when: "Planner creates outsourcing order via POST /api/outsourcing-orders"
          then:
            - "Outsourcing order is created with supplier, operation details"
            - "Outsourcing order code is auto-generated (format: OS-YYYYMMDD-XXXX)"
            - "Reference to work order operation is preserved"
            - "Estimated delivery date is set"
            - "Order is sent to supplier (email/portal notification)"

        business_rules:
          - id: "BR-1.1"
            rule: "Outsourcing order amount based on quoted price or standard rate"
          - id: "BR-1.2"
            rule: "Supplier must have capability matching operation"
          - id: "BR-1.3"
            rule: "Outsourcing order links to parent work order"

        data_validation:
          - field: "supplierId"
            type: "uuid"
            required: true
            rules: "Valid supplier UUID"
            error_message: "请选择外协厂商"
          - field: "workOrderOperationId"
            type: "uuid"
            required: true
            rules: "Valid work order operation UUID"
            error_message: "请选择委外工序"
          - field: "quantity"
            type: "number"
            required: true
            rules: "Positive number"
            error_message: "请输入数量"
          - field: "estimatedDeliveryDate"
            type: "date"
            required: true
            rules: "Future date"
            error_message: "请选择预计交期"

        error_handling:
          - scenario: "Supplier lacks capability"
            code: "400"
            message: "该厂商不具备加工能力"
            action: "返回400，显示匹配的厂商"
          - scenario: "Operation not marked as outsourced"
            code: "400"
            message: "该工序未标记为外协"
            action: "返回400，先标记外协再下单"

    provides_apis:
      - "POST /api/outsourcing-orders"
      - "GET /api/outsourcing-orders"
      - "GET /api/outsourcing-orders/:id"
      - "PUT /api/outsourcing-orders/:id"
    consumes_apis: []
    dependencies: ["4.4", "7.1"]
    sm_hints:
      front_end_spec: null
      architecture: null

  - id: "7.3"
    title: "Outsourcing Progress Tracking"
    repository_type: monolith
    estimated_complexity: medium
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Track outsourcing order progress and delivery"
        scenario:
          given: "Outsourcing order is confirmed"
          when: "Supplier updates progress or planner records delivery via PUT /api/outsourcing-orders/:id/progress"
          then:
            - "Progress status is updated: sent, in_progress, shipped, delivered"
            - "Estimated delivery is updated if supplier provides new date"
            - "Delivery note number is recorded on delivery"
            - "Quality status (pending_inspection, passed, failed) is recorded"
            - "Parent work order operation status is updated"

        business_rules:
          - id: "BR-1.1"
            rule: "Status transitions: sent -> in_progress -> shipped -> delivered"
          - id: "BR-1.2"
            rule: "Delivery triggers quality inspection request"
          - id: "BR-1.3"
            rule: "Late delivery automatically creates alert"

        data_validation:
          - field: "status"
            type: "string"
            required: true
            rules: "Valid status value"
            error_message: "请选择状态"
          - field: "deliveryNoteNumber"
            type: "string"
            required: false
            rules: "Max 50 chars if provided"
            error_message: "请输入送货单号"

        error_handling:
          - scenario: "Invalid status transition"
            code: "400"
            message: "状态转换无效"
            action: "返回400，显示有效转换"

    provides_apis:
      - "PUT /api/outsourcing-orders/:id/progress"
      - "GET /api/outsourcing-orders/:id/progress-history"
      - "GET /api/outsourcing-orders/pending"
    consumes_apis: []
    dependencies: ["7.2"]
    sm_hints:
      front_end_spec: null
      architecture: null

  - id: "7.4"
    title: "Outsourcing Reconciliation (对账)"
    repository_type: monolith
    estimated_complexity: medium
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Monthly reconciliation with suppliers"
        scenario:
          given: "Outsourcing orders are completed"
          when: "Planner creates reconciliation via POST /api/outsourcing-orders/reconciliation"
          then:
            - "All delivered orders for the period are grouped by supplier"
            - "Total amount is calculated per supplier"
            - "Reconciliation document is generated"
            - "Payment request can be initiated"

        business_rules:
          - id: "BR-1.1"
            rule: "Reconciliation period: monthly (configurable)"
          - id: "BR-1.2"
            rule: "Only delivered and quality-passed orders are included"
          - id: "BR-1.3"
            rule: "Reconciliation status: pending, confirmed, paid"

        error_handling:
          - scenario: "No completed orders"
            code: "400"
            message: "该期间无已完成订单"
            action: "返回400"

    provides_apis:
      - "POST /api/outsourcing-orders/reconciliation"
      - "GET /api/outsourcing-orders/reconciliation/:id"
      - "GET /api/outsourcing-orders/reconciliation/supplier/:supplierId"
    consumes_apis: []
    dependencies: ["7.3"]
    sm_hints:
      front_end_spec: null
      architecture: null
```

---
