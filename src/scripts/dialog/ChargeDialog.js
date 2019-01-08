import AlertDialog from "./AlertDialog";
export default class ChargeDialog extends Laya.Dialog {
    onEnable() {
        this.init()
    }
    init() {
        var list = PaoYa.DataCenter.config.item_list;
        for (var i = 1; i < list.length + 1; i++) {
            let item = list[i - 1];
            let box = this.getChildByName(i + "");
            let children = box._children;
            let bg = children[0];
            let icon = children[1];
            let lblValue = children[2];
            let lblMoney = children[3];
            let imgFree = children[4];
            let lblFree = imgFree._children[0];
            if (i < 3) {
                bg.skin = "remote/charge/beanBg2.png";
            }
            icon.skin = `remote/charge/bean${i}.png`;
            lblValue.text = item.pao_gold;
            lblMoney.text = "￥" + item.price;
            imgFree.visible = item.free_gold > 0;
            lblFree.text = "+" + item.free_gold;
            box.on(Laya.Event.CLICK, this, this.clickHandler, [item]);
        }
    }
    clickHandler(item) {
        PaoYa.PayManager.pay(item.pao_gold, () => {
            this.refreshGold(item.id);
        }, (code) => {
            if (code != -2 || code != 1) {
                let alert = new AlertDialog({
                    title: '提示',
                    message: "支付失败",
                })
                alert.popup();
            }
        });
    }
    refreshGold(itemId) {
        var params = {
            itemId: itemId,
            gameAppId: PaoYa.game.gameId
        };
        PaoYa.Toast.showLoading("");
        PaoYa.Request.POST("midas_pay", params, (data) => {
            PaoYa.Toast.hideLoading();
            PaoYa.DataCenter.refreshUserInfo()
            let alert = new AlertDialog({
                title: '恭喜',
                message: "充值成功",
            })
            alert.popup();
        }, () => {
            PaoYa.Toast.hideLoading();
        });
    }
}