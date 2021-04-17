<template>
  <div>
        <h4 class="mb-2">教育经历</h4>
         <el-table :data="education"     border style="width: 80%">
      <el-table-column prop="school" label="学校" > </el-table-column>
      <el-table-column prop="degree" label="学历" > </el-table-column>
      <el-table-column prop="date" label="年份" > </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteClick(scope.row._id)" size="small" class="btn btn-danger"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
  name: 'education',
  data() {
    return {};
  },
  props: {
    education: Array
  },
  created () {
    this.dataDeal()
  },
   watch: { education: 'dataDeal'
  
  },
  methods: {
    dataDeal() {
  
      this.education.forEach((item) => {

         if(item.to !=='在校') {
           this.$set(item,'date',`${item.from}-至今`)
         } else {
           this.$set(item,'date','在校')
         }
      })
    },
    deleteClick(id) {
      
      this.$emit('deleteEducation', id);
    }
  }
};
</script>

<style scoped>
</style>

