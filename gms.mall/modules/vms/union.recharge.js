define(function (require, exports, module) {
    module.exports = function (tpl, view, stc, svc) {
        var _vm = null;
        var _dely = 60;
        tpl.m_on("init", function () {
            _vm = tpl.m_vm({
                data: {
                    title: '确认支付',
                    src: ''
                },
                methods: {
                    m_init: function () {
                        var params = app.session.m_get("doc");
                        console.log(params);
                        var _url = window.__api + '/api/pay/unionpay/recharge?token=' + params.token + '&&money=' + params.money;
                        _vm.src = _url;
                    },
                    m_my_back:function () {
                        svc.m_back("order.list");            // 返回购物车列表
                    }
                }
            });
        });
        tpl.m_on('refresh', function () {
            _vm.m_init();
        });

        view.m_on("active", function () {
            /* 当 view 激活时触发(在 enter 事件之前, 简单点说如果有过度动画, 将会在过度之前触发) */
        });
        view.m_on("enter", function () {
            /* 当 view 进入时触发 */
        });

        view.m_on("frozen", function () {
            /* 当 view 失效时触发 (如果有过度动画, 将会在过度之前触发) */
        });

        view.m_on("leave", function () {
            /* 当 view 离开时触发 (如果有过度动画, 将会在过度之后触发) */
        });

        // view.m_on("message", function(ev, msg) {
        //     /* 当 view 进入后, 从消息队列中获取消息列表, 循环触发 */
        //     // ev 事件源
        //     // msg 消息对象 属性: name, params
        //     switch(msg.name) {
        //         case "info" : { // 监视消息名称
        //             // ... 
        //             console.log(msg.params) ;
        //             _vm. goods_freight = msg.params.goods_freight ;
        //             _vm.total_freight = msg.params.total_freight ;
        //         }
        //     }
        // }) ;
    }
});