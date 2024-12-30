import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Pour la page d'accueil
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    // Pour les pages qui concernent les plantes
    {
      path: '/plants',
      name: 'plants',
      component: () => import('../views/PlantsView.vue')
    },
    {
      path: '/plants/:id',
      name: 'plant-details',
      component: () => import('../views/PlantDetailsView.vue')
    },
    {
      path: '/plants/add',
      name: 'add-plant',
      component: () => import('../views/AddPlantView.vue')
    },
    {
      path: '/plants/edit/:id',
      name: 'edit-plant',
      component: () => import('../views/EditPlantView.vue')
    },
    // Pour la page contact
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    }
  ]
})

export default router
