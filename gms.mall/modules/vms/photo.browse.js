define(function(require, exports, module) {
	module.exports = function(tpl, view, stc, svc) {
		var _vm = null ;
		require('../styles/photo.browse.css') ;
		tpl.m_on("init", function() {
			_vm = this.m_vm({
				data : {
					title : '图片预览',
					index : 0,
					len : 0,
					swiper : {
						params : {
							onslide_change : function(index) {
								_vm.index = index + 1 ;
							},
							onready : function() {
								this.m_slide_to(_vm.index, 0) ;
							}
						}
					},
					renders : {
						default : {
							model : {
								list : []
							},
							ondata : function() {
								var _list = app.session.m_get('photo.browse.list') ;
								return new Promise(function(next, fail) {
									var _index = app.session.m_get('photo.browse.index') ;
									_vm.index = _index ;
									_vm.len = _list.length ;
									setTimeout(function() {
										next({
											list : _list
										}) ;
									}, 150) ;
									
								}) ;
							}
						}
					}
				},
				methods : {
					
				}
			}) ;
		}) ;
		tpl.m_on("refresh", function() {
			/* 每当模板渲染时触发 */
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
			_vm.index = 0 ;
			_vm.len = 0 ;
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