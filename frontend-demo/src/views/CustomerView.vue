<script setup lang="ts">
import { ref } from 'vue'

const customers = [
  { id: 'C001', name: '深圳市XX机械有限公司', contact: '张经理', phone: '138****1234', status: '正常' },
  { id: 'C002', name: '东莞市YY精密电子', contact: '李总', phone: '139****5678', status: '正常' },
  { id: 'C003', name: '佛山市ZZ金属制品', contact: '王工', phone: '137****9012', status: '待跟进' },
]

const searchQuery = ref('')
</script>

<template>
  <div class="customer-view">
    <header class="page-header">
      <h1>客户管理</h1>
      <div class="header-actions">
        <input v-model="searchQuery" type="text" placeholder="搜索客户..." class="search-input" />
        <button class="action-btn primary">+ 新增客户</button>
      </div>
    </header>

    <div class="customer-table glass-card">
      <div class="table-header">
        <span>客户编号</span>
        <span>客户名称</span>
        <span>联系人</span>
        <span>电话</span>
        <span>状态</span>
        <span>操作</span>
      </div>
      <div v-for="c in customers" :key="c.id" class="table-row">
        <span class="customer-id">{{ c.id }}</span>
        <span>{{ c.name }}</span>
        <span>{{ c.contact }}</span>
        <span>{{ c.phone }}</span>
        <span :class="['status-badge', c.status]">{{ c.status }}</span>
        <div class="row-actions">
          <button class="mini-btn">查看</button>
          <button class="mini-btn edit">编辑</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.customer-view { max-width: 1200px; }

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  background: linear-gradient(135deg, #00d4ff, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-actions { display: flex; gap: 12px; }

.search-input {
  padding: 10px 16px;
  background: rgba(30, 30, 46, 0.8);
  border: 1px solid #1e1e2e;
  border-radius: 8px;
  color: #e2e8f0;
  width: 200px;
}

.action-btn {
  padding: 10px 16px;
  background: rgba(30, 30, 46, 0.8);
  border: 1px solid #1e1e2e;
  border-radius: 8px;
  color: #e2e8f0;
  cursor: pointer;
}

.action-btn.primary {
  background: linear-gradient(135deg, #00d4ff, #a855f7);
  border: none;
  color: #0a0a0f;
  font-weight: 600;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: 100px 1fr 100px 120px 100px 120px;
  padding: 12px;
  gap: 12px;
  align-items: center;
}

.table-header {
  color: #64748b;
  font-size: 12px;
  border-bottom: 1px solid #1e1e2e;
}

.table-row { border-bottom: 1px solid #1e1e2e; font-size: 13px; }

.customer-id {
  font-family: monospace;
  color: #00d4ff;
}

.status-badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.status-badge.正常 { background: rgba(16, 185, 129, 0.2); color: #10b981; }
.status-badge.待跟进 { background: rgba(168, 85, 247, 0.2); color: #a855f7; }

.row-actions { display: flex; gap: 8px; }

.mini-btn {
  padding: 4px 12px;
  background: rgba(0, 212, 255, 0.2);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 4px;
  color: #00d4ff;
  font-size: 12px;
  cursor: pointer;
}

.mini-btn.edit { background: rgba(168, 85, 247, 0.2); border-color: rgba(168, 85, 247, 0.3); color: #a855f7; }
</style>