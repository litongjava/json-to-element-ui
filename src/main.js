import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './plugins/element.js'
import request from "@/utils/request"
//名称是必须是request,JsonTable组件会使用request
Vue.prototype.$request = request;

// JsonTable start
import JsonToElmentUI from '../index';
Vue.use(JsonToElmentUI);
// JsonTable end
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  mounted() {
    window.vue = this
  },
}).$mount('#app');
