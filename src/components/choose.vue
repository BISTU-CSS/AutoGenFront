<template>
  <div style="background: #eeeeee;" >
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
               background-color="#141016" text-color="#fff"
               active-text-color="#ffd04b" margin="0" padding="0">
        <el-col :span="21">
          <el-menu-item index="1">项目主页</el-menu-item>
        </el-col>
        <el-col :span="3">
          <el-menu-item index="2" disabled v-text="yonghu"></el-menu-item>
        </el-col>
      </el-menu>
    </div>
    <el-row class="tac">
      <el-col :span="3">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @select="handleSelectFileType"
          background-color="#222d33"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="margin-right:20px;">
          <br>
          <el-menu-item index="1" align="center">
            <el-button type="success"
                       round style="width: 100%;"
                       @click="addque"
            >新增项目</el-button>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title">所有项目</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title">您的项目</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span slot="title">已归档项目</span>
          </el-menu-item>
          <el-menu-item index="5">
            <span slot="title">已删除项目</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div><br>
          <el-alert
            title="目前所有项目均可删除与操作"
            type="warning"
            description="请谨慎操作项目"
            show-icon>
          </el-alert>
        </div>
        <div>
          <h2 v-text="daohanglan"></h2>
        </div>
        <div>
          <el-input placeholder="搜索项目名称"
                    style="width:700px;margin-left:20px;
                          margin-top:10px;margin-bottom:10px;">
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template>
          </el-input>
        </div>
        <div class="mkdw">
          <el-table :data="tableData" tooltip-effect="dark" style="width: 100%">
            <el-table-column label="项目名称" width="">
              <template slot-scope="scope">
                <el-link style="color: #004eb8;" @click="handleClick(scope.row)"  type="primary">{{ scope.row.xmmc }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="cjr" label="创建人" width="100">
            </el-table-column>
            <el-table-column prop="zdls" label="指导老师" width="100">
            </el-table-column>
            <el-table-column prop="date" label="创建时间" width="180">
            </el-table-column>
            <el-table-column prop="xgsj" label="上次修改时间" width="180">
            </el-table-column>
            <el-table-column prop="" label="项目标签" width="100">
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="160">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="打包下载" placement="top">
                  <i class="el-icon-download" style="font-size: 20px; cursor: pointer;"></i>
                </el-tooltip>&nbsp;
                <el-tooltip class="item" effect="dark" content="添加标签" placement="top">
                  <i class="el-icon-collection-tag" style="font-size: 20px; cursor: pointer;"></i>
                </el-tooltip>&nbsp;
                <el-tooltip class="item" effect="dark" content="归档/移除归档" placement="top">
                  <i class="el-icon-receiving" style="font-size: 20px; cursor: pointer;"></i>
                </el-tooltip>&nbsp;
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <i class="el-icon-delete" style="font-size: 20px; cursor: pointer;"></i>
                </el-tooltip>&nbsp;
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  data () {
    return {
      yonghu:"用户A",
      daohanglan:"所有项目",
      activeIndex: '1',
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    handleClick (row) {
      let that = this
      that.$router.push({
        name: 'basicinfo', params: {
          storage_name: row.xmmc,
          cjr : row.cjr
        }
      })
    },

    addque(){     //创建项目仓库
      //this.$router.push({path: '/addque'})    //换成弹窗
      let that = this

      this.$prompt('请输入项目名称', '新增项目', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if(value == null){
          alert('项目名称不能为空')
          return;
        }
        //传递JSON
        axios.post('/api/createQuestionnaire', {
            xmmc: value,
            cjr: this.yonghu,        //获取姓名
            //zdls: this.zdls,      //暂无
            xmsm: this.xmsm       //暂无
          }, {
            headers: {
              'token': window.sessionStorage['token']
            }
          }
        ).then(function (response) {
          if (response.data.retcode == 'ok') {
            that.$message({
              message: '成功',
              type: 'success'
            })
            location.reload()
          } else {
            alert('请更换项目名称或联系管理员')
          }
        }).catch(function (error) {
          that.loading = false
          alert('通信错误，请联系管理员')
          console.error(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    handleSelectFileType(key, keyPath){
      if (key == 1) {   //新增项目
      } else if (key == 2) {
        this.daohanglan = "所有项目"
      } else if (key == 3) {
        this.daohanglan ="您的项目"
      } else if (key == 4) {
        this.daohanglan = "已归档项目"
      } else if (key == 5) {
        this.daohanglan = "已删除项目"
      }

    }

  },
  mounted: function () {
    let that = this
    // axios.get('/api/getQuestionnaireList').
    axios({
      methods: 'get',
      url: '/api/getQuestionnaireList',
      headers: {
        'token': window.sessionStorage['token']
      }
    }).then(function (response) {
      if (response.data.retcode == 'ok') {
        // var jsonData = JSON.stringify(response.data)
        // alert(jsonData)
        that.tableData = response.data.data
      // } else if (response.data.retcode == '用户未登录，请先登录') {
      //   alert('用户未登录，请先登录')
      } else {
        alert('系统错误，请联系管理员')
      }
    }).catch(function (error) {
      alert('get通信错误，请联系管理员')
      console.error(error)

    })
  },
}
</script>

<style>
  .el-menu{
    border: 0!important;
  }

  body{
    margin: 0px;
  }
  .el-menu-vertical-demo{
    height: 150vh;
    border-right: none;
    overflow-y: auto;
  }

</style>
