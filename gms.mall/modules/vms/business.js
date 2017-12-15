define(function(require, exports, module) {
    require('../styles/business.css') ;
    module.exports = function(tpl, view, stc, svc) {
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : '',
                    images : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARAAAADpCAMAAADbPphCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTA1NkMzRUY5Nzc4MTFFN0JBOUZBOTNBQ0U1MTE3QTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTA1NkMzRjA5Nzc4MTFFN0JBOUZBOTNBQ0U1MTE3QTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMDU2QzNFRDk3NzgxMUU3QkE5RkE5M0FDRTUxMTdBOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMDU2QzNFRTk3NzgxMUU3QkE5RkE5M0FDRTUxMTdBOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvY5LewAAAMAUExURf2zO//uyv/+/P7VYv2sMP7RZf2pM/7crP7Mev/t0//x0/7Ihv/26v/9+f/pqP7isv7Jaf7JQP7OZ//rpP7hc/27Y/7BRP/xzP7MHP/ouf20Nv26Rv7bk/7Zg/7UNv7Ebv7Tcv/14/7ijP7Re//oov69L/7Xjv7TXf/rxf7NSf/rsP/jm/7VQf/23f2rMf7irP/57P/kpf/xwv7FLv/ipv/89f7KS/62L//55P7aX/2mNP7ZdP7SUP/58P7Vgf/moP7TS/7BPf7Yef7ZSP7SKf68Mf65LP7JU/7bVv/88f/47v7GTP7AJP7OP//enf/hof7EVP7RWf7khf2mOv66Mf2yVP/02P/25v/67/7Pdf7Maf7Cb//xxf/mpf/z3v7ALv/nuv7bo/7FMf21TP7cXv/szP7GJv7ESv/x2f/psf7CTP7Whv7JL/7Sgf68K//qof7EYv7PhP/y4v7NOv/osv7YYf7OUP6+NP3BWf/24P7nyv/qov/69P/04P/56f7bfv2tRv7IKf7kw/7Tm//wuP7PR/7AJ//tv/7Zb/7IOv2rRv/z5v/qmv7QZ/7PKf22WP23Of22R/7CIv66J/7QGf67J/60K/7BI/6/JP68Jv2yLP69Jf63Kf2kNf2zLP2xLf6+Jf7AI/2jNv7PGf65KP7EIf7PGv62Kv64KP7DIf2wLv2vLv7FIP7BIv61Kv61K/2uL/6zLP7NG/7IHv6+JP7MG/67Jv7JHv7HH/7DIv7KHf2rQv64Kf7OGv2yLf69Jv2wLf7Sbv2tL/62Kf7LHP7JHf7EIP2vL/7GH/7GIP2lNf2nM/7OG/2qMv2lNP7Ha/6zK/7ITP67K//tr/7HRv7XZf2+XP7civ/34/25Tf7Qif7Sjv7pyP/57f7EI/2vMf26UP7KPP2wNP7cef7ef/2oPv7PG/67Kf7JIv65Kf/33v7ONv7ft/7TZP7DJ/7PHf7QIP7ML//puP6+Jv7Okf2vTv/pz/7Xpv7Ff//ovv7KWP7NH//ooP2kNv///wAAAHGDb8QAAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAN20lEQVR42uzdeXwVxQEH8O2rbUiagKXIfSSIlBaRI6ShSERQlADhLAHkEjy4kYAl4AHiCSqCUhAw5SihCRoTERFtQaxWa9FaW1FBjQdgW+1hRetRO7tNmHnvzR4zO7M7Ozsv7O8PjjePfOZ9mZ2dmZ23qxl+8jMlYoiMluoaok20hsAhkkRrGBziSLyB7FAy4YHs2NFwRbyA/FLZhANiqsLF514Uas69WLCI5sfjouv76KGn8NZmHwsU8QHS/lZdkXx05Q5hIppnj8GFujKJ3f2X0EEGx3SVcs0OQSK8IAdgXmpfqKuVZqhmB8IBOdBLMQ89r/2OMEEG68rlbjFNRPPWQF5VD6Tw3yGCfFyoHog+OESQ9gp66KPDAHkJZrCKINegykkFeRTmSiVBUOUikAgkAolAIpAIpIGA7IVREwRVLgIJE6QlzI9VBLkeVS4CiUAiEHVBfgujJgiqXAQSgUQgEUjKgPwKRkmQTqhyEUgEEoFEIA0K5KPv8WWSYBBrAgV5DoYGMvrrRzkjaOtNp+eICROk117utGwWNAgHCSfIPhgKyGh+kL1iLhV32kdNWCDNWvLnHhkg+8JqIR5ApLQQRhFOkD0wPyVXq/hrfpDRYkD2uCUUEP3Ve/ZyejSLCQVZdGEyf/8br4h4ED2rRS+eTBK1GzoO8kP8xVhxxyIukQBAQhupOoHUm/zvkwjEnD4XsotwgjwBoyYIqpwdRC+8DZU9EYGg+dUnrCKnCYjeOAKx9KxFEYg5XfewiXCCvACjJgiqnDNIMSp9IQJBx8yKQEB+D6MmCKqcM4hehIojEJTbAgGpgvmmkiCociQQVByBRCARSASiDsjzMGqCoMqRQFCxWJCdMEqCTEaVm+Vc/ANUHIFEIDJBdsGoCYIqRwJBxRFIBCIT5EkYNUFQ5UggqDgCCRTkPhg1QVDlSCCoOAKJQCKQEEEehvmniiA9UeVIIKhYLMj9MGqCoMqRQFBxBBKByATZDqMmCKocAeRHqDgCiUBk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',
                    id : view.query.id ,
                },
                methods : {
                    m_sure : function() {
                        svc.m_back() ;
                    }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            
        }) ;
        
        view.m_on("active", function() {
            /* 当 view 激活时触发(在 enter 事件之前, 简单点说如果有过度动画, 将会在过度之前触发) */    
        }) ;
        view.m_on("enter", function() {
            /* 当 view 进入时触发 */  
        }) ;

        view.m_on("frozen", function() {
            /* 当 view 失效时触发 (如果有过度动画, 将会在过度之前触发) */ 
        }) ;

        view.m_on("leave", function() {
            /* 当 view 离开时触发 (如果有过度动画, 将会在过度之后触发) */
        }) ;

        // view.m_on("message", function(ev, msg) {
        //     /* 当 view 进入后, 从消息队列中获取消息列表, 循环触发 */
        //     // ev 事件源
        //     // msg 消息对象 属性: name, params
        //     switch(msg.name) {
        //         case "info" : { // 监视消息名称
        //             // ... 
        //             _vm. goods_freight = msg.params.goods_freight ;
        //             _vm.total_freight = msg.params.total_freight ;
        //         }
        //     }
        // }) ;
    }
}) ;