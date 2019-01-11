import IntegralMallControl from "./IntegralMallControl";

export default class IntegralMallView extends PaoYa.View {
    onAwake() {
        this.listMall.array = []
        this.control = this.getComponent(IntegralMallControl)
        this.integralRedBg.backgroundColor = '#E95555'
        this.integralBg.backgroundColor = '#2F3F57'
        this.configListView()
    }
    configListView() {
        var _this = this
        this.listMall.vScrollBarSkin = '';
        this.listMall.selectEnable = true;
        this.listMall.selectHandler = new Laya.Handler(this, onSelect, [this.listMall]);
        function onSelect(list, e, index) {
            console.log(list,e,index)
                if (index == 0) {
                    _this.control.changeMonet()
                } else {
                    _this.control.skipExchangeGiftDialog()
                }
            
        }
    }
    reloadData(list) {
        this.listMall.array = list;
        this.listMall.refresh()
    }
}