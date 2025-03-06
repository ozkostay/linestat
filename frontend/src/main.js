import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import './style.css';

import { createMemoryHistory, createRouter } from 'vue-router'
import PageOne from './components/PageOne.vue'
import PageTwo from './components/PageTwo.vue'
import AppMain from './components/AppMain.vue'
import AppWork from './components/AppWork.vue';
// import AppMain from './components/AppMain.vue'

const routes = [
  { path: '/pageone', component: PageOne },
  { path: '/pagetwo', component: PageTwo },
  { path: '/appwork', component: AppWork },
  { path: '/', component: AppMain },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App)
.use(router)
.use(createPinia())
.mount('#app')

