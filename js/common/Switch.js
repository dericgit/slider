/**
 * @fileoverview Switch
 * @author Random | http://weibo.com/random
 * @date 2013-05-22
 */
 
define("common/Switch",[
	"utils/CustEvent"

],function(require){
	var CustEvent=require("utils/CustEvent");
	var EVENT_CHANGE="change";
	
	return function(){
		var custEvent=CustEvent();
		var index=0;
		
		return {
			
			next : function(){
				index++;
				custEvent.fire(EVENT_CHANGE, index);
			},
			
			prev : function(){
				index--;
				custEvent.fire(EVENT_CHANGE, index);
			},
			
			go : function(n){
				!isNaN(n) && (index=n);
				custEvent.fire(EVENT_CHANGE, index);
			},
			
			on : function(type, handle){
				custEvent.add(type, handle);
			},
			
			off : function(type, handle){
				custEvent.remove(type, handle);
			},
			
			destroy : function(){
				custEvent.destroy();
			}
		};
	};
}); 