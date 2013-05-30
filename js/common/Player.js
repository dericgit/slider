/**
 * @fileoverview Player
 * @author Random | http://weibo.com/random
 * @date 2013-05-22
 */
 
define("common/Player",[
	"utils/CustEvent"
	
],function(require){
	var CustEvent=require("utils/CustEvent");
	var EVENT_STEP="step";
	var EVENT_STOP="stop";
	
	return function(step){
		var custEvent=CustEvent();
		var itvID;
		var isPlaying=false;
		
		isNaN(step) && (step = 1000);
		
		function playing(){
			custEvent.fire(EVENT_STEP);
		}
		
		function stop(){
			window.clearInterval(itvID);
			isPlaying=false;
			custEvent.fire(EVENT_STOP);
		}
		
		return {
			play : function(){
				if(isPlaying){
					return;
				}
				
				isPlaying=true;
				itvID=window.setInterval(playing, step);
			},
			
			stop : stop,
			
			on : function(type, handle){
				custEvent.add(type, handle);
			},
			
			off : function(type, handle){
				custEvent.remove(type, handle);
			},
			
			destroy : function(){
				stop();
				custEvent.destroy();
			}
		};
	};
}); 