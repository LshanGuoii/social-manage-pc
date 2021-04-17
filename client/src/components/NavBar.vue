<template>
    <!-- Navbar -->
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-4 navbar">
    <div class="container">
      <router-link class="navbar-brand" to="/">码连</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mobile-nav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/profiles"> 开发者
            </router-link>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-show="isLogin">
            <router-link class="nav-link" to="/feed">留言</router-link>
          </li>
          <li class="nav-item" v-show="isLogin">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item" v-show="!isLogin">
            <router-link class="nav-link" to="/register">注册</router-link>
          </li>
          <li class="nav-item" v-show="!isLogin">
            <router-link class="nav-link" to="/login">登录</router-link>
          </li>
          <li class="nav-item" v-if="user !== null" v-show="isLogin">
            <a @click.prevent="logout" class="nav-link" to="/login">
            <img :src="user.avatar" :alt="user.name" class="rounded-circle headerImg">
            退出
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-row :gutter="20">
  <el-col :span="6"><el-menu-item index="1">处理中心</el-menu-item><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"> <div></div> <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6">  <el-menu-item index="3" disabled>消息中心</el-menu-item><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item><div class="grid-content bg-purple"></div></el-col>
</el-row>
</el-menu> -->
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
       activeIndex: '1',
    };
  },
  computed: {
    isLogin() {
      if (this.$store.getters.isAuthenticated) {
        return true;
      } else {
        return false;
      }
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    logout() {
      // 删除ls
      localStorage.removeItem('jwtToken');
      // 干掉请求头
      // this.$store.dispatch('setIsAuthenticated', false);
      // this.$store.dispatch('setUser', {});
      this.$store.dispatch('clearCurrentState');
      // 跳转登录
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.headerImg {
  width: 25px;
  margin-right: 5px;
}
.navbar{
  background:#5781FF!important;
  /* opacity: 0.8; */
}
</style>

