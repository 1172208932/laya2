import Utils from "../utils/utils";
export default class MiniGameSpine extends PaoYa.Component {
    /** @prop {name:spineNum,tips:"spine的数目",type:int,default:1}*/
    /** @prop {name:spineScale,tips:"spine缩放倍数",type:int,default:1}*/
    /** @prop {name:hSpace,tips:"缩放倍数",type:int,default:30}*/
    /** @prop {name:y,tips:"y轴坐标",type:int,default:0}*/
    constructor() { super(); }
    onAwake() {
        PaoYa.DataTrack.trackType(PaoYa.DataTrackType.Jump)
        this.shareInfo = JSON.parse(JSON.stringify(PaoYa.DataCenter.config.common_config.share_info));
        this.spineNum =this.spineNum|1;
        this.spineScale = this.spineScale|1;
        this.hSpace =this.hSpace|30;
        this.y = this.y|0;
        /**存储skeleton,便于统一销毁*/
        this.skeletonBox = [];
        /*跳转相关信息的存储，使用之前都要刷新*/
        this.spineInfo = [];
        /*skeleton的容器*/
        this.hBox = new Laya.HBox();
        this.hBox.centerX = 0;
        this.hBox.space = this.hSpace;
        this.hBox.y = this.y;
        this.owner.addChild(this.hBox);
        this.__createSpine();
        this.__showSkeleton();
    }
    onAppear() {
        if (this.skeletonBox) {
            this.__showSkeleton();
        }

    }
    onDisappear() {
        for (var i = 0; i < this.skeletonBox.length; i++) {
            this.skeletonBox[i]&&this.skeletonBox[i].stop()
        }
    }
    onDestroy() {
        this.destroy();
    }
    /*刷新spine相关信息*/
    __refreshSpineInfo() {
        this.shareInfo = JSON.parse(JSON.stringify(PaoYa.DataCenter.config.common_config.share_info));
        this.spineInfo = [];
        for (var i = 0; i < this.spineNum; i++) {
            var rand = Math.floor(Math.random() * this.shareInfo.length);
            this.spineInfo.push(this.shareInfo.splice(rand, 1)[0]);
        }
    }
    /*根据this.spineNum创建容器数量*/
    __createSpine() {
        for (var i = 0; i < this.spineNum; i++) {
            var skeleton = new Laya.Skeleton();
            skeleton.pos(80, 80);
            this.skeletonBox.push(skeleton);
            var box = new Laya.Box();
            box.index = i;
            box.size(160, 160);
            box.on(Laya.Event.CLICK, this, function (e) {
                PaoYa.DataTrack.trackType(PaoYa.DataTrackType.Jump);
                var index = e.target.index;
                var appId = this.spineInfo[index].appId;
                var img = this.spineInfo[index].img;
                Utils.navigateToMiniProgram({
                    appId: appId,
                    images: [img]
                });
            });
            box.addChild(skeleton);
            box.scale(this.spineScale, this.spineScale);
            this.hBox.addChild(box);
        }
    }
    /*组件每次展现的时候都要调用*/
    __showSkeleton() {
        this.__refreshSpineInfo();
        for (var i = 0; i < this.spineNum; i++) {
            this.skeletonBox[i].load(this.spineInfo[i].spine_url, Laya.Handler.create(this.skeletonBox[i], function () {
                this.play();

            }))
        }
    }
    /*组件看不见并不销毁的时候调用*/
    stop() {
        for (var i = 0; i < this.spineNum.length; i++) {
            var skeleton = this.skeletonBox[i];
            skeleton&&skeleton.stop();
        }
    }
    /*组件从舞台移除的时候*/
    destroy() {
        for (var i = 0; i < this.spineNum.length; i++) {
            var skeleton = this.skeletonBox[i];
            skeleton&&skeleton.destroy();
        }
    }
}