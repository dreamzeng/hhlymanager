/**
 * 函数去抖
 * @param func
 * @param wait
 * @param immediate
 * @returns {Function}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp;

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function(...args) {
        context = this;
        timestamp = +new Date();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}

/**
 * [异步组件加载函数]
 * @param  {[string]} name [组件名称]
 * @return {[promise]}      [组件]
 */
export const asyncComponent = (name) => {
    return resolve => require([`components/${name}`], resolve)
};

export const getHost = function(url) { //获取 host
    var host = "null";
    if (typeof url == "undefined"|| null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/|:]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined"
        && null != match) {
        host = match[1];
    }
    if (typeof host != "undefined"
        && null != host) {
        var strAry = host.split(".");
        if (strAry.length > 1) {
            host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
        }
    }
    return host;
};

export const cookieTools = { // cookie操作
    get : function (name){
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null){
            return unescape(arr[2]);
        }
        return "";
    },
    set : function (name, value, days,domain){
        if (typeof days == "undefined"){
            domain = domain?domain:getHost();
            //document.cookie = name + "=" + escape(value) + "; path=/; domain="+domain;
            document.cookie = name + "=" + escape(value) + ";";
        }else{
            var expdate = new Date();
            var msecs = (typeof days === 'number') ? days * 24 * 60 * 60 * 1000 : 0;
            expdate.setTime(expdate.getTime() + msecs);
            //document.cookie = name + "=" + escape(value) + "; path=/; domain="+tools.getHost()+"; expires=" + expdate.toUTCString();
            document.cookie = name + "=" + escape(value) + "; expires=" + expdate.toUTCString();
        }
    },
    del : function (name){
        var expdate = new Date();
        expdate.setTime(expdate.getTime() - 1000);
        this.set(name, "", expdate);
    }
};
