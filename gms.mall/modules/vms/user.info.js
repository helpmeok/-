define(function(require, exports, module) {
	module.exports = function(tpl, view, stc, svc) {
		// require('../styles/user.reg.css') ; // 载入 css 样式表
		var _vm = null;
		tpl.m_on("init", function() {
			_vm = tpl.m_vm({
				data: {
					title: '我的资料',
					form: {
						msgs: {},
						model: {
							nickname: null,
							memberName: null,
							identity: null,
							mobile: null,
							portraitUrl: null
						},
						onsubmit: function(model) {
							view.m_reset_button('.submit');
							// 调用保存用户信息接口
							app.service.user.m_save_info(model, function(ds) {
								app.toast.m_show_ok('保存成功');
								app.session.m_set('user', model);
								console.log(model);
								app.data.user = model;
								svc.m_back_and_refresh();
							}, function(err) {
								app.modal.m_error('提示', err);
							})
						},
						oninvalid: function() {
							view.m_reset_button('.submit');
						},
						onrefresh: function() {
							return new Promise(function(next, fail) {
								var _user = app.data.user;
								app.service.user.m_get_info({
									id: _user.id
								}, function(ds) {
									next(ds.data);
								}, function(err) {
									app.modal.m_error('提示', err);
								})
							});
						}
					}
				},
				methods: {

				}
			});
		});
		tpl.m_on('refresh', function() {
			// 连接进来
			$('input:text').on('touchstart', function(e) {
				if(e.target.setSelectionRange) {
					pos = e.target.selectionStart;
				}
				var cursorIndex = 0;
				if(document.selection) {
					// IE Support
					e.target.focus();
					var range = document.selection.createRange();
					console.log(range)
					range.moveStart('character', -e.target.value.length);
					cursorIndex = range.text.length;
					console.log(cursorIndex)
				} else if(e.target.selectionStart || e.target.selectionStart == '0') {
					// another support
					cursorIndex = e.target.selectionStart;
					console.log(cursorIndex)
				}
				if(e.target.setSelectionRange) {
					e.target.focus();
					e.target.setSelectionRange(pos, pos);
				} else if(e.target.createTextRange) {
					var range = e.target.createTextRange();
					range.collapse(true);
					range.moveEnd('character', pos);
					range.moveStart('character', pos);
					range.select();
				}
				return cursorIndex;

			})
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