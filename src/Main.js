import GameConfig from "./GameConfig";
import Utils from "./scripts/utils/utils";
import config from './Config'
import GameMain from "./scripts/common/GameMain";
export class Main extends GameMain {
	constructor() {
		var params = {
			gameId: 1004,
			// baseURL: "https://wxapi.xingqiu123.com/ServiceCore/",
			baseURL: "http://47.96.1.255:8080/ServiceCore/",
			zone: "susliks",
			showStat: true,
			showDebugTool: true,
			userId: 159278,
			offerId: "1450014295",
			version: config.version,
			rankingType: PaoYa.RankingType.Score,
			release: config.release,
			bannerUnitId: 'adunit-3ba53115d9b84cc1',
			loadNetworkRes: false
		};
		super(params)
	}
	setupConfig() {
		super.setupConfig()
		PaoYa.DataCenter.isNew = this.gameId >= 1020;
		//分享地址
		PaoYa.ShareManager.imageURL = "https://res.xingqiu123.com/whacamole/share_icon.png";

		PaoYa.DataCenter.GAMEPREPARE = null
	}
	/**此处返回游戏需要提前加载的资源，必须返回一个数组 */
	setupGameRes() {
		let list = []
		// /**添加必要网络资源 */
		// ['wxgame/ladder/win_lose.sk',
		// 	'wxgame/ladder/win_lose.png',
		// 	'wxgame/service/jian_tou.sk',
		// 	'wxgame/service/jian_tou.png'
		// ].forEach(url => {
		// 	list.push(`${PaoYa.DataCenter.CDNURL}${url}`)
		// })
		return list
	}
	onShareAppMessage() {
		return {
			title: PaoYa.DataCenter.config.game.share_list.randomItem,
			imageUrl: PaoYa.ShareManager.imageURL,
			query: ""
		}
	}
}
//激活启动类
new Main();
