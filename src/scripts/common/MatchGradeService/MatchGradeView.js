import MatchGradeService from "./MatchGradeService";
export default class MatchGradeView extends PaoYa.View {
    constructor() { super() }
    onAwake() {
        this.initData()
        if(PaoYa.DataCenter.loginData.is_review){
            this.skipMall.visible=false;
            this.integral.visible=false;
        }
    }
    onAppear(){
        this.setQuickMatchSession()
    }
    initData() {
        let matchTypes =PaoYa.DataCenter.config.game.match_type
        for(let i = 0,length=matchTypes.length;i<length;i++){
            let item = matchTypes[i]
            let view = this.getChildByName(`box${i}`)
            view.getChildByName('lblWin').text = item.cost
            view.getChildByName('lblPrize').text = `奖：${item.reward_integral}`
            view.getChildByName('lblLimit').text = item.limit
        }
    }
    setQuickMatchSession() {
        let item = MatchGradeService.findBestQuickMatchType()
        this.sessionText.text = item.name
    }
    beginMatch(){
        this.setQuickMatchSession() 
        MatchGradeService.startQuickMatch()
    }
}