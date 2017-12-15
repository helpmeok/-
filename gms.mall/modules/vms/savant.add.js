define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/savant.add.css') ; // 载入 css 样式表
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : '申请成为专家',
                    model : {
                        memberId : null,
                        professorName : null,
                        birthday : null,
                        job : null,
                        mobile : null,
                        bankCardNo : null,
                        idcnNo : null,
                        address : null,
                        marjor : null,
                        certificate : null,
                        idcnPicFront : null,
                        idcnPicBack : null,
                        sexType : null,
                        checked : false //阅读协议
                    },
                    form : {
                        model : {},
                        onsubmit : function() {
                            _vm.model.memberId = app.data.user.id ;
                            app.service.savant.m_add(
                                _vm.model,
                                function(ds) {
                                    console.log(ds);
                                    svc.m_pop('business?id=2')
                                    view.m_reset_button('.submit') ;
                                },
                                function(err) {
                                    console.log(err);
                                    view.m_reset_button('.submit') ;
                                    if("13" === err.data.code) {
                                        svc.m_back() ;
                                    }
                                    app.toast.m_show_text(err.data.message) ;
                                })
                            // svc.m_pop('business?id=2') ;
                        },
                        oninvalid : function() {
                            view.m_reset_button('.submit') ; 
                        }
                    }
                },
                methods : {
                    m_look : function() {
                        svc.m_pop('agreement') ;
                    }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
            // 
            // 
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
                case "state" : { // 监视消息名称
                    // ... 
                    // 
                    _vm.model.checked = msg.params
                    break ;
                }
            }
        }) ;
    }
}) ;