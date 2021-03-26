/*
 * @Author: your name
 * @Date: 2019-10-11 10:42:19
 * @LastEditTime: 2020-08-03 14:26:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \phone-test\src\components\common\action.js
 */
/**
 * Created by hdz on 2019/5/22.
 * 公共全局方法文件
 */
/**
 * Created by hdz on 2019/5/22.
 * 公共全局方法文件
 */
// import * as dd from 'dingtalk-jsapi'

// 是否为线上环境
export function isDevOnline () {
  console.log(window.location.host)
  console.log(process.env.NODE_ENV)
  // if (process.env.NODE_ENV !== 'development' && window.location.host !== 'kq.sjviper.com') {
  if (process.env.NODE_ENV !== 'development') {
    return true
  } else {
    return false
  }
}

// 跳转新路由
export function toNewPage (url) {
  this.$router.push(url)
}

// 判断当前浏览器的类型
export function isMobile () {
  if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    return true // 移动端
  } else {
    return false // PC端
  }
}

// export function previewFile (file) {
//   console.log(file.url)
//   let type = this.getFileType(file.name)
//   if (type === 'img') {
//     let imgList = []
//     imgList[0] = file.url
//     this.dd.ready(() => {
//       dd.biz.util.previewImage({
//         urls: imgList, // 图片地址列表
//         current: imgList[0] // 当前显示的图片链接
//       })
//     })
//   } else {
//     // window.open()
//     let url = file.url
//     if (process.env.NODE_ENV === 'development') {
//       window.open(url)
//     } else {
//       url = type === 'pdf' ? window.location.origin + '/pdfJs/web/viewer.html?file=' + file.url : 'https://view.officeapps.live.com/op/view.aspx?src=' + file.url
//       this.dd.ready(() => {
//         this.dd.biz.util.openLink({
//           url: url // 要打开链接的地址
//           // onSucces: (result) => {
//           // },
//           // onFail: (err) => {
//           //   console.log(err)
//           // }
//         })
//       })
//     }
//   }
// }
