# 9. Database Schema

```sql
-- 客户表
CREATE TABLE customers (
    id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    type ENUM('potential', 'active', 'inactive') NOT NULL DEFAULT 'potential',
    industry VARCHAR(50),
    credit_limit DECIMAL(15,2),
    owner_id VARCHAR(36),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    INDEX idx_code (code),
    INDEX idx_type (type),
    INDEX idx_owner (owner_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 联系人表
CREATE TABLE contacts (
    id VARCHAR(36) PRIMARY KEY,
    customer_id VARCHAR(36) NOT NULL,
    name VARCHAR(50) NOT NULL,
    position VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(100),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    INDEX idx_customer (customer_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 报价单表
CREATE TABLE quotations (
    id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    customer_id VARCHAR(36) NOT NULL,
    delivery_date DATE NOT NULL,
    valid_until DATE,
    status ENUM('draft', 'submitted', 'approved', 'rejected', 'converted') NOT NULL DEFAULT 'draft',
    total_amount DECIMAL(15,2) DEFAULT 0,
    profit_margin DECIMAL(5,2) DEFAULT 0.15,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    INDEX idx_code (code),
    INDEX idx_customer (customer_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 工单表
CREATE TABLE work_orders (
    id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    order_id VARCHAR(36) NOT NULL,
    status ENUM('planned', 'released', 'in_progress', 'paused', 'completed', 'cancelled') NOT NULL DEFAULT 'planned',
    planned_start_date DATETIME,
    planned_end_date DATETIME,
    actual_start_date DATETIME,
    actual_end_date DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    INDEX idx_code (code),
    INDEX idx_order (order_id),
    INDEX idx_status (status),
    INDEX idx_planned_date (planned_start_date, planned_end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 物料表
CREATE TABLE materials (
    id VARCHAR(36) PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    category ENUM('raw_material', 'wip', 'finished_goods') NOT NULL,
    unit VARCHAR(10) NOT NULL,
    unit_price DECIMAL(15,4) DEFAULT 0,
    safety_stock INT DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    INDEX idx_code (code),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 库存表
CREATE TABLE inventory (
    id VARCHAR(36) PRIMARY KEY,
    material_id VARCHAR(36) NOT NULL,
    batch_number VARCHAR(50),
    quantity DECIMAL(15,4) NOT NULL DEFAULT 0,
    reserved_quantity DECIMAL(15,4) NOT NULL DEFAULT 0,
    location_code VARCHAR(50),
    received_date DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    FOREIGN KEY (material_id) REFERENCES materials(id),
    INDEX idx_material (material_id),
    INDEX idx_location (location_code),
    INDEX idx_batch (batch_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 文件元数据表
CREATE TABLE file_metadata (
    id VARCHAR(36) PRIMARY KEY,
    file_id VARCHAR(100) NOT NULL UNIQUE,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100),
    size BIGINT NOT NULL DEFAULT 0,
    bucket VARCHAR(50) NOT NULL,
    object_key VARCHAR(500) NOT NULL,
    uploaded_by VARCHAR(36),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME,
    INDEX idx_file_id (file_id),
    INDEX idx_bucket (bucket),
    INDEX idx_uploaded_by (uploaded_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---
