<template>
  <div>
    <el-form :model="queryParams" ref="queryForm" :inline="true" size="small" v-show="config.query.show"
             class="query-form">
      <template v-for="(item, index) in visibleItems">
        <el-form-item :key="index" :label="item.name" :prop="item.key" v-show="item.show">
          <el-input v-if="item.type === 'varchar'" v-model="queryParams[item.key]"
                    :placeholder="item.placeholder" clearable @keyup.enter.native="handleQuery"/>
          <el-input v-if="item.type === 'int'" v-model="queryParams[item.key]"
                    :placeholder="item.placeholder" clearable @keyup.enter.native="handleQuery"/>
          <el-input v-if="item.type === 'long'" v-model="queryParams[item.key]"
                    :placeholder="item.placeholder" clearable @keyup.enter.native="handleQuery"/>
          <el-input v-else-if="item.type === 'bool'" v-model="queryParams[item.key]"
                    :placeholder="item.placeholder" clearable @keyup.enter.native="handleQuery"/>
          <el-date-picker v-else-if="item.type === 'date'"
                          v-model="queryParams[item.key]"
                          :value-format="item.prop.valueFormat" :type="item.prop.type"
                          :range-separator="item.prop.rangeSeparator"
                          :start-placeholder="item.prop.startPlaceholder"
                          :end-placeholder="item.prop.endPlaceholder"
                          :default-time="item.prop.defaultTime"
          />
        </el-form-item>
      </template>
      <el-form-item class="form-buttons">
        <el-button type="text" @click="toggleCollapse">
          {{ isCollapsed ? 'Expand' : 'Collapse' }}
          <i :class="isCollapsed ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
        </el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery">{{ config.query.button.resetButtonName }}</el-button>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery">
          {{ config.query.button.queryButtonName }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "JsonQueryForm",
  props: {
    config: {
      type: Object,
      required: true,
    },
    queryParams: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isCollapsed: true,
    };
  },
  computed: {
    visibleItems() {
      const visibleItems = this.config.query.items.filter(item => item.show);
      if (this.isCollapsed) {
        // 控制显示的项目数量，可以根据需要调整显示的数量
        return visibleItems.slice(0, 5);
      } else {
        return visibleItems;
      }
    },
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.$emit('queryTable');
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm');
      this.handleQuery();
    },
  }
}
</script>

<style scoped>
.query-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.el-form-item {
  flex: 1 1 auto;
}

.form-buttons {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  margin-left: auto;
}

.el-button {
  border-radius: 8px;
}

.el-form-item:last-child {
  margin-left: auto;
}
</style>
