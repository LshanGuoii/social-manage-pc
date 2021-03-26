<template>
  <div>
    <el-form :model="registerForm" status-icon :rules="registerRules" ref="registerForm" label-width="100px" class="demo-ruleForm2">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model.number="registerForm.telephone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model="registerForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" show-password v-model="registerForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <slot name="backLogin"></slot>
      <el-button type="primary" style="width: 50%; display: block; margin: 5px auto" @click="submitRegister('registerForm')">注册账号</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'register-form',
  data() {
    var checkUser = (rule, value, callback) => {
      setTimeout(() => {
        this.userList &&
          this.userList.forEach(item => {
            if (item.username === value) {
              callback(new Error('该用户名已被使用'))
            }
            if (item.telephone === value) {
              callback(new Error('该电话已被使用'))
            }
          })
        callback()
      }, 500)
    }
    var validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度至少为6个字符'))
      }
      if (value.length > 20) {
        callback(new Error('密码长度至多为20个字符'))
      }
      callback()
    }
    // 注册时密码校验
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userList: [],
      registerForm: {
        username: '',
        telephone: '',
        password: '',
        checkPass: ''
      }, // 注册
      registerRules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { required: true, validator: checkUser, trigger: 'blur' },
          {
            pattern: /^[0-9a-zA-Z_]{2,15}$/,
            message: '用户名长度为2-15位字符',
            trigger: 'blur'
          }
        ],
        telephone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { required: true, validator: checkUser, trigger: 'blur' },
          {
            pattern: /^(1)\d{10}$/,
            message: '不是有效的手机号',
            trigger: 'blur'
          }
        ],
        // password: [{ required: true, message: '密码不能为空', trigger: 'blur' },
        //   { validator: validatePass, trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        // password: [
        //   { required: true, message: '请输入密码', trigger: 'blur' },
        //   { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        // ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' },
          // { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  deactivated() {
    this.$refs.registerForm.clearValidate()
  },
  methods: {
    submitRegister(formName) {
      this.userList = JSON.parse(sessionStorage.getItem('userList')) ? JSON.parse(sessionStorage.getItem('userList')) : []
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            username: this.registerForm.username,
            password: this.registerForm.password,
            telephone: this.registerForm.telephone
          }
          console.log(this.userList)
          this.userList.push(data)
          sessionStorage.setItem('userList', JSON.stringify(this.userList))
          this.$message.success('创建成功')
          // this.$parent.type = 'login'
          // this.type = 'login'
          // this.title = '登录账号'
          this.$emit('login')
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style>
</style>
