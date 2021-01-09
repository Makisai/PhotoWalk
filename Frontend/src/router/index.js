import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const guard = (to,from,next) => {
  Vue.axios.get('/users/is_logged_in', {headers: {
      'Authorization': `Bearer ${store.state.user.token}`
    }})
      .then(()=>{
        next();
      })
      .catch(()=>{
        if(from !== '/') {
          next('/');
        }
      })
}

const routes = [
  
  {
    path: '/',
    name: 'LandingPage',
    //macht Lazy loading der Seite, sodass sie nicht immer geladen werden muss
    component: () => import('../views/LandingPage.vue')
  },
  {
    path: '/page',
    name: 'PageLayout',
    component: () => import( '../views/PageLayout.vue'),
    beforeEnter: guard,
    //nested routing - hier ein Array wie oben const routes
    children: [
      {
        path: 'start',
        name: 'Start',
        component: () => import('../views/Start.vue')
      },
      {
        path: 'overview',
        name: 'WalksOverview',
        component: () => import('../views/WalksOverview.vue')
      },
      {
        path: 'detail',
        name: 'WalksDetail',
        component: () => import('../views/WalksDetail.vue')
      },
      {
        path: 'photos',
        name: 'MyPhotos',
        component: () => import('../views/MyPhotos.vue')
      },
      {
        path: 'friends',
        name: 'MyFriends',
        component: () => import('../views/MyFriends.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/Settings.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
