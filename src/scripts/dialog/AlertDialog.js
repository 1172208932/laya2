export default class AlertDialog extends PaoYa.Dialog {
    constructor(params){
        super()
        params.confirmText = params.confirmText || '知道了'
        this.params = params
        this.addSubviews()
    }
    addSubviews(){
        let imgBg = new Laya.Image('local/common/pop-bg.png')
        imgBg.sizeGrid = '150,130,100,120'
        imgBg.size(500,400)
        this.addChild(imgBg)

        let lblTitle = new Laya.Label(this.params.title||'')
        lblTitle.fontSize = 40
        lblTitle.color = '#ffffff'
        lblTitle.bold = true
        lblTitle.centerX = 0
        lblTitle.y = 30
        this.addChild(lblTitle)

        let lblMsg = new Laya.Label(this.params.message||'')
        lblMsg.fontSize = 28
        lblMsg.leading = 15
        lblMsg.color = '#4d4d4d'
        lblMsg.wordWrap = true
        lblMsg.align = 'center'
        lblMsg.pos(40,150)
        lblMsg.size(420,30)
        this.addChild(lblMsg)

        this.size = imgBg.size

        let hBox = new Laya.HBox
        hBox.centerX = 0
        hBox.y = 300
        hBox.space = 15
        this.addChild(hBox)

        if (this.params.cancelText){
            hBox.addChild(this._makeButton(this.params.cancelText,Laya.Dialog.NO))
        }
        hBox.addChild(this._makeButton(this.params.confirmText,Laya.Dialog.YES))
    }
    _makeButton(label,name){
        let btn = new Laya.Button('local/common/btn-blue.png',label)
        btn.size(200,64)
        btn.name = name
        btn.labelSize = 35
        btn.labelColors = '#ffffff'
        btn.stateNum = 1
        return btn
    }
    onClosed(type){
        if (type == Laya.Dialog.YES){
            this.params.confirmHandler&&this.params.confirmHandler()
        } else if (type == Laya.Dialog.NO){
            this.params.cancelHandler&&this.params.cancelHandler()
        }
    }
}