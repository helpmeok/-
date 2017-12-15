define(function (require, exports, module) {
    module.exports = function (tpl, view, stc, svc) {
        // require('../styles/user.reg.css') ; // 载入 css 样式表
        var _vm = null;
        tpl.m_on("init", function () {
            _vm = tpl.m_vm({
                data: {
                    title: '账户明细',
                    balance: app.data.user.balance,
                    form: {
                        msgs: {},
                    },

                    detail: {}
                },
                methods: {
                    m_load_info: function () {
                        var userObj = app.data.user;
                        var _data = {
                            memberId: userObj.id
                        };
                        app.service.user.m_get_member_detail(
                            _data,
                            function (res) {
                                _vm.detail = res.data;
                            },
                            function (err) {
                                // app.modal.m_error('校验失败', err);
                            }
                        );
                    }
                }
            });
        });

        tpl.m_on('refresh', function () {
            // 连接进来
            _vm.m_load_info();
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