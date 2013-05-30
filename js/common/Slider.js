/**
 * @fileoverview Slider
 * @author Random | http://weibo.com/random
 * @date 2013-05-22
 */
 
define("common/Slider",[
	"common/List",
	"common/Player",
	"common/Switch",
	"utils/CustEvent"

],function(require){
	var List=require("common/List");
	var Player=require("common/Player");
	var Switch=require("common/Switch");
	var CustEvent=require("utils/CustEvent");
	
	var EVENT_CHANGE="change";
	
	return function(view, model, opts){
		var data=model.getData();
		var list=List(data);
		var player;
		var swt=Switch();
		var custEvent=CustEvent();
		
		!opts && (opts={});
		player = Player(opts.step);
		view.render(data);
		
		
		player.on("step",function(){
			swt.next();
		});
		
		swt.on("change",function(index){
			if(index===data.length){
				swt.go(0);
			}else{
				custEvent.fire(EVENT_CHANGE, index);
				view.update(index);
			}
		});
		
		return {
			play : function(){
				player.play();
			},
			
			stop : function(){
				player.stop();
			},
			
			next : function(){
				swt.next();
			},
			
			prev : function(){
				swt.prev();
			},
			
			go : function(index){
				swt.go(index);
			},
			
			on : function(type, handle){
				custEvent.add(type, handle);
			},
			
			off : function(type, handle){
				custEvent.remove(type, handle);
			},
			
			destroy : function(){
				player.destroy();
				swt.destroy();
			}
		};
	};
}); 