export default class NewTask extends PaoYa.Component {
    onAwake() {
        this.icon = this.owner.getChildByName('icon')
        this.boxAnimate = new Laya.Templet();
        this.boxAnimate.loadAni("https://res.xingqiu123.com/wxgame/service/jiang_li.sk")
        this.boxAnimate.on(Laya.Event.COMPLETE, this, () => {
            this.requestShareList()
        });
        // 弹框点击领取后 刷新状态
        this.onNotification("loadTaskData", this, () => {
            this.requestShareList()
        })
    }
    onAppear() {
        if (this.first) {
            this.requestShareList();
        }else{
            this.first=true;
        }
    }
    onDisappear() {
        this.boxSkeleton && this.boxSkeleton.stop();
    }
    onClick(e) {
        this.navigator.popup('TaskDialog')
    }
    requestShareList() {
        this.GET("get_share_task", {}, (data) => {
            this.setIcon(data)
        });
    }
    setIcon(data) {
        let noreceived = 0
        let received = 0
        for (let i = 0; i < data.list.length; i++) {
            if (data.list[i].status == 2) { received += 1 }
            if (data.list[i].status == 1) { noreceived += 1 }
        }
        if (noreceived > 0) {
            this.icon.visible = false
            if (this.boxSkeleton) {
                this.boxSkeleton.play("jiang_li_3", true);
            } else {
                var boxSkeleton = this.boxAnimate.buildArmature(0);
                boxSkeleton.pos(75, 75);
                this.boxSkeleton = boxSkeleton;
                this.owner.addChild(boxSkeleton);
                this.boxSkeleton.play("jiang_li_3", true);
            }
            this.boxSkeleton.visible=true;
        }else{
            this.boxSkeleton && this.boxSkeleton.stop()
            if(this.boxSkeleton){this.boxSkeleton.visible = false}
            this.icon.visible = true
        }
        if (received == data.list.length) {
            this.icon.visible = false
            if(this.boxSkeleton){ this.boxSkeleton.visible=false}
            this.owner.mouseEnabled = false
        }
    }

    onDestroy() {
        this.boxSkeleton && this.boxSkeleton.destroy();
        this.boxSkeleton = null;
    }
}