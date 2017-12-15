define(function(require, exports, module) {
	module.exports = function(tpl, view, stc, svc) {
		var _vm = null ;
		require('tpls.css') ;
		require('../styles/user.center.css') ;
		var _url = null ;
		tpl.m_on("init", function() {
			_vm = this.m_vm({
				data : {
					user : null,
					memberType : null,
					actionsheet : {},
					scroll : {},
					name : null,
					title : "个人中心",
					pic : 'data:image/png;base64,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'
				},
				methods : {
					m_push : function(url) { // 用户设置
						var _user = app.data.user ;
						if(!_user) {
							svc.m_push('user.login') ;
						} else {
							svc.m_push(url) ;
							// _url = url ;
							// svc.m_force_put_msg('user.login', 'code', '1') ;
							// svc.m_push('user.login?source={source}&location={location}&flag=2'
							// 	.replace('{source}', 'user.center')
							// 	.replace('{location}', 'user.center')) ;
						}
					},
					m_load_info : function() {
						var _user = app.data.user ;
						var _data = {
							id : _user.id
						} ;
						app.service.user.m_get_info(_data, function(ds) {
							app.session.m_set('balance', ds.data.balance) ;
							_vm.memberType = ds.data.memberType ;
							_vm.user = ds.data ;
						}, function(err) {
							app.modal.m_error("提示", err) ;
						})
					},
					m_share : function() {
						_vm.actionsheet.m_show() ;
					},
					m_set : function() {//用户类型
						/**
						* 1.memberType ：1 ,普通用户
						* 2.memberType ：2 ,专家用户
						*/
						var _user = app.data.user ;
						console.log(_user)
						if (!_user) {	
							svc.m_push('user.login') ;
						} else {
							svc.m_push('distri.detail') ;
						}
					}
				}
			}) ;
		}) ;
		
		tpl.m_on("refresh", function() {
			/* 每当模板渲染时触发 */
			_vm.user = app.data.user ;
			console.log(_vm.user)
			if(_vm.user) {
				_vm.m_load_info() ;	
			}
			if(undefined !== view.query.menberid) {
				app.session.m_set('parentid', view.query.menberid)
			}
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
			var _params = msg.params ;
			switch(msg.name) {
				case "save" : { // 监视消息名称
					// ... 
					view.m_downpull() ;
					break ;
				}
				case 'user.login' : { // 用户登陆成功
					// 开始下拉摔性能
					view.m_downpull().then(function() {
						if('1' == _params.code) {
							svc.m_push(_url) ;		
						}
					}) ;
					break ;
				}
				case 'logout' : {
					view.m_downpull().then(function() {

					}) ;
					break ;
				}
			}
		}) ;
	}
}) ;

