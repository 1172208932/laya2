export default class TurnTableControl extends PaoYa.Component {
    constructor() { super(); }
    onClick(e) {
        switch (e.target.name) {
            case 'btnLuck':/**/
                this.startLucky();
                break;
        }
    }
    onReceiveMessage(cmd, value) {
        switch (cmd) {
            case "wheel_index":
                if (!value) {//机器人
                    var random = this.owner.ownerPlace.split(",").randomItem;
                    this.owner.rotateByIndex(random);
                    return;
                }
                if (!this.owner.rotate) {
                    this.owner.rotateByIndex(value.index);
                }
                break;
        }
    }
    startLucky() {
        this.owner.stopBtnAnimation();
        var random = this.owner.ownerPlace.split(",").randomItem;
        //1.发送socket命令
        this.sendMessage("wheel_index", {
            index: random
        })
        //2.转盘开始旋转
        this.owner.rotateByIndex(random);
    }
}