# Epic 8: Reporting & Dashboard

**Epic Summary:** 实现产值、交付、逾期、库存等关键业务指标的实时看板，以及财务报表。帮助管理者快速掌握业务状态，做出数据驱动的决策。

**Target Repositories:** cnc-erp-web (前端看板) + cnc-erp-system (后端报表服务)

```yaml
epic_id: 8
title: "Reporting & Dashboard"
description: |
  数据驱动决策是现代企业管理的核心。本Epic提供产值、交付、逾期、库存等关键指标的
  实时看板，帮助管理者快速掌握业务状态。报表服务独立部署，接收业务数据推送，
  预计算汇总指标，保证查询性能。

stories:
  - id: "8.1"
    title: "Production Value Dashboard (产值看板)"
    repository_type: monolith
    estimated_complexity: medium
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Display production value metrics in real-time"
        scenario:
          given: "Production data is recorded"
          when: "Manager views production value dashboard via GET /api/reports/production-value"
          then:
            - "Today's production value is displayed"
            - "This week's production value is displayed"
            - "This month's production value is displayed"
            - "Year-to-date production value is displayed"
            - "Trend chart shows daily/weekly/monthly values"
            - "Breakdown by product category or work order type"

        business_rules:
          - id: "BR-1.1"
            rule: "Production value = sum of (completed quantity * unit price) for finished work orders"
          - id: "BR-1.2"
            rule: "Values exclude cancelled or rejected orders"
          - id: "BR-1.3"
            rule: "Data refreshes every 5 minutes"

        error_handling:
          - scenario: "No production data"
            code: "200"
            message: "暂无产值数据"
            action: "返回空数据提示"

    provides_apis:
      - "GET /api/reports/production-value"
      - "GET /api/reports/production-value/trend"
    consumes_apis: []
    dependencies: ["5.2", "5.3"]
    sm_hints:
      front_end_spec:
        file: "epic-8-front-end-spec.md"
        sections:
          - "Story 8.1: Production Value Dashboard"
          - "Chart Components"
      architecture: null

  - id: "8.2"
    title: "Delivery Performance Dashboard (交付看板)"
    repository_type: monolith
    estimated_complexity: medium
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Display delivery performance metrics"
        scenario:
          given: "Orders and work orders exist"
          when: "Manager views delivery dashboard via GET /api/reports/delivery"
          then:
            - "On-time delivery rate is calculated and displayed"
            - "Orders due this week are listed with status"
            - "Orders overdue are highlighted in red"
            - "Orders completed ahead of schedule are highlighted in green"
            - "Trend chart shows weekly on-time rate"

        business_rules:
          - id: "BR-1.1"
            rule: "On-time = actual_delivery_date <= promised_delivery_date"
          - id: "BR-1.2"
            rule: "On-time rate = on_time_orders / total_delivered_orders * 100%"
          - id: "BR-1.3"
            rule: "Target on-time rate: 90%"

        error_handling:
          - scenario: "No delivery data"
            code: "200"
            message: "暂无交付数据"
            action: "返回空数据提示"

    provides_apis:
      - "GET /api/reports/delivery"
      - "GET /api/reports/delivery/overdue"
      - "GET /api/reports/delivery/trend"
    consumes_apis: []
    dependencies: ["5.3"]
    sm_hints:
      front_end_spec: null
      architecture: null

  - id: "8.3"
    title: "Inventory Dashboard (库存看板)"
    repository_type: monolith
    estimated_complexity: medium
    priority: P0

    acceptance_criteria:
      - id: AC1
        title: "Display inventory metrics and alerts"
        scenario:
          given: "Inventory transactions are recorded"
          when: "Manager views inventory dashboard via GET /api/reports/inventory"
          then:
            - "Total inventory value is displayed"
            - "Stock levels by category (raw material, WIP, finished goods)"
            - "Low stock alerts for items below safety stock"
            - "Slow-moving items (no movement in 30+ days)"
            - "Inventory turnover rate"

        business_rules:
          - id: "BR-1.1"
            rule: "Inventory value = sum(item.quantity * item.unit_cost)"
          - id: "BR-1.2"
            rule: "Low stock threshold: configurable per item (default 10 units)"
          - id: "BR-1.3"
            rule: "Slow-moving: no transactions in past 30 days"

        error_handling:
          - scenario: "No inventory data"
            code: "200"
            message: "暂无库存数据"
            action: "返回空数据提示"

    provides_apis:
      - "GET /api/reports/inventory"
      - "GET /api/reports/inventory/alerts"
      - "GET /api/reports/inventory/turnover"
    consumes_apis: []
    dependencies: ["6.1", "6.2", "6.3"]
    sm_hints:
      front_end_spec: null
      architecture: null

  - id: "8.4"
    title: "Financial Reports (财务报表)"
    repository_type: monolith
    estimated_complexity: medium
    priority: P1

    acceptance_criteria:
      - id: AC1
        title: "Generate financial summary reports"
        scenario:
          given: "Sales orders, production costs, and outsourcing expenses are recorded"
          when: "Finance manager generates report via GET /api/reports/financial"
          then:
            - "Revenue report: sales by period, customer, product category"
            - "Cost report: material cost, labor cost, outsourcing cost, overhead"
            - "Profit margin analysis by product or order"
            - "Accounts receivable aging report"
            - "Export to Excel format is supported"

        business_rules:
          - id: "BR-1.1"
            rule: "Revenue recognized on invoice date"
          - id: "BR-1.2"
            rule: "Cost recognized on work order completion"
          - id: "BR-1.3"
            rule: "Profit = Revenue - Material Cost - Process Cost - Outsourcing Cost - Overhead"

        error_handling:
          - scenario: "Incomplete data for period"
            code: "200"
            message: "该期间数据不完整"
            action: "返回提示，显示已知数据范围"

    provides_apis:
      - "GET /api/reports/financial/revenue"
      - "GET /api/reports/financial/cost"
      - "GET /api/reports/financial/profit"
      - "GET /api/reports/financial/ar-aging"
    consumes_apis: []
    dependencies: ["3.1", "5.4", "7.4"]
    sm_hints:
      front_end_spec: null
      architecture: null
```

---
