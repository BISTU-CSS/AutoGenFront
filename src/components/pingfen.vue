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

    评分系统 {{xmmc}}<br>
    评分系统使用流程：<br>
    <div align="middle">
      <img :src="require('@/assets/pf.png')">
    <br><br>
    <div>
      <el-button type="primary">下载初始评分excel</el-button>
      <el-button type="primary">上传修改后的评分excel</el-button>
    </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      activeIndex:'5',
      xmmc:this.$route.params.xmmc,

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
      if (!isJPG && !isPNG && !isPDF && isXLSX && isXLS && isDOC && isDOCX) {
        this.$message.error('上传文件格式只能是 JPG PNG TXT PDF XLS XLSX DOC DOCX格式!');
      }
      if (!isLt20M) {
        this.$message.error('上传文件大小不能超过 20MB!');
      }
      return (isJPG || isPNG || isPDF || isXLSX || isXLS || isDOC || isDOCX) && isLt20M;
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
