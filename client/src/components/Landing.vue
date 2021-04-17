<template>
    <!-- Landing -->
  <div class="landing">
    <div class="dark-overlay landing-inner text-light">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <h1 class="display-3 mb-4">码连
            </h1>
            <p class="lead"> 专注开发者社交，给用户极致的体验 </p>
            <hr />
            <router-link v-show="!isLogin" to="/register">
            <el-button>注册</el-button>
            </router-link>
            <router-link v-show="!isLogin" to="/login" class="btn-light">
             <el-button>登录</el-button></router-link>
          </div>
        </div>
      </div>
    </div>
        <Footer />
  </div>

</template>

<script>
import Footer from './../components/Footer';
export default {
  name: 'Landing',
  components: {
    Footer
  },
  data() {
    return {};
  },
  computed: {
    isLogin() {
      if (this.$store.getters.isAuthenticated) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
}

.landing {
  position: relative;
  background: url('../assets/showcase.jpg') no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  margin-top: -24px;
  margin-bottom: -50px;
}

.landing-inner {
  padding-top: 80px;
}

.dark-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card-form {
  opacity: 0.9;
}

.latest-profiles-img {
  width: 40px;
  height: 40px;
}

.form-control::placeholder {
  color: #bbb !important;
}
</style>

