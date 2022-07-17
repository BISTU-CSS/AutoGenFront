<template>
    <div>
        <el-row>
        </el-row>
        <el-row>
            <el-tabs v-model="activeName">
                <el-tab-pane label="项目基本信息" name="zero">
                    <el-form ref="form" :model="form" label-width="80px">
                        项目名称<br>
                        <el-form-item label="问题1">
                            <el-input v-model="sysname" placeholder="请输入项目名称"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="物理和环境" name="first">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="问题1">
                            身份鉴别<br>
                            <el-cascader v-model="wlhhj_sfjb_form" :options="wlhhj_sfjb_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题2">
                            电子门禁记录数据存储完整性<br>
                            <el-cascader v-model="wlhhj_dzmj_form" :options="wlhhj_dzmj_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题3">
                            视频监控记录数据存储完整性<br>
                            <el-cascader v-model="wlhhj_spjk_form" :options="wlhhj_spjk_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <!-- <el-tab-pane label="网络和通信" name="second">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="问题1">
                            身份鉴别<br>
                            <el-cascader v-model="wlhtx_sfjb_form" :options="wlhtx_sfbj_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题2">
                            通信过程中重要数据完整性<br>
                            <el-cascader v-model="wlhtx_sjwzx_form" :options="wlhtx_sjwzx_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题3">
                            通信过程中重要数据的机密性<br>
                            <el-cascader v-model="wlhtx_sjjmx_form" :options="wlhtx_sjjmx_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题4">
                            网络边界访问控制信息的完整性<br>
                            <el-cascader v-model="wlhtx_wlbj_form" :options="wlhtx_wlbj_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题5">
                            安全接入认证<br>
                            <el-cascader v-model="wlhtx_aqjr_form" :options="wlhtx_aqjr_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>  
                    </el-form>  
                </el-tab-pane> -->
                <el-tab-pane label="设备和计算" name="third">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="问题1">
                            身份鉴别<br>
                            <el-cascader v-model="sbhjs_sfjb_form" :options="sbhjs_sfjb_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题2">
                            远程管理通道安全<br>
                            <el-cascader v-model="sbhjs_ycgl_form" :options="sbhjs_ycgl_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>    
                        <el-form-item label="问题3">
                            系统资源访问控制信息完整性<br>
                            <el-cascader v-model="sbhjs_xtzy_form" :options="sbhjs_xtzy_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题4">
                            重要信息资源安全标记完整性<br>
                            <el-cascader v-model="sbhjs_zyxx_form" :options="sbhjs_zyxx_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题5">
                            日志记录完整性<br>
                            <el-cascader v-model="sbhjs_rzjl_form" :options="sbhjs_rzjl_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题6">
                            重要可执行程序完整性、重要可执行程序来源真实性<br>
                            <el-cascader v-model="sbhjs_zykzx_form" :options="sbhjs_zykzx_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="应用和数据" name="fourth">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="问题1">
                            身份鉴别<br>
                            <el-cascader v-model="yyhsj_sfjb_form" :options="yyhsj_sfjb_options"  placeholder="多选" :props="props" style="width: 90%;" clearable>
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题2">
                            访问控制信息完整性<br>
                            <el-cascader v-model="yyhsj_fwkz_form" :options="yyhsj_fwkz_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题3">
                            重要信息资源安全标记完整性<br>
                            <el-cascader v-model="yyhsj_xxzy_form" :options="yyhsj_xxzy_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题4">
                            重要数据传输机密性<br>
                            <el-cascader v-model="yyhsj_csjmx_form" :options="yyhsj_csjmx_options"  placeholder="多选" :props="props" style="width: 90%;" clearable>
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题5">
                            重要数据存储机密性<br>
                            <el-cascader v-model="yyhsj_ccjmx_form" :options="yyhsj_ccjmx_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题6">
                            重要数据传输完整性<br>
                            <el-cascader v-model="yyhsj_cswzx_form" :options="yyhsj_cswzx_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题7">
                            重要数据存储完整性<br>
                            <el-cascader v-model="yyhsj_ccwzx_form" :options="yyhsj_ccwzx_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题8">
                            不可否认性<br>
                            <el-cascader v-model="yyhsj_bkfr_form" :options="yyhsj_bkfr_options" style="width: 90%;">
                            </el-cascader>
                        </el-form-item>
                    </el-form>  
                </el-tab-pane>
                <el-tab-pane label="特殊" name="five">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="问题1">
                            管理制度<br>
                            <el-select v-model="ts_glzd_form" placeholder="请选择">
                                <el-option
                                v-for="item in ts_glzd_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="问题2">
                            网络和通信安全<br>
                            <el-cascader v-model="ts_wlhtxaq_form" :options="ts_wlhtxaq_options" placeholder="多选" :props="props" style="width: 90%;" clearable>
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="问题3">
                            密码应用技术框架<br>
                            <el-select v-model="ts_mmyy_form" placeholder="请选择">
                                <el-option
                                v-for="item in ts_mmyy_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-row>

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
    data () {
        return {
            form: {},
            sysname: '',
            activeName: 'first',
            radio:'1',
            props: { multiple: true },      //设置多选联级菜单
            //物理和环境-选择表单
            wlhhj_sfjb_form: [],
            wlhhj_sfjb_options: wlhhj_sfjb_data,
            wlhhj_dzmj_form:[],
            wlhhj_dzmj_options: wlhhj_dzmjjlsjccwzx_data,
            wlhhj_spjk_form:[],
            wlhhj_spjk_options: wlhhj_spjkjlsjccwzx_data,
            //网络和通信-选择表单
            // wlhtx_sfjb_form:[],
            // wlhtx_sfbj_options:,
            // wlhtx_sjwzx_form:[],
            // wlhtx_sjwzx_options:,
            // wlhtx_sjjmx_form:[],
            // wlhtx_sjjmx_options:,
            // wlhtx_wlbj_form:[],
            // wlhtx_wlbj_options:,
            // wlhtx_aqjr_form:[],
            // wlhtx_aqjr_options:,
            //设备和计算-选择表单
            sbhjs_sfjb_form:[],
            sbhjs_sfjb_options:sbhjs_sfjb_data,
            sbhjs_ycgl_form:[],
            sbhjs_ycgl_options:sbhjs_ycgltdaq_data,
            sbhjs_xtzy_form:[],
            sbhjs_xtzy_options:sbhjs_xtzyfwkzxxwzx_data,
            sbhjs_zyxx_form:[],
            sbhjs_zyxx_options:sbhjs_zyxxzyaqbjwzx_data,
            sbhjs_rzjl_form:[],
            sbhjs_rzjl_options:sbhjs_rzjlwzx_data,
            sbhjs_zykzx_form:[],
            sbhjs_zykzx_options:sbhjs_zykzxcxwzx_data,
            //应用和数据
            yyhsj_sfjb_form:[],
            yyhsj_sfjb_options: yyhsj_sfjb_data,
            yyhsj_fwkz_form:[],
            yyhsj_fwkz_options: yyhsj_fwkzxxwzx_data,
            yyhsj_xxzy_form:[],
            yyhsj_xxzy_options:yyhsj_zyxxzyaqbjwzx_data,
            yyhsj_csjmx_form:[],
            yyhsj_csjmx_options:yyhsj_zysjcsjmx_data,
            yyhsj_ccjmx_form:[],
            yyhsj_ccjmx_options:yyhsj_zysjccjmx_data,
            yyhsj_cswzx_form:[],
            yyhsj_cswzx_options:yyhsj_zysjcswzx_data,
            yyhsj_ccwzx_form:[],
            yyhsj_ccwzx_options:yyhsj_zysjccwzx_data,
            yyhsj_bkfr_form:[],
            yyhsj_bkfr_options:yyhsj_bkfrx_data,
            //特殊
            ts_glzd_form:[],
            ts_glzd_options:ts_glzd_data,
            ts_wlhtxaq_form:[],
            ts_wlhtxaq_options:ts_wlhtxaq_data,
            ts_mmyy_form:[],
            ts_mmyy_options:ts_mmyyjskj_data,
        };
    },
    methods: {
        toggleSelection () {
            this.$refs.multipleTable.clearSelection()
        },
        getStore () {
            var yyhsj_sfjb_form_format = [];
            for (let index = 0; index < this.yyhsj_sfjb_form.length; index++) {
                yyhsj_sfjb_form_format.push(this.yyhsj_sfjb_form[index][1]);
            }
            var yyhsj_csjmx_form_format = [];
            for (let index = 0; index < this.yyhsj_csjmx_form.length; index++) {
                yyhsj_csjmx_form_format.push(this.yyhsj_csjmx_form[index][1]);
            }
            var ts_wlhtxaq_form_format = [];
            for (let index = 0; index < this.ts_wlhtxaq_form.length; index++) {
                ts_wlhtxaq_form_format.push(this.ts_wlhtxaq_form[index][1]);
            }
            //alert(ts_wlhtxaq_form_format)
            let data = {
                sys_name:this.sysname,
                wlhhj_sfjb:this.wlhhj_sfjb_form[1],
                wlhhj_dzmj:this.wlhhj_dzmj_form[1],
                wlhhj_spjk:this.wlhhj_spjk_form[1],

                // wlhtx_sfjb:this.wlhtx_sfjb_form[1],
                // wlhtx_sjwzx:this.wlhtx_sjwzx_form[1],
                // wlhtx_sjjmx:this.wlhtx_sjjmx_form[1],
                // wlhtx_wlbj:this.wlhtx_wlbj_form[1],
                // wlhtx_aqjr:this.wlhtx_aqjr_form[1],

                sbhjs_sfjb:this.sbhjs_sfjb_form[1],
                sbhjs_ycgl:this.sbhjs_ycgl_form[1],
                sbhjs_xtzy:this.sbhjs_xtzy_form[1],
                sbhjs_zyxx:this.sbhjs_zyxx_form[1],
                sbhjs_rzjl:this.sbhjs_rzjl_form[1],
                sbhjs_zykz:this.sbhjs_zykzx_form[1],

                yyhsj_sfjb:yyhsj_sfjb_form_format,
                yyhsj_fwkz:this.yyhsj_fwkz_form[1],
                yyhsj_xxzy:this.yyhsj_xxzy_form[1],
                yyhsj_csjmx:yyhsj_csjmx_form_format,
                yyhsj_ccjmx:this.yyhsj_ccjmx_form[1],
                yyhsj_cswzx:this.yyhsj_cswzx_form[1],
                yyhsj_ccwzx:this.yyhsj_ccwzx_form[1],
                yyhsj_bkfr:this.yyhsj_bkfr_form[1],

                ts_glzd:this.ts_glzd_form,
                ts_wlhtxaq:ts_wlhtxaq_form_format,
                ts_mmyy:this.ts_mmyy_form,

            }
            var jsonData = JSON.stringify(data)
            //alert(jsonData)

            axios.post('/api/demo',{
                "data":data,
            }
            ).then(function(response){
                alert(response)
            }).catch(function(error){
                alert(error)
            })
        }
    },
}
</script>
