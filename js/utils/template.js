/**
 * @fileoverview 模板替换
 * @author Random | http://weibo.com/random
 * @date 2013-05-18
 */
 
define("utils/template", function(require){
	
	return function(template, data){
		var i;
		
		return template.replace(/#\{(.+?)\}/ig, function(){
			var key = arguments[1].replace(/\s/ig, '');
			var ret = arguments[0];
			var list = key.split('||');
			for (i = 0, len = list.length; i < len; i += 1) {
				if (/^default:.*$/.test(list[i])) {
					ret = list[i].replace(/^default:/, '');
					break;
				}
				else 
					if (data[list[i]] !== undefined) {
						ret = data[list[i]];
						break;
					}
			}
			return ret;
		});
	};
}); 