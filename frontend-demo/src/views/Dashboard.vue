<script setup lang="ts">
defineProps<{
  userName: string
}>()

const stats = [
  { label: '今日产值', value: '¥128,500', change: '+12.5%', up: true },
  { label: '生产工单', value: '24', change: '+3', up: true },
  { label: '逾期提醒', value: '5', change: '-2', up: false },
  { label: '库存周转', value: '18天', change: '-3天', up: true },
]

const recentOrders = [
  { id: 'WO2024060301', product: '精密轴套 #A202', machine: 'CNC-01', status: '加工中', progress: 65 },
  { id: 'WO2024060302', product: '法兰盘 #B105', machine: 'CNC-03', status: '待加工', progress: 0 },
  { id: 'WO2024060303', product: '齿轮箱体 #C308', machine: 'CNC-02', status: '已完成', progress: 100 },
]

const notifications = [
  { type: 'warning', text: '工单 WO2024060105 已逾期3天' },
  { type: 'info', text: '新报价单来自：深圳市XX机械' },
  { type: 'success', text: '采购订单 PO2024060201 已入库' },
]
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div>
        <h1>生产看板</h1>
        <p class="subtitle">欢迎回来，{{ userName }} · 2026年6月3日</p>
      </div>
      <div class="header-actions">
        <button class="action-btn">📊 数据导出</button>
        <button class="action-btn primary">+ 新建工单</button>
      </div>
    </header>

    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.label" class="stat-card glass-card">
        <span class="stat-label">{{ stat.label }}</span>
        <span class="stat-value">{{ stat.value }}</span>
        <span :class="['stat-change', stat.up ? 'up' : 'down']">
          {{ stat.change }}
        </span>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="orders-section glass-card">
        <h2>工单动态</h2>
        <div class="order-list">
          <div v-for="order in recentOrders" :key="order.id" class="order-item">
            <div class="order-info">
              <span class="order-id">{{ order.id }}</span>
              <span class="order-product">{{ order.product }}</span>
            </div>
            <div class="order-meta">
              <span class="machine">📍 {{ order.machine }}</span>
              <span :class="['status', order.status]">{{ order.status }}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: order.progress + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="notify-section glass-card">
        <h2>实时通知</h2>
        <div class="notify-list">
          <div v-for="(notif, i) in notifications" :key="i" :class="['notify-item', notif.type]">
            <span class="notify-icon">{{ notif.type === 'warning' ? '⚠️' : notif.type === 'info' ? 'ℹ️' : '✅' }}</span>
            <span class="notify-text">{{ notif.text }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="scan-preview glass-card">
      <h2>📱 扫码功能演示</h2>
      <div class="scan-buttons">
        <button class="scan-btn">扫码开工</button>
        <button class="scan-btn">扫码报工</button>
        <button class="scan-btn">扫码过站</button>
      </div>
      <p class="scan-hint">点击按钮模拟扫码操作（Demo模式）</p>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1400px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.dashboard-header h1 {
  font-size: 28px;
  font-weight: 600;
  background: linear-gradient(135deg, #00d4ff, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: #64748b;
  font-size: 14px;
  margin-top: 4px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  padding: 10px 16px;
  background: rgba(30, 30, 46, 0.8);
  border: 1px solid #1e1e2e;
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn.primary {
  background: linear-gradient(135deg, #00d4ff, #a855f7);
  border: none;
  color: #0a0a0f;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-label {
  font-size: 13px;
  color: #64748b;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #e2e8f0;
}

.stat-change {
  font-size: 13px;
}

.stat-change.up { color: #10b981; }
.stat-change.down { color: #ef4444; }

.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.glass-card {
  padding: 20px;
}

.glass-card h2 {
  font-size: 16px;
  color: #e2e8f0;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #1e1e2e;
}

.order-item {
  padding: 12px 0;
  border-bottom: 1px solid #1e1e2e;
}

.order-item:last-child { border-bottom: none; }

.order-info {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

.order-id {
  font-family: monospace;
  color: #00d4ff;
  font-size: 13px;
}

.order-product {
  color: #e2e8f0;
}

.order-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
}

.machine {
  font-size: 12px;
  color: #64748b;
}

.status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.status.加工中 { background: rgba(0, 212, 255, 0.2); color: #00d4ff; }
.status.待加工 { background: rgba(168, 85, 247, 0.2); color: #a855f7; }
.status.已完成 { background: rgba(16, 185, 129, 0.2); color: #10b981; }

.progress-bar {
  height: 4px;
  background: #1e1e2e;
  border-radius: 2px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00d4ff, #a855f7);
  border-radius: 2px;
}

.notify-item {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #1e1e2e;
}

.notify-item:last-child { border-bottom: none; }

.notify-icon { font-size: 16px; }
.notify-text { font-size: 13px; color: #94a3b8; }

.scan-preview {
  text-align: center;
  padding: 32px;
}

.scan-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin: 24px 0;
}

.scan-btn {
  padding: 16px 32px;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(168, 85, 247, 0.2));
  border: 1px solid rgba(0, 212, 255, 0.5);
  border-radius: 12px;
  color: #00d4ff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.scan-btn:hover {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.4), rgba(168, 85, 247, 0.4));
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
}

.scan-hint {
  font-size: 12px;
  color: #475569;
}
</style>