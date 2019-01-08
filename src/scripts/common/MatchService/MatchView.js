import UserView from "../../prefab/UserView"
export default class MatchView extends PaoYa.View {
    onAwake() {
       this.init();
    }
    onAppear(){
        this.initView();
    }
    onDisappear(){
        Laya.timer.clearAll(this);
    }
    init(){      
        this.rectSprite.graphics.drawPath(0, 0, PaoYa.Utils.makeAllCornerRoundRectPath(this.rectSprite.width, this.rectSprite.height, 20), {
            fillStyle: "#ffffff"
        });
        this.animation.loadImages([
            'remote/match/circle-1.png',
            'remote/match/circle-2.png',
            'remote/match/circle-3.png',
            'remote/match/circle-4.png'])
        this.timerService = new PaoYa.TimerService(1000, 1, true)
        this.timerService.on(PaoYa.TimerService.PROGRESS, this, (time) => {
            this.lblTime.text = time + ""
        })
        this.timerService.on(PaoYa.TimerService.STOP, this, () => {
            if (this.animation.isPlaying) {
                this.animation.stop()
            }
            Laya.timer.clear(this, this.rotate)
        })  
        this.initTips();
    }
    initTips(){
        let lblTips = new Laya.Label();
        let tipsText = "Tips:" + PaoYa.DataCenter.config.game.strategy.split(';').randomItem;
        lblTips.text = tipsText;
        lblTips.width = 600;
        lblTips.color="#ffffff";
        lblTips.wordWrap = true;
        lblTips.align="center";
        lblTips.leading = 20;
        lblTips.fontSize = 22;
        lblTips.font="Microsoft YaHei";
        lblTips.pos((this.width - lblTips.width)>>1, 1220);
        this.addChild(lblTips);
   }
    initView(){
        this.vs.visible = false;
        this.lblSuc.visible = false;
        this.imgSlogan.visible=false;
        this.circleBg.visible = true;
        this.lblTime.visible = true;
        this.myInfoView.pos(261,869);
        this.otherInfoView.pos(261,281);  
        if (this.params.cost && this.params.entry_fee) {
            this.lblCostRemind.text = "单局输赢" + this.params.cost + "豆子，门票消耗" + this.params.entry_fee + "豆子";
        }
        else {
            this.lblCostRemind.text = "";
        }  
    }
    changeParams(type){
        this.params=type;
    }
    rotate(){
        this.circleBg.rotation+=2;
    }
    startMatch() {
        this.timerService.start()
        if (!this.animation.isPlaying) {
            this.animation.visible = true
            this.animation.play(0, true)
        }
        Laya.timer.frameLoop(1, this, this.rotate)
    }

    stopMatch() {
        this.timerService.stop()
        if (this.animation.isPlaying) {
            this.animation.stop()
            this.animation.visible = false
        }
        Laya.timer.clear(this, this.rotate)
    }
    setMyInfo(info){
        this.myInfoView.setData(info);
     }
    setOtherInfo(info) {
        this.otherInfoView.setData(info);
     }
    showSuccess(complete){
        this.lblTime.visible = false;
        this.lblSuc.visible = true;
        this.btnBack.visible = false;
        this.imgSlogan.visible=true;
        Laya.timer.once(3000, this, function () {
            this.btnBack && (this.btnBack.visible = true);
        });
        Laya.timer.once(1000, this, ()=> {
            this.circleBg.visible = false;
            this.lblSuc.visible = false;
            this.vs.visible = true;
            Laya.Tween.to(this.myInfoView, {
                x: 480,
                y: 580
            }, 300, Laya.Ease.linearInOut);
            Laya.Tween.to(this.otherInfoView, {   
                x: 40,
                y: 580           
            }, 300, Laya.Ease.linearInOut, Laya.Handler.create(this, () => {
                //延时2s触发成功回调
                Laya.timer.once(2000, this, complete);
            }));
        }) 
    }
}