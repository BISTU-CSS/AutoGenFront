//物理和环境 电子门禁记录数据存储完整性
export { wlhhj_dzmjjlsjccwzx_data };

const wlhhj_dzmjjlsjccwzx_data = [{
    value: '12-00',
    label: '新建机房，尚未建设门禁',
    children: [{
        value: '12-00-1',
        label: '国密电子门禁'
        }, {
        value: '12-00-2',
        label: '无'
    }]
},
{
    value: '12-01',
    label: '租机房，有门禁，不合规',
    children: [{
        value: '12-01-1',
        label: '国密电子门禁'
        }, {
        value: '11-00-2',
        label: '无'
    }]
},
{
    value: '12-02',
    label: '租机房，已经有门禁，合规',
    children: [{
        value: '12-02-1',
        label: '无'
    }]
},
{
    value: '12-03',
    label: '旧机房，已经有门禁，但不合规',
    children: [{
        value: '12-03-1',
        label: '国密电子门禁'
        },{
        value: '12-03-2',
        label: '无'
    }]
},
{
    value: '12-04',
    label: '旧机房，已经有门禁，合规',
    children: [{
        value: '12-04-1',
        label: '无'
    }]
},
{
    value: '12-05',
    label: '不确定',
    children: [{
        value: '12-05-1',
        label: '国密电子门禁'
    }]
}
]
