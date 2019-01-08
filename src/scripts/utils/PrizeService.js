export default class PrizeShowView extends Laya.HBox {
    constructor(prizes) {
        super()
        this.prizes = prizes;
        if (prizes.length) {
            this.init();
        }
    }
    init() {
        this.align = Laya.HBox.MIDDLE;
        this.prizes.forEach((prize, index) => {
            var view = new PrizeView(prize);
            view.x = index;
            this.addChild(view);
        });
        if (this.prizes.length == 1) {
            this.space = 0;
        }
        else {
            this.space = 80;
        }
        this.centerX = 0;
    }
}
class PrizeView extends Laya.VBox {
    constructor(prizes) {
        super()
        this.prize = prizes;
        this.init();
    }
    init() {
        this.align = Laya.VBox.CENTER;
        var image = new Laya.Image();
        image.skin = this.prize.type == PaoYa.PrizeType.Gold ? "local/common/icon-bean-ladder.png" : "local/common/icon-hb-ladder.png";
        image.y = -1;
        this.addChild(image);
        var label = new Laya.Label();
        label.color = "#ffffff";
        label.bold = true;
        label.fontSize = 35;
        label.italic = true;
        label.stroke = 5;
        label.strokeColor = "#3ecbff";
        label.text = "X" + this.prize.value;
        this.addChild(label);
    }
}
