import GameService from "../../utils/GameService";
import AlertDialog from '../../dialog/AlertDialog';
export default class IFMemberControl extends PaoYa.Component {
    /** @prop {name:lblTips,tips:'',type:Node} */
    /** @prop {name:lblTitle,tips:'',type:Node} */
    /** @prop {name:userView,tips:'',type:Node} */
    onAwake() {
        let view = this.owner
        view.graphics.drawRect(0, 0, view.width, view.height, "#8585e9")
        PaoYa.NotificationCenter.addLoginNotification(this, this.setupData);
        this.joinRoom()
    }
    onDisappear() {
        this.alert && this.alert.close();
        this.alert = null;
    }
    setupData() {
        let tips = "Tips:" + PaoYa.DataCenter.config.game.strategy.split(';').randomItem;
        this.lblTips.text = tips
    }
    onReceiveMessage(cmd, res) {
        switch (cmd) {
            case PaoYa.Client.DISCONNECT:
                PaoYa.Toast.showModal("提示", "对战房间已经过期，去其他地方溜达下吧", "溜达溜达", () => {
                    this.navigator.pop()
                })
                break
            case PaoYa.Client.SHARE_RECEIVE_INVITE:
                this.peopleJoinRoomData = res
                this.handlePeopleJoinRoom(res)
                break
            case PaoYa.Client.GAME_START_GAME:
                let value = this.peopleJoinRoomData
                value.room_name = this.rname,
                    value.match_list = [value.receive_user,value.invite_user]
                let data = {
                    type: PaoYa.GameEntryType.Friend,
                    matchData: value,
                    gameData: res
                }
                GameService.startGame(data)
                break
        }
    }
    handlePeopleJoinRoom(value) {
        if (!value || !value.invite_user) {
            PaoYa.Toast.showModal("提示", "数据出错", "退出房间", () => {
                this.navigator.pop()
            })
            return
        }
        let inviteUser = value.invite_user
        if (value.status == 1) {
            if (inviteUser.user_id == PaoYa.DataCenter.user.id) {

            } else {
                this.userView.setData({
                    name: PaoYa.Utils.formatName(inviteUser.user_name),
                    icon: PaoYa.Utils.makeIcon(inviteUser.user_icon),
                    gender: PaoYa.Utils.makeGenderIcon(inviteUser.gender),
                    city: inviteUser.location
                })
            }
        } else {
            if (value.status == 2) {
                this.userView.setData({
                    name: PaoYa.Utils.formatName(inviteUser.user_name),
                    icon: PaoYa.Utils.makeIcon(inviteUser.user_icon),
                    gender: PaoYa.Utils.makeGenderIcon(inviteUser.gender),
                    city: inviteUser.location
                })
                PaoYa.Toast.showModal("提示", "游戏早就开始了，你来晚了", "随便逛逛", () => {
                    this.navigator.pop()
                })
            } else if (value.status == 3) {
                PaoYa.Toast.showModal("提示", "对战房间已经过期，去其他地方溜达下吧", "溜达溜达", () => {
                    this.navigator.pop()
                })
            }
        }
    }
    joinRoom() {
        let value = this.owner.params
        this.rname = value.rname
        this.sendMessage(PaoYa.Client.SHARE_RECEIVE_INVITE, { to_id: value.id, room_name: value.rname })
    }
    onClick(e) {
        let _this = this;
        switch (e.target.name) {
            case 'btnCancel':
                var alert = new AlertDialog({
                    title: "提示",
                    message: "确定退出房间?",
                    cancelText: "取消",
                    confirmText: '确定',
                    confirmHandler() {
                        _this.sendMessage(PaoYa.Client.LEAVE_ROOM, {})
                        _this.navigator.pop()
                    }
                });
                alert.popup();
                _this.alert = alert;
                break
            case 'btnStart':
                this.sendMessage(PaoYa.Client.SHARE_START_GAME, { type: 1 })
                break
        }
    }
    onDestroy() {
        this.alert && this.alert.close();
        this.alert = null;
    }
}