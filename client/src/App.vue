<template>
  <div id="app">
    <router-view/>
    <watch-height></watch-height>
  </div>
</template>
<script>
import WatchHeight from './views/common/watchHeight/index'
export default {
  components: {
    WatchHeight
  }
}
</script>
<style lang="less">
// @import './assets/css/font.css';
  body {
    margin: 0;
  }
  ::-webkit-scrollbar {
  width: 5px; /*对垂直流动条有效*/
  height: 10px; /*对垂直流动条有效*/
  }
  ::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 10px;
    background: #CCCCCC;
  }
  ::-webkit-scrollbar-track { /*滚动条里面轨道*/
    border-top: 1px solid #f0f0f0;
    background: #fff;
  }
 .main-bg-color {
    background-color:#17B880!important;
  } // 全局背景色
  .main-color {
    color:#17B880!important;
  } // 全局主色
  .main-button {
     color: #fff!important;
     background-color:#17B880!important;
  }
  .f-forbidden {
    color: #ccc !important;
  }
</style>
