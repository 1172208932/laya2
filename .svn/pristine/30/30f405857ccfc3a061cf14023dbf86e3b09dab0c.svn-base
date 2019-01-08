export default class UserBox extends PaoYa.Component {
    constructor() {
        super()
    }
    onAwake() {
         PaoYa.NotificationCenter.addLoginNotification(this, function () {
           Laya.timer.callLater(this,this.reloadData) 
         })
    }
    reloadData() {
        var user = PaoYa.DataCenter.user;
        let label = this.owner.getChildByName("label");
        label.text = PaoYa.Utils.formatName(user.nickname);
        let sprite = this.owner.getChildByName("nameBg");
        if (sprite) {
            sprite.graphics.clear();
            let width = PaoYa.Utils.measureWidth(label.text) + 80;
            sprite.graphics.drawPath(0, 0, PaoYa.Utils.makeAllCornerRoundRectPath(width, 50, 25), {
                fillStyle: "#000000"
            });
        }
        let icon = this.owner.getChildByName("icon");
        icon.skin = PaoYa.Utils.makeIcon(user.avstar);
    }
}