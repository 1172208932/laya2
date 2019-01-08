import AlertDialog from "../dialog/AlertDialog";
import VideoAd from "./AdManager";
export default class Utils {
    static checkIfHasEnoughMoney(cost) {
        let gold = PaoYa.DataCenter.user.gold
        if (gold < cost) {
            let message = `观看广告免费得豆子;\n下载"泡泡游戏"app，每日签到领豆子!`;
            let btnText = "领豆子";
            let alert = new AlertDialog({
                title: `豆子不足`,
                message: message,
                cancelText: `发送"1"下载`,
                confirmText: "领豆子",
                cancelHandler: function () {
                    Utils.openCustomer();
                },
                confirmHandler: function () {
                    PaoYa.RewardedVideoAd.show({
                        onClose(res) {
                            if (res.isEnded) {
                              Utils.adsForReward();
                            }
                        },
                        onError(res) {
                            let errorDialog = new AlertDialog({
                                title: "温馨提示",
                                message: res.errMsg
                            })
                            errorDialog.popup()
                        }
                    });
                }

            })
            alert.popup()
            return false
        }
        return true
    }
    static adsForReward(){
        PaoYa.Request.GET("ads_reward", {}, function (data) {
            var alert = new AlertDialog({
                title: '恭喜',
                message: `获得${data.gold}豆子`,
                confirmText: '知道了'
            });
            alert.popup();
            //刷新豆子
            PaoYa.DataCenter.refreshUserInfo();
        }, function (message) {
            var message = `今日广告奖励已达上限，您可以免费和好友玩哦!\n下载"泡泡游戏"app,每日签到领豆子.`;
            let alert = new AlertDialog({
                title: '温馨提示',
                message: message,
                cancelText: `发送"1"下载`,
                confirmText: `跳过`,
                cancelHandler: function () {
                    Utils.openCustomer();
                }
            })
            alert.popup();
        });
    }
    static goToAds(cb) {
        cb && (this.cb = cb);
        if (PaoYa.DataCenter.videoAd) {
            PaoYa.DataCenter.videoAd.load();
        } else {
            let alert = new AlertDialog({
                title: "提示",
                message: "广告功能暂未上线，尽情期待!"
            })
            alert.popup();
        }
    }
    static setupAd(adUnit) {
        //创建视频广告，需要传入adunitId
        if (!VideoAd.canShowAd) {
            let message = "微信版本过低,请更新微信";
            let AdDialog = new AlertDialog({
                title: '提示',
                message: message,
                cancelText: "跳过",
                confirmText: "重新观看",
                confirmHandler: function () {
                }
            })
            AdDialog.popup();
            return;
        }
        var videoAd = new VideoAd(adUnit);
        //用户未看完视频
        videoAd.on(VideoAd.CLOSE, this, function () {
        });
        //用户成功看完视频
        videoAd.on(VideoAd.COMPLETE, this, function () {
            if (this.cb) {
                this.cb();
                this.cb = null;
                return;
            }
            PaoYa.Request.GET("ads_reward", {}, function (data) {
                var alert = new AlertDialog({
                    title: '恭喜',
                    message: `获得${data.gold}豆子`,
                    confirmText: '跳过'
                });
                alert.popup();
                //刷新豆子
                PaoYa.DataCenter.refreshUserInfo();
            }, function (message) {
                var message = `今日广告奖励已达上限，您可以免费和好友玩哦!\n下载"泡泡游戏"app,每日签到领豆子.`;
                let alert = new AlertDialog({
                    title: '温馨提示',
                    message: message,
                    cancelText: `发送"1"下载`,
                    confirmText: `跳过`,
                    cancelHandler: function () {
                        Utils.openCustomer();
                    }
                })
                alert.popup();
            });
        });
        //用户失败
        videoAd.on(VideoAd.ERROR, this, function () {
            let alert = new AlertDialog({
                title: '提示',
                message: "加载失误,稍后再试",
            })
            alert.popup();
        });
        PaoYa.DataCenter.videoAd = videoAd;
    }
    static ToMiniProgramForReward(cb) {
        if (cb === void 0) { cb = null; }
        var url_1 = PaoYa.DataCenter.config.common_config.hall_img.split(";").randomItem;
        Utils.navigateToMiniProgram({
            appId: "wx6c6a845c3a61e971",
            images: [url_1],
            path: "pages/index?to=2",
            envVersion: "release"
        });
    };
    static navigateToMiniProgram(params) {
        if (!params.appId) {
            console.error("必须指定appId");
            return;
        }
        if (py.navigateToMiniProgram) {
            py.navigateToMiniProgram({
                appId: params.appId,
                path: params.path || "",
                extraData: params.extraData || {},
                envVersion: params.envVersion || "release",
                fail: function (res) {
                    console.warn(res);
                    if (res.errMsg.indexOf("appId") != -1) {
                        var url = PaoYa.Utils.makeResourceURL(params.images.randomItem);
                        py.previewImage({
                            urls: [url],
                            success: function (res) {
                            },
                            fail: function (res) {
                            }
                        });
                    }
                }
            });
        }
    };
    static goToCharge() {
        if (PaoYa.DataCenter.loginData.is_review) {
            let alert = new AlertDialog({
                title: '提示',
                message: "该功能尚未上线",
            })
            alert.popup();
            return;
        }
        if (PaoYa.DataCenter.isNew) {
            let alert = new AlertDialog({
                title: '温馨提示',
                message: '暂未开放充值\n下载"泡泡游戏"app，每日签到领豆子。',
                cancelText: `发送"1"下载`,
                confirmText: "跳过",
                cancelHandler: function () {
                    Utils.openCustomer();
                }
            })
            alert.popup();
        } else if (Laya.Browser.onIOS) {
            let alert = new AlertDialog({
                title: '温馨提示',
                message: "iOS暂未开放充值\n下载泡泡游戏app，每日签到领豆子。",
                cancelText: `发送"1"下载`,
                confirmText: "跳过",
                cancelHandler: function () {
                    Utils.openCustomer();
                }
            })
            alert.popup();
        }
        else {
            if (!PaoYa.DataCenter.config.item_list) {
                return;
            }
            if (PaoYa.DataCenter.loginData.isProduction) {
                PaoYa.navigator.popup('ChargeDialog')
            }
            else {
                let alert = new AlertDialog({
                    title: '',
                    message: "当前版本暂时无法充值，您可以返回大厅参与其他游戏哦！",
                    cancelText: "跳过",
                    confirmHandler: function () {
                        Utils.goToHall();
                    }
                })
                alert.popup();
            }
        }
    }
    static goToHall() {
        PaoYa.DataTrack.trackType(PaoYa.DataTrackType.HallBack);
        if (PaoYa.DataCenter.isFromMiniProgram) {
            PaoYa.game.exit();
            return;
        }
        var url = PaoYa.DataCenter.config.common_config.hall_img.split(";").randomItem;
        Utils.navigateToMiniProgram({
            appId: "wx6c6a845c3a61e971",
            images: [url]
        });
    };
    static addNumberUnit(num) {
        switch (true) {
            case num >= 10000 && num < 100000000:
                let integ = num / 10000
                return Math.floor(integ * 100) / 100 + '万'
                break
            case num >= 100000000:
                let integ1 = num / 100000000
                return Math.floor(integ1 * 100) / 100 + '亿'
                break
            default:
                return num + ''
                break
        }
    };
    static openCustomer() {
        py.openCustomerServiceConversation()
    }
}