import axios from 'axios'
export function request(config){
  // 1、创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:500
  })
  // 2、请求拦截 记得返回请求！
  instance.interceptors.request.use(config=>{
    // console.log(config);
    return config;
  },err=>{
    // console.log(err);
  })

  // 3、响应拦截
  instance.interceptors.response.use(res=>{
    // console.log(res);
    return res.data;
  },err=>{
    // console.log(err);
  })


  // 4、使用实例发送请求
  return instance(config);

}
