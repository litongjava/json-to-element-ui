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
      <el-col :span="1.5" v-show="config.toolBar.addButtonShow">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >{{config.toolBar.addButtonName}}
        </el-button>
      </el-col>
      <el-col :span="1.5" v-show="config.toolBar.exportButtonShow">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
        >{{config.toolBar.exportButtonName}}
        </el-button>
      </el-col>
      <el-col :span="1.5" v-show="config.toolBar.exportAllButtonShow">
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
      <right-toolbar :show-search.sync="config.query.show" @queryTable="getList"/>

      <el-dropdown>
          <span class="el-dropdown-link">
            <el-tooltip effect="dark" content="Show/Hide Search Item" placement="top">
              <el-button size="mini" icon="el-icon-menu"/>
            </el-tooltip>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-checkbox-group v-model="visibleSearchItems">
            <el-checkbox v-for="column in config.query.items" :key="column.key" :label="column.key"
                         :checked="column.show"
                         @change="toggleQueryItem(column.key)">
              {{ column.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown>
          <span class="el-dropdown-link">
            <el-tooltip effect="dark" content="Show/Hide Columns" placement="top">
              <el-button size="mini" icon="el-icon-circle-plus"/>
            </el-tooltip>

          </span>
        <el-dropdown-menu slot="dropdown">
          <el-checkbox-group v-model="visibleColumns">
            <el-checkbox v-for="column in config.table.items" :key="column.key" :label="column.key"
                         :checked="column.show"
                         @change="toggleColumn(column.key)">
              {{ column.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>
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
        <el-tooltip content="Copy">
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
    @pagination="getList"
  />

  <el-dialog :visible="contentDialogVisible" @close="contentDialogVisible = false" :title="contentDialogTitle">
    <span>{{ contentDialogContent }}</span>
  </el-dialog>
  <!-- 对话框(添加 / 修改) -->
  <el-dialog v-dialogDrag :title="title" :visible.sync="open" :width="config.form.width" append-to-body>
    <el-form ref="form" :model="form" :rules="rules" :label-width="config.form.labelWidth">

      <el-form-item v-for="(item, index) in config.form.items" :key="index" :label="item.name"
                    :prop="item.key" v-if="item.show">

        <el-input v-if="item.type === 'varchar'" v-model="form[item.key]"
                  :placeholder="item.placeholder"/>

        <el-date-picker v-else-if="item.type === 'date'" v-model="form[item.key]"
                        clearable :type="item.prop.type" :value-format="item.prop.valueFormat"
                        :placeholder="item.placeholder"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">{{config.form.button.confimButtonName}}</el-button>
      <el-button @click="cancel">{{config.form.button.cancelButtonName}}</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
import {
  createRecord,
  updateRecord,
  deleteRecord,
  getRecord,
  pageRecord,
  exportTableExcel, exportExcel
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
      // 导出遮罩层
      exportLoading: false,
      // 总条数
      total: 0,
      // 列表
      list: [],
      // 弹出层标题6
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        tableName: this.config.tableName,
        pageNo: 1,
        pageSize: 10,
      },
      // 表单参数
      form: {
        tableName: this.config.tableName,
      },
      // 表单校验
      rules: {},
      //显示的列
      visibleColumns: [],
      //显示的搜索列
      visibleSearchItems: [],
      //内容对话框
      contentDialogVisible: false,
      contentDialogContent: '',
      contentDialogTitle:'',
    }
  },
  created() {
    window.a = this;
    this.initializeQueryParams();
    this.getList()
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
    /** 查询列表 */
    getList() {
      this.loading = true;
      // 执行查询
      pageRecord(this.$request, this.queryParams).then(response => {
        this.list = response.data.data.list;
        this.total = response.data.data.total;
        this.loading = false
      })
    },
    toggleItem(items, key) {
      const item = items.find(item => item.key === key);
      if (item) item.show = !item.show;
    },
    toggleColumn(key) {
      this.toggleItem(this.config.table.items, key);
    },
    toggleQueryItem(key) {
      this.toggleItem(this.config.query.items, key);
    },
    /** 取消按钮 */
    cancel() {
      this.open = false;
      this.reset()
    },
    /** 表单重置 */
    reset() {
      this.form = {
        tableName: this.config.tableName,
      };
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm');
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = 'Add ' + this.config.tableAlias
    },
    /** 修改按钮操作 */
    async handleUpdate(row) {
      this.reset();
      const {data} = await getRecord(this.$request, this.config.tableName, row.id);
      this.form = {
        ...data.data,
        tableName: this.config.tableName,
      };
      this.open = true;
      this.title = 'Edit ' + this.config.tableAlias
    },
    /** 验证并提交表单 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const method = this.form.id ? updateRecord : createRecord;
          this.handleSubmit(method(this.$request, this.form), this.form.id ? 'Update' : 'Add')
        }
      })
    },

    async handleSubmit(promise, action) {
      const {data} = await promise;
      if (data.data) {
        this.$modal.msgSuccess(`${action} Successfully`);
        this.open = false;
        this.getList();
      } else {
        this.$modal.msgError(`${action} Failed`)
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm('Are you sure you want to delete this item?', 'Tip', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteRecord(this.$request, this.config.tableName, row.id).then(() => {
          this.getList();
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
    // 代码优化: 导出数据的方法抽象
    handleExport(isAll = false) {
      debugger;
      const params = isAll ? {} : this.queryParams;
      const confirmMessage = `Confirm whether to export ${isAll ? 'all' : 'current'} data items?`;
      const downloadFilename = `${this.config.tableName}${isAll ? '-all' : '-export'}.xlsx`;

      this.$modal.confirm(confirmMessage).then(() => {
        this.exportLoading = true;
        return isAll ? exportTableExcel(this.$request, this.config.tableName) : exportExcel(this.$request, params)
      }).then(response => {
        this.$download.excel(response.data, downloadFilename);
        this.exportLoading = false
      }).catch((e) => {
        console.log(e)
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
      this.contentDialogTitle=column.label;
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