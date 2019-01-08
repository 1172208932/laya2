export default class SkipMall extends PaoYa.Component{
    onAwake(){
        let shield = new Laya.Skeleton();
        shield.load("spine/geng_duo.sk", Laya.Handler.create(this, function () {
            shield.play(0, true);
        }));
        shield.pivot(0, 0)
        shield.size(120, 120)
        shield.scale(1.85,1.85)       
        shield.pivot(0, 0)
        shield.pos(60, 60)  
        this.owner.addChild(shield);
    }
    onClick() {
        this.navigator.push('IntegralMallView')
    }
}