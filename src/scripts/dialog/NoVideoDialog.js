export default class NoVideoDialog extends PaoYa.Dialog{
    // 光告達到上限彈框
    onAwake(){
        this.moreGameButton.on(Laya.Event.CLICK,this,()=>{
            this.close()
            PaoYa.navigator.popup('CrossLinkDialog')
        })
    }
}