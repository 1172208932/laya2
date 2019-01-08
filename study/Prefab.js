/**
*模板，预制件
*/
//class laya.components.Prefab
var Prefab=(function(){
	function Prefab(){
		/**@private */
		this.json=null;
	}

	__class(Prefab,'laya.components.Prefab');
	var __proto=Prefab.prototype;
	/**
	*通过预制创建实例
	*/
	__proto.create=function(){
		if (this.json)return SceneUtils.createByData(null,this.json);
		return null;
	}

	return Prefab;
})()