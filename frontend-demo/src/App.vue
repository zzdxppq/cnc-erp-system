<script setup lang="ts">
import { ref, computed } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Dashboard from './views/Dashboard.vue'
import CustomerView from './views/CustomerView.vue'
import QuotationView from './views/QuotationView.vue'
import WorkshopView from './views/WorkshopView.vue'
import OrderView from './views/OrderView.vue'

const currentView = ref('dashboard')
const isLoggedIn = ref(false)
const userName = ref('')

const views: Record<string, any> = {
  dashboard: Dashboard,
  customer: CustomerView,
  quotation: QuotationView,
  workshop: WorkshopView,
  order: OrderView
}

const currentComponent = computed(() => views[currentView.value] || Dashboard)

const handleLogin = (name: string) => {
  isLoggedIn.value = true
  userName.value = name
}

const handleNavigate = (view: string) => {
  currentView.value = view
}
</script>

<template>
  <div class="app-container">
    <!-- Login Page -->
    <div v-if="!isLoggedIn" class="login-page">
      <div class="login-card glass-card glow-border">
        <div class="login-header">
          <h1 class="glow-text">CNC ERP</h1>
          <p>智能制造 · 未来工厂</p>
        </div>
        <form @submit.prevent="handleLogin(userName)" class="login-form">
          <input
            v-model="userName"
            type="text"
            placeholder="请输入用户名"
            class="neon-input"
            required
          />
          <input
            type="password"
            placeholder="请输入密码"
            class="neon-input"
          />
          <button type="submit" class="neon-button">登 录</button>
        </form>
      </div>
    </div>

    <!-- Main App -->
    <template v-else>
      <Sidebar :currentView="currentView" @navigate="handleNavigate" />
      <main class="main-content">
        <component :is="currentComponent" :userName="userName" />
      </main>
    </template>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%);
}

.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #13131a 100%);
}

.login-card {
  width: 400px;
  padding: 48px;
  text-align: center;
}

.login-header h1 {
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(135deg, #00d4ff, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.login-header p {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 32px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.neon-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(30, 30, 46, 0.8);
  border: 1px solid #1e1e2e;
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
}

.neon-input:focus {
  border-color: #00d4ff;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
}

.neon-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #00d4ff, #a855f7);
  border: none;
  border-radius: 8px;
  color: #0a0a0f;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.neon-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
}

.main-content {
  flex: 1;
  margin-left: 240px;
  padding: 24px;
  overflow-y: auto;
}
</style>