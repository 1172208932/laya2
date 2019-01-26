import GameService from '../../utils/GameService';
import AlertDialog from '../../dialog/AlertDialog';
import GameAgainDialog from '../../dialog/GameAgainDialog';
export default class GameAgainControl extends PaoYa.Component {
    dealData(res) {
        let data = res.result;
        let userId = PaoYa.DataCenter.user.id;
        let otherInfo = {};
        if (userId == data.lose_user.user_id) {
            otherInfo = data.win_user;
        } else {
            otherInfo = data.lose_user;
        }
        this.userId = otherInfo.user_id;
        this.name = PaoYa.Utils.formatName(otherInfo.user_name);
        this.enabled = true
    }
    onReceiveMessage(cmd, value) {
        switch (cmd) {
            case PaoYa.Client.AGAIN_REJECT:
                this.rejectHandler();
                break;
            case PaoYa.Client.AGIAN_SEND:
                this.receiveHandler(value);
                break;
            case PaoYa.Client.AGAIN_CANCAL:
                this.cancelHandler();
                break;
        }
    }
    showGameAgain(isSender) {
        let now = Date.now()
        if (this.lastTime && (now - this.lastTime < 3000)) {
            let view = new AlertDialog({ title: "提示", message: "操作过快，请稍候重试" })
            view.popup()
            return
        }
        this.lastTime = now
        let _this = this;
        if (isSender === void 0) { isSender = true; }
        if (!this.view) {
            let view = new GameAgainDialog()
            view.closeHandler = Laya.Handler.create(this, (type) => {
                Laya.Dialog.manager = null
                Laya.UIConfig.closeDialogOnSide = true;
                if (type == Laya.Dialog.OK) { //ACCEPT
                    this.sendMessage(PaoYa.Client.AGIAN_SEND, { user_id: this.userId })
                } else if (type == Laya.Dialog.NO) { //REFUSE
                    this.sendMessage(PaoYa.Client.AGAIN_REJECT, { user_id: this.userId })
                } else if (type == Laya.Dialog.CANCEL) { //CANCEL
                    this.sendMessage(PaoYa.Client.AGAIN_CANCAL, { user_id: this.userId })
                } else { //NORMAL

                }
            }, null, false)
            this.view = view
        }
        this.view.show(isSender, this.name)
        if (isSender) {
            this.sendMessage(PaoYa.Client.AGIAN_SEND, { user_id: this.userId });
        }
    };
    rejectHandler() {
        if (!this.view || !this.view.isPopup || !this.view.isSender) return;
        this.view.hide();
        var view = new AlertDialog({
            title: "提示",
            message: "对方已拒绝"
        });
        view.popup();
    };
    cancelHandler() {
        if (!this.view || !this.view.isPopup || this.view.isSender) return;
        this.view.hide();
        var view = new AlertDialog({
            title: "提示",
            message: "对方已取消"
        });
        view.popup();
    };
    receiveHandler(res) {
        if (!this.view || !this.view.isPopup) {
            this.showGameAgain(false);
        }
    };
    startGameHandler(res) {
        this.view && this.view.hide();
        GameService.startGame(res);
    };
    onDestroy() {
        if (this.view && this.view.isPopup) {
            this.view.hide()
            this.view.destroy()
        }
    };
}