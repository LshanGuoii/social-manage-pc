<template>
  <div>
    <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px" class="demo-ruleForm1">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <slot name="loginForm"></slot>
      <el-button type="primary" style="width: 50%; display: block; margin: 5px auto" @click="submitLoginForm('loginForm')">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login-form',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      }, // 登录
      userList: [],
      loginRules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        // password: [{ required: true, validator: validatePass, trigger: 'blur' }]
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    // value: {
    //   type: Object,
    //   default: () => {}
    // }
  },
  created() {},
  deactivated() {
    this.$refs.loginForm.clearValidate()
  },
  methods: {
    submitLoginForm(formName) {
      let params = {
        email: '1215405694@qq.com',
        password: '13548795460'
      }
      this.apis
        .getLogin(params)
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
      // this.userList = JSON.parse(sessionStorage.getItem('userList')) ? JSON.parse(sessionStorage.getItem('userList')) : []
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     // this.userList = JSON.parse(sessionStorage.getItem('userList'))
      //     let isSuccessLogin = false
      //     console.log(this.userList)
      //     this.userList.forEach(item => {
      //       if (this.loginForm.username === item.username && this.loginForm.password === item.password) {
      //         isSuccessLogin = true

      //         this.$message.success('登录成功')
      //       }
      //     })
      //     if (!isSuccessLogin) {
      //       this.$message.warning('账号或密码错误')
      //     }
      //   } else {
      //     return false
      //   }
      // })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  .login-content {
    height: 400px;
    width: 600px;
    border: #f2f2f2 solid 1px;
    padding: 10px;
    .form-title {
      padding-left: 30px !important;
      padding: 5px 0;
      border-bottom: #f2f2f2 solid 1px;
    }
    .linkList {
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      color: #4284d4;
      margin-bottom: 10px;
      div {
        cursor: pointer;
      }
    }
  }
}
</style>
