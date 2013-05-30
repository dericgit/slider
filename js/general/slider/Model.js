/**
 * @fileoverview Model
 * @author Random | http://weibo.com/random
 * @date 2013-05-22
 */
 
define("general/slider/Model",[
	"config/slider"

],function(require){
	
	var sliderData=require("config/slider");
	
	return function(){
		var data=sliderData.simple;
		
		return {
			getData : function(){
				return data;
			}
		};
	};
}); 