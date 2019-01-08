declare const DEBUG: boolean

declare interface Array<T> {
    lastObject: T
    randomItem: T
}
declare interface Date {
    /**
    * @param {时间格式，如“yyyy-mm-dd hh:mm:ss”} format 
    */
    formatWithStyle(format: string): string;
}
declare interface Number {
    /** * 格式化秒数，如 1000s = 00:16:40 */
    formatTime(): string;
}
declare module wx {
    export function hideSplash()
}
declare interface Window {
    PaoYa
}

interface LadderItem {
    id: number
    name: string
    icon: string
    /**礼包配置  1-200,2-1  泡豆-泡豆数量，rmb-rmb金额 */
    gift_box: string
    /**该等级的 满星数  */
    star: number
    /**奖池 1-200000,2-1000  泡豆-泡豆数量，rmb-rmb金额 */
    reward: string
    /**消耗  */
    match_cost: number
    desc: string
    show_reward: string
    /**新增字段，用于表示该段位有多少人数 */
    peopleCount: number
}

interface AuthParams {
    scope: string,
    success: Function,
    fail: Function,
    alert: Function
}
interface Monitorable {
    startMonitor(): void
    stopMonitor(): void
}
interface ClientMessage {
    command: string
    timestamp: number
    m_id: number
    retryTime: number
    value: Object
}
interface ConfigList {
    game: ConfigGame
    /**通用配置 */
    common_config: Object
    /**游戏配置 */
    game_list: Array<any>
    /**赛事配置 */
    race_list: Array<any>
    /**奖励配置 */
    promotion_reward: Array<any>
    /**登录奖励 */
    login_reward: Array<any>
    /**分享标题配置 */
    share_list: Array<any>
    /**充值配置 */
    item_list: Array<any>
    ladder_config: Array<any>
    tiny_login_reward: Array<any>
}
interface ConfigGame {
    match_cost: number
    ladder_config: any
    share_list: any
}
interface LoginParams {
    encrypted_data?: string,
    iv?: string,
    data?: UserInfo,
    [prop: string]: any
}
interface LoginData {
    isProduction: boolean
    is_review: boolean
    is_new: boolean
    is_show: boolean
    login_bonus_day: number
    login_bonus: number
    game_url: string
    app_game_url: string
    timing_url: string
    app_timing_url: string
    token: string
    config_list: ConfigList
    is_first_game: number
}
interface UserInfo {
    gender: string
    member_province: string
    member_country: string
    member_city: string
    gold: number
    rmb: string
    integral: number
    nickname: string
    id: number
    avstar: string
    age: number

}

interface RequestAble {
    GET(path: string, params: Object, suc: Function, fail: Function): void;
    POST(path: string, params: Object, suc: Function, fail: Function): void;
}

interface AlertDialogParams {
    title: string
    message: string
    cancelText?: string
    confirmText?: string
    comfirmHandler?: Function
    cancelHandler?: Function
}
declare class AlertDialog extends Laya.Dialog {
    constructor(params: AlertDialogParams)
}

declare module Laya {
    interface View {
        createViewFromJSON(url: string, complete: Handler): void
    }
    interface Dialog {
        createViewFromJSON(url: string, complete: Handler): void
    }
    interface Node {
        /**
         * 
         * @param caller 调用者
         * @param method 方法回调
         * @param throttle 是否过滤无效操作，默认过滤500ms内的操作
         * @param fail     当检测到过滤操作时，会执行该方法，可在该方法中弹出提示告知用户
         */
        addClickListener(caller: any, method: Function, throttle?: boolean, fail?: Function)
        dispatchLifeCycleEvent(method: string, p1, p2, p3, p4, p5)
        dispatchComponentEvent(method: string, p1, p2, p3, p4, p5)
    }
}
declare module laya.display {
    interface Node {
        url: string
        createView(params: any)
        /**
         * 
         * @param caller 调用者
         * @param method 方法回调
         * @param throttle 是否过滤无效操作，默认过滤500ms内的操作
         * @param fail     当检测到过滤操作时，会执行该方法，可在该方法中弹出提示告知用户
         */
        addClickListener(caller: any, method: Function, throttle?: boolean, fail?: Function)
        dispatchLifeCycleEvent(method: string, p1, p2, p3, p4, p5)
        dispatchComponentEvent(method: string, p1, p2, p3, p4, p5)
    }
    interface Sprite {
        /**为指定的Sprite添加背景色，使用时需要先确定该Sprite的宽高 */
        backgroundColor: string
        /**为指定的Sprite添加圆角，使用时需要先确定该Sprite的宽高，一般配合backgroundColor一起使用 */
        cornerRadius: number
        drawBackground(): void
    }
}
declare interface MatchInfo {
    room_name: string
    match_list: Array<MatchUserInfo>
    match_type_id: number //10
    first_id: string
    source_type: number//2
    game_id: number//1016
}
/**匹配成功之后的用户信息 */
declare interface MatchUserInfo {
    wx_num: string
    ladder_id: number
    isRobot: number//0,1
    gender: string//男，女
    user_id: number//108125
    user_name: string
    dressup_id: number
    user_icon: string
    location: string
    continuous_win: number//连胜
    age: number
}

