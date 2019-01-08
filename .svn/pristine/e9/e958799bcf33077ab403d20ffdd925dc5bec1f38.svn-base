export default class LoadingView extends PaoYa.View {
    constructor(type) {
        super()
        this.type = type || 'normal'
        this.on(Laya.Event.PROGRESS, this, this.onProgress)
        if (this.type !== 'normal') {
            Laya.timer.frameLoop(1, this, this.onUpdate)
        }
        //on QQ
        let scene = PaoYa.game.launchOption.scene
        if (window.BK && (scene == 318 || scene == 319) && this.type == 'normal'){
            this.lblProgress.visible = false
            this.progressView.visible = false
            this.imgProgressBg.visible = false
            this.lblTips.visible = false
        }
    }
    onUpdate() {
        if (this.type !== 'normal') {
            this.progressView.rotation += 5
        }
    }
    onProgress(progress) {
        this.lblProgress.text = `${Math.ceil(progress * 100)}%`
        if (this.type == 'normal') {
            let mask = this.progressView.mask
            mask.graphics.clear()
            mask.graphics.drawRect(0, 0, Math.ceil(this.progressView.width * progress), this.progressView.height, '#ff0000')
        }
    }
}