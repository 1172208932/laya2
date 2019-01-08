import LoadingView from "./Loading/LoadingView";
import config from "../../Config";

export default class GameMain extends PaoYa.Main {

	setupOthers() {
		if (window.wx) {
			var fundebug = loadLib('./libs/fundebug.0.4.0.min.js')
			fundebug.init({
				apikey: "07c7c275d630fdb661b6c24852946b3b9b9e307e9624e8c747a4adf560e7028b",
				silent: config.debug,
				setSystemInfo: true,
				silentHttp: true,
				metaData: {
					gameId: this.params.gameId,
					platform: (window.wx) ? "wx" : "qq"
				}
			})
		}
	}

	setupConfig() {
		let resList = [];
		/**添加必要网络资源 */
		['wxgame/ladder/win_lose.sk',
			'wxgame/ladder/win_lose.png',
			'wxgame/service/jian_tou.sk',
			'wxgame/service/jian_tou.png'
		].forEach(url => {
			resList.push(`${PaoYa.DataCenter.CDNURL}${url}`)
		})

		/**加载必要首屏界面资源 */
		let scenes = [
			'res/atlas/local/common.atlas',
			'res/atlas/local/home.atlas',
			'scenes/HomeView.scene',
			'scenes/common/InviteFriend/IFMemberView.scene'
		]
		resList = resList.concat(scenes)
		/**加载游戏界面所需资源 */
		resList = resList.concat(this.setupGameRes())

		PaoYa.DataCenter.GAMERES = resList
	}

	setupLoadingView(cb) {
		Laya.Scene.load('scenes/common/Loading/LoadWaitingView.scene', Laya.Handler.create(this, function (scene) {
			PaoYa.Navigator.adjustViewPosition(scene)
			Laya.Scene.setLoadingPage(scene)
			Laya.AtlasInfoManager.enable('fileconfig.json', Laya.Handler.create(this, cb))
		}))
	}

	initRootScene(launchInfo, isFirstLaunch) {
		if (launchInfo && launchInfo.referrerInfo && launchInfo.referrerInfo.extraData && launchInfo.referrerInfo.extraData.to) {
			this.jumpRootScene(launchInfo)
		} else {
			if (isFirstLaunch) {
				this.navigator.push("HomeView", {}, null, Laya.Handler.create(this, () => {
					this.goToScene(launchInfo)
				}));
			} else {
				this.goToScene(launchInfo)
			}
		}
	}
	goToScene(launchInfo) {
		if (!launchInfo || !launchInfo.query || !launchInfo.query.type) {
			return
		}
		let query = launchInfo.query
		let scene = this.navigator.visibleScene
		switch (parseInt(query.type)) {
			case PaoYa.ShareType.InviteFriend:
				if (scene.sceneName != "IFHostView" || scene.sceneName != "IFMemberView") {
					this.navigator.push("IFMemberView", { id: query.id, rname: query.rname })
				} else {
					let alert = new AlertDialog({
						title: "提示",
						message: "您已经在游戏房间,不能加入其他房间!"
					})
					alert.popup()
				}
				break;
			case PaoYa.ShareType.GroupRank:
				if (launchInfo.shareTicket) {
					if (scene.sceneName != "RankGroupView") {
						this.navigator.push("RankGroupView", { shareTicket: launchInfo.shareTicket })
					}
				}
				break
		}
	}

	jumpRootScene(launchInfo) {
		PaoYa.DataCenter.isFromMiniProgram = true
		let extraData = launchInfo.referrerInfo.extraData
		let sceneId = extraData.to
		let params = extraData.p
		switch (sceneId) {
			case 1002:
				let type = PaoYa.DataCenter.config.game.match_type.filter((item) => {
					return item.id == params.matchTypeId
				})
				MatchGradeService.startMatch(type)
				break
			case 2003:
				console.log("5元红包报名")
				break
			case 2005:
				console.log("人满开赛")
				break
			//天梯匹配加载页
			case 4001:
				this.navigator.push('IFHostView')
				break
			case 10001:
				this.navigator.push('QTRoomView', { rname: params.rname })
				break
		}
	}
	onHide(res) {
		if (res && res.mode != undefined && res.targetAction != undefined && !(res.mode == "hide" && res.targetAction == 8)) {
			this.socket.sendMessage(PaoYa.Client.LEAVE_ROOM, {})
			Laya.Dialog.manager.closeAll()
			this.navigator.popToRootScene()
		}
	}
}