declare interface GameConfig {
    /**游戏 ID */
    gameId: number
    /**API 接口地址 */
    baseURL: string
    /**socket 游戏 zone */
    zone: string
    /**米大师支付 */
    offerId?: string
    /**是否自动登录，如果为 false 则需要手动调用login方法，默认为true */
    autoLogin?: boolean
    /**是否使用socket，便于支持单机游戏，默认为true*/
    useSocket?: boolean
    /**版本号 */
    version?: string
    /**发行号 */
    release?: number
    /**用于浏览器登录 */
    userId?: number
    /**mta统计初始化ID */
    mtaID?: string
    /**mta统计事件ID */
    mtaEventID?: string
    /**游戏的设计宽度，默认为750 */
    width?: number
    /**游戏的设计高度，默认为1334 */
    height?: number
    /**是否启用webGL，默认为true */
    webGL?: boolean
    /**是否debug环境 */
    debug?: boolean
    /**是否显示 */
    showDebugTool?: boolean
    showStat?: boolean
    scaleMode?: string
    alignH?: string
    alignV?: string
    /**是否横屏显示 */
    portrait?: boolean
    /**socket忽略重试的命令，方便每个游戏单独设置 */
    ignoreCmds?: Array<string>
    rankingType: PaoYa.RankingType
    /**是否从网络获取资源 */
    loadNetworkRes: boolean
    /**广告ID */
    adUnitId:string
    qqViewId:number
}

declare module PaoYa {
    let navigator: Navigator
    let socket: Client
    let game: Main
    /**通知的名字，都是常量，可以自行扩展，只要是string类型即可 要扩展NotificationName，请在config.js 中重点标明*/
    class NotificationName {
        static ApplicationShow: string;
        static ApplicationHide: string;
        static GameShow: string;
        static NetworkChanged: string;
        static LoginSuccess: string;
        static START_GAME: string
    }
    /**通知中心，用于全局触发 */
    class NotificationCenter {
        static on(type: string, caller: any, listener: Function, args?: any[]): Laya.EventDispatcher
        static addLoginNotification(caller: any, listener: Function)
        /**监听通知中心的消息，只监听一次 */
        static once(type: string, caller: any, listener: Function, args?: Array<any>): Laya.EventDispatcher
        /**向通知中心发送Notification */
        static event(type: string, data?: any): boolean
        /**取消监听通知中心消息 */
        static off(type: string, caller: any, listener: Function, onceOnly?: boolean): Laya.EventDispatcher
        /**取消通知中心某种类型的消息 */
        static offAll(type?: string): Laya.EventDispatcher
        /**取消通知中心所有类型的消息 */
        static offAllCaller(caller: any): Laya.EventDispatcher
        /**向通知中心发送Notification */
        static postNotification(type: string, data?: any): boolean
    }
    class Observer extends Laya.EventDispatcher {
        value: any
        addObserver(caller: any, method: Function)
        removeObserver(caller: any, method: Function)
    }
    class DataCenter {
        /**登录信息 */
        static loginData: LoginData;
        static config: ConfigList
        /**当前用户信息 */
        static user: UserInfo;
        /**CDN资源地址,默认为https://res.xingqiu123.com/ */
        static CDNURL: string;
        static videoAd: any;
        static isShare: boolean;
        /**用户金币数变更监听 */
        static gold: Observer
        /**用户提现变更监听 */
        static rmb: Observer
        /**用户积分变更监听 */
        static integral: Observer
        /**通过天梯ID获取天梯 */
        static findLadderById(id: any): LadderItem
        static makeLadderIconById(id: any): string
        static formatPrize(prize: string): Array<PrizeInfo>
        /**更新用户信息，包括豆子、红包等 */
        static refreshUserInfo(): void
    }
    class Navigator {
        scenes: Array<View>
        visibleScene: View
        /**调整View的位置以便适配不同屏幕尺寸 */
        static adjustViewPosition(view)
        popup(sceneName: string, params?: any, complete?: Laya.Handler, progress
            ?: Laya.Handler, closeOther?: boolean)
        /**
         * 
         * @param sceneName 当前显示scene的名称
         * @param params 需要传递进去的参数
         * @param resURL 当前场景需要引用的资源，可以为Array<string> | string
         * @param complete 场景加载成功的回调
         * @param progress 场景加载进度
         */
        push(sceneName: string, params?: any, resURL?: any, complete?: Laya.Handler, progress?: Laya.Handler)
        pop()
        popToLastScene(sceneName: string)
        findSceneByName(sceneName: string): View
        popToScene(sceneName: string)
        popToRootScene()
        present(sceneName: string, params?: any, resURL?: any, complete?: Laya.Handler, progress?: Laya.Handler)
        dismiss()
    }
    class Component extends Laya.Script {
        navigator: Navigator
        /**有节制的点击，防止用户点击频率过快，默认间隔500ms */
        onThrottleClick(): void

