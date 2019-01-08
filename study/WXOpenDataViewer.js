/**
*微信开放数据展示组件，直接实例本组件，即可根据组件宽高，位置，以最优的方式显示开放域数据
*/
//class laya.ui.WXOpenDataViewer extends laya.ui.UIComponent
var WXOpenDataViewer = (function (_super) {
    function WXOpenDataViewer() {
        this._$4__texture = null;
        WXOpenDataViewer.__super.call(this);
        this._width = this._height = 200;
        var tex = new Texture();
        if (Laya["Texture2D"]) {
            tex.bitmap = new Laya["Texture2D"]();
            this.texture = tex;
        } else {
            throw new Error("WXOpenDataViewer:webgl not found!");
        }
    }

    __class(WXOpenDataViewer, 'laya.ui.WXOpenDataViewer', _super);
    var __proto = WXOpenDataViewer.prototype;
    __proto.onEnable = function () {
        this.postMsg({ type: "display", rate: Laya.stage.frameRate });
        if (window.wx && window.sharedCanvas) Laya.timer.frameLoop(1, this, this._onLoop);
    }

    __proto.onDisable = function () {
        this.postMsg({ type: "undisplay" });
        Laya.timer.clear(this, this._onLoop);
    }

    __proto._onLoop = function () {
        this.texture.bitmap.loadImageSource(window.sharedCanvas);
    }

    __proto._postMsg = function () {
        var mat = new Matrix();
        mat.translate(this.x, this.y);
        var stage = Laya.stage;
        mat.scale(stage._canvasTransform.getScaleX() * this.globalScaleX * stage.transform.getScaleX(), stage._canvasTransform.getScaleY() * this.globalScaleY * stage.transform.getScaleY());
        this.postMsg({ type: "changeMatrix", a: mat.a, b: mat.b, c: mat.c, d: mat.d, tx: mat.tx, ty: mat.ty, w: this.width, h: this.height });
    }

    /**向开放数据域发送消息*/
    __proto.postMsg = function (msg) {
        if (window.wx) {
            var openDataContext = window.wx.getOpenDataContext();
            openDataContext.postMessage(msg);
        }
    }

    __getset(0, __proto, 'x', _super.prototype._$get_x, function (value) {
        Laya.superSet(UIComponent, this, 'x', value);
        this.callLater(this._postMsg);
    });

    __getset(0, __proto, 'width', _super.prototype._$get_width, function (value) {
        Laya.superSet(UIComponent, this, 'width', value);
        if (window.sharedCanvas) window.sharedCanvas.width = value;
        this.callLater(this._postMsg);
    });

    __getset(0, __proto, 'height', _super.prototype._$get_height, function (value) {
        Laya.superSet(UIComponent, this, 'height', value);
        if (window.sharedCanvas) window.sharedCanvas.height = value;
        this.callLater(this._postMsg);
    });

    __getset(0, __proto, 'y', _super.prototype._$get_y, function (value) {
        Laya.superSet(UIComponent, this, 'y', value);
        this.callLater(this._postMsg);
    });

    return WXOpenDataViewer;
})(UIComponent)