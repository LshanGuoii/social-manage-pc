<template>
  <div class="login">
    <div class="login-content">
      <h3 class="form-title">{{ title }}</h3>
      <!-- 动态组件思路 -->
      <div>
        <keep-alive>
          <component :is="currentTabComponent" @login="login">
            <template #loginForm>
              <div class="linkList">
                <div @click="loginPhone">验证码登录</div>
                <div @click="register">注册账号</div>
                <div @click="forget">忘记密码</div>
                <!-- <div @click="reset">重置密码</div> -->
              </div>
            </template>
            <template #backLogin >
              <div class="linkList">
                <div @click="login()">账号登录</div>
              </div>
            </template>
            <!-- <template #registerForm>
              <div class="linkList">
                <div @click="login()">账号登录</div>
              </div>
            </template>
            <template #phoneForm>
              <div class="linkList">
                <div @click="login()">账号登录</div>
              </div>
            </template>
            <template #forgetForm>
              <div class="linkList">
                <div @click="login()">账号登录</div>
              </div>
            </template> -->
          </component>
        </keep-alive>
      </div>
      <!-- <div>
        <ls-form :type="type" :data-form="dataForm"></ls-form>
        <div class="linkList">
              <div @click="loginPhone">验证码登录</div>
              <div @click="register">注册账号</div>
              <div @click="forget">忘记密码</div>
              <div @click="reset">重置密码</div>
            </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import PhoneForm from './phoneForm'
import ForgetForm from './forgetForm'
// import LsForm from './ls-form'
export default {
  name: 'login',
  components: {
    LoginForm,
    RegisterForm,
    PhoneForm,
    ForgetForm
    // LsForm
  },
  data() {
    return {
      title: '登录账号',
      type: 'login', // 登录 login  注册 register 忘记密码 forget 手机号登录 phone 重置 reset
      // currentType: ['login-form', 'register-form'],
      dataForm: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    currentTabComponent() {
      return this.type + '-form'
    },
    dataTabComponent() {
      return this.type + 'Form'
    }
  },
  methods: {
    register() {
      this.type = 'register'
      this.title = '注册账号'
      // this.$refs.loginForm.clearValidate('password')
    },
    // 账号登录
    login(Form) {
      this.type = 'login'
      this.title = '登录账号'
      // this.$refs[Form].clearValidate()
      // this.$refs[Form].resetFields()
      // this.$refs.registerForm && this.$refs.registerForm.clearValidate()
      // this.$refs.forgetForm && this.$refs.forgetForm.clearValidate()
      // this.$refs.phoneForm && this.$refs.phoneForm.clearValidate()
    },
    forget() {
      this.type = 'forget'
      this.title = '忘记密码'
      // this.$refs.loginForm.clearValidate()
    },
    loginPhone() {
      this.type = 'phone'
      this.title = '验证码登录'
      // this.$refs.loginForm.clearValidate()
      // this.$nextTick(() => {
      //   // this.$refs.tel.focus()
      //   // this.$refs.loginForm.clearValidate()
      // })
    },
    resetBack() {
      this.type = 'forget'
      this.title = '忘记密码'
      // this.$refs.resetForm.clearValidate()
    },
    reset() {
      this.type = 'reset'
      this.title = '重置密码'
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
</style>>
