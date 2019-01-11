import Utils from "../utils/utils";

export default class NotEnoughDialog extends PaoYa.Dialog {
    // 豆子不足弹框
    onEnable() {
        this.getBean.on(Laya.Event.CLICK, this, () => {
            this.close()
            PaoYa.RewardedVideoAd.show({
                onClose(res) {
                    if (res.isEnded) {
                        Utils.adsForReward();
                    }
                },
                onError(res) {
                    let errorDialog = new AlertDialog({
                        title: "温馨提示",
                        message: res.errMsg
                    })
                    errorDialog.popup()
                }
            });
        })
        this.toFriend.on(Laya.Event.CLICK, this, () => {
            this.close()
            PaoYa.navigator.push('IFHostView')
        })
    }
}