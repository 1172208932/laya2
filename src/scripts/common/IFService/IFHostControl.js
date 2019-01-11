import UserView from "../../prefab/UserView";
import GameService from "../../utils/GameService";
import AlertDialog from "../../dialog/AlertDialog";

export default class IFHostControl extends PaoYa.Component {
    /** @prop {name:lblTips,tips:'',type:Node} */
    /** @prop {name:lblTitle,tips:'',type:Node} */
    /** @prop {name:btnStart,tips:'',type:Node} */
    /** @prop {name:btnInvite,tips:'',type:Node} */
    /** @prop {name:myInfoView,tips:'',type:Node} */
    /** @prop {name:otherInfoView,tips:'',type:Node} */

    onAwake() {
        this.setupData()
        let view = this.owner
        view.graphics.drawRect(0, 0, view.width, view.height, "#8585e9")
    }
    onAppear() {
        // sdk update
        this.createRoom()
    }
    onDisappear() {
        this.alert && this.alert.close();
        this.alert = null;
    }
    onClick(e) {
        switch (e.target.name) {
            case 'btnStart':
                this.sendMessage(PaoYa.Client.SHARE_START_GAME, { type: 1 })
                break
            case 'btnInvite':
                this.createRoom()
                break
            case 'btnBack':
                let _this = this
                let alert = new AlertDialog({
                    title: '提示',
                    message: '确定退出房间?',
                    cancelText: '取消',
                    confirmText: '确定',
                    confirmHandler() {
                        _this.sendMessage(PaoYa.Client.LEAVE_ROOM, {})
                        _this.navigator.pop()
                    }
                })
                alert.popup()
                this.alert = alert;
                // PaoYa.Toast.showModal("提示", "确定退出房间?", "确定", () => {
                //     this.sendMessage(PaoYa.Client.LEAVE_ROOM, {})
                //     this.navigator.pop()
                // }, "取消")
                break
        }
    }
    createRoom() {
        if (this.rname) {
            this.inviteFriend()
        } else {
            this.sendMessage(PaoYa.Client.SHARE_INVITE_FRIEND, { type: 1 })
        }
    }
    inviteFriend() {
        let title = PaoYa.DataCenter.config.game.share_list.randomItem;
        let params = {
            rname: this.rname,
            type: PaoYa.ShareType.InviteFriend
        }
        this.shareTitle(title, params, function () {
        })
    }
    onReceiveMessage(cmd, res) {
        switch (cmd) {
            case PaoYa.Client.SHARE_INVITE_FRIEND:
                this.rname = res.room_name
                this.inviteFriend()
                break
            case PaoYa.Client.DISCONNECT:
                this.reset()
                break
            case PaoYa.Client.SHARE_RECEIVE_INVITE:
                this.peopleJoinRoomData = res
                this.handlePeopleJoinRoom(res)
                break
            case PaoYa.Client.GAME_START_GAME:
                let value = this.peopleJoinRoomData
                value.room_name = this.rname,
                    value.match_list = [value.invite_user, value.receive_user]
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
        if (value && value.status == 1 && value.invite_user) {
            let inviteUser = value.invite_user
            if (inviteUser.user_id == PaoYa.DataCenter.user.id) {
                let user = value.receive_user
                this.refreshUIWhenUserJoinRoom(inviteUser, user)
            } else {
                PaoYa.Toast.showModal("提示", "数据出错", "退出房间", () => {
                    this.navigator.pop()
                })
            }
        } else {
            PaoYa.Toast.showModal("提示", "邀请人进入房间失败", "退出房间", () => {
                this.navigator.pop()
            })
        }
    }
    setupData() {
        let tips = "Tips:" + PaoYa.DataCenter.config.game.strategy.split(';').randomItem;
        this.lblTips.text = tips
        this.otherInfoView.visible = false
        this.toggleEnable(false)
        let user = PaoYa.DataCenter.user
        this.myInfoView.setData({
            name: PaoYa.Utils.formatName(user.nickname),
            icon: PaoYa.Utils.makeIcon(user.avstar),
            gender: user.gender,
            city: (user.member_province || "") + ' ' + user.member_city
        })
        this.otherInfoView.setData({
            gender: "",
            icon: PaoYa.Utils.makeIcon('')
        })
    }

    toggleEnable(enable) {
        this.btnStart.disabled = !enable;
        this.lblTitle.text = enable ? "对手已就位，开始碾压TA吧" : "拉好友过来玩,趁机虐虐";
    }
    reset() {
        this.otherInfoView.visible = false
        this.btnInvite.visible = true
        this.toggleEnable(false);
    }
    refreshUIWhenUserJoinRoom(me, other) {
        this.otherInfoView.visible = true
        this.btnInvite.visible = false
        this.toggleEnable(true)

        this.otherInfoView.setData({
            name: PaoYa.Utils.formatName(other.user_name),
            icon: PaoYa.Utils.makeIcon(other.user_icon),
            gender: PaoYa.Utils.makeGenderIcon(other.gender),
            city: other.location
        })
        this.myInfoView.setData({
            city: me.location
        })
    }
    onDestroy() {
        this.alert && this.alert.close();
        this.alert = null;
    }
}