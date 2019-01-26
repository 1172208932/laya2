import AlertDialog from '../dialog/AlertDialog'
import Utils from '../utils/utils';

export default class HomeControl extends PaoYa.Component {
    onAwake() {
        PaoYa.NotificationCenter.addLoginNotification(this, () => {
            if (PaoYa.DataCenter.loginData.is_review) {
                this.owner.txBox.visible = false;
                this.owner.MoreGame.visible = false
            }
            if (PaoYa.DataCenter.loginData.login_bonus == 1) {
                this.navigator.popup('LoginReward')
            }
        })
    }
    onClick(e) {
        switch (e.target.name) {
            case 'friendBattle':
                Utils.recordPoint('button004', 'click')
                this.navigator.push('FBView')
                PaoYa.DataTrack.trackType(PaoYa.DataTrackType.FriendBattle)
                break
            case 'arenaBattle':
                let alert = new AlertDialog({
                    title: '提示',
                    message: "暂未开放",
                })
                alert.popup();
                break
            case 'matchBattle':
                this.navigator.push('MatchGradeView')
                break
            case 'btnSet':
                Utils.recordPoint('button008', 'click')
                this.navigator.popup('SettingDialog')
                break
            case 'btnMoreGame':
                Utils.recordPoint('button009', 'click')
                this.navigator.popup('MoreGameDialog')
                break
            case 'rank':
                Utils.recordPoint('button007', 'click')
                this.navigator.push('RankView');
                PaoYa.DataTrack.trackType(PaoYa.DataTrackType.Rank)
                break
            case 'btnRule':
                Laya.Dialog.manager = null
                UIConfig.closeDialogOnSide = true
                this.navigator.popup('GameRuleDialog')
                break
        }
    }
    testAlert() {
        let alert = new AlertDialog({
            title: 'Hello',
            message: '这是一个测试弹窗这是一个测试弹窗这是一个测试弹窗这是一个测试弹窗',
            confirmText: '确定',
            cancelText: '取消',
            cancelHandler() {
            },
            confirmHandler() {
            }
        })
        alert.popup()
    }
}