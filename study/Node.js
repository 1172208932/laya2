/**
*<code>Node</code> 类是可放在显示列表中的所有对象的基类。该显示列表管理 Laya 运行时中显示的所有对象。使用 Node 类排列显示列表中的显示对象。Node 对象可以有子显示对象。
*/
//class laya.display.Node extends laya.events.EventDispatcher
var Node=(function(_super){
	function Node(){
		/**@private */
		this._bits=0;
		/**@private 父节点对象*/
		this._parent=null;
		/**节点名称。*/
		this.name="";
		/**[只读]是否已经销毁。对象销毁后不能再使用。*/
		this.destroyed=false;
		/**@private */
		this._conchData=null;
		/**@private */
		this._components=null;
		/**@private */
		this._scene=null;
		Node.__super.call(this);
		this._children=Node.ARRAY_EMPTY;
		this.createGLBuffer();
	}

	__class(Node,'laya.display.Node',_super);
	var __proto=Node.prototype;
	/**@private */
	__proto.createGLBuffer=function(){}
	/**@private */
	__proto._setBit=function(type,value){
		if (type===/*laya.Const.DISPLAY*/0x10){
			var preValue=this._getBit(type);
			if (preValue !=value)this._updateDisplayedInstage();
		}
		if (value)this._bits |=type;
		else this._bits &=~type;
	}

	/**@private */
	__proto._getBit=function(type){
		return (this._bits & type)!=0;
	}

	/**@private */
	__proto._setUpNoticeChain=function(){
		if (this._getBit(/*laya.Const.DISPLAY*/0x10))this._setBitUp(/*laya.Const.DISPLAY*/0x10);
	}

	/**@private */
	__proto._setBitUp=function(type){
		var ele=this;
		ele._setBit(type,true);
		ele=ele._parent;
		while (ele){
			if (ele._getBit(type))return;
			ele._setBit(type,true);
			ele=ele._parent;
		}
	}

	/**
	*<p>增加事件侦听器，以使侦听器能够接收事件通知。</p>
	*<p>如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。</p>
	*@param type 事件的类型。
	*@param caller 事件侦听函数的执行域。
	*@param listener 事件侦听函数。
	*@param args （可选）事件侦听函数的回调参数。
	*@return 此 EventDispatcher 对象。
	*/
	__proto.on=function(type,caller,listener,args){
		if (type===/*laya.events.Event.DISPLAY*/"display" || type===/*laya.events.Event.UNDISPLAY*/"undisplay"){
			if (!this._getBit(/*laya.Const.DISPLAY*/0x10))this._setBitUp(/*laya.Const.DISPLAY*/0x10);
		}
		return this._createListener(type,caller,listener,args,false);
	}

	/**
	*<p>增加事件侦听器，以使侦听器能够接收事件通知，此侦听事件响应一次后则自动移除侦听。</p>
	*<p>如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。</p>
	*@param type 事件的类型。
	*@param caller 事件侦听函数的执行域。
	*@param listener 事件侦听函数。
	*@param args （可选）事件侦听函数的回调参数。
	*@return 此 EventDispatcher 对象。
	*/
	__proto.once=function(type,caller,listener,args){
		if (type===/*laya.events.Event.DISPLAY*/"display" || type===/*laya.events.Event.UNDISPLAY*/"undisplay"){
			if (!this._getBit(/*laya.Const.DISPLAY*/0x10))this._setBitUp(/*laya.Const.DISPLAY*/0x10);
		}
		return this._createListener(type,caller,listener,args,true);
	}

	/**
	*<p>销毁此对象。destroy对象默认会把自己从父节点移除，并且清理自身引用关系，等待js自动垃圾回收机制回收。destroy后不能再使用。</p>
	*<p>destroy时会移除自身的事情监听，自身的timer监听，移除子对象及从父节点移除自己。</p>
	*@param destroyChild （可选）是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
	*/
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this.destroyed=true;
		this._destroyAllComponent();
		this._parent && this._parent.removeChild(this);
		if (this._children){
			if (destroyChild)this.destroyChildren();
			else this.removeChildren();
		}
		this.onDestroy();
		this._children=null;
		this.offAll();
	}

	/**
	*销毁时执行
	*此方法为虚方法，使用时重写覆盖即可
	*/
	__proto.onDestroy=function(){}
	/**
	*销毁所有子对象，不销毁自己本身。
	*/
	__proto.destroyChildren=function(){
		if (this._children){
			for (var i=0,n=this._children.length;i < n;i++){
				this._children[0].destroy(true);
			}
		}
	}

	/**
	*添加子节点。
	*@param node 节点对象
	*@return 返回添加的节点
	*/
	__proto.addChild=function(node){
		if (!node || this.destroyed || node===this)return node;
		if ((node)._zOrder)this._setBit(/*laya.Const.HAS_ZORDER*/0x20,true);
		if (node._parent===this){
			var index=this.getChildIndex(node);
			if (index!==this._children.length-1){
				this._children.splice(index,1);
				this._children.push(node);
				this._childChanged();
			}
			}else {
			node._parent && node._parent.removeChild(node);
			this._children===Node.ARRAY_EMPTY && (this._children=[]);
			this._children.push(node);
			node._setParent(this);
			this._childChanged();
		}
		return node;
	}

	/**
	*批量增加子节点
	*@param ...args 无数子节点。
	*/
	__proto.addChildren=function(__args){
		var args=arguments;
		var i=0,n=args.length;
		while (i < n){
			this.addChild(args[i++]);
		}
	}

	/**
	*添加子节点到指定的索引位置。
	*@param node 节点对象。
	*@param index 索引位置。
	*@return 返回添加的节点。
	*/
	__proto.addChildAt=function(node,index){
		if (!node || this.destroyed || node===this)return node;
		if ((node)._zOrder)this._setBit(/*laya.Const.HAS_ZORDER*/0x20,true);
		if (index >=0 && index <=this._children.length){
			if (node._parent===this){
				var oldIndex=this.getChildIndex(node);
				this._children.splice(oldIndex,1);
				this._children.splice(index,0,node);
				this._childChanged();
				}else {
				node._parent && node._parent.removeChild(node);
				this._children===Node.ARRAY_EMPTY && (this._children=[]);
				this._children.splice(index,0,node);
				node._setParent(this);
			}
			return node;
			}else {
			throw new Error("appendChildAt:The index is out of bounds");
		}
	}

	/**
	*根据子节点对象，获取子节点的索引位置。
	*@param node 子节点。
	*@return 子节点所在的索引位置。
	*/
	__proto.getChildIndex=function(node){
		return this._children.indexOf(node);
	}

	/**
	*根据子节点的名字，获取子节点对象。
	*@param name 子节点的名字。
	*@return 节点对象。
	*/
	__proto.getChildByName=function(name){
		var nodes=this._children;
		if (nodes){
			for (var i=0,n=nodes.length;i < n;i++){
				var node=nodes[i];
				if (node.name===name)return node;
			}
		}
		return null;
	}

	/**
	*根据子节点的索引位置，获取子节点对象。
	*@param index 索引位置
	*@return 子节点
	*/
	__proto.getChildAt=function(index){
		return this._children[index] || null;
	}

	/**
	*设置子节点的索引位置。
	*@param node 子节点。
	*@param index 新的索引。
	*@return 返回子节点本身。
	*/
	__proto.setChildIndex=function(node,index){
		var childs=this._children;
		if (index < 0 || index >=childs.length){
			throw new Error("setChildIndex:The index is out of bounds.");
		};
		var oldIndex=this.getChildIndex(node);
		if (oldIndex < 0)throw new Error("setChildIndex:node is must child of this object.");
		childs.splice(oldIndex,1);
		childs.splice(index,0,node);
		this._childChanged();
		return node;
	}

	/**
	*子节点发生改变。
	*@private
	*@param child 子节点。
	*/
	__proto._childChanged=function(child){}
	/**
	*删除子节点。
	*@param node 子节点
	*@return 被删除的节点
	*/
	__proto.removeChild=function(node){
		if (!this._children)return node;
		var index=this._children.indexOf(node);
		return this.removeChildAt(index);
	}

	/**
	*从父容器删除自己，如已经被删除不会抛出异常。
	*@return 当前节点（ Node ）对象。
	*/
	__proto.removeSelf=function(){
		this._parent && this._parent.removeChild(this);
		return this;
	}

	/**
	*根据子节点名字删除对应的子节点对象，如果找不到不会抛出异常。
	*@param name 对象名字。
	*@return 查找到的节点（ Node ）对象。
	*/
	__proto.removeChildByName=function(name){
		var node=this.getChildByName(name);
		node && this.removeChild(node);
		return node;
	}

	/**
	*根据子节点索引位置，删除对应的子节点对象。
	*@param index 节点索引位置。
	*@return 被删除的节点。
	*/
	__proto.removeChildAt=function(index){
		var node=this.getChildAt(index);
		if (node){
			this._children.splice(index,1);
			node._setParent(null);
		}
		return node;
	}

	/**
	*删除指定索引区间的所有子对象。
	*@param beginIndex 开始索引。
	*@param endIndex 结束索引。
	*@return 当前节点对象。
	*/
	__proto.removeChildren=function(beginIndex,endIndex){
		(beginIndex===void 0)&& (beginIndex=0);
		(endIndex===void 0)&& (endIndex=0x7fffffff);
		if (this._children && this._children.length > 0){
			var childs=this._children;
			if (beginIndex===0 && endIndex >=childs.length-1){
				var arr=childs;
				this._children=Node.ARRAY_EMPTY;
				}else {
				arr=childs.splice(beginIndex,endIndex-beginIndex);
			}
			for (var i=0,n=arr.length;i < n;i++){
				arr[i]._setParent(null);
			}
		}
		return this;
	}

	/**
	*替换子节点。
	*@internal 将传入的新节点对象替换到已有子节点索引位置处。
	*@param newNode 新节点。
	*@param oldNode 老节点。
	*@return 返回新节点。
	*/
	__proto.replaceChild=function(newNode,oldNode){
		var index=this._children.indexOf(oldNode);
		if (index >-1){
			this._children.splice(index,1,newNode);
			oldNode._setParent(null);
			newNode._setParent(this);
			return newNode;
		}
		return null;
	}

	/**@private */
	__proto._setParent=function(value){
		if (this._parent!==value){
			if (value){
				this._parent=value;
				this._onAdded();
				this.event(/*laya.events.Event.ADDED*/"added");
				if (this._getBit(/*laya.Const.DISPLAY*/0x10)){
					this._setUpNoticeChain();
					value.displayedInStage && this._displayChild(this,true);
				}
				value._childChanged(this);
				}else {
				this._onRemoved();
				this.event(/*laya.events.Event.REMOVED*/"removed");
				this._parent._childChanged();
				if (this._getBit(/*laya.Const.DISPLAY*/0x10))this._displayChild(this,false);
				this._parent=value;
			}
		}
	}

	/**@private */
	__proto._updateDisplayedInstage=function(){
		var ele;
		ele=this;
		var stage=Laya.stage;
		var displayedInStage=false;
		while (ele){
			if (ele._getBit(/*laya.Const.DISPLAY*/0x10)){
				displayedInStage=ele._getBit(/*laya.Const.DISPLAYED_INSTAGE*/0x80);
				break ;
			}
			if (ele===stage || ele._getBit(/*laya.Const.DISPLAYED_INSTAGE*/0x80)){
				displayedInStage=true;
				break ;
			}
			ele=ele._parent;
		}
		this._setBit(/*laya.Const.DISPLAYED_INSTAGE*/0x80,displayedInStage);
	}

	/**@private */
	__proto._setDisplay=function(value){
		if (this._getBit(/*laya.Const.DISPLAYED_INSTAGE*/0x80)!==value){
			this._setBit(/*laya.Const.DISPLAYED_INSTAGE*/0x80,value);
			if (value)this.event(/*laya.events.Event.DISPLAY*/"display");
			else this.event(/*laya.events.Event.UNDISPLAY*/"undisplay");
		}
	}

	/**
	*设置指定节点对象是否可见(是否在渲染列表中)。
	*@private
	*@param node 节点。
	*@param display 是否可见。
	*/
	__proto._displayChild=function(node,display){
		var childs=node._children;
		if (childs){
			for (var i=0,n=childs.length;i < n;i++){
				var child=childs[i];
				if (!child._getBit(/*laya.Const.DISPLAY*/0x10))continue ;
				if (child._children.length > 0){
					this._displayChild(child,display);
					}else {
					child._setDisplay(display);
				}
			}
		}
		node._setDisplay(display);
	}

	/**
	*当前容器是否包含指定的 <code>Node</code> 节点对象 。
	*@param node 指定的 <code>Node</code> 节点对象 。
	*@return 一个布尔值表示是否包含指定的 <code>Node</code> 节点对象 。
	*/
	__proto.contains=function(node){
		if (node===this)return true;
		while (node){
			if (node._parent===this)return true;
			node=node._parent;
		}
		return false;
	}

	/**
	*定时重复执行某函数。功能同Laya.timer.timerLoop()。
	*@param delay 间隔时间(单位毫秒)。
	*@param caller 执行域(this)。
	*@param method 结束时的回调方法。
	*@param args （可选）回调参数。
	*@param coverBefore （可选）是否覆盖之前的延迟执行，默认为true。
	*@param jumpFrame 时钟是否跳帧。基于时间的循环回调，单位时间间隔内，如能执行多次回调，出于性能考虑，引擎默认只执行一次，设置jumpFrame=true后，则回调会连续执行多次
	*/
	__proto.timerLoop=function(delay,caller,method,args,coverBefore,jumpFrame){
		(coverBefore===void 0)&& (coverBefore=true);
		(jumpFrame===void 0)&& (jumpFrame=false);
		var timer=this.scene ? this.scene.timer :Laya.timer;
		timer.loop(delay,caller,method,args,coverBefore,jumpFrame);
	}

	/**
	*定时执行某函数一次。功能同Laya.timer.timerOnce()。
	*@param delay 延迟时间(单位毫秒)。
	*@param caller 执行域(this)。
	*@param method 结束时的回调方法。
	*@param args （可选）回调参数。
	*@param coverBefore （可选）是否覆盖之前的延迟执行，默认为true。
	*/
	__proto.timerOnce=function(delay,caller,method,args,coverBefore){
		(coverBefore===void 0)&& (coverBefore=true);
		var timer=this.scene ? this.scene.timer :Laya.timer;
		timer._create(false,false,delay,caller,method,args,coverBefore);
	}

	/**
	*定时重复执行某函数(基于帧率)。功能同Laya.timer.frameLoop()。
	*@param delay 间隔几帧(单位为帧)。
	*@param caller 执行域(this)。
	*@param method 结束时的回调方法。
	*@param args （可选）回调参数。
	*@param coverBefore （可选）是否覆盖之前的延迟执行，默认为true。
	*/
	__proto.frameLoop=function(delay,caller,method,args,coverBefore){
		(coverBefore===void 0)&& (coverBefore=true);
		var timer=this.scene ? this.scene.timer :Laya.timer;
		timer._create(true,true,delay,caller,method,args,coverBefore);
	}

	/**
	*定时执行一次某函数(基于帧率)。功能同Laya.timer.frameOnce()。
	*@param delay 延迟几帧(单位为帧)。
	*@param caller 执行域(this)
	*@param method 结束时的回调方法
	*@param args （可选）回调参数
	*@param coverBefore （可选）是否覆盖之前的延迟执行，默认为true
	*/
	__proto.frameOnce=function(delay,caller,method,args,coverBefore){
		(coverBefore===void 0)&& (coverBefore=true);
		var timer=this.scene ? this.scene.timer :Laya.timer;
		timer._create(true,false,delay,caller,method,args,coverBefore);
	}

	/**
	*清理定时器。功能同Laya.timer.clearTimer()。
	*@param caller 执行域(this)。
	*@param method 结束时的回调方法。
	*/
	__proto.clearTimer=function(caller,method){
		var timer=this.scene ? this.scene.timer :Laya.timer;
		timer.clear(caller,method);
	}

	/**
	*<p>延迟运行指定的函数。</p>
	*<p>在控件被显示在屏幕之前调用，一般用于延迟计算数据。</p>
	*@param method 要执行的函数的名称。例如，functionName。
	*@param args 传递给 <code>method</code> 函数的可选参数列表。
	*
	*@see #runCallLater()
	*/
	__proto.callLater=function(method,args){
		var timer=this.scene ? this.scene.timer :Laya.timer;
		timer.callLater(this,method,args);
	}

	/**
	*<p>如果有需要延迟调用的函数（通过 <code>callLater</code> 函数设置），则立即执行延迟调用函数。</p>
	*@param method 要执行的函数名称。例如，functionName。
	*@see #callLater()
	*/
	__proto.runCallLater=function(method){
		var timer=this.scene ? this.scene.timer :Laya.timer;
		timer.runCallLater(this,method);
	}

	/**
	*@private
	*/
	__proto._onActive=function(){}
	/**
	*@private
	*/
	__proto._onInActive=function(){}
	/**
	*@private
	*/
	__proto._onActiveInScene=function(){}
	/**
	*@private
	*/
	__proto._onInActiveInScene=function(){}
	/**
	*@private
	*/
	__proto._parse=function(data){}
	/**
	*@private
	*/
	__proto._setBelongScene=function(scene){
		if (!this._scene){
			this._scene=scene;
			if (this._components){
				for (var i=0,n=this._components.length;i < n;i++)
				this._components[i]._setActiveInScene(true);
			}
			this._onActiveInScene();
			for (i=0,n=this._children.length;i < n;i++)
			this._children[i]._setBelongScene(scene);
		}
	}

	/**
	*@private
	*/
	__proto._setUnBelongScene=function(){
		if (this._scene!==this){
			this._onInActiveInScene();
			if (this._components){
				for (var i=0,n=this._components.length;i < n;i++)
				this._components[i]._setActiveInScene(false);
			}
			this._scene=null;
			for (i=0,n=this._children.length;i < n;i++)
			this._children[i]._setUnBelongScene();
		}
	}

	/**
	*@private
	*/
	__proto._activeHierarchy=function(){
		this._setBit(/*laya.Const.ACTIVE_INHIERARCHY*/0x02,true);
		if (this._components){
			for (var i=0,n=this._components.length;i < n;i++)
			this._components[i]._setActive(true);
		}
		this._onActive();
		for (i=0,n=this._children.length;i < n;i++){
			var child=this._children[i];
			(!child._getBit(/*laya.Const.NOT_ACTIVE*/0x01))&& (child._activeHierarchy());
		}
		if (!this._getBit(/*laya.Const.AWAKED*/0x04)){
			this._setBit(/*laya.Const.AWAKED*/0x04,true);
			this.onAwake();
		}
		this.onEnable();
	}

	/**
	*组件被激活后执行，此时所有节点和组件均已创建完毕，次方法只执行一次
	*此方法为虚方法，使用时重写覆盖即可
	*/
	__proto.onAwake=function(){}
	/**
	*组件被启用后执行，比如节点被添加到舞台后
	*此方法为虚方法，使用时重写覆盖即可
	*/
	__proto.onEnable=function(){}
	/**
	*@private
	*/
	__proto._inActiveHierarchy=function(){
		this._onInActive();
		if (this._components){
			for (var i=0,n=this._components.length;i < n;i++)
			this._components[i]._setActive(false);
		}
		this._setBit(/*laya.Const.ACTIVE_INHIERARCHY*/0x02,false);
		for (i=0,n=this._children.length;i < n;i++){
			var child=this._children[i];
			(!child._getBit(/*laya.Const.NOT_ACTIVE*/0x01))&& (child._inActiveHierarchy());
		}
		this.onDisable();
	}

	/**
	*组件被禁用时执行，比如从节点从舞台移除后
	*此方法为虚方法，使用时重写覆盖即可
	*/
	__proto.onDisable=function(){}
	/**
	*@private
	*/
	__proto._onAdded=function(){
		var parentScene=this._parent.scene;
		parentScene && this._setBelongScene(parentScene);
		(this._parent.activeInHierarchy && this.active)&& this._activeHierarchy();
	}

	/**
	*@private
	*/
	__proto._onRemoved=function(){
		(this._parent.activeInHierarchy && this.active)&& this._inActiveHierarchy();
		this._parent.scene && this._setUnBelongScene();
	}

	/**
	*@private
	*/
	__proto._addComponentInstance=function(comp){this._components=this._components|| [];
		this._components.push(comp);
		comp.owner=this;
		comp._onAdded();
		this.activeInHierarchy && comp._setActive(true);
		this._scene && comp._setActiveInScene(true);
	}

	/**
	*@private
	*/
	__proto._destroyComponent=function(comp){
		if (this._components){
			for (var i=0,n=this._components.length;i < n;i++){
				var item=this._components[i];
				if (item===comp){
					item._destroy();
					this._components.splice(i,1);
					break ;
				}
			}
		}
	}

	/**
	*@private
	*/
	__proto._destroyAllComponent=function(){
		if (this._components){
			for (var i=0,n=this._components.length;i < n;i++){
				var item=this._components[i];
				item._destroy();
			}
			this._components.length=0;
		}
	}

	/**
	*@private 克隆。
	*@param destObject 克隆源。
	*/
	__proto._cloneTo=function(destObject){
		var destNode=destObject;
		if (this._components){
			for (var i=0,n=this._components.length;i < n;i++){
				var destComponent=destNode.addComponent(this._components[i].constructor);
				this._components[i]._cloneTo(destComponent);
			}
		}
	}

	/**
	*添加组件实例。
	*@param comp 组件实例。
	*@return 组件。
	*/
	__proto.addComponentIntance=function(comp){
		if (comp.owner)
			throw "Node:the component has belong to other node.";
		if (comp.isSingleton && this.getComponent((comp).constructor))
			throw "Node:the component is singleton,can't add the second one.";
		this._addComponentInstance(comp);
		return comp;
	}

	/**
	*添加组件。
	*@param type 组件类型。
	*@return 组件。
	*/
	__proto.addComponent=function(type){
		var comp=Pool.createByClass(type);
		comp._destroyed=false;
		if (comp.isSingleton && this.getComponent(type))
			throw "无法实例"+type+"组件"+"，"+type+"组件已存在！";
		this._addComponentInstance(comp);
		return comp;
	}

	/**
	*获得组件实例，如果没有则返回为null
	*@param clas 组建类型
	*@return 返回组件
	*/
	__proto.getComponent=function(clas){
		if (this._components){
			for (var i=0,n=this._components.length;i < n;i++){
				var comp=this._components[i];
				if (Laya.__typeof(comp,clas))
					return comp;
			}
		}
		return null;
	}

	/**
	*获得组件实例，如果没有则返回为null
	*@param clas 组建类型
	*@return 返回组件数组
	*/
	__proto.getComponents=function(clas){
		var arr;
		if (this._components){
			for (var i=0,n=this._components.length;i < n;i++){
				var comp=this._components[i];
				if (Laya.__typeof(comp,clas)){arr=arr|| [];
					arr.push(comp);
				}
			}
		}
		return arr;
	}

	/**
	*子对象数量。
	*/
	__getset(0,__proto,'numChildren',function(){
		return this._children.length;
	});

	/**父节点。*/
	__getset(0,__proto,'parent',function(){
		return this._parent;
	});

	/**
	*获取在场景中是否激活。
	*@return 在场景中是否激活。
	*/
	__getset(0,__proto,'activeInHierarchy',function(){
		return this._getBit(/*laya.Const.ACTIVE_INHIERARCHY*/0x02);
	});

	/**
	*设置是否激活。
	*@param value 是否激活。
	*/
	/**
	*获取自身是否激活。
	*@return 自身是否激活。
	*/
	__getset(0,__proto,'active',function(){
		return !this._getBit(/*laya.Const.NOT_READY*/0x08)&& !this._getBit(/*laya.Const.NOT_ACTIVE*/0x01);
		},function(value){
		value=! !value;
		if (!this._getBit(/*laya.Const.NOT_ACTIVE*/0x01)!==value){
			this._setBit(/*laya.Const.NOT_ACTIVE*/0x01,!value);
			if (this._parent){
				if (this._parent.activeInHierarchy){
					if (value)this._activeHierarchy();
					else this._inActiveHierarchy();
				}
			}
		}
	});

	/**表示是否在显示列表中显示。*/
	__getset(0,__proto,'displayedInStage',function(){
		if (this._getBit(/*laya.Const.DISPLAY*/0x10))return this._getBit(/*laya.Const.DISPLAYED_INSTAGE*/0x80);
		this._setBitUp(/*laya.Const.DISPLAY*/0x10);
		return this._getBit(/*laya.Const.DISPLAYED_INSTAGE*/0x80);
	});

	/**
	*获得所属场景。
	*@return 场景。
	*/
	__getset(0,__proto,'scene',function(){
		return this._scene;
	});

	/**
	*@private
	*获取timer
	*/
	__getset(0,__proto,'timer',function(){
		return this.scene ? this.scene.timer :Laya.timer;
	});

	Node.ARRAY_EMPTY=[];
	return Node;
})(EventDispatcher)