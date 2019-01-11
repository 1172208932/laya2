import Utils from "../../utils/utils";
import MatchGradeService from "../MatchGradeService/MatchGradeService";
import GameAgainControl from "./GameAgainControl";
import AlertDialog from "../../dialog/AlertDialog";
export default class GameResultControl extends PaoYa.Component {
    constructor() { super(); }
    onAwake() {
        this.gameType = this.owner.params.type;
        this.params = this.owner.params.result;
        this.init();
    }
    init() {
        let userId = PaoYa.DataCenter.user.id
        if (userId == this.params.lose_user.user_id) {
            this.myInfo = this.params.lose_user;
        } else {
            this.myInfo = this.params.win_user;
        }
        if (this.gameType == PaoYa.GameEntryType.Friend) {
            this.owner.getComponent(GameAgainControl).enabled = true;
        }
        this.onNotification("double", this, () => {
            this.sendShareAward()
        })
    }
    onThrottleClick(e) {
        switch (e.target.name) {
            case "share":
                this.shareHandler();
                break;
            case "again":
                this.againHandler();
                break;
            case "back":
                this.backHandler();
                break;
        }
    }
    onReceiveMessage(cmd, value) {
        switch (cmd) {
            //积分 
            case "shareaward":
                PaoYa.Toast.show('恭喜获得' + value.integral + '积分，积分可以兑换奖品哦！', 3000);
                break;
            case PaoYa.Client.DISCONNECT:
                if (this.gameType == PaoYa.GameEntryType.Friend) {
                    this.owner.btnAgain.disabled = true;
                }
                break;
        }
    }
    backHandler() {
        this.sendMessage(PaoYa.Client.LEAVE_ROOM, {});
        if (PaoYa.DataCenter.isFromMiniProgram) {
            PaoYa.game.exit();
        } else {
            //跳到匹配场次选择界面
            if (this.gameType == PaoYa.GameEntryType.Friend) {
                this.navigator.popToRootScene();
            } else {
                this.navigator.popToScene("MatchGradeView");
                this.navigator.popup('CrossLinkDialog')
            }
        }
    }
    shareHandler() {
        var _this = this;
        let content = PaoYa.DataCenter.config.game.share_list.randomItem;
        if (this.owner.btnShare.label == "换换手气") {
            PaoYa.DataTrack.trackType(PaoYa.DataTrackType.Change)
            this.sendMessage(PaoYa.Client.LEAVE_ROOM, {});
            if (PaoYa.DataCenter.isFromMiniProgram) {
                PaoYa.game.exit();
            } else {
                this.navigator.popup('CrossLinkDialog')
            }
            return;
        }
        if (this.owner.btnShare.label == "炫耀一下") {
            this.sendMessage(PaoYa.Client.LEAVE_ROOM, {});
            if (PaoYa.DataCenter.isFromMiniProgram) {
                PaoYa.game.exit();
            } else {
                this.shareTitle(content, {}, function () { });
            }
            return;
        }
        this.navigator.push('IFHostView')
    }
    sendShareAward() {
        this.sendMessage('shareaward', {});
    }
    againHandler() {
        PaoYa.DataCenter.showBeanPercent = 0
        this.GET("update_chips", function (data) {
            PaoYa.DataCenter.user.gold = data.pao_gold;
            if (this.gameType == PaoYa.GameEntryType.Match) {//重新走匹配
                let type = MatchGradeService.type;
                MatchGradeService.checkIfMatch(type);
            } else if (this.gameType == PaoYa.GameEntryType.Friend) {
                //邀请对方再来一局
                this.owner.getComponent(GameAgainControl).showGameAgain();
            }
        })
    }
    onDestroy() {
        if (this.rewardDialog) {
            this.rewardDialog.close();
            this.rewardDialog = null;
        }
    }
}