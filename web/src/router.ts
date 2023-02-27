import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const router = createRouter({
  history: createWebHistory('/water/'),  // history 模式
  routes: [
    {
      path: '/',
      name: 'water',
      component: () => import('./views/water/index.vue'),
      meta: {
        title: '水印',
      },
    },
    {
      path: '/hello',
      name: 'hello',
      component: () => import('./views/hello.vue'),
      meta: {
        title: 'hello',
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
  console.log('afterEach', to);
});

export default router;
