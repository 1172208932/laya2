export default class MoneyBalance extends PaoYa.Component {
    onAwake() {
        PaoYa.DataCenter.rmb.addObserver(this, this.handleRmbChange)
    }
    handleRmbChange(value) {
        this.owner.text = value + ''
    }
    onDestroy() {
        PaoYa.DataCenter.rmb.removeObserver(this, this.handleRmbChange)
    }
}