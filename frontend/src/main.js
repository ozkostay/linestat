import { createApp } from 'vue'
import App from './App.vue'
import './style.css';

import { createMemoryHistory, createRouter } from 'vue-router'
import PageOne from './components/PageOne.vue'
import PageTwo from './components/PageTwo.vue'
import AppMain from './components/AppMain.vue'
// import AppMain from './components/AppMain.vue'

const routes = [
  { path: '/pageone', component: PageOne },
  { path: '/pagetwo', component: PageTwo },
  { path: '/', component: AppMain },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App)
.use(router)
.mount('#app')

