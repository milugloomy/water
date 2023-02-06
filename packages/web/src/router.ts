import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const router = createRouter({
  history: createWebHistory(),  // history 模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: defineAsyncComponent(() => import('./views/hello.vue')),
      meta: {
        title: '首页',
      },
    },
    {
      path: '/water',
      name: 'water',
      component: defineAsyncComponent(() => import('./views/water/index.vue')),
      meta: {
        title: '列表页',
      },
    },
    {
      path: '/*',
      redirect: '/',
    },
  ],
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title}`;
  }
  next();
});

router.afterEach((to, from) => {
  console.log('afterEach');
});

export default router;
