/**
 * @fileoverview 将查询参数格式的数据转化为json对象
 * @author Random | http://weibo.com/random
 * @date 2013-05-12
 * @example
 * 		var obj=paramToJson("a=1&b=2") //obj={a:1,b:2}
 */
 
define("utils/paramToJson",[
	"utils/trim"
],function(require){
	
	return function(qs, isDecode){
		var trim=require("utils/trim");
		var i;
        var qlist = trim(qs).split("&");
        var json  = {};
        var fData = function(data){
            if(isDecode){
                return decodeURIComponent(data);
            }else{
                return data;
            }
        };
        
        for(i = 0, len = qlist.length; i < len; i++){
            if(qlist[i]){
                var hsh = qlist[i].split("=");
                var key = hsh[0];
                var value = hsh[1];
                
                // 如果只有key没有value, 那么将全部丢入一个$nullName数组中
                if(hsh.length < 2){
                    value = key;
                    key = '$nullName';
                }
                // 如果缓存堆栈中没有这个数据
                if(!json[key]) {
                    json[key] = fData(value);
                }
                // 如果堆栈中已经存在这个数据，则转换成数组存储
                else {
                    if(isArray(json[key]) != true) {
                        json[key] = [json[key]];
                    }
                    json[key].push(fData(value));
                }
            }
        }
        return json;
    };
}); 