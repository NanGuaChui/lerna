/**
 *  页面局部打印
 *
 * @param {string }  cont 内容为字符串 比如 div.innerHTML
 * @param {Function | undefined}  fn 可选 打印完成后的回调方法
 * @param {string} id 元素id，用于document.getElementById()
 * @returns
 */
export const print = (cont: string = document.body.innerHTML, fn?: Function, id?: string) => {
  if(id){
    const _DOM = document.getElementById(id)
    const cloneDOM = _DOM.cloneNode(true)
    const oldCanvas = _DOM.querySelectorAll('canvas')
    const newCanvas = (cloneDOM as HTMLElement).querySelectorAll('canvas')

    newCanvas.forEach((el, idx) => {
      const img = document.createElement("img");
      img.src = oldCanvas[idx].toDataURL("image/png");
      img.setAttribute("style", "max-width: 100%;");
      const parentNode = el.parentNode;
      parentNode && parentNode.insertBefore(img, el);
      el.remove();
    })
    cont = (cloneDOM as HTMLElement).innerHTML
  }

  // 获取所有样式
  let styles = document.querySelectorAll('style,link')
  let str = ''
  // 遍历样式合集转成字符串合集
  styles.forEach(item => (str += item.outerHTML))
  // 设置打印内容
  let printContent = str + cont
  let w,
    doc,
    iframe = document.createElement('iframe'),
    f = document.body.appendChild(iframe)
  iframe.id = 'myIframe'
  iframe.style.width = '100%'
  w = f.contentWindow || f.contentDocument
  doc = f.contentDocument || f?.contentWindow?.document
  doc.open()
  // 插入打印值
  doc.write(printContent)
  doc.close()
  iframe.onload = () => {
    w.print()
    fn && fn()
    w.addEventListener('afterprint', () => {
      fn && fn()
    })
    // 调用打印后删除DOM
    setTimeout(() => document.body.removeChild(iframe), 100)
  }
}
