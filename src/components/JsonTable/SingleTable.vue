<template>
<div class="app-container">
  <!-- 搜索工作栏 -->
  <el-form :model="queryParams" ref="queryForm" :inline="true" size="small" v-show="config.query.show">
    <el-form-item v-for="(item, index) in config.query.items" :key="index" :label="item.name"
                  :prop="item.key" v-show="item.show">

      <el-input v-if="item.type === 'varchar'" v-model="queryParams[item.key]"
                :placeholder="item.placeholder" clearable @keyup.enter.native="handleQuery"/>

      <el-date-picker v-else-if="item.type === 'date'" v-model="queryParams[item.key]"
                      style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                      :range-separator="item.prop.rangeSeparator"
                      :start-placeholder="item.prop.startPlaceholder"
                      :end-placeholder="item.prop.endPlaceholder"
                      :default-time="item.prop.defaultTime"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="handleQuery">
        {{config.query.button.queryButtonName}}
      </el-button>
      <el-button icon="el-icon-refresh" @click="resetQuery">{{config.query.button.resetButtonName}}
      </el-button>
    </el-form-item>
  </el-form>
  <!-- 操作工具栏 -->
  <div v-show="config.toolBar.show">
    <el-row :gutter="10" class="mb8" style="display: flex">
      <left-toolbar :config="config" :queryParams="queryParams" @queryTable="page"/>
      <right-toolbar :show-search.sync="config.query.show" :config="config" @queryTable="page"/>
    </el-row>
  </div>

  <!-- 列表 -->
  <el-table v-loading="loading" :data="list" @row-dblclick="showContentDialog">
    <el-table-column align="center" type="selection" width="50" v-if="config.table.selectionShow"/>
    <el-table-column label="No." prop="num" align="center" width="100" v-if="config.table.numberShow">
      <template slot-scope="row">
      <span>{{ row.$index+1 }}</span>
      </template>
    </el-table-column>

    <el-table-column
      v-for="(item, index) in config.table.items"
      :key="index"
      :label="item.name"
      :prop="item.key"
      :align="item.align"
      :height="item.height"
      v-if="item.show"
      show-overflow-tooltip
    >
      <template v-slot="scope">
      <div class="cell-content">
        <span v-if="item.type === 'date'">{{ parseTime(scope.row[item.key]) }}</span>
        <span v-else>{{ scope.row[item.key] }}</span>
        <el-tooltip content="Copy"
                    v-if="isValueNotEmpty(scope.row[item.key]) && scope.row[item.key].length > 6">
          <el-button class="copy-button" @click="copyToClipboard(scope.row[item.key])"
                     icon="el-icon-document-copy" circle></el-button>
        </el-tooltip>
      </div>
      </template>
    </el-table-column>

    <el-table-column label="Operation" :align="config.table.operation.align"
                     class-name="small-padding fixed-width"
                     v-if="config.table.operation.show">
      <template v-slot="scope">
      <el-button
        size="mini"
        type="text"
        icon="el-icon-edit"
        @click="handleUpdate(scope.row)"
        v-show="config.table.operation.updateButtonShow"
      >{{config.table.operation.updateButtonName}}
      </el-button>
      <el-button
        size="mini"
        type="text"
        icon="el-icon-delete"
        @click="handleDelete(scope.row)"
        v-show="config.table.operation.deleteButtonShow"
      >{{config.table.operation.deleteButtonName}}
      </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页组件 -->
  <pagination
    v-show="total > 0"
    :total="total"
    :page.sync="queryParams.pageNo"
    :limit.sync="queryParams.pageSize"
    @pagination="page"
  />

  <el-dialog :visible="contentDialogVisible" @close="contentDialogVisible = false"
             :title="contentDialogTitle">
    <span>{{ contentDialogContent }}</span>
  </el-dialog>

</div>
</template>
<script>
import {
  deleteRecord,
  getRecord,
  pageRecord,
} from './tableToJson'

export default {
  name: 'JsonTable',
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 设置为 true 以显示列，设置为 false 以隐藏列
      showIdColumn: false,
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 列表
      list: [],
      // 查询参数
      queryParams: {
        tableName: this.config.tableName,
        pageNo: 1,
        pageSize: 10,
      },
      //内容对话框
      contentDialogVisible: false,
      contentDialogContent: '',
      contentDialogTitle: '',
    }
  },
  created() {
    window.a = this;
    this.initializeQueryParams();
    this.page()
  },
  methods: {
    initializeQueryParams() {
      this.config.query.items.forEach(item => {
        this.$set(this.queryParams, item.key, null);
      });
      this.queryParams = {
        ...this.queryParams,
        ...this.config.query.operator
      };
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.page()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm');
      this.handleQuery()
    },

    isValueNotEmpty(value) {
      return value !== null && value !== undefined && value !== "";
    },
    /** 分页 */
    page() {
      this.loading = true;
      // 执行查询
      pageRecord(this.config.pageUri, this.$request, this.queryParams).then(response => {
        this.list = response.data.data.list;
        this.total = response.data.data.total;
        this.loading = false
      })
    },
    /** 修改按钮操作 */
    async handleUpdate(row) {
      this.reset();
      const {data} = await getRecord(this.config.getUri, this.$request, this.config.tableName, row.id);
      this.form = {
        ...data.data,
        tableName: this.config.tableName,
      };
      this.open = true;
      this.title = 'Edit ' + this.config.tableAlias
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm('Are you sure you want to delete this item?', 'Tip', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteRecord(this.config.deleteUri, this.$request, this.config.tableName, row.id).then(() => {
          this.page();
          this.$message({
            type: 'success',
            message: 'Delete successful!'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete cancelled'
        });
      });
    },

    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        // 复制成功
        this.$modal.msgSuccess('Copy Successfully');
      }).catch((e) => {
        // 复制失败
        this.$modal.msgError('Copy Failed:' + e);
      });
    },
    showContentDialog(row, column) {
      this.contentDialogVisible = true;
      this.contentDialogTitle = column.label;
      this.contentDialogContent = row[column.property];
      // console.log(row)--> 所在列的数据
      // console.log(column) // 所在行的描述
    },
  },
}
</script>
<style scoped>
  .cell-content {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .el-table .cell .copy-button {
    position: absolute;
    visibility: hidden;
    top: 50%;
    right: -10%; /* Change this line */
    transform: translateY(-50%);
  }

  .el-table .cell:hover .copy-button {
    visibility: visible;
  }
</style>