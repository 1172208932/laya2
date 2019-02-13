import Service from '../../Service'
import Utils from './utils';
export default class GameService {

}
GameService.startGame = function (data) {
    Utils.recordPoint('button020', 'click')
    Service.startGame(data)
}
GameService.stopGame = function (data) {
    switch (data.type) {
        case PaoYa.GameEntryType.Match:
            if (PaoYa.navigator.visibleScene.url.indexOf('GameView') >= 0) {
                PaoYa.navigator.present('TurnTableView', data);
            } else {
                console.warn(`GameService | stopGame | 当前界面并不是游戏界面，所以不再显示转盘`)
            }
            break;
        case PaoYa.GameEntryType.Friend:
            if (PaoYa.navigator.visibleScene.url.indexOf('GameView') >= 0) {
                PaoYa.navigator.pop();
                let view = PaoYa.navigator.findSceneByName('FBView')
                view.stopGame(data)
            } else {
                console.warn(`GameService | stopGame | 当前界面并不是游戏界面，所以不再显示转盘`)
            }
            break;
    }
}