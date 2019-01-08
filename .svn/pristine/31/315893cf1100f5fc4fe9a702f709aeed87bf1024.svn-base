/**
*场景类，负责场景创建，加载，销毁等功能
*场景被从节点移除后，并不会被自动垃圾机制回收，如果想回收，请调用destroy接口，可以通过unDestroyedScenes属性查看还未被销毁的场景列表
*/
//class laya.display.Scene extends laya.display.Sprite
var Scene = (function (_super) {
	function Scene() {
		/**场景被关闭后，是否自动销毁（销毁节点和使用到的资源），默认为false*/
		this.autoDestroyAtClosed = false;
		/**场景地址*/
		this.url = null;
		/**场景时钟*/
		this._timer = null;
		/**@private */
		this._viewCreated = false;
		/**@private */
		this._idMap = null;
		/**@private */
		this._$componentType = "Scene";
		Scene.__super.call(this);
		this._setBit(/*laya.Const.NOT_READY*/0x08, true);
		Scene.unDestroyedScenes.push(this);
		this._scene = this;
		this.createChildren();
	}

	__class(Scene, 'laya.display.Scene', _super);
	var __proto = Scene.prototype;
	/**
	*@private 兼容老项目
	*/
	__proto.createChildren = function () { }
	/**
	*@private 兼容老项目
	*装载场景视图。用于加载模式。
	*@param path 场景地址。
	*/
	__proto.loadScene = function (path) {
		var url = path.indexOf(".") > -1 ? path : path + ".scene";
		var view = Laya.loader.getRes(url);
		if (view) {
			this.createView(view);
		} else {
			Laya.loader.resetProgress();
			var loader = new SceneLoader();
			loader.on(/*laya.events.Event.COMPLETE*/"complete", this, this._onSceneLoaded, [url]);
			loader.load(url);
		}
	}

	//Laya.loader.load(url,Handler.create(this,createView),null,Loader.JSON);
	__proto._onSceneLoaded = function (url) {
		this.createView(Loader.getRes(url));
	}

	/**
	*@private 兼容老项目
	*通过视图数据创建视图。
	*@param uiView 视图数据信息。
	*/
	__proto.createView = function (view) {
		if (view && !this._viewCreated) {
			this._viewCreated = true;
			SceneUtils.createByData(this, view);
		}
	}

	/**
	*根据IDE内的节点id，获得节点实例
	*/
	__proto.getNodeByID = function (id) {
		if (this._idMap) return this._idMap[id];
		return null;
	}

	/**
	*打开场景。【注意】被关闭的场景，如果没有设置autoDestroyAtRemoved=true，则资源可能不能被回收，需要自己手动回收
	*@param closeOther 是否关闭其他场景，默认为true（可选）
	*@param param 打开页面的参数，会传递给onOpened方法（可选）
	*/
	__proto.open = function (closeOther, param) {
		(closeOther === void 0) && (closeOther = true);
		if (closeOther) Scene.closeAll();
		Scene.root.addChild(this.scene);
		this.onOpened(param);
	}

	/**场景打开完成后，调用此方法（如果有弹出动画，则在动画完成后执行）*/
	__proto.onOpened = function (param) { }
	/**
	*关闭场景
	*【注意】被关闭的场景，如果没有设置autoDestroyAtRemoved=true，则资源可能不能被回收，需要自己手动回收
	*@param type 关闭的原因，会传递给onClosed函数
	*/
	__proto.close = function (type) {
		if (this.autoDestroyAtClosed) this.destroy();
		else this.removeSelf();
		this.onClosed(type);
	}

	/**关闭完成后，调用此方法（如果有关闭动画，则在动画完成后执行）
	*@param type 如果是点击默认关闭按钮触发，则传入关闭按钮的名字(name)，否则为null。
	*/
	__proto.onClosed = function (type) {
	}

	/**@inheritDoc */
	__proto.destroy = function (destroyChild) {
		(destroyChild === void 0) && (destroyChild = true);
		this._idMap = null;
		_super.prototype.destroy.call(this, destroyChild);
		var list = laya.display.Scene.unDestroyedScenes;
		for (var i = 0, n = list.length; i < n; i++) {
			if (list[i] === this) {
				list.splice(i, 1);
				return;
			}
		}
	}

	/**@private */
	__proto._sizeChanged = function () {
		this.event(/*laya.events.Event.RESIZE*/"resize");
	}

	/**@inheritDoc */
	__getset(0, __proto, 'scaleX', _super.prototype._$get_scaleX, function (value) {
		if (Laya.superGet(Sprite, this, 'scaleX') == value) return;
		Laya.superSet(Sprite, this, 'scaleX', value);
		this.event(/*laya.events.Event.RESIZE*/"resize");
	});

	/**@inheritDoc */
	__getset(0, __proto, 'scaleY', _super.prototype._$get_scaleY, function (value) {
		if (Laya.superGet(Sprite, this, 'scaleY') == value) return;
		Laya.superSet(Sprite, this, 'scaleY', value);
		this.event(/*laya.events.Event.RESIZE*/"resize");
	});

	/**@inheritDoc */
	/**@inheritDoc */
	__getset(0, __proto, 'width', function () {
		if (this._width) return this._width;
		var max = 0;
		for (var i = this.numChildren - 1; i > -1; i--) {
			var comp = this.getChildAt(i);
			if (comp._visible) {
				max = Math.max(comp._x + comp.width * comp.scaleX, max);
			}
		}
		return max;
	}, function (value) {
		if (Laya.superGet(Sprite, this, 'width') == value) return;
		Laya.superSet(Sprite, this, 'width', value);
		this.callLater(this._sizeChanged);
	});

	/**场景时钟*/
	__getset(0, __proto, 'timer', function () {
		return this._timer || Laya.timer;
	}, function (value) {
		this._timer = value;
	});

	/**@inheritDoc */
	/**@inheritDoc */
	__getset(0, __proto, 'height', function () {
		if (this._height) return this._height;
		var max = 0;
		for (var i = this.numChildren - 1; i > -1; i--) {
			var comp = this.getChildAt(i);
			if (comp._visible) {
				max = Math.max(comp._y + comp.height * comp.scaleY, max);
			}
		}
		return max;
	}, function (value) {
		if (Laya.superGet(Sprite, this, 'height') == value) return;
		Laya.superSet(Sprite, this, 'height', value);
		this.callLater(this._sizeChanged);
	});

	/**获取场景根容器*/
	__getset(1, Scene, 'root', function () {
		if (!Scene._root) {
			Scene._root = Laya.stage.addChild(new Sprite());
			Scene._root.name = "root";
			Laya.stage.on("resize", null, resize);
			function resize() {
				Scene._root.size(Laya.stage.width, Laya.stage.height);
				Scene._root.event(/*laya.events.Event.RESIZE*/"resize");
			}
			resize();
		}
		return Scene._root;
	}, laya.display.Sprite._$SET_root);

	Scene.load = function (url, complete, progress) {
		Laya.loader.resetProgress();
		var loader = new SceneLoader();
		loader.on(/*laya.events.Event.PROGRESS*/"progress", null, onProgress);
		loader.once(/*laya.events.Event.COMPLETE*/"complete", null, create);
		loader.load(url);
		function onProgress(value) {
			if (Scene._loadPage) Scene._loadPage.event("progress", value);
			progress && progress.runWith(value);
		}
		function create() {
			loader.off(/*laya.events.Event.PROGRESS*/"progress", null, onProgress);
			var obj = Loader.getRes(url);
			if (!obj) throw "Can not find scene:" + url;
			if (!obj.props) throw "Scene data is error:" + url;
			var runtime = obj.props.runtime ? obj.props.runtime : obj.type;
			var clas = ClassUtils.getClass(runtime);
			if (obj.props.renderType == "instance") {
				var scene = clas.instance || (clas.instance = new clas());
			} else {
				scene = new clas();
			}
			if (scene && (scene instanceof laya.display.Node)) {
				scene.url = url;
				if (!scene._getBit(/*laya.Const.NOT_READY*/0x08)) {
					complete && complete.runWith(scene);
				} else {
					scene.on("onViewCreated", null, function () {
						complete && complete.runWith(scene)
					})
					scene.createView(obj);
				}
				Scene.hideLoadingPage();
			} else {
				throw "Can not find scene:" + runtime;
			}
		}
	}

	Scene.open = function (url, closeOther, param, complete, progress) {
		(closeOther === void 0) && (closeOther = true);
		if ((param instanceof laya.utils.Handler)) {
			var temp = complete;
			complete = param;
			param = temp;
		}
		Scene.showLoadingPage();
		Scene.load(url, Handler.create(null, this._onSceneLoaded, [closeOther, complete, param]), progress);
	}

	Scene._onSceneLoaded = function (closeOther, complete, param, scene) {
		scene.open(closeOther, param);
		if (complete) complete.runWith(scene);
	}

	Scene.close = function (url, name) {
		(name === void 0) && (name = "");
		var flag = false;
		var list = laya.display.Scene.unDestroyedScenes;
		for (var i = 0, n = list.length; i < n; i++) {
			var scene = list[i];
			if (scene.parent && scene.url === url && scene.name == name) {
				scene.close();
				flag = true;
			}
		}
		return flag;
	}

	Scene.closeAll = function () {
		var root = laya.display.Scene.root;
		for (var i = 0, n = root.numChildren; i < n; i++) {
			var scene = root.getChildAt(0);
			if ((scene instanceof laya.display.Scene)) scene.close();
		}
	}

	Scene.destroy = function (url, name) {
		(name === void 0) && (name = "");
		var flag = false;
		var list = laya.display.Scene.unDestroyedScenes;
		for (var i = 0, n = list.length; i < n; i++) {
			var scene = list[i];
			if (scene.url === url && scene.name == name) {
				scene.destroy();
				flag = true;
			}
		}
		return flag;
	}

	Scene.gc = function (group) {
		Resource.destroyUnusedResources(group);
	}

	Scene.setLoadingPage = function (loadPage) {
		if (Scene._loadPage != loadPage) {
			Scene._loadPage = loadPage;
		}
	}

	Scene.showLoadingPage = function (param, delay) {
		(delay === void 0) && (delay = 500);
		if (Scene._loadPage) {
			Laya.systemTimer.clear(null, Scene._showLoading);
			Laya.systemTimer.clear(null, Scene._hideLoading);
			Laya.systemTimer.once(delay, null, Scene._showLoading, [param], false);
		}
	}

	Scene._showLoading = function (param) {
		Laya.stage.addChild(Scene._loadPage);
		Scene._loadPage.onOpened(param);
	}

	Scene._hideLoading = function () {
		Scene._loadPage.close();
	}

	Scene.hideLoadingPage = function (delay) {
		(delay === void 0) && (delay = 500);
		if (Scene._loadPage) {
			Laya.systemTimer.clear(null, Scene._showLoading);
			Laya.systemTimer.clear(null, Scene._hideLoading);
			Laya.systemTimer.once(delay, null, Scene._hideLoading);
		}
	}

	Scene.unDestroyedScenes = [];
	Scene._root = null;
	Scene._loadPage = null;
	return Scene;
})(Sprite)