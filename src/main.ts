import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base.scss'
import './lib/swiper/swiper.scss'
import './utils/rem'
createApp(App).use(store).use(router).mount('#app')
