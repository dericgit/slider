/**
 * @fileoverview slider
 * @author Random | http://weibo.com/random
 * @date 2013-05-22
 */
 
define("template/slider",function(require){
	return {

		"simple" : {
			"box" : '<div style="border:1px solid;overflow:hidden;width:642px;height:380px;">'+
			'             <div node-type="sliderBar" style="position:relative;width:4000px">'+
			'               #{list}'+
			'             </div>'+
			'             <div class="pic-tab">'+
			'                  <input type="button" node-type="switchButton" node-data="index=0" class="pic-current"/>'+
			'                  <input type="button" node-type="switchButton" node-data="index=1">'+
			'                  <input type="button" node-type="switchButton" node-data="index=2"/>'+
			'                  <input type="button" node-type="switchButton" node-data="index=3">'+
			'                  <input type="button" node-type="switchButton" node-data="index=4"/>'+
			'             </div>'+
			'         </div>',
			
			"list" : '<div style="display:inline-block;">'+
			'                  <img src="#{src}" width="642" height="327" alt="#{alt}" title="#{title}"/>'+
			'         </div>'
		}
	}
}); 