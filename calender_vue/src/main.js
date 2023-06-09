import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入全局的css样式和js工具函数
import '@/assets/css/resets.css';
import '@/assets/css/border.css';
import '@/assets/js/common.js'

createApp(App).use(store).use(router).mount('#app')
