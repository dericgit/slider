/**
 * @fileoverview trim
 * @author Random | http://weibo.com/random
 * @date 2013-05-12
 */
 
define("utils/trim",function(require){
	 return function trim(str) {
        if(typeof str !== 'string'){
            throw 'trim need a string as parameter';
        }
        var len = str.length;
        var s = 0;
        var reg = /(\u3000|\s|\t|\u00A0)/;
        
        while(s < len){
            if(!reg.test(str.charAt(s))){
                break;
            }
            s += 1;
        }
        while(len > s){
            if(!reg.test(str.charAt(len - 1))){
                break;
            }
            len -= 1;
        }
        return str.slice(s, len);
    }
}); 