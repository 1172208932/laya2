export default class CommonAnimation {

}
CommonAnimation.showResultAnimate = function (result, cb) {
    this.resultSkeleton = new Laya.Skeleton();
    this.resultSkeleton.load("https://res.xingqiu123.com/wxgame/ladder/win_lose.sk", Laya.Handler.create(this, function () {
        var x = Math.round(((Laya.stage.width - this.resultSkeleton.width) >> 1) + this.resultSkeleton.pivotX);
        var y = Math.round(((Laya.stage.height - this.resultSkeleton.height) >> 1) + this.resultSkeleton.pivotY);
        this.resultSkeleton.pos(x, y)
        if (result >= 0) {
            this.resultSkeleton.play("win", false);
        }
        else {
            this.resultSkeleton.play("lose", false);
        }
        Laya.stage.addChild(this.resultSkeleton);
    }));
    this.resultSkeleton.on(Laya.Event.STOPPED, this, function () {
        Laya.timer.once(200, this, function () {
            this.resultSkeleton &&this.resultSkeleton.destroy();
            this.resultSkeleton = null;
            cb && cb();
        });
    });
};