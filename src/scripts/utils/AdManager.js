export default class VideoAd extends Laya.EventDispatcher {
    constructor(adUnitId) {
        super()
        this.setup(adUnitId)
    }
    setup(adUnitId) {
        let videoAd = py.createRewardedVideoAd({
            adUnitId: adUnitId
        })
        videoAd.onLoad((res) => {
            this.errorTimes = 0
            this.event(VideoAd.LOADED)
        })
        videoAd.onClose((res) => {
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                this.event(VideoAd.COMPLETE)
            } else {
                this.event(VideoAd.CLOSE)
                // 播放中途退出，不下发游戏奖励
            }
        })
        videoAd.onError((res) => {
            if (this.errorTimes < 3) {
                this.errorTimes++
                this.videoAd.load()
            } else {
                //三次重试之后再去发送ERROR错误
                this.event(VideoAd.ERROR)
            }
        })
        this.videoAd = videoAd
    }
    load() {
        if (!py.createRewardedVideoAd){
            PaoYa.Toast.showModal('提示','当前微信版本不支持广告，请更新至最新版本后重试')
            return
        }
        this.videoAd.load().then(() => {
            this.videoAd.show()
        }).catch(() => {
            this.videoAd.load().then(() => {
                this.videoAd.show()
            })
        })
    }
    show() {
        this.videoAd.show()
    }
    destroy() {
        this.offAll()
        this.videoAd.offLoad({})
        this.videoAd.offClose({})
        this.videoAd.offError({})
        this.videoAd = null
    }
    static canShowAd() {
        let info = py.getSystemInfoSync()
        let lowestVersion = '2.0.4'
        if (info.SDKVersion >= lowestVersion) {
            return true
        }
        return false
    }
}
VideoAd.LOADED = 'onLoad'
VideoAd.CLOSE = 'onClose'
VideoAd.COMPLETE = 'onComplete'
VideoAd.ERROR = 'onError'