export default class RankComponent extends PaoYa.Component {
    onAwake() {
        this.sendResourceToODC()
    }
    /**向开放数据域发送资源 */
    sendResourceToODC() {
        if (!window.wx) return
        let urls = [
            'fileconfig.json',
            'scenes/prefab/RankCell.prefab',
            'scenes/prefab/RankMyCell.prefab',
            'scenes/common/Rank/ODCRankView.scene',
            'res/atlas/remote/rank.atlas'
        ]
        Laya.loader.load(urls, Laya.Handler.create(this, function (data) {
            urls.forEach(url => {
                if (url.indexOf('atlas') != -1){
                    Laya.MiniAdpter.sendAtlasToOpenDataContext(url)
                } else {
                    Laya.MiniAdpter.sendJsonDataToDataContext(url)
                }
            })
        }))
    }
}