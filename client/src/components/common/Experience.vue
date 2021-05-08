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
       this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('deleteExperience', id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    }
  }
}
</script>

<style scoped>
</style>

