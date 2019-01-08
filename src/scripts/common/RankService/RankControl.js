import RankComponent from "./RankComponent";

export default class RankControl extends RankComponent {
    /** @prop {name:openDataViewer,tips:'',type:Node} */
    onAwake() {
        super.onAwake()
        this.owner.reloadData([])
        this.requestRankList(0)
        this.openDataViewer.postMsg({type:'showRankView'})
    }
    onClick(e) {
        switch (e.target.name) {
            case 'btnBack':
                this.navigator.pop()
                break
            case 'btnGroup':
                let title = PaoYa.DataCenter.config.game.share_list.randomItem
                this.shareTitle(title, { type: PaoYa.ShareType.GroupRank }, () => {

                })
                break
            case 'btnLeft':
                this.owner.changeBtnHandler(0)
                this.openDataViewer.visible = false
                break
            case 'btnRight':
                this.owner.changeBtnHandler(1)
                this.openDataViewer.visible = true
                break
        }
    }
    requestRankList(index) {
        if (index == 0) {
            this.GET("ranking_list", { type: PaoYa.game.params.rankingType }, (res) => {
                if (!res.list) { return }
                let list = []
                res.list.forEach(function (item, index) {
                    let i = {
                        name: PaoYa.Utils.formatName(item.member_nick),
                        icon: PaoYa.Utils.makeIcon(item.member_avstar),
                        rank: "NO." + (index + 1),
                        des: item.score_with_unit
                    }
                    list.push(i)
                });
                this.owner.reloadData(list)
                let info = {
                    name: PaoYa.Utils.formatName(res.member_nick),
                    icon: PaoYa.Utils.makeIcon(res.member_avstar),
                    rank: (!res.ranking || (res.ranking <= 0)) ? "未上榜" : ("NO." + res.ranking),
                    des: res.score_with_unit
                }
                this.owner.reloadMyRankViewData(info)
            }, () => {

            })
        }
    }

}