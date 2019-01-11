export default class MoreGameButton extends PaoYa.Component {
    // 弹出交叉跳转（无匹配）的功能脚本
    onClick() {
        PaoYa.navigator.popup('CrossLinkDialog')
    }
}