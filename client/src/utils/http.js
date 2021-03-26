/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-06 18:36:30
 * @LastEditTime: 2020-10-14 14:38:56
 * @LastEditors: Please set LastEditors
 */
/**
 * Created by hdz on 2019/3/26.
 */
import axios from 'axios'
import Qs from 'qs'

// axios.defaults.timeout = 5000;
axios.defaults.baseURL = ''
// 此处是增加的代码，设置请求头的类型
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 域名
let baseUrl
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://' + window.location.host
} else if (window.location.host === 'mobile.xqcrm.com') {
  baseUrl = 'https://api.xqcrm.com'
} else if (window.location.host === 'weixinquntongji.sjviper.com') {
  baseUrl = 'http://weixinquntongji.sjviper.com'
} else {
  // baseUrl = 'http://kqapi.vaiwan.com'
  baseUrl = 'http://weixinquntongji.sjviper.com'
}
export const baseUrl1 = baseUrl

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = Qs.stringify(config.data)
    }
    // if (!token && config.url !== '/api/login/trailLogin' && config.url !== '/api/login/otherLogin' && config.url !== '/api/login/login' && config.url !== '/api/login/login1' && config.url !== '/api/login/getCropMsg') {
    //   location.href = process.env.NODE_ENV === 'development' ? baseUrl : window.location.origin + '?dd_nav_bgcolor=FF008C0E&corpid=$CORPID$#/index'
    // } else {
    // config.headers['token'] = token
    // config.headers['sign'] = sign
    // console.log(config.method)
    if (config.method === 'get' || config.method === 'delete') {
      // config.params.token = token
    } else if (config.method !== 'post') {
      // config.data.token = token
      config.data = Qs.stringify(config.data)
    }
    // }
    config.url = baseUrl + config.url
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    /* if(response.data.errCode ==2){
      router.push({
        path:"/login",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    } */
    if (response.code === -2) {
      location.href = process.env.NODE_ENV === 'development' ? baseUrl : window.location.origin + '?dd_nav_bgcolor=FF008C0E&corpid=$CORPID$#/index'
    } else if (response.data.code === 110) {
      location.href = process.env.NODE_ENV === 'development' ? baseUrl + '/#/uphold' : window.location.origin + '?dd_nav_bgcolor=FF008C0E&corpid=$CORPID$#/error1'
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */

export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param params
 * @returns {Promise}
 */

export function post (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param params
 * @returns {Promise}
 */

export function patch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, params).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装put请求
 * @param url
 * @param params
 * @returns {Promise}
 */

export function put (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装delete方法
 * @param url
 * @param params
 * @returns {Promise}
 */

export function deleteData (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}
