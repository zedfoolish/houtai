import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children:[
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
  },
  

]

const router = new VueRouter({
  routes,
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


// 路由导航守卫
router.beforeEach((to, from, next) => {
    // 判断是否为其他页面
    if (to.path === "/") return next();
    // 获取token
    // let data= window.sessionStorage.getItem("token");
     let data =JSON.parse(localStorage.getItem('pass'))
    if (!data) return next('/');
    next()

})

export default router
