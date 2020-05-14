import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from './router'
import store from './store'
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

// router.beforeEach((to, from, next) => {
//         if (to.meta.requireAuth) {
//             if (store.state.user) {
//                 axios.get('/auth').then(resp => {
//                     if(resp) next();
//                 });
//             } else {
//                 next({
//                     path: 'login',
//                     query: {redirect: to.fullPath}
//                 })
//             }
//         } else {
//             next()
//         }
//     }
// )

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