        /**当前 scene 收到服务器 socket 命令时触发，虚方法 */
        onReceiveMessage(cmd: string, value: any)
        /**当前 scene 收到服务器socket命令错误时触发，虚方法 */
        onReceiveSocketError(cmd: string, code: number, message: string)
        /**添加socket事件监听 */
        onMessage(name: string, caller: any, listener: Function, args?: any[])
        /**向socket发送消息 */
        sendMessage(cmd: string, params: any)

        /**向通知中心注册消息，以便接收回调 */
        onNotification(name: string, caller: any, listener: Function, args?: any[])
        /**向通知中心发送消息，以便触发相关通知 */
        postNotification(name: string, params?: any)
        /**接收通知中心发送过来的消息，以便处理相关逻辑，虚方法 */
        onReceiveNotification(name: string, params: any)

        GET(path: string, params: Object, suc: Function, fail: Function): void
        POST(path: string, params: Object, suc: Function, fail: Function): void

        /**分享主要方法，需要传入所有参数 */
        share(title: string, image: string, query: object | Function, success?: Function, fail?: Function): void
        /**分享方法，可以不用传入图片，图片将从 ShareManager.imageURL 获取 */
        shareTitle(title: any, query: any, success: any, fail?: any): void

        /**显示激励广告 */
        showRewardedVideoAd(params)
        /**显示Banner广告 */
        showBannerAd(params) 

        /**进入前台时执行，由游戏事件分发主动调用 */
        onShow(res)
        /**进入后台时执行，由游戏事件分发主动调用 */
        onHide(res)
        /**视图显示时调用 */
        onAppear()
        /**视图隐藏时调用 */
        onDisappear()
        /**点击右上角转发时触发 */
        onShareAppMessage(): object
        /**当网络变化时调用 */
        onNetworkChange()
        /**当socket断开时调用 */
        onSocketClose()
    }
    class View extends Laya.View {
        constructor();
        /**当该 view 被点击时触发，可以根据 e.target.name 来区分当前点击实例 */
        onClick(event: Laya.Event): void
        /**视图显示时调用 */
        onAppear()
        /**视图隐藏时调用 */
        onDisappear()
        /**视图被添加到父视图时调用 */
        onAdded()
        /**当视图从父视图移除时调用 */
        onRemoved()
        /**为当前View的子View设置JSONView，方便统一进行处理，虚方法 */
        setupJSONView()
    }
    class Dialog extends Laya.Dialog {

    }
    class LoginService {
        static token: string
        static login(suc: Function, fail: Function)
    }

