import { createMemoryHistory, createRouter } from 'vue-router'
import PageOne from './components/PageOne.vue'
import PageTwo from './components/PageTwo.vue'
import AppWork from '@/components/AppWork.vue'

const routes = [
  { path: '/pageone', component: PageOne },
  { path: '/pagetwo', component: PageTwo },
  { path: '/appwork', component: AppWork },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

//export router;

