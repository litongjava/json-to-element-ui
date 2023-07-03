<template>
<div class="top-right-btn" :style="style">
  <el-col>
    <el-tooltip v-if="search" class="item" effect="dark" :content="showSearch ? 'Hide Search' : 'Show Search'"
                placement="top">
      <el-button size="mini" icon="el-icon-search" @click="toggleSearch()"/>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="refresh" placement="top">
      <el-button size="mini" icon="el-icon-refresh" @click="refresh()"/>
    </el-tooltip>
    <el-tooltip v-if="columns" class="item" effect="dark" content="Hide Column" placement="top">
      <el-button size="mini" icon="el-icon-menu" @click="showColumn()"/>
    </el-tooltip>

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
  </el-col>

  <el-dialog :title="title" :visible.sync="open" append-to-body>
    <el-transfer
      v-model="value"
      :titles="['Show', 'Hide']"
      :data="columns"
      @change="dataChange"
    />
  </el-dialog>

</div>
</template>
<script>
export default {
  name: 'RightToolbar',
  props: {
    config:{
      type:Object,
      required: true,
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    columns: {
      type: Array
    },
    search: {
      type: Boolean,
      default: true
    },
    gutter: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      // 显隐数据
      value: [],
      // 弹出层标题
      title: 'Show/Hide',
      // 是否显示弹出层
      open: false,
      //显示的列
      visibleColumns: [],
      //显示的搜索列
      visibleSearchItems: [],
    }
  },
  computed: {
    style() {
      const ret = {}
      if (this.gutter) {
        ret.marginRight = `${this.gutter / 2}px`
      }
      return ret
    }
  },
  created() {
    // 显隐列初始默认隐藏列
    for (const item in this.columns) {
      if (this.columns[item].visible === false) {
        this.value.push(parseInt(item))
      }
    }
  },
  methods: {
    // 搜索
    toggleSearch() {
      this.$emit('update:showSearch', !this.showSearch)
    },
    // 刷新
    refresh() {
      this.$emit('queryTable')
    },
    // 右侧列表元素变化
    dataChange(data) {
      for (const item in this.columns) {
        const key = this.columns[item].key
        this.columns[item].visible = !data.includes(key)
      }
    },
    // 打开显隐列dialog
    showColumn() {
      this.open = true
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

  }
}
</script>
