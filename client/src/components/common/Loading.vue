<template>
    <div class="loading" v-loading.fullscreen.lock="fullscreenLoading">
        <!-- <img src="../../assets/loading.gif" alt=""> -->

    </div>
</template>
<script>
export default {
  data () {
    return {
       fullscreenLoading: false
    }
  },
  created () {
    this.openFullScreen1()
  },
  methods: {
     openFullScreen1() {
        this.fullscreenLoading = true;
        // setTimeout(() => {
        //   this.fullscreenLoading = false;
        // }, 8000);
      },
  }
}
</script>
<style scoped>
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.loading img {
  position: absolute;
  width: 100px;
  height: 100px;
  /* top: calc(50% - 300px);
  left: calc(50% - 25px); */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
</style>

