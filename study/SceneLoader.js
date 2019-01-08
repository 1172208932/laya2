/**
*@private
*场景资源加载器
*/
//class laya.net.SceneLoader extends laya.events.EventDispatcher
var SceneLoader = (function (_super) {
	function SceneLoader() {
		this.totalCount = 0;
		this._completeHandler = null;
		this._toLoadList = null;
		this._isLoading = false;
		this._curUrl = null;
		SceneLoader.__super.call(this);
		this._completeHandler = new Handler(this, this.onOneLoadComplete);
		this.reset();
	}

	__class(SceneLoader, 'laya.net.SceneLoader', _super);
	var __proto = SceneLoader.prototype;
	__proto.reset = function () {
		this._toLoadList = [];
		this._isLoading = false;
		this.totalCount = 0;
	}

	__proto.load = function (url, is3D, ifCheck) {
		(is3D === void 0) && (is3D = false);
		(ifCheck === void 0) && (ifCheck = true);
		if ((url instanceof Array)) {
			var i = 0, len = 0;
			len = url.length;
			for (i = 0; i < len; i++) {
				this._addToLoadList(url[i], is3D);
			}
		} else {
			this._addToLoadList(url, is3D);
		}
		if (ifCheck)
			this._checkNext();
	}

	__proto._addToLoadList = function (url, is3D) {
		(is3D === void 0) && (is3D = false);
		if (this._toLoadList.indexOf(url) >= 0) return;
		if (Loader.getRes(url)) return;
		if (is3D) {
			this._toLoadList.push({ url: url });
		} else
			this._toLoadList.push(url);
		this.totalCount++;
	}

	__proto._checkNext = function () {
		if (!this._isLoading) {
			if (this._toLoadList.length == 0) {
				this.event(/*laya.events.Event.COMPLETE*/"complete");
				return;
			};
			var tItem;
			tItem = this._toLoadList.pop();
			if ((typeof tItem == 'string')) {
				this.loadOne(tItem);
			} else {
				this.loadOne(tItem.url, true);
			}
		}
	}

	__proto.loadOne = function (url, is3D) {
		(is3D === void 0) && (is3D = false);
		this._curUrl = url;
		var type = Utils.getFileExtension(this._curUrl);
		if (is3D) {
			Laya.loader.create(url, this._completeHandler);
		} else
			if (SceneLoader.LoadableExtensions[type]) {
				Laya.loader.load(url, this._completeHandler, null, SceneLoader.LoadableExtensions[type]);
			} else if (url != AtlasInfoManager.getFileLoadPath(url) || SceneLoader.No3dLoadTypes[type] || !LoaderManager.createMap[type]) {
				Laya.loader.load(url, this._completeHandler);
			} else {
				Laya.loader.create(url, this._completeHandler);
			}
	}

	__proto.onOneLoadComplete = function () {
		this._isLoading = false;
		if (!Loader.getRes(this._curUrl)) {
		};
		var type = Utils.getFileExtension(this._curUrl);
		if (SceneLoader.LoadableExtensions[type]) {
			var dataO;
			dataO = Loader.getRes(this._curUrl);
			if (dataO && ((dataO instanceof laya.components.Prefab))) {
				dataO = dataO.json;
			}
			if (dataO) {
				if (dataO.loadList) {
					this.load(dataO.loadList, false, false);
				}
				if (dataO.loadList3D) {
					this.load(dataO.loadList3D, true, false);
				}
			}
		}
		this.event(/*laya.events.Event.PROGRESS*/"progress", this.getProgress());
		this._checkNext();
	}

	__proto.getProgress = function () {
		return this.loadedCount / this.totalCount;
	}

	__getset(0, __proto, 'loadedCount', function () {
		return this.totalCount - this.leftCount;
	});

	__getset(0, __proto, 'leftCount', function () {
		if (this._isLoading) return this._toLoadList.length + 1;
		return this._toLoadList.length;
	});

	__static(SceneLoader,
		['LoadableExtensions', function () { return this.LoadableExtensions = { "scene":/*laya.net.Loader.JSON*/"json", "scene3d":/*laya.net.Loader.JSON*/"json", "ani":/*laya.net.Loader.JSON*/"json", "ui":/*laya.net.Loader.JSON*/"json", "prefab":/*laya.net.Loader.PREFAB*/"prefab" }; }, 'No3dLoadTypes', function () { return this.No3dLoadTypes = { "png": true, "jpg": true, "txt": true }; }
		]);
	return SceneLoader;
})(EventDispatcher)