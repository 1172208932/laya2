export default class TaskDialog extends PaoYa.Dialog {
    onAwake() {
        this.list.array = []
        this.status = {
            0: 'remote/task/box-noReceive-',
            1: 'remote/task/box-receive-',
            2: 'remote/task/box-received-'
        }
        this.btnStatus = {
            0: 'remote/task/btn-noReceive.png',
            1: 'remote/task/btn-receive.png',
            2: 'remote/task/btn-received.png'
        }
        this.setList()
        this.requestShareList()
    }
    requestShareList() {
        PaoYa.Request.GET("get_share_task", {}, (data) => {
            this.reloadData(data)
        });
    }
    setList() {
        var _this = this
        this.list.selectEnable = true;
        this.list.renderHandler = new Laya.Handler(this, updateItem);
        this.list.mouseHandler = new Laya.Handler(this, onSelect, [this.list]);
        function updateItem(cell, index) {
            let cellData = cell._dataSource
            let inviteNum = cell.getChildByName('lblInviteNum')
            let icon = cell.getChildByName('icon')
            let num = cell.getChildByName('lblPeopleNum')
            let price = cell.getChildByName('lblBeanNum')
            let btn = cell.getChildByName('btnGift')
            let imgAward = cell.getChildByName('imgAward')
            icon.skin = _this.status[cellData.status] + cellData.task_id + '.png'
            btn.skin = _this.btnStatus[cellData.status]
            switch (cellData.status) {
                case 1:
                    inviteNum.visible = false
                    break
                case 2:
                    btn.label = ''
                    inviteNum.visible = false
                    btn.mouseEnabled = false
                    btn.size(129, 89)
                    break
            }
            num.text = `和${cellData.num}个好友对战`
            price.text = PaoYa.DataCenter.formatPrize(cellData.task_reward)[0].value
            inviteNum.text = _this.data.finish_count + '/' + cellData.num
            if (PaoYa.DataCenter.formatPrize(cellData.task_reward)[0].type == 2) {
                imgAward.skin = 'local/common/icon-hb-ladder.png'
            }
        }
        function onSelect(list, e, index) {
            if (e.type == Laya.Event.CLICK && e.target.name == 'btnGift') {
                if (this.data.list[index].status == 0) {
                    _this.close()
                    PaoYa.NotificationCenter.postNotification('invite')
                } else if (this.data.list[index].status == 1) {
                    _this.showTaskReward(index)
                }
            }
        }
    }
    showTaskReward(index) {
        this.index = index  
        PaoYa.navigator.popup('TaskReward', { prizes: PaoYa.DataCenter.formatPrize(this.data.list[index].task_reward) }, Laya.Handler.create(this, (dialog) => {
            dialog.btnOk.clickHandler = Laya.Handler.create(this, () => {
                PaoYa.Toast.showLoading("");
                PaoYa.Request.POST("share_task_reward", { task_id: this.data.list[this.index].task_id }, (res) => {
                    PaoYa.Toast.hideLoading();
                    PaoYa.DataCenter.refreshUserInfo()  
                    PaoYa.NotificationCenter.postNotification('loadTaskData')          
                    dialog.close();
                }, () => {
                    PaoYa.Toast.hideLoading();
                });
            });
        }))
    }
    reloadData(data) {
        this.data = data
        this.list.array = data.list;
        this.list.refresh()
    }
}