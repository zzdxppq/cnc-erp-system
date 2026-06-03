<script setup lang="ts">
const quotations = [
  { id: 'Q2024060301', customer: '深圳市XX机械', amount: '¥15,800', date: '2026-06-03', status: '待审批' },
  { id: 'Q2024060201', customer: '东莞市YY精密电子', amount: '¥28,500', date: '2026-06-02', status: '已通过' },
  { id: 'Q2024060101', customer: '佛山市ZZ金属制品', amount: '¥12,300', date: '2026-06-01', status: '已拒绝' },
]
</script>

<template>
  <div class="quotation-view">
    <header class="page-header">
      <h1>报价管理</h1>
      <button class="action-btn primary">+ 新建报价单</button>
    </header>

    <div class="quotation-table glass-card">
      <div class="table-header">
        <span>报价单号</span>
        <span>客户</span>
        <span>报价金额</span>
        <span>日期</span>
        <span>状态</span>
        <span>操作</span>
      </div>
      <div v-for="q in quotations" :key="q.id" class="table-row">
        <span class="quote-id">{{ q.id }}</span>
        <span>{{ q.customer }}</span>
        <span class="amount">{{ q.amount }}</span>
        <span>{{ q.date }}</span>
        <span :class="['status-badge', q.status]">{{ q.status }}</span>
        <div class="row-actions">
          <button class="mini-btn">查看</button>
          <button class="mini-btn edit">编辑</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quotation-view { max-width: 1200px; }
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
  grid-template-columns: 140px 1fr 120px 100px 100px 120px;
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
.quote-id { font-family: monospace; color: #00d4ff; }
.amount { color: #10b981; font-weight: 600; }
.status-badge { font-size: 12px; padding: 2px 8px; border-radius: 4px; }
.status-badge.待审批 { background: rgba(168, 85, 247, 0.2); color: #a855f7; }
.status-badge.已通过 { background: rgba(16, 185, 129, 0.2); color: #10b981; }
.status-badge.已拒绝 { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
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