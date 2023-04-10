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
      <el-table-column prop="score" label="预估分数" width="180">
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
              let data_tmp = {
                sys_name:row.xmmc,
                sys_sshy: '0',
                sys_sshy_qt:'',
                sys_xmlx: '',
                sys_unit:'',
                sys_xtjs:'1',
                sys_dbjb:'2',
                sys_mpsc:'1',
                sys_mmzd:'1',
                sys_ysbs:'',
                sys_rzys:'0',
                sys_djbh:'',
                dynamicYwyyForm: {
                  ywyy: [{
                    key:'',
                    value: ''
                  }]
                },
                mpjb_fwd:'1',
                mpjb_ydd: ['1'],
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
                  {ywyy:'',yh:'1',dlfs:['1'],sfrz:['2'],szwl:['1','4'],sl:1,},
                  {ywyy:'',yh:'2',dlfs:['1'],sfrz:['2'],szwl:['4'],sl:1,},
                  {ywyy:'',yh:'3',dlfs:['1'],sfrz:['2'],szwl:['4'],sl:1,},
                  {ywyy:'',yh:'4',dlfs:['4'],sfrz:['2'],szwl:['1'],sl:1,},
                ],     //xtyhqk
                sys_wlhhj:[{
                  jfmc:'',
                  jflx:'2',
                  mj:'2',
                  sfrz:['2'],
                  spjk:'2',
                  zjsb:'1'
                }],    //wlhhj
                sys_wlhtx:[
                  {type:'1',txzt:'1',sfrz:['2'],zysj:'1',sl:'',sm:'',cpdx:'互联网VPN客户端与运维SSL VPN之间的运维通信信道'},
                  {type:'1',txzt:'2',sfrz:['2'],zysj:'1',sl:'',sm:'',cpdx:'互联网PC浏览器与系统之间的通信信道'},
                  {type:'1',txzt:'3',sfrz:['2'],zysj:'1',sl:'',sm:'',cpdx:'互联网PC客户端与系统之间的通信信道'},
                  {type:'1',txzt:'4',sfrz:['2'],zysj:'1',sl:'',sm:'',cpdx:'互联网移动端APP与系统之间的通信信道'},
                  {type:'1',txzt:'5',sfrz:['2'],zysj:'1',sl:'',sm:'',cpdx:'互联网移动端微信小程序与系统之间的通信信道'},
                  {type:'2',txzt:'2',sfrz:['2'],zysj:'1',sl:'',sm:'',cpdx:'办公内网PC浏览器与系统之间的通信信道'},
                  {type:'2',txzt:'3',sfrz:['2'],zysj:'1',sl:'',sm:'',cpdx:'办公内网PC客户端与系统之间的通信信道'},
                ],    //wlhtx
                sys_fwq:[
                  {sbmc:'业务服务器',czxt:'1',sjk:'2',sl:'1',ppxh:'',ycyw:'1',sfrz:['1'],blj:'1',},
                  {sbmc:'数据库服务器',czxt:'1',sjk:'2',sl:'1',ppxh:'',ycyw:'1',sfrz:['1'],blj:'1',}
                ],      //sbhjs_fwq
                sys_sbhjs:[
                  {type:'2',sbmc:'SSL VPN',ppxh:'',sl:'1',gmsf:'2',smzs:'2',ycyw:'1',sfrz:['1'],blj:'1'},
                  {type:'2',sbmc:'IPsec VPN',ppxh:'',sl:'1',gmsf:'2',smzs:'2',ycyw:'1',sfrz:['1'],blj:'1'},
                  {type:'2',sbmc:'堡垒机',ppxh:'',sl:'1',gmsf:'2',smzs:'2',ycyw:'1',sfrz:['1'],blj:'1'},
                ],     //sbhjs_zysb
                sys_ywyy:[
                  {ywyy:'',gnms:'',fwfs:'1',bkfr:'1',jtqk1:'',dzqm:'1',jtqk2:''},
                ],       //yyhsj_ywyy_zysj
                sys_zysj:[
                  {ywyy:'',sjlx:'1',sjnr:'用户名口令、单个用户单位时间内的登录次数和失败次数、单个IP地址单位时间内的登录次数和失败次数、密保问题',
                    bhxq:'机密性、完整性',ccjm:'3',sjl:'',csjm:'4',ll:''},
                  {ywyy:'',sjlx:'2',sjnr:'',ccjm:'3',bhxq:'机密性、完整性',sjl:'',csjm:'4',ll:''},
                  {ywyy:'',sjlx:'3',sjnr:'认证登录日志、配置操作日志、受终端操作日志、管理平台操作日志、涉密数据操作日志、外发数据操作日志',
                    bhxq:'完整性',ccjm:'3',sjl:'',csjm:'4',ll:''},
                  {ywyy:'',sjlx:'4',sjnr:'身份证、手机号、银行账户、存款信息、以往病例',bhxq:'机密性、完整性',ccjm:'3',sjl:'',csjm:'4',ll:''},
                  {ywyy:'',sjlx:'5',sjnr:'档案、合同、证据',bhxq:'不可否认性',ccjm:'3',sjl:'',csjm:'4',ll:''},
                  {ywyy:'',sjlx:'6',sjnr:'安全策略、资源访问控制列表、数据库安全策略、用户权限列表',ccjm:'3',bhxq:'完整性',sjl:'',csjm:'4',ll:''},
                ],       //yyhsj_ywyy_zysjqk
                sbqd: [{
                  id:1,
                  name:'服务器密码机',
                  jbxh:'QuickHSM-HS1000',
                  lb:'硬件',
                  num:2,
                  remark:'一主一备，可按需动态扩展'
                },{
                  id:2,
                  name:'服务器密码机',
                  jbxh:'QuickHSM-HS-XC',
                  lb:'硬件',
                  num:0,
                  remark:'一主一备，可按需动态扩展'
                },{
                  id:3,
                  name:'签名验签服务器',
                  jbxh:'QuickSVS-XC-A',
                  lb:'硬件',
                  num:2,
                  remark:'一主一备，可按需动态扩展'
                },{
                  id:4,
                  name:'签名验签服务器',
                  jbxh:'QuickSVS-XC-B',
                  lb:'硬件',
                  num:0,
                  remark:'一主一备，可按需动态扩展'
                },{
                  id:5,
                  name:'国密安全密码应用中间件',
                  jbxh:'QUICKCSP-500',
                  lb:'软件',
                  num:2,
                  remark:'一主一备，可按需动态扩展'
                },{
                  id:6,
                  name:'国密数字证书',
                  jbxh:'HLJCA-Individual-Cert',
                  lb:'服务',
                  num:9999,
                  remark:''
                },{
                  id:7,
                  name:'智能密码钥匙',
                  jbxh:'SJK19123',
                  lb:'硬件',
                  num:9999,
                  remark:''
                },{
                  id:8,
                  name:'SSL VPN安全网关',
                  jbxh:' ',
                  lb:'硬件',
                  num:2,
                  remark:'一主一备，可按需动态扩展'
                },{
                  id:9,
                  name:'时间戳服务器',
                  jbxh:'QuickTSS-1000',
                  lb:'硬件',
                  num:0,
                  remark:''
                },{
                  id:10,
                  name:'协同签名系统',
                  jbxh:'SRT1934-2000',
                  lb:'硬件',
                  num:0,
                  remark:''
                },{
                  id:11,
                  name:'安全电子签章系统',
                  jbxh:'SC900-2000',
                  lb:'硬件',
                  num:0,
                  remark:''
                },{
                  id:12,
                  name:'可信浏览器',
                  jbxh:' ',
                  lb:'软件',
                  num:9999,
                  remark:''
                },{
                  id:13,
                  name:'IPSec VPN安全网关',
                  jbxh:' ',
                  lb:'硬件',
                  num:0,
                  remark:'每个网络部署一组，一主一备，可按需动态扩展'
                },{
                  id:14,
                  name:'密钥管理系统',
                  jbxh:'QuickKMS',
                  lb:'硬件',
                  num:0,
                  remark:''
                },{
                  id:15,
                  name:'国密堡垒机',
                  jbxh:' ',
                  lb:'硬件',
                  num:0,
                  remark:'一主一备，可按需动态扩展'
                },{
                  id:16,
                  name:'数字证书认证系统',
                  jbxh:'SZT1913-2000',
                  lb:'硬件',
                  num:0,
                  remark:''
                },{
                  id:17,
                  name:'国密设备证书',
                  jbxh:'HLJCA-Equipment-Cert',
                  lb:'软件',
                  num:0,
                  remark:''
                },{
                  id:18,
                  name:'国密SSL证书证书',
                  jbxh:'GDCA-DV-STAR-SSL',
                  lb:'软件',
                  num:0,
                  remark:''
                },{
                  id:19,
                  name:'云服务器密码机',
                  jbxh:'QuickHSM-VSM1000-VSM16',
                  lb:'硬件',
                  num:0,
                  remark:'一主一备，可按需动态扩展'
                },{
                  id:20,
                  name:'云服务器密码机',
                  jbxh:'QuickHSM-VSM1000-VSM32',
                  lb:'硬件',
                  num:0,
                  remark:'一主一备，可按需动态扩展'
                },{
                  id:21,
                  name:'国密安全密码应用中间件（云版）',
                  jbxh:'QUICKCSP-C-B',
                  lb:'软件',
                  num:0,
                  remark:'在有CSMP的情况下选用，具体数量根据实际租户来，若没有租户数量就直接写10个'
                },{
                  id:22,
                  name:'云安全管理平台（CSMP）',
                  jbxh:'QUICKCSP-CSMP',
                  lb:'软件',
                  num:0,
                  remark:''
                },{
                  id:23,
                  name:'国密门禁系统',
                  jbxh:' ',
                  lb:'硬件',
                  num:0,
                  remark:''
                },{
                  id:24,
                  name:'国密电子监控系统',
                  jbxh:' ',
                  lb:'硬件',
                  num:0,
                  remark:''
                },{
                  id:25,
                  name:'密码应用技术服务',
                  jbxh:' ',
                  lb:'服务',
                  num:1,
                  remark:''
                }],
              }
              var jsonData = JSON.stringify(data_tmp)
              console.log(jsonData)
              that.$router.push({name:'questionnaire',params : {
                data:data_tmp
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
