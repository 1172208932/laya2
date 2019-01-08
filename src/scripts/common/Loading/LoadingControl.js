export default class LoadingControl extends PaoYa.Component {
    /** @prop {name:progressView,tips:'',type:Node} */
    /** @prop {name:lblProgress,tips:'',type:Node} */
    /** @prop {name:progressViewBg,tips:'',type:Node} */
    /** @prop {name:type,type:Option,option:"normal,waiting",default:normal}*/
    onAwake() {
        this.type = this.type || 'normal'
        this.owner.on(Laya.Event.PROGRESS, this, this.onProgress)
        if(this.type !== 'normal'){
            let bg = this.progressViewBg
            bg.graphics.clear()
            bg.graphics.drawPath(0, 0, PaoYa.Utils.makeAllCornerRoundRectPath(bg.width, bg.height, 20), {
                fillStyle: "#000000"
            })
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