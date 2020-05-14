import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/components/public/Home";
import Login from "@/components/public/Login";
import Register from "@/components/public/Register";

Vue.use(VueRouter)

  const routes = [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
