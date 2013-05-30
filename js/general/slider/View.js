/**
 * @fileoverview View
 * @author Random | http://weibo.com/random
 * @date 2013-05-22
 */
 
define("general/slider/View",[
	"template/slider",
	"utils/template",
	"utils/CustEvent"

],function(require){
	var sliderTpl = require("template/slider");
	var template = require("utils/template");
	var CustEvent=require("utils/CustEvent");
	
	var TPL_BOX=sliderTpl.simple.box;
	var TPL_LIST=sliderTpl.simple.list;

	var EVT_ANI_END="transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";
	var EVT_UPDATE="update";
	
	return function(tplBox, tplList){
		var data=[];
		var box;
		var currentIndex=0;
		var width=642;
		var sliderBar;
		var isUpdating=false;
		var custEvent=CustEvent();
		
		function getHTML(){
			var listStr=[];
			var i;
			var l=data.length;
			var html;
			
			!tplBox && (tplBox=TPL_BOX);
			!tplList && (tplList=TPL_LIST);
				
			for(i=0;i<l;i++){
				listStr.push(template(tplList, {
					src : data[i].src,
					url : data[i].url,
					alt : data[i].alt,
					title : data[i].title
				}));
			}
			
			html=template(tplBox, {
				width : width*l,
				list : listStr.join("")
			});
			
			return html;
		}
		
		function aniEndHandler(){
			isUpdating=false;
		}

		return {
			
			render:function(d){
				data=d;
				box=$(getHTML());
				sliderBar=$('[node-type="sliderBar"]', box);
				sliderBar.on(EVT_ANI_END, aniEndHandler);
			},
			
			update : function(index){
				var v;
				if(isUpdating || index===currentIndex){
					return;
				}
				
				custEvent.fire(EVT_UPDATE, index, currentIndex);
				
				currentIndex=index;
				isUpdating=true;
				v=index * -width;	
				sliderBar.css("transition", "all 0.5s ease");
				sliderBar.css("transform", "translate("+v+"px)");
			},
			
			isUpdating:function(){
				return isUpdating;
			},
			
			getBox:function(){
				return box;
			},
			
			on : function(type, handle){
				custEvent.add(type, handle);
			},
			
			off : function(type, handle){
				custEvent.remove(type, handle);
			},
			
			pend : function(){
				sliderBar.off(EVT_ANI_END, aniEndHandler);
			},
			
			restore : function(){
				sliderBar.on(EVT_ANI_END, aniEndHandler);
			},
			
			destroy : function(){
				sliderBar.off(EVT_ANI_END, aniEndHandler);
				custEvent.destroy();
			}
		};
	};
}); 