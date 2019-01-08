export default class RankCell extends Laya.Box {
    onAwake(){
        this.imgIcon = this.getChildByName('imgIcon')
        this.lblRank = this.getChildByName('lblRank')
        this.lblName = this.getChildByName('lblName')
        this.lblCount = this.getChildByName('lblCount')
    }
    setItem(item){
        this.lblRank.text = item.rank
        this.imgIcon.skin = item.icon
        this.lblName.text = item.name
        this.lblCount.text = item.des
    }
}