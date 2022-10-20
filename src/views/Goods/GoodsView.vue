<template>
  <div class="goods">
    <!-- 1.Search -->
    <div class="search">
      <el-input v-model='input' placeholder="Please input"></el-input>
      <el-button type="primary">Search</el-button>
      <el-button type="primary">Add</el-button>
    </div>

    <!-- 2.Table -->
    <div class="table">
      <el-table :data="tableData">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="title" label="名称" width="100"></el-table-column>
        <el-table-column prop="price" label="价格" width="100"></el-table-column>
        <el-table-column prop="num" label="数量" width="100"></el-table-column>
        <el-table-column prop="category" label="类目" width="100"></el-table-column>
        <el-table-column prop="image" label="图片"></el-table-column>
        <el-table-column prop="sellPoint" label="卖点"></el-table-column>
        <el-table-column prop="descs" label="描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
              Edit</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
              Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 3.Pagenation -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      tableData: []
    }
  },
  methods: {
    handleEdit(){

    },
    handleDelete(){
      
    }
  },
  created(){
    this.$api.getGoodsList({
      page:1
    })
    .then(res=>{
      console.log(res.data);
      if(res.data.status === 200){
        this.tableData = res.data.data;
      }
    })
  }
}
</script>

<style>
.goods {
  padding: 20px;
}

.search {
  display: flex;
}

.search .el-button {
  margin-left: 10px;
}

.el-table {
  margin-top: 20px;
  padding: 10px;
  box-shadow: 0px 0px 5px #cdcdcd;
  border-radius: 10px;
}
</style>