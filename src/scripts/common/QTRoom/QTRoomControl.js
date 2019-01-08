import GameService from "../../utils/GameService";

export default class QTRoomControl extends PaoYa.Component {
    onAwake() {
        this.rname = this.owner.params.rname
        this.sendMessage(PaoYa.Client.LEAVE_ROOM,{})
        Laya.timer.once(100,this,this.joinRoom)
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
                let rname = this.rname
                this.getUserInfo(res.userinfo,function(value){
                    let data = {
                        type: PaoYa.GameEntryType.Friend,
                        matchData: {
                            room_name: rname,
                            match_list: [value.invite_user, value.receive_user]
                        },
                        gameData: res
                    }
                    console.log('开始游戏 -------------------')
                    console.log(JSON.stringify(data))
                    GameService.startGame(data)
                })
                break
        }
    }
    joinRoom() {
        this.sendMessage('qq_join_room', { room_id: this.rname })
    }
    getUserInfo(users, cb) {
        //sort user
        let myIndex = 0
        for(let i = 0,length=users.length;i<length;i++){
            let user = users[i]
            if (user.user_id == PaoYa.DataCenter.user.id){
                myIndex = i
            }
        }
        let value = {}, _this = this
        this.getUserInfoByOpenId(users[myIndex], function (res1) {
            value.invite_user = res1
            _this.getUserInfoByOpenId(users[1-myIndex], function (res2) {
                value.receive_user = res2
                cb(value)
            })
        })
    }
    getUserInfoByOpenId(user, cb) {
        /**
         * {
                "wx_num": "",
                "ladder_id": 0,
                "isRobot": 0,
                "gender": "男",
                "user_id": 108125,
                "user_name": "渡",
                "dressup_id": 1,
                "user_icon": "https://wx.qlogo.cn/mmopen/vi_32/VpuZA6enbYCicRZgglFhGwTumTSSibrMVt9HL21Jv0Ome3bIdsK87frqX4h8u7yyqgzgLZb4C8LKTyUgJf4hGIaw/132",
                "location": " ",
                "continuous_win": 0,
                "age": 0
            }
         */
        /**如果没有字段，请在 */
        py.getUserInfo({
            openId: user.openid,
            success(userInfo) {
                cb({
                    openid:user.openid,
                    user_id: user.user_id,
                    user_name: userInfo.nickName,
                    user_icon: userInfo.avatarUrl,
                    gender: userInfo.gender == 1 ? '男' : '女',
                    location: ''
                })
            }
        })
    }
}