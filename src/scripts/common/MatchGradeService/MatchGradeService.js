import Utils from "../../utils/utils";
import AlertDialog from "../../dialog/AlertDialog";
import MatchControl from "../MatchService/MatchControl";
import MatchServiceForRemode from "../../remode/MatchServiceForRemode";
export default class MatchGradeService {

}
/**为快速匹配找到最好的匹配类型 */
MatchGradeService.findBestQuickMatchType = function () {
    let list = PaoYa.DataCenter.config.game.match_type, gold = PaoYa.DataCenter.user.gold, res = null
    for (let i = list.length - 1; i >= 0; i--) {
        let item = list[i]
        let value = item.quick_limit.split("-")
        if (value.length == 1) { value.push(Infinity) }
        if (gold >= value[0] && gold <= value[1]) {
            res = item
            break
        }
    }
    return res
}
MatchGradeService.checkIfMatch = function (type) {
    if (!this.checkIfRoundLimit()) return
    if (type.name == "中级场") {
        if (!this.checkWithMiddle(type.cost + type.entry_fee)) return;
    } else {
        if (!Utils.checkIfHasEnoughMoney(type.cost + type.entry_fee)) return;
    }
    let value = type.limit.split('-')
    if (value.length == 1) { value.push(Infinity) }
    let minCost = Number(value[0]), maxCost = Number(value[1]), gold = PaoYa.DataCenter.user.gold
    if (gold > maxCost) {
        let _this = this
        let alert = new AlertDialog({
            title: '提示',
            message: '您的水平很高超，参加高级场次可以赢取更多豆子哦。',
            cancelText: '跳过',
            confirmText: '立即参加',
            confirmHandler() {
                _this.startQuickMatch()
            }
        })
        alert.popup()
        return;
    }
    MatchServiceForRemode.loadMatchNum(type, (type)=>{
        MatchGradeService.startMatch(type)
    })//zxx
}
MatchGradeService.startQuickMatch = function () {
    let type = this.findBestQuickMatchType()
    this.checkIfMatch(type);
}
MatchGradeService.startMatch = function (type) {
    this.type = type;
    let scene = PaoYa.navigator.findSceneByName("MatchView");
    if (scene) {
        scene.changeParams(type);
        PaoYa.navigator.popToScene("MatchView");
    } else {
        PaoYa.navigator.push('MatchView', type)
    }
}
/**检查是否进入疲劳阶段 */
MatchGradeService.checkIfRoundLimit = function () {
    if (this.roundLimit) {
        /**确保弹窗只有一次 */
        this.roundLimit = 0
        let alert = new AlertDialog({
            title: '温馨提示',
            message: `您已经进入疲劳游戏时间,为了您的身心健康,请适度休息.继续游戏将不再产生收益!`
        })
        alert.popup();
        return false
    }
    return true
}
MatchGradeService.checkWithMiddle = function (cost) {
    let gold = PaoYa.DataCenter.user.gold
    if (gold < cost) {
        let message = `您可以去其他场次赢豆子哦!\n下载"泡泡游戏"app，每日签到领豆子!`;
        let alert = new AlertDialog({
            title: `豆子不足`,
            message: message,
            cancelText: `发送"1"下载`,
            confirmText: `跳过`,
            cancelHandler: function () {
                Utils.openCustomer();
            },
        }) 
        alert.popup()
        return false
    }
    return true
}