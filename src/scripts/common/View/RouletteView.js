import AlertDialog from "../../dialog/AlertDialog";
import Utils from "../../utils/utils";

const RouletteViewSign = 'rouletteViewSign'
export default class RouletteViewControl extends PaoYa.Component {
    /** @prop {name:containerView,tips:'',type:Node} */
    /** @prop {name:imgLucky,tips:'',type:Node} */
    /** @prop {name:rouletteItemView,tips:'',type:Prefab} */
    /** @prop {name:rouletteView,tips:'',type:Node} */
    /** @prop {name:adView,tips:'',type:Node} */

    onAwake() {
        this.addViews()
        this.reloadData(PaoYa.DataCenter.rouletteData.wheel_list)

        let point = this.owner.localToGlobal({ x: this.adView.x, y: this.adView.y })

        let y = point.y * Laya.Browser.clientWidth / Laya.stage.width

        let p = {
            style: {
                x: 0,
                y: y
            }
        }
        this.showBannerAd(p)
    }
    addViews() {
        this.containerView.removeChildren()
        for (let i = 0; i < 8; i++) {
            let view = Laya.Pool.getItemByCreateFun(RouletteViewSign, this.rouletteItemView.create, this.rouletteItemView)
            view.pos(319, 319)
            view.size(114, 298)
            view.rotation = 45 * i
            this.containerView.addChild(view)
        }
    }
    reloadData(list) {
        /**记录列表中的值，以备后续使用 */
        this.list = list
        let count = this.containerView.numChildren
        for (let i = 0, length = list.length; i < length; i++) {
            if (i < count) {
                let view = this.containerView.getChildAt(i), item = list[i]
                view.getChildByName('lblValue').text = `${item.num}`
                view.getChildByName('imgIcon').getChildAt(0).skin = `remote/roulette/icon_bean${i + 1}.png`
            }
        }
    }
    onClick(e) {
        switch (e.target.name) {
            case 'start':
                Utils.forceReward(() => {
                    this.startRoulette()
                })
                break
            case 'close':
                this.navigator.dismiss()
                break
        }
    }
    /**开始转动轮盘，主要是与服务器的交互 */
    startRoulette() {
        this.rouletteView.rotation = 0
        this.POST('game_wheel', res => {
            let item = this.findWheelItemById(res.wheel_id)
            let index = this.list.indexOf(item)
            Laya.Tween.to(this.rouletteView, {
                rotation: 360 - 45 * index + 360 * 4
            }, 5000, Laya.Ease.circOut, Laya.Handler.create(this, function () {
                Laya.Dialog.manager = null
                UIConfig.closeDialogOnSide = false
                PaoYa.DataCenter._rouletteItem = item
                Laya.Scene.open('scenes/dialog/RouletteRewardDialog.scene')
            }));
        })
    }
    findWheelItemById(wheelId) {
        let dest = null
        for (let i = 0, length = this.list.length; i < length; i++) {
            let item = this.list[i]
            if (item.id == wheelId) {
                dest = item
                break
            }
        }
        return dest
    }
}

/**显示转盘界面 */
RouletteViewControl.show = function () {
    PaoYa.Navigator.scenesMap = {
        RouletteView: 'scenes/RouletteView'
    }
    if (PaoYa.DataCenter.rouletteData) {
        PaoYa.navigator.present('RouletteView')
    } else {
        PaoYa.Request.GET('game_wheel_list', {}, (res) => {
            PaoYa.DataCenter.rouletteData = res
            PaoYa.navigator.present('RouletteView')
        })
    }
}
/**
 * 显示转盘的悬浮按钮
 * @param position 表示转盘中心点的位置信息，其值为：
 * {
 *  x:100,
 *  y:100
 * }
 * @param parent 表示要将转盘放置到哪个界面
 */
RouletteViewControl.showAnimateIcon = function (parent,position) {
    (position == void 0) && (position = {})
    let s = new Laya.Sprite()
    /**使用zOrder确保不会被遮住 */
    s.zOrder = 100
    s.anchorX = 0.5
    s.anchorY = 0.5
    s.size(150, 150)
    s.on(Laya.Event.CLICK, this, function () {
        this.show()
    })
    s.pos(position.x||550, position.y||430)
    let sk = null
    if(RouletteViewControl.skTemplet){
        sk = new Laya.Skeleton(RouletteViewControl.skTemplet)
        sk.play(0,true)
    } else {
        sk = new Laya.Skeleton()
        sk.load('spine/roulette/icon.sk',Laya.Handler.create(this,function(){
            RouletteViewControl.skTemplet = sk.templet
        }))
    }
    sk.pos(s.width / 2, -430)
    s.addChild(sk)
    parent.addChild(s)
    return sk
}
/**
 * 集成指南
 * 1、如果需要显示转盘界面，则使用 RouletteViewControl.show()
 * 2、如果需要显示悬浮按钮，则使用 RouletteViewControl.showAnimateIcon()
 */