<template>
  <div id="userinfo">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">新增项目</el-menu-item>
      <el-menu-item index="2">调研表选择</el-menu-item>
      <el-menu-item index="3" disabled>当前调研表</el-menu-item>
      <el-menu-item index="4" disabled>中间配置</el-menu-item>
      <el-menu-item index="5" disabled>规则配置</el-menu-item>
      <el-menu-item index="6">用户管理</el-menu-item>
    </el-menu>
    <div style="padding: 40px">
      <el-input v-model="input"  style="width: 200px" suffix-icon="el-icon-search" placeholder="请输入内容"></el-input>
      <el-button type="primary" @click="load">查询</el-button>
      <el-button type="primary" @click="addForm">新增</el-button>
      <el-table
        :data="tableData"
        :height="306"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        style="width: 100%;padding: 10px 0 0 0" >
        <el-table-column prop="loginName" label="账号" width="180">
        </el-table-column>
        <el-table-column prop="userName" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="authority" label="权限" width="180">
        </el-table-column>
        <el-table-column prop="teacher" label="小组" width="180">
        </el-table-column>
        <el-table-column prop="count" label="当前完成方案数量" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" @click="updateForm(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
            <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="你确定删除吗？"
              @confirm="deleteInfo(scope.row.id)"
            >
              <el-button type="danger"slot="reference">删除<i class="el-icon-delete"></i></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          layout="total,prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <div id="myCharts" ref="charts"
      style="height: 240px; width: 50%"
    ></div>


    <el-dialog title="用户信息"
               :visible.sync="dialogFormVisible"
               width="300px" top="5vh">
      <el-form label-width="60px"
               :rules="rules">
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
        <el-form-item label="权限">
          <el-input v-model="form.authority" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>


<style scoped>

#userinfo{
  height: 100%;
  overflow: hidden;
}
/deep/.el-table td,
.el-table th {
  padding: 5px 0;
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
      activeIndex: '6',
      dialogFormVisible: false,
      form:{},
      tableData:[],
      total:0,
      pageNum:1,
      pageSize:4,
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
        var jsonData = JSON.stringify(response)
        alert(jsonData)
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

    setEchartsOptions() {
      let that = this//生成ECharts
      const myChart = this.$echarts.init(this.$refs.charts)
      axios.get("/api/user/group",{
        headers:{
          'token': window.sessionStorage['token']
        }
      }).then(function (response){
        let res = response.data.data
        for(let item of res){
          // console.log(item)
          that.teacher.push(item.teacher)
          that.count.push(item.count)
        }
        console.log(that.teacher)
        console.log(that.count)
        var option = {
          title:{
            show:true,
            text:'每组完成方案数量'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: that.teacher,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'count',
              type: 'bar',
              barWidth: '30%',
              data: that.count
            }
          ]
        }
        myChart.setOption(option);
        myChart.resize(); //重绘,动态获取options时不会出现渲染异常
      }).catch(function (error){
        console.log(error)
      })
    },

    handleClose(){

    },


    handleSelect (key, keyPath) {
      if (key == 1) {
        this.$router.push({path: '/addque'})
      } else if (key == 2) {
        this.$router.push({path: '/choose'})
      } else if (key == 6) {
        this.$router.push({path: '/usermanagement'})
      }
    }

  },

  mounted: function (){
    this.load()
    this.setEchartsOptions()
  }

}
</script>
