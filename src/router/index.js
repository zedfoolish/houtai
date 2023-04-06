import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/teacher',
    name: 'teacher',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TeacherView.vue')
  },
  {
    path: '/exercise',
    name: 'exercise',
    component: () => import(/* webpackChunkName: "about" */ '../views/ExerciseView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView.vue')
  },
  {
    path: '/information',
    name: 'information',
    component: () => import(/* webpackChunkName: "about" */ '../views/InformationView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
  },
  {
    path: '/mycourse',
    name: 'mycourse',
    component: () => import(/* webpackChunkName: "about" */ '../views/MycourseView.vue')
  },
  {
    path: '/course',
    name: 'course',
    component: () => import(/* webpackChunkName: "about" */ '../views/CourseView.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
