export default class RankView extends PaoYa.View {
    onAwake(){
        this.configListView()
        if (PaoYa.game.params.rankingType == PaoYa.RankingType.WIN){
            this.btnLeft.label = '胜\n局\n榜'
        }else{
            this.btnLeft.label = '高\n分\n榜'
        }
    }
    configListView(){
        let listView = this.listView
        var horizontalPages = PaoYa.game.params.horizontalPages;
        if (horizontalPages && horizontalPages.length > 0) {
            Laya.timer.callLater(this, function(){
                listView._scrollBar.isVertical=false;
            })
        }
        listView.graphics.drawRect(0,0,listView.width,listView.height,"#ffffff")
        listView.vScrollBarSkin = ""
        listView.renderHandler =  Laya.Handler.create(this,function(cell,index){
            let item = listView.array[index]
            cell.setItem(item)
            if (index == 0) {
                cell.lblRank.color = "#ff7e00";
                cell.lblRank.bold = true;
            } else if (index == 1 || index == 2){
                cell.lblRank.color = "#404040";
                cell.lblRank.bold = true;
            } else {
                cell.lblRank.color = "#7c7c7c";
                cell.lblRank.bold = false;
            }
        },null,false)
    }
    reloadData(list){
        this.listView.repeatY = list.length > 5 ? 5:list.length
        this.listView.array = list
        this.listView.refresh()
    }
    reloadMyRankViewData(data){
        this.myRankView.setItem(data)
    }
    changeBtnHandler(index){
        if(index == 0){
            this.btnLeft.selected = true
            this.listView.visible = true
            this.myRankView.visible = true
        } else {
            this.btnLeft.selected = false
            this.listView.visible = false
            this.myRankView.visible = false
        }
        this.btnRight.selected = !this.btnLeft.selected
    }
}