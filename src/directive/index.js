import dialogDrag from './dialog/drag'
import dialogDragWidth from './dialog/dragWidth'
import dialogDragHeight from './dialog/dragHeight'
import clipboard from './module/clipboard'

// Vue：自定义指令：https://v2.cn.vuejs.org/v2/guide/custom-directive.html
const install = function (Vue) {
  Vue.directive('clipboard', clipboard);
  Vue.directive('dialogDrag', dialogDrag);
  Vue.directive('dialogDragWidth', dialogDragWidth);
  Vue.directive('dialogDragHeight', dialogDragHeight)
};
export default install
