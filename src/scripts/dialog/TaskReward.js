import PrizeShowView from "../utils/PrizeService";
export default class TaskReward extends Laya.Dialog {
    onOpened(data) {
        this.prizes = data.prizes;
        this.setPrizes(200, data.prizes);
    }
    setPrizes(y, prizes) {
        if (this.getChildByName("prizeShowView")) { return }
        let view = new PrizeShowView(prizes)
        view.name = "prizeShowView"
        view.y = y
        this.addChild(view)
    }
}