define(function(require, exports, module) {
    var _dely = 60 ;
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/user.reg.third.css') ; // 载入 css 样式表
        require('../../plugs/md5.min.js') ; 
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : '个人资料',
                    type : 'password',
                    checked : false,
                    wtext : _dely + 's',
                    form : {
                        msgs : {},
                        model : {
                            mobile :view.query.mobile,
                            nickName :　null,
                            msgCode : view.query.msgCode,
                            password :　null,
                            parentId :　null,
                            choise : null,
                        },
                        onsubmit : function() {
                          var _e_mobile = $$('.nickName') ;
                          var _e_password = $$('.password');
                          var _e_checked = $$('.choise');
                          if( _e_mobile.m_valid(true) && _e_password.m_valid(true) && _e_checked.m_valid(true) ) {
                            var _mdpassword = md5(_vm.form.model.password);
                            var _mdfinalpassword = md5(_mdpassword + _vm.form.model.mobile); 
                            _vm.form.model.password = _mdfinalpassword;
                            if (!!localStorage.getItem('parentId')) {
                            _vm.form.model.parentId =localStorage.getItem('parentId') ;
                            	
                            }
                            app.service.user.m_reg(_vm.form.model, function(ds) {
                                app.modal.m_alert("提示", "注册成功！", function() {//成功时候回调
                                    svc.m_back('user.login') ;
                                    svc.m_force_put_msg('user.login', 'Ylogin', true) ;
                                    view.m_reset_button('.submit') ;
                                    //强行压入一条消息
                                    // svc.m_force_put_msg("user.login", "mobile", _vm.model.mobile) ;
                                }, "去登陆") ;
                                view.m_reset_button('.submit') ;
                            }, function(err) {
                                view.m_reset_button('.submit') ;
                                app.modal.m_alert("提示", err.errorMessage) ;
                            }) ;
                          }
                        },
                        oninvalid : function() {
                          view.m_reset_button('.submit') ;
                        }
                    }
                },
                watch : {
                    checked : function(val) {
                        var _type = null ;
                        if(val) {
                            _type = 'text' ;
                        } else {
                            _type = 'password' ;
                        }
                        return _vm.type = _type ;
                    }
                },
                methods : {
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
            _vm.form.model.parentId = app.session.m_get('parentid') ;
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