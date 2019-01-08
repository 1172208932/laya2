export default class QTRoomView extends PaoYa.View {
    onAwake(){
        this.dot = 0
        this.dots = ['','.','..','...']
        Laya.timer.loop(1000,this,this.timerHandler)
    }
    timerHandler(){
        if (this.dot > 3)this.dot = 0
        this.lblTips.changeText(`加载中${this.dots[this.dot]}`)
        this.dot ++
    }
    onDestroy(){
        this.dot = 0
        this.dots = []
        Laya.timer.clear(this,this.timerHandler)
    }
}