/**
 * @fileoverview SimpleSlider
 * @author Random | http://weibo.com/random
 * @date 2013-05-22
 */
 
define("general/slider/SimpleSlider",[
	"general/slider/View",
	"general/slider/Model",
	"common/Slider",
	"utils/paramToJson"
	
],function(require){
	var View=require("general/slider/View");
	var Model=require("general/slider/Model");
	var Slider=require("common/Slider");
	var paramToJson=require("utils/paramToJson");
	
	var CLZ_CURRENT="pic-current";
	
	/**
	 * slzNode
	 * opts:{
	 * 		step {Number}
	 * 		view {View}
	 * 		model {Model}
	 * 	}
	 */
	return function(slzNode, opts){
		var view;
		var model;
		var viewBox;
		var buttons;
		var currentIndex;
		var slider;

		function buttonSwitch(){
			var attr=$(this).attr("node-data");
			var data=paramToJson(attr);
			var idx=data.index;
			
			if(!isNaN(idx) && !view.isUpdating() && idx!=currentIndex){
				slider.go(idx);
				slider.stop();
				slider.play();
			}
		}
		
		function renderButton(index, preIndex){
			buttons && buttons[preIndex] && (buttons[preIndex].className="");
			buttons && buttons[index] && (buttons[index].className=CLZ_CURRENT);
		}
		
		function sliderChange(index){
			currentIndex=index;
		}
		
		function pend(){
			view.off("update",renderButton);
			slider.off("change", sliderChange);
			viewBox && viewBox.off("click", '[node-type="switchButton"]', buttonSwitch);
			slider.stop();
			view.pend();
		}
		
		function restore(){
			view.on("update",renderButton);
			slider.on("change", sliderChange);
			viewBox && viewBox.on("click", '[node-type="switchButton"]', buttonSwitch);
			slider.play();
			view.restore();
		}
		
		function init(){
			opts = opts || {};
			view = opts.view || View();
			model = opts.model || Model();
			
			slider=Slider(view, model, {
				step: opts.step || 2000
			});
			
			viewBox=view.getBox();
			viewBox && (buttons=$('[node-type="switchButton"]', viewBox));
			viewBox && viewBox[0] && slzNode[0].appendChild(viewBox[0]);
			restore();
		}
		
		init();
		
		return {
			
			play:slider.play,
			
			stop:slider.stop,
			
			pend:pend,
			
			restore:restore,
			
			destroy : function(){
				pend();
				slzNode.remove(viewBox);
				slider.destroy();
				view.destroy();
			}
		};
	};
}); 