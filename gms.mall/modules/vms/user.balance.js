define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/user.balance.css') ; // 载入 css 样式表
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : '账户余额',
                    user : '',
                    recordList:[],
                    form : {
                        msgs : {},
                    }
                },
                methods : {
                    m_load_info : function() {
                        var _user = app.data.user ;

                        var _data = {
                            id : _user.id
                        } ;
                        app.service.user.m_get_info(_data, function(res) {
                            _vm.user = res.data ;
                            app.session.m_set("mGetInfo", res.data);
                        }, function(err) {
                            app.modal.m_error("提示", err) ;
                        })
                    },
                    m_my_back:function () {
                        console.log("触发了返回主页按按钮");
                        svc.m_back("$root");
                    }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
            _vm.m_load_info() ;
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