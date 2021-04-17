<template>
  <div>
    <h4 class="mb-2">个人履历</h4>
    <el-table :data="experience"     border style="width: 80%">
      <el-table-column prop="company" label="公司" > </el-table-column>
      <el-table-column prop="title" label="职位" > </el-table-column>
      <el-table-column prop="date" label="年份"> </el-table-column>
       <!-- <el-table-column fixed="right" label="年份" width="100">
        <template slot-scope="scope">
         <span>{{scope.row.to}}</span>
        </template>
      </el-table-column> -->
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteClick(scope.row._id)" size="small" class="btn btn-danger"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'experience',
  data() {
    return {
    }
  },
  props: {
    experience:{
      type: Array,
      default: ()=> []
    }
  },
  created () {
    console.log(this.experience)
    this.dataDeal()
  },
  watch: { experience: 'dataDeal'
  
  },
  methods: {
    dataDeal() {
      console.log(this.experience)
      this.experience.forEach((item) => {
         if(item.to ==='在职') {
           this.$set(item,'date',`${item.from}-至今`)
         } else {
          this.$set(item,'date',`${item.from}-${item.to}`) 
         }
      })
    },
    deleteClick(id) {
      console.log(id)
      // this.$axios
      //   .delete(`api/profile/experience/${id}`)
      //   .then(res => {
      //      this.$message.success('编辑成功');
      //     this.experience = res.data.experience;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      this.$emit('deleteExperience', id)
    }
  }
}
</script>

<style scoped>
</style>

