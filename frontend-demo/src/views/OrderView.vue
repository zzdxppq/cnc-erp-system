<script setup lang="ts">
const orders = [
  { id: 'SO2024060301', customer: '深圳市XX机械', product: '精密轴套 #A202', qty: 100, deliver: '2026-06-15', status: '生产中' },
  { id: 'SO2024060201', customer: '东莞市YY精密电子', product: '法兰盘 #B105', qty: 50, deliver: '2026-06-10', status: '已发货' },
  { id: 'SO2024060101', customer: '佛山市ZZ金属制品', product: '齿轮箱体 #C308', qty: 30, deliver: '2026-06-05', status: '已完成' },
]
</script>

<template>
  <div class="order-view">
    <header class="page-header">
      <h1>订单管理</h1>
      <button class="action-btn primary">+ 新建订单</button>
    </header>

    <div class="order-table glass-card">
      <div class="table-header">
        <span>订单号</span>
        <span>客户</span>
        <span>产品</span>
        <span>数量</span>
        <span>交期</span>
        <span>状态</span>
        <span>操作</span>
      </div>
      <div v-for="o in orders" :key="o.id" class="table-row">
        <span class="order-id">{{ o.id }}</span>
        <span>{{ o.customer }}</span>
        <span>{{ o.product }}</span>
        <span>{{ o.qty }}</span>
        <span>{{ o.deliver }}</span>
        <span :class="['status-badge', o.status]">{{ o.status }}</span>
        <div class="row-actions">
          <button class="mini-btn">详情</button>
          <button class="mini-btn edit">跟踪</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-view { max-width: 1200px; }
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
  grid-template-columns: 130px 1fr 1fr 80px 100px 100px 100px;
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
.order-id { font-family: monospace; color: #00d4ff; }
.status-badge { font-size: 12px; padding: 2px 8px; border-radius: 4px; }
.status-badge.生产中 { background: rgba(0, 212, 255, 0.2); color: #00d4ff; }
.status-badge.已发货 { background: rgba(168, 85, 247, 0.2); color: #a855f7; }
.status-badge.已完成 { background: rgba(16, 185, 129, 0.2); color: #10b981; }
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