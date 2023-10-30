<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#141016"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1"><i class="el-icon-back" style="font-size: 20px; cursor: pointer;"></i>返回主页</el-menu-item>
      <el-menu-item index="2" :disabled=true>项目基本信息</el-menu-item>
      <el-menu-item index="3">当前调研表</el-menu-item>
      <el-menu-item index="4">文件管理</el-menu-item>
      <el-menu-item index="5">评分系统</el-menu-item>
    </el-menu>

    <div>
      <h2>{{ xmmc }}--文件下载列表</h2>
      <div>

          <el-table :data="tableData" style="width: 100%">
            <el-table-column

              label="文件"
              width="400">
              <template slot-scope="scope">
                {{ scope.row }}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">下载</el-button>
              </template>
            </el-table-column>
          </el-table>



      </div>
    </div>

    <div id="app">
      <h2>{{ xmmc }}--文件上传</h2>

      <div>
        <el-upload
          ref="videoUpload"
          action=""
          multiple
          :auto-upload="false"
          :on-change="uploadHOCK"
          :before-upload="beforeAvatarUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png/txt/pdf/excel/word文件，且不超过20MB</div>
        </el-upload>
      </div>

    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      activeIndex: '4',
      xmmc: this.$route.params.xmmc,
      tableData: []
    }
  },

  methods: {

    handleClick(row){

    },

    beforeAvatarUpload (file) {
      //alert(file.type)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isPDF = file.type === 'application/pdf'
      const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isXLS = file.type === 'application/vnd.ms-excel'
      const isDOCX = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      const isDOC = file.type === 'application/msword'
      const isLt20M = file.size / 1024 / 1024 < 20
      if (!isJPG && !isPNG && !isPDF && isXLSX && isXLS && isDOC && isDOCX) {
        this.$message.error('上传文件格式只能是 JPG PNG TXT PDF XLS XLSX DOC DOCX格式!')
      }
      if (!isLt20M) {
        this.$message.error('上传文件大小不能超过 20MB!')
      }
      return (isJPG || isPNG || isPDF || isXLSX || isXLS || isDOC || isDOCX) && isLt20M
    },

    async uploadHOCK (file) {
      console.log(file)
      console.log(this.xmmc)
      var form_ = new FormData()
      form_.append('file', file.raw)
      form_.append('xmmc', this.xmmc)
      axios.post(
        '/api/upload',
        form_
        , {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token': window.sessionStorage['token']
          }
        }
      ).then(function (response) {
        if (response.data.retcode = 'ok') {
          alert('上传成功!')
        } else {
          alert('上传失败！')
        }
      }).catch(function (error) {
        alert('通信错误，请联系管理员')
        console.error(error)
      })

    },

    handleSelect (key, keyPath) {
      if (key == 1) {     //返回主页
        this.$router.push({path: '/choose'})
      } else if (key == 2) {  //基本项目信息
      } else if (key == 3) {  //调研表
        let that = this
        axios.post('/api/getQuestionnaireResult', {
            xmmc: this.xmmc,
          }, {
            headers: {
              'token': window.sessionStorage['token']
            }
          }
        ).then(function (response) {

          that.$router.push(
            {
              name: 'questionnaire', params: {
                sys_name: that.xmmc,
                data: response.data.data
              }
            })

        }).catch(function (error) {
          alert('通信错误，请联系管理员')
          console.error(error)
        })

      } else if (key == 4) {  //文件管理
        //当前页面，不做任何反应
      } else if (key == 5) {  //
        this.$router.push({
          name: 'pingfen', params: {
            xmmc: this.xmmc,
          }
        })
      }
    },

    addTemplate () {
      let that = this
      this.loading = true

    }

  },

  mounted: function () {
    //alert(this.xmmc)
    // 用xmmc获取文件系统的信息
    let that = this
    // axios.get('/api/getQuestionnaireList').
    axios.post('/api/search', {
        xmmc: this.xmmc,
      }, {
        headers: {
          'token': window.sessionStorage['token']
        }
      }
    ).then(function (response) {
      if (response.data.retcode == 'ok') {

        that.tableData = response.data.data
        // } else if (response.data.retcode == '用户未登录，请先登录') {
        //alert('111111111111')
      } else {
        alert('系统错误，请联系管理员')
      }
    }).catch(function (error) {
      alert('get通信错误，请联系管理员')
      console.error(error)

    })
  }
}
</script>
