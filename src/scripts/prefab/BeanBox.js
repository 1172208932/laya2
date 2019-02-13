import Utils from "../utils/utils";
import AlertDialog from "../dialog/AlertDialog";
export default class BeanBox extends PaoYa.Component {
    /** @prop {name:boxType,tips:"1-豆子，2-积分（跳转商城），3-积分（展示），4-红包",type:Option,option:"1,2,3,4",default:1}*/
    onAwake() {
        this.boxType = this.boxType || '1'
        this.integBg = this.owner.getChildByName('beanBg')
        this.labelBg = this.owner.getChildByName('labelBgCircle')
        this.skinRight = this.owner.getChildByName("imgRight");
        this.skinLeft = this.owner.getChildByName("imgLeft");
        this.label = this.owner.getChildByName("label");
        this.changeBox()
    }
    changeBox() {
        switch (this.boxType) {
            case '1':
                PaoYa.DataCenter.gold.addObserver(this, this.handleGoldChange)
                break
            case '2':
                this.skinLeft.skin = 'local/common/jf.png'
                this.skinLeft.y = -5
                this.skinLeft.size(60, 60)
                this.skinRight.skin = 'local/common/btn_excha.png'
                this.skinRight.y = 0
                PaoYa.DataCenter.integral.addObserver(this, this.handleIntegralChange)
                break
            case '3':
                this.skinLeft.skin = 'local/common/jf.png'
                this.skinLeft.y = -5
                this.skinLeft.size(60, 60)
                this.skinRight.skin = ''
                this.integBg.visible = false
                this.labelBg.alpha = 0.5
                this.labelBg.graphics.drawPath(0, 0, PaoYa.Utils.makeAllCornerRoundRectPath(180, 50, 25), {
                    fillStyle: "#000000"
                });
                PaoYa.DataCenter.integral.addObserver(this, this.handleIntegralChange)
                break
            case '4':
                this.skinLeft.skin = 'local/common/hb.png'
                this.skinRight.skin = 'local/common/tx.png'
                this.skinRight.x = 144
                this.label.width = 106
                PaoYa.DataCenter.rmb.addObserver(this, this.handleRmbChange)
                break
        }
    }
    onClick() {
        switch (this.boxType) {
            case '1':
                Utils.recordPoint('button001', 'click')
                Utils.goToCharge()
                break
            case '2':
                let alert = new AlertDialog({
                    title: '兑换奖励',
                    message: "关注“泡泡游戏”公众号，兑换积分奖励，还能抢先玩新游戏哦。",
                    cancelText: `发送"1"关注`,
                    confirmText: "跳过",
                    cancelHandler: function () {
                        Utils.openCustomer();
                    }
                })
                alert.popup();
                break
            case '4':
                Utils.recordPoint('button002', 'click')
                this.navigator.popup('DepositDialog')
                break
        }
    }
    handleIntegralChange(value) {
        Utils.addNumberUnit(value) == 'undefined' ? this.label.text = '' : this.label.text = Utils.addNumberUnit(value)
    }
    handleGoldChange(value) {
        Utils.addNumberUnit(value) == 'undefined' ? this.label.text = '' : this.label.text = Utils.addNumberUnit(value)
    }
    handleRmbChange(value) {
        Utils.addNumberUnit(value) == 'undefined' ? this.label.text = '' : this.label.text = Utils.addNumberUnit(value)
    }
    onDestroy() {
        PaoYa.DataCenter.integral.removeObserver(this, this.handleIntegralChange)
        PaoYa.DataCenter.gold.removeObserver(this, this.handleGoldChange)
        PaoYa.DataCenter.rmb.removeObserver(this, this.handleRmbChange)
    }
}