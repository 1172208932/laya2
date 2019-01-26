import GameService from "../../utils/GameService";
import AlertDialog from '../../dialog/AlertDialog';
import GameAgainControl from "../GameResult/GameAgainControl";
export default class FBControl extends PaoYa.Component {
    /** @prop {name:btnInvite,tips:'',type:Node} */
    /** @prop {name:otherInfoView,tips:'',type:Node} */
    /** @prop {name:lblTimes,tips:'',type:Node} */
    /** @prop {name:lblTimeTitle,tips:'',type:Node} */

    onAwake() {
        //判断是否是被邀请者
        if (this.owner.params && this.owner.params.id) {
            this.joinRoom()
        } else {
            this.createRoom()
        }
        this.setupData()
        
        this.makeBreathingEffect(this.btnInvite)
        this.requestMessageList()
        //监听任务弹框点击邀请
        this.onNotification("invite", this, () => {
            if (this.otherInfoView.visible == true) {
                let alert = new AlertDialog({
                    title: '提示',
                    message: '好友已在房间中哦！',
                })
                alert.popup()
            } else {
                this.createRoom()
            }
        })
    }
    onAppear() {
        this.timeLine && this.timeLine.resume()
    }
    onDisappear() {
        this.timeLine && this.timeLine.pause()
        this.alert && this.alert.close();
        this.alert = null;
    }
    //设置聊天文案
    requestMessageList() {
        this.GET('friend_message_list', (data) => {
            this.owner.setList(data)
        })
    }
    //发送聊天内容
    postMessage(message, index) {
        if (this.otherUserId) {
            this.sendMessage('message', { user_id: this.otherUserId, msg: message, emoji: index })
        }
    }
    //被邀请者进入房间
    joinRoom() {
        let value = this.owner.params
        this.rname = value.rname
        this.sendMessage(PaoYa.Client.SHARE_RECEIVE_INVITE, { to_id: value.id, room_name: value.rname })
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
                        _this.navigator.popToRootScene()
                        _this.navigator.push('MatchGradeView')
                    }
                })
                alert.popup()
                this.alert = alert;
                break
            case 'btnAgain':
                //邀请对方再来一局
                this.owner.getComponent(GameAgainControl).showGameAgain();
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
        let _this = this
        this.shareTitle(title, params, function () {
            _this.owner.boxBefore.visible = true
            _this.startTimer()
        })
    }
    onReceiveMessage(cmd, res) {
        switch (cmd) {
            case PaoYa.Client.SHARE_INVITE_FRIEND:
                this.rname = res.room_name
                this.inviteFriend()
                break
            case PaoYa.Client.DISCONNECT:
                this.timeLine && this.timeLine.resume()
                //判断是离开的是否是房主
                if (res.owner_id == Number(this.rname.split("_")[1])) {
                    this.sendMessage(PaoYa.Client.LEAVE_ROOM, {})
                    this.rname = ""
                }
                this.owner.getComponent(GameAgainControl).enabled = false;
                this.stopTimer()
                this.reset()
                this.owner.initView()
                break
            case PaoYa.Client.SHARE_RECEIVE_INVITE:
                Laya.Dialog.manager.closeAll()
                this.stopTimer()
                this.peopleJoinRoomData = res
                this.handlePeopleJoinRoom(res)
                break
            case PaoYa.Client.GAME_START_GAME:
                Laya.Dialog.manager.closeAll()
                this.stopTimer();
                let value = this.peopleJoinRoomData
                value.room_name = this.rname,
                    value.match_list = [value.invite_user, value.receive_user]
                if (value.match_list[0].user_id != PaoYa.DataCenter.user.id) {
                    value.match_list.reverse()
                }
                let data = {
                    type: PaoYa.GameEntryType.Friend,
                    matchData: value,
                    gameData: res
                }
                GameService.startGame(data)
                break
            case 'message':
                res.msg == 0 ? this.owner.toOwnFace(res.emoji) : this.owner.showOtherMessage(res.msg)
                break
        }
    }
    handlePeopleJoinRoom(value) {
        if (value && value.status == 1 && value.invite_user) {
            let inviteUser = value.invite_user
            let user = value.receive_user            
            if (inviteUser.user_id == PaoYa.DataCenter.user.id) {
                this.otherUserId = value.receive_user.user_id
                this.refreshUIWhenUserJoinRoom(user)
            } else {
                this.owner.lblTitle.visible = true
                this.otherUserId = value.invite_user.user_id
                this.refreshUIWhenUserJoinRoom(inviteUser)
            }
        } else {  
            PaoYa.Toast.showModal("提示", "好友房间已关闭，请重新创建房间", "知道了", () => {
                this.owner.initView()
                this.rname = ''
            })
        }
    }
    setupData() {
        this.otherInfoView.visible = false
        this.toggleEnable(false)
        let user = PaoYa.DataCenter.user
        this.owner.lblOwnName.text = PaoYa.Utils.formatName(user.nickname)
        this.owner.lblOwnCity.text = (user.member_province || "") + ' ' + user.member_city
        this.owner.imgOwnIcon.skin = PaoYa.Utils.makeIcon(user.avstar)
    }
    toggleEnable(enable) {
        this.owner.btnStart.disabled = !enable
        this.owner.lblTitle.visible = true
        this.owner.lblTitle.text = enable ? "好友已经来了，点击开始游戏吧" : "好友正在快马加鞭的赶来"
        if (this.peopleJoinRoomData && this.peopleJoinRoomData.receive_user.user_id == PaoYa.DataCenter.user.id) {
            this.owner.lblTitle.text = '点击开始游戏，虐虐好友'
        }
        this.owner.boxBefore.visible = enable ? false : true
    }
    //离开后的设置
    reset() {
        this.otherUserId = 0
        this.otherInfoView.visible = false
        this.btnInvite.visible = true
        this.toggleEnable(false);
    }
    //设置对方的头像
    refreshUIWhenUserJoinRoom(other) {
        this.otherInfoView.visible = true
        this.btnInvite.visible = false
        this.toggleEnable(true)
        this.owner.lblOtherName.text = PaoYa.Utils.formatName(other.user_name)
        this.owner.imgOtherIcon.skin = PaoYa.Utils.makeIcon(other.user_icon)        
        this.owner.lblOtherCity.text = other.location
    }
    startTimer() {
        if (this.timer) { return; }
        this.owner.boxBefore.visible = true
        this.owner.lblTitle.visible = true
        let timer = new PaoYa.TimerService(3600, 1, true)
        timer.on(PaoYa.TimerService.PROGRESS, this, function (data) {
            if (data == 15) { this.owner.lblTitle.visible = true, this.owner.lblTitle.text = '好友可能在忙，换个好友试试吧' }
            if (data == 30) {
                let _this = this
                let alert = new AlertDialog({
                    title: '提示',
                    message: '暂时没有好友应战，先和陌生人匹配练练手吧！',
                    cancelText: '取消',
                    confirmText: '随机匹配',
                    confirmHandler() {
                        _this.sendMessage(PaoYa.Client.LEAVE_ROOM, {})
                        _this.navigator.popToRootScene()
                        _this.navigator.push('MatchGradeView', {}, null, Laya.Handler.create(this, (scene) => {
                            scene.beginMatch()
                        }))
                    }
                })
                alert.popup()
                this.alert = alert;
            }
            this.lblTimes.text = data.formatTime().slice(3)
        })
        timer.start()
        this.timer = timer
    }
    stopTimer() {
        this.timer && this.timer.stop();
        this.timer = null
    }
    makeBreathingEffect(view) {
        view.anchorX = 1
        view.x += 278
        this.timeLine = new Laya.TimeLine();
        this.timeLine.to(view, {
            scaleX: 1.1,
            scaleY: 1.1
        }, 500, null, 0).to(view, {
            scaleX: 1,
            scaleY: 1
        }, 500, null, 1).to(view, {
            scaleX: 0.9,
            scaleY: 0.9
        }, 500, null, 1).to(view, {
            scaleX: 1,
            scaleY: 1
        }, 500, null, 1)
        this.timeLine.play(0, true);
        if (this.btnInvite.visible == false) {
            this.timeLine.pause()
        }
    }
    onNetworkChange(){
        this.socket.sendMessage(PaoYa.Client.LEAVE_ROOM, {})
        Laya.Dialog.manager.closeAll()
        this.navigator.popToRootScene()
    }
    onHide(res) {
        if (res && res.mode != undefined && res.targetAction != undefined && !(res.mode == "hide" && res.targetAction == 8)) {
            this.socket.sendMessage(PaoYa.Client.LEAVE_ROOM, {})
            Laya.Dialog.manager.closeAll()
            this.navigator.popToRootScene()
        }
    }
    onDestroy() {
        this.stopTimer()
        this.alert && this.alert.close();
        this.alert = null;
        this.timeLine && this.timeLine.destroy();
        this.timeLine = null;
    }
}