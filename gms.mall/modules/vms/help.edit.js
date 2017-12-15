define(function(require, exports, module) {
	module.exports = function(tpl, view, stc, svc) {
		require('../styles/help.edit.css') ;
		var _vm = null ;
		tpl.m_on("init", function() {
			_vm = this.m_vm({
				data : {
					title : "帮助中心",
					date : '',
					state : null,
					renders: {
					    default: {
					        model: {
					        },
					        ondata: function() {
					        	return new Promise(function(next, fail) {
					        		app.service.help.m_edit(null, function(ds) {
					        			_vm.date = ds ;
					        			next(ds) ;
					        		}, function(err) {
					        		})
					        	})
					        }
					    }
					},
				},
				methods : {
					m_show : function() {
						if(undefined == app.data.user) {
							_vm.state = "0"//不显示
						}else{
							_vm.state = "1"//显示
						}
					}
				}
			}) ;
		}) ;
		tpl.m_on("refresh", function() {
			/* 每当模板渲染时触发 */
			 _vm.m_show() ;
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
				case "<name>" : { // 监视消息名称
					// ... 
					break ;
				}
			}
		}) ;
	}
}) ;