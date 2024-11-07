<template>
<div class="multi-table-container">
  <div class="left-panel" v-if="loaded">
    <ul>
      <li
        v-for="(item, index) in tabConfigs"
        :key="index"
        @click="addTab(index,item.f)"
        :class="{ active: tabIndex === index }"
      >
        {{item.f }}
      </li>
    </ul>
  </div>
  <div class="right-panel">
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <json-single-table-view :config="tabConfigs[tabIndex]"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import {getFNames} from "./TableApi";

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
      editableTabsValue: undefined,
      editableTabs: [],

      loaded: false,
      tabConfigs: [],
      tabIndex: 0
    };
  },
  created() {
    this.getTables();
  },
  methods: {
    getTables() {
      getFNames(this.config.getFNamesUri, this.$request)
        .then((response) => {
          this.fNames = response.data.data;
          if (this.fNames.length > 0) {
            this.currentTab = this.fNames[0];
          }
          let mapFunc = (f) => ({
            f,
            lang: this.config.lang,
          });
          this.tabConfigs = this.fNames.map(mapFunc);
          this.loaded = true;
        })
        .catch((error) => {
          console.error("Failed to load table names:", error);
          this.loaded = false;
        });
    },
    addTab(index, f) {
      this.tabIndex = index;
      let newTabName = index + '';
      let existingTab = this.editableTabs.find(tab => tab.name === newTabName);
      if (existingTab) {
        // If the tab already exists, switch to it
        this.editableTabsValue = newTabName;
      } else {
        // If the tab does not exist, add it
        this.editableTabs.push({
          title: f,
          name: newTabName,
        });
        this.editableTabsValue = newTabName;
      }
    },

    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
};
</script>

<style scoped>
  .multi-table-container {
    padding: 0;
    margin: 0;
    display: flex;
  }

  .left-panel {
    width: 200px;
    height: 100vh;
    flex: 2;
    overflow-y: auto; /* 添加这一行 */
  }

  .left-panel ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .left-panel li {
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid gray;
  }

  .left-panel li.active {
    background-color: lightgray;
  }

  .right-panel {
    width: 90vh;
    height: 70vh;
    flex: 10;
    padding: 0px;
  }
</style>
