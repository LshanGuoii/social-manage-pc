/*
 * @Author: your name
 * @Date: 2020-06-17 16:15:35
 * @LastEditTime: 2020-10-14 15:23:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \phone-test\src\components\dingdingApi\dingTalkApi.js
 */
// 引入钉钉JSApi
import * as dd from 'dingtalk-jsapi'
// 引入接口请求
import * as apis from '@/utils/apis.js'

// 禁用苹果弹性View (F)
function disableIOSBounce () {
  dd.ready(() => {
    dd.ui.webViewBounce.disable()
  })
}

// 关闭应用 (F)
function navigationClose () {
  dd.ready(() => {
    dd.biz.navigation.close()
  })
}

// 钉钉获取code授权 (F)
function loginDingTalk (corpId) {
  return new Promise((resolve, reject) => {
    dd.ready(() => {
      dd.runtime.permission.requestAuthCode({
        corpId: corpId,
        onSuccess: (result) => {
          resolve(result)
        },
        onFail: (err) => {
          reject(err)
        }
      })
    })
  })
}

// 设置左上角控制 (F)
function setLeftBack (isCon) {
  return new Promise((resolve, reject) => {
    dd.ready(() => {
      dd.biz.navigation.setLeft({
        control: isCon, // 是否控制点击事件，true 控制，false 不控制， 默认false
        android: true, // 安卓端如果需要控制左上角返回事件加上这个字段，并设置为true
        text: '', // 控制显示文本，空字符串表示显示默认文本
        onSuccess: (result) => {
          resolve(result)
        },
        onFail: (err) => {
          reject(err)
        }
      })
    })
  })
}

// 设置右上角按钮 (F)
function setRightMenu () {
  return new Promise((resolve, reject) => {
    dd.ready(() => {
      dd.biz.navigation.setRight({
        show: true, // 控制按钮显示
        control: true, // 是否控制点击事件，true 控制
        text: '', // 控制显示文本，空字符串表示显示默认文本
        onSuccess: (result) => {
          // 修改新分享的功能
          dd.biz.util.share({
            type: 0, // 分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
            url: window.location.origin + '/' +
                 window.location.search + '#/index?linkUrl=' +
                 window.location.hash.substring(1),
            content: '以客户为中心', // 分享描述
            title: '信确CRM', // 分享标题
            image: window.location.origin + '/' + 'static/images/share.png', // 分享缩略图
            onSuccess: () => {
              // onSuccess将在分享完成之后回调
              resolve(result)
            },
            onFail: err => console.log(err)
          })
        },
        onFail: (err) => {
          reject(err)
        }
      })
    })
  })
}

// 设置右上角多个按钮 (F)
function setRightMenuList (rightBtn) {
  let BtnItems = JSON.parse(rightBtn)
  return new Promise((resolve, reject) => {
    dd.ready(() => {
      dd.biz.navigation.setMenu({
        items: BtnItems,
        onSuccess: (result) => {
          resolve(result)
        },
        onFail: (err) => {
          reject(err)
        }
      })
    })
  })
}

// 设置标题 (F)
function setMetaTitle (title) {
  dd.ready(() => {
    dd.biz.navigation.setTitle({
      title: title // 控制标题文本，空字符串表示显示默认文本
    })
  })
}

// Toast (F)
function dingTalkToast (type, text, duration) {
  dd.ready(() => {
    dd.device.notification.toast({
      icon: type, // icon样式，不同客户端参数不同，请参考参数说明
      text: text, // 提示信息
      duration: duration, // 显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
      delay: 0 // 延迟显示，单位秒，默认0
    })
  })
}

// 页面跳转 不会退出钉钉应用 (F)
function openNewDingTalkPage (url) {
  dd.biz.util.openLink({
    url: url // 要打开链接的地址
  })
}

// 日期选择器 (F) (待用)
function datepicker () {
  dd.ready(() => {
    dd.biz.util.datepicker({
      format: 'yyyy-MM-dd', // 注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
      value: '2015-04-17' // 默认显示日期
    })
  })
}

// 获取鉴权参数
function getJsAuth () {
  let corpid = sessionStorage.getItem('corpid')
  let params = {
    url: window.location.origin + '/?dd_nav_bgcolor=FF008C0E&corpid=',
    corp_id: corpid
  }
  return new Promise((resolve, reject) => {
    apis.jsAuth((params)).then((res) => {
      if (res.code === 0) {
        resolve(res)
      } else {
        dingTalkToast('', '鉴权失败!  操作异常 或 身份过期！', 4)
        reject(res.msg)
      }
    })
  })
}

// 鉴权
function getJqConfig () {
  getJsAuth().then((result) => {
    let jqConfigList = result.data
    dd.config({
      agentId: jqConfigList.agent_id,
      corpId: jqConfigList.corp_id,
      timeStamp: jqConfigList.time_stamp,
      nonceStr: jqConfigList.nonce_str,
      signature: jqConfigList.js_sign,
      jsApiList: [
        'biz.util.open',
        'biz.util.scanCard',
        'biz.map.locate',
        'device.geolocation.get',
        'biz.clipboardData.setData',
        'biz.util.uploadImageFromCamera',
        'biz.telephone.showCallMenu'
      ]
      //     'biz.util.uploadImage',,
    })
  })
}

// 获取个人信息 (T)
function getPersonMsg (userID) {
  dd.ready(() => {
    dd.biz.util.open({
      name: 'profile', // 页面名称
      params: {
        id: userID,
        corpId: sessionStorage.getItem('corpid')
      } // 传参
    })
  })
}

// 拨打电话 (T)
function callTelephone (phone) {
  return new Promise((resolve, reject) => {
    dd.ready(() => {
      dd.biz.telephone.showCallMenu({
        phoneNumber: phone, // 期望拨打的电话号码
        code: '+86', // 国家代号，中国是+86
        showDingCall: true, // 是否显示钉钉电话
        onSuccess: (result) => {
          resolve(result)
        },
        onFail: (err) => {
          reject(err)
        }
      })
    })
  })
}

// 扫名片
function scanCard () {
  return new Promise((resolve, reject) => {
    dd.ready(() => {
      dd.biz.util.scanCard({ // 无需传参数
        onSuccess: (result) => {
          resolve(result)
        },
        onFail: (err) => {
          reject(err)
        }
      })
    })
  })
}

export default {
  disableIOSBounce, // 禁用苹果弹性View
  navigationClose, // 关闭应用
  loginDingTalk, // 钉钉获取code授权
  setLeftBack, // 设置左上角控制
  setRightMenu, // 设置右上角按钮
  setRightMenuList, // 设置右上角多个按钮
  setMetaTitle, // 设置标题
  dingTalkToast, // Toast
  openNewDingTalkPage, // 页面跳转
  datepicker, // 日期选择器 (待用)
  getJqConfig, // 鉴权
  getPersonMsg, // 获取个人信息
  callTelephone, // 拨打电话
  scanCard // 扫名片
}
