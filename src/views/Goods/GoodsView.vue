<template>
  <div class="goods">
    <!-- 1.Search -->
    <div class="search">
      <el-input v-model='input' placeholder="Please input" @change="searchInp"></el-input>
      <el-button type="primary" @click="searchInp">Search</el-button>
      <el-button type="primary">
        <router-link to="/add-goods" style="color: #ffffff;">Add1</router-link>
      </el-button>
      <el-button type="primary" @click="addGoods">Add2</el-button>
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
        <el-table-column prop="image" label="图片" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sellPoint" label="卖点" show-overflow-tooltip></el-table-column>
        <el-table-column prop="descs" label="描述" show-overflow-tooltip></el-table-column>
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

    <!-- 3.Pagination -->
    <MyPagination :total='total' :pageSize='pageSize' @changePage='changePage' :currentPage='currentPage' />

    <!-- 4.Dialog -->
    <!-- <GoodsDialog :dialogVisible='dialogVisible' @changeDialog='changeDialog'/> -->
    <GoodsDialog ref='dialog' :dialogTitle='dialogTitle' :rowData='rowData'/>
  </div>
</template>

<script>
import MyPagination from '../../components/MyPagination.vue'
import GoodsDialog from './GoodsDialog.vue'

export default {
  components: {
    MyPagination,
    GoodsDialog
  },
  data() {
    return {
      input: "",
      tableData: [],
      total: 10,
      pageSize: 1,
      isGoods: true,
      list: [],
      dialogVisible: false,
      currentPage: 1,
      dialogTitle: 'New Goods',
      rowData: {}
    }
  },
  methods: {
    addGoods() {
      // this.dialogVisible = true;
      this.$refs.dialog.dialogVisible = true;
      this.dialogTitle = "New Goods";
    },
    // changeDialog() {
    //   this.dialogVisible = false;
    // },
    changePage(num) {
      this.currentPage = num;
      if (this.isGoods) {
        this.getData(num);
      } else {
        this.tableData = this.list.slice((num - 1) * 3, num * 3);
      }
    },
    handleEdit(index, row) {
      this.$refs.dialog.dialogVisible = true;
      this.dialogTitle = "Edit Goods";
      // this.$refs.dialog.ruleForm = row;
      this.rowData = row;
    },
    handleDelete(index, row) {
      console.log('delete', index, row);
      this.$confirm("Delete data", "Tips", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.$api.getDeleteGoods({
            id: row.id
          })
            .then(res => {
              // console.log(res.data);
              if (res.data.status === 200) {
                this.$message({
                  type: 'success',
                  message: 'success'
                });
                this.getData(1);
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'canceled'
          })
        })
    },
    getData(page) {
      this.$api.getGoodsList({
        page: page
      })
        .then(res => {
          // console.log(res.data);
          if (res.data.status === 200) {
            this.tableData = res.data.data;
            this.total = res.data.total;
            this.pageSize = res.data.pageSize;
          }
        })
    },
    searchInp(val) {
      if (!val) {
        this.getData(1);
        this.currentPage = 1;
        return;
      }
      // console.log(val);
      this.$api.getSearch({
        search: val
      }).then(res => {
        // console.log(res.data);
        this.currentPage = 1;
        if (res.data.status === 200) {
          this.list = res.data.result;
          this.total = res.data.result.length;
          this.pageSize = 3;
          this.tableData = res.data.result.slice(0, 3);
          this.isGoods = false;
        } else {
          this.tableData = [];
          this.total = 1;
          this.pageSize = 1;
          this.isGoods = true;
        }
      })
    }
  },
  created() {
    this.getData(1);
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