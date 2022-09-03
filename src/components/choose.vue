<template>
<div>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
  @select="handleSelect" background-color="#545c64" text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">新增项目</el-menu-item>
  <el-menu-item index="2">调研表选择</el-menu-item>
  <el-menu-item index="3" disabled>当前调研表</el-menu-item>
  <el-menu-item index="4" disabled>中间配置</el-menu-item>
  <el-menu-item index="5" disabled>规则配置</el-menu-item>
</el-menu>
<div>
  <br>
  <el-alert title="请谨慎操作" type="warning"
    description="目前并未对用户身份进行限制，故可以操作其他人的全部调研表，请勿随意编辑或删除"
    show-icon>
  </el-alert>
  <br>
</div>
<div class="mkdw">
    <el-table :data="tableData" tooltip-effect="dark" style="width: 100%">
    <el-table-column label="项目名称" width="260">
      <template slot-scope="scope">{{ scope.row.xmmc }}</template>
    </el-table-column>
    <el-table-column prop="cjr" label="创建人" width="100">
    </el-table-column>
    <el-table-column prop="zdls" label="指导老师" width="100">
    </el-table-column>
    <el-table-column prop="xmsm" label="项目说明" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="date" label="创建时间" width="180">
    </el-table-column>
    <el-table-column prop="xgsj" label="修改时间" width="180">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="160">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="primary" size="small">进入</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</div>

  
</template>

