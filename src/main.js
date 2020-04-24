import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' //引入状态管理 store
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 模拟数据
require('./mock/load');

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')