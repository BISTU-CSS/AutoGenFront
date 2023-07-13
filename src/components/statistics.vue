<template>
  <el-container class="Container">

    <el-aside width="150px">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">用户信息</el-menu-item>
        <el-menu-item index="2">统计信息</el-menu-item>
      </el-menu>
    </el-aside>

    <el-main class="main-style">
      <div id="myCharts" ref="charts" class="siggle-chart" style="margin-top:2%; height: 500px;">
      </div>
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

.siggle-chart {
  width: 1100px;
  height: 520px;
  margin: auto;
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
      activeIndex: '2',
      teacher:[],
      count:[]
    }
  },


  methods:{
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
        // window.onresize = function(){
        //   myChart.resize();
        // }
        // window.onresize = myChart.resize;
        window.onresize = function() {
            const wid = that.$refs.optPic.offsetWidth - 500 + 'px'
            myChart.resize({ width: wid })
        }
        // myChart.resize(); //重绘,动态获取options时不会出现渲染异常
      }).catch(function (error){
        console.log(error)
      })
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
    this.setEchartsOptions()
  }

}
</script>
