import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from './router'
import store from './vuex/store'
import qs from 'qs'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false

Vue.use(ElementUI);

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://localhost:8090'
axios.defaults.withCredentials = true
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

router.beforeEach((to, from, next) => {
        if (to.meta.requireAuth) {
            if (localStorage.getItem('userName')) {
                axios
                    .post('/auth/authTime', {}, {
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    })
                    .then(resp => {
                        if (resp.data.code === 1) {
                            next();
                        } else {
                            ElementUI.Message.error(resp.data.message);
                            store.commit('userStatus', null);
                            next({
                                path: '/login',
                                query: {redirect: to.fullPath}
                            })
                        }
                    })
                    .catch(r => {
                        ElementUI.Message.error(r);
                        store.commit('userStatus', null);
                        next({
                            path: '/login',
                            query: {redirect: to.fullPath}
                        })
                    })
            } else {
                next({
                    path: '/login',
                    query: {redirect: to.fullPath}
                })
            }
        } else {
            next()
        }
    }
)

Vue.prototype.myValidate = function defaultValidator(rule, value, callback, type) {
    this.$axios
        .post('/auth/validate',
            this.$qs.stringify({
                value: value,
                type: type
            })
        ).then(resp => {
        if (resp.data.code === 1) {
            callback();
        } else if (resp.data.code === 0) {
            callback(new Error(resp.data.message))
        }
    });
}

Vue.prototype.unescapeHtml = function unescapeHTML(a) {
    a = "" + a;
    return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
