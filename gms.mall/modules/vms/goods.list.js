define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/goods.list.css') ; // 载入 css 样式表
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : "null",
                    list : [],
                },
                methods : {
                    m_list : function() {
                        var _param = {
                            classifyId : view.query.id,
                            optype : 1
                        }
                        app.service.category.m_fl_list(_param, function(ds) {
                            _vm.list = ds.data.goods ;
                            _vm.title = ds.data.title ;
                        }, function(err) {
                            app.modal.m_error("校验失败", err)
                        })
                    },
                    m_push: function(el) {
                        var url = 'goods.detail?id=' + el.id;
                        svc.m_push(url);
                    } 
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
            _vm.m_list() ;
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