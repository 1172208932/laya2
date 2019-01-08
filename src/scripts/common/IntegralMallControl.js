import AlertDialog from "../dialog/AlertDialog";
import Utils from "../utils/utils";
export default class IntegralMallControl extends PaoYa.Component {
    onAwake() {
        this.requestRankList()
    }
    requestRankList() {
        this.GET('get_wheel_list', { type: 3 }, function (data) {
            data.exchange_list.forEach(function (item, index) {
                item.integralDes = Utils.addNumberUnit(item.integral)
                item.image = PaoYa.DataCenter.CDNURL + item.icon
            });
            this.owner.reloadData(data.exchange_list)
        })
    }
    skipExchangeGiftDialog() {
        this.navigator.popup('ExchangeGiftDialog')
    }
    changeMonet() {
        var _this = this
        let alert = new AlertDialog({
            title: '提示',
            message: "是否兑换现金红包？",
            cancelText: "取消",
            confirmText: "确定",
            confirmHandler: function () {
                _this.POST('change', { exchange_id: 66 }, () => {
                    PaoYa.DataCenter.refreshUserInfo()
                    let warn2 = new AlertDialog({ title: '提示', message: '购买成功', confirmText: "确定" })
                    warn2.popup()
                }, (message) => {
                    let warn2 = new AlertDialog({ title: '提示', message: message, confirmText: "确定" })
                    warn2.popup()
                })
            },
        })
        alert.popup();
    }
}