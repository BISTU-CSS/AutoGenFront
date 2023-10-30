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
      <el-menu-item index="1" > <i class="el-icon-back" style="font-size: 20px; cursor: pointer;"></i>返回主页</el-menu-item>
      <el-menu-item index="2" :disabled=true>项目基本信息</el-menu-item>
      <el-menu-item index="3">当前调研表</el-menu-item>
      <el-menu-item index="4">文件管理</el-menu-item>
      <el-menu-item index="5">评分系统</el-menu-item>
    </el-menu>

    <div>
    <span class="large-text">项目名称: {{xmmc}}</span><br>
    </div>
    
    <div align="middle">
    <img :src="require('@/assets/pf.png')" class="resized-image">
    <div>
      <i class="down" style="color: rgb(0, 187, 255);">
      <el-button type="primary" @click ="culateScore" >下载初始评分excel</el-button>
    </i>
<!--      <el-button type="primary" @click ="updateScore">上传修改后的评分excel</el-button>-->
      <div id="app">
        <!-- <h2>{{ xmmc }}上传修改后的评分excel</h2> -->

        <div>
          <el-upload
            ref="videoUpload"
            action=""
            multiple
            :auto-upload="false"
            :on-change="uploadHOCK"
            :before-upload="beforeAvatarUpload"
          >
            <i class="el-icon-upload" style="font-size: 80px; color: rgb(0, 187, 255);"></i>
            <div class="el-upload__text">上传修改后的评分表<em>点击上传</em></div>
<!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png/txt/pdf/excel/word文件，且不超过20MB</div>-->
          </el-upload>
        </div>
        
        <div>
        <!-- 示例：使用表格展示数据 -->
        <table class="bordered-table">
            <thead>
                <tr>
                    <th>物理和环境</th>
                    <th>网络和通信</th>
                    <th>设备和计算</th>
                    <th>应用和数据</th>
                    <th>总分</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ data[0] }}</td>
                    <td>{{ data[1] }}</td>
                    <td>{{ data[2] }}</td>
                    <td>{{ data[3] }}</td>
                    <td>{{ total }}</td>
                </tr>
            </tbody>
        </table>
    </div>
   
        

      </div>
    </div>
    </div>
  </div>

</template>
<style scoped>
.large-text {
    font-size: 24px;  /* 或者您想要的任何其他大小 */
}
.resized-image {
    width: 33%;  /* 图片将占据其容器宽度的50% */
}
.bordered-table {
    border-collapse: collapse;  /* 使边框合并 */
    width: 100%;  /* 表格宽度 */
}

.bordered-table th, .bordered-table td {
    border: 1px solid black;  /* 单元格边框 */
    padding: 8px;  /* 单元格内边距 */
    text-align: left;  /* 文本左对齐 */
}

.bordered-table th {
    background-color: #f2f2f2;  /* 表头背景颜色 */
}
</style>



<script>
import axios from 'axios'

export default {
  data () {
    return {
      activeIndex:'5',
      xmmc:this.$route.params.xmmc,
      data:[],
      total: 0,
    }
  },

  methods: {
    beforeAvatarUpload(file) {
      //alert(file.type)
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isPDF = file.type === 'application/pdf';
      const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const isXLS = file.type === 'application/vnd.ms-excel';
      const isDOCX = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const isDOC = file.type === 'application/msword';
      const isLt20M = file.size / 1024 / 1024 < 20;
      // if (!isJPG && !isPNG && !isPDF && isXLSX && isXLS && isDOC && isDOCX) {
      //   this.$message.error('上传文件格式只能是 JPG PNG TXT PDF XLS XLSX DOC DOCX格式!');
      // }
      // if (!isLt20M) {
      //   this.$message.error('上传文件大小不能超过 20MB!');
      // }
      return (isJPG || isPNG || isPDF || isXLSX || isXLS || isDOC || isDOCX) && isLt20M;
    },

    culateScore(){
      let that = this
      this.loading = true
      axios.post('/api/culate', {
        xmmc:this.xmmc
      }, {
        responseType: 'blob',
        headers:{
          'token': window.sessionStorage['token']
        }
      }).then(function (response) {
        that.loading = false
        var aTag = document.createElement('a')
        let tmp = response.data
        aTag.download = that.xmmc + '评分表.xlsx'
        aTag.href = URL.createObjectURL(tmp)
        aTag.click()
      }).catch(function (error) {
        that.loading = false
        alert("通信错误，请联系管理员")
      })
    },

    uploadHOCK(file){
      console.log(file)
      console.log(this.xmmc)
      var form_ = new FormData()
      form_.append('file', file.raw)
      form_.append('xmmc', this.xmmc)
      let self = this;
      axios.post(
        '/api/FSdownload',
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
          self.data = response.data.data;
          self.total = self.data.reduce((acc, curr) => acc + curr, 0);

        } else {
          alert('上传失败！')
        }
      }).catch(function (error) {
        alert('通信错误，请联系管理员')
        console.error(error)
      })
    },

    handleSuccess(result) {
      alert("上传成功")
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
          that.$router.push({
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
        this.$router.push({
          name: 'upload', params: {
            xmmc: this.xmmc,
          }
        })
      } else if (key == 5) {  //
        //当前页面，不做任何反应
      }
    },

    addTemplate () {
      let that = this
      this.loading = true

    }
  },

  mounted: function () {
    // alert(this.xmmc)
    // 用xmmc获取文件系统的信息
  }
}
</script>
