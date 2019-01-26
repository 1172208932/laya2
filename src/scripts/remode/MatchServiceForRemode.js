import MatchGradeService from "../common/MatchGradeService/MatchGradeService";
import AddPrivilegeDialog from "./AddPrivilegeDialog";
import AlertDialog from "../dialog/AlertDialog";

export default class MatchServiceForRemode {
    static loadMatchNum(type, cb) {
        if (PaoYa.DataCenter.loginData.is_review || !PaoYa.game.params.adUnitId) {
            cb && cb(type)
            return
        }
        this.selectDialog(type, cb)
    }
    static selectDialog(type, cb) {
        Laya.Dialog.manager = null
        Laya.UIConfig.closeDialogOnSide = false;
        Laya.UIConfig.popupBgAlpha = 0.8
        if (PaoYa.DataCenter.loginData.last_win == 1) {
            let dialog = new AddPrivilegeDialog({
                mode: 0,
                confirmHandler: function () {
                    /* 用于结果页豆子加成 */
                    PaoYa.DataCenter.showBeanPercent = 1
                    cb && cb(type)
                },
                cancelHandler: function () {
                    cb && cb(type)
                }
            })
            dialog.popup()
        } else {
            let dialog = new AddPrivilegeDialog({
                mode: 1,
                confirmHandler: function () {
                    /* 用于转盘页积分加成显示 */
                    PaoYa.DataCenter.showIntegralPercent = 1
                    cb && cb(type)
                },
                cancelHandler: function () {
                    cb && cb(type)
                }
            })
            dialog.popup()
        }
    }
}