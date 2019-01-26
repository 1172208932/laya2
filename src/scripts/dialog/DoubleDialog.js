import GameResultControl from "../common/GameResult/GameResultControl";
import Utils from "../utils/utils";

export default class DoubleDialog extends PaoYa.Dialog {
    //多倍积分弹框
    onAwake() {
        this.setTimes()
        this.btnDouble.on(Laya.Event.CLICK, this, this.addClick)
    }
    setTimes() {
        if (this.params.ratioType != 2) {
            this.imgIcon.skin = 'remote/share/fen_xiang.png'
            this.imgIcon.pos(450, 633)
        }
        this.diploid.text = `领取${this.params.ratioInfo}倍积分`
        switch (this.params.ratioInfo) {
            case "2":
                Utils.recordPoint('exposure002', 'view')
                break
            case "3":
                Utils.recordPoint('exposure003', 'view')
                break
            case "5":
                Utils.recordPoint('exposure004', 'view')
                break
        }
    }
    addClick() {
        switch (this.params.ratioInfo) {
            case "2":
                Utils.recordPoint('button012', 'click')
                break
            case "3":
                Utils.recordPoint('button013', 'click')
                break
            case "5":
                Utils.recordPoint('button014', 'click')
                break
        }
        var _this = this
        let content = PaoYa.DataCenter.config.game.share_list.randomItem;
        if (this.params.ratioType != 2) {
            PaoYa.ShareManager.shareTitle(content, {}, (res) => {
                PaoYa.NotificationCenter.postNotification('double')
                this.close()
            })
        } else {
            let params = {
                onClose: function (res) {
                    if (res.isEnded) {
                        PaoYa.NotificationCenter.postNotification('double')
                        _this.close()
                    }
                },
                onError: function (res) {
                    _this.imgIcon.skin = 'remote/share/fen_xiang.png'
                    _this.imgIcon.pos(450, 633)
                    _this.params.ratioType = 1
                }
            }
            PaoYa.RewardedVideoAd.show(params);
        }
    }
}