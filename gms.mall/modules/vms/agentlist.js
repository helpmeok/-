define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = this.m_vm({
                data : {
                    title : "联系经纪人",
                    list : {} 
                },
                methods : {
                    m_local : function() {
                        var _id = app.data.user.id ;
                        app.service.agent.m_detail({
                            memberId : _id
                        }, function(ds) {
                            _vm.list = ds.data ;
                        }, function(err) {
                           
                        })
                    }
                }
            }) ;
        }) ;
        tpl.m_on("refresh", function() {
            /* 每当模板渲染时触发 */
            _vm.m_local() ;
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

        view.m_on("message", function(ev, msg) {
            /* 当 view 进入后, 从消息队列中获取消息列表, 循环触发 */
            // ev 事件源
            // msg 消息对象 属性: name, params
            switch(msg.name) {
                case "<name>" : { // 监视消息名称
                    // ... 
                    break ;
                }
            }
        }) ;
    }
}) ;