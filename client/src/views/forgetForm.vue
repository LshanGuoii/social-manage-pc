<template>
  <div>
    <el-form :model="forgetForm" status-icon :rules="forgetRules" ref="forgetForm" label-width="100px" class="demo-ruleForm4">
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model.number="forgetForm.telephone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="autoCode">
        <el-input v-model="forgetForm.autoCode" maxlength="4" autocomplete="off"></el-input>
        <div class="codeBtn">
          <el-button :loading="codePlan" :disabled="codeHappen" @click="codeGet">{{ codeStatus }}</el-button>
        </div>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" show-password v-model="forgetForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input type="password" show-password v-model="forgetForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <slot name="backLogin"></slot>
      <el-button type="primary" style="width: 50%; display: block; margin: 5px auto" @click="submitForgetForm('forgetForm')">修改密码</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'forgetForm',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度至少为6个字符'))
      }
      if (value.length > 20) {
        callback(new Error('密码长度至多为20个字符'))
      }
      callback()
    }
    // 重置密码的校验
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.forgetForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      codeStatus: '获取验证码',
      codePlan: false,
      codeHappen: false,
      count: 5,
      time: '',
      code: '',
      forgetForm: {
        telephone: '',
        autoCode: '',
        password: '',
        checkPass: ''
      }, // 忘记
      forgetRules: {
        telephone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^(1)\d{10}$/,
            message: '不是有效的手机号',
            trigger: 'blur'
          }
        ],
        autoCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        // password: [{ validator: validatePass, trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass3, trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  deactivated() {
    this.$refs.forgetForm.clearValidate()
  },
  methods: {
    submitForgetForm(formName) {
      this.userList = JSON.parse(sessionStorage.getItem('userList')) ? JSON.parse(sessionStorage.getItem('userList')) : []
      this.$refs[formName].validate(valid => {
        if (valid) {
          let isSuccessLogin = false
          this.userList.forEach(item => {
            if (this.forgetForm.telephone === item.telephone) {
              isSuccessLogin = true
              if (this.code === this.forgetForm.autoCode) {
                item.password = this.forgetForm.password
                sessionStorage.setItem('userList', JSON.stringify(this.userList))
                this.$emit('login')
                this.$message.success('修改成功')
              } else {
                this.$message.warning('验证码不正确!')
              }
            }
          })
          if (!isSuccessLogin) {
            this.$message.warning('无此电话号码，请先注册!')
          }
        } else {
          return false
        }
      })
    },
    codeGet() {
      this.codePlan = true
      this.codeHappen = true
      setTimeout(() => {
        this.codePlan = false
        this.code = JSON.stringify(Math.round(Math.random() * 10000))
        this.$message.success('您的验证码为:' + this.code)
        this.time = setInterval(() => {
          if (this.count > 0) {
            this.codeStatus = '请在' + this.count + '秒后重新获取'
            this.count--
          } else {
            this.count = 5
            this.codeStatus = '获取验证码'
            this.codeHappen = false
            clearInterval(this.time)
          }
        }, 1000)
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.codeBtn {
  position: absolute;
  bottom: 0px;
  right: 1px;
  top: 0px;
  .el-button {
    border: none;
  }
}
</style>
