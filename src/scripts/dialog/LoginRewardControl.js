import AlertDialog from "./AlertDialog";
import Utils from "../utils/utils";

export default class LoginRewardControl extends PaoYa.Component {
    onAwake() {
        this.requestData()
    }
    requestData() {
        this.GET('get_qq_login_bonus_list', data => {
            this.owner.initData(data)
        })
    }
    onClick(e) {
        var _this = this
        if (e.target.name == 'btnOK') {
            Utils.forceReward(() => {
                _this.POST('qq_receive_reward', data => {
                    PaoYa.DataCenter.refreshUserInfo()
                    let type = data.pao_gold == 0 ? "积分" : "豆子"
                    let num = data.pao_gold == 0 ? data.integral : data.pao_gold
                    let dialog = new AlertDialog({ title: "温馨提示", message: `恭喜获得${num}${type}` })
                    dialog.popup()
                })
                _this.owner.close()
            })
        }
    }
}