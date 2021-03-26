<template>
  <div>
    <el-dialog :visible.sync="newValue" width="620px" :close-on-click-modal="false" :title="templateData.id === undefined ? '新增推送设置' : '编辑推送设置'">
        <el-form ref="form" :model="templateData" label-width="100px" label-position="top" >
          <el-form-item :required="true" label="推送时间">
                    <el-time-picker size="small"  style="width:100%"
                    v-model="templateData.task"
                    format="HH:mm"
                    value-format="HH:mm"
                    :picker-options="{
                      selectableRange: '00:00:00 - 23:59:59'
                    }"
                    placeholder="选择时间">
                  </el-time-picker>
          </el-form-item>
           <el-form-item :required="true" label="钉钉群名">
             <el-input  v-model="templateData.group_name" size="small"  placeholder="请输入推送的钉钉群名"></el-input>
          </el-form-item>
          <el-form-item :required="true" label="Webhook">
            <el-input  v-model="templateData.webhook" size="small"  placeholder="请输入Webhook"></el-input>
          </el-form-item>
           <el-form-item :required="true" label="安全关键字">
            <el-input  v-model="templateData.keywords" size="small"  placeholder="请输入安全关键字"></el-input>
          </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="newValue = false" size="small">取 消</el-button>
            <el-button type="primary" @click="saveTemplate" size="small">确 定</el-button>
          </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    detail: {
      type: [String, Object],
      default: ''
    }
  },
  data () {
    return {
      templateData: {
        group_name: '',
        task: '',
        webhook: '',
        keywords: ''
      }, // 模板数据
      callCenterObject: {},
      btnDisabled: false,
      options: []
    }
  },
  computed: {
    newValue: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      }
    }
  },
  watch: {
    newValue: 'getDetail'
  },
  created () {
    this.corp_id = sessionStorage.getItem('corp_id')
    this.user_id = sessionStorage.getItem('user_id')
  },
  methods: {
    getDetail () {
      this.templateData = {
        group_name: '',
        task: '',
        webhook: '',
        keywords: ''
      }
      this.btnDisabled = false
      if (this.newValue && this.detail !== '') {
        this.templateData = JSON.parse(JSON.stringify(this.detail))
        console.log(this.templateData)
        this.btnDisabled = true
      }
    },
    saveTemplate () {
      console.log(this.templateData)
      if (this.templateData.task === '') {
        this.$message.warning('请选择推送时间！')
        return
      }
      if (this.templateData.group_name === '') {
        this.$message.warning('请填写推送的钉钉群名！')
        return
      }
      if (this.templateData.webhook === '') {
        this.$message.warning('请输入Webhook！')
        return
      }
      if (this.templateData.keywords === '') {
        this.$message.warning('请输入安全关键字！')
        return
      }
      if (this.detail === '') {
        let params = {
          corp_id: this.corp_id,
          user_id: this.user_id,
          webhook: this.templateData.webhook,
          rules_type: 2,
          group_name: this.templateData.group_name,
          task: this.templateData.task,
          keywords: this.templateData.keywords
        }
        this.apis.getRulesAdd(params).then((res) => {
          if (res.code === 0) {
            this.$message.success('绑定成功')
            this.newValue = false
            this.$emit('updatData')
          } else if (res.code === -2) {
            this.$message.warning(res.msg)
          }
        }).catch((err) => {
          this.$message.warning(err.msg)
        })
      } else {
        let params = {
          corp_id: this.corp_id,
          user_id: this.user_id,
          webhook: this.templateData.webhook,
          group_name: this.templateData.group_name,
          task: this.templateData.task,
          rules_type: 2,
          keywords: this.templateData.keywords,
          switch: this.templateData.switch,
          id: this.templateData.id
        }
        this.apis.getRulesModify(params).then((res) => {
          if (res.code === 0) {
            this.$message.success('编辑成功')
            this.newValue = false
            this.$emit('updatData')
          } else if (res.code === -2) {
            this.$message.warning(res.msg)
          }
        }).catch((err) => {
          this.$message.warning(err.msg)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
//   .user /deep/ .select{
//   height: 300px;
//   width: 300px;
//   background-color: #fff;
// }
</style>
