export default class GameAgainDialog extends PaoYa.Dialog{
    constructor(){
        super()
    }
    show(isSender,name){
        this.isSender = isSender
        if (isSender) {

            this.bSender.visible = true
            this.lblSender.text = name

            this.bReceiver.visible = false

            this.btnRefuse.visible = false
            this.btnAccept.visible = false
            this.btnSend.visible = true
            this.btnSend.skin = "local/common/btn-blue.png"
            this.btnSend.label = "取消邀请"
            this.btnSend.name = Laya.Dialog.CANCEL
        } else {
            this.bReceiver.visible = true
            this.lblReceiver.text = name

            this.bSender.visible = false

            this.btnRefuse.visible = true
            this.btnAccept.visible = true
            this.btnSend.visible = false

        }
        this.callLater(this.reloadView)
        this.popup(true,false)
        this.startTimer()
    }
    hide(){
        this.stopTimer()
        this.close("")
    }
    reloadView() {
        if (this.isSender) {
            this.bSender.refresh()
            this.bSender.centerX = 0
        }
        else {
            this.bReceiver.refresh()
            this.bReceiver.centerX = 0
        }
    };
    startTimer(duration) {
        if (duration === void 0) { duration = 30; }
        this.duration = duration
        this.timerHandler()
        Laya.timer.loop(1000, this, this.timerHandler)
    };
    stopTimer() {
        Laya.timer.clear(this, this.timerHandler)
    };
    timerHandler() {
        if (this.duration >= 0) {
            this.lblTime.text = this.duration + "s"
            this.duration--
        }
        else {
            if (this.isSender) {
                this.btnSend.skin = "local/common/btn-yellow.png"
                this.btnSend.label = "对方未接受"
                this.btnSend.name = Laya.Dialog.CLOSE
            }
            this.stopTimer()
            this.close("close")
        }
    }
    onDestroy(){
        this.stopTimer()
    }
}
