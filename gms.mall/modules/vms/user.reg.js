define(function(require, exports, module) {
    var _dely = 60;
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/user.reg.css'); // 载入 css 样式表
        var _vm = null;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data: {
                    title: '输入手机号码',
                    src: window.__api + '/api/rand/randImag?timeStamp=' + Date.now(),
                    form: {
                        msgs: {},
                        model: {
                            mobile: null,
                            password: null,
                            msgCode: null ,
                            parentId: null,
                            code: null,
//                          memberId: null,
                            timeStamp: Date.now(),
                            businessType: 1,
                        },
                        onsubmit: function() {
                        	/*console.log(_vm.form.model);
                        	console.log(_vm.form.model.memberId);*/
                            return new Promise(function() {
                                var _e_mobile = $$('.mobile');
                                var _e_imgcode = $$('.imgcode');
                                if (_e_mobile.m_valid(true) && _e_imgcode.m_valid(true)) {
                                    app.loader.m_show(30);
                                    app.service.user.m_get_reg(_vm.form.model, function(ds) {
                                        if(true == ds.success) {
                                            var _url = 'user.reg.second?mobile=' + _vm.form.model.mobile ;
                                            svc.m_push(_url) ;
                                            // svc.m_back('user.login') ;
                                        }else if(false == ds.success) {
                                            app.toast.m_show_text(ds.data) ;
                                            view.m_reset_button('.submit') ;
                                        }
                                        app.loader.m_hide() ;
                                    }, function(err){
                                        app.loader.m_hide() ;
                                        view.m_reset_button('.submit') ;
                                        app.toast.m_show_text(err.data.message) ;
                                    });
                                } else {
                                    view.m_reset_button('.submit') ;
                                }
                            });
                        },
                        oninvalid: function() {
                            view.m_reset_button('.submit') ;
                        }
                    }
                },
                methods: {
                    m_img_code: function() {
                        _vm.src = window.__api + '/api/rand/randImag?timeStamp=' + Date.now() ;
                    },
                }
            });
        });
        tpl.m_on('refresh', function() {
            // 连接进来
            _vm.form.model.parentId = app.session.m_get('parentid') ;
        });

        view.m_on("active", function() {
            /* 当 view 激活时触发(在 enter 事件之前, 简单点说如果有过度动画, 将会在过度之前触发) */
        });
        view.m_on("enter", function() {
            /* 当 view 进入时触发 */
        });

        view.m_on("frozen", function() {
            /* 当 view 失效时触发 (如果有过度动画, 将会在过度之前触发) */
        });

        view.m_on("leave", function() {
            /* 当 view 离开时触发 (如果有过度动画, 将会在过度之后触发) */
        });

    }
});