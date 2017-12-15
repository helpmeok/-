define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        // require('../styles/user.reg.css') ; // 载入 css 样式表
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : '提现申请记录',
                    id : null,
                    recordList:[]
                },
                methods : {
                    m_onload_info:function () {
                        var _mGetInfo = app.session.m_get("mGetInfo");
                        _vm.mGetInfo = _mGetInfo;
                        _vm.id = _vm.mGetInfo.id;
                        var param ={
                            memberId : _vm.id
                        };
                        app.service.user.m_get_member_apply_cash_list(
                            param,
                            function (res) {
                                console.log(res.data);
                                _vm.recordList = res.data;
                            },
                            function (err) {
                                console.log("请求失败");
                            }
                        );
                    }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
            _vm.m_onload_info();
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