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
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0}
        }
    }
})

export default router
