<template>
  <div>
    <el-form :model="phoneForm" status-icon :rules="phoneRules" ref="phoneForm" label-width="100px" class="demo-ruleForm3">
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model.number="phoneForm.telephone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="autoCode">
        <el-input v-model="phoneForm.autoCode" maxlength="4" autocomplete="off"> </el-input>
        <div class="codeBtn">
          <el-button :loading="codePlan" :disabled="codeHappen" @click="codeGet">{{ codeStatus }}</el-button>
        </div>
      </el-form-item>
      <slot name="backLogin"></slot>
      <el-button type="primary" style="width: 50%; display: block; margin: 5px auto" @click="submitPhoneForm('phoneForm')">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'phone-form',
  data() {
    return {
      codeStatus: '获取验证码',
      codePlan: false,
      codeHappen: false,
      count: 5,
      code: '', // 验证码
      time: '',
      phoneForm: {
        telephone: '',
        autoCode: ''
      }, // 手机登录
      userList: [],
      phoneRules: {
        telephone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^(1)\d{10}$/,
            message: '不是有效的手机号',
            trigger: 'blur'
          }
        ],
        autoCode: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      }
    }
  },
  deactivated() {
    this.$refs.phoneForm.clearValidate()
  },
  methods: {
    submitPhoneForm(formName) {
      this.userList = JSON.parse(sessionStorage.getItem('userList')) ? JSON.parse(sessionStorage.getItem('userList')) : []
      this.$refs[formName].validate(valid => {
        if (valid) {
          let isSuccessLogin = false
          this.userList.forEach(item => {
            if (this.phoneForm.telephone === item.telephone) {
              isSuccessLogin = true
              if (this.code === this.phoneForm.autoCode) {
                // this.$message.success('登录成功')
                this.apis
                  .getLogin(this.loginForm)
                  .then(res => {
                    if (res.code === 0) {
                      this.$message.success('编辑成功')
                      this.newValue = false
                      this.$emit('updatData')
                    } else if (res.code === -2) {
                      this.$message.warning(res.msg)
                    }
                  })
                  .catch(err => {
                    console.log(err)
                    this.$message.warning(err.msg)
                  })
                // this.$axios
                //   .post('/api/users/login', this.loginForm)
                //   .then(res => {
                //     // console.log(res.data);
                //     // 存储token到ls
                //     const { token } = res.data
                //     window.localStorage.setItem('jwtToken', token)

                //     // 解析token
                //     const decoded = jwt_decode(token)
                //     // console.log(decoded);

                //     // 分发action更改store的state
                //     // this.$store.dispatch('setIsAuthenticated', !this.isEmpty(decoded))
                //     // this.$store.dispatch('setUser', decoded)

                //     this.errors = {}
                //     // 页面跳转
                //     // this.$router.push('/dashboard')
                //   })
                //   .catch(err => {
                //     if (err.response.data) {
                //       this.errors = err.response.data
                //     }
                //   })
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
