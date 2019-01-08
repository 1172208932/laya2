export default class Marquee extends PaoYa.Component {
    constructor() {
        super();
    }
    onAwake() {
        var _this = this;
        var marqueeView = new Laya.View();
        this.owner.addChild(marqueeView);
        marqueeView.size(750, 60);
        marqueeView.pos(0, 1274);
        this.marqueeView = marqueeView;
        this.index = 0;
        this.defaultX = 648;
        this.space = 560;
        this._createHorn();
        this._createBg();
        this._createMarqueeView();
        this._requestData(function (data) {
            _this.info = _this.spellToHtml(data);
            _this.addItem(1, _this.info[_this.index]);
            _this.play();
        })
    }
    onAppear() {
        if (this.isFirst) {
            this.play();
        }
        this.isFirst = true;

    }
    onDisappear() {
        this.stop();
    }
    onDisable() {

    }
    _requestData(cb) {
        //GET请求，接口：getHallRewardUser
        if(PaoYa.DataCenter.marqueeData){
            let data=PaoYa.DataCenter.marqueeData;
            cb && cb(data);
        }else{
            this.GET("getHallRewardUser", { type: "1,2,4,5,7,8" }, function (data) {
                if (!data.length) {
                    return;
                }
                PaoYa.DataCenter.marqueeData=data;
                cb && cb(data);
            });
        }      
    }
    _createHorn() {
        var horn = new Laya.Image();
        horn.zOrder = 2;
        horn.loadImage('local/common/horn.png');
        horn.pos(20, 0);
        this.marqueeView.addChild(horn);
    };
    _createBg() {
        var bg = new Laya.Sprite();
        bg.graphics.drawRect(0, 0, 750, 60, "#000000");
        bg.pos(0, 0);
        bg.width = 750;
        bg.height = 60;
        bg.alpha = 0.4;
        bg.zOrder = 1;
        this.marqueeView.addChild(bg);
    };
    _createMarqueeView() {
        this.hornBox = new Laya.Box();
        var _rectangle = new Laya.Rectangle(0, 0, this.defaultX, 60);
        this.hornBox.scrollRect = _rectangle;
        this.hornBox.height = 60;
        this.hornBox.pos(102, 0);
        this.hornBox.zOrder = 3;
        this.html = this._createHTMLDivElement();
        this.htmlT = this._createHTMLDivElement();
        this.hornBox.addChild(this.html);
        this.hornBox.addChild(this.htmlT);
        this.marqueeView.addChild(this.hornBox);

    }
    _createHTMLDivElement() {
        var html = new Laya.HTMLDivElement();
        html.x = this.defaultX;
        html.style.fontSize = 28;
        html.style.wordWrap = false;
        html.style.lineHeight = 60;
        html.style.align = "left";
        html.style.color = "#fff";
        html.sport = true;
        html.innerHTML = "";
        return html;
    }
    play() {
        Laya.timer.frameLoop(1, this, this._animate);
    };
    stop(type) {
        this.html.sport = true;
        this.html.x = this.defaultX;
        this.htmlT.sport = false;
        this.htmlT.x = this.defaultX;
        this.index = 0;
        Laya.timer.clear(this, this._animate);
    };
    spellToHtml(args) {
        var arr = [];
        var html = "";
        for (var i = 0; i < args.length; i++) {
            switch (args[i].type) {
                case 1:
                    html = "<span color='#87CEFF'>" + args[i].name + "</span><span color='#FFFFFF'>在" + args[i].gameName + "红包赛中获得</span>";
                    html += "<span color='#FFFF00'>" + args[i].award + "元红包奖励</span><span color='#FFFFFF'>!!!</span>";
                    arr.push(html);
                    break;
                case 2:
                    html = "<span color='#87CEFF'>" + args[i].name + "</span><span color='#FFFFFF'>在" + args[i].gameName + "红包赛中获得</span>";
                    html += "<span color='#FFFF00'>" + args[i].award + "元红包奖励</span><span color='#FFFFFF'>!!!</span>";
                    arr.push(html);
                    break;
                case 5:
                    /*   html = "<span color='#87CEFF'>" + args[i].name + "</span><span color='#FFFFFF'>用兑换券领取了</span>";
                      html += "<span color='#FF0000'>" + args[i].ladder_name + "</span><span color='#FFFFFF'>段位,获得</span>";
                      html += "<span color='#FFFF00'>丰厚的段位奖励</span><span color='#FFFFFF'>!!!</span>";
                      arr.push(html); */
                    break;
                case 7:
                    html = "<span color='#FFFFFF'>恭喜</span><span color='#87CEFF'>" + args[i].name + "</span><span color='#FFFFFF'>用兑换券领取了</span>";
                    html += "<span color='#FFFF00'>" + args[i].award + "元红包奖励</span><span color='#FFFFFF'>!!!</span>";
                    arr.push(html);
                    break;
                case 8:
                    var label = args[i].award_type == 1 ? "个豆子" : "元红包";
                    html = "<span color='#FFFFFF'>恭喜</span><span color='#87CEFF'>" + args[i].name + "</span><span color='#FFFFFF'>成功抽中了</span>";
                    html += "<span color='#FFFF00'>" + args[i].award + label + "</span><span color='#FFFFFF'>!!!</span>";
                    arr.push(html);
                    break;
            }
        }
        return arr;
    };
    _animate() {
        var _w = this.html.width;
        var _x = this.html.x;
        var w = this.htmlT.width;
        var x = this.htmlT.x;
        if (this.html.sport) {
            if (_x < -_w) {
                this.html.x = this.defaultX;
                this.html.sport = false;
                this.html._element.innerHTML = "";
            }
            else if (_x + _w < this.space) {
                if (!this.htmlT.sport) {
                    this.htmlT.sport = true;
                    if (this.index == this.info.length - 1) {
                        this.index = 0;
                    }
                    else {
                        this.index += 1;
                    }
                    this.addItem(2, this.info[this.index]);
                }
            }
            this.html.x -= 2;
        }
        if (this.htmlT.sport) {
            if (x < -w) {
                this.htmlT.x = this.defaultX;
                this.htmlT.sport = false;
                this.htmlT._element.innerHTML = "";
            }
            else if (x + w < this.space) {
                if (!this.html.sport) {
                    this.html.sport = true;
                    if (this.index == this.info.length - 1) {
                        this.index = 0;
                    }
                    else {
                        this.index += 1;
                    }
                    this.addItem(1, this.info[this.index]);
                }
            }
            this.htmlT.x -= 2;
        }
    };
    addItem(type, html) {
        if (type == 1) {
            this.html._element.appendHTML(html);
        }
        if (type == 2) {
            this.htmlT._element.appendHTML(html);
        }
    };
}