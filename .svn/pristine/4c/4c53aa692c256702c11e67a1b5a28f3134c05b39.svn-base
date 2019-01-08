/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _updateManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _BannerAd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _RewardedVideoAd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _qq__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);





var Platform = /** @class */ (function () {
    function Platform() {
    }
    Platform.prototype.init = function () {
    };
    Platform.prototype.getLaunchOptionsSync = function () {
        return _qq__WEBPACK_IMPORTED_MODULE_3__["default"].launchOption;
    };
    Platform.prototype.login = function (params, cb) {
        var _this = this;
        this.getUserInfo({
            openId: GameStatusInfo.openId,
            success: function (res) {
                _this.getOpenKey(function (key) {
                    var data = {
                        name: res.nickName,
                        sex: res.gender,
                        icon_big: res.avatarUrl,
                        openid: GameStatusInfo.openId,
                        key: key
                    };
                    cb({
                        account_type: 6,
                        type: 6,
                        platform: (GameStatusInfo.src == 318 || GameStatusInfo.src == 319) ? 6 : 7,
                        data: JSON.stringify(data)
                    });
                });
            }
        });
    };
    Platform.prototype.auth = function (params) {
        console.warn('QQ没有授权概念');
    };
    Platform.prototype.getOpenKey = function (cb) {
        BK.QQ.fetchOpenKey(function (errCode, cmd, data) {
            if (errCode == 0) {
                cb(data.openKey);
            }
            else {
                console.error('获取openKey失败');
            }
        });
    };
    Platform.prototype.getUserInfo = function (params) {
        BK.MQQ.Account.getNick(params.openId, function (id, nick) {
            BK.MQQ.Account.getHeadEx(params.openId, function (id, imgPath) {
                var user = {
                    nickName: nick,
                    avatarUrl: imgPath,
                    gender: GameStatusInfo.sex
                };
                params.success && params.success(user);
            });
        });
    };
    Platform.prototype.getMyInfo = function (params) {
        params.openId = GameStatusInfo.openId;
        this.getUserInfo(params);
    };
    Platform.prototype.isMiniGame = function () {
        return true;
    };
    Platform.prototype.stopGame = function (res) {
        console.log('向QQ服务器上报最后结果');
        console.log(JSON.stringify(res));
        BK.QQ.scoreUpload(res.result, function (errCode, cmd, data) {
            console.log(errCode, cmd, data);
        });
        var room = new BK.Room();
        room.showOneMorePage(res.win, [res.result[0].openId, res.result[1].openId]);
    };
    /**生命周期 */
    Platform.prototype.onShow = function (cb) {
        /**@warn 这里可能需要针对第一次进行过滤 */
    };
    Platform.prototype.offShow = function () {
    };
    Platform.prototype.onHide = function (cb) {
    };
    Platform.prototype.offHide = function () {
    };
    Platform.prototype.onExit = function () {
    };
    Platform.prototype.offExit = function () {
    };
    /**分享 */
    Platform.prototype.onShareAppMessage = function (listener) {
        // let params = listener() as ShareInfo
        // let info: ShareObject = {
        //     qqImgUrl: params.imageUrl,
        //     socialPicPath: params.imagePath || 'GameRes://share.png',
        //     title: params.title,
        //     summary: params.summary || '',
        //     extendInfo: params.query,
        //     success: params.success,
        //     fail: params.fail
        // }
        // return info
    };
    Platform.prototype.shareAppMessage = function (params) {
        var info = {
            qqImgUrl: params.imageUrl,
            socialPicPath: params.imagePath || 'GameRes://share.png',
            title: params.title,
            summary: params.summary || '',
            extendInfo: params.query,
            success: params.success,
            fail: params.fail
        };
        console.log("SHARE | " + JSON.stringify(info));
        BK.Share.share(info);
    };
    Platform.prototype.getShareInfo = function (params) {
        params.success && params.success({});
    };
    Platform.prototype.setKeepScreenOn = function () {
    };
    Platform.prototype.getSystemInfoSync = function () {
        return null;
    };
    Platform.prototype.getUpdateManager = function () {
        return new _updateManager__WEBPACK_IMPORTED_MODULE_0__["default"]();
    };
    /**小程序跳转 */
    Platform.prototype.navigateToMiniProgram = function (params) {
    };
    Platform.prototype.exit = function (params) {
    };
    /**声音 */
    Platform.prototype.onAudioInterruptionBegin = function (listener) {
    };
    Platform.prototype.onAudioInterruptionEnd = function (listener) {
    };
    /**network */
    Platform.prototype.onNetworkStatusChange = function (listener) {
    };
    Platform.prototype.offNetworkStatusChange = function (listener) {
    };
    Platform.prototype.getNetworkType = function (params) {
    };
    /**支付 */
    Platform.prototype.requestPayment = function (params) {
    };
    /**Toast */
    Platform.prototype.showLoading = function (params) {
    };
    Platform.prototype.hideLoading = function (params) {
    };
    Platform.prototype.showToast = function (params) {
    };
    Platform.prototype.hideToast = function (params) {
    };
    Platform.prototype.showModal = function (params) {
    };
    Platform.prototype.showActionSheet = function (params) {
    };
    /**广告 */
    Platform.prototype.createBannerAd = function (params) {
        return new _BannerAd__WEBPACK_IMPORTED_MODULE_1__["default"](params);
    };
    Platform.prototype.createRewardedVideoAd = function (params) {
        return new _RewardedVideoAd__WEBPACK_IMPORTED_MODULE_2__["default"](params);
    };
    /**微信特有方法 */
    Platform.prototype.setUserCloudStorage = function (params) {
    };
    Platform.prototype.openCustomerServiceConversation = function () {
    };
    Platform.prototype.previewImage = function (params) {
    };
    Platform.prototype.setClipboardData = function (params) {
    };
    return Platform;
}());
/* harmony default export */ __webpack_exports__["default"] = (Platform);
window['py'] = new Platform();
new _qq__WEBPACK_IMPORTED_MODULE_3__["default"]();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var UpdateManager = /** @class */ (function () {
    function UpdateManager() {
        // if (!APIEnable('getUpdateManager')) return this
        // let update = wx.getUpdateManager()
        // this.updateManager = update
    }
    UpdateManager.prototype.onCheckForUpdate = function (cb) {
        if (!this.updateManager)
            return;
        this.updateManager.onCheckForUpdate(cb);
    };
    UpdateManager.prototype.onUpdateReady = function (cb) {
        if (!this.updateManager)
            return;
        this.updateManager.onUpdateReady(cb);
    };
    UpdateManager.prototype.onUpdateFailed = function (cb) {
        if (!this.updateManager)
            return;
        this.updateManager.onUpdateFailed(cb);
    };
    UpdateManager.prototype.applyUpdate = function () {
        if (!this.updateManager)
            return;
        this.updateManager.applyUpdate();
    };
    return UpdateManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (UpdateManager);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var BannerAd = /** @class */ (function () {
    function BannerAd(params) {
        var bannerAd = BK.Advertisement.createBannerAd(params);
        this.bannerAd = bannerAd;
    }
    /**显示 banner 广告 */
    BannerAd.prototype.show = function () {
        if (!this.bannerAd)
            return;
        return this.bannerAd.show();
    };
    /**隐藏 banner 广告 */
    BannerAd.prototype.hide = function () {
        if (!this.bannerAd)
            return;
        return this.bannerAd.hide();
    };
    /**销毁 banner 广告 */
    BannerAd.prototype.destroy = function () {
        if (!this.bannerAd)
            return;
        if (this.bannerAd.destroy) {
            console.log('销毁Banner广告');
            this.bannerAd.destroy();
        }
    };
    /**监听 banner 广告尺寸变化事件 */
    BannerAd.prototype.onResize = function (listener) {
        if (!this.bannerAd)
            return;
        this.bannerAd.onResize(listener);
    };
    /**取消监听 banner 广告尺寸变化事件 */
    BannerAd.prototype.offResize = function (listener) {
        if (!this.bannerAd)
            return;
        this.bannerAd.offResize(listener);
    };
    /**监听 banner 广告加载事件 */
    BannerAd.prototype.onLoad = function (listener) {
        if (!this.bannerAd)
            return;
        this.bannerAd.onLoad(listener);
    };
    /**取消监听 banner 广告加载事件 */
    BannerAd.prototype.offLoad = function (listener) {
        if (!this.bannerAd)
            return;
        this.bannerAd.offLoad(listener);
    };
    /**监听 banner 广告错误事件 */
    BannerAd.prototype.onError = function (listener) {
        if (!this.bannerAd)
            return;
        this.bannerAd.onError(listener);
    };
    /**取消监听 banner 广告错误事件 */
    BannerAd.prototype.offError = function (listener) {
        if (!this.bannerAd)
            return;
        this.bannerAd.offError(listener);
    };
    return BannerAd;
}());
/* harmony default export */ __webpack_exports__["default"] = (BannerAd);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var RewardedVideoAd = /** @class */ (function () {
    function RewardedVideoAd(params) {
        this.playFinished = false;
        var _this = this, videoAd = BK.Advertisement.createVideoAd();
        videoAd.onPlayStart(function () {
            console.log('RewardedVideoAd | onPlayStart');
            _this.playFinished = false;
        });
        videoAd.onPlayFinish(function () {
            console.log('RewardedVideoAd | onPlayFinish');
            _this.playFinished = true;
        });
        videoAd.onClose(function () {
            console.log('RewardedVideoAd | onClose');
            _this.onCloseListener({ isEnded: _this.playFinished });
        });
        this.videoAd = videoAd;
    }
    /**隐藏激励视频广告 */
    RewardedVideoAd.prototype.load = function () {
        if (!this.videoAd)
            return;
        return this.videoAd.load();
    };
    /**显示激励视频广告。激励视频广告将从屏幕下方推入 */
    RewardedVideoAd.prototype.show = function () {
        if (!this.videoAd)
            return;
        return this.videoAd.show();
    };
    /**监听激励视频广告加载事件 */
    RewardedVideoAd.prototype.onLoad = function (listener) {
        if (!this.videoAd)
            return;
        this.videoAd.onLoad(listener);
    };
    /**取消监听激励视频广告加载事件 */
    RewardedVideoAd.prototype.offLoad = function (listener) {
        if (!this.videoAd)
            return;
        this.videoAd.offLoad(listener);
    };
    RewardedVideoAd.prototype.onPlayStart = function (listener) {
        if (!this.videoAd)
            return;
        this.videoAd.onPlayStart(listener);
    };
    RewardedVideoAd.prototype.offPlayStart = function (listener) {
    };
    RewardedVideoAd.prototype.onPlayFinish = function (listener) {
        if (!this.videoAd)
            return;
        this.videoAd.onPlayFinish(listener);
    };
    RewardedVideoAd.prototype.offPlayFinish = function (listener) {
    };
    /**监听激励视频错误事件 */
    RewardedVideoAd.prototype.onError = function (listener) {
        if (!this.videoAd)
            return;
        this.videoAd.onError(listener);
    };
    /**取消监听激励视频错误事件 */
    RewardedVideoAd.prototype.offError = function (listener) {
        if (!this.videoAd)
            return;
        this.videoAd.offError(listener);
    };
    /**监听用户点击 关闭广告 按钮的事件 */
    RewardedVideoAd.prototype.onClose = function (listener) {
        if (!this.videoAd)
            return;
        this.onCloseListener = listener;
        // this.videoAd.onClose(listener)
    };
    /**取消监听用户点击 关闭广告 按钮的事件 */
    RewardedVideoAd.prototype.offClose = function (listener) {
        if (!this.videoAd)
            return;
        this.videoAd.offClose(listener);
    };
    return RewardedVideoAd;
}());
/* harmony default export */ __webpack_exports__["default"] = (RewardedVideoAd);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Game = /** @class */ (function () {
    function Game() {
        this.initGame();
    }
    Game.prototype.initGame = function () {
        new BK.Game({
            onLoad: function (app, src, roomId) {
                /**318 319为一起玩游戏场景 */
                console.log('Game | onLoad');
                var extraData;
                if (src == 318 || src == 319) {
                    extraData = {
                        to: 10001,
                        p: { rname: roomId }
                    };
                }
                Game.launchOption = {
                    query: {},
                    path: '',
                    scene: src,
                    referrerInfo: { extraData: extraData }
                };
            },
            onClose: function (app) {
                console.log('Game | onClose');
            },
            onEnterForeground: function (app) {
                console.log('Game | onEnterForeground');
            },
            onEnterBackground: function (app) {
                console.log('Game | onEnterBackground');
            },
            onShare: function (app) {
                console.log('Game | onShare');
                var savedPath = 'GameSandBox://qrcode.png';
                var extendInfo = 'extendInfo';
                var picUrl = '';
                var shareInfo = {
                    summary: '分享正文',
                    localPicPath: savedPath,
                    picUrl: picUrl,
                    extendInfo: extendInfo,
                    gameName: '游戏名'
                };
                return shareInfo;
            },
            onShareComplete: function (app, retCode, shareDest, isFirstShare) {
                console.log('Game | onShareComplete');
            },
            onMinmize: function (app) {
                console.log('Game | onMinmize');
            },
            onNetworkChange: function (app, state) {
                console.log('Game | onNetworkChange');
            },
            onException: function (app) {
                console.log("Game | onException | " + app.errorMessage());
                console.log(app.errorStacktrace());
            }
        });
    };
    return Game;
}());
/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var localStorage = {
    get length() {
        console.warn('获取localStorage的length并没有实现，固定返回0');
        return 0;
    },
    key: function (n) {
        //   return BK.localStorage.key(n)
        return '';
    },
    getItem: function (key) {
        //   return BK.localStorage.getItem(key)
        return '';
    },
    setItem: function (key, value) {
        //   return BK.localStorage.setItem(key,value);
        return '';
    },
    removeItem: function (key) {
        //   BK.localStorage.removeItem(key)
    },
    clear: function () {
        //   BK.localStorage.clear()
    }
};
var _window = window;
_window.localStorage = localStorage;
/* harmony default export */ __webpack_exports__["default"] = (localStorage);


/***/ })
/******/ ]);