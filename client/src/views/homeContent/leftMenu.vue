<template>
  <div class="left-menu">
  <div class="menu-div">
    <el-menu
      :default-active="activemenu"
      ref="menu"
      class="el-menu-vertical-demo"
      @select="handleOpen"
      @close="handleClose">
      <el-menu-item index="1" @click="toNewPage('/weChatPush')">
        <i class="el-icon-menu"></i>
        <span slot="title">企业微信客户群推送</span>
      </el-menu-item>
      <el-menu-item index="2" @click="toNewPage('/approvalPush')">
        <i class="el-icon-setting"></i>
        <span slot="title">审批报销单推送</span>
      </el-menu-item>
    </el-menu>
  </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      activemenu: '1'
    }
  },
  created () {
    this.refresh()
  },
  mounted () {
  },
  methods: {
    refresh () {
      if (this.$route.meta.title === '审批报销单推送') {
        this.activemenu = '2'
      }
    },
    handleOpen (key) {
    },
    handleClose (key, keyPath) {
    }
  }
}
</script>

<style lang="less" scoped>
 .left-menu{
    position: absolute;
    z-index: 1;
    height: 100%;
    text-align: left;
    overflow-y: auto;
    display: flex;
    top: 0;
    .menu-div{
      width: 200px;
       background-color: #f5f5f5;
    }
 }
</style>
<style lang="less">
  .el-menu-item.is-active {
    background-color: #D7D7D7 !important;
    color: #17B880 !important;
    /*border-left: #008C0E 5px solid;
    margin-left: 3px;
    padding-left: 32px !important;*/
  }
  .el-submenu .el-menu-item {
    height: 45px !important;
    line-height: 45px !important;
    padding: 0 45px !important;
    min-width: 200px !important;
    // font-size: 12px !important;
  }
  .el-menu-item, .el-submenu__title {
    height: 50px !important;
    line-height: 50px !important;
  }
</style>
