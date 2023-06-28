<template>
<el-tabs tab-position="left" v-if="loaded">
  <el-tab-pane v-for="(item,index) in tableNames" :key="index" :label="item">
    <json-single-table-view :config="{ tableName: item, lang: config.lang }"/>
  </el-tab-pane>
</el-tabs>
</template>

<script>
import {getTableNames} from "./tableToJson";

export default {
  name: "MultiTableView",
  props: {
    config: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      tableNames: [],
      loaded: false,
    };
  },
  created() {
    this.getTables();
  },
  methods: {
    getTables() {
      getTableNames(this.$request).then(response => {
        this.tableNames = response.data.data;
        this.loaded = true;
      }).catch(error => {
        console.error('Failed to load table names:', error);
        this.loaded = false;
      });
    },
  },
};
</script>
