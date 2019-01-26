export default class FBButton extends PaoYa.Component {
    onClick(){
        this.navigator.popToRootScene()
        this.navigator.push('FBView')
    }
}