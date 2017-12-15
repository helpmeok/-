define(function(require, exports, module) {
	module.exports = function(tpl, view, stc, svc) {
		// require('../styles/user.reg.css') ; // 载入 css 样式表
		var _vm = null;
		tpl.m_on("init", function() {
			_vm = tpl.m_vm({
				data: {
					title: '设置中心',
					form: {
						onsubmit: function(model) {
							view.m_reset_button('.submit');
							app.modal.m_confirm('提示', '是否确认退出?', function() {
								app.data.user = null;
								app.session.m_remove('user');

								
								svc.m_back_and_refresh();
								if('iOS' == app.m_device()) { // 苹果设备
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
									bridge.callHandler('exit', {}, function responseCallback(responseData) {
										
									})
								})
									window.webkit.messageHandlers.exit.postMessage(null);
								} else if('android' == app.m_device()) { // 安卓设备
									_vm.s();
								}
							});
						},
						oninvalid: function() {
							view.m_reset_button('.submit');
						}
					}
				},
				methods: {
					m_copy_link: function() {

					},
					s: function() {
						// window.android.exit() ;
						window.android.exit();
					}
				}
			});
		});
		tpl.m_on('refresh', function() {
			// 连接进来
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