define(function(require, exports, module) {
    var _dely = 60 ;
    module.exports = function(tpl, view, stc, svc) {
        require('../../plugs/md5.min.js') ; //md5加密        
        require('../styles/user.login.css') ; // 载入 css 样式表
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : '登录',
                    logintype : 1,
                    type : 'password',
                    checked : false,
                    wtext : _dely + 's',
                    formreg : null,
                    userLogin : null,
                    form : {
                        msgs : {},
                        model : {
                            msgCode : null,
                            mobile : null,
                            oauthType : null,
                            password : null
                        },
                        onsubmit : function(model) {
                             switch(_vm.logintype) {
                                case 1 : {
                                    model.oauthType = 4 ;
                                    break ;
                                }
                                case 2 : {
                                    model.oauthType = 5 ;
                                    break ;
                                }
                            }
                            var _mdpassword = md5(model.password);
                            var _mdfinalpassword = md5(_mdpassword + model.mobile); 
                            model.password = _mdfinalpassword;
                            var _formreg = _vm.formreg ;
                          
                            app.service.user.m_login(model, function(ds) {
                                _vm.userLogin = ds.data.member ;
                                app.session.m_set('user', ds.data.member) ;
                                app.data.user = ds.data.member ;
                                 
                                if(true == _formreg) {
                                    svc.m_push('user.center') ;
                                }else{
                                    svc.m_back_and_refresh() ;
                                }
                               
                                if('iOS' == app.m_device()) { // 苹果设备
                                	
                                    _vm.i() ;
                                } else if ('android' == app.m_device() ) {// 安卓设备
                                	
                                    _vm.s() ;
                                }
                            }, function(err) {
                                app.modal.m_error('提示', err) ;
                            }) ;
                            view.m_reset_button('.submit') ;
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
                    m_change_login_type : function(data) {
                        this.logintype = data ;
                    },
                    //发送验证码
                    m_send_login_code : function()　{
                        app.service.sms.m_send_login_code(this.form.model.mobile, function(ds) {
                        }, function(err) {
                            app.modal.m_error('提示', err) ;
                        }) ;
                    },
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
                    m_step1 : function() { // 获取验证码
                        return new Promise(function() {
                            var _e_mobile = $$('.mobile') ;
                            var mobile = _vm.form.model.mobile ;
                            if(_e_mobile.m_valid(true)) {
                                app.loader.m_show(30) ;
                                app.service.sms.m_send_login_code(mobile, function(data) {
                                    app.toast.m_show_ok('发送成功!') ;
                                    app.loader.m_hide() ;
                                    _vm.m_count_down() ;
                                    // _vm.model.smsId = data.smsId ; // 短信 id
                                }, function(err) {
                                    app.loader.m_hide() ;
                                    app.modal.m_alert('提示', err.errorMessage) ;
                                    view.m_reset_button('.req-code') ;
                                }) ;
                            } else {
                                view.m_reset_button('.req-code') ;
                            }
                        }) ;
                    },
                    i : function() {

                        var _models = _vm.userLogin ;
                        	function setupWebViewJavascriptBridge(callback) {

									if(window.WebViewJavascriptBridge) {
										return callback(WebViewJavascriptBridge);
									}
									if(window.WVJBCallbacks) {
										return window.WVJBCallbacks.push(callback);
									}
									window.WVJBCallbacks = [callback];
									var WVJBIframe = document.createElement('iframe');
									WVJBIframe.style.display = 'none';
									WVJBIframe.src = 'https://__bridge_loaded__';
									document.documentElement.appendChild(WVJBIframe);
									setTimeout(function() {
										document.documentElement.removeChild(WVJBIframe)
									}, 0)
								   }
								setupWebViewJavascriptBridge(function(bridge) {
									bridge.callHandler('login', {'mobile':_models.mobile,'password':_models.passwd}, function responseCallback(responseData) {
										
									})
								})
                        window.webkit.messageHandlers.login.postMessage( {mobile : _models.mobile, password : _models.passwd} ) ;
                    },
                    s : function() {
                        var _models = _vm.userLogin ;
                        if ('android' == app.m_device() ){
                            window.android.login(_models.mobile ,_models.passwd ) ;
                        }
                    }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
            return _vm.m_refresh() ;
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

        view.m_on("message", function(ev, msg) {
            /* 当 view 进入后, 从消息队列中获取消息列表, 循环触发 */
            // ev 事件源
            // msg 消息对象 属性: name, params
            switch(msg.name) {
                case "Ylogin" : { // 监视消息名称
                    // ... 
                    // msg.params
                    _vm.formreg = msg.params ;
                    break ;
                }
            }
        }) ;

    }
}) ;
