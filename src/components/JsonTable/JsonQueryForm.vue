<template>
<el-form :model="queryParams" ref="queryForm" :inline="true" size="small" v-show="config.query.show">
  <el-form-item v-for="(item, index) in config.query.items" :key="index" :label="item.name"
                :prop="item.key" v-show="item.show">

    <el-input v-if="item.type === 'varchar'" v-model="queryParams[item.key]"
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
  <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="handleQuery">
      {{config.query.button.queryButtonName}}
    </el-button>
    <el-button icon="el-icon-refresh" @click="resetQuery">{{config.query.button.resetButtonName}}
    </el-button>
  </el-form-item>
</el-form>
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
  methods:{
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.$emit('queryTable');
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm');
      this.handleQuery()
    },
  }
}
</script>

<style scoped>

</style>