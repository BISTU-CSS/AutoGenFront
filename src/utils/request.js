import axios from 'axios'
import store from '@/store'



//创建axios实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // 本地测试用
  // baseURL: "http://172.22.1.200:8084/api", // 远程部署用
  baseURL: "http://127.0.0.1:8084/api", // 远程部署用
})

// request 请求拦截
service.interceptors.request.use(
  config => {
    if (store.getters.getToken) {
      config.headers['token'] = window.sessionStorage.getItem("token")
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    alert("do something with request error")
    return Promise.reject(error)
  }
)

//response响应拦截
axios.interceptors.response.use(response => {
    let res = response.data;
    console.log(res)
    if (res.retcode === 'ok' ||res.retcode === 'error') {
      return response
      //本地测试用example.docx  远程部署用complete_example.docx
      //未来不使用get('Content-Disposition')，通过其它方式拦截返回的文件流
    }
    // else if (response.headers.get('Content-Disposition') === 'attachment; filename="example.docx"'){
    // // } else if (response.headers.get('Content-Disposition') === 'attachment; filename="complete_example.docx"'){
    //   return response
    // }else if (response.headers.get('Content-Disposition') === 'attachment; filename="sbqd.xlsx"'){
    //   return response
    // }
    else if (response.headers.get('Content-Type') === 'application/octet-stream'){
      return response
    } else {
      return Promise.reject(response.data.msg)
    }
  },
  error => {
   // console.log(error)
    if (error.response.data) {
      error.message = error.response.data.msg
    }
    if (error.response.data.retcode !== 'ok') {
      router.push("/")
    }
    return Promise.reject(error)
  }
)


export default service

