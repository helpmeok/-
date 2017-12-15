define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/user.reg.second.css'); // 载入 css 样式表
        var _vm = null;
        var _dely = 60 ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data: {
                    title: '输入手机号码',
                    mobile: view.query.mobile,
                    wtext : _dely + 's',
                    msgCode : '' ,
                    form: {
                        msgs: {},
                        model: {
                            mobile: view.query.mobile,
                            password: null,
                            msgCode: null ,
                            parentId: null,
                            code: null,
                            businessType: 1,
                        },
                        onsubmit: function() {
                        },
                        oninvalid: function() {
                        }
                    }
                },
                methods: {
                    m_count_down : function() {
                      var _timer = _dely ;
                      var _ir = setInterval(function() {
                        if(_timer != 0) {
                          _timer -- ;
                          _vm.wtext = _timer + 's' ;
                        } else {
                          _vm.wtext = _dely + 's' ;
                          clearInterval(_ir) ;  
                          view.m_reset_button('.req-code') ;
                        }
                      }, 1000) ;
                    },
                    m_req_code : function() {
                      // 请求验证码
                      if($$('.msgcode').m_valid(true)) {
                        app.loader.m_show(30) ;
                        _vm.form.model.msgCode = _vm.msgCode ;
                        app.service.user.m_get_msg_code(_vm.form.model, function(data) {
                          app.loader.m_hide() ;
                          var _url = 'user.reg.third?mobile='+ _vm.form.model.mobile+"&msgCode=" +_vm.form.model.msgCode ;
                          svc.m_push(_url) ;
                          _vm.m_count_down() ;
                          view.m_reset_button('.req-code') ;
                        },function(err) {
                          app.loader.m_hide() ;
                          app.toast.m_show_text(err.data.message) ;
                          view.m_reset_button('.req-code') ;
                        }) ;
                      } else {
                        view.m_reset_button('.req-code') ;
                      }
                    },
                    m_lodel_code : function() {
                      var _msgcode = $$('.msgcode') ;
                      var _six = $$('.six') ;
                      var _this = _six.find('h2') ;
                      var k = 0 ;
                      var j = 0 ;
                      _msgcode.on('focus', function() {
                        _this.eq(k).addClass('active') ;

                      }).on('blur', function() {

                        _this.eq(k).removeClass('active') ;
                      }).on('change', function() {

                        _this.eq(k).removeClass('active') ;
                      }).on('keyup', function() {
                        var  e = (e) ? e : window.event;
                        k = this.value.length;//输入框里面的密码长度
                        l = _this.size();//6
                        for (; l--;) {
                            if (l === k) {
                                _this.eq(l).addClass("active");
                            } else {
                                _this.eq(l).removeClass("active");
                            }
                            if (k === 6) {
                                j = 5;
                            } else {
                                j = k;
                            }
                        }
                      })
                    }
                }
            });
        });
        tpl.m_on('refresh', function() {
            // 连接进来
            // 
            _vm.m_lodel_code() ;
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