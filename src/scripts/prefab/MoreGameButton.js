export default class MoreGameButton extends PaoYa.Component {
    // 弹出交叉跳转（无匹配）的功能脚本
    onAwake(){
        this.owner.y += 56
        this.owner.anchorY = 0.5
        this.timeLine = new Laya.TimeLine();
        this.timeLine.to(this.owner, {
            scaleX: 1.1,
            scaleY: 1.1
        }, 500, null, 0).to(this.owner, {
            scaleX: 1,
            scaleY: 1
        }, 500, null, 1).to(this.owner, {
            scaleX: 0.9,
            scaleY: 0.9
        }, 500, null, 1).to(this.owner, {
            scaleX: 1,
            scaleY: 1
        }, 500, null, 1)
        this.timeLine.play(0, true);
    }
    onClick() {
        this.navigator.popup('CrossLinkDialog','001')
    }
    onDestroy() {
        this.timeLine && this.timeLine.destroy();
        this.timeLine = null;
    }
}