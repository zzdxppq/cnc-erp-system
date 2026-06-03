<script setup lang="ts">
defineProps<{
  currentView: string
}>()

defineEmits<{
  navigate: [view: string]
}>()

const menuItems = [
  { id: 'dashboard', label: '首页看板', icon: 'home' },
  { id: 'customer', label: '客户管理', icon: 'users' },
  { id: 'quotation', label: '报价管理', icon: 'file-text' },
  { id: 'order', label: '订单管理', icon: 'clipboard-list' },
  { id: 'workshop', label: '车间执行', icon: 'scan' },
  { id: 'warehouse', label: '仓储管理', icon: 'package' },
  { id: 'quality', label: '品质管理', icon: 'check-circle' },
  { id: 'report', label: '报表中心', icon: 'bar-chart' },
]
</script>

<template>
  <aside class="sidebar glass-card">
    <div class="logo">
      <span class="logo-icon">⚙️</span>
      <span class="logo-text glow-text">CNC ERP</span>
    </div>

    <nav class="nav-menu">
      <button
        v-for="item in menuItems"
        :key="item.id"
        :class="['nav-item', { active: currentView === item.id }]"
        @click="$emit('navigate', item.id)"
      >
        <span class="nav-icon">{{ item.icon === 'home' ? '🏠' : item.icon === 'users' ? '👥' : item.icon === 'file-text' ? '📄' : item.icon === 'clipboard-list' ? '📋' : item.icon === 'scan' ? '📱' : item.icon === 'package' ? '📦' : item.icon === 'check-circle' ? '✅' : '📊' }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>

    <div class="sidebar-footer">
      <span class="version">v1.0 Demo</span>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 240px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px 24px;
  border-bottom: 1px solid #1e1e2e;
}

.logo-icon {
  font-size: 28px;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #00d4ff;
}

.nav-menu {
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #94a3b8;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.nav-item:hover {
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
}

.nav-item.active {
  background: linear-gradient(90deg, rgba(0, 212, 255, 0.2), rgba(168, 85, 247, 0.1));
  color: #00d4ff;
  border-left: 3px solid #00d4ff;
}

.nav-icon {
  font-size: 18px;
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid #1e1e2e;
  text-align: center;
}

.version {
  font-size: 12px;
  color: #475569;
}
</style>