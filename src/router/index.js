import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import( "@/components/public/Home");
const Login = () => import("@/components/public/Login");
const Register = () => import("@/components/public/Register");
const Profile = () => import("@/components/public/account/Profile");
const Update = () => import("@/components/public/account/Update");
const AdminIndex = () => import("@/components/admin/AdminIndex");

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'HurpodsBlog——成长的道路'
        },
        children: [
            {
                path: '/account/:username',
                name: 'Profile',
                component: Profile,
                meta: {
                    requireAuth: true,
                    title: '个人中心'
                }
            },
            {
                path: '/account/update/:username',
                name: 'Update',
                component: Update,
                meta: {
                    requireAuth: true,
                    title: '修改资料'
                }
            }
        ]
    },
    {
        path: '/backstage',
        name: 'AdminIndex',
        component: AdminIndex,
        meta: {
            title: 'HurpodsBlog后台',
            requireAuthAdmin: true,
        },
        children: [
            {
                path: '/content/books/overview',
                name: 'Index',
                component: () => import('@/components/admin/books/overview/Index'),
                meta: {
                    title: '书籍概览'
                }
            },
            {
                path: '/content/books/write',
                name: 'WriteReport',
                component: () => import('@/components/admin/books/report/WriteReport'),
                meta: {
                    title: '攥写读后感'
                }
            }
        ]
    },
    {
        path: '/reporter',
        name: 'Reporter',
        component: () => import('@/components/public/content/Reporter'),
        meta: {
            title: '读后感'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            title: '注册'
        }
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
