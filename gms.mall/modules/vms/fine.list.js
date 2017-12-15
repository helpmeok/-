define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : '优选精品',
                    list : null,
                },
                mounted : function() { // 初始化

                    app.service.fine.m_list(null, function(ds) {//精品资讯
                        _vm.list = ds.data ;
                    })
                },
                methods : {
                    m_push : function(el) {
                        var url = 'goods.detail?id=' + el.goodsId;
                        svc.m_push(url);
                    } 
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
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