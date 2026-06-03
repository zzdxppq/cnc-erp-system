# Epic 3: Order & Drawing Management

**Epic Summary:** 实现销售订单全生命周期管理和图纸全生命周期管理。订单从录入到审批、变更、关闭的完整流程；图纸从客户上传到工程转化、版本管理、打印随单的全流程追踪。

**Target Repositories:** cnc-erp-system (后端), cnc-erp-web (前端)

```yaml
epic_id: 3
title: "Order & Drawing Management"
description: |
  销售订单管理接收报价转单或直接录入，管理订单全生命周期：录入、审批、变更、关闭。
  图纸管理贯穿客户图纸→工程转化→厂内图纸→版本管理→打印随单的全流程，
  实现图纸与订单、工单的关联追踪。

stories:
  - id: "3.1"
    title: "Sales Order - Order Lifecycle"
    repository_type: monolith
    estimated_complexity: high
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Create sales order from quotation or directly"
        scenario:
          given: "Customer exists in system"
          when: "Salesman creates order via POST /api/orders"
          then:
            - "Order is created with customer, items, delivery date"
            - "Order code is auto-generated (format: SO-YYYYMMDD-XXXX)"
            - "If from quotation, items and drawings are linked"
            - "Order status is 'pending_approval'"

        business_rules:
          - id: "BR-1.1"
            rule: "Order statuses: draft, pending_approval, approved, in_production, shipped, closed, cancelled"
          - id: "BR-1.2"
            rule: "Order amount >= 50K requires multi-level approval"
          - id: "BR-1.3"
            rule: "Order can have multiple shipments (partial delivery)"

        data_validation:
          - field: "customerId"
            type: "uuid"
            required: true
            rules: "Valid customer UUID"
            error_message: "请选择客户"
          - field: "deliveryDate"
            type: "date"
            required: true
            rules: "Must be future date"
            error_message: "请选择交期"
          - field: "items"
            type: "array"
            required: true
            rules: "At least one item required"
            error_message: "请添加订单明细"

        error_handling:
          - scenario: "Customer not found"
            code: "404"
            message: "客户不存在"
            action: "返回404"

    provides_apis:
      - "POST /api/orders"
      - "GET /api/orders"
      - "GET /api/orders/:id"
      - "PUT /api/orders/:id"
      - "DELETE /api/orders/:id"
    consumes_apis: []
    dependencies: ["2.1", "2.6"]
    sm_hints:
      front_end_spec:
        file: "epic-3-front-end-spec.md"
        sections:
          - "Story 3.1: Sales Order Lifecycle"
      architecture: null

  - id: "3.2"
    title: "Drawing Lifecycle - From Customer Upload to Shop Floor"
    repository_type: monolith
    estimated_complexity: high
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Customer drawing upload and version management"
        scenario:
          given: "Order exists with quotation drawings"
          when: "Engineer reviews drawing via GET /api/drawings/:id"
          then:
            - "Drawing metadata is displayed: drawing number, version, upload date, customer"
            - "Drawing file can be previewed (PDF inline, CAD download)"
            - "Engineer can add internal annotation/notes"
            - "Drawing status updates: received -> in_review -> approved -> for_production"

        business_rules:
          - id: "BR-1.1"
            rule: "Drawing versions: v1, v2, v3... each version creates new record"
          - id: "BR-1.2"
            rule: "Latest version is marked as current"
          - id: "BR-1.3"
            rule: "Drawing is linked to order items"

        error_handling:
          - scenario: "Drawing file corrupted"
            code: "500"
            message: "图纸文件损坏"
            action: "返回500，提示重新上传"
          - scenario: "Unsupported file format"
            code: "400"
            message: "不支持的文件格式"
            action: "返回400，列出支持的格式"

    provides_apis:
      - "GET /api/drawings/:id"
      - "PUT /api/drawings/:id"
      - "POST /api/drawings/:id/versions"
      - "GET /api/drawings/:id/versions"
      - "GET /api/drawings/order/:orderId"
    consumes_apis: []
    dependencies: ["3.1", "2.3"]
    sm_hints:
      front_end_spec: null
      architecture: null

  - id: "3.3"
    title: "Engineering Drawing Conversion"
    repository_type: monolith
    estimated_complexity: medium
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Convert customer drawing to internal shop drawing"
        scenario:
          given: "Customer drawing is approved"
          when: "Engineer creates internal drawing via POST /api/drawings/:id/convert"
          then:
            - "Internal drawing is created with reference to customer drawing"
            - "Internal drawing number is auto-generated (format: DWG-INTERNAL-XXXX)"
            - "Manufacturing specifications are added (tolerances, surface finish, etc.)"
            - "Bill of materials (BOM) is auto-generated from drawing dimensions"

        business_rules:
          - id: "BR-1.1"
            rule: "Internal drawing inherits customer drawing metadata"
          - id: "BR-1.2"
            rule: "BOM is auto-created with default material and process"
          - id: "BR-1.3"
            rule: "Engineer can modify BOM before saving"

        error_handling:
          - scenario: "Customer drawing not approved"
            code: "400"
            message: "客户图纸尚未审批通过"
            action: "返回400"

    provides_apis:
      - "POST /api/drawings/:id/convert"
      - "GET /api/internal-drawings"
      - "GET /api/internal-drawings/:id"
      - "PUT /api/internal-drawings/:id"
    consumes_apis: []
    dependencies: ["3.2"]
    sm_hints:
      front_end_spec: null
      architecture: null

  - id: "3.4"
    title: "Drawing Print with Work Order"
    repository_type: monolith
    estimated_complexity: low
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Print drawing with work order barcodes"
        scenario:
          given: "Work order exists with linked drawings"
          when: "Operator requests to print via GET /api/work-orders/:id/print"
          then:
            - "Print preview shows: drawing PDF, work order barcode, quantity, due date"
            - "Barcode encodes: work order number, item sequence, quantity"
            - "Print can be triggered to network printer"

        business_rules:
          - id: "BR-1.1"
            rule: "Barcode format: Code128, encodes work order number and item index"
          - id: "BR-1.2"
            rule: "Print includes: drawing, specifications, quality requirements"

        error_handling:
          - scenario: "Printer offline"
            code: "500"
            message: "打印机离线"
            action: "返回500，提示检查打印机连接"

    provides_apis:
      - "GET /api/work-orders/:id/print"
      - "GET /api/work-orders/:id/print-preview"
    consumes_apis: []
    dependencies: ["4.1"]
    sm_hints:
      front_end_spec: null
      architecture: null
```

---
