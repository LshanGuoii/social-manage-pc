<template>
  <div>
    <h4 class="mb-2">个人履历</h4>
    <!-- <table class="table">
            <thead>
            <tr>
                <th>公司</th>
                <th>职位</th>
                <th>年份</th>
                <th />
            </tr>
            </thead>
            <tbody>
            <tr v-for="exp in experience" :key="exp._id">
                <td>{{exp.company}}</td>
                <td>{{exp.title}}</td>
                <td>
                {{exp.from}} ~ {{exp.to}}
                </td>
                <td>
                <el-button type="danger" @click="deleteClick(exp._id)" class="btn btn-danger">
                    删除
                </el-button>
                </td>
            </tr>
            </tbody>
        </table> -->
    <el-table :data="experience" style="width: 100%">
      <el-table-column prop="company" label="公司" width="180"> </el-table-column>
      <el-table-column prop="title" label="职位" width="180"> </el-table-column>
      <el-table-column prop="from" label="年份"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteClick(exp._id)" size="small" class="btn btn-danger"> 删除 </el-button>
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
  },
  methods: {
    deleteClick(id) {
      // this.$axios
      //   .delete(`api/profile/experience/${id}`)
      //   .then(res => {
      //     console.log(res.data);
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

