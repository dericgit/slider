/**
 * @fileoverview main
 * @author Random | http://weibo.com/random
 * @date 2013-05-25
 */

define("page/main",[
	"general/slider/SimpleSlider"
	
],function(require){
	var SimpleSlider=require("general/slider/SimpleSlider");
	var ss=SimpleSlider($('#slider'));
}); 