/**
 * @fileoverview List
 * @author Random | http://weibo.com/random
 * @date 2013-05-22
 */
 
define("common/List", function(require){
	
	return function(data){
		var list=data || [];
		
		return {
			add : function(item){
				list.push(item);
			},
			
			remove : function(index){
				list.splice(index,1);
			},
			
			insert : function(item){
				list.splice(index, 0, item);
			},
			
			clear : function(){
				list=[];
			},
			
			getData:function(){
				return data;
			}
			
		};
	};
}); 