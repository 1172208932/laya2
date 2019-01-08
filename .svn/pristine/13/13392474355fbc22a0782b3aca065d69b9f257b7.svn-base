/**
*@private 场景辅助类
*/
//class laya.utils.SceneUtils
var SceneUtils=(function(){
	var DataWatcher,InitTool;
	function SceneUtils(){}
	__class(SceneUtils,'laya.utils.SceneUtils');
	SceneUtils.getBindFun=function(value){
		var fun=SceneUtils._funMap.get(value);
		if (fun==null){
			var temp="\""+value+"\"";
			temp=temp.replace(/^"\${|}"$/g,"").replace(/\${/g,"\"+").replace(/}/g,"+\"");
			var str="(function(data){if(data==null)return;with(data){try{\nreturn "+temp+"\n}catch(e){}}})";
			fun=Laya._runScript(str);
			SceneUtils._funMap.set(value,fun);
		}
		return fun;
	}

	SceneUtils.createByData=function(root,uiView){
		var tInitTool=InitTool.create();
		root=SceneUtils.createComp(uiView,root,root,null,tInitTool);
		root._setBit(/*laya.Const.NOT_READY*/0x08,true);
		if (root.hasOwnProperty("_idMap")){
			root["_idMap"]=tInitTool._idMap;
		}
		if (uiView.animations){
			var anilist=[];
			var animations=uiView.animations;
			var i=0,len=animations.length;
			var tAni;
			var tAniO;
			for (i=0;i < len;i++){
				tAni=new FrameAnimation();
				tAniO=animations[i];
				tAni._setUp(tInitTool._idMap,tAniO);
				root[tAniO.name]=tAni;
				tAni._setControlNode(root);
				switch (tAniO.action){
					case 1:
						tAni.play(0,false);
						break ;
					case 2:
						tAni.play(0,true);
						break ;
					}
				anilist.push(tAni);
			}
			root._aniList=anilist;
		}
		if (root._$componentType==="Scene" && root._width > 0 && uiView.props.hitTestPrior==null && !root.mouseThrough)
			root.hitTestPrior=true;
		tInitTool.beginLoad(root);
		return root;
	}

	SceneUtils.createInitTool=function(){
		return InitTool.create();
	}

	SceneUtils.createComp=function(uiView,comp,view,dataMap,initTool){
		if (uiView.type=="Scene3D"||uiView.type=="Sprite3D"){
			var outBatchSprits=[];
			var scene3D=Laya["Utils3D"]._createSceneByJsonForMaker(uiView,outBatchSprits,initTool);
			if (uiView.type=="Sprite3D")
				Laya["StaticBatchManager"].combine(scene3D,outBatchSprits);
			else
			Laya["StaticBatchManager"].combine(null,outBatchSprits);
			return scene3D;
		}
		comp=comp || SceneUtils.getCompInstance(uiView);
		if (!comp){
			if (uiView.props && uiView.props.runtime)
				console.warn("runtime not found:"+uiView.props.runtime);
			else
			console.warn("can not create:"+uiView.type);
			return null;
		};
		var child=uiView.child;
		if (child){
			var isList=comp["_$componentType"]=="List";
			for (var i=0,n=child.length;i < n;i++){
				var node=child[i];
				if (comp.hasOwnProperty("itemRender")&& (node.props.name=="render" || node.props.renderType==="render")){
					comp["itemRender"]=node;
					}else if (node.type=="Graphic"){
					ClassUtils._addGraphicsToSprite(node,comp);
					}else if (ClassUtils._isDrawType(node.type)){
					ClassUtils._addGraphicToSprite(node,comp,true);
					}else {
					if (isList){
						var arr=[];
						var tChild=SceneUtils.createComp(node,null,view,arr,initTool);
						if (arr.length)
							tChild["_$bindData"]=arr;
						}else {
						tChild=SceneUtils.createComp(node,null,view,dataMap,initTool);
					}
					if (node.type=="Script"){
						if ((tChild instanceof laya.components.Component )){
							comp._addComponentInstance(tChild);
							}else {
							if ("owner" in tChild){
								tChild["owner"]=comp;
								}else if ("target" in tChild){
								tChild["target"]=comp;
							}
						}
						}else if (node.props.renderType=="mask" || node.props.name=="mask"){
						comp.mask=tChild;
						}else {(
						tChild instanceof laya.display.Node )&& comp.addChild(tChild);
					}
				}
			}
		};
		var props=uiView.props;
		for (var prop in props){
			var value=props[prop];
			if ((typeof value=='string')&& (value.indexOf("@node:")>=0 || value.indexOf("@Prefab:")>=0)){
				if (initTool){
					initTool.addNodeRef(comp,prop,value);
				}
			}else
			SceneUtils.setCompValue(comp,prop,value,view,dataMap);
		}
		if (comp._afterInited){
			comp._afterInited();
		}
		if (uiView.compId && initTool && initTool._idMap){
			initTool._idMap[uiView.compId]=comp;
		}
		return comp;
	}

	SceneUtils.setCompValue=function(comp,prop,value,view,dataMap){
		if ((typeof value=='string')&& value.indexOf("${")>-1){
			SceneUtils._sheet || (SceneUtils._sheet=ClassUtils.getClass("laya.data.Table"));
			if (!SceneUtils._sheet){
				console.warn("Can not find class Sheet");
				return;
			}
			if (dataMap){
				dataMap.push(comp,prop,value);
				}else if (view){
				if (value.indexOf("].")==-1){
					value=value.replace(".","[0].");
				};
				var watcher=new DataWatcher(comp,prop,value);
				watcher.exe(view);
				var one,temp;
				var str=value.replace(/\[.*?\]\./g,".");
				while ((one=SceneUtils._parseWatchData.exec(str))!=null){
					var key1=one[1];
					while ((temp=SceneUtils._parseKeyWord.exec(key1))!=null){
						var key2=temp[0];
						var arr=(view._watchMap[key2] || (view._watchMap[key2]=[]));
						arr.push(watcher);
						SceneUtils._sheet.I.notifer.on(key2,view,view.changeData,[key2]);
					}
					arr=(view._watchMap[key1] || (view._watchMap[key1]=[]));
					arr.push(watcher);
					SceneUtils._sheet.I.notifer.on(key1,view,view.changeData,[key1]);
				}
			}
			return;
		}
		if (prop==="var" && view){
			view[value]=comp;
			}else {
			comp[prop]=(value==="true" ? true :(value==="false" ? false :value));
		}
	}

	SceneUtils.getCompInstance=function(json){
		if (json.type=="UIView"){
			if (json.props && json.props.pageData){
				return SceneUtils.createByData(null,json.props.pageData);
			}
		};
		var runtime=(json.props && json.props.runtime)|| json.type;
		var compClass=ClassUtils.getClass(runtime);
		if (!compClass)throw "Can not find class "+runtime;
		if (json.type==="Script" && compClass.prototype._doAwake){
			var comp=Pool.createByClass(compClass);
			comp._destroyed=false;
			return comp;
		}
		if (json.props && json.props.hasOwnProperty("renderType")&& json.props["renderType"]=="instance"){
			if (!compClass["instance"])compClass["instance"]=new compClass();
			return compClass["instance"];
		}
		return new compClass();
	}

	SceneUtils._sheet=null;
	__static(SceneUtils,
	['_funMap',function(){return this._funMap=new WeakObject();},'_parseWatchData',function(){return this._parseWatchData=/\${(.*?)}/g;},'_parseKeyWord',function(){return this._parseKeyWord=/[a-zA-Z_][a-zA-Z0-9_]*(?:(?:\.[a-zA-Z_][a-zA-Z0-9_]*)+)/g;}
	]);
	SceneUtils.__init$=function(){
		/**
		*@private 场景辅助类
		*/
		//class DataWatcher
		DataWatcher=(function(){
			function DataWatcher(comp,prop,value){
				this.comp=null;
				this.prop=null;
				this.value=null;
				this.comp=comp;
				this.prop=prop;
				this.value=value;
			}
			__class(DataWatcher,'');
			var __proto=DataWatcher.prototype;
			__proto.exe=function(view){
				var fun=SceneUtils.getBindFun(this.value);
				this.comp[this.prop]=fun.call(this,view);
			}
			return DataWatcher;
		})()
		/**
		*@private 场景辅助类
		*/
		//class InitTool
		InitTool=(function(){
			function InitTool(){
				/**@private */
				this._nodeRefList=null;
				/**@private */
				this._initList=null;
				this._loadList=null;
				/**@private */
				this._idMap=null;
				this._scene=null;
			}
			__class(InitTool,'');
			var __proto=InitTool.prototype;
			//TODO:coverage
			__proto.reset=function(){
				this._nodeRefList=null;
				this._initList=null;
				this._idMap=null;
				this._loadList=null;
				this._scene=null;
			}
			//TODO:coverage
			__proto.recover=function(){
				this.reset();
				Pool.recover("InitTool",this);
			}
			//TODO:coverage
			__proto.addLoadRes=function(url,type){
				if (!this._loadList)this._loadList=[];
				if (!type){
					this._loadList.push(url);
					}else {
					this._loadList.push({url:url,type:type});
				}
			}
			//TODO:coverage
			__proto.addNodeRef=function(node,prop,referStr){
				if (!this._nodeRefList)this._nodeRefList=[];
				this._nodeRefList.push([node,prop,referStr]);
				if (referStr.indexOf("@Prefab:")>=0){
					this.addLoadRes(referStr.replace("@Prefab:",""),/*laya.net.Loader.PREFAB*/"prefab");
				}
			}
			//TODO:coverage
			__proto.setNodeRef=function(){
				if (!this._nodeRefList)return;
				if (!this._idMap){
					this._nodeRefList=null;
					return;
				};
				var i=0,len=0;
				len=this._nodeRefList.length;
				var tRefInfo;
				for (i=0;i < len;i++){
					tRefInfo=this._nodeRefList[i];
					tRefInfo[0][tRefInfo[1]]=this.getReferData(tRefInfo[2]);
				}
				this._nodeRefList=null;
			}
			//TODO:coverage
			__proto.getReferData=function(referStr){
				if (referStr.indexOf("@Prefab:")>=0){
					var prefab;
					prefab=Loader.getRes(referStr.replace("@Prefab:",""));
					return prefab;
					}else if (referStr.indexOf("@arr:")>=0){
					referStr=referStr.replace("@arr:","");
					var list;
					list=referStr.split(",");
					var i=0,len=0;
					var tStr;
					len=list.length;
					for (i=0;i < len;i++){
						tStr=list[i];
						if (tStr){
							list[i]=this._idMap[tStr.replace("@node:","")];
							}else {
							list[i]=null;
						}
					}
					return list;
					}else {
					return this._idMap[referStr.replace("@node:","")];
				}
			}
			//TODO:coverage
			__proto.addInitItem=function(item){
				if (!this._initList)this._initList=[];
				this._initList.push(item);
			}
			//TODO:coverage
			__proto.doInits=function(){
				if (!this._initList)return;
				this._initList=null;
			}
			//TODO:coverage
			__proto.finish=function(){
				this.setNodeRef();
				this.doInits();
				this._scene._setBit(/*laya.Const.NOT_READY*/0x08,false);
				if (this._scene.parent && this._scene.parent.activeInHierarchy && this._scene.active)this._scene._activeHierarchy();
				this._scene.event("onViewCreated");
				this.recover();
			}
			//TODO:coverage
			__proto.beginLoad=function(scene){
				this._scene=scene;
				if (!this._loadList || this._loadList.length < 1){
					this.finish();
					}else {
					Laya.loader.load(this._loadList,Handler.create(this,this.finish));
				}
			}
			InitTool.create=function(){
				var tool=Pool.getItemByClass("InitTool",InitTool);
				tool._idMap=[];
				return tool;
			}
			return InitTool;
		})()
	}

	return SceneUtils;
})()