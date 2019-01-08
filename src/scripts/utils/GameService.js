import Service from '../../Service'
export default class GameService {

}
GameService.startGame = function (data) {
    Service.startGame(data)
}
GameService.stopGame = function (data) {
    switch (data.type) {
        case PaoYa.GameEntryType.Match:
            PaoYa.navigator.present('TurnTableView',data);
            break;
        case PaoYa.GameEntryType.Friend:
            PaoYa.navigator.push('GameResultView',data,"scenes/dialog/GameAgain.scene");
            break;
    }
}