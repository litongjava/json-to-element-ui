import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './plugins/element.js'

// JsonTable start
import RightToolbar from '@/components/RightToolbar'
import Pagination from "@/components/Pagination";
import JsonSingleTable from "@/components/JsonTable/SingleTable";
import JsonSingleTableView from "@/components/JsonTable/SingleTableView";
import JsonMultiTableView from "@/components/JsonTable/MultiTableView";

Vue.component('RightToolbar', RightToolbar);
Vue.component('Pagination', Pagination);
Vue.component('json-single-table', JsonSingleTable);
Vue.component('json-single-table-view', JsonSingleTableView);
Vue.component('json-multi-table-view', JsonMultiTableView);

import directive from './directive' // directive
Vue.use(directive);

import plugins from './plugins' // plugins
Vue.use(plugins);

import {parseTime, resetForm, handleTree, addBeginAndEndTime, divide} from '@/utils/ruoyi'

Vue.prototype.parseTime = parseTime;
Vue.prototype.resetForm = resetForm;
Vue.prototype.handleTree = handleTree;
Vue.prototype.addBeginAndEndTime = addBeginAndEndTime;
Vue.prototype.divide = divide;

import request from "@/utils/request"
//名称是必须是request,JsonTable组件会使用request
Vue.prototype.$request = request;
// JsonTable end
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  mounted() {
    window.vue = this
  },
}).$mount('#app');
