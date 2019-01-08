import Utils from "../utils/utils";

export default class WxIcon extends PaoYa.Component {
    onAwake() {
        this.image = this.owner.getChildByName('image')
        this.image.visible = false
        PaoYa.NotificationCenter.addLoginNotification(this, function () {
            if (PaoYa.DataCenter.shareWxIcon.length <= 0) { return }
            this.initView()
        })
    }
    onClick() {
        PaoYa.DataTrack.trackType(PaoYa.DataTrackType.Jump)
        this.navigateToMiniProgram()
    }
    initView() {
        let sk = new Laya.Skeleton()
        sk.width = 130;
        sk.height = 130;
        sk.pos(65, 65)
        this.skeleton = sk
        this.owner.addChild(sk)
        this.reloadData()
    }
    reloadData() {
        var shareData = PaoYa.DataCenter.config.common_config.share_info
        var info = shareData.randomItem;
        var isShare = PaoYa.DataCenter.shareWxIcon.indexOf(info)
        if (isShare == -1) {
            return
        } else {
            this.info = info
            var url = info.spine_url;
            PaoYa.DataCenter.shareWxIcon.splice(isShare, 1)
        }
        this.skeleton.load(url, Laya.Handler.create(this, function () {
            this.skeleton.play();
        }))
    }
    navigateToMiniProgram() {
        var _this = this;
        if (!this.info) { return }
        Utils.navigateToMiniProgram({
            appId: _this.info.appId,
            images: [_this.info.img]
        });
    }
    onAppear() {
        if (PaoYa.DataCenter.config) {
            this.reloadData()
        }
    }
    onDisappear() {
        this.info && PaoYa.DataCenter.shareWxIcon.push(this.info)
        this.skeleton && this.skeleton.stop()
    }
    onDestroy() {
        this.info && PaoYa.DataCenter.shareWxIcon.push(this.info)
        this.skeleton.destroy()
    }
}