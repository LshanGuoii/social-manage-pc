<template>
 <div>
 </div>
</template>

<script>
import dingTalk from '@/components/common/dingTalkApi.js'
export default {
  components: {

  },
  data () {
    return {

    }
  },
  created () {
    this.getUserID()
  },
  methods: {
    getUserID () {
      console.log(this.isDevOnline())
      if (!this.isDevOnline()) {
        sessionStorage.setItem('corp_id', 'dingcd2d4dce6321bc9b35c2f4657eb6378f')
        sessionStorage.setItem('user_id', '010903634033748828')
        this.corpid = sessionStorage.getItem('corp_id')
        this.userid = sessionStorage.getItem('user_id')
        this.$router.push('/weChatPush')
      } else {
        let rou = ''
        let splitData = window.location.search.split(/[?&=/]/)
        let cindex = splitData.indexOf('corpid')
        if (cindex > -1) {
          rou = splitData[cindex + 1]
        } else if (this.$route.query.corpid) { // 路由传值获得参数
          rou = this.$route.query.corpid
        }
        sessionStorage.setItem('corp_id', rou)
        dingTalk.loginDingTalk(rou).then((result) => {
          let params = {
            corp_id: rou,
            code: result.code
          }
          this.apis.getUserId(params).then((res) => {
            if (res.errcode === 0) {
              sessionStorage.setItem('user_id', res.userid)
              this.corpid = sessionStorage.getItem('corp_id')
              this.userid = sessionStorage.getItem('user_id')
              this.$router.push('/weChatPush')
            }
          })
        })
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>
