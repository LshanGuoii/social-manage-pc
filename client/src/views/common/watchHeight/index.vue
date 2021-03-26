<!--
 * @Author: your name
 * @Date: 2020-09-07 18:05:25
 * @LastEditTime: 2020-09-24 18:09:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \phone-crm-dev\src\views\common\watchHeight\index.vue
-->
<template>
  <div :data-height="inHeight"></div>
</template>

<script>
/*
 * 监听可视高度变化
 */
export default {
  data () {
    return {
      inHeight: '' // 当前屏幕的高度
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.inHeight = window.innerHeight - 5
      this.$store.commit('INNERHEIGHT', this.inHeight)
    })
  }
}
</script>
