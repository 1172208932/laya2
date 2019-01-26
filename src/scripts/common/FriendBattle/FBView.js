import GameAgainDialog from "../../dialog/GameAgainDialog";
import FBControl from "./FBControl";
import Emoji from "../../utils/Emoji";
import GameAgainControl from "../GameResult/GameAgainControl";
import NewTask from "../../prefab/NewTask";
export default class FBView extends PaoYa.View {
    onAwake() {
        const CLICK = Laya.Event.CLICK
        this.FBControl = this.getComponent(FBControl)
        GameAgainDialog.JSONView = Laya.loader.getRes('scenes/dialog/GameAgain.scene')
        this.btnTalk.on(CLICK, this, () => {
            this.boxTalk.visible = !this.boxTalk.visible
        })
        //点击其他区域隐藏对话弹框
        this.on(CLICK, this, (e) => {
            if (e.target.name != 'btnFace' && e.target.name != 'btnLbl' && e.target.name != 'btnTalk' && e.target.name != 'boxTalk' && this.boxTalk.visible == true) {
                this.boxTalk.visible = false
            }
        })
        this.btnLbl.on(CLICK, this, () => {
            this.list.visible = false
            this.listFace.visible = false
            this.list.visible = true
            this.btnFace.skin = 'remote/friend/btn_exp_n.png'
            this.btnLbl.skin = 'remote/friend/btn_quickl_p.png'
        })
        this.btnFace.on(CLICK, this, () => {
            this.list.visible = false
            this.listFace.visible = false
            this.listFace.visible = true
            this.btnFace.skin = 'remote/friend/btn_exp_p.png'
            this.btnLbl.skin = 'remote/friend/btn_quickl_n.png'
        })

        let ownAni = new Laya.Animation()
        ownAni.interval = 150;
        ownAni.size(56, 56)
        this.imgOwnFace.addChild(ownAni)
        this.imgOwnFace.scale(2, 2)
        this.ownAni = ownAni

        let otherAni = new Laya.Animation()
        otherAni.size(56, 56)
        otherAni.interval = 150;
        this.imgOtherFace.addChild(otherAni)
        this.imgOtherFace.scale(2, 2)
        this.otherAni = otherAni
    }
    //好友对战结束后调用
    stopGame(data) {
        this.resultData = data
        this.getComponent(GameAgainControl).dealData(data);
        this.lblTitle.visible = false

        let win = data.result.win_userid == PaoYa.DataCenter.user.id
        if (data.result.win_userid == 0) {
            this.setDrawView()
        } else {
            this.setWinView(win)
        }
    }
    //向对方发表情
    toOtherFace(index) {
        this.ownAni.play(0, true, `emoji${index}`)
        this.flyAnimation(this.imgOwnFace, 205, 550)
    }
    //收到对方的表情
    toOwnFace(index) {
        this.otherAni.play(0, true, `emoji${index}`)
        this.flyAnimation(this.imgOtherFace, 550, 205)
    }
    flyAnimation(view, from, to) {
        Laya.Tween.clearAll(view);
        view.x = from
        view.visible = true
        var tween = new Laya.Tween();
        tween.to(view, { x: to }, 2000, Laya.Ease.expoOut, Laya.Handler.create(this, () => {
            view.visible = false
        }))
    }
    //设置对战结束后的页面显示
    setWinView(isWin) {
        if (this.imgWin2) { this.imgWin2.visible = false }
        this.btnStart.visible = false
        this.btnAgain.visible = true
        this.boxBefore.visible = false
        this.boxLater.visible = true
        this.imgWin.visible = true
        if (isWin) {
            this.imgWin.pos(103, 371)
            this.lblOwnScore.text = Number(this.lblOwnScore.text) + 1
        } else {
            this.lblOtherScore.text = Number(this.lblOtherScore.text) + 1
            this.imgWin.pos(443, 373)
        }
    }
    //设置对战结束后平局的页面显示
    setDrawView() {
        this.btnStart.visible = false
        this.btnAgain.visible = true
        this.boxBefore.visible = false
        this.boxLater.visible = true
        this.imgWin.visible = true
        this.imgWin.pos(103, 371)

        this.imgWin2 = new Laya.Image('remote/friend/icon1.png');
        this.imgWin2.pos(443, 373)
        this.addChild(this.imgWin2);
        let lblText = new Laya.Label('胜利')
        lblText.color = '#ffffff'
        lblText.bold = true
        lblText.fontSize = 20
        lblText.pos(39,41)
        lblText.rotation = -36
        lblText.stroke = 3
        lblText.strokeColor = '#88235a'
        this.imgWin2.addChild(lblText)

        this.lblOwnScore.text = Number(this.lblOwnScore.text) + 1
        this.lblOtherScore.text = Number(this.lblOtherScore.text) + 1
    }
    //初始化页面
    initView() {
        if (this.imgWin2) { this.imgWin2.visible = false }
        this.lblOwnScore.text = 0
        this.lblOtherScore.text = 0
        this.lblTitle.visible = false
        this.btnStart.visible = true
        this.btnAgain.visible = false
        this.boxBefore.visible = false
        this.boxLater.visible = false
        this.imgWin.visible = false
    }
    setList(data) {
        this.list.array = data.list
        this.list.selectEnable = true;
        this.list.mouseHandler = new Laya.Handler(this, onSelect, [this.list.array]);
        function onSelect(list, e, index) {
            if (e.type == Laya.Event.CLICK) {
                this.boxTalk.visible = false
                this.showOwnMessage(list[index].message)
                this.getComponent(FBControl).postMessage(list[index].message)
            }
        }
        this.listFace.array = Emoji
        this.listFace.selectEnable = true;
        this.listFace.mouseHandler = new Laya.Handler(this, onSelectFace);
        function onSelectFace(e, index) {
            if (e.type == Laya.Event.CLICK) {
                this.boxTalk.visible = false
                this.toOtherFace(index)
                this.getComponent(FBControl).postMessage(0, index)
            }
        }
    }

    //显示自己的聊天文案
    showOwnMessage(msg) {
        Laya.timer.clear(this, this.hideOwnMessage)
        this.boxOwnMessage.visible = true
        this.lblOwnMessage.text = msg
        this.lblOwnBg.width = this.lblOwnMessage.width + 100
        Laya.timer.once(3000, this, this.hideOwnMessage)
    }
    //收到的聊天文案
    showOtherMessage(msg) {
        Laya.timer.clear(this, this.hideOtherMessage)
        this.boxOtherMessage.visible = true
        this.lblOtherMessage.text = msg
        this.lblOtherBg.width = this.lblOtherMessage.width + 100
        Laya.timer.once(3000, this, this.hideOtherMessage)
    }
    hideOtherMessage() {
        this.boxOtherMessage.visible = false
    }
    hideOwnMessage() {
        this.boxOwnMessage.visible = false
    }
    onDestroy() {
        Laya.timer.clear(this, this.hideOtherMessage)
        Laya.timer.clear(this, this.hideOwnMessage)

        Laya.Tween.clearAll(this.imgOwnFace);
        Laya.Tween.clearAll(this.imgOtherFace);
        this.ownAni && this.ownAni.destroy()
        this.otherAni && this.otherAni.destroy()
    }
}