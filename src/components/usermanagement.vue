<template>
  <div id="userinfo">
    <el-input v-model="input"  style="width: 200px" suffix-icon="el-icon-search"></el-input>
    <el-button type="primary">查询</el-button>
    <el-button type="primary">新增</el-button>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column prop="user" label="用户" width="180">
      </el-table-column>
      <el-table-column prop="group" label="小组" width="180">
      </el-table-column>
      <el-table-column prop="count" label="当前完成方案数量" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success">编辑<i class="el-icon-edit"></i></el-button>
          <el-button type="danger">删除<i class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form label-width="120">
        <el-form-item label="账号">
          <el-input v-model="form.loginname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="小组">
          <el-input v-model="form.gro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-input v-model="form.authority" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>


<style scoped>

</style>

<script>
export default {
  name: "usermanagement",
  data() {
    return{
      input: ' ',
      dialogFormVisible: false,
      form:{},
      tableData:[{
        user: 'user',
        group: 'group',
        count: '2'
      },{
        user: 'user',
        group: 'group',
        count: '0'
      }]
    }
  }
}
</script>