    class SocketConfig {
        static zone: string;
    }
    class Socket extends Laya.Socket {
        url: any;
        /**重连配置 */
        static reconnectConfig: {
            total: number;
            interval: number;
            duration: number;
        };
        /**当前是否在重连 */
        isReconnecting: boolean;
        /**当前重连次数 */
        reconnectTimes: number;
        readonly canReconnect: boolean;
        constructor(url: any);
        /**切换服务器 */
        changeUrl(url: any): void;
        static RECONNECT_START: string;
        static RECONNECT_END: string;
        static RECONNECT_FAIL: string;
        static RECONNECT_PROGRESS: string;
    }

    class ClientConfig {
        static watchDogTime: number;
        static maxRetryTime: number;
    }
    class Client extends Socket {
        /**用于配置需要忽略的命令 */
        static ignoreCmds: string[];

        constructor(url: any);
        /**发送socket消息 */
        sendMessage(cmd: string, params: any): void;
        /**处理socket消息 */
        handleMessage(msg: any): void;

        static HEART_BEAT: string;
        static DISCONNECT: string;
        static LEAVE_ROOM: string;
        static LOGIN: string;
        static MATCH_SUCCESS: string;
        static MATCH_FAIL: string;
        static MATCH_JOIN: string;
        static MATCH_CANCEL: string;
        static LADDER_MATCH_JOIN: string;
        static LADDER_MATCH_CANCEL: string;
        static GAME_START_MATCH: string;
        static GAME_START_GAME: string;
        static GAME_START_PK: string;
        static GAME_BET: string;
        static GAME_END_PK: string;
        static GAME_END_PKGAME: string;
        static AGIAN_SEND: string;
        static AGAIN_REJECT: string;
        static AGAIN_CANCAL: string;
        static CHAMPIONSHIP_JION: string;
        static CHAMPIONSHIP_CANCEL: string;
        static CHAMPIONSHIP_UPDATE_ROOM_COUNT: string;
        static CHAMPIONSHIP_UPDATE_TOTAL_COUNT: string;
        static SHARE_START_GAME: string;
        static SHARE_INVITE_FRIEND: string;
        static SHARE_RECEIVE_INVITE: string;
        static GROUP_JOIN_ROOM: string;
        static GROUP_ROOM_STATUS: string;
    }

    interface RequestAble {
        GET(path: string, params: Object, suc: Function, fail: Function): void;
        POST(path: string, params: Object, suc: Function, fail: Function): void;
    }
    class RequestConfig {
        static baseURL: string;
        static token: string;
        static headers: string[];
        static makeParamsHandler: Function;
        static maxRetryTimes: number;
    }
    class Request extends Laya.HttpRequest implements RequestAble {

        constructor();
        /**发送GET请求 */
        GET(path: any, params: any): void;
        /**发送POST请求 */
        POST(path: any, params: any): void;

        /**类方法进行GET请求 */
        static GET(path: any, params: any, suc: any, fail?: any): Request;
        /**类方法进行POST请求 */
        static POST(path: any, params: any, suc: any, fail?: any): Request;

    }

    class DataTrack {
        static setup(appID: string, eventID: string, options: any): void;
        static track(type: DataTrackType, params: any): void;
        static trackType(type: DataTrackType): void;
        static startTrackTime(id: string): void;
        static stopTrackTime(id: string): void;
        static startSocketTime(): void;
        static stopSocketTime(): void;
        static startSocketLogin(): void;
        static stopSocketLogin(): void;
        static uploadLoginCostTime(): void;
    }
    enum DataTrackType {
        LoginTimeCost = 3001,
        SocketTimeCost = 3002,
        SocketLoginTimeCost = 3003,
        SocketRetry = 3004,
        HTTPRetry = 3005,
        Ladder = 1001,
        FriendBattle = 1002,
        RedPacket = 1003,
        PlayOffline = 1004,
        Rank = 1004,
        HallBack = 1006,
        WithDraw = 1007,
        Jump = 1008,
        Change = 1009
    }
    enum GameEntryType {
        /**好友对战 */
        Friend = 1,
        /**匹配场次 */
        Match = 2,
        /**天梯赛 */
        Ladder = 3,
        /**红包赛 */
        Arena = 4,
        /**人满开赛 */
        Full = 5
    }
    enum SocketURLType {
        TIMING = 'timing_url',
        GAME = 'game_url'
    }

