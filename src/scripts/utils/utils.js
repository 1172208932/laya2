import AlertDialog from "../dialog/AlertDialog";
import VideoAd from "./AdManager";
export default class Utils {
    static checkIfHasEnoughMoney(cost) {
        let gold = PaoYa.DataCenter.user.gold
        if (gold < cost) {
            PaoYa.DataCenter.recordPointDialog = true
            Utils.recordPoint('exposure001', 'view')
            PaoYa.navigator.popup('NotEnoughDialog')
            return false
        }
        return true
    }
    static adsForReward() {
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
            PaoYa.navigator.popup('NoVideoDialog')
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
        if (PaoYa.DataCenter.isNew || Laya.Browser.onIOS) {
            let alert = new AlertDialog({
                title: '领取豆子',
                message: "关注“泡泡游戏”公众号，免费领豆子，还能抢先玩游戏哦。",
                cancelText: `发送"1"关注`,
                confirmText: "跳过",
                cancelHandler: function () {
                    Utils.openCustomer();
                }
            })
            alert.popup();
        } else {
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

    /**开始轮盘的准备阶段，此过程包含两个步骤
     * 1、优先展示视频广告
     * 2、没有视频广告时弹窗告知用户进行分享
     * 3、只有完成上述任意一种行为，completion才会执行
     */
    static forceReward(completion) {
        let showAlert = function () {
            let alert = new AlertDialog({
                title: '提示',
                message: '广告观看已达上限，请分享之后继续',
                confirmText: '分享',
                confirmHandler() {
                    let title = PaoYa.DataCenter.config.game.share_list.randomItem
                    PaoYa.ShareManager.shareTitle(title, {}, () => {
                        completion()
                    })
                },
                cancelText: '取消'
            })
            alert.popup()
        }
        let p = {
            onError() {
                // showAlert()
                let title = PaoYa.DataCenter.config.game.share_list.randomItem
                PaoYa.ShareManager.shareTitle(title, {}, () => {
                    completion()
                })
            },
            onClose(res) {
                if (res.isEnded) {
                    completion()
                } else {
                    let alert = new AlertDialog({ title: '提示', message: '看完广告才能继续哦' })
                    alert.popup()
                }
            }
        }
        PaoYa.RewardedVideoAd.show(p)
    }
    static loadOtherGameList(num, cb) {
        /**资源已在GameMain中提前加载，所以此处只需要使用即可 */
        let res = Laya.loader.getRes('gameConfig.json')
        // Laya.loader.load('gameConfig.json', Laya.Handler.create(this, (res) => {
        res.navigateToMiniProgramAppIdList ? this.appId = res.navigateToMiniProgramAppIdList : console.error('请在gameConfig中设置游戏白名单')
        let shareInfo = JSON.parse(JSON.stringify(this.appId));
        let spineInfo = [];
        for (let i = 0; i < num; i++) {
            var rand = Math.floor(Math.random() * shareInfo.length);
            spineInfo.push(shareInfo.splice(rand, 1)[0]);
        }
        cb(spineInfo);
        // }))
    }
    static recordPoint(name, type) {
        PaoYa.Request.POST('point_log_record', { point_name: name, point_type: type }, (res) => { })
    }
}