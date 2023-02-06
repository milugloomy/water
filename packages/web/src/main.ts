import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia';
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.min.mjs';

const app = createApp(App);

app.component('ArrowDownBold', ElementPlusIconsVue['ArrowDownBold']);
app.component('ArrowUpBold', ElementPlusIconsVue['ArrowUpBold']);
app.component('CircleCloseFilled', ElementPlusIconsVue['CircleCloseFilled']);
app.component('CirclePlus', ElementPlusIconsVue['CirclePlus']);
app.component('Delete', ElementPlusIconsVue['Delete']);
app.component('Plus', ElementPlusIconsVue['Plus']);

app.use(createPinia()).use(ElementPlus, { locale: zhCn }).use(router).mount('#app');
