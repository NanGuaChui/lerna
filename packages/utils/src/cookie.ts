const getCookieSource = (name: string) => {
  var arrStr = document.cookie.split('; ')
  for (var i = 0; i < arrStr.length; i++) {
    var temp = arrStr[i].split('=')
    if (temp[0] == name) return temp[1] // eslint-disable-line
  }
}

const getCookie = (name: string) => {
  return decodeURIComponent(getCookieSource(name) || '')
}

const addCookie = (name: string, value: string, path: string, hours?: number) => {
  //添加cookie
  var str = name + '=' + encodeURIComponent(value)
  if (hours > 0) {
    //为0时不设定过期时间，浏览器关闭时cookie自动消失
    var date = new Date()
    var ms = hours * 3600 * 1000
    date.setTime(date.getTime() + ms)
    str += '; expires=' + date.toUTCString()
  }
  if (path) {
    str += '; path=' + path
  }
  // 当前协议是 https 的话，启用 cookie 的安全模式，使 cookie 仅在 https 通信中生效
  if (window && window.location && window.location.protocol === 'https:') {
    str += '; secure'
  }
  document.cookie = str
}
const delCookie = (name: string, path: string) => {
  addCookie(name, '', path, -24 * 365)
}

export { getCookieSource, getCookie, addCookie, delCookie }
