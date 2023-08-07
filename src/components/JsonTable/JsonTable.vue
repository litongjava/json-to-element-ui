<template>
<div>
  <!-- 列表 -->
  <el-table v-loading="loading" :data="list" @row-dblclick="showContentDialog" :row-style="{ height: '30px' }">
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
        <span v-else-if="item.type === 'bool'">{{ scope.row[item.key] }}</span>
        <span v-else>{{ scope.row[item.key] }}</span>
        <el-tooltip content="Copy"
                    v-if="isValueNotEmpty(scope.row[item.key]) && scope.row[item.key].length > 6">
          <el-button class="copy-button" v-clipboard:copy="scope.row[item.key]"
                     v-clipboard:success="onCopySuccess" v-clipboard:error="onCopyError"
                     icon="el-icon-document-copy" circle/>
        </el-tooltip>
      </div>
      </template>
    </el-table-column>

    <!-- 在所有其他列之后添加新的插槽 -->
    <slot name="extra-columns"></slot>

    <el-table-column label="Operation" :align="config.table.operation.align"
                     class-name="small-padding fixed-width"
                     v-if="config.table.operation.show" width="124">
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
    @pagination="$emit('queryTable')"
  />

  <el-dialog :visible="contentDialogVisible" @close="contentDialogVisible = false"
             :title="contentDialogTitle">
    <span>{{ contentDialogContent }}</span>
  </el-dialog>

  <json-form :config="config" :showDialog="open" @closeDialog="closeDialog" :form="form" :title="title"
             @queryTable="$emit('queryTable')"/>
</div>
</template>

<script>
import {deleteRecord, getRecord} from "./tableToJson";

export default {
  name: "JsonTable",
  props: {
    config: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    queryParams: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 设置为 true 以显示列，设置为 false 以隐藏列
      showIdColumn: false,
      //内容对话框
      contentDialogVisible: false,
      contentDialogContent: '',
      contentDialogTitle: '',
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 表单数据
      form: {}
    }
  },
  methods: {
    closeDialog() {
      this.open = false;
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.$emit('queryTable');
    },
    /** 修改按钮操作 */
    async handleUpdate(row) {
      const {data} = await getRecord(this.config.getUri, this.$request, this.config.f, row.id);
      this.form = {
        ...data.data,
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
        deleteRecord(this.config.deleteUri, this.$request, this.config.f, row.id).then(() => {
          this.$emit('queryTable');
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

    onCopySuccess(e) {
      // 复制成功
      this.$modal.msgSuccess('Copy Successf ully');
    },
    onCopyError(e) {
      // 复制失败
      this.$modal.msgError('Copy Failed:' + e);
    },
    showContentDialog(row, column) {
      this.contentDialogVisible = true;
      this.contentDialogTitle = column.label;
      this.contentDialogContent = row[column.property];
    },
    isValueNotEmpty(value) {
      return value !== null && value !== undefined && value !== "";
    },
  }
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
  fixed-width{
    display: flex;
    /*按钮之间平均分布*/
    justify-content: space-between;
  }
</style>