<script>
import axios from "axios"
  export default {
    data () {
      return {
        activeIndex: '2',
        tableData:[],
        multipleSelection: []
      }
    },

    methods: {
      handleClick(row) {
        let that = this;
        axios.post('/api/getQuestionnaireResult',{
          xmmc:row.xmmc,
          cjr:row.cjr,
          zdls:row.zdls,
          xmsm:row.xmsm,
        }
        ).then(function(response){
            if(response.data.retcode == "error"){
              that.$router.push({name:'questionnaire',params : {
                data:{
                  sys_name:row.xmmc,
                  sys_sshy: '0',
                  sys_sshy_qt:'',
                  sys_xmlx: '0',
                  sys_unit:'',
                  sys_xtjs:'1',
                  sys_dbjb:'2',
                  sys_mpsc:'1',
                  sys_mmzd:'1',
                  sys_ysbs:'0',
                  sys_rzys:'0',
                  mpjb_fwd:'0',
                  mpjb_ydd: [],
                  mpjb_xy_sfmz:'1',
                  mpjb_sfrz: [],
                  mpjb_wlhhj_sfmz: '1',
                  mpjb_fwfs: [],
                  mpjb_yjzd: '0',
                  mpjb_wlhtx_sfmz: '1',
                  mpjb_sjk: '0',
                  mpjb_sjk_qt: '',
                  mpjb_sslvpn : '0',
                  mpjb_sslvpn_ppxh :'',
                  mpjb_ipsecvpn: '0',
                  mpjb_ipsecvpn_ppxh: '',
                  mpjb_blj: '0',
                  mpjb_blj_ppxh: '',
                  mpjb_sbhjs_sjk_sfmz: '1',
                  mpjb_sbhjs_vpn_sfmz: '1',
                  mpjb_bkfr: '0',
                  mpjb_dzqz: '0',
                  mpjb_cssjl: '',
                  mpjb_ccsjl: '',
                  mpjb_yyhsj_bkfrxydzqz_sfmz: '1',
                  mpjb_yyhsj_cssjlyccsjl_sfmz: '1',
                  sys_xtyh:[
                    {ywyy:'',yh:'1',dlfs:[],sfrz:[],szwl:[],sl:1,},
                    {ywyy:'',yh:'2',dlfs:[],sfrz:[],szwl:[],sl:1,},
                    {ywyy:'',yh:'3',dlfs:[],sfrz:[],szwl:[],sl:1,},
                    {ywyy:'',yh:'4',dlfs:[],sfrz:[],szwl:[],sl:1,},
                  ],     //xtyhqk
                  sys_wlhhj:[{
                      jfmc:'',
                      jflx:'',
                      mj:'2',
                      sfrz:[],
                      spjk:'2',
                      zjsb:''
                  }],    //wlhhj
                  sys_wlhtx:[
                    {type:'1',txzt:'1',sfrz:[],zysj:'',sl:'',sm:'',cpdx:'运维人员经互联网与信息系统后台设备之间的通信信道'},
                    {type:'1',txzt:'2',sfrz:[],zysj:'',sl:'',sm:'',cpdx:'用户使用浏览器经互联网与信息系统服务端之间的通信信道'},
                    {type:'1',txzt:'3',sfrz:[],zysj:'',sl:'',sm:'',cpdx:''},
                    {type:'1',txzt:'4',sfrz:[],zysj:'',sl:'',sm:'',cpdx:'移动APP经互联网与信息系统服务端之间的通信信道'},
                    {type:'1',txzt:'5',sfrz:[],zysj:'',sl:'',sm:'',cpdx:''},
                    {type:'2',txzt:'1',sfrz:[],zysj:'',sl:'',sm:'',cpdx:'(需要修改)运维人员在办公局域网/政务外网/医院内网与信息系统后台设备之间的通信信道'},
                    {type:'2',txzt:'2',sfrz:[],zysj:'',sl:'',sm:'',cpdx:'(需要修改)用户使用浏览器在办公局域网/政务外网/医院内网与信息系统服务端之间的通信信道'},
                    {type:'2',txzt:'3',sfrz:[],zysj:'',sl:'',sm:'',cpdx:''},
                  ],    //wlhtx
                  sys_fwq:[
                    {sbmc:'',czxt:'',sjk:'',sl:'1',ppxh:'',ycyw:'1',sfrz:[],blj:'',},
                  ],      //sbhjs_fwq
                  sys_sbhjs:[
                    {type:'2',sbmc:'SSL VPN',ppxh:'',sl:'1',gmsf:'',smzs:'',ycyw:'',sfrz:[],blj:''},
                    {type:'2',sbmc:'IPsec VPN',ppxh:'',sl:'1',gmsf:'',smzs:'',ycyw:'',sfrz:[],blj:''},
                    {type:'2',sbmc:'堡垒机',ppxh:'',sl:'1',gmsf:'',smzs:'',ycyw:'',sfrz:[],blj:''},
                  ],     //sbhjs_zysb
                  sys_ywyy:[
                    {ywyy:'',gnms:'',fwfs:'',bkfr:'',jtqk1:'',dzqm:'',jtqk2:''},
                  ],       //yyhsj_ywyy_zysj
                  sys_zysj:[
                      {ywyy:'',sjlx:'1',sjnr:'',ccjm:'',sjl:'',csjm:'',ll:''},
                      {ywyy:'',sjlx:'2',sjnr:'',ccjm:'',sjl:'',csjm:'',ll:''},
                      {ywyy:'',sjlx:'3',sjnr:'',ccjm:'',sjl:'',csjm:'',ll:''},
                      {ywyy:'',sjlx:'4',sjnr:'',ccjm:'',sjl:'',csjm:'',ll:''},
                      {ywyy:'',sjlx:'5',sjnr:'',ccjm:'',sjl:'',csjm:'',ll:''},
                      {ywyy:'',sjlx:'6',sjnr:'',ccjm:'',sjl:'',csjm:'',ll:''},
                  ],       //yyhsj_ywyy_zysjqk
                  sbqd: [{
                  id:1,
                  name:'服务器密码机',
                  jbxh:'奇安信QuickHSM-HS1000',
                  lb:'硬件',
                  num:2,
                  remark:'一主一备，可按需动态扩展'
              },{
                  id:2,
                  name:'签名验签服务器',
                  jbxh:'',
                  lb:'硬件',
                  num:2,
                  remark:'一主一备，可按需动态扩展'
              },{
                  id:3,
                  name:'国密安全密码应用中间件',
                  jbxh:'',
                  lb:'软件',
                  num:1,
                  remark:''
              },{
                  id:4,
                  name:'国密数字证书',
                  jbxh:'',
                  lb:'服务',
                  num:9999,
                  remark:''
              },{
                  id:5,
                  name:'智能密码钥匙',
                  jbxh:'',
                  lb:'硬件',
                  num:9999,
                  remark:''
              },{
                  id:6,
                  name:'SSL VPN安全网关',
                  jbxh:'',
                  lb:'硬件',
                  num:2,
                  remark:'一主一备，可按需动态扩展'
              },{
                  id:7,
                  name:'时间戳服务器',
                  jbxh:'',
                  lb:'硬件',
                  num:0,
                  remark:''
              },{
                  id:8,
                  name:'协同签名系统',
                  jbxh:'',
                  lb:'硬件',
                  num:0,
                  remark:''
              },{
                  id:9,
                  name:'安全电子签章系统',
                  jbxh:'',
                  lb:'硬件',
                  num:0,
                  remark:''
              },{
                  id:10,
                  name:'可信浏览器',
                  jbxh:'',
                  lb:'软件',
                  num:0,
                  remark:''
              },{
                  id:11,
                  name:'IPSec VPN安全网关',
                  jbxh:'',
                  lb:'硬件',
                  num:0,
                  remark:'每个网络部署一组，一主一备'
              },{
                  id:12,
                  name:'IPSec VPN桌面盒子',
                  jbxh:'',
                  lb:'硬件',
                  num:0,
                  remark:''
              },{
                  id:13,
                  name:'密钥管理系统',
                  jbxh:'',
                  lb:'硬件',
                  num:0,
                  remark:''
              },{
                  id:14,
                  name:'云服务器密码机',
                  jbxh:'',
                  lb:'硬件',
                  num:0,
                  remark:''
              },{
                  id:15,
                  name:'密码设备管理平台',
                  jbxh:'',
                  lb:'软件',
                  num:0,
                  remark:''
              },{
                  id:16,
                  name:'云安全管理平台（CSMP）',
                  jbxh:'',
                  lb:'软件',
                  num:0,
                  remark:''
              },{
                  id:17,
                  name:'国密堡垒机',
                  jbxh:'',
                  lb:'硬件',
                  num:0,
                  remark:''
              },{
                  id:18,
                  name:'密码应用技术服务',
                  jbxh:'',
                  lb:'服务',
                  num:1,
                  remark:''
              }],
                }
              }})
            }else{
              var jsonData = JSON.stringify(response.data.data)
              console.log(jsonData)
              that.$router.push({name:'questionnaire',params :{
                data:response.data.data
                }})
            }
        }).catch(function(error){
            alert("通信错误，请联系管理员")
            console.error(error)
        })
      },
      handleSelect(key, keyPath) {
        if(key == 1){
            this.$router.push({path:'/addque'});
        }
        else if(key == 2){
            this.$router.push({path:'/choose'});
        }
      }
    },
    mounted: function(){
      let that = this;
      axios.get('/api/getQuestionnaireList').
        then(function(response){
          if(response.data.retcode == "ok"){
              // var jsonData = JSON.stringify(response.data)
              // alert(jsonData)
              that.tableData = response.data.data
          }else{
            alert("系统错误，请联系管理员")
          }
        }).catch(function(error){
            alert("通信错误，请联系管理员")
            console.error(error)
        })
    },
  }
</script>
