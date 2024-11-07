<template>
<div class="single-table-container">
  <!-- 搜索工作栏 -->
  <json-query-form :config="config" :queryParams.sync="queryParams" @queryTable="page"/>
  <!-- 操作工具栏 -->
  <div v-show="config.toolBar.show">
    <el-row :gutter="10" class="mb8" style="display: flex">
      <left-toolbar :config="config" :queryParams="queryParams" @queryTable="page"/>
      <right-toolbar :show-search.sync="config.query.show" :config="config" @queryTable="page"/>
    </el-row>
  </div>
  <json-table :config="config" :loading.sync="loading" :total.sync="total" :list.sync="list"
              :queryParams="queryParams"
              @queryTable="page">
    <template v-slot:extra-columns>
    <slot name="extra-columns"/>
    </template>
  </json-table>
</div>
</template>
<script>
import {
  deleteRecord,
  getRecord,
  pageRecord,
} from './TableApi'

export default {
  name: 'SingleTable',
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 列表
      list: [],
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 10,
      },
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
  },
}
</script>
