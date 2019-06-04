import Vue from 'vue'
import VueRouter from 'vue-router';
import axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import App from './App'
import Routers from './router/index.js';
//highcharts的引入
import VueHighcharts from 'vue-highcharts';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(iView);
Vue.use(VueRouter);
Vue.use(VueHighcharts);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);


// /* eslint-disable no-new */
// new Vue({
//   components: { App },
//   router,
//   store,
//   template: '<App/>'
// }).$mount('#app')


new Vue({
    el: '#app',
    router: router,
    render: h => h(App),

});

