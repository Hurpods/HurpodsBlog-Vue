import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import("@/components/public/Login");
const Register = () => import("@/components/public/Register");

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("@/components/public/Home.vue"),
    },
    {
        path: '/index',
        name: 'NavMenuIndex',
        component: () => import("@/components/public/NavIndex"),
        children: [
            {
                path: '/account/:username',
                name: 'Profile',
                component: () => import("@/components/public/account/Profile"),
                meta: {
                    requireAuth: true,
                }
            },
            {
                path: '/account/update/:username',
                name: 'Update',
                component: () => import("@/components/public/account/Update"),
                meta: {
                    requireAuth: true,
                }
            },
            {
                path: '/content/reporter/:reporterId',
                name: 'Reporter',
                component: () => import('@/components/public/content/Reporter'),
            },
            {
                path: '/content/article/:articleId',
                name: 'Article',
                component: () => import('@/components/public/content/Article'),
            },
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
                path: '/content/reporters/write',
                name: 'WriteReport',
                component: () => import('@/components/admin/books/report/WriteReport'),
                meta: {
                    title: '攥写书评'
                }
            },
            {
                path: '/content/reporters/manage',
                name: 'ReporterManager',
                component: () => import('@/components/admin/books/report/Index'),
                meta: {
                    title: '书评管理'
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
            },
            {
                path:'/content/articles/write',
                name:'WriteArticle',
                component:()=>import('@/components/admin/article/WriteArticle'),
                meta:{
                    title:'攥写文章'
                }
            },
            {
                path: '/content/articles/manage',
                name: 'ReporterManager',
                component: () => import('@/components/admin/article/ArticleManager'),
                meta: {
                    title: '文章管理'
                }
            },
        ]
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
    routes
})

export default router
