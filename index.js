import RightToolbar from './src/components/toolbar/RightToolBar';
import LeftToolbar from './src/components/toolbar/LeftToolBar';
import Pagination from './src/components/Pagination/index';
import JsonQueryForm from './src/components/JsonTable/JsonQueryForm';
import JsonForm from './src/components/JsonTable/JsonForm';
import JsonTable from './src/components/JsonTable/JsonTable';
import JsonSingleTable from './src/components/JsonTable/SingleTable';
import JsonSingleTableView from './src/components/JsonTable/SingleTableView';
import JsonMultiTableView from './src/components/JsonTable/MultiTableView';

import directive from './src/directive';
import plugins from './src/plugins';
import {addBeginAndEndTime, divide, handleTree, parseTime, resetForm} from './src/utils/ruoyi';

export default {
  install(Vue) {
    Vue.component('RightToolbar', RightToolbar);
    Vue.component('LeftToolbar', LeftToolbar);
    Vue.component('Pagination', Pagination);
    Vue.component('JsonForm', JsonForm);
    Vue.component('JsonTable', JsonTable);
    Vue.component('JsonQueryForm', JsonQueryForm);
    Vue.component('JsonSingleTable', JsonSingleTable);
    Vue.component('JsonSingleTableView', JsonSingleTableView);
    Vue.component('JsonMultiTableView', JsonMultiTableView);

    // 使用指令和插件
    Vue.use(directive);
    Vue.use(plugins);

    // 添加方法到 Vue 原型
    Vue.prototype.parseTime = parseTime;
    Vue.prototype.resetForm = resetForm;
    Vue.prototype.handleTree = handleTree;
    Vue.prototype.addBeginAndEndTime = addBeginAndEndTime;
    Vue.prototype.divide = divide;
  }
};