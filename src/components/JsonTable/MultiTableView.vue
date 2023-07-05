<template>
<el-tabs tab-position="left" v-if="loaded" @tab-click="handleTabClick">
  <el-tab-pane v-for="(item, index) in tableNames" :key="index" :label="item">
    <component :is="currentTab === item ? 'json-single-table-view' : ''" :config="tabConfigs[index]"/>
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
    },
  },
  data() {
    return {
      tableNames: [],
      loaded: false,
      currentTab: 0,
      tabConfigs: [],
    };
  },
  created() {
    this.getTables();
  },
  methods: {
    getTables() {
      getTableNames(this.config.getTableNamesUri, this.$request)
        .then((response) => {
          this.tableNames = response.data.data;
          if (this.tableNames.length > 0) {
            this.currentTab = this.tableNames[0];
          }
          this.loaded = true;
          this.tabConfigs = this.tableNames.map((tableName) => ({
            tableName,
            lang: this.config.lang,
          }));
        })
        .catch((error) => {
          console.error("Failed to load table names:", error);
          this.loaded = false;
        });
    },
    handleTabClick(tab) {
      this.currentTab = tab.label;
    },
  },
};
</script>
