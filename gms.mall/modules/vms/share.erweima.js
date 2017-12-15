define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/share.erweima.css') ;
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : null,
                    src : null
                },
                methods : {
                    m_init : function() {
                        var _url = view.query.url ;
                        var _id = _url.split('=')[0].substr(0,_url.split('=')[0].length-12)+'?memberId='+_url.split('=')[2];
                         console.log(_id)
                        _vm.src = window.__api + '/api/reward/translateUrlToQrcode?urlText='+_id;
                    }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
            _vm.m_init() ;
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
    }
}) ;