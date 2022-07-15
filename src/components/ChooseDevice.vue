<template>
  <div class="mkdw">
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="产品名称"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="品牌"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="产品参考型号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="数量"
      width="120">
    </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="choose()">确定提交</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      // 在这里调用数据库去获取信息
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎d',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection () {
        this.$refs.multipleTable.clearSelection()
      },
      choose () {
        var jsonData = JSON.stringify(this.$refs.multipleTable.selection)
        alert(jsonData)
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      }
    }
  }
</script>
