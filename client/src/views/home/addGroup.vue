<template>
  <div>
    <el-dialog :visible.sync="newValue" width="620px" :close-on-click-modal="false" :title="templateData.id === undefined ? '新增推送设置' : '编辑推送设置'">
        <el-form ref="form" :model="templateData" label-width="100px" label-position="top" >
          <el-form-item :required="true" label="微信群名选择" >
             <el-select v-model="templateData.group_ids" value-key="chat_id" size="small" filterable multiple collapse-tags placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in options"
                  :key="item.chat_id"
                  :label="item.name"
                  :value="item">
                </el-option>
              </el-select>
          </el-form-item>
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
                   <!-- <el-time-select size="small"  style="width:100%"
                    v-model="templateData.task"
                    :picker-options="{
                       start: '00:00',
                        step: '00:30',
                        end: '23:30'
                    }"
                    placeholder="选择时间">
                  </el-time-select> -->
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
        group_ids: [
        ],
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
    this.getGroupChat()
  },
  methods: {
    getGroupChat () {
      let params = {
        page: '1',
        page_size: '1000'
      }
      this.apis.getGroupChat(params).then((res) => {
        if (res.code === 0) {
          res.data.data.forEach((item) => {
            let data = {
              name: item.name,
              chat_id: item.chat_id
            }
            this.options.push(data)
            // this.$set(this.options, 'wechat', data)
          })
          // this.options = res.data.data
        }
      }).catch((err) => {
        this.$message.warning(err.msg)
      })
    },
    getDetail () {
      this.templateData = {
        group_ids: [
        ],
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
      if (this.templateData.group_ids.length === 0) {
        this.$message.warning('请选择微信群名选择！')
        return
      }
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
          rules_type: 1,
          group_name: this.templateData.group_name,
          task: this.templateData.task,
          keywords: this.templateData.keywords,
          group_ids: JSON.stringify(this.templateData.group_ids)
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
          rules_type: 1,
          keywords: this.templateData.keywords,
          switch: this.templateData.switch,
          id: this.templateData.id,
          group_ids: JSON.stringify(this.templateData.group_ids)
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
          console.log(err)
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
