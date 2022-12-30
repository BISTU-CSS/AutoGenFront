<template>
  <div v-loading="loading">

    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">新增项目</el-menu-item>
      <el-menu-item index="2">调研表选择</el-menu-item>
      <el-menu-item index="3">当前调研表</el-menu-item>
      <el-menu-item index="4" disabled>中间配置</el-menu-item>
      <el-menu-item index="5" disabled>规则配置</el-menu-item>
    </el-menu>
    <el-form :model="Form" label-width="0px" label-position="left">
      <el-form-item>
        系统名称&nbsp;&nbsp;
        <el-input v-model="sys_name" :disabled="true" style="width: 30%"></el-input>
        &nbsp;&nbsp;<el-button type="success" @click="saveChoose">保存表单</el-button>
        &nbsp;<el-button @click="submit" type="primary">生成方案</el-button>
        &nbsp;<el-button @click="generateSBQD" type="primary">生成设备清单</el-button>
        &nbsp;<el-button @click="xmpf" type="danger">项目评分</el-button>
      </el-form-item>
    </el-form>
    *号为必填
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本情况" name="one">
        <el-form :model="Form" label-width="120px" label-position="left">
          <el-form-item label="*责任单位">
            <el-input v-model="sys_unit" placeholder="请输入责任单位" style="width: 20%"></el-input>
          </el-form-item>
          <br>
          <br>
          <el-form-item label="*确定所属行业">
            <el-radio-group v-model="sys_sshy">
              <el-radio label="1">公安</el-radio>
              <el-radio label="2">医疗</el-radio>
              <el-radio label="3">电信</el-radio>
              <el-radio label="4">金融</el-radio>
              <el-radio label="5">能源</el-radio>
              <el-radio label="6">教育</el-radio>
              <el-radio label="7">交通</el-radio>
              <el-radio label="8">政务</el-radio>
              <el-radio label="9">工控</el-radio>
              <el-radio label="10">其他
                <el-input v-model="sys_sshy_qt" style="width: 140px" size="mini" placeholder=""></el-input>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <br>
          <br>
          <el-form-item label="*确定项目类型">
            <el-radio-group v-model="sys_xmlx">
              <el-radio label="1">单系统模式:建设的密码资源服务于单个信息系统</el-radio>
              <br>
              <el-radio label="2">多系统模式:共享建设的密码资源,同时支撑多个信息系统,一般一个主体建设;</el-radio>
              <br>
              <el-radio label="3">云租户模式:为云平台建设云密码资源池,为云租户系统动态分配密码资源;</el-radio>
              <br>
              <el-radio label="4">云租户+云平台模式:为云平台建设云密码资源池,为云租户系统动态分配密码资源，同时为云平台建设密码资源，保障云平台自身过密评。</el-radio>
            </el-radio-group>
          </el-form-item>
          <br>
          <br>
          <el-row>
            <el-col span="5">
              <el-form-item label="*系统建设">
                <el-radio-group v-model="sys_xtjs">
                  <el-radio label="1">未建设</el-radio>
                  <br>
                  <el-radio label="2">正在建设</el-radio>
                  <br>
                  <el-radio label="3">已上线</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="5">
              <el-form-item label="*等保级别">
                <el-radio-group v-model="sys_dbjb">
                  <el-radio label="1">二级</el-radio>
                  <br>
                  <el-radio label="2">三级</el-radio>
                  <br>
                  <el-radio label="3">四级</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="5">
              <el-form-item label="*密评首次">
                <el-radio-group v-model="sys_mpsc">
                  <el-radio label="1">首次</el-radio>
                  <br>
                  <el-radio label="2">做过,未通过</el-radio>
                  <br>
                  <el-radio label="3">做过,已通过</el-radio>
                  <br>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="5">
              <el-form-item label="*密码制度">
                <el-radio-group v-model="sys_mmzd">
                  <el-radio label="1">未建设</el-radio>
                  <br>
                  <el-radio label="2">已建设</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <br>
          <br>
          <el-row>
            <el-col span="5">
              <el-form-item label="*云上部署">
                <el-radio-group v-model="sys_ysbs" @change="changeRZYSbyYSBS">
                  <el-radio label="1">在云上</el-radio>
                  <el-radio label="2">不在云上</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col span="5">
              <el-form-item label="若在云上">
                <el-radio-group v-model="sys_rzys" :disabled="sys_rzys_disableb">
                  <el-radio label="1">云平台已过密评</el-radio>
                  <el-radio label="2">云平台尚未过密评</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col span="5">
              <el-form-item label="*服务端">
                <el-radio-group v-model="mpjb_fwd">
                  <el-radio label="1">HTTPS</el-radio>
                  <br>
                  <el-radio label="2">HTTP</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col span="5">
              <el-form-item label="*移动端">
                <el-checkbox-group v-model="mpjb_ydd">
                  <el-checkbox label="1">无</el-checkbox>
                  <br>
                  <el-checkbox label="2">手机APP</el-checkbox>
                  <br>
                  <el-checkbox label="3">微信小程序</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="定级预备编号">
            <el-input v-model="sys_djbh" placeholder="请输入网络保护等级的定级预备编号" style="width: 20%"></el-input>
          </el-form-item>
          <br>
          <el-form-item
            v-for="(i, index) in dynamicYwyyForm.ywyy"
            :label="'业务应用' + index"
            :key="i.key"
            :prop="'ywyy.' + index + '.value'"
          >
            <el-input v-model="i.value" style="width: 400px" @change="dynamicYwyyChange(index,i)"></el-input>
            <el-button @click.prevent="removeDomain(i)">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="addDomain">新增业务</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane disabled label="调研简表" name="two">
        <el-row>
          <el-col :span="4">
            <div class="grid-header bg-dark">
              模块
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-header bg-dark">
              假设条件
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-header bg-dark">
              问题及选项
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-header bg-dark">
              是否满足
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-light">
              系统
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-light">
              1)只有1个对外web服务;<br>
              2)用户通过“用户名+口令”做身份认证;
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-light">
              <el-form :model="Form" label-width="100px" label-position="left">
                <el-form-item label="服务端">
                  <el-radio-group v-model="mpjb_fwd">
                    <el-radio label="1">HTTPS</el-radio>
                    <el-radio label="2">HTTP</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="移动端">
                  <el-checkbox-group v-model="mpjb_ydd">
                    <el-checkbox label="1">无</el-checkbox>
                    <el-checkbox label="2">手机APP</el-checkbox>
                    <el-checkbox label="3">微信小程序</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-light">
              <br>
              <el-radio-group v-model="mpjb_xy_sfmz" :disabled="true">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-light">
              物理和环境
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-light">
              1)系统部署在1个物理机房;<br>
              2)机房有门禁，但是非国密;<br>
              3)机房有视频监控，但是非国密;
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-light">
              <el-form :model="Form" label-width="100px" label-position="left" :disabled="true">
                <el-form-item label="门禁身份认证">
                  <el-checkbox-group v-model="mpjb_sfrz">
                    <el-checkbox label="1">人工登记</el-checkbox>
                    <el-checkbox label="2">IC卡</el-checkbox>
                    <el-checkbox label="3">生物技术(指纹、人脸、虹膜)</el-checkbox>
                    <el-checkbox label="4">口令</el-checkbox>
                    <el-checkbox label="5">手机短信</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-light">
              <br>
              <el-radio-group v-model="mpjb_wlhhj_sfmz" :disabled="true">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content-big bg-light">
              网络和通信
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content-big bg-light">
              1)允许用户从互联网登录系统;<br>
              2)允许运维人员从互联网远程管理;<br>
              3)都是通过“用户名+口令”做身份认证;<br>
              4)和其他业务系统无数据交互，或者有数据交互但通道都受保护，不经互联网;
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content-big bg-light">
              <el-form :model="Form" label-width="140px" label-position="left">
                <el-form-item label="公众用户访问方式">
                  <el-checkbox-group v-model="mpjb_fwfs" :disabled="true">
                    <el-checkbox label="1">不支持</el-checkbox>
                    <el-checkbox label="2">PC浏览器</el-checkbox>
                    <el-checkbox label="3">手机APP</el-checkbox>
                    <el-checkbox label="4">公众号</el-checkbox>
                    <el-checkbox label="5">微信小程序</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="硬件终端">
                  <el-radio-group v-model="mpjb_yjzd" :disabled="true">
                    <el-radio label="1">无</el-radio>
                    <el-radio label="2">视频摄像头</el-radio>
                    <el-radio label="3">传感器</el-radio>
                    <el-radio label="4">手持办公设备</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content-big bg-light">
              <br>
              <el-radio-group v-model="mpjb_wlhtx_sfmz" :disabled="true">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content-large bg-light">
              设备和计算
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content-large bg-light">
              1)系统部署在若干台应用服务器+数据库服务器上，都是Linux系统;<br>
              2)没有专业密码设备;<br>
              3)没有统一身份认证、动态口令等系统;<br>
              4)若有VPN、堡垒机，不支持国密算法;
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content-large bg-light">
              <el-form :model="Form" label-width="100px" label-position="left">
                <br>
                <el-form-item label="数据库">
                  <el-radio-group v-model="mpjb_sjk" :disabled="true">
                    <el-radio label="1">Oracle</el-radio>
                    <el-radio label="2">SQL Server</el-radio>
                    <el-radio label="3">MySQL</el-radio>
                    <el-radio label="4">其它：
                      <el-input v-model="mpjb_sjk_qt" style="width: 140px" size="mini" placeholder=""
                                :disabled="true"></el-input>
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="SSL VPN">
                  <el-radio-group v-model="mpjb_sslvpn" :disabled="true">
                    <el-radio label="1">无</el-radio>
                    <el-radio label="2">有，品牌型号
                      <el-input v-model="mpjb_sslvpn_ppxh" style="width: 140px" size="mini" placeholder=""
                                :disabled="true"></el-input>
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="IPSec VPN">
                  <el-radio-group v-model="mpjb_ipsecvpn" :disabled="true">
                    <el-radio label="1">无</el-radio>
                    <el-radio label="2">有，品牌型号
                      <el-input v-model="mpjb_ipsecvpn_ppxh" style="width: 140px" size="mini" placeholder=""
                                :disabled="true"></el-input>
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="堡垒机">
                  <el-radio-group v-model="mpjb_blj" :disabled="true">
                    <el-radio label="1">无</el-radio>
                    <el-radio label="2">有，品牌型号
                      <el-input v-model="mpjb_blj_ppxh" style="width: 140px" size="mini" placeholder=""
                                :disabled="true"></el-input>
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content-large bg-light">
              <br>数据库:<br>
              <el-radio-group v-model="mpjb_sbhjs_sjk_sfmz" :disabled="true">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
              <br><br><br>
              VPN:<br>
              <el-radio-group v-model="mpjb_sbhjs_vpn_sfmz" :disabled="true">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="grid-content-large bg-light">
              应用和数据
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content-large bg-light">
              1)业务包含重要数据，比如登录账号口令数据、各类日志数据、个人敏感信息等;<br>
              2)重要数据主要是数据库表字段和文件两种形式;<br>
              3)未采用国密算法、合规密码产品加密；
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content-large bg-light">
              <el-form :model="Form" label-width="100px" label-position="left">
                <br>
                <el-form-item label="不可否认性">
                  <el-radio-group v-model="mpjb_bkfr" :disabled="true">
                    <el-radio label="1">无需求</el-radio>
                    <el-radio label="2">有需求</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="电子签章">
                  <el-radio-group v-model="mpjb_dzqz" :disabled="true">
                    <el-radio label="1">无需求</el-radio>
                    <el-radio label="2">有需求</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="传输数据量">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="mpjb_cssjl" :disabled="true">
                  </el-input>
                </el-form-item>
                <el-form-item label="传输数据量">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="mpjb_ccsjl" :disabled="true">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content-large bg-light">
              <br>不可否认性与电子签章:<br>
              <el-radio-group v-model="mpjb_yyhsj_bkfrxydzqz_sfmz" :disabled="true">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
              <br><br>
              传输数据量与存储数据量:<br>
              <el-radio-group v-model="mpjb_yyhsj_cssjlyccsjl_sfmz" :disabled="true">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>

      </el-tab-pane>
      <el-tab-pane label="系统用户情况" name="three">
        <el-form label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="系统用户情况">
                <el-button type="primary" size="mini" @click="handlextyhqk()" icon="el-icon-plus"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="xtyhqk" border :header-cell-style="{background:'#b8bbbf',color:'#606266'}">
              <el-table-column align="center" label="*业务应用" width="180px">
                <template slot-scope="scope">
                  <el-select allow-create
                             filterable v-model="scope.row.ywyy" placeholder="请选择">
                    <el-option
                      v-for="item in dynamicYwyyForm.ywyy"
                      :key="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="*用户/角色" width="140px">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.yh" placeholder="请选择">
                    <el-option
                      v-for="item in xtyhqk_yh_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*登录方式(多选)" width="300px">
                <template slot-scope="scope">
                  <el-checkbox-group v-model="scope.row.dlfs">
                    <el-checkbox
                      v-for="item in xtyhqk_dlfs_options"
                      :key="item.value"
                      :label="item.value"
                    >{{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*身份认证方式(多选)">
                <template slot-scope="scope">
                  <el-checkbox-group v-model="scope.row.sfrz">
                    <el-checkbox
                      v-for="item in xtyhqk_sfrz_options"
                      :key="item.value"
                      :label="item.value"
                    >{{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*所在网络(多选)" width="300px">
                <template slot-scope="scope">
                  <el-checkbox-group v-model="scope.row.szwl">
                    <el-col v-for="item in xtyhqk_szwl_options" :key="item.value" span="10">
                      <div>
                        <el-checkbox :label="item.value">{{ item.label }}
                        </el-checkbox>
                        <br>
                      </div>
                    </el-col>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column align="center" label="数量" width="160px">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.sl" :min="1" :max="100000" size="small"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="xtyhqkDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
        <div>
          <br>
          <el-alert title="请注意业务应用的对应关系" type="warning"
                    description="请保证系统用户情况中的【业务应用】与应用和数据（业务应用、重要数据）中的【业务应用】保持一致"
                    show-icon>
          </el-alert>
          <br>
        </div>
      </el-tab-pane>
      <el-tab-pane label="物理和环境" name="four">
        <el-form label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="物理和环境">
                <el-button type="primary" size="mini" @click="handlewlhhj()" icon="el-icon-plus"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="wlhhj" border :header-cell-style="{background:'#b8bbbf',color:'#606266'}">
              <el-table-column align="center" label="*机房名称" width="300px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.jfmc" placeholder="请输入机房名称"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="*机房类型" width="300px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.jflx">
                    <el-radio label="1">新机房</el-radio>
                    <el-radio label="2">旧机房</el-radio>
                    <el-radio label="3">租机房</el-radio>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*门禁" width="300px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.mj">
                    <el-row>
                      <el-col span="8">
                        <el-radio label="1">国密电子</el-radio>
                        <el-radio label="2">普通电子</el-radio>
                      </el-col>
                      <el-col span="6">
                        <el-radio label="3">非电子</el-radio>
                        <el-radio label="4">无</el-radio>
                      </el-col>
                    </el-row>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*身份认证方式(多选)">
                <template slot-scope="scope">
                  <el-checkbox-group v-model="scope.row.sfrz">
                    <el-checkbox
                      v-for="item in wlhhj_sfrz_options"
                      :key="item.value"
                      :label="item.value"
                    >{{ item.label }}
                    </el-checkbox>


                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*视频监控" width="120px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.spjk">
                    <div>
                      <el-radio label="1">国密</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="2">普通</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="3">无</el-radio>
                    </div>
                    <br>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*是否允许增加设备" width="120px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.zjsb">
                    <div>
                      <el-radio label="1">允许</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="2">不允许</el-radio>
                    </div>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="wlhhjDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>

      </el-tab-pane>
      <el-tab-pane label="网络和通信" name="five">
        测评对象是跨网络访问的通信信道，特别指从不受保护的网络区域访问被测系统，一般从通信主体和所在网络类型来分析，网络类型分为互联网(完全公开)、办公局域网(如公务员办公接入政务外网、医生办公接入医院局域网等)、内网(如机房内网络、某些专线网络)等。如果通信主体是XXX机房、XXX设备、XXX系统，请手动输入并注意一定要具有"机房"、"设备"、"系统"关键词。只有互联网有移动端对应通道。
        <el-form label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="网络和通信">
                <el-button type="primary" size="mini" @click="handlewlhtx()" icon="el-icon-plus"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="wlhtx" border :header-cell-style="{background:'#b8bbbf',color:'#606266'}">
              <el-table-column align="center" label="*网络类型" width="145px">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.type" placeholder="请选择">
                    <el-option
                      v-for="item in wlhtx_type_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="*通信主体（可手动输入）" width="160px">
                <template slot-scope="scope">
                  <el-select allow-create
                             filterable v-model="scope.row.txzt" placeholder="请选择">
                    <el-option
                      v-for="item in wlhtx_txzt_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="*测评对象">
                <template slot-scope="scope">
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="scope.row.cpdx">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*身份认证方式(多选)">
                <template slot-scope="scope">
                  <el-checkbox-group v-model="scope.row.sfrz">
                    <el-col span="25">
                      <el-checkbox
                        v-for="item in wlhtx_sfrz_options"
                        :key="item.value"
                        :label="item.value"
                      >{{ item.label }}
                      </el-checkbox>
                    </el-col>

                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column align="center" label="*是否涉及重要数据传输" width="80px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.zysj">
                    <div>
                      <el-radio label="1">是</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="2">否</el-radio>
                    </div>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="center" label="数量/流量" width="120px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sl" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="说明" width="160px">
                <template slot-scope="scope">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="scope.row.sm">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="wlhtxDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="设备和计算（服务器）" name="six">
        测评对象是设备,需要了解该信息系统涉及哪些设备？同品牌型号的专用设备归为一个测评对象,相同硬件、软件的服务器可归为一个测评对象。
        <br>
        <el-form label-width="310px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="设备和计算：目标信息系统所在的服务器情况">
                <el-button type="primary" size="mini" @click="handlesbhjsfwq()" icon="el-icon-plus"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="sbhjs_fwq" border :header-cell-style="{background:'#b8bbbf',color:'#606266'}">
              <el-table-column align="center" label="*设备名称">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sbmc" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="品牌型号">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.ppxh" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="数量" width="160px">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.sl" :min="1" :max="100000" size="small"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*操作系统" width="150px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.czxt">
                    <div>
                      <el-radio label="1">Linux</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="2">Windows</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="3">UNIX</el-radio>
                    </div>
                    <br>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*数据库" width="250px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.sjk">
                    <el-col span="12">
                      <el-radio label="1">Oracle</el-radio>
                      <el-radio label="2">MySQL</el-radio>
                      <el-radio label="3">SQL Server</el-radio>
                      <el-radio label="7">无</el-radio>
                    </el-col>
                    <el-col span="8">
                      <el-radio label="4">MongoDB</el-radio>
                      <el-radio label="5">DB2</el-radio>
                      <el-radio label="6">PostgreSQL</el-radio>
                    </el-col>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="center" label="*是否支持远程运维" width="120px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.ycyw">
                    <div>
                      <el-radio label="1">是</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="2">否</el-radio>
                    </div>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*运维人身份认证(多选)" >
                <template slot-scope="scope">
                  <el-checkbox-group v-model="scope.row.sfrz">
                      <el-checkbox
                        v-for="item in sbhjs_sfrz_options"
                        :key="item.value"
                        :label="item.value"
                      >{{ item.label }}
                      </el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column align="center" label="*通过堡垒机管理" width="120px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.blj">
                    <div>
                      <el-radio label="1">是</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="2">否</el-radio>
                    </div>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="sbhjs_fwqDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="设备和计算（专用设备）" name="seven">
        密码产品/设备包括：服务器密码机、云密码机、签名验签服务器、时间戳服务器、证书认证系统、(手机盾)协同签名系统、安全电子签章系统、密钥管理系统等;具有密码功能的网络及安全设备包括：SSL VPN、IPSec
        VPN、堡垒机等; 采用密码技术的其他产品包括：动态口令系统、统一身份认证系统、特权账号管理系统等，没有密码功能的网络及安全设备包括路由器、交换机、防火墙、入侵检测系统等，虚拟设备和系统包括云计算平台、超融合一体机等。
        <br>
        <el-form label-width="310px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="设备和计算：目标系统所涉及的专用设备情况">
                <el-button type="primary" size="mini" @click="handlesbhjszysb()" icon="el-icon-plus"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="sbhjs_zysb" border :header-cell-style="{background:'#b8bbbf',color:'#606266'}">
              <el-table-column align="center" label="*设备类型" width="230px">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.type" placeholder="请选择">
                    <el-option
                      v-for="item in sbhjs_type_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="*设备名称">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sbmc" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="品牌型号">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.ppxh" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="数量" width="160px">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.sl" :min="1" :max="100000" size="small"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*是否支持国密算法" width="120px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.gmsf">
                    <el-col span="20">
                      <el-radio label="1">是</el-radio>
                    </el-col>
                    <el-col span="1">
                      <el-radio label="2">否</el-radio>
                    </el-col>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*是否有商密证书" width="120px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.smzs">
                    <el-col span="20">
                      <el-radio label="1">是</el-radio>
                    </el-col>
                    <el-col span="1">
                      <el-radio label="2">否</el-radio>
                    </el-col>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*是否支持远程运维" width="120px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.ycyw">
                    <el-col span="20">
                      <el-radio label="1">是</el-radio>
                    </el-col>
                    <el-col span="1">
                      <el-radio label="2">否</el-radio>
                    </el-col>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*运维人身份认证(多选)">
                <template slot-scope="scope">
                  <el-checkbox-group v-model="scope.row.sfrz">
                    <el-checkbox
                      v-for="item in sbhjs_sfrz_options"
                      :key="item.value"
                      :label="item.value">
                        {{ item.label }}
                    </el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-table-column>
              <el-table-column align="center" label="*通过堡垒机管理" width="120px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.blj">
                    <div>
                      <el-radio label="1">是</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="2">否</el-radio>
                    </div>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="sbhjs_zysbDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="应用和数据（业务应用）" name="eight">
        业务应用，按该系统对外提供的服务或子系统，包括且不限于Web服务、数据服务、接口服务等
        <br>
        <el-form label-width="310px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="应用和数据：测评对象是业务应用以及重要数据">
                <el-button type="primary" size="mini" @click="handleyyhsjywyy()" icon="el-icon-plus"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="yyhsj_ywyy_zysj" border :header-cell-style="{background:'#b8bbbf',color:'#606266'}">
              <el-table-column align="center" label="*业务应用" width="230px">
                <template slot-scope="scope">
                  <el-select allow-create
                             filterable v-model="scope.row.ywyy" placeholder="请选择">
                    <el-option
                      v-for="item in dynamicYwyyForm.ywyy"
                      :key="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="功能描述" width="250px">
                <template slot-scope="scope">
                  <el-input type="textarea" :rows="4" placeholder="请输入内容"
                            v-model="scope.row.gnms"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*对外服务方式" width="100px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.fwfs">
                    <div>
                      <el-radio label="1">HTTPS</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="2">HTTP</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="3">其它</el-radio>
                    </div>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*操作需要不可否认性" width="160px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.bkfr">
                    <div>
                      <el-radio label="1">没有需求</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="2">有需求&未做</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="3">有需求&已做</el-radio>
                    </div>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作需要不可否认性的具体情况">
                <template slot-scope="scope">
                  <el-input type="textarea" :rows="4" placeholder="请输入内容"
                            v-model="scope.row.jtqk1"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*需要电子签名&电子印章" width="160px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.dzqm">
                    <div>
                      <el-radio label="1">没有需求</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="2">有需求&未做</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="3">有需求&已做</el-radio>
                    </div>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="center" label="需要电子签名&电子印章的具体情况">
                <template slot-scope="scope">
                  <el-input type="textarea" :rows="4" placeholder="请输入内容"
                            v-model="scope.row.jtqk2"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="yyhsj_ywyy_zysjDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
        <div>
          <br>
          <el-alert title="请注意业务应用的对应关系" type="warning"
                    description="请保证系统用户情况中的【业务应用】与应用和数据（业务应用、重要数据）中的【业务应用】保持一致"
                    show-icon>
          </el-alert>
          <br>
        </div>
      </el-tab-pane>
      <el-tab-pane label="应用和数据（重要数据）" name="nine">
        <el-form label-width="110px">
          <el-row>
            <el-col :span="24">
              必须有访问控制信息
              <el-form-item label="重要数据情况">
                <el-button type="primary" size="mini" @click="handleyyhsjzysj()" icon="el-icon-plus"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="yyhsj_ywyy_zysjqk" border :header-cell-style="{background:'#b8bbbf',color:'#606266'}">
              <el-table-column align="center" label="*业务应用" width="230px">
                <template slot-scope="scope">
                  <el-select allow-create
                             filterable v-model="scope.row.ywyy" placeholder="请选择">
                    <el-option
                      v-for="item in dynamicYwyyForm.ywyy"
                      :key="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="*数据类型" width="240px">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.sjlx" placeholder="请选择">
                    <el-option
                      v-for="item in zysjqk_sjlx_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="数据内容" >
                <template slot-scope="scope">
                  <el-input type="textarea" :rows="4"
                            placeholder='请输入内容'
                            v-model="scope.row.sjnr"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="保护需求" >
                <template slot-scope="scope">
                  <el-input type="textarea" :rows="4" placeholder='请输入内容'
                            v-model="scope.row.bhxq"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*存储加密" width="100px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.ccjm">
                    <div>
                      <el-radio label="1">国密</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="2">非国密</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="3">未加密</el-radio>
                    </div>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="center" label="数据量" width="100px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.sjl" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="left" header-align="center" label="*传输加密" width="100px">
                <template slot-scope="scope">
                  <el-radio-group v-model="scope.row.csjm">
                    <div>
                      <el-radio label="1">不涉及</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="2">国密</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="3">非国密</el-radio>
                    </div>
                    <br>
                    <div>
                      <el-radio label="4">未加密</el-radio>
                    </div>
                  </el-radio-group>
                </template>
              </el-table-column>
              <el-table-column align="center" label="流量" width="100px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.ll" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="yyhsj_ywyy_zysjqkDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
        <div>
          <br>
          <el-alert title="请注意业务应用的对应关系" type="warning"
                    description="请保证系统用户情况中的【业务应用】与应用和数据（业务应用、重要数据）中的【业务应用】保持一致"
                    show-icon>
          </el-alert>
          <br>
        </div>
      </el-tab-pane>
      <el-tab-pane label="产品清单" name="ten">
        <div>
          <br>
          <el-alert title="设置数量为9999表示按需（可手动输入）" type="info"
                    show-icon>
          </el-alert>
          <br>
        </div>
        <el-table border :data="sbqd">
          <el-table-column label="序号" align="center" type="index" width="50"/>
          <el-table-column label="设备名称" align="center" prop="name"/>
          <el-table-column label="基本型号" align="center" prop="jbxh"/>
          <el-table-column label="类别" width="120px" align="center" prop="lb"/>
          <el-table-column label="数量" width="180px" align="center" prop="num">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.num"
                size="small"
              />
            </template>
          </el-table-column>
          <el-table-column label="备注" width="180px" align="center" prop="num">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" placeholder="备注"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
//14.业务和应用中，重要数据情况。 全都列出来+选项是否
import axios from 'axios'

export default {
  data () {
    return {
      loading: false,
      score: '',
      id: '',
      activeIndex: '3',
      Form: {},
      activeName: 'one',

      //基本情况
      sys_sshy: this.$route.params.data.sys_sshy,
      sys_sshy_qt: this.$route.params.data.sys_sshy_qt,
      sys_xmlx: this.$route.params.data.sys_xmlx,
      sys_name: this.$route.params.data.sys_name,
      sys_unit: this.$route.params.data.sys_unit,
      sys_xtjs: this.$route.params.data.sys_xtjs,
      sys_dbjb: this.$route.params.data.sys_dbjb,
      sys_mpsc: this.$route.params.data.sys_mpsc,
      sys_mmzd: this.$route.params.data.sys_mmzd,
      sys_ysbs: this.$route.params.data.sys_ysbs,
      sys_rzys: this.$route.params.data.sys_rzys,
      sys_djbh: this.$route.params.data.sys_djbh,
      dynamicYwyyForm: this.$route.params.data.dynamicYwyyForm,
      sys_rzys_disableb: Boolean(this.$route.params.data.sys_ysbs - 1),
      //调研简表--系统
      mpjb_fwd: this.$route.params.data.mpjb_fwd,
      mpjb_ydd: this.$route.params.data.mpjb_ydd,
      mpjb_xy_sfmz: this.$route.params.data.mpjb_xy_sfmz,
      //调研简表--物理和环境
      mpjb_sfrz: this.$route.params.data.mpjb_sfrz,
      mpjb_wlhhj_sfmz: this.$route.params.data.mpjb_wlhhj_sfmz,
      //调研简表--网络和通信
      mpjb_fwfs: this.$route.params.data.mpjb_fwfs,
      mpjb_yjzd: this.$route.params.data.mpjb_yjzd,
      mpjb_wlhtx_sfmz: this.$route.params.data.mpjb_wlhtx_sfmz,
      //调研简表--设备和计算
      mpjb_sjk: this.$route.params.data.mpjb_sjk,
      mpjb_sjk_qt: this.$route.params.data.mpjb_sjk_qt,
      mpjb_sslvpn: this.$route.params.data.mpjb_sslvpn,
      mpjb_sslvpn_ppxh: this.$route.params.data.mpjb_sslvpn_ppxh,
      mpjb_ipsecvpn: this.$route.params.data.mpjb_ipsecvpn,
      mpjb_ipsecvpn_ppxh: this.$route.params.data.mpjb_ipsecvpn_ppxh,
      mpjb_blj: this.$route.params.data.mpjb_blj,
      mpjb_blj_ppxh: this.$route.params.data.mpjb_blj_ppxh,
      mpjb_sbhjs_sjk_sfmz: this.$route.params.data.mpjb_sbhjs_sjk_sfmz,
      mpjb_sbhjs_vpn_sfmz: this.$route.params.data.mpjb_sbhjs_vpn_sfmz,
      //调研简表--应用和数据
      mpjb_bkfr: this.$route.params.data.mpjb_bkfr,
      mpjb_dzqz: this.$route.params.data.mpjb_dzqz,
      mpjb_cssjl: this.$route.params.data.mpjb_cssjl,
      mpjb_ccsjl: this.$route.params.data.mpjb_ccsjl,
      mpjb_yyhsj_bkfrxydzqz_sfmz: this.$route.params.data.mpjb_yyhsj_bkfrxydzqz_sfmz,
      mpjb_yyhsj_cssjlyccsjl_sfmz: this.$route.params.data.mpjb_yyhsj_cssjlyccsjl_sfmz,
      //调研详表--系统用户情况
      xtyhqk: this.$route.params.data.sys_xtyh,

      xtyhqk_yh_options: [{
        value: '1',
        label: '运维人员'
      }, {
        value: '2',
        label: '系统管理员'
      }, {
        value: '3',
        label: '普通用户'
      }, {
        value: '4',
        label: '公众用户'
      }],
      xtyhqk_dlfs_options: [{
        value: '1',
        label: 'PC浏览器'
      }, {
        value: '2',
        label: 'PC客户端'
      }, {
        value: '3',
        label: '手机APP'
      }, {
        value: '4',
        label: '微信小程序'
      }],
      xtyhqk_sfrz_options: [{
        value: '1',
        label: 'U盘证书'
      }, {
        value: '2',
        label: '用户名+口令'
      }, {
        value: '3',
        label: '手机短信'
      }, {
        value: '4',
        label: '邮箱验证'
      }, {
        value: '5',
        label: '直接访问，无需认证'
      }],
      xtyhqk_szwl_options: [{
        value: '1',
        label: '互联网'
      }, {
        value: '2',
        label: '政务外网'
      }, {
        value: '3',
        label: '专网'
      }, {
        value: '4',
        label: '内网'
      }],
      //调研详表--物理和环境
      wlhhj: this.$route.params.data.sys_wlhhj,
      wlhhj_sfrz_options: [{
        value: '1',
        label: '用户名+口令'
      }, {
        value: '2',
        label: 'IC卡'
      }, {
        value: '3',
        label: 'U盘证书'
      }, {
        value: '4',
        label: '手机短信'
      }, {
        value: '5',
        label: '生物技术 '
      }, {
        value: '6',
        label: '人工登记'
      }],
      //调研详表--网络和通信
      wlhtx: this.$route.params.data.sys_wlhtx,
      wlhtx_type_options: [{
        value: '1',
        label: '互联网'
      }, {
        value: '2',
        label: '内网'
      }, {
        value: '3',
        label: '专网'
      }, {
        value: '4',
        label: '政务外网'
      }],
      wlhtx_txzt_options: [{  //allow-create
        value: '1',
        label: '运维人员'
      }, {
        value: '2',
        label: 'PC浏览器'
      }, {
        value: '3',
        label: 'PC-客户端'
      }, {
        value: '4',
        label: '移动APP'
      }, {
        value: '5',
        label: '微信小程序'
      }],
      wlhtx_sfrz_options: [{
        value: '1',
        label: 'U盘证书'
      }, {
        value: '2',
        label: '用户名+口令'
      }, {
        value: '3',
        label: '手机短信'
      }, {
        value: '4',
        label: '邮箱验证'
      }, {
        value: '5',
        label: '直接访问，无需认'
      }, {
        value: '6',
        label: '服务器证书'
      }, {
        value: '7',
        label: '设备证书'
      }],
      //调研详表--设备和计算:目标信息系统所在的服务器情况
      sbhjs_fwq: this.$route.params.data.sys_fwq,
      sbhjs_sfrz_options: [{
        value: '1',
        label: '用户名+口令'
      }, {
        value: '2',
        label: 'U盘证书'
      }, {
        value: '3',
        label: '生物识别'
      }, {
        value: '4',
        label: '手机短信'
      }],
      //调研详表--设备和计算:目标系统所涉及的专用设备情况
      sbhjs_zysb: this.$route.params.data.sys_sbhjs,
      sbhjs_type_options: [{
        value: '1',
        label: '密码产品/密码设备'
      }, {
        value: '2',
        label: '具有密码功能的网络及安全设备'
      }, {
        value: '3',
        label: '采用密码技术的其他产品'
      }, {
        value: '4',
        label: '没有密码功能的网络及安全设备'
      }, {
        value: '5',
        label: '虚拟设备和系统'
      }],
      //调研详表--应用和数据
      yyhsj_ywyy_zysj: this.$route.params.data.sys_ywyy,
      //调研详表--重要数据情况
      yyhsj_ywyy_zysjqk: this.$route.params.data.sys_zysj,
      zysjqk_sjlx_options: [{
        value: '1',
        label: '鉴别数据',
      }, {
        value: '2',
        label: '重要业务数据',
      }, {
        value: '3',
        label: '重要审计数据',
      }, {
        value: '4',
        label: '个人敏感信息',
      }, {
        value: '5',
        label: '法律法规规定的其他重要数据',
      }, {
        value: '6',
        label: '访问控制信息',
      }],
      //设备清单
      sbqd: this.$route.params.data.sbqd,
    }
  },

  methods: {
    submit () {
      let that = this
      this.loading = true
      axios.post('/api/download', {
        'data': {
          sys_name: this.sys_name,
          sys_unit: this.sys_unit,
          sys_sshy: this.sys_sshy,
          sys_sshy_qt: this.sys_sshy_qt,
          sys_xmlx: this.sys_xmlx,
          sys_xtjs: this.sys_xtjs,
          sys_dbjb: this.sys_dbjb,
          sys_mpsc: this.sys_mpsc,
          sys_mmzd: this.sys_mmzd,
          sys_ysbs: this.sys_ysbs,
          sys_djbh: this.sys_djbh,
          sys_rzys: this.sys_rzys_disableb ? 3 : this.sys_rzys,
          mpjb_fwd: this.mpjb_fwd,
          mpjb_ydd: this.mpjb_ydd,
          mpjb_xy_sfmz: this.mpjb_xy_sfmz,
          mpjb_sfrz: this.mpjb_sfrz,
          mpjb_wlhhj_sfmz: this.mpjb_wlhhj_sfmz,
          mpjb_fwfs: this.mpjb_fwfs,
          mpjb_yjzd: this.mpjb_yjzd,
          mpjb_wlhtx_sfmz: this.mpjb_wlhtx_sfmz,
          mpjb_sjk: this.mpjb_sjk,
          mpjb_sjk_qt: this.mpjb_sjk_qt,
          mpjb_sslvpn: this.mpjb_sslvpn,
          mpjb_sslvpn_ppxh: this.mpjb_sslvpn_ppxh,
          mpjb_ipsecvpn: this.mpjb_ipsecvpn,
          mpjb_ipsecvpn_ppxh: this.mpjb_ipsecvpn_ppxh,
          mpjb_blj: this.mpjb_blj,
          mpjb_blj_ppxh: this.mpjb_blj_ppxh,
          mpjb_sbhjs_sjk_sfmz: this.mpjb_sbhjs_sjk_sfmz,
          mpjb_sbhjs_vpn_sfmz: this.mpjb_sbhjs_vpn_sfmz,
          //调研简表--应用和数据
          mpjb_bkfr: this.mpjb_bkfr,
          mpjb_dzqz: this.mpjb_dzqz,
          mpjb_cssjl: this.mpjb_cssjl,
          mpjb_ccsjl: this.mpjb_ccsjl,
          mpjb_yyhsj_bkfrxydzqz_sfmz: this.mpjb_yyhsj_bkfrxydzqz_sfmz,
          mpjb_yyhsj_cssjlyccsjl_sfmz: this.mpjb_yyhsj_cssjlyccsjl_sfmz,
          //几张表格
          sys_xtyh: this.xtyhqk,
          sys_wlhhj: this.wlhhj,
          sys_wlhtx: this.wlhtx,
          sys_fwq: this.sbhjs_fwq,
          sys_sbhjs: this.sbhjs_zysb,
          sys_ywyy: this.yyhsj_ywyy_zysj,
          sys_zysj: this.yyhsj_ywyy_zysjqk,
          sbqd: this.sbqd
        }
      }, {
        responseType: 'blob'
      }).then(function (response) {
        that.loading = false
        var aTag = document.createElement('a')
        let tmp = response.data
        aTag.download = that.sys_name + '方案.docx'
        aTag.href = URL.createObjectURL(tmp)
        aTag.click()
      }).catch(function (error) {
        that.loading = false
        alert(error)
      })
    },
    dynamicYwyyChange (index, value) {
      this.dynamicYwyyForm.ywyy.find(i => i.key === index).value = value
    },
    removeDomain (item) {
      var index = this.dynamicYwyyForm.ywyy.indexOf(item)
      if (index !== -1) {
        this.dynamicYwyyForm.ywyy.splice(index, 1)
      }
    },
    addDomain () {
      this.dynamicYwyyForm.ywyy.push({
        value: '',
        key: ''
      })
    },
    handlextyhqk () {
      this.xtyhqk.push({
        ywyy: '',
        yh: '',
        dlfs: ['1'],
        sfrz: ['2'],
        szwl: ['1', '4'],
        sl: 1,
      })
    },
    handlewlhhj () {
      this.wlhhj.push(
        {
          jfmc: '',
          jflx: '2',
          mj: '2',
          sfrz: ['2'],
          spjk: '2',
          zjsb: '1'
        })
    },
    handlewlhtx () {
      this.wlhtx.push({
        type: '',
        txzt: '',
        sfrz: ['2'],
        zysj: '1',
        sl: '',
        sm: '',
        cpdx: ''
      })
    },
    handlesbhjsfwq () {
      this.sbhjs_fwq.push({
        sbmc: '',
        czxt: '1',
        sjk: '2',
        sl: '1',
        ppxh: '',
        ycyw: '1',
        sfrz: ['1'],
        blj: '1',
      })
    },
    handlesbhjszysb () {
      this.sbhjs_zysb.push({
        type: '',
        sbmc: '',
        ppxh: '',
        sl: '1',
        gmsf: '2',
        smzs: '1',
        ycyw: '1',
        sfrz: ['1'],
        blj: '1',
      })
    },
    handleyyhsjywyy () {
      this.yyhsj_ywyy_zysj.push(
        {
          ywyy: '',
          gnms: '',
          fwfs: '1',
          bkfr: '1',
          jtqk1: '',
          dzqm: '1',
          jtqk2: ''
        })
    },
    handleyyhsjzysj () {
      this.yyhsj_ywyy_zysjqk.push(
        {
          ywyy: '',
          sjlx: '',
          sjnr: '',
          bhxq: '机密性、完整性、不可否认性',
          ccjm: '3',
          sjl: '',
          csjm: '4',
          ll: '',
        }
      )
    },
    handleSelect (key, keyPath) {
      if (key == 1) {
        //检查是否保存
        this.$router.push({path: '/addque'})
      } else if (key == 2) {
        //检查是否保存
        let that = this
        this.$confirm('您正在离开此界面，是否需要保存？', '提示', {
          confirmButtonText: '帮我保存',
          cancelButtonText: '直接离开',
          type: 'warning'
        }).then(() => {
          that.saveChoose()
          that.$router.push({path: '/choose'})
          //调用save
        }).catch(() => {
          that.$router.push({path: '/choose'})
        })
      } else if (key == 3) {

      }
    },
    xtyhqkDelete (index) {
      this.xtyhqk.splice(index, 1)
    },
    wlhtxDelete (index) {
      this.wlhtx.splice(index, 1)
    },
    wlhhjDelete (index) {
      this.wlhhj.splice(index, 1)
    },
    sbhjs_fwqDelete (index) {
      this.sbhjs_fwq.splice(index, 1)
    },
    sbhjs_zysbDelete (index) {
      this.sbhjs_zysb.splice(index, 1)
    },
    yyhsj_ywyy_zysjDelete (index) {
      this.yyhsj_ywyy_zysj.splice(index, 1)
    },
    yyhsj_ywyy_zysjqkDelete (index) {
      this.yyhsj_ywyy_zysjqk.splice(index, 1)
    },

    saveChoose () {
      let that = this
      this.loading = true
      axios.post('/api/saveQuestionnaireResult', {
        'data': {
          sys_name: this.sys_name,
          sys_unit: this.sys_unit,
          sys_sshy: this.sys_sshy,
          sys_sshy_qt: this.sys_sshy_qt,
          sys_xmlx: this.sys_xmlx,
          sys_xtjs: this.sys_xtjs,
          sys_dbjb: this.sys_dbjb,
          sys_mpsc: this.sys_mpsc,
          sys_mmzd: this.sys_mmzd,
          sys_ysbs: this.sys_ysbs,
          sys_djbh: this.sys_djbh,
          sys_rzys: this.sys_rzys_disableb ? 3 : this.sys_rzys,
          mpjb_fwd: this.mpjb_fwd,
          mpjb_ydd: this.mpjb_ydd,
          dynamicYwyyForm: this.dynamicYwyyForm,
          mpjb_xy_sfmz: this.mpjb_xy_sfmz,
          mpjb_sfrz: this.mpjb_sfrz,
          mpjb_wlhhj_sfmz: this.mpjb_wlhhj_sfmz,
          mpjb_fwfs: this.mpjb_fwfs,
          mpjb_yjzd: this.mpjb_yjzd,
          mpjb_wlhtx_sfmz: this.mpjb_wlhtx_sfmz,
          mpjb_sjk: this.mpjb_sjk,
          mpjb_sjk_qt: this.mpjb_sjk_qt,
          mpjb_sslvpn: this.mpjb_sslvpn,
          mpjb_sslvpn_ppxh: this.mpjb_sslvpn_ppxh,
          mpjb_ipsecvpn: this.mpjb_ipsecvpn,
          mpjb_ipsecvpn_ppxh: this.mpjb_ipsecvpn_ppxh,
          mpjb_blj: this.mpjb_blj,
          mpjb_blj_ppxh: this.mpjb_blj_ppxh,
          mpjb_sbhjs_sjk_sfmz: this.mpjb_sbhjs_sjk_sfmz,
          mpjb_sbhjs_vpn_sfmz: this.mpjb_sbhjs_vpn_sfmz,
          //调研简表--应用和数据
          mpjb_bkfr: this.mpjb_bkfr,
          mpjb_dzqz: this.mpjb_dzqz,
          mpjb_cssjl: this.mpjb_cssjl,
          mpjb_ccsjl: this.mpjb_ccsjl,
          mpjb_yyhsj_bkfrxydzqz_sfmz: this.mpjb_yyhsj_bkfrxydzqz_sfmz,
          mpjb_yyhsj_cssjlyccsjl_sfmz: this.mpjb_yyhsj_cssjlyccsjl_sfmz,
          //几张表格
          sys_xtyh: this.xtyhqk,
          sys_wlhhj: this.wlhhj,
          sys_wlhtx: this.wlhtx,
          sys_fwq: this.sbhjs_fwq,
          sys_sbhjs: this.sbhjs_zysb,
          sys_ywyy: this.yyhsj_ywyy_zysj,
          sys_zysj: this.yyhsj_ywyy_zysjqk,
          sbqd: this.sbqd
        }
      }).then(function (response) {
        that.loading = false
        if (response.data.retcode == 'ok') {
          that.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          that.$message.error('保存失败，请保留该界面状态并联系管理员')
        }
      }).catch(function (error) {
        that.loading = false
        alert('通信错误，请联系管理员')
        console.error(error)
      })
    },
    generateSBQD () {
      let that = this
      this.loading = true
      axios.post('/api/SBQDdownload', {
        'data': {
          sys_name: this.sys_name,
          sys_unit: this.sys_unit,
          sys_sshy: this.sys_sshy,
          sys_sshy_qt: this.sys_sshy_qt,
          sys_xmlx: this.sys_xmlx,
          sys_xtjs: this.sys_xtjs,
          sys_dbjb: this.sys_dbjb,
          sys_mpsc: this.sys_mpsc,
          sys_mmzd: this.sys_mmzd,
          sys_ysbs: this.sys_ysbs,
          sys_djbh: this.sys_djbh,
          sys_rzys: this.sys_rzys_disableb ? 3 : this.sys_rzys,
          mpjb_fwd: this.mpjb_fwd,
          mpjb_ydd: this.mpjb_ydd,
          dynamicYwyyForm: this.dynamicYwyyForm,
          mpjb_xy_sfmz: this.mpjb_xy_sfmz,
          mpjb_sfrz: this.mpjb_sfrz,
          mpjb_wlhhj_sfmz: this.mpjb_wlhhj_sfmz,
          mpjb_fwfs: this.mpjb_fwfs,
          mpjb_yjzd: this.mpjb_yjzd,
          mpjb_wlhtx_sfmz: this.mpjb_wlhtx_sfmz,
          mpjb_sjk: this.mpjb_sjk,
          mpjb_sjk_qt: this.mpjb_sjk_qt,
          mpjb_sslvpn: this.mpjb_sslvpn,
          mpjb_sslvpn_ppxh: this.mpjb_sslvpn_ppxh,
          mpjb_ipsecvpn: this.mpjb_ipsecvpn,
          mpjb_ipsecvpn_ppxh: this.mpjb_ipsecvpn_ppxh,
          mpjb_blj: this.mpjb_blj,
          mpjb_blj_ppxh: this.mpjb_blj_ppxh,
          mpjb_sbhjs_sjk_sfmz: this.mpjb_sbhjs_sjk_sfmz,
          mpjb_sbhjs_vpn_sfmz: this.mpjb_sbhjs_vpn_sfmz,
          //调研简表--应用和数据
          mpjb_bkfr: this.mpjb_bkfr,
          mpjb_dzqz: this.mpjb_dzqz,
          mpjb_cssjl: this.mpjb_cssjl,
          mpjb_ccsjl: this.mpjb_ccsjl,
          mpjb_yyhsj_bkfrxydzqz_sfmz: this.mpjb_yyhsj_bkfrxydzqz_sfmz,
          mpjb_yyhsj_cssjlyccsjl_sfmz: this.mpjb_yyhsj_cssjlyccsjl_sfmz,
          //几张表格
          sys_xtyh: this.xtyhqk,
          sys_wlhhj: this.wlhhj,
          sys_wlhtx: this.wlhtx,
          sys_fwq: this.sbhjs_fwq,
          sys_sbhjs: this.sbhjs_zysb,
          sys_ywyy: this.yyhsj_ywyy_zysj,
          sys_zysj: this.yyhsj_ywyy_zysjqk,
          sbqd: this.sbqd
        }
      }, {
        responseType: 'blob'
      }).then(function (response) {
        that.loading = false
        var aTag = document.createElement('a')
        let tmp = response.data
        aTag.download = that.sys_name + '设备清单.xlsx'
        aTag.href = URL.createObjectURL(tmp)
        aTag.click()
      }).catch(function (error) {
        that.loading = false
        alert(error)
      })
    },
    changeRZYSbyYSBS (index) {
      if (index == 1) {
        this.sys_rzys_disableb = false
      } else {
        this.sys_rzys_disableb = true
      }
      this.sys_rzys = ''
    },
    xmpf () {
      let that = this
      axios.get('/api/getScore').then(function (response) {
        //后端接口还没写
        if (response.data.retcode == 'ok') {
          that.score = response.data.data
          that.$alert(that.score, '方案估分', {
            confirmButtonText: '确定',
          })
        } else {
          alert('系统错误，请联系管理员')
        }
      }).catch(function (error) {
        // alert('通信错误，请联系管理员')
        // console.error(error)
      })
    }
  }
}
</script>


<style>

.el-col {
  border-radius: 4px;
}

.bg-dark {
  background: #dbdbdb;
  border: solid 0.5px;
}

.bg-light {
  background: #ffffff;
  border: solid 0.5px;
}

.grid-header {
  min-height: 26px;
}

.grid-content {
  min-height: 100px;
}

.grid-content-big {
  min-height: 180px;
}

.grid-content-large {
  min-height: 250px;
}

.el-form-item {
  margin-bottom: 0px;
}

.fontClass {
  font-size: 52px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.h1-header {
  font-size: 32px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.h2-header {
  font-size: 22px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}


</style>
