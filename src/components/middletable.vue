<template>
<div>
    <span class="fontClass">国密规范文档自动生成工具</span>
    <el-divider></el-divider>
    <div>
        <span class="h1-header">一、项目基本情况</span><el-divider></el-divider>
        <el-form :model="Form" label-width="140px" label-position="left">
            <el-form-item label="项目名称">
                <el-input v-model="sysname" placeholder="请输入项目名称"></el-input>
            </el-form-item>
            <el-form-item label="等保级别">
                <el-radio-group v-model="dbjb">
                    <el-radio label="4">四级</el-radio>
                    <el-radio label="3">三级</el-radio>
                    <el-radio label="2">二级</el-radio>
                    <el-radio label="1">一级</el-radio>
                    <el-radio label="n/a">不确定</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="信创要求">
                <el-radio-group v-model="xcyq">
                    <el-radio label="yes">信创</el-radio>
                    <el-radio label="no">非信创</el-radio>
                    <el-radio label="n/a">不确定</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="密码技术应用框架">
                <el-radio-group v-model="mmjsyykj" >
                    <el-radio label="53-01-1">单业务场景-无密码资源池</el-radio>
                    <el-radio label="53-02-1">多业务场景-密码资源池</el-radio>
                    <el-radio label="53-03-1">政务云场景-云密码资源池</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="管理制度">
                <el-radio-group v-model="glzd" >
                    <el-radio label="51-01-1">已合规</el-radio>
                    <el-radio label="51-00-1">未合规</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="业务操作系统">
                <el-input v-model="ywczxt" placeholder="请输入业务操作系统"></el-input>
            </el-form-item>
            <el-form-item label="业务数据库">
                <el-input v-model="ywsjk" placeholder="请输入业务数据库"></el-input>
            </el-form-item>
            <el-form-item label="业务应用">
                <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入基本业务情况"
                v-model="ywyy">
                </el-input>
            </el-form-item>
            <br>
                <div>
                <el-form label-width="190px">
                <el-row>
                    <el-col :span="24">
                    <el-form-item label="用户硬件清单表">
                        <el-button type="primary" size="mini" @click="handleyhyjqdb()" icon="el-icon-plus"></el-button>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-table :data="yhyjqdb" border :header-cell-style="{background:'#b8bbbf',color:'#606266'}">
                    <el-table-column align="center" label="资产类型">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.zclx" placeholder="请输入用途"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="用途">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.yt" placeholder="请输入用途"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="硬盘">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.yp" placeholder="请输入硬盘"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="数量">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.sl" placeholder="请输入数量"></el-input>
                        </template>
                    </el-table-column>
                    </el-table>
                </el-row>
                </el-form>
            </div>
            <br>
            <div>
                <el-form label-width="190px">
                <el-row>
                    <el-col :span="24">
                    <el-form-item label="系统用户">
                        <el-button type="primary" size="mini" @click="handlextyh()" icon="el-icon-plus"></el-button>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-table :data="xtyh" border :header-cell-style="{background:'#b8bbbf',color:'#606266'}">
                    <el-table-column align="center" label="使用单位">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.sydw" placeholder="请输入使用单位"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="使用人员">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.syry" placeholder="请输入使用人员"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="使用场景">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.sycj" placeholder="请输入使用场景"></el-input>
                        </template>
                    </el-table-column>
                    </el-table>
                </el-row>
                </el-form>
            </div>
        </el-form>
        <br><br>
        <el-table border :data="sbqd" :row-class-name="tableRowClassName">
            <el-table-column label="序号" align="center" type="index" width="50" />
            <el-table-column :label="sbqd.coType==='0'?'药品名称':'项目名称'" align="center" prop="name" />
            <el-table-column label="基本型号" align="center" prop="jbxh" />
            <el-table-column label="类别" width="120px" align="center" prop="lb" />
            <el-table-column label="数量" width="180px" align="center" prop="num">  
                <template slot-scope="scope"> 
                <el-input-number
                    v-model="scope.row.num"
                    size="small"
                    @change="handleCareOrderItemNumChange(scope.row)"
                />
                </template>
            </el-table-column>
            <el-table-column label="单台价格" width="180px" align="center" prop="num">
                <template slot-scope="scope"> 
                    <el-input v-model="scope.row.price" placeholder="价格"></el-input>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="wlhhj">
        <div>     
            <br>
            <span class="h1-header">二、物理和环境(1)</span>
            <el-divider></el-divider>
            <div class="grid-content bg-purple">
            <el-form ref="form" :model="Form" label-width="100px"><br>
                <el-form-item label="所属机房名称">
                    <el-input v-model="k1_wlhhj_mc" placeholder="请输入所属机房信息"></el-input>
                </el-form-item>
            </el-form>
                <span class="h2-header">1.身份鉴别</span>
                <el-table border stripe :data="wlhhj_sfjb_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                    <el-table-column label="（1）场景" width="290">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k1_wlhhj_sfjb_data_radio"  @change="k1_wlhhj_sfjb_radio_func">
                            <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                        </el-radio-group>
                    </template>
                    </el-table-column>
                    <el-table-column label="（2）解决方案">
                        <template slot-scope="scope">
                            <el-radio-group v-model="k1_wlhhj_sfjb_jjfa_radio">
                                <el-radio 
                                v-for="(item,index) in scope.row.children" 
                                :key="index"
                                :label="item.value">{{ item.label }}</el-radio>
                                <br>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                </el-table>
                <br>
                <span class="h2-header">2.电子门禁记录数据存储完整性</span>
                <el-table border stripe :data="wlhhj_dzmjjlsjccwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                    <el-table-column label="（1）场景" width="290">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k1_wlhhj_dzmjjlsjccwzx_data_radio">
                        <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                        </el-radio-group>
                    </template>
                    </el-table-column>
                    <el-table-column label="（2）解决方案">
                        <template slot-scope="scope">
                            <el-radio-group v-model="k1_wlhhj_dzmjjlsjccwzx_jjfa_radio">
                                <el-radio 
                                v-for="(item,index) in scope.row.children" 
                                :key="index"
                                :label="item.value">{{ item.label }}</el-radio>
                                <br>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                </el-table>
                <br>
                <span class="h2-header">3.视频监控记录数据存储完整性</span>
                <el-table border stripe :data="wlhhj_spjkjlsjccwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                    <el-table-column label="（1）场景" width="290">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k1_wlhhj_spjkjlsjccwzx_data_radio">
                        <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                        </el-radio-group>
                    </template>
                    </el-table-column>
                    <el-table-column label="（2）解决方案">
                        <template slot-scope="scope">
                            <el-radio-group v-model="k1_wlhhj_spjkjlsjccwzx_jjfa_radio">
                                <el-radio 
                                v-for="(item,index) in scope.row.children" 
                                :key="index"
                                :label="item.value">{{ item.label }}</el-radio>
                                <br>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                </el-table>
                <br><br>
            </div>
        </div>
        <div>    
            <span class="h1-header">二、物理和环境(2)</span>
            <el-divider></el-divider>
            <div class="grid-content bg-purple">
            <el-form ref="form" :model="Form" label-width="100px"><br>
                <el-form-item label="所属机房名称">
                    <el-input v-model="k2_wlhhj_mc" placeholder="请输入所属机房信息"></el-input>
                </el-form-item>
            </el-form>
                <span class="h2-header">1.身份鉴别</span>
                <el-table border stripe :data="wlhhj_sfjb_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                    <el-table-column label="（1）场景" width="290">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k2_wlhhj_sfjb_data_radio">
                        <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                        </el-radio-group>
                    </template>
                    </el-table-column>
                    <el-table-column label="（2）解决方案">
                        <template slot-scope="scope">
                            <el-radio-group v-model="k2_wlhhj_sfjb_jjfa_radio">
                                <el-radio 
                                v-for="(item,index) in scope.row.children" 
                                :key="index"
                                :label="item.value">{{ item.label }}</el-radio>
                                <br>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                </el-table>
                <br>
                <span class="h2-header">2.电子门禁记录数据存储完整性</span>
                <el-table border stripe :data="wlhhj_dzmjjlsjccwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                    <el-table-column label="（1）场景" width="290">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k2_wlhhj_dzmjjlsjccwzx_data_radio">
                        <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                        </el-radio-group>
                    </template>
                    </el-table-column>
                    <el-table-column label="（2）解决方案">
                        <template slot-scope="scope">
                            <el-radio-group v-model="k2_wlhhj_dzmjjlsjccwzx_jjfa_radio">
                                <el-radio 
                                v-for="(item,index) in scope.row.children" 
                                :key="index"
                                :label="item.value">{{ item.label }}</el-radio>
                                <br>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                </el-table>
                <br>
                <span class="h2-header">3.视频监控记录数据存储完整性</span>
                <el-table border stripe :data="wlhhj_spjkjlsjccwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                    <el-table-column label="（1）场景" width="290">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k2_wlhhj_spjkjlsjccwzx_data_radio">
                        <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                        </el-radio-group>
                    </template>
                    </el-table-column>
                    <el-table-column label="（2）解决方案">
                        <template slot-scope="scope">
                            <el-radio-group v-model="k2_wlhhj_spjkjlsjccwzx_jjfa_radio">
                                <el-radio 
                                v-for="(item,index) in scope.row.children" 
                                :key="index"
                                :label="item.value">{{ item.label }}</el-radio>
                                <br>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                </el-table>
                <br><br>
            </div>
        </div>
        <div>      
            <span class="h1-header">二、物理和环境(3)</span>
            <el-divider></el-divider>
            <div class="grid-content bg-purple">
            <el-form ref="form" :model="Form" label-width="100px"><br>
                <el-form-item label="所属机房名称">
                    <el-input v-model="k3_wlhhj_mc" placeholder="请输入所属机房信息"></el-input>
                </el-form-item>
            </el-form>
                <span class="h2-header">1.身份鉴别</span>
                <el-table border stripe :data="wlhhj_sfjb_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                    <el-table-column label="（1）场景" width="290">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k3_wlhhj_sfjb_data_radio">
                        <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                        </el-radio-group>
                    </template>
                    </el-table-column>
                    <el-table-column label="（2）解决方案">
                        <template slot-scope="scope">
                            <el-radio-group v-model="k3_wlhhj_sfjb_jjfa_radio">
                                <el-radio 
                                v-for="(item,index) in scope.row.children" 
                                :key="index"
                                :label="item.value">{{ item.label }}</el-radio>
                                <br>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                </el-table>
                <br>
                <span class="h2-header">2.电子门禁记录数据存储完整性</span>
                <el-table border stripe :data="wlhhj_dzmjjlsjccwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                    <el-table-column label="（1）场景" width="290">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k3_wlhhj_dzmjjlsjccwzx_data_radio">
                        <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                        </el-radio-group>
                    </template>
                    </el-table-column>
                    <el-table-column label="（2）解决方案">
                        <template slot-scope="scope">
                            <el-radio-group v-model="k3_wlhhj_dzmjjlsjccwzx_jjfa_radio">
                                <el-radio 
                                v-for="(item,index) in scope.row.children" 
                                :key="index"
                                :label="item.value">{{ item.label }}</el-radio>
                                <br>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                </el-table>
                <br>
                <span class="h2-header">3.视频监控记录数据存储完整性</span>
                <el-table border stripe :data="wlhhj_spjkjlsjccwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                    <el-table-column label="（1）场景" width="290">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k3_wlhhj_spjkjlsjccwzx_data_radio">
                        <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                        </el-radio-group>
                    </template>
                    </el-table-column>
                    <el-table-column label="（2）解决方案">
                        <template slot-scope="scope">
                            <el-radio-group v-model="k3_wlhhj_spjkjlsjccwzx_jjfa_radio">
                                <el-radio 
                                v-for="(item,index) in scope.row.children" 
                                :key="index"
                                :label="item.value">{{ item.label }}</el-radio>
                                <br>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                </el-table>
                <br><br>
            </div>
        </div>
    </div>
    <div>
        <div>
            <span class="h1-header">二、网络和通信安全(1)</span><el-divider></el-divider>
            <el-form ref="form" :model="Form" label-width="100px"><br>
                <el-form-item label="所属通道名称" >
                    <el-select style="width: 90%;"
                        v-model="k1_sstdmc">
                        <el-option
                        v-for="item in wlhtxaq_sstdmc_data"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-checkbox-group v-model="k1_wlhtxaq_checkList">
                <el-checkbox label="1">身份鉴别</el-checkbox>
                <el-checkbox label="2">通信数据完整性</el-checkbox>
                <el-checkbox label="3">通信过程中重要数据的机密性</el-checkbox>
                <el-checkbox label="4">网络边界访问控制信息的完整性</el-checkbox>
                <el-checkbox label="5">安全接入认证</el-checkbox>
            </el-checkbox-group>
        </div>
        <br><br>
        <div>
            <span class="h1-header">二、网络和通信安全(2)</span><el-divider></el-divider>
            <el-form ref="form" :model="Form" label-width="100px"><br>
                <el-form-item label="所属通道名称" >
                    <el-select style="width: 90%;"
                        v-model="k2_sstdmc">
                        <el-option
                        v-for="item in wlhtxaq_sstdmc_data"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-checkbox-group v-model="k2_wlhtxaq_checkList">
                <el-checkbox label="1">身份鉴别</el-checkbox>
                <el-checkbox label="2">通信数据完整性</el-checkbox>
                <el-checkbox label="3">通信过程中重要数据的机密性</el-checkbox>
                <el-checkbox label="4">网络边界访问控制信息的完整性</el-checkbox>
                <el-checkbox label="5">安全接入认证</el-checkbox>
            </el-checkbox-group>
        </div>
    </div>
    <br><br>
    <div>
        <span class="h1-header">三、设备和计算(1)</span><el-divider></el-divider>
            <el-form ref="form" :model="Form" label-width="100px"><br>
                <el-form-item label="所属设备名称">
                    <el-input v-model="k1_sbhjs_mc" placeholder="请输入所属设备信息"></el-input>
                </el-form-item>
            </el-form>
        <div class="grid-content bg-purple">
            <span class="h2-header">1.身份鉴别</span><br><br>
            <el-table border stripe :data="sbhjs_sfjb_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                <el-table-column label="（1）场景" width="290">
                <template slot-scope="scope">
                    <el-radio-group v-model="k1_sbhjs_sfjb_data_radio">
                    <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                    </el-radio-group>
                </template>
                </el-table-column>
                <el-table-column label="（2）解决方案">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k1_sbhjs_sfjb_jjfa_radio">
                            <el-radio 
                            v-for="(item,index) in scope.row.children" 
                            :key="index"
                            :label="item.value">{{ item.label }}</el-radio>
                            <br>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <span class="h2-header">2.远程管理通道安全</span><br><br>
            <el-table border stripe :data="sbhjs_ycgltdaq_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                <el-table-column label="（1）场景" width="290">
                <template slot-scope="scope">
                    <el-radio-group v-model="k1_sbhjs_ycgltdaq_data_radio">
                    <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                    </el-radio-group>
                </template>
                </el-table-column>
                <el-table-column label="（2）解决方案">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k1_sbhjs_ycgltdaq_jjfa_radio">
                            <el-radio 
                            v-for="(item,index) in scope.row.children" 
                            :key="index"
                            :label="item.value">{{ item.label }}</el-radio>
                            <br>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <span class="h2-header">3.系统资源访问控制信息完整性</span><br><br>
            <el-table border stripe :data="sbhjs_xtzyfwkzxxwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                <el-table-column label="（1）场景" width="500">
                <template slot-scope="scope">
                    <el-radio-group v-model="k1_sbhjs_xtzyfwkzxxwzx_data_radio">
                    <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                    </el-radio-group>
                </template>
                </el-table-column>
                <el-table-column label="（2）解决方案">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k1_sbhjs_xtzyfwkzxxwzx_jjfa_radio">
                            <el-radio 
                            v-for="(item,index) in scope.row.children" 
                            :key="index"
                            :label="item.value">{{ item.label }}</el-radio>
                            <br>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <span class="h2-header">4.重要信息资源安全标记完整性</span><br><br>
            <el-table border stripe :data="sbhjs_zyxxzyaqbjwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                <el-table-column label="（1）场景" width="500">
                <template slot-scope="scope">
                    <el-radio-group v-model="k1_sbhjs_zyxxzyaqbjwzx_data_radio">
                    <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                    </el-radio-group>
                </template>
                </el-table-column>
                <el-table-column label="（2）解决方案">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k1_sbhjs_zyxxzyaqbjwzx_jjfa_radio">
                            <el-radio 
                            v-for="(item,index) in scope.row.children" 
                            :key="index"
                            :label="item.value">{{ item.label }}</el-radio>
                            <br>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <span class="h2-header">5.日志记录完整性</span><br><br>
            <el-table border stripe :data="sbhjs_rzjlwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                <el-table-column label="（1）场景" width="290">
                <template slot-scope="scope">
                    <el-radio-group v-model="k1_sbhjs_rzjlwzx_data_radio">
                    <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                    </el-radio-group>
                </template>
                </el-table-column>
                <el-table-column label="（2）解决方案">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k1_sbhjs_rzjlwzx_jjfa_radio">
                            <el-radio 
                            v-for="(item,index) in scope.row.children" 
                            :key="index"
                            :label="item.value">{{ item.label }}</el-radio>
                            <br>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <span class="h2-header">6.重要可执行程序完整性、重要可执行程序来源真实性</span><br><br>
            <el-table border stripe :data="sbhjs_zykzxcxwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                <el-table-column label="（1）场景" width="500">
                <template slot-scope="scope">
                    <el-radio-group v-model="k1_sbhjs_zykzxcxwzx_data_radio">
                    <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                    </el-radio-group>
                </template>
                </el-table-column>
                <el-table-column label="（2）解决方案">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k1_ssbhjs_zykzxcxwzx_jjfa_radio">
                            <el-radio 
                            v-for="(item,index) in scope.row.children" 
                            :key="index"
                            :label="item.value">{{ item.label }}</el-radio>
                            <br>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>

        </div> 

    </div>
    <div>
        <br>
        <span class="h1-header">三、设备和计算(2)</span><el-divider></el-divider>
            <el-form ref="form" :model="Form" label-width="100px"><br>
                <el-form-item label="所属设备名称">
                    <el-input v-model="k2_sbhjs_mc" placeholder="请输入所属设备信息"></el-input>
                </el-form-item>
            </el-form>
        <div class="grid-content bg-purple">
            <span class="h2-header">1.身份鉴别</span><br><br>
            <el-table border stripe :data="sbhjs_sfjb_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                <el-table-column label="（1）场景" width="290">
                <template slot-scope="scope">
                    <el-radio-group v-model="k2_sbhjs_sfjb_data_radio">
                    <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                    </el-radio-group>
                </template>
                </el-table-column>
                <el-table-column label="（2）解决方案">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k2_sbhjs_sfjb_jjfa_radio">
                            <el-radio 
                            v-for="(item,index) in scope.row.children" 
                            :key="index"
                            :label="item.value">{{ item.label }}</el-radio>
                            <br>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <span class="h2-header">2.远程管理通道安全</span><br><br>
            <el-table border stripe :data="sbhjs_ycgltdaq_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                <el-table-column label="（1）场景" width="290">
                <template slot-scope="scope">
                    <el-radio-group v-model="k2_sbhjs_ycgltdaq_data_radio">
                    <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                    </el-radio-group>
                </template>
                </el-table-column>
                <el-table-column label="（2）解决方案">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k2_sbhjs_ycgltdaq_jjfa_radio">
                            <el-radio 
                            v-for="(item,index) in scope.row.children" 
                            :key="index"
                            :label="item.value">{{ item.label }}</el-radio>
                            <br>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <span class="h2-header">3.系统资源访问控制信息完整性</span><br><br>
            <el-table border stripe :data="sbhjs_xtzyfwkzxxwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                <el-table-column label="（1）场景" width="500">
                <template slot-scope="scope">
                    <el-radio-group v-model="k2_sbhjs_xtzyfwkzxxwzx_data_radio">
                    <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                    </el-radio-group>
                </template>
                </el-table-column>
                <el-table-column label="（2）解决方案">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k2_sbhjs_xtzyfwkzxxwzx_jjfa_radio">
                            <el-radio 
                            v-for="(item,index) in scope.row.children" 
                            :key="index"
                            :label="item.value">{{ item.label }}</el-radio>
                            <br>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <span class="h2-header">4.重要信息资源安全标记完整性</span><br><br>
            <el-table border stripe :data="sbhjs_zyxxzyaqbjwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                <el-table-column label="（1）场景" width="500">
                <template slot-scope="scope">
                    <el-radio-group v-model="k2_sbhjs_zyxxzyaqbjwzx_data_radio">
                    <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                    </el-radio-group>
                </template>
                </el-table-column>
                <el-table-column label="（2）解决方案">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k2_sbhjs_zyxxzyaqbjwzx_jjfa_radio">
                            <el-radio 
                            v-for="(item,index) in scope.row.children" 
                            :key="index"
                            :label="item.value">{{ item.label }}</el-radio>
                            <br>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <span class="h2-header">5.日志记录完整性</span><br><br>
            <el-table border stripe :data="sbhjs_rzjlwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                <el-table-column label="（1）场景" width="290">
                <template slot-scope="scope">
                    <el-radio-group v-model="k2_sbhjs_rzjlwzx_data_radio">
                    <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                    </el-radio-group>
                </template>
                </el-table-column>
                <el-table-column label="（2）解决方案">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k2_sbhjs_rzjlwzx_jjfa_radio">
                            <el-radio 
                            v-for="(item,index) in scope.row.children" 
                            :key="index"
                            :label="item.value">{{ item.label }}</el-radio>
                            <br>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <span class="h2-header">6.重要可执行程序完整性、重要可执行程序来源真实性</span><br><br>
            <el-table border stripe :data="sbhjs_zykzxcxwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
                <el-table-column label="（1）场景" width="500">
                <template slot-scope="scope">
                    <el-radio-group v-model="k2_sbhjs_zykzxcxwzx_data_radio">
                    <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                    </el-radio-group>
                </template>
                </el-table-column>
                <el-table-column label="（2）解决方案">
                    <template slot-scope="scope">
                        <el-radio-group v-model="k2_ssbhjs_zykzxcxwzx_jjfa_radio">
                            <el-radio 
                            v-for="(item,index) in scope.row.children" 
                            :key="index"
                            :label="item.value">{{ item.label }}</el-radio>
                            <br>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <br><br>
    
    <div>
        <span class="h1-header">四、应用和数据安全(1)</span><el-divider></el-divider>
        <el-form ref="form" :model="Form" label-width="100px"><br>
            <el-form-item label="所属业务名称">
                <el-input v-model="k1_yyhsj_mc" placeholder="请输入所属业务名称"></el-input>
            </el-form-item>
        </el-form>
        <span class="h2-header">1.身份鉴别</span><br><br>
            <el-checkbox-group v-model="k1_yyhsj_sfjb_checkList">
                <el-checkbox label="41-00-1">【系统管理员-PC客户端-X-从内网访问业务系统】---使用：智能密码钥匙；服务器密码机；国密安全密码应用中间件；</el-checkbox><br>
                <el-checkbox label="41-01-1">【系统管理员-网页-X】---使用：可信浏览器；智能密码钥匙；证书；签名验签服务器；国密安全密码应用中间件；</el-checkbox><br>
                <el-checkbox label="41-02-1">【X-手机app-X】---使用：协同签名系统</el-checkbox><br>
                <el-checkbox label="41-03-1">【单位内普通用户/公众用户】---使用：无</el-checkbox><br>
            </el-checkbox-group>
        <br>
        <span class="h2-header">2.访问控制信息完整性</span><br><br>
        <el-table border stripe :data="yyhsj_fwkzxxwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column label="（1）场景" width="500">
            <template slot-scope="scope">
                <el-radio-group v-model="k1_yyhsj_fwkzxxwzx_radio">
                <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                </el-radio-group>
            </template>
            </el-table-column>
            <el-table-column label="（2）解决方案">
                <template slot-scope="scope">
                    <el-radio-group v-model="k1_yyhsj_fwkzxxwzx_jjfa_radio">
                        <el-radio 
                        v-for="(item,index) in scope.row.children" 
                        :key="index"
                        :label="item.value">{{ item.label }}</el-radio>
                        <br>
                    </el-radio-group>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <span class="h2-header">3.重要信息资源安全标记完整性</span><br><br>
        <el-table border stripe :data="yyhsj_zyxxzyaqbjwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column label="（1）场景" width="500">
            <template slot-scope="scope">
                <el-radio-group v-model="k1_yyhsj_zyxxzyaqbjwzx_data_radio">
                <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                </el-radio-group>
            </template>
            </el-table-column>
            <el-table-column label="（2）解决方案">
                <template slot-scope="scope">
                    <el-radio-group v-model="k1_yyhsj_zyxxzyaqbjwzx_jjfa_radio">
                        <el-radio 
                        v-for="(item,index) in scope.row.children" 
                        :key="index"
                        :label="item.value">{{ item.label }}</el-radio>
                        <br>
                    </el-radio-group>
                </template>
            </el-table-column>
        </el-table>
        <br>
        
        <span class="h2-header">4.重要数据传输机密性</span><br><br>
        <el-checkbox-group v-model="k1_yyhsj_zysjcsjmx_checkList">
            <el-checkbox label="44-00-1">客户端-服务端---使用：服务器密码机；国密安全密码应用中间件；</el-checkbox>
            <el-checkbox label="44-01-1">服务端-服务端---使用：服务器密码机；国密安全密码应用中间件；</el-checkbox>
        </el-checkbox-group>
        <br>
        <span class="h2-header">5.重要数据存储机密性</span><br><br>
        <el-table border stripe :data="yyhsj_zysjccjmx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column label="（1）场景" width="500">
            <template slot-scope="scope">
                <el-radio-group v-model="k1_yyhsj_zysjccjmx_data_radio">
                <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                </el-radio-group>
            </template>
            </el-table-column>
            <el-table-column label="（2）解决方案">
                <template slot-scope="scope">
                    <el-radio-group v-model="k1_yyhsj_zysjccjmx_jjfa_radio">
                        <el-radio 
                        v-for="(item,index) in scope.row.children" 
                        :key="index"
                        :label="item.value">{{ item.label }}</el-radio>
                        <br>
                    </el-radio-group>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <span class="h2-header">6.重要数据传输完整性</span><br><br>
        <el-table border stripe :data="yyhsj_zysjcswzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column label="（1）场景" width="500">
            <template slot-scope="scope">
                <el-radio-group v-model="k1_yyhsj_zysjcswzx_data_radio">
                <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                </el-radio-group>
            </template>
            </el-table-column>
            <el-table-column label="（2）解决方案">
                <template slot-scope="scope">
                    <el-radio-group v-model="k1_yyhsj_zysjcswzx_jjfa_radio">
                        <el-radio 
                        v-for="(item,index) in scope.row.children" 
                        :key="index"
                        :label="item.value">{{ item.label }}</el-radio>
                        <br>
                    </el-radio-group>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <span class="h2-header">7.重要数据存储完整性</span><br><br>
        <el-table border stripe :data="yyhsj_zysjccwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column label="（1）场景" width="500">
            <template slot-scope="scope">
                <el-radio-group v-model="k1_yyhsj_zysjccwzx_data_radio">
                <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                </el-radio-group>
            </template>
            </el-table-column>
            <el-table-column label="（2）解决方案">
                <template slot-scope="scope">
                    <el-radio-group v-model="k1_yyhsj_zysjccwzx_jjfa_radio">
                        <el-radio 
                        v-for="(item,index) in scope.row.children" 
                        :key="index"
                        :label="item.value">{{ item.label }}</el-radio>
                        <br>
                    </el-radio-group>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <span class="h2-header">8.不可否认性</span><br><br>
        <el-table border stripe :data="yyhsj_bkfrx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column label="（1）场景" width="580">
            <template slot-scope="scope">
                <el-radio-group v-model="k1_yyhsj_bkfrx_data_radio">
                <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                </el-radio-group>
            </template>
            </el-table-column>
            <el-table-column label="（2）解决方案">
                <template slot-scope="scope">
                    <el-radio-group v-model="k1_yyhsj_bkfrx_jjfa_radio">
                        <el-radio 
                        v-for="(item,index) in scope.row.children" 
                        :key="index"
                        :label="item.value">{{ item.label }}</el-radio>
                        <br>
                    </el-radio-group>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <br><br>
    <div>
        <span class="h1-header">四、应用和数据安全(2)</span><el-divider></el-divider>
        <el-form ref="form" :model="Form" label-width="100px"><br>
            <el-form-item label="所属业务名称">
                <el-input v-model="k2_yyhsj_mc" placeholder="请输入所属业务名称"></el-input>
            </el-form-item>
        </el-form>
        <span class="h2-header">1.身份鉴别</span><br><br>
            <el-checkbox-group v-model="k2_yyhsj_sfjb_checkList">
                <el-checkbox label="41-00-1">【系统管理员-PC客户端-X-从内网访问业务系统】---使用：智能密码钥匙；服务器密码机；国密安全密码应用中间件；</el-checkbox><br>
                <el-checkbox label="41-01-1">【系统管理员-网页-X】---使用：可信浏览器；智能密码钥匙；证书；签名验签服务器；国密安全密码应用中间件；</el-checkbox><br>
                <el-checkbox label="41-02-1">【X-手机app-X】---使用：协同签名系统</el-checkbox><br>
                <el-checkbox label="41-03-1">【单位内普通用户/公众用户】---使用：无</el-checkbox><br>
            </el-checkbox-group>
        <br>
        <span class="h2-header">2.访问控制信息完整性</span><br><br>
        <el-table border stripe :data="yyhsj_fwkzxxwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column label="（1）场景" width="500">
            <template slot-scope="scope">
                <el-radio-group v-model="k2_yyhsj_fwkzxxwzx_radio">
                <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                </el-radio-group>
            </template>
            </el-table-column>
            <el-table-column label="（2）解决方案">
                <template slot-scope="scope">
                    <el-radio-group v-model="k2_yyhsj_fwkzxxwzx_jjfa_radio">
                        <el-radio 
                        v-for="(item,index) in scope.row.children" 
                        :key="index"
                        :label="item.value">{{ item.label }}</el-radio>
                        <br>
                    </el-radio-group>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <span class="h2-header">3.重要信息资源安全标记完整性</span><br><br>
        <el-table border stripe :data="yyhsj_zyxxzyaqbjwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column label="（1）场景" width="500">
            <template slot-scope="scope">
                <el-radio-group v-model="k2_yyhsj_zyxxzyaqbjwzx_data_radio">
                <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                </el-radio-group>
            </template>
            </el-table-column>
            <el-table-column label="（2）解决方案">
                <template slot-scope="scope">
                    <el-radio-group v-model="k2_yyhsj_zyxxzyaqbjwzx_jjfa_radio">
                        <el-radio 
                        v-for="(item,index) in scope.row.children" 
                        :key="index"
                        :label="item.value">{{ item.label }}</el-radio>
                        <br>
                    </el-radio-group>
                </template>
            </el-table-column>
        </el-table>
        <br>
        
        <span class="h2-header">4.重要数据传输机密性</span><br><br>
        <el-checkbox-group v-model="k2_yyhsj_zysjcsjmx_checkList">
            <el-checkbox label="44-00-1">客户端-服务端---使用：服务器密码机；国密安全密码应用中间件；</el-checkbox>
            <el-checkbox label="44-01-1">服务端-服务端---使用：服务器密码机；国密安全密码应用中间件；</el-checkbox>
        </el-checkbox-group>
        <br>
        <span class="h2-header">5.重要数据存储机密性</span><br><br>
        <el-table border stripe :data="yyhsj_zysjccjmx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column label="（1）场景" width="500">
            <template slot-scope="scope">
                <el-radio-group v-model="k2_yyhsj_zysjccjmx_data_radio">
                <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                </el-radio-group>
            </template>
            </el-table-column>
            <el-table-column label="（2）解决方案">
                <template slot-scope="scope">
                    <el-radio-group v-model="k2_yyhsj_zysjccjmx_jjfa_radio">
                        <el-radio 
                        v-for="(item,index) in scope.row.children" 
                        :key="index"
                        :label="item.value">{{ item.label }}</el-radio>
                        <br>
                    </el-radio-group>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <span class="h2-header">6.重要数据传输完整性</span><br><br>
        <el-table border stripe :data="yyhsj_zysjcswzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column label="（1）场景" width="500">
            <template slot-scope="scope">
                <el-radio-group v-model="k2_yyhsj_zysjcswzx_data_radio">
                <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                </el-radio-group>
            </template>
            </el-table-column>
            <el-table-column label="（2）解决方案">
                <template slot-scope="scope">
                    <el-radio-group v-model="k2_yyhsj_zysjcswzx_jjfa_radio">
                        <el-radio 
                        v-for="(item,index) in scope.row.children" 
                        :key="index"
                        :label="item.value">{{ item.label }}</el-radio>
                        <br>
                    </el-radio-group>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <span class="h2-header">7.重要数据存储完整性</span><br><br>
        <el-table border stripe :data="yyhsj_zysjccwzx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column label="（1）场景" width="500">
            <template slot-scope="scope">
                <el-radio-group v-model="k2_yyhsj_zysjccwzx_data_radio">
                <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                </el-radio-group>
            </template>
            </el-table-column>
            <el-table-column label="（2）解决方案">
                <template slot-scope="scope">
                    <el-radio-group v-model="k2_yyhsj_zysjccwzx_jjfa_radio">
                        <el-radio 
                        v-for="(item,index) in scope.row.children" 
                        :key="index"
                        :label="item.value">{{ item.label }}</el-radio>
                        <br>
                    </el-radio-group>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <span class="h2-header">8.不可否认性</span><br><br>
        <el-table border stripe :data="yyhsj_bkfrx_data" style="width: 120%" :header-cell-style="{background:'#eee',color:'#606266'}">
            <el-table-column label="（1）场景" width="580">
            <template slot-scope="scope">
                <el-radio-group v-model="k2_yyhsj_bkfrx_data_radio">
                <el-radio :label="scope.row.value">{{ scope.row.label }}</el-radio>
                </el-radio-group>
            </template>
            </el-table-column>
            <el-table-column label="（2）解决方案">
                <template slot-scope="scope">
                    <el-radio-group v-model="k2_yyhsj_bkfrx_jjfa_radio">
                        <el-radio 
                        v-for="(item,index) in scope.row.children" 
                        :key="index"
                        :label="item.value">{{ item.label }}</el-radio>
                        <br>
                    </el-radio-group>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <br><br>
    <div style="margin-top: 20px">
        <el-button @click="getStore">确定提交</el-button>
    </div>
