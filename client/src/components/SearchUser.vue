<!--
- 
- author: luoshang
-->
<template>
<div class="">
    <el-autocomplete
    size="small"
  v-model="state"
  :fetch-suggestions="querySearchAsync"
  placeholder="请输入内容"
  @select="handleSelect"
></el-autocomplete>
 <!-- <router-link :to="`/profile/${selectUrl.url}`"  class="btn btn-info">进入</router-link> -->
   <el-button type="primary" size="small" @click="onSubmit">搜索用户</el-button>
</div>
</template>

<script>

export default {
  name: 'SearchUser',

  components: {},
  data() {
    return {
      datas: [],
      profiles: [],
      restaurants: [],
      state: '',
      timeout:  null,
      selectUrl: {},
    }
  },
  computed: {},
  created() {
     this.getProfiles()
  },
  mounted() {
    },
  methods: {
    onSubmit () {
      if (this.selectUrl.url) {
        this.$router.push(`/profile/${this.selectUrl.url}`)
      } else {
         this.$message({
            type: 'error',
            message: '无此用户！'
          }); 
      }
     
    },
    getProfiles() {
      this.$axios
        .get('/api/profile/all')
        .then(res => {
          // console.log(res.data);
          this.profiles = res.data;
            console.log(this.profiles)
            this.restaurants = this.loadAll();
          this.$store.dispatch('setProfiles', res.data);
        })
        .catch(err => {
          this.profiles = [];
          this.$store.dispatch('setProfiles', []);
        });
    },
  loadAll() {
     console.log(this.profiles)
     var datas = []
      this.profiles.forEach((item) => {
        let data = {
          'url': item.handle,
          'value': item.user.name
        }
        datas.push(data)
      })
       console.log(datas)
        return datas
        },
        querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
        this.selectUrl = item
      }
  },

}
</script>
<style scoped>

</style>
