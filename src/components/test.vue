<template>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu>
                <el-submenu index="1">
                    <template slot="title">第一部分</template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">基本情况</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">第二部分</template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">第三部分</template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">第四部分</template>
                    <el-menu-item-group>
                        <el-menu-item index="4-1">选项1</el-menu-item>
                        <el-menu-item index="4-2">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">第五部分</template>
                    <el-menu-item-group>
                        <el-menu-item index="5-1">物理和环境</el-menu-item>
                        <el-menu-item index="5-2">网络和通信</el-menu-item>
                        <el-menu-item index="5-3">设备和计算</el-menu-item>
                        <el-menu-item index="5-4">应用和数据</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
            <span>文档自动生成系统</span>
            </el-header>
            <el-main>
            <el-table :data="tableData">
                <el-table-column prop="date" label="日期" width="140">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
            </el-table>
            </el-main>
        </el-container>
    </el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data () {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
      return {
        tableData: Array(20).fill(item)
      }
    }
  }
</script>
