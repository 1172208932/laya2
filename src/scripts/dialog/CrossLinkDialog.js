import CrossLinkControl from "./CrossLinkControl";
import Utils from "../utils/utils";

export default class CrossLinkDialog extends PaoYa.Dialog {
    _onAdded() {
        this.list.array = [];
        super._onAdded()
    }
    //交叉跳转弹框
    onAwake() {
        /**弹窗关闭时自动销毁 */
        this.autoDestroyAtClosed = true
        if (typeof (this.params) != 'string' && this.params) {
            Laya.timer.once(2000, this, () => {
                this.btnMatch.visible = true
            })
        } else {
            this.addCloseBtn()
        }
        this.control = this.getComponent(CrossLinkControl)
        this.setListView()
    }
    addCloseBtn() {
        let btn = new Laya.Button('local/common/btn-yellow-close.png')
        btn.pos(657, 312)
        btn.name = Laya.Dialog.NO
        btn.stateNum = 1
        this.addChild(btn)
    }
    setListView() {
        this.list.mouseHandler = new Laya.Handler(this, onSelect, [this.list]);
        function onSelect(list, e, index) {
            if (e.type == Laya.Event.CLICK) {
                this.control.gameClick(this.list.array[index], index)
            }
        }
    }
    setListData(list) {
        this.list.array = list;
        this.list.refresh()
    }
    onDestroy() {
        Laya.timer.clearAll(this)
    }
    onDisable() {
        Laya.timer.clearAll(this)
    }
}