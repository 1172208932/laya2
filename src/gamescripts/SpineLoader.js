import GameSpine from './GameSpine'
export default class SpineLoader {

}
SpineLoader.setup = function(cb){
    let spines = []
    for (let i in GameSpine){
        spines.push(GameSpine[i])
    }
    this.load(spines,cb)
}
SpineLoader.loadIndex = 0
SpineLoader.load = function (spines,cb) {
    var _this = this
    var spine = spines[this.loadIndex]
    this.loadSpine(spine,function(templet){
        spine.templet = templet
        if (_this.loadIndex == spines.length-1){
            _this.loadIndex = 0;
            cb && cb()
        } else{
            _this.loadIndex ++
            _this.load(spines,cb)
        }
    })
}
SpineLoader.loadSpine = function(spine,completion){
    var templet = new Laya.Templet
    templet.on(Laya.Event.COMPLETE, this, function () {
        completion && completion(templet)
    })
    templet.on(Laya.Event.ERROR, this, function(){
        console.error("E: Load spine, skin:"+url)
    })
    templet.loadAni(spine.path)
}