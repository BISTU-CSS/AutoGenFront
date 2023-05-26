<template>
  <div>
    <div v-loading="loading">
      <el-form ref="form" :model="Form" label-width="100px">
        <el-form-item label="项目名称">
          <el-input v-model="xmmc"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="创建人">
          <el-input v-model="cjr"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="指导老师">
          <el-input v-model="zdls"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="项目说明">
          <el-input type="textarea" v-model="xmsm" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" @click="addTemplate">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data () {
    return {
      loading: false,
      Form: {},
      xmmc: '',
      cjr: '',
      zdls: '',
      xmsm: '',
      activeIndex: '1',
    }
  },

  methods: {
    addTemplate () {
      let that = this
      this.loading = true
      axios.post('/api/createQuestionnaire', {
          xmmc: this.xmmc,
          cjr: this.cjr,
          zdls: this.zdls,
          xmsm: this.xmsm
        }, {
          headers: {
            'token': window.sessionStorage['token']
          }
        }
      ).then(function (response) {
        that.loading = false
        if (response.data.retcode == 'ok') {
          that.$message({
            message: '成功',
            type: 'success'
          })
          that.$router.push({path: '/choose'})
        } else {
          alert('请更换项目名称或联系管理员')
        }
      }).catch(function (error) {
        that.loading = false
        alert('通信错误，请联系管理员')
        console.error(error)
      })
    },
    handleSelect (key, keyPath) {
      if (key == 1) {
        this.$router.push({path: '/addque'})
      } else if (key == 2) {
        this.$router.push({path: '/choose'})
      }
    }

  }
}
</script>


