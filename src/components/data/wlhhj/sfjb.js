//物理和环境 身份鉴别
export { wlhhj_sfjb_data };

const wlhhj_sfjb_data = [
    {
        value: '11-00',
        label: '新建机房，尚未建设门禁',
        children: [{
            value: '11-00-1',
            label: '国密电子门禁'
            }, {
            value: '11-00-2',
            label: '无'
        }]
    },
    {
        value: '11-01',
        label: '租机房，有门禁，不合规',
        children: [{
            value: '11-01-1',
            label: '国密电子门禁'
            }, {
            value: '11-01-2',
            label: '无'
        }]
    },
    {
        value: '11-02',
        label: '租机房，已经有门禁，合规',
        children: [{
            value: '11-02',
            label: '无'
        }]
    },
    {
        value: '11-03',
        label: '旧机房，已经有门禁，但不合规',
        children: [{
            value: '11-03-1',
            label: '国密电子门禁'
            }, {
            value: '11-03-2',
            label: '无'
        }]
    },
    {
        value: '11-04',
        label: '旧机房，已经有门禁，合规',
        children: [{
            value: '11-04',
            label: '无'
        }]
    },
    {
        value: '11-05',
        label: '不确定（默认）',
        children: [{
            value: '11-05-1',
            label: '国密电子门禁'
        }]
    },
    {
        value: '11-06',
        label: '没有这个问题、不涉及',
        children: [{
            value: '11-06',
            label: '无'
        }]
    },
    {
        value: '11-07',
        label: '以上都不是',
        children: [{
            value: '11-07',
            label: '无'
        }]
    },
]
