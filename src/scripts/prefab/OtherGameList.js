import Utils from "../utils/utils";

export default class OtherGameList extends PaoYa.Component {
    //结算页底部跳转其他游戏组件
    onAwake() {
        this.list = this.owner.getChildByName('list')
        this.setListView()
        this.loadGameData((res) => {
            this.requestGames((list) => {
                this.setData(list)
            })
        })
        this.postPoint()
    }
    postPoint() {
        //统计曝光次数
        this.POST(`point_log_record`, { point_name: "exposure", point_type: `crossLink003` }, (res) => {
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
        Utils.loadOtherGameList(4, data => {
            this.spineInfo = data
            cb()
        })
    }
    setListView() {
        let _this = this
        this.list.mouseHandler = new Laya.Handler(this, onSelect, [this.list]);
        function onSelect(list, e, index) {
            if (e.type == Laya.Event.CLICK) {
                _this.clickGameList(this.list.array[index], index)
            }
        }
    }
    setListData(list) {
        this.list.array = list;
        this.list.refresh()
    }
    setData(res) {
        let list = []
        res.forEach(element => {
            for (let i = 0; i < 4; i++) {
                if (element.appId == this.spineInfo[i]) {
                    list.push({ name: element.name, icon: `https://res.xingqiu123.com/img/xcx/gameHall_2.0/home/game_icon_${element.id}.png`, id: element.id, appId: element.appId, image: element.qr_img })
                }
            }
        });
        this.setListData(list)
    }
    clickGameList(data, index) {
        this.POST('point_log_record', { point_name: `play00${index + 1}`, point_extra: data.id, point_type: 'crossLink003' }, (res) => {
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
}