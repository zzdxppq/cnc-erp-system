<script setup lang="ts">
import { ref } from 'vue'

const scanMode = ref<'start' | 'report' | 'transfer' | null>(null)
const scanResult = ref('')
const workOrders = [
  { id: 'WO2024060301', product: '精密轴套 #A202', status: '待加工', machine: 'CNC-01' },
  { id: 'WO2024060302', product: '法兰盘 #B105', status: '加工中', machine: 'CNC-03' },
  { id: 'WO2024060303', product: '齿轮箱体 #C308', status: '待加工', machine: 'CNC-02' },
]

const handleScan = (mode: 'start' | 'report' | 'transfer') => {
  scanMode.value = mode
  scanResult.value = mode === 'start' ? '扫码开工成功！' :
                      mode === 'report' ? '报工数量: 50件' : '过站登记完成'
}
</script>

<template>
  <div class="workshop">
    <header class="page-header">
      <h1>车间执行</h1>
      <p class="subtitle">扫码开工 · 扫码报工 · 扫码过站</p>
    </header>

    <div class="scan-grid">
      <div class="scan-card glass-card glow-border" @click="handleScan('start')">
        <div class="scan-icon">📱</div>
        <h3>扫码开工</h3>
        <p>扫描工单二维码开始加工</p>
        <span class="scan-status ready">待执行</span>
      </div>

      <div class="scan-card glass-card glow-border" @click="handleScan('report')">
        <div class="scan-icon">📝</div>
        <h3>扫码报工</h3>
        <p>录入完工数量和合格数量</p>
        <span class="scan-status ready">待执行</span>
      </div>

      <div class="scan-card glass-card glow-border" @click="handleScan('transfer')">
        <div class="scan-icon">🔄</div>
        <h3>扫码过站</h3>
        <p>记录物料流转和交接</p>
        <span class="scan-status ready">待执行</span>
      </div>
    </div>

    <div class="result-modal glass-card" v-if="scanResult">
      <div class="result-icon">✅</div>
      <p>{{ scanResult }}</p>
      <button class="close-btn" @click="scanResult = ''; scanMode = null">关闭</button>
    </div>

    <div class="orders-section glass-card">
      <h2>今日工单</h2>
      <div class="order-table">
        <div class="table-header">
          <span>工单号</span>
          <span>产品</span>
          <span>机台</span>
          <span>状态</span>
          <span>操作</span>
        </div>
        <div v-for="order in workOrders" :key="order.id" class="table-row">
          <span class="order-id">{{ order.id }}</span>
          <span>{{ order.product }}</span>
          <span>{{ order.machine }}</span>
          <span :class="['status-badge', order.status]">{{ order.status }}</span>
          <div class="row-actions">
            <button class="mini-btn" @click="handleScan('start')">开工</button>
            <button class="mini-btn" @click="handleScan('report')">报工</button>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-box glass-card">
        <span class="stat-num">12</span>
        <span class="stat-label">今日开工</span>
      </div>
      <div class="stat-box glass-card">
        <span class="stat-num">8</span>
        <span class="stat-label">已完成</span>
      </div>
      <div class="stat-box glass-card">
        <span class="stat-num">156</span>
        <span class="stat-label">总产量(件)</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.workshop { max-width: 1200px; }

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
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

.scan-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.scan-card {
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.scan-card:hover {
  transform: translateY(-4px);
  border-color: #00d4ff;
}

.scan-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.scan-card h3 {
  color: #e2e8f0;
  margin-bottom: 8px;
}

.scan-card p {
  color: #64748b;
  font-size: 13px;
  margin-bottom: 12px;
}

.scan-status {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 12px;
}

.scan-status.ready {
  background: rgba(0, 212, 255, 0.2);
  color: #00d4ff;
}

.result-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 32px 48px;
  text-align: center;
  z-index: 1000;
}

.result-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.close-btn {
  margin-top: 16px;
  padding: 8px 24px;
  background: linear-gradient(135deg, #00d4ff, #a855f7);
  border: none;
  border-radius: 8px;
  color: #0a0a0f;
  cursor: pointer;
}

.orders-section {
  margin-bottom: 24px;
}

.orders-section h2 {
  font-size: 16px;
  margin-bottom: 16px;
}

.table-header, .table-row {
  display: grid;
  grid-template-columns: 140px 1fr 100px 100px 120px;
  padding: 12px;
  gap: 12px;
  align-items: center;
}

.table-header {
  color: #64748b;
  font-size: 12px;
  border-bottom: 1px solid #1e1e2e;
}

.table-row {
  border-bottom: 1px solid #1e1e2e;
  font-size: 13px;
}

.order-id {
  font-family: monospace;
  color: #00d4ff;
}

.status-badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.status-badge.待加工 { background: rgba(168, 85, 247, 0.2); color: #a855f7; }
.status-badge.加工中 { background: rgba(0, 212, 255, 0.2); color: #00d4ff; }

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

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-box {
  padding: 20px;
  text-align: center;
}

.stat-num {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #00d4ff, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}

.stat-label {
  font-size: 13px;
  color: #64748b;
}
</style>