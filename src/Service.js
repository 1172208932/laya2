import GameService from "./scripts/utils/GameService";
import CommonAnimation from "./scripts/utils/CommonAnimation";
import ODCControl from "./scripts/common/RankService/ODCControl";

export default class Service {

}
/**
 * 
 * @param data 游戏开始时传入游戏的数据,具体数据类型请参考下面
 */
/**
{
    type: PaoYa.GameEntryType.Match,  //当前进入游戏的类型
    matchData: ...,                   //统一数据结构，具体数据可以参考matchSuccess
    gameData: ...                     //对于若干游戏会有多余数据，可在此获取
}
 */
Service.startGame = function (data) {
    if (data.type==undefined) {
        var params = {
            type: Service.type,
            matchData: Service.matchData,
            gameData: data
        }
        PaoYa.navigator.push("GameView", params);
    } else {
        Service.type = data.type;
        Service.matchData = data.matchData;
        PaoYa.navigator.push('GameView', data);
    }
}
/**
 * 
 * @param data 游戏结束时传出到外围的数据,endPk的数据
 */
Service.stopGame = function (data) {
    let userId = PaoYa.DataCenter.user.id;
    let result = -1;
    if (userId == data.win_userid || data.win_userid == 0) {
        result = 1;
    }
    //上传分数到微信服务器
    Service.updateScore(data)
    CommonAnimation.showResultAnimate(result, () => {
        let res = {
            type: Service.type,
            matchData: Service.matchData,
            result: data
        }
        GameService.stopGame(res)
    })
}

Service.updateScore = function (data) {
    /**高分榜 */
    // [{key:'score',value:100},{key:'detail',value:'100分'}]
    /**胜局榜 */
    // [{key:'score',value:100},{key:'detail',value:'胜100局'}]
    // ODCControl.set([{key:'score',value:100},{key:'detail',value:'100分'}])

    // var info = PaoYa.DataCenter.user.id == data.win_user.user_id ? data.win_user : data.lose_user;
    // var total_wins = info.total_wins;
    // ODCControl.set([{ key: 'score', value: total_wins }, { key: 'detail', value: '胜' + total_wins + '局' }]);
}