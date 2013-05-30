/**
 * @fileoverview diuss module loader 
 * @version 0.1.0
 * @author Random | random.hao.yang@gmail.com
 * @date 2013-05-01
 */


(function(win){
	var config={
		path:"./"
	};
	
	var scriptTypes={
		"js":"text/javascript",
		"tep":"text/template"
	};
	
	var	nsRoot={};
	var moduleList={};
	var checkDeep=100;
	var loadedModuleList={};
	var modulesCount=0;
	var scriptDom=document.getElementById("diuss");
	var cfgPath;
	
	scriptDom && (cfgPath = scriptDom.getAttribute("data-path"));
	cfgPath && (config.path = cfgPath);
	

	function getType(obj){
		return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
	}
	
	function getJsonLength(obj){
		var i=0;
		var k;
		
		for(k in obj){
			i++;
		}
		return i;
	}

	function createNamespace(root,ns){
		var nsc;
		var _ns;
		
		ns=ns || "";
		ns=ns.replace(/\s/g,"");
		
		if (ns.length == 0) {
			return root;
		}else {
			nsc = ns.substr(0, 1);
			if (nsc != nsc.toLowerCase()) {
				throw new Error('Namespace must be lowercase at first letter : "'+ns+'"');
			}
		  
			if (ns.indexOf("/") == -1) {
				typeof(root[ns]) != "object" && (root[ns] = {});
				return root[ns];
			}else {
				
				_ns = ns.split("/")[0];
				typeof(root[_ns]) != "object" && (root[_ns] = {});
				return createNamespace(root[_ns], ns.replace(/[^\/]*\//, ""));
			}
		}
	}
	
	function getNamespaceObject(root, ns){
		var arr;
		var k;
		
		if(!ns){
			return;
		}
		if(ns.indexOf("/") === -1){
			return root[ns];
		}
		
		arr=ns.split("/");
		k=arr.shift();
		if(typeof root[k] !== "undefined"){
			return getNamespaceObject(root[k], arr.join("/"));
		}else{
			return;
		}
	}
	
	
	//目前ie6/opera11/ff6无效
	function onError(msg,url){
		console.log("loadJS Error:["+url+"] not found");
		window.detachEvent && window.detachEvent("onerror",onError);
		return false;
	}
	
	function hasProperty(script,p){
		if (p in script) {
			return true;
		}else {
			script.setAttribute(p, "");
			return typeof script[p] === "function";
		}
	}
	
	function loadJS(path,cb,charset){
		var script=document.createElement("script");
		var head=document.getElementsByTagName("head")[0];
		var sType=path.split(".").pop();

		if(hasProperty(script,"onload")){
			hasProperty(script,"onerror") && (script.onerror = function(){
				onError("Path Error",path);
			});
			script.onload=function(){
				cb && cb();
			};
			
		}else if(script.readyState){
			window.attachEvent && window.attachEvent("onerror",onError);
			script.onreadystatechange=function(){
				if(/complete|loaded/.test(script.readyState)){
					script.onreadystatechange=null;
					cb && cb();
				}
			};
		}
		
		script.charset = charset || "utf-8";
		script.type = scriptTypes[sType];
		script.src = config.path + path;
		
		head.appendChild(script);
	}
	
	
	function loadModule(mid){
		var p=/\.[a-z]{1,10}$/;
		var path = p.test(mid) ? mid : mid+".js";
		
		loadJS(path,function(){
			loaded(mid);
		});
	}
	
	function loaded(mid){
		
		if( --modulesCount === 0 ){
			//alert("all module loaded");
			
			while(getJsonLength(moduleList) > 0){
				if(checkDeep-- === 0){
					alert("too much module checked deep!");
					break;	
				}

				checkModuleRequire();
			}			
		}
	}
	
	
	function splitMid(mid){
		var ret=[];
		var mArr;
		
		if(mid.indexOf("/") !== -1){
			mArr=mid.split("/");
			mName=mArr.pop();
		}else{
			mName=mid;
		}
		
		ret=[mArr.join("/"), mName];
		return ret;
	}
	
	function bindToNs(nsRoot, mid, fn){
		
		var midArr=splitMid(mid);
		var mName=midArr[1];
		var nsNode;
		
		nsNode=createNamespace(nsRoot, midArr[0]);
		nsNode[mName]=fn(requireHandler);
	}
	
	function requireHandler(mid){
		var midArr=splitMid(mid);
		var nsNode=getNamespaceObject(nsRoot, midArr[0]) || {};
		
		return nsNode[midArr[1]];
	}
	
	
	
	/**
	 * 检测拥有依赖关系的模块
	 */
	var checkModuleRequire=function(){
		var i;
		var k;
		var reqs;
		var checked;
		
		for(k in moduleList){
			checked=true;
			reqs=moduleList[k].requires;
			
			i=reqs.length;
			while(i--){
				checked = !!getNamespaceObject(nsRoot, reqs[i]);
				if(!checked){
					break;
				}
			}
			
			if(checked){
				bindToNs(nsRoot, k, moduleList[k].fn);
				delete moduleList[k];
			}
		}
	};
	
	var define=function(mid, modules, fn){
		var i;
		var l;

		if(getType(modules)==="array"){
			
			if(modules.length){
				moduleList[mid]={
					requires:modules,
					fn:fn
				};
				
				l=modules.length;
				for(i=0;i<l;i++){
					if(!loadedModuleList[modules[i]]){
						loadModule(modules[i]);
						loadedModuleList[modules[i]]=1;
						modulesCount++;
					}
				}
			}else{
				moduleList[mid]={
					requires:[],
					fn:fn
				};
			}
			
		}else if(getType(modules)==="function"){
			moduleList[mid]={
				requires:[],
				fn:modules
			};
		}
		
	};
	
	win.define=define;
})(window);

