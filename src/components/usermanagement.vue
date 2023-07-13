<template>
  <el-container class="Container">
    <el-aside width="150px">
      <el-menu
        :default-active="activeIndex" class="el-menu-demo"
        @select="handleSelect" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">用户信息</el-menu-item>
        <el-menu-item index="2">统计信息</el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>
      <div style="margin-left: 5%;margin-right: 5%;margin-top:2%">
        <el-input v-model="input"  style="width: 250px" suffix-icon="el-icon-search" placeholder="请输入内容" size="small"></el-input>
        <el-button type="primary" @click="load" style="margin-left: 1%" size="small" >查询</el-button>
        <el-button type="primary" @click="addForm"  style="margin-left: 1%" size="small">新增</el-button>
        <br><br><br>
        <el-table :data="tableData" style="width: 100%;flex-wrap: wrap">
          <el-table-column prop="loginName" label="账号" >
          </el-table-column>
          <el-table-column prop="userName" label="名称" >
          </el-table-column>
          <el-table-column prop="authority" label="权限" >
          </el-table-column>
          <el-table-column prop="teacher" label="小组" >
          </el-table-column>
          <el-table-column prop="count" label="当前完成方案数量" >
          </el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <el-row :gutter="20">
                <el-col :span="12" >
                    <el-button size="mini" @click="updateForm(scope.row)"><i class="el-icon-edit"></i> 编辑</el-button>

                </el-col>
                <el-col :span="12" >
                  <el-popconfirm
                    confirm-button-text='确定'
                    cancel-button-text='取消'
                    icon="el-icon-info"
                    icon-color="red"
                    title="你确定删除吗？"
                    @confirm="deleteInfo(scope.row.id)"
                  ><el-button type="danger" slot="reference"  size="mini" ><i class="el-icon-delete"></i> 删除</el-button>
                  </el-popconfirm>
                </el-col>
              </el-row>



            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top:2%;margin-right: 20%;margin-left: 35%;">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-size="pageSize"
            layout="total,prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>

      <el-dialog title="用户信息"
                 :visible.sync="dialogFormVisible"
                 width="50%" top="5vh">
        <el-form label-width="60px"
                 :rules="rules" style="margin-left: 10%;margin-right: 15%">
          <el-form-item label="账号" prop="name">
            <el-input v-model="form.loginName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="小组">
            <el-input v-model="form.teacher" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限" >
<!--            <el-input v-model="form.authority" autocomplete="off"></el-input>-->
            <el-select v-model="form.authority" placeholder="请选择权限">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>


<style scoped>


.el-menu{
  height: 100%;
}

.el-aside {
  background-color: #545c64;
  text-align: center;
  line-height: 200px;
}



.el-form .el-select{
  width: 100%;
}

.Container{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>



<script>
import axios from 'axios'
import * as echarts from "echarts"

export default {
  name: "usermanagement",
  data() {
    return{
      input: '',
      activeIndex: '1',
      dialogFormVisible: false,
      form:{},
      tableData:[],
      total:0,
      pageNum:1,
      pageSize:5,
      teacher:[],
      count:[],
      rules:{
        name:[ { required: true, message: '此项为必填项', trigger: 'blur' }]
    }
    }
  },

  methods:{
    load(){
      let that = this
      if(that.$store.state.user.authority === '普通用户'){
        alert("无管理员权限！")
        this.$router.push({path: '/choose'})
      }
      axios.get("/api/user/page",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          user_name:this.input,
        },
        headers:{
          'token': window.sessionStorage['token']
        }
      }).then(function (response) {
        let res = response.data.data
        that.tableData = res.data.records
        that.total = res.total
      }).catch(function (error){
        alert('通信错误，请联系管理员')
      })

    },

    save(){
      let that = this
      axios.post("/api/user/addOrUpdate",this.form,{
        headers:{
          'token': window.sessionStorage['token']
        }
      }).then(function (response){
        // console.log(response.data.retcode)
        if (response.data.retcode == 'ok') {
            that.$message({
            message: '保存成功',
            type: 'success'
          })
        }else{
          that.$message.error('保存失败')
        }
      }).catch(function (error) {
        alert(error)
      })
      this.dialogFormVisible = false
      this.load()
    },

    addForm(){
      this.dialogFormVisible = true
      this.form = {}
    },

    updateForm(row){
      this.dialogFormVisible = true
      this.form = row
    },

    deleteInfo(id){
      let that = this
      axios.delete("/api/"+id,{
        headers:{
          'token': window.sessionStorage['token']
        }
      }).then(function (response){
        // console.log(response.data.retcode)
        if (response.data.retcode == 'ok') {
          that.$message({
            message: '删除成功',
            type: 'success'
          })
        }else{
          that.$message.error('删除失败')
        }
      }).catch(function (error) {
        alert('通信错误，请联系管理员')
      })
      this.load()
    },

    handleCurrentChange(pageNum){
      this.pageNum = pageNum
      this.load()
    },

    handleClose(){

    },

    handleSelect (key, keyPath) {
      if (key == 1) {
        this.$router.push({path: '/usermanagement'})
      } else if (key == 2) {
        this.$router.push({path: '/statistics'})

      }
    }

  },

  mounted: function (){
    this.load()
  }

}
</script>


