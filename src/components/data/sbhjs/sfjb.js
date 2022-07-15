//设备和计算 身份鉴别
export { sbhjs_sfjb_data };

const sbhjs_sfjb_data = [
    {
        value: '31-00',
        label: '已使用国密堡垒机',
        children: [{
            value: '31-00-1',
            label: '无'
            }]
    },{
        value: '31-01',
        label: '使用国密堡垒机',
        children: [{
            value: '31-01-1',
            label: '服务器密码机、堡垒机、签名验签服务器、USBKEY、国密安全密码应用中间件'
            }]
    },{
        value: '31-02',
        label: '不使用堡垒机，采用证书验证',
        children: [{
            value: '31-01-1',
            label: '服务器密码机、签名验签服务器、USBKEY、国密安全密码应用中间件'
            }]
    },{
        value: '31-03',
        label: '不使用堡垒机，采用对称密钥验证',
        children: [{
            value: '31-03-1',
            label: '服务器密码机、签名验签服务器、USBKEY、国密安全密码应用中间件'
            }]
    },{
        value: '31-04',
        label: '有缓解措使用',
        children: [{
            value: '31-04-1',
            label: '无'
            }]
    },
]
