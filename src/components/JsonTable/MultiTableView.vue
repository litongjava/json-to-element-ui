<template>
<div class="container">
  <div class="left-panel">
    <ul>
      <li
        v-for="(item, index) in tableNames"
        :key="index"
        @click="selectTab(item)"
        :class="{ active: currentTab === item }"
      >
        {{ item }}
      </li>
    </ul>
  </div>
  <div class="right-panel">
    <component
      :is="currentTab === item ? 'json-single-table-view' : ''"
      :config="tabConfigs[index]"
      v-for="(item, index) in tableNames"
      :key="index"
    />
  </div>
</div>
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
    selectTab(item) {
      this.currentTab = item;
    }
  }
};
</script>

<style scoped>
  .container {
    padding: 0;
    margin: 0;
    display: flex;
  }

  .left-panel {
    width: 200px;
    height: 100vh;
    overflow-y: scroll;
  }

  .left-panel ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .left-panel li {
    cursor: pointer;
    padding: 10px;
  }

  .left-panel li.active {
    background-color: lightgray;
  }

  .right-panel {
    flex: 1;
    padding: 0px;
  }
</style>
