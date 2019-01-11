import AlertDialog from "../dialog/AlertDialog";

export default class AddPrivilegeDialog extends PaoYa.Dialog {
    //开局特权弹框积分mode: 1或者豆子 mode: 0
    constructor(params) {
        super()
        this.params = params
        this.addSubviews()
    }
    addSubviews() {
        let imgBg = new Laya.Image('local/common/pop-bg.png')
        imgBg.sizeGrid = '150,130,100,120'
        imgBg.size(520, 380)
        this.addChild(imgBg)

        let lblTitle = new Laya.Label('开局特权')
        lblTitle.fontSize = 40
        lblTitle.color = '#ffffff'
        lblTitle.bold = true
        lblTitle.centerX = 0
        lblTitle.y = 30
        this.addChild(lblTitle)

        let lblGiveUp = new Laya.Label('放弃特权')
        lblGiveUp.fontSize = 30
        lblGiveUp.color = '#5d5d5d'
        lblGiveUp.pos(12, 318)
        this.addChild(lblGiveUp)

        let giveUp = new Laya.Button()
        giveUp.pos(0, 308)
        giveUp.size(145, 56)
        giveUp.name = Laya.Dialog.NO
        this.giveUp = giveUp
        this.addChild(giveUp)

        let btnOk = new Laya.Button('remote/share/but_01.png')
        btnOk.pos(151, 252)
        btnOk.labelSize = 35
        btnOk.labelColors = '#ffffff'
        btnOk.stateNum = 1
        this.btnOk = btnOk
        this.addChild(btnOk)

        let imgIcon = new Laya.Image('remote/share/guang_gao.png')
        imgIcon.pos(387, 282)
        this.imgIcon = imgIcon
        this.addChild(imgIcon)

        let lblBtn = new Laya.Label('立即使用')
        lblBtn.fontSize = 38
        lblBtn.color = '#ffffff'
        lblTitle.bold = true
        lblBtn.pos(200, 289)
        this.addChild(lblBtn)

        let lblText = new Laya.Label('是否使用特权，')
        lblText.fontSize = 30
        lblText.color = '#404040'
        lblText.pos(162, 131)
        this.addChild(lblText)
        this.setDialog()
    }
    setDialog() {
        const HTMLDivElement = Laya.HTMLDivElement;
        const CLICK = Laya.Event.CLICK
        this.type = this.params.type
        if (this.params.mode == 0) {
            let p = new HTMLDivElement();
            p.pos(66, 196)
            this.addChild(p);
            p.style.font = "Impact";
            p.style.width = 420;
            p.style.fontSize = 30;
            let html = "<span color='#404040'>本局获胜，赢得豆子增加</span>";
            html += "<span style='color:red'>20%</span>";
            p.innerHTML = html;
        } else {
            let p = new HTMLDivElement();
            p.pos(36, 196)
            this.addChild(p);
            p.style.font = "Impact";
            p.style.width = 500;
            p.style.fontSize = 30;
            let html = "<span color='#404040'>您获奖率</span>";
            html += "<span style='color:red'>+10%</span>";
            html += "<span style='color:#404040'>，对手获奖率</span>";
            html += "<span style='color:green'>-10%</span>";
            p.innerHTML = html;
            this.imgIcon.skin = 'remote/share/fen_xiang.png'
            this.imgIcon.pos(398, 275)
        }
        this.btnOk.on(CLICK, this, () => {
            if (this.params.mode == 1) {
                this.shareMethod()
            } else {
                this.videoMethod()
            }
        })
        this.giveUp.on(CLICK, this, () => {
            this.params.cancelHandler && this.params.cancelHandler()
        })
    }
    shareMethod() {
        let title = PaoYa.DataCenter.config.game.share_list.randomItem;
        PaoYa.ShareManager.shareTitle(title, {}, () => {
            this.params.confirmHandler && this.params.confirmHandler()
            this.close()
        })
    }
    videoMethod() {
        var _this = this
        let params = {
            onClose: function (res) {
                if (res.isEnded) {
                    _this.params.confirmHandler && _this.params.confirmHandler()
                    _this.close()
                } else {
                    let errorDialog = new AlertDialog({
                        title: "温馨提示",
                        message: '看完广告才能获得开局特权哦！'
                    })
                    errorDialog.popup()
                }
            },
            onError: function (res) {
                let errorDialog = new AlertDialog({
                    title: "温馨提示",
                    message: res.errMsg
                })
                errorDialog.popup()
            }
        }
        PaoYa.RewardedVideoAd.show(params)
    }
}