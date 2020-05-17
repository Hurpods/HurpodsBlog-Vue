import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/components/public/Home";
import Login from "@/components/public/Login";
import Register from "@/components/public/Register";
import Profile from "@/components/public/account/Profile";
import Update from "@/components/public/account/Update";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/account/:username',
                name: 'Profile',
                component: Profile,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/account/update/:username',
                name: 'Update',
                component: Update,
                meta: {
                    requireAuth: true
                }
            }
        ]
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
