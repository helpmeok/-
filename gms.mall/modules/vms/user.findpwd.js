define(function(require, exports, module) {
	module.exports = function(tpl, view, stc, svc) {
		var _vm = null ;
		var _dely = 60 ;
		require('../styles/user.findpwd.css') ;
		require('../../plugs/md5.min.js') ;
		tpl.m_on("init", function() {
			_vm = this.m_vm({
				data : {
					title : "找回密码",
					model : {},
					wtext : _dely + 's',
					form : {
						// 先请求验证码接口，成功，提交保存
						onsubmit : function() {  
							var _mdpassword1 = md5(_vm.model.newPwd1);
							var _mdfinalpassword1 = md5(_mdpassword1 + _vm.model.mobile); 
							_vm.model.newPwd1 = _mdfinalpassword1 ;
							var _mdpassword2 = md5(_vm.model.newPwd2);
							var _mdfinalpassword2 = md5(_mdpassword2 + _vm.model.mobile); 
							_vm.model.newPwd2 = _mdfinalpassword2 ;
							app.service.user.m_refresh_password(_vm.model, function(ds) {
								app.modal.m_alert('提示', '密码修改成功!', function() {
									svc.m_back('user.login') ;
								}) ;
								view.m_reset_button('.submit') ;
							}, function(err) {
								view.m_reset_button('.submit') ;
								app.modal.m_alert('提示', err.errorMessage) ;
							}) ;
						},
						oninvalid : function(errs) {
							view.m_reset_button('.submit') ;
						}
					}
				},
				methods : {
					m_reset : function() {
						this.model = {
							mobile : null,
							smsCode : null,
							newPwd1 : null,
							newPwd2 : null,
						}
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
							var _mobile = _vm.model.mobile ;
							if(_e_mobile.m_valid(true)) {
								app.loader.m_show(30) ;
								app.service.sms.m_send_findpwd_code(_mobile, function(data) {
									app.toast.m_show_ok('发送成功!') ;
									app.loader.m_hide() ;
									_vm.m_count_down() ;
									_vm.model.smsId = data.smsId ; // 短信 id
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
				}
			}) ;
		}) ;
		tpl.m_on("refresh", function() {
			/* 每当模板渲染时触发 */
			_vm.m_reset() ;	
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

		view.m_on("leave.back", function() {
			/* 当 view 离开时触发 (如果有过度动画, 将会在过度之后触发) */
			_vm.m_reset() ;
		}) ;

		view.m_on("message", function(ev, msg) {
			/* 当 view 进入后, 从消息队列中获取消息列表, 循环触发 */
			// ev 事件源
			// msg 消息对象 属性: name, params
			switch(msg.name) {
				case "mobile" : { // 监视消息名称
					// ... 
					_vm.model.mobile = msg.params ;
					break ;
				}
			}
		}) ;
	}
}) ;