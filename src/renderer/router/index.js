// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)

import Main from '../components/Main.vue';


const routers = [
    {
        path: '/',
        name: '/',
        meta: {
            title: '首页'
        },
        component: Main,
    },
    {
      path: '/devices',
      name: 'devices-page',
      component: require('@/components/DevicesPage.vue').default
    },
    {
      path: '/log',
      name: 'log-page',
      component: require('@/components/LogPage.vue').default
    },

  ];

export default routers;

//
// export default new Router({
//   routes: [
//     // {
//     //   path: '/',
//     //   name: 'landing-page',
//     //   component: require('@/components/LandingPage').default
//     // },
//
//     {
//       path: '/',
//       name: 'home-page',
//       component: require('@/components/HomePage').default
//     },
//     {
//       path: '*',
//       redirect: '/'
//     },
//     {
//       path: '/log',
//       name: 'log',
//       component: require('@/components/LogPage').default
//     },
//     // {
//     //     path: '/log/',
//     //     component: Main,
//     //     name: 'LOG日志',
//     //     meta: {
//     //         title: 'LOG日志'
//     //     },
//     //     children: [
//     //         { path: 'log', title: {i18n: 'log'}, name: 'log', component: resolve => { require(['@/components/LogPage'], resolve); } },
//     //     ]
//     // }
//   ]
// })


