define(function (require, exports, module) {
    module.exports = function (tpl, view, stc, svc) {
        // require('../styles/user.reg.css') ; // 载入 css 样式表
        var _vm = null;
        tpl.m_on("init", function () {
            _vm = tpl.m_vm({
                data: {
                    title: '提现',
                    id: null,
                    balance: null,
                    window: {},
                    show: false,
                    applyMoney: 0,
                    applyType: 2,
                    bank_list: [],
                    bank_list_length: 0,
                    form: {
                        msgs: {},
                        model: {
                            memberId: '',
                            money: '',
                            applyType: '',
                            memberBankCardId: ''
                        },
                        onsubmit: function (model) {
                            view.m_reset_button('.submit');

                            var param = {
                                memberId: _vm.id,
                                money: _vm.form.model.money,
                                applyType: _vm.applyType,
                                memberBankCardId: _vm.form.model.memberBankCardId
                            };
                            app.service.user.m_apply_reward_cash(
                                param,
                                function (res) {
                                    app.modal.m_alert("提示", res.data, function () {
                                    });
                                },
                                function (err) {
                                    app.modal.m_alert("提示", err.errorMessage, function () {
                                    });
                                }
                            );
                        },
                        oninvalid: function () {
                            view.m_reset_button('.submit');
                        }
                    }
                },
                methods: {
                    m_onload_info: function () {
                        var user = app.data.user;
                        _vm.id = user.id;

                        var param = {
                            memberId: _vm.id
                        };
                        app.service.user.m_find_mem_bank_card_list(
                            param,
                            function (res) {
                                _vm.bank_list = res.data;
                                _vm.bank_list_length = _vm.bank_list.length;
                            },
                            function (err) {
                                // console.log("请求失败");
                            }
                        )
                    },
                    m_my_back: function () {
                        svc.m_back_and_downpull();
                    },
                    m_push: function () {
                        svc.m_push('card.list');
                    }
                }
            });
        });
        tpl.m_on('refresh', function () {
            // 连接进来
            _vm.m_onload_info();

            // 获取上一个页面的session值
            var _mGetDetail = app.session.m_get("mGetDetail");
            _vm.mGetDetail = _mGetDetail;

            console.log(_vm.mGetDetail);

            if(_vm.mGetDetail.applyMoney == null){
                _vm.mGetDetail.applyMoney = 0;
            }

            _vm.applyMoney = _vm.mGetDetail.applyMoney;
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