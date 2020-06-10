import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import("@/components/public/Login");
const Register = () => import("@/components/public/Register");

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("@/components/public/Home"),
        meta: {
            title: 'HurpodsBlog——成长的道路'
        },
        children: [
            {
                path: '/account/:username',
                name: 'Profile',
                component: () => import("@/components/public/account/Profile"),
                meta: {
                    requireAuth: true,
                    title: '个人中心'
                }
            },
            {
                path: '/account/update/:username',
                name: 'Update',
                component: () => import("@/components/public/account/Update"),
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
        component: () => import("@/components/admin/AdminIndex"),
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
            },
            {
                path: '/user/overview',
                name: 'UserOverview',
                component: () => import('@/components/admin/users/overview/Index'),
                meta: {
                    title: '用户概览'
                }
            },
            {
                path: '/user/manage',
                name: 'UserManage',
                component: () => import('@/components/admin/users/manage/Index'),
                meta: {
                    title: '用户管理'
                }
            },
            {
                path: '/user/permission',
                name: 'PermissionManage',
                component: () => import('@/components/admin/users/permission/Index'),
                meta: {
                    title: '权限管理'
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
