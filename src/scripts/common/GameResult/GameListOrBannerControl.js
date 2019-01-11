export default class GameListOrBannerControl extends PaoYa.Component {
    onAwake() {
        this.gameType = this.owner.params.type;
        this.params = this.owner.params.result;
        let userId = PaoYa.DataCenter.user.id
        if (userId == this.params.lose_user.user_id) {
            this.showList()
        } else {
            this.showBannerAd({})
        }
    }
    showList() {
        this.owner.gameList.visible = true
    }
}