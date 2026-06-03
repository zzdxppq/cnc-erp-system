# Epic 4: Production Planning & Scheduling

**Epic Summary:** 实现从订单到工单的生产计划全流程：订单转工单、工序路线定义、机台排程、甘特图可视化、自加工与外协混合模式支持。

**Target Repositories:** cnc-erp-system (后端), cnc-erp-web (前端)

```yaml
epic_id: 4
title: "Production Planning & Scheduling"
description: |
  生产排产是制造执行的核心环节。将销售订单转化为生产工单，
  定义工序路线、机台分配、产能评估。支持自加工与委外加工混合排产，
  甘特图可视化帮助生管员优化生产计划。

stories:
  - id: "4.1"
    title: "Order to Work Order Conversion"
    repository_type: monolith
    estimated_complexity: high
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Convert order items to work orders"
        scenario:
          given: "Approved sales order exists"
          when: "Planner creates work orders via POST /api/work-orders from order"
          then:
            - "Work order is created for each order item (or group of items)"
            - "Work order code is auto-generated (format: WO-YYYYMMDD-XXXX)"
            - "Production routes (工序路线) are assigned based on product type"
            - "Planned start and end dates are calculated based on delivery date and lead time"
            - "Work order status is 'planned'"

        business_rules:
          - id: "BR-1.1"
            rule: "Work order statuses: planned, released, in_progress, paused, completed, cancelled"
          - id: "BR-1.2"
            rule: "Lead time calculation considers: material procurement, processing time, queue time"
          - id: "BR-1.3"
            rule: "Multiple order items can be combined into single work order (batch production)"

        data_validation:
          - field: "orderId"
            type: "uuid"
            required: true
            rules: "Valid order UUID"
            error_message: "请选择订单"
          - field: "orderItemIds"
            type: "array"
            required: true
            rules: "Valid order item UUIDs"
            error_message: "请选择订单明细"
          - field: "plannedStartDate"
            type: "date"
            required: true
            rules: "Date, must be <= delivery_date - lead_time"
            error_message: "请选择计划开始日期"

        error_handling:
          - scenario: "Order not approved"
            code: "400"
            message: "订单尚未审批通过"
            action: "返回400"
          - scenario: "Insufficient BOM"
            code: "400"
            message: "物料清单不完整，无法创建工单"
            action: "返回400，列出缺失的BOM"

    provides_apis:
      - "POST /api/work-orders"
      - "GET /api/work-orders"
      - "GET /api/work-orders/:id"
      - "PUT /api/work-orders/:id"
      - "POST /api/work-orders/from-order"
    consumes_apis: []
    dependencies: ["3.1"]
    sm_hints:
      front_end_spec:
        file: "epic-4-front-end-spec.md"
        sections:
          - "Story 4.1: Order to Work Order"
          - "Gantt Chart Component"
      architecture: null

  - id: "4.2"
    title: "Production Route Definition"
    repository_type: monolith
    estimated_complexity: medium
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Define and manage production routes"
        scenario:
          given: "Product type exists with routing template"
          when: "Planner configures production route via POST /api/production-routes"
          then:
            - "Route is created with sequence of operations"
            - "Each operation has: operation name, work center, standard hours, description"
            - "Route can be assigned to multiple products"
            - "Default route can be set per product type"

        business_rules:
          - id: "BR-1.1"
            rule: "Operations are sequential, order matters"
          - id: "BR-1.2"
            rule: "Work center references machine group or labor group"
          - id: "BR-1.3"
            rule: "Standard hours used for capacity planning and costing"

        data_validation:
          - field: "name"
            type: "string"
            required: true
            rules: "Non-empty, max 100 chars"
            error_message: "请输入路线名称"
          - field: "operations"
            type: "array"
            required: true
            rules: "At least one operation required"
            error_message: "请添加工序"

        error_handling:
          - scenario: "Duplicate route name"
            code: "409"
            message: "该路线名称已存在"
            action: "返回409"

    provides_apis:
      - "POST /api/production-routes"
      - "GET /api/production-routes"
      - "GET /api/production-routes/:id"
      - "PUT /api/production-routes/:id"
      - "DELETE /api/production-routes/:id"
    consumes_apis: []
    dependencies: []
    sm_hints:
      front_end_spec: null
      architecture: null

  - id: "4.3"
    title: "Machine Scheduling and Gantt Chart"
    repository_type: monolith
    estimated_complexity: high
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Schedule work orders on machines with Gantt visualization"
        scenario:
          given: "Work orders exist with production routes"
          when: "Planner assigns work orders to machines via PUT /api/work-orders/:id/schedule"
          then:
            - "Work order is assigned to specific machine for each operation"
            - "Scheduled start and end times are calculated based on machine availability"
            - "Conflicts are detected (machine double-booked)"
            - "Gantt chart is updated in real-time"

        business_rules:
          - id: "BR-1.1"
            rule: "Machine availability considers: shift schedule, maintenance windows, current load"
          - id: "BR-1.2"
            rule: "Scheduling algorithm minimizes machine changeover time"
          - id: "BR-1.3"
            rule: "Operation sequence must respect route order"

        data_validation:
          - field: "machineId"
            type: "uuid"
            required: true
            rules: "Valid machine UUID"
            error_message: "请选择机台"
          - field: "operationId"
            type: "uuid"
            required: true
            rules: "Valid operation UUID from route"
            error_message: "请选择工序"
          - field: "scheduledStart"
            type: "datetime"
            required: true
            rules: "Must be within machine working hours"
            error_message: "请选择有效的计划时间"

        error_handling:
          - scenario: "Machine not available"
            code: "409"
            message: "机台不可用"
            action: "返回409，显示可用时间窗口"
          - scenario: "Conflict with existing schedule"
            code: "409"
            message: "与现有排程冲突"
            action: "返回409，建议其他时间"

    provides_apis:
      - "PUT /api/work-orders/:id/schedule"
      - "GET /api/work-orders/scheduling"
      - "GET /api/gantt"
      - "GET /api/machines/:id/schedule"
    consumes_apis: []
    dependencies: ["4.1", "4.2"]
    sm_hints:
      front_end_spec: null
      architecture: null

  - id: "4.4"
    title: "In-house vs Outsourcing Decision"
    repository_type: monolith
    estimated_complexity: medium
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Mark operations as in-house or outsourced"
        scenario:
          given: "Work order is scheduled with operations"
          when: "Planner marks specific operation as outsourced via PUT /api/work-orders/:id/operations/:opId"
          then:
            - "Operation is marked with type: in_house or outsourced"
            - "If outsourced, supplier field is required"
            - "Estimated cost is recorded (in-house: labor + overhead, outsourced: processing fee)"
            - "Operation is excluded from machine scheduling"

        business_rules:
          - id: "BR-1.1"
            rule: "Outsourced operations do not consume machine capacity"
          - id: "BR-1.2"
            rule: "Outsourcing reasons: capacity shortage, special process not available, cost optimization"
          - id: "BR-1.3"
            rule: "Outsourced operation creates subcontract record"

        data_validation:
          - field: "operationType"
            type: "string"
            required: true
            rules: "in_house or outsourced"
            error_message: "请选择工序类型"
          - field: "supplierId"
            type: "uuid"
            required: true
            rules: "Valid supplier UUID when outsourced"
            error_message: "请选择外协厂商"

        error_handling:
          - scenario: "Supplier not found"
            code: "404"
            message: "外协厂商不存在"
            action: "返回404"

    provides_apis:
      - "PUT /api/work-orders/:id/operations/:opId"
      - "GET /api/work-orders/:id/operations"
    consumes_apis: []
    dependencies: ["4.3"]
    sm_hints:
      front_end_spec: null
      architecture: null
```

---