    enum RankingType {
        /**高分榜 */
        Score = 1,
        /**天梯榜 */
        Ladder = 2,
        /**胜局榜 */
        WIN = 8
    }

    class ShareManager {
        /**分享的图片地址，可以是本地图片，也可以是网络图片 */
        static imageURL: string;
        /**自定义方法处理分享的query，比如添加全局统一参数,返回的是个对象 */
        static makeQueryHandler: Function;
        /**是否验证群ID */
        static checkGroup: boolean
        /**组织分享信息 */
        static makeShareInfo(title: any, image: string, query: any, success: any, fail?: any): {
            title: any;
            imageUrl: string;
            query: string;
            success: any;
            fail(): void;
        };
        /**分享主要方法，需要传入所有参数 */
        static share(title: string, image: string, query: any, success: any, fail?: any): void;
        /**分享方法，可以不用传入图片，图片将从 ShareManager.imageURL 获取 */
        static shareTitle(title: any, query: any, success: any, fail?: any): void;
        /**获取分享内容 */
        static getShareInfo(shareTicket: any, suc: any, fail: any): void;
        /**显示当前页面的转发按钮 */
        static showShareMenu(withShareTicket?: boolean): void;
        /**隐藏转发按钮 */
        static hideShareMenu(): void;
        /**更新转发属性 */
        static updateShareMenu(withShareTicket?: boolean): void;
    }
    class SoundManager extends Laya.SoundManager {
        static onShowHandler: Function;
        static onHideHandler: Function;
        static onAudioInterruptionBeginHandler: Function;
        static onAudioInterruptionEndHandler: Function;
    }

    class Application extends Laya.EventDispatcher {
        navigator: Navigator
        launchOption: LaunchOption;
        constructor();
        /**返回用户【转发】消息 */
        onShareAppMessage(): any;
        onShow(res: any): void;
        onHide(res: any): void;
        /**退出当前小游戏 */
        exit(): void;
    }

    class Game extends Application {
        params: GameConfig
        static ins: Game
        constructor(params: GameConfig)
    }

    class Toast {
        /**
        * 1. icon默认是"success"
        * 2. icon 和 image 同时存在只会有一个生效，image的优先级高于icon，不管什么情况下都会有图片的，这个是取消不了的
        * 3. icon为null、undefined、""或者任何字符串，结果都为"success"
        * 4. duration是毫秒级
        * 5. 多次重复调用，只有最新调用的生效
        */
        static show(title: string, icon: string, image?: string, duration?: number): void;
        static hide(): void;
        static showSuccess(title: string, duration?: number): void;
        static showError(title: string, duration?: number): void;
        static showWarn(title: string, duration?: number): void;
        static showImage(image: string, duration?: number): void;
        /**
         * 显示loading提示层
         * @param  title
         * @param  mask 是否显示透明蒙层，也就是避免用户点击
         */
        static showLoading(title?: string, mask?: boolean): void;
        static hideLoading(): void;
        static showModal(title?: string, content?: string, confirmText?: string, confirmCallback?: any, cancelText?: string, cancelCallback?: any): void;
    }

    class PayManager {
        static offerId: string;
        static env: number;
        static platform: string;
        static pay(buyQuantity: number, success: Function, fail: Function): void;
    }

    interface AuthParams {
        scope: string;
        success: Function;
        fail: Function;
        alert: Function;
    }
    class AuthManager {
        static scope: {
            userInfo: string;
            userLocation: string;
            address: string;
            invoiceTitle: string;
            werun: string;
            record: string;
            writePhotosAlbum: string;
            camera: string;
        };
        /**
         *
         * @param scope 想要获取授权的标识，可以使用上面已经列举出来的权限
         * @param suc   授权成功回调
         * @param fail  授权失败回调
         * @param alert 当需要打开用户设置界面时，用于可以修改弹窗内容，方便用户确认操作
         */
        static auth(params: AuthParams): void;
    }

    enum PrizeType {
        Gold = 1,
        Money = 2
    }
    interface PrizeInfo {
        type: PrizeType;
        value: string;
    }

