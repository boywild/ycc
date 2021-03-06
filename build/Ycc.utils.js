/**
 * @file        Ycc.utils.js
 * @author      xiaohei
 * @desc
 *  整个程序公用的基础工具模块
 *
 * @requires    Ycc.init
 */

(function(Ycc){
    Ycc.utils = {};


	/**
     * 合并两个对象。只会保留targetObj中存在的字段。
	 * @param targetObj    目标对象
	 * @param obj2  待合入的对象
	 * @param isDeepClone   是否进行深拷贝
	 * @return {{}} 新的对象
	 */
    Ycc.utils.extend = function(targetObj, obj2,isDeepClone) {
        var newobj = {};
        if(isDeepClone)
            obj2 = Ycc.utils.deepClone(obj2);
        for (var i in targetObj) {
			if(!targetObj.hasOwnProperty(i)) continue;
            newobj[i] = targetObj[i];
            if (obj2 && obj2[i] != null) {
                newobj[i] = obj2[i];
            }
        }
        return newobj;
    };
	
	/**
     * 判断字符串
	 * @param str
	 * @return {boolean}
	 */
	Ycc.utils.isString = function(str) {
        return typeof(str) === "string";
    };
	
	/**
     * 判断数字
	 * @param str
	 * @return {boolean}
	 */
    Ycc.utils.isNum = function(str) {
        return typeof(str) === "number";

    };
	
	/**
     * 判断对象
	 * @param str
	 * @return {boolean}
	 */
	Ycc.utils.isObj = function(str) {
        return typeof(str) === "object";
    };
	/**
     * 判断函数
	 * @param str
	 * @return {boolean}
	 */
	Ycc.utils.isFn = function(str) {
        return typeof(str) === "function";
    };
	
	/**
     * 判断数组
	 * @param str
	 * @return {boolean}
	 */
    Ycc.utils.isArray = function(str) {
        return Object.prototype.toString.call(str) === '[object Array]';
    };
	
	
	/**
     * 深拷贝某个对象或者数组
	 * @param arrOrObj
	 * @return {*}
	 */
	Ycc.utils.deepClone = function(arrOrObj){
        
        return (Ycc.utils.isArray(arrOrObj))? deepCopy(arrOrObj):deepExtend(arrOrObj);
        function deepExtend(obj){
            var tempObj = {};
            for(var i in obj){
                if(!obj.hasOwnProperty(i)) continue;
                tempObj[i] = obj[i];
                if(Ycc.utils.isArray(obj[i])){
                    tempObj[i] = deepCopy(obj[i]);
                }else if(Ycc.utils.isObj(obj[i])){
                    tempObj[i] = deepExtend(obj[i]);
                }else{
                    tempObj[i] = obj[i];
                }
            }
            return tempObj;
        }
        function deepCopy(arr){
            var newArr = [];
            var v = null;
            for(var i=0;i<arr.length;i++){
                v = arr[i];
                if(Ycc.utils.isArray(v))
                    newArr.push(deepCopy(v));
                else if(Ycc.utils.isObj(v))
                    newArr.push(deepExtend(v));
                else{
                    newArr.push(v);
                }
            }
            return newArr;
        }
    }


})(Ycc);

