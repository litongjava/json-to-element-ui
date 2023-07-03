<template>
<div>
  <!-- 对话框(添加 / 修改) -->
  <el-dialog v-dialogDrag :title="title" :visible="showDialog" :width="config.form.width"
             :before-close="cancel" append-to-body>
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
import {createRecord, updateRecord} from "./tableToJson";

export default {
  name: "JsonForm",
  props: {
    config: {
      type: Object,
      required: true,
    },
    showDialog: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      // 表单参数
      form: {
        tableName: this.config.tableName,
      },
      // 表单校验
      rules: {},
    }
  },
  methods: {
    /** 验证并提交表单 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const method = this.form.id ? updateRecord : createRecord;
          const uri = this.form.id ? this.config.updateUri : this.config.createUri;
          this.handleSubmit(method(uri, this.$request, this.form), this.form.id ? 'Update' : 'Add')
        }
      })
    },

    async handleSubmit(promise, action) {
      const {data} = await promise;
      if (data.data) {
        this.$modal.msgSuccess(`${action} Successfully`);
        this.$emit("closeDialog");
        this.queryTable();
      } else {
        this.$modal.msgError(`${action} Failed`)
      }
    },
    /** 取消按钮 */
    cancel() {
      this.closeDialog();
      this.reset()
    },
    /** 表单重置 */
    reset() {
      this.form = {
        tableName: this.config.tableName,
      };
      this.resetForm('form')
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    queryTable() {
      this.$emit('queryTable')
    }

  }
}
</script>

<style scoped>

</style>