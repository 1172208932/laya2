import Utils from "../utils/utils";
import MatchGradeService from "../common/MatchGradeService/MatchGradeService";

export default class CrossLinkControl extends PaoYa.Component {
    onAwake() {
        if (typeof (this.owner.params) != 'string' && this.owner.params) {
            this.gameType = this.owner.params.type;
            this.point = ''
        } else if(this.owner.params) {
            this.point = this.owner.params
        }
        this.loadGameData((res) => {
            this.requestGames((list) => {
                this.setData(list)
            })
        })
        if (this.point) { this.postPoint() }
    }
    postPoint() {
        //统计曝光次数
        this.POST(`point_log_record`, { point_name: "exposure", point_type: `crossLink${this.point}` }, (res) => {
        })
    }
    requestGames(cb) {
        if (PaoYa.DataCenter.allGames) {
            cb(PaoYa.DataCenter.allGames)
        } else {
            this.GET('game_whole_list', (res) => {
                PaoYa.DataCenter.allGames = res
                cb(res)
            })
        }
    }
    loadGameData(cb) {
        Utils.loadOtherGameList(8, data => {
            this.spineInfo = data
            cb()
        })
    }
    onThrottleClick(e) {
        if (e.target.name == 'again') {
            this.againHandler();
        }
    }
    setData(res) {
        let list = []
        res.forEach(element => {
            for (let i = 0; i < 8; i++) {
                if (element.appId == this.spineInfo[i]) {
                    list.push({ name: element.name, icon: `https://res.xingqiu123.com/img/xcx/gameHall_2.0/home/game_icon_${element.id}.png?imageView2/0/w/100`, id: element.id, appId: element.appId, image: element.qr_img })
                }
            }
        });
        this.shuffle(list)
        this.owner.setListData(list)

    }
    shuffle(arr) {
        var length = arr.length,
            randomIndex,
            temp;
        while (length) {
            randomIndex = Math.floor(Math.random() * (length--));
            temp = arr[randomIndex];
            arr[randomIndex] = arr[length];
            arr[length] = temp
        }
        return arr;
    }
    gameClick(data, index) {
        this.POST(`point_log_record`, { point_name: `play00${index + 1}`, point_extra: data.id, point_type: `crossLink${this.point}` }, (res) => {
        })
        Utils.navigateToMiniProgram({
            appId: data.appId,
            images: [data.image],
            extraData: {
                jType: 'crossLink',
                fid: PaoYa.DataCenter.loginData.config_list.game.id
            }
        })
    }
    againHandler() {
        PaoYa.DataCenter.showBeanPercent = 0
        this.GET("update_chips", (data) => {
            this.owner.close()
            PaoYa.DataCenter.user.gold = data.pao_gold;
            if (this.gameType == PaoYa.GameEntryType.Match) {//重新走匹配
                let type = MatchGradeService.type;
                MatchGradeService.checkIfMatch(type);
            }
        })
    }
}