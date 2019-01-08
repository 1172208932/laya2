/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "portrait";

//-----libs-begin-----
loadLib("libs/laya.core.js")
loadLib("libs/laya.webgl.js")
loadLib("libs/laya.ani.js")
loadLib("libs/laya.ui.js")
loadLib("libs/laya.html.js")
if(window.wx){
    loadLib("libs/platform.wx.js")
}else if(window.BK){
    loadLib("libs/platform.qq.js")
}else{
    loadLib("libs/platform.browser.js")
}
loadLib("libs/paoya.core.js")
//-----libs-end-------
loadLib("js/bundle.js")
