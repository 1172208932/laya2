import GameResultControl from "../common/GameResult/GameResultControl";

export default class DoubleDialog extends Laya.Dialog {
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
    }
    addClick() {
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