    enum ShareType {
        InviteFriend = 1,
        GroupPK = 2,
        GroupRank = 3
    }
    class Main extends Game {
        params: GameConfig;
        /**是否已登录 */
        isLogined: boolean;
        /**已经授权访问用户信息，只在登录之前有用，登录之后该值不再起作用 */
        isAuthed: boolean;
        /**当前游戏的ID */
        gameId: number;

        constructor(params: GameConfig);

        /**以下方法为子类重写 */
        /**初始化首屏界面 */
        initRootScene(launchOption: LaunchOption, isFirstLaunch: boolean): void;
        /**必要的初始化操作放在该方法中 */
        setupConfig()
        /**当游戏进入前台时触发 */
        onShow(res)
        /**当游戏进入后台时触发 */
        onHide(res)
        /**监听网络状态变化 */
        handleNetworkChange(isConnected: any, isWIFI: any): void;
    }

    class Loader {
        constructor();
        static load(url: any, caller: any, completion: any, p?: any): void;
    }

    class TimerService extends Laya.EventDispatcher {
        constructor(duration: any, interval?: number, up?: boolean);
        start(): void;
        stop(): void;
        update(): void;
        static START: string;
        static STOP: string;
        static TIMEOUT: string;
        static PROGRESS: string;
    }

    class LaunchScreenView extends Laya.View {
        static show(name: string, icon: string): void;
        static hide(): void;
    }

    class LoginMaskView extends Laya.View {
        static showInView(view: Laya.View): void;
        static hide(): void;
    }

    class RoundImageView extends Laya.Image {
    }

    enum RectCorner {
        RectCornerTopLeft = 1 << 0,
        RectCornerTopRight = 1 << 1,
        RectCornerBottomLeft = 1 << 2,
        RectCornerBottomRight = 1 << 3,
        RectCornerAllCorners = 15
    }
    class Utils {
        /**
        * 便捷生成图片数组，主要用于名称连续的图片
        * @param {用来组织图片的格式,用%i占位} format
        * @param {开始索引} start
        * @param {结束索引} end
        */
        static makeImagesWithFormat(format: any, start: any, end: any): Array<string>;
        static toQueryString(params: any): string;
        static makeGenderIcon(gender: any): string;
        static findUserByID(users: Array<any>, id: any): any;

        static makeRoundRectPath(width: number, height: number, r: number, corner: RectCorner): Array<any>
        static makeAllCornerRoundRectPath(w, h, r): Array<any>
        /**用于保留指定长度的字符串，其余用...表示,length=10 */
        static formatName(name: string, length?: number): string
        /**只用于显示用户头像 width=96*/
        static makeIcon(icon: string, width?: number): string
        /**用于完全拼接用户的头像地址 */
        static makeResourceURL(url: string): string
        /** 计算文字宽度 */
        static measureWidth(text: string): number
    }

    class BannerAd extends Laya.EventDispatcher {
        /**广告加载事件名称 */
        static LOAD
        /**广告错误事件名称 */
        static ERROR
        /**
         * 
         * @param params 
         * {
         *     adUnitId //可选，如果为空，则取Main中传入的adUnitId
         *     qqViewId //可选，如果为空，则取Main中传入的qqViewId，默认为1002
         *     style    //广告样式
         * }
         */
        constructor(params)
        /**显示单个广告 */
        show()
        /**隐藏单个广告 */
        hide()
        /**销毁指定广告 */
        destroy()
        /**
         * 
         * @param params 
         * {
         *      onLoad   //广告加载成功时调用
         *      onError  //广告加载失败时调用
         *      ...其余参数请参考BannerAd构造方法中的参数
         * }
         */
        static show(params):BannerAd
        /**隐藏指定广告 */
        static hide(bannerAd)
        /**销毁指定广告 */
        static destroy(bannerAd)
    }
    class RewardedVideoAd extends Laya.EventDispatcher {
        /**广告加载事件名称 */
        static LOAD
        /**广告错误事件名称 */
        static ERROR
        /**广告关闭事件名称 */
        static CLOSE

        constructor(params?:any)
        /**
         * 
         * @param params 
         * {
         *      onLoad   //广告加载成功时调用
         *      onError  //广告加载失败时调用
         *      onClose  //广告关闭时调用
         * }
         */
        static show(params)
    }
}
