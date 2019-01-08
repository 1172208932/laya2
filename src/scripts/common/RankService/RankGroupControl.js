import RankComponent from "./RankComponent";

export default class RankGroupControl extends RankComponent {
    /** @prop {name:titleSprite,tips:'',type:Node} */
    /** @prop {name:openDataViewer,tips:'',type:Node} */
    onAwake() {
        super.onAwake()
        this.titleSprite.graphics.drawPath(0, 0, PaoYa.Utils.makeRoundRectPath(548, 64, 20, PaoYa.RectCorner.RectCornerTopLeft | PaoYa.RectCorner.RectCornerTopRight), {
            fillStyle: "#36baff"
        })
        this.openDataViewer.postMsg({
            type: 'showRankGroupView',
            shareTicket: this.owner.params&&this.owner.params.shareTicket||''
        })
    }
    onClick(e) {
        switch (e.target.name) {
            case 'btnBack':
                if (this.navigator.scenes.length > 0) {
                    this.navigator.popToRootScene()
                } else {
                    this.navigator.pop()
                }
                break
        }
    }
}