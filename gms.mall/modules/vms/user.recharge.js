define(function (require, exports, module) {
    module.exports = function (tpl, view, stc, svc) {
        // require('../styles/user.reg.css') ; // 载入 css 样式表
        var _vm = null;
        tpl.m_on("init", function () {
            _vm = tpl.m_vm({
                data: {
                    title: '充值金额',
                    mGetInfo: {},
                    rechargeType: 2,
                    token: '',
                    form: {
                        msgs: {},
                        model: {
                            money: null,
                            rechargeType: ''
                        },
                        onsubmit: function (model) {
                            view.m_reset_button('.submit');
                            if( _vm.form.model.money == null ){
                                app.modal.m_alert('提示',"请输入要提现的金额",function () {});
                            }
                            else if(_vm.form.model.money < 100){
                                app.modal.m_alert('提示',"充值金额不小于100",function () {});
                            }
                            else{

                                if(_vm.rechargeType == 2){
                                    console.log("进入了银联贷记卡");
                                    var params = {
                                        money: _vm.form.model.money,
                                        token: _vm.token
                                    };
                                    if ('pc' == app.m_device()) {
                                        app.util.m_link(window.__api + '/api/pay/unionpay/recharge?token=' + _vm.token + '&&money=' + _vm.form.model.money);
                                    } else {
                                        svc.m_push('union.recharge');
                                        app.session.m_set("doc", params);
                                    }
                                }
                                else if (_vm.rechargeType == 1){
                                    console.log("进入了银联储蓄卡");
                                    var params = {
                                        money: _vm.form.model.money,
                                        token: _vm.token
                                    };
                                    if ('pc' == app.m_device()) {
                                        app.util.m_link(window.__api + '/api/pay/unionpayDeposit/recharge?token=' + _vm.token + '&&money=' + _vm.form.model.money);
                                    } else {
                                        svc.m_push('union.recharge');
                                        app.session.m_set("doc", params);
                                    }
                                }
                                else{
                                    app.modal.m_alert('提示',"没有这种充值方式",function () {});
                                }
                            }
                        },
                        oninvalid: function () {
                            view.m_reset_button('.submit');
                        }
                    }
                },
                methods: {
                    on_load_info: function () {
                        var _mGetInfo = app.session.m_get("mGetInfo");
                        _vm.mGetInfo = _mGetInfo;
                        _vm.token = _mGetInfo.token;
                        console.log(_vm.token);
                    }
                }
            });
        });
        tpl.m_on('refresh', function () {
            // 连接进来
            _vm.on_load_info();
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

    }
});