<template>
 <div :style="{ height: $store.state.innerHeight +  'px'}">
   <div class="app-bottom" :style="{height: $store.state.innerHeight+ 'px'}">
    <div>
       <left-menu></left-menu>
     </div>
     <div class="left">
       <!-- <keep-alive> -->
        <router-view/>
         <!-- </keep-alive> -->
     </div>
   </div>
 </div>
</template>

<script>

import leftMenu from './leftMenu'

export default {
  components: {
    leftMenu
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="less">
 .app-bottom{
    display: inline-flex;
    height: calc(100 - 41px);
    width: 100%;
    position: relative;
    .left {
      margin-left: 200px;
      width: calc(100% - 220px);
      position: relative;
      transition: margin-left .2s;
         overflow: auto;
      width: 100%;
      min-width: 1300px;
    }
 }
</style>
