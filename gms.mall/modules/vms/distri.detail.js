define(function (require, exports, module) {
    module.exports = function (tpl, view, stc, svc) {
        require('../styles/distri.detail.css'); // 载入 css 样式表
        var _vm = null;
        tpl.m_on("init", function () {
            _vm = this.m_vm({
                data: {
                    title: '推荐提成评价与奖励',
                    status: 1,
                    memberType: app.data.user.memberType,
                    ds: {},
                    tab_index: 1,
                    window: {},
                    is_detail: false,
                    applyMoney: 0,
                    member_id: '',
                    form: {
                        msgs: {},
                        model: {
                            name: '',
                            id: ''
                        },
                        onsubmit: function (model) {
                            // 把 model
                            // 保存地址的业务逻辑
                            svc.m_push('user.reward.extract');
                            view.m_reset_button('.submit');
                            var param = {
                                id: _vm.member_id,
                                memberName: _vm.form.model.name,
                                idcn: _vm.form.model.id
                            };
                            app.service.user.m_complete_member(
                                param,
                                function (res) {
                                },
                                function (err) {
                                    console.log("请求失败");
                                }
                            );
                            view.m_refresh();
                        },
                        oninvalid: function () {
                            view.m_reset_button('.submit');
                        }
                    }
                },
                methods: {
                    m_data: function () {
                        var _user = app.data.user;
                        _vm.member_id = _user.id;

                        var params = {
                            memberId: _user.id,
                            memberType: _user.memberType
                        };

                        app.service.distri.m_get_detail(
                            params,
                            function (res) {
                                _vm.ds = res.data;
                                console.log(res.data)
                                _vm.applyMoney = res.data.applyMoney;
                                if (_vm.applyMoney == null) {
                                    _vm.applyMoney = 0;
                                }
                                app.session.m_set("mGetDetail", res.data);
                            },
                            function (err) {
                                console.log("请求发送失败");
                            }
                        );
                    },
                    m_pop_on: function () {
                        if (_vm.is_detail == false) {
                            _vm.window.m_show();
                        }
                        else {
                            svc.m_push('user.reward.extract');
                        }
                    },
                    m_find_member_is_detail: function () {
                        var user = app.data.user;
                        var params_id = {
                            id: user.id
                        };
                        app.service.user.m_find_member_is_detail(
                            params_id,
                            function (res) {
                                _vm.is_detail = res.data.isDetail;
                            },
                            function (err) {
                                view.m_reset_button('.submit');
                            }
                        );
                    },
                    m_push:function  (el) {
                    	
                    }
                }
            });
        });
        tpl.m_on("refresh", function () {
            /* 每当模板渲染时触发 */
            _vm.m_data();
            _vm.m_find_member_is_detail();

            _vm.$watch('status', function () {
                _vm.m_refresh();
            });
            console.log(app.data.user.memberType)
            return _vm.m_refresh();
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

        view.m_on("message", function (ev, msg) {
            /* 当 view 进入后, 从消息队列中获取消息列表, 循环触发 */
            // ev 事件源
            // msg 消息对象 属性: name, params
            switch (msg.name) {
                case "<name>" : { // 监视消息名称
                    // ...
                    break;
                }
            }
        });
    }
});