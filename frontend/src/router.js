import { createMemoryHistory, createRouter } from 'vue-router'
import PageOne from './components/PageOne.vue'
import PageTwo from './components/PageTwo.vue'

const routes = [
  { path: '/pageone', component: PageOne },
  { path: '/pagetwo', component: PageTwo },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

//export router;

