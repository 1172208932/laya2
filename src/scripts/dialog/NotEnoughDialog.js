import Utils from "../utils/utils";
import AlertDialog from "./AlertDialog";

export default class NotEnoughDialog extends PaoYa.Dialog {
    // 豆子不足弹框
    onEnable() {
        this.getBean.on(Laya.Event.CLICK, this, () => {
            this.close()
            if (!PaoYa.game.params.adUnitId) {
                var alert = new AlertDialog({
                    title: '温馨提示',
                    message: '该功能暂未上线',
                    confirmText: '知道了'
                });
                alert.popup();
                return
            }
            Utils.forceReward(() => {
                Utils.adsForReward();
            })
        })
    }
}