</div>
</template>

<script>
    import axios from "axios"
    import {wlhhj_sfjb_data} from "./data/wlhhj/sfjb"
    import {wlhhj_dzmjjlsjccwzx_data} from "./data/wlhhj/dzmjjlsjccwzx"
    import {wlhhj_spjkjlsjccwzx_data} from "./data/wlhhj/spjkjlsjccwzx.js"
    import {sbhjs_rzjlwzx_data} from "./data/sbhjs/rzjlwzx.js"
    import {sbhjs_sfjb_data} from "./data/sbhjs/sfjb.js"
    import {sbhjs_xtzyfwkzxxwzx_data} from "./data/sbhjs/xtzyfwkzxxwzx.js"
    import {sbhjs_ycgltdaq_data} from "./data/sbhjs/ycgltdaq.js"
    import {sbhjs_zykzxcxwzx_data} from "./data/sbhjs/zykzxcxwzx.js"
    import {sbhjs_zyxxzyaqbjwzx_data} from "./data/sbhjs/zyxxzyaqbjwzx.js"
    import {yyhsj_sfjb_data} from "./data/yyhsj/sfjb.js";
    import {yyhsj_fwkzxxwzx_data} from "./data/yyhsj/fwkzxxwzx.js";
    import {yyhsj_zysjccjmx_data} from "./data/yyhsj/zysjccjmx.js";
    import {yyhsj_zysjccwzx_data} from "./data/yyhsj/zysjccwzx.js";
    import {yyhsj_zysjcsjmx_data} from "./data/yyhsj/zysjcsjmx.js";
    import {yyhsj_zysjcswzx_data} from "./data/yyhsj/zysjcswzx.js";
    import {yyhsj_zyxxzyaqbjwzx_data} from "./data/yyhsj/zyxxzyaqbjwzx.js";
    import {yyhsj_bkfrx_data} from "./data/yyhsj/bkfrx.js"
    import {ts_glzd_data} from "./data/ts/glzd.js"
    import {ts_mmyyjskj_data} from "./data/ts/mmyyjskj.js"
    import {ts_wlhtxaq_data} from "./data/ts/wlhtxaq.js"

  export default {
    methods: {
        getStore () {
            var k1_wlhtxaq_checkList_format = [];
            for (let index = 0; index < this.k1_wlhtxaq_checkList.length; index++) {
                let result = this.k1_sstdmc + '-' + this.k1_wlhtxaq_checkList[index]
                k1_wlhtxaq_checkList_format.push(result);
            }

            var k2_wlhtxaq_checkList_format = [];
            for (let index = 0; index < this.k2_wlhtxaq_checkList.length; index++) {
                let result = this.k2_sstdmc + '-' + this.k2_wlhtxaq_checkList[index]
                k2_wlhtxaq_checkList_format.push(result);
            }
            
            let data = {
                sys_name:this.sysname,
                sys_dbjb:this.dbjb,
                sys_xcyq:this.xcyq,
                sys_mmyyjskj:this.mmjsyykj,
                sys_glzd:this.glzd,
                sys_ywczxt:this.ywczxt,
                sys_ywsjk:this.ywsjk,
                sys_ywyy:this.ywyy,
                sys_yhyjqdb:this.yhyjqdb,
                sys_xtyh:this.xtyh,
                wlhhj:[
                    {
                        wlhhj_jfmc:this.k1_wlhhj_mc,
                        wlhhj_sfjb:this.k1_wlhhj_sfjb_jjfa_radio,
                        wlhhj_dzmj:this.k1_wlhhj_dzmjjlsjccwzx_jjfa_radio,
                        wlhhj_spjk:this.k1_wlhhj_spjkjlsjccwzx_jjfa_radio,
                    },
                    {
                        wlhhj_jfmc:this.k2_wlhhj_mc,
                        wlhhj_sfjb:this.k2_wlhhj_sfjb_jjfa_radio,
                        wlhhj_dzmj:this.k2_wlhhj_dzmjjlsjccwzx_jjfa_radio,
                        wlhhj_spjk:this.k2_wlhhj_spjkjlsjccwzx_jjfa_radio,
                    },
                    {
                        wlhhj_jfmc:this.k3_wlhhj_mc,
                        wlhhj_sfjb:this.k3_wlhhj_sfjb_jjfa_radio,
                        wlhhj_dzmj:this.k3_wlhhj_dzmjjlsjccwzx_jjfa_radio,
                        wlhhj_spjk:this.k3_wlhhj_spjkjlsjccwzx_jjfa_radio,
                    }
                ],
                wlhtx:[
                    {
                        wlhtx_xdmc:this.k1_sstdmc,
                        wlhtx_xd:k1_wlhtxaq_checkList_format
                    },
                    {
                        wlhtx_xdmc:this.k2_sstdmc,
                        wlhtx_xd:k2_wlhtxaq_checkList_format
                    }
                ],sbhjs:[
                    {
                        sbhjs_sbmc:this.k1_sbhjs_mc,
                        sbhjs_sfjb:this.k1_sbhjs_sfjb_jjfa_radio,
                        sbhjs_ycgl:this.k1_sbhjs_ycgltdaq_jjfa_radio,
                        sbhjs_xtzy:this.k1_sbhjs_xtzyfwkzxxwzx_jjfa_radio,
                        sbhjs_zyxx:this.k1_sbhjs_zyxxzyaqbjwzx_jjfa_radio,
                        sbhjs_rzjl:this.k1_sbhjs_rzjlwzx_jjfa_radio,
                        sbhjs_zykz:this.k1_ssbhjs_zykzxcxwzx_jjfa_radio,
                    },
                    {
                        sbhjs_sbmc:this.k2_sbhjs_mc,
                        sbhjs_sfjb:this.k2_sbhjs_sfjb_jjfa_radio,
                        sbhjs_ycgl:this.k2_sbhjs_ycgltdaq_jjfa_radio,
                        sbhjs_xtzy:this.k2_sbhjs_xtzyfwkzxxwzx_jjfa_radio,
                        sbhjs_zyxx:this.k2_sbhjs_zyxxzyaqbjwzx_jjfa_radio,
                        sbhjs_rzjl:this.k2_sbhjs_rzjlwzx_jjfa_radio,
                        sbhjs_zykz:this.k2_ssbhjs_zykzxcxwzx_jjfa_radio,
                    }
                ],
                yyhsj:[
                    {
                        yyhsj_ywmc:this.k1_yyhsj_mc,
                        yyhsj_sfjb:this.k1_yyhsj_sfjb_checkList,
                        yyhsj_fwkz:this.k1_yyhsj_fwkzxxwzx_jjfa_radio,
                        yyhsj_xxzy:this.k1_yyhsj_zyxxzyaqbjwzx_jjfa_radio,
                        yyhsj_csjmx:this.k1_yyhsj_zysjcsjmx_checkList,
                        yyhsj_ccjmx:this.k1_yyhsj_zysjccjmx_jjfa_radio,
                        yyhsj_cswzx:this.k1_yyhsj_zysjcswzx_jjfa_radio,
                        yyhsj_ccwzx:this.k1_yyhsj_zysjccwzx_jjfa_radio,
                        yyhsj_bkfr:this.k1_yyhsj_bkfrx_jjfa_radio,
                    },
                    {
                        yyhsj_ywmc:this.k2_yyhsj_mc,
                        yyhsj_sfjb:this.k2_yyhsj_sfjb_checkList,
                        yyhsj_fwkz:this.k2_yyhsj_fwkzxxwzx_jjfa_radio,
                        yyhsj_xxzy:this.k2_yyhsj_zyxxzyaqbjwzx_jjfa_radio,
                        yyhsj_csjmx:this.k2_yyhsj_zysjcsjmx_checkList,
                        yyhsj_ccjmx:this.k2_yyhsj_zysjccjmx_jjfa_radio,
                        yyhsj_cswzx:this.k2_yyhsj_zysjcswzx_jjfa_radio,
                        yyhsj_ccwzx:this.k2_yyhsj_zysjccwzx_jjfa_radio,
                        yyhsj_bkfr:this.k2_yyhsj_bkfrx_jjfa_radio,
                    }
                ],
                sbqd:this.sbqd,
            }
            //var jsonData = JSON.stringify(xmjbqk.methods.getData())
            var jsonData = JSON.stringify(data)
            console.log(jsonData)
            axios.post('/api/download',{
                "data":data,
            },{
                responseType:'blob'
            }
            ).then(function(response){
                var aTag = document.createElement('a')
                let tmp = response.data
                aTag.download = "测试文档.docx"
                aTag.href = URL.createObjectURL(tmp)
                aTag.click()
            }).catch(function(error){
                alert(error)
            })
    },
        handlextyh() {
            this.xtyh.push({});
        },
        handleyhyjqdb() {
            this.yhyjqdb.push({});
        },
        k1_wlhhj_sfjb_radio_func (val) {
            this.k1_wlhhj_sfjb_jjfa_radio = val + '-1'
            //alert(this.k1_wlhhj_sfjb_jjfa_radio)
        },
    },
    data () {
        return {
            //项目基本情况
            sysname: '',
            ywczxt:'',
            ywsjk:'',
            ywyy:'',
            dbjb: '',
            glzd:'',
            xcyq: '',
            mmjsyykj:'',
            yhyjqdb:[{
            }],
            xtyh: [{
                "sydw":"",
                "syry":"单位内普通用户",
                "sycj":"业务操作"
            },{
                "sydw":"",
                "syry":"系统管理员",
                "sycj":"管理业务系统"
            },{
                "sydw":"",
                "syry":"系统运维人员",
                "sycj":"系统运维"
            },{
                "sydw":"",
                "syry":"公众用户",
                "sycj":""
            }],
             
        sbqd: [{
            id:1,
            name:'服务器密码机',
            jbxh:'奇安信QuickHSM-HS1000',
            lb:'硬件',
            num:0,
            price:0
        },{
            id:2,
            name:'云服务器密码机',
            jbxh:'',
            lb:'硬件',
            num:0,
            price:0
        },{
            id:3,
            name:'签名验签服务器',
            jbxh:'',
            lb:'硬件',
            num:0,
            price:0
        },{
            id:4,
            name:'SSL VPN安全网关',
            jbxh:'',
            lb:'硬件',
            num:0,
            price:0
        },{
            id:5,
            name:'IPSec VPN安全网关',
            jbxh:'',
            lb:'硬件',
            num:0,
            price:0
        },{
            id:6,
            name:'可信浏览器',
            jbxh:'',
            lb:'软件',
            num:0,
            price:0
        },{
            id:7,
            name:'证书认证系统',
            jbxh:'',
            lb:'硬件',
            num:0,
            price:0
        },{
            id:8,
            name:'智能密码钥匙',
            jbxh:'',
            lb:'硬件',
            num:0,
            price:0
        },{
            id:9,
            name:'国密安全密码应用中间件',
            jbxh:'',
            lb:'软件',
            num:0,
            price:0
        },{
            id:10,
            name:'国密堡垒机',
            jbxh:'',
            lb:'硬件',
            num:0,
            price:0
        },{
            id:11,
            name:'密钥管理系统',
            jbxh:'',
            lb:'硬件',
            num:0,
            price:0
        },{
            id:12,
            name:'时间戳服务器',
            jbxh:'',
            lb:'硬件',
            num:0,
            price:0
        },{
            id:13,
            name:'安全电子签章系统',
            jbxh:'',
            lb:'硬件',
            num:0,
            price:0
        },{
            id:14,
            name:'协同签名系统',
            jbxh:'',
            lb:'硬件',
            num:0,
            price:0
        },{
            id:15,
            name:'密码资源池管理系统',
            jbxh:'',
            lb:'软件',
            num:0,
            price:0
        },{
            id:16,
            name:'云密码资源池管理系统',
            jbxh:'',
            lb:'软件',
            num:0,
            price:0
        },{
            id:17,
            name:'安全门禁系统',
            jbxh:'',
            lb:'硬件',
            num:0,
            price:0
        },{
            id:18,
            name:'国密视频监控系统',
            jbxh:'',
            lb:'硬件',
            num:0,
            price:0
        },{
            id:19,
            name:'密码应用技术服务',
            jbxh:'',
            lb:'服务',
            num:0,
            price:0
        }
        ],

            Form: {},
            //物理和环境    -不变数据
            wlhhj_sfjb_data:wlhhj_sfjb_data,
            wlhhj_dzmjjlsjccwzx_data:wlhhj_dzmjjlsjccwzx_data,
            wlhhj_spjkjlsjccwzx_data: wlhhj_spjkjlsjccwzx_data,
            //物理和环境    -变动数据
            k1_wlhhj_mc: '',
            k1_wlhhj_sfjb_data_radio: 0,
            k1_wlhhj_sfjb_jjfa_radio: 0,
            k1_wlhhj_dzmjjlsjccwzx_data_radio: 0,
            k1_wlhhj_dzmjjlsjccwzx_jjfa_radio: 0,
            k1_wlhhj_spjkjlsjccwzx_data_radio: 0,
            k1_wlhhj_spjkjlsjccwzx_jjfa_radio: 0,
            k2_wlhhj_mc: '',
            k2_wlhhj_sfjb_data_radio: 0,
            k2_wlhhj_sfjb_jjfa_radio: 0,
            k2_wlhhj_dzmjjlsjccwzx_data_radio: 0,
            k2_wlhhj_dzmjjlsjccwzx_jjfa_radio: 0,
            k2_wlhhj_spjkjlsjccwzx_data_radio: 0,
            k2_wlhhj_spjkjlsjccwzx_jjfa_radio: 0,
            k3_wlhhj_mc: '',
            k3_wlhhj_sfjb_data_radio: 0,
            k3_wlhhj_sfjb_jjfa_radio: 0,
            k3_wlhhj_dzmjjlsjccwzx_data_radio: 0,
            k3_wlhhj_dzmjjlsjccwzx_jjfa_radio: 0,
            k3_wlhhj_spjkjlsjccwzx_data_radio: 0,
            k3_wlhhj_spjkjlsjccwzx_jjfa_radio: 0,
            //网络和通信安全
            wlhtxaq_sstdmc_data:[{
                value:'52-01',
                label:'外网IPSec VPN与IPSec VPN之间的通信信道'
            },{
                value:'52-02',
                label:'互联网VPN客户端与内网SSL VPN之间的通信信道'
            }
            ],
            k1_sstdmc:'',
            k1_wlhtxaq_checkList:[],
            k2_sstdmc:'',
            k2_wlhtxaq_checkList:[],
            //设备和计算    --不变变量
            sbhjs_sfjb_data: sbhjs_sfjb_data,
            sbhjs_ycgltdaq_data:sbhjs_ycgltdaq_data,
            sbhjs_xtzyfwkzxxwzx_data:sbhjs_xtzyfwkzxxwzx_data,
            sbhjs_zyxxzyaqbjwzx_data:sbhjs_zyxxzyaqbjwzx_data,
            sbhjs_rzjlwzx_data:sbhjs_rzjlwzx_data,
            sbhjs_zykzxcxwzx_data:sbhjs_zykzxcxwzx_data,
            //设备和计算    --变化变量
            k1_sbhjs_mc: '',
            k1_sbhjs_sfjb_data_radio: 0,
            k1_sbhjs_sfjb_jjfa_radio: 0,
            k1_sbhjs_ycgltdaq_data_radio: 0,
            k1_sbhjs_ycgltdaq_jjfa_radio: 0,
            k1_sbhjs_xtzyfwkzxxwzx_data_radio: 0,
            k1_sbhjs_xtzyfwkzxxwzx_jjfa_radio: 0,
            k1_sbhjs_zyxxzyaqbjwzx_data_radio: 0,
            k1_sbhjs_zyxxzyaqbjwzx_jjfa_radio: 0,
            k1_sbhjs_rzjlwzx_data_radio: 0,
            k1_sbhjs_rzjlwzx_jjfa_radio: 0,
            k1_sbhjs_zykzxcxwzx_data_radio: 0,
            k1_ssbhjs_zykzxcxwzx_jjfa_radio: 0,

            k2_sbhjs_mc: '',
            k2_sbhjs_sfjb_data_radio: 0,
            k2_sbhjs_sfjb_jjfa_radio: 0,
            k2_sbhjs_ycgltdaq_data_radio: 0,
            k2_sbhjs_ycgltdaq_jjfa_radio: 0,
            k2_sbhjs_xtzyfwkzxxwzx_data_radio: 0,
            k2_sbhjs_xtzyfwkzxxwzx_jjfa_radio: 0,
            k2_sbhjs_zyxxzyaqbjwzx_data_radio: 0,
            k2_sbhjs_zyxxzyaqbjwzx_jjfa_radio: 0,
            k2_sbhjs_rzjlwzx_data_radio: 0,
            k2_sbhjs_rzjlwzx_jjfa_radio: 0,
            k2_sbhjs_zykzxcxwzx_data_radio: 0,
            k2_ssbhjs_zykzxcxwzx_jjfa_radio: 0,

            //应用和数据安全  --不变变量
            yyhsj_fwkzxxwzx_data:yyhsj_fwkzxxwzx_data,
            yyhsj_zyxxzyaqbjwzx_data:yyhsj_zyxxzyaqbjwzx_data,
            yyhsj_zysjccjmx_data:yyhsj_zysjccjmx_data,
            yyhsj_zysjcswzx_data:yyhsj_zysjcswzx_data,
            yyhsj_bkfrx_data:yyhsj_bkfrx_data,
            yyhsj_zysjccwzx_data:yyhsj_zysjccwzx_data,
            //应用和数据安全  --变化变量
            k1_yyhsj_mc: '',
            k1_yyhsj_sfjb_checkList:[],
            k1_yyhsj_fwkzxxwzx_radio: 0,
            k1_yyhsj_fwkzxxwzx_jjfa_radio: 0,
            k1_yyhsj_zyxxzyaqbjwzx_data_radio: 0,
            k1_yyhsj_zyxxzyaqbjwzx_jjfa_radio: 0,
            k1_yyhsj_zysjcsjmx_checkList:[],
            k1_yyhsj_zysjccjmx_data_radio: 0,
            k1_yyhsj_zysjccjmx_jjfa_radio: 0,
            k1_yyhsj_zysjcswzx_data_radio: 0,
            k1_yyhsj_zysjcswzx_jjfa_radio: 0,
            k1_yyhsj_zysjccwzx_data_radio:0,
            k1_yyhsj_zysjccwzx_jjfa_radio:0,
            k1_yyhsj_bkfrx_data_radio:0,
            k1_yyhsj_bkfrx_jjfa_radio:0,

            k2_yyhsj_mc: '',
            k2_yyhsj_sfjb_checkList:[],
            k2_yyhsj_sfjb_data_radio: 0,
            k2_yyhsj_sfjb_jjfa_radio: 0,
            k2_yyhsj_fwkzxxwzx_radio: 0,
            k2_yyhsj_fwkzxxwzx_jjfa_radio: 0,
            k2_yyhsj_zyxxzyaqbjwzx_data_radio: 0,
            k2_yyhsj_zyxxzyaqbjwzx_jjfa_radio: 0,
            k2_yyhsj_zysjcsjmx_checkList:[],
            k2_yyhsj_zysjccjmx_data_radio: 0,
            k2_yyhsj_zysjccjmx_jjfa_radio: 0,
            k2_yyhsj_zysjcswzx_data_radio: 0,
            k2_yyhsj_zysjcswzx_jjfa_radio: 0,
            k2_yyhsj_bkfrx_data_radio:0,
            k2_yyhsj_bkfrx_jjfa_radio:0,
            k2_yyhsj_zysjccwzx_data_radio:0,
            k2_yyhsj_zysjccwzx_jjfa_radio:0,
        };
    }
  }
</script>

<style>
.fontClass{
font-size: 52px;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.h1-header{
font-size: 32px;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.h2-header{
font-size: 22px;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>