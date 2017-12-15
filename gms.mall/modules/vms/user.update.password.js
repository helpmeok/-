define(function(require, exports, module) {
	module.exports = function(tpl, view, stc, svc) {
		require('../styles/user.update.password.css'); // 载入 css 样式表
		require('../../plugs/md5.min.js') ; //md5加密  
		var _vm = null;
		tpl.m_on("init", function() {
			_vm = tpl.m_vm({
				data: {
					title: '更改密码',
					checked: false,
					type: 'password',
					mobile:'',
					form: {
						model: {
							oldPwd: null,
							newPwd1: null,
							newPwd2: null,
							id: app.data.user.id
						},
						onsubmit: function(model) {
							var _user = app.data.user ;
							var _mdoldPwd = md5(this.model.oldPwd) ;
							this.model.oldPwd = md5(_mdoldPwd + _user.mobile) ;
							var _mdpassword1 = md5(this.model.newPwd1) ;
							this.model.newPwd1 = md5(_mdpassword1 + _user.mobile) ;
							var _mdpassword2 = md5(this.model.newPwd2) ;
							this.model.newPwd2 = md5(_mdpassword2 + _user.mobile) ;
							_vm.mobile = app.data.user.memberName;
							view.m_reset_button('.submit') ;
							app.service.user.m_save_password(this.model, function(ds) {
								
                                app.toast.m_show_ok('修改成功')
								svc.m_back_and_downpull();
								if('iOS' == app.m_device()) { // 苹果
									console.log('ios')
                                    _vm.i() ;
                                } else if ('android' == app.m_device() ) {// 安卓设备
                                    _vm.s() ;
                                }
							}, function(err) {
								app.modal.m_error('提示', err);
								_vm.form.model.oldPwd = '';
								_vm.form.model.newPwd1 = '';
								_vm.form.model.newPwd2 = '';
							})
							
						},
						oninvalid: function() {
							view.m_reset_button('.submit');
						}
					}
				},
				watch: {
					checked: function(val) {
						var _type = null;
						if(val) {
							_type = 'text';
						} else {
							_type = 'password';
						}
						return _vm.type = _type;
					}
				},
				methods: {
                    i : function() {
                    	 var _models = {
                    	 	mobile:_vm.mobile,
                    	 	password:_vm.form.model.newPwd1
                    	 } ;
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
						console.log(_models)
								setupWebViewJavascriptBridge(function(bridge) {

									bridge.callHandler('login', {'mobile':_models.mobile,'password':_models.password}, function responseCallback(responseData) {
										
									})
								})
                        window.webkit.messageHandlers.login.postMessage( {mobile :_models.mobile, password : _models.password} ) ;
                    },
                    s : function() {
                        if ('android' == app.m_device() ){
                            window.android.login(_vm.mobile ,_vm.form.model.newPwd1 ) ;
                        }
                    }
				}
			});
		});
		tpl.m_on('refresh', function() {
			// 连接进来	

			return _vm.form.m_refresh();
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