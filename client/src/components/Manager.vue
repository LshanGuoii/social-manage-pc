<template>
  <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" style="padding:10px">
    <el-tab-pane label="评论管理" name="first">评论列表</el-tab-pane>
    <el-tab-pane label="用户管理" name="second">用户列表</el-tab-pane>
  </el-tabs>
  <div class="index-table"> 
  <el-table
  v-if="activeName === 'first'"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="所属用户"
        width="280">
      </el-table-column>
      <el-table-column
        prop="text"
        label="所属"
        width="280">
      </el-table-column>
      <el-table-column
        prop="likenumber"
        label="点赞数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="talknumber"
        label="评论数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="280">
      </el-table-column>
      <!-- <el-table-column
        prop="address"
        label="地址">
      </el-table-column> -->
       <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-table
    v-if="activeName === 'second'"
      :data="profiles"
      border
      style="width: 100%">
      <el-table-column
        prop="user.name"
        label="用户名"
        width="280">
      </el-table-column>
       <el-table-column
        prop="handle"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="bio"
        label="简介"
        >
      </el-table-column>
      <el-table-column
        prop="company"
        label="公司"
       >
      </el-table-column>
      <el-table-column
        prop="status"
        label="岗位"
        >
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        >
      </el-table-column>
      <!-- <el-table-column
        prop="address"
        label="地址">
      </el-table-column> -->
       <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="deleteClick(scope.row.user._id)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
  
  </div>
</template>

<script>
export default {
  name: 'Manager',
 data() {
      return {
        activeName: 'first',
         tableData: [],
         profiles: []
      };
    },
    created () {
        this.getData();
        this.getProfiles()
              console.log(this.profiles)
    },
      methods: {
        getData() {
        this.$axios
        .get('/api/posts')
        .then(res => {
          this.tableData = res.data;
          this.tableData.forEach((item) => {
            console.log(item)
            this.$set(item,'talknumber', item.comments.length)
            this.$set(item,'likenumber', item.likes.length)
            this.$set(item,'date', item.date.slice(0,10))
          })
           console.log(this.tableData)
        })
        .catch(err => {
          this.errors = err.response.data;
        });
       
          },
          getProfiles() {
         this.$axios
        .get('/api/profile/all')
        .then(res => {
          this.profiles = res.data;
          console.log(this.profiles);
           this.profiles.forEach((item) => {
            this.$set(item,'date', item.date.slice(0,10))
          })
          this.$store.dispatch('setProfiles', res.data);
        })
        .catch(err => {
          this.profiles = [];
          this.$store.dispatch('setProfiles', []);
        });
    },
        handleClick(tab, event) {
          if(this.activeName === 'first') {
          this.getData();
          } else {
          this.getProfiles()
          }

      },
        handleDelete(index, row) {
        console.log(index, row);
      },
      handleDelete(id) {
        console.log(id)

            this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              this.$axios
        .delete(`/api/posts/manager/${id}`)
        .then(res => {
          // 删除成功 更新数据
           this.$message({
            type: 'success',
            message: '删除成功!'
          });
         this.getData()
        })
        .catch(err => {
          console.log(err.response.data);
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    deleteClick(id) {
      console.log(id)
        this.$confirm('此操作将永久删除该账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
        .delete(`/api/profile/${id}`)
        .then(res => {
          this.profile = null;
          this.getProfiles()
          // 更新store
          this.$store.dispatch('clearCurrentState');
          this.$router.push('/login');
           this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(err => {
          console.log(err);
        });
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    }
}
</script>

<style>
  .index-table{
    padding: 30px;
  }
</style>