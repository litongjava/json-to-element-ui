<template>
<json-single-table v-if="loaded" :config="singleTableViewConfig"></json-single-table>
</template>

<script>
import { getTableConfig } from './tableToJson'

export default {
  name: "SingleTableView",
  props: {
    config: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      singleTableViewConfig: undefined,
      loaded: false // 添加一个加载状态的数据属性
    }
  },
  created() {
    this.getConfig();
  },
  methods: {
    getConfig() {
      getTableConfig(this.$request, this.config).then(response => {
        this.singleTableViewConfig = response.data.data;
      })
    },
  },
  watch: {
    // 当 singleTableViewConfig 的值改变的时候，我们改变 loaded 的状态
    singleTableViewConfig: {
      handler(newVal) {
        if (newVal) {
          this.loaded = true;
        }
      },
      immediate: false,
    },
  },
}
</script>

<style scoped>

</style>