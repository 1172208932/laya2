import MatchGradeService from "./MatchGradeService";
import Utils from "../../utils/utils";
export default class MatchGradeControl extends PaoYa.Component {
    constructor() { super(); }
    onAwake() {
        this.GET('get_match_type_count', function (res) {
            MatchGradeService.roundLimit = res.round_limit||0
        })

    }
    /**新增onLoad方法，专门用于处理界面问题 */
    onLoad(){
        if (PaoYa.DataCenter.comeFrom == "homeView") {
        	PaoYa.DataCenter.comeFrom = null
            MatchGradeService.startQuickMatch()
        }
    }
    onThrottleClick(e) {
        let name = e.target.name
        if (name.indexOf('box') > -1) {
            switch(name){
                case "box0":
                Utils.recordPoint('button015', 'click')
                break
                case "box1":
                Utils.recordPoint('button016', 'click')
                break
                case "box2":
                Utils.recordPoint('button017', 'click')
                break
            }
            let type = PaoYa.DataCenter.config.game.match_type[Number(name.substr(3,1))]
            MatchGradeService.checkIfMatch(type);
        } else if (name == 'quickMatch') {
            Utils.recordPoint('button018', 'click')
            MatchGradeService.startQuickMatch()
        }
    }
}