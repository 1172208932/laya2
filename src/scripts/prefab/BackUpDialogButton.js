export default class BackUpDialogButton extends PaoYa.Component{
    // 返回并弹出交叉跳转的功能脚本
    onClick(){
        this.navigator.popToRootScene()
        this.navigator.popup('CrossLinkDialog')
    }
}