<template>
<div>
  <el-col :span="1.5" v-if="config.toolBar.addButtonShow">
    <el-button
      type="primary"
      plain
      icon="el-icon-plus"
      size="mini"
      @click="handleAdd"
    >{{config.toolBar.addButtonName}}
    </el-button>
  </el-col>
  <el-col :span="1.5" v-if="config.toolBar.exportButtonShow">
    <el-button
      type="warning"
      plain
      icon="el-icon-download"
      size="mini"
      :loading="exportLoading"
      @click="handlePartialExport"
    >{{config.toolBar.exportButtonName}}
    </el-button>
  </el-col>
  <el-col :span="1.5" v-if="config.toolBar.exportAllButtonShow">
    <el-button
      type="warning"
      plain
      icon="el-icon-download"
      size="mini"
      :loading="exportLoading"
      @click="handleExportAll"
    >{{config.toolBar.exportAllButtonName}}
    </el-button>
  </el-col>
  <json-form :config="config" :showDialog="open" @closeDialog="closeDialog" title="title"
             @queryTable="$emit('queryTable')"/>
</div>
</template>

<script>
import {exportTableExcel, exportExcel} from "../JsonTable/tableToJson";

export default {
  name: "LeftToolBar",
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
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 导出遮罩层
      exportLoading: false,
    }
  },
  methods: {
    /** 新增按钮操作 */
    handleAdd() {
      this.open = true;
      this.title = 'Add ' + this.config.tableAlias
    },
    closeDialog() {
      this.open = false;
    },

    // 代码优化: 导出数据的方法抽象
    handleExport(isAll = false) {
      const params = isAll ? {} : this.queryParams;
      const confirmMessage = `Confirm whether to export ${isAll ? 'all' : 'current'} data items?`;
      const downloadFilename = `${this.config.tableName}${isAll ? '-all' : '-export'}.xlsx`;

      this.$modal.confirm(confirmMessage).then(() => {
        this.exportLoading = true;
        return isAll ? exportTableExcel(this.config.exportExcelUri, this.$request, this.config.tableName) :
          exportExcel(this.config.exportTableExcelUri, this.$request, params)
      }).then(response => {
        this.$download.excel(response.data, downloadFilename);
        this.exportLoading = false
      }).catch((e) => {
        console.log(e)
        this.$modal.msgError('Error:' + e);
        this.exportLoading = false
      })
    },
    /** 导出部分数据操作 */
    handlePartialExport() {
      this.handleExport(false)
    },

    /** 导出所有数据操作 */
    handleExportAll() {
      this.handleExport(true)
    },
  }
}
</script>

<style scoped>

</style>