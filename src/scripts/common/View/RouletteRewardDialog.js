import Utils from "../../utils/utils";
import AlertDialog from "../../dialog/AlertDialog";

export default class RouletteRewardDialog extends Laya.Dialog {
    onAwake(){
        let point = this.localToGlobal({ x: this.adView.x, y: this.adView.y })

        let y = point.y * Laya.Browser.clientWidth / Laya.stage.width

        let p = {
            style: {
                x: 0,
                y: y
            }
        }
        this.ad = PaoYa.BannerAd.show(p)

        this.lblValue.text = `x ${PaoYa.DataCenter._rouletteItem.num}`

        let _this = this
        this.btnReward.on(Laya.Event.CLICK,this,()=>{
            Utils.forceReward(()=>{
                _this.receiveReward(true)
            })
        })
        this.btnClose.on(Laya.Event.CLICK,this,()=>{
            this.receiveReward(false)
        })

        let sk = new Laya.Skeleton()
        sk.load('spine/roulette/box.sk')
        sk.pos(263,263)
        this.effectSprite.addChild(sk)
    }
    onDisable(){
        PaoYa.BannerAd.destroy(this.ad)
    }
    receiveReward(isDouble){
        let id = PaoYa.DataCenter._rouletteItem.id
        PaoYa.Request.POST('game_wheel_receive',{wheel_id:id,is_double:isDouble?1:0},res=>{
            PaoYa.DataCenter.refreshUserInfo()
            this.close('')
        },(msg)=>{
            let alert = new AlertDialog({
                title:'提示',
                message:msg
            })
            alert.popup()
        })
    }
}