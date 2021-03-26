<template>
 <div>
<el-pagination
  background
  layout="sizes, prev, pager, next, jumper"
  :current-page="page.no"
  @size-change="handleSizeChange"
  :page-sizes="[10,20,40]"
  :page-size="page.size"
  :total="page.total"
  @current-change='paginationChange'
  >
  </el-pagination>
 </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    type: {
      type: String,
      default: ''
    },
    page: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    // 换页
    paginationChange (index) {
      this.page.no = index
      this.$emit('loadData')
      this.$emit('updata:page', this.page)
    },
    // 改变分页条数
    handleSizeChange (size) {
      this.page.size = size
      this.page.no = 1
      this.$emit('loadData')
      this.$emit('updata:page', this.page)
    }
  }
}
</script>

<style lang='less' scoped>

</style>
