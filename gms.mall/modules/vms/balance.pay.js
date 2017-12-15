define(function(require, exports, module) {
	module.exports = function(tpl, view, stc, svc) {
		var _vm = null;
		var _dely = 60;
		tpl.m_on("init", function() {
			_vm = tpl.m_vm({
				computed: {
					title: function() {
						if(3 == this.step) {
							return '确认支付';
						} else {
							return '设置支付密码';
						}
					}
				},
				data: {
					balance: null, //账户可用余额
					total: 0, //总金额
					total_freight: 0, //快递合计金额
					order_ids: [],
					serial_no: null,
					wtext: _dely + 's',
					step: 1,
					form_step_1: { // 第一步的表单
						msgs: {},
						model: {
							businessType: 4,
							mobile: null,
							code: null
						},
						onsubmit: function() {
							var _data = {
								mobile: _vm.form_step_1.model.mobile,
								msgCode: _vm.form_step_1.model.code
							}
							app.service.balance.m_vd_step_1(_data, function(ds) {
								if(0 == ds.errorCode) {
									_vm.step = 2;
								}
							}, function(err) {});
						},
						oninvalid: function() {}
					},
					form_step_2: { // 第二步的表单
						model: {
							repassword: null,
							password: null
						},
						onsubmit: function() {
							var _user = app.data.user;
							var _repassword = _vm.form_step_2.model.repassword;
							var _password = _vm.form_step_2.model.password;
							var _data = {
								memberId: _user.id,
								password: _vm.form_step_2.model.password
							};
							app.service.balance.m_step_2(_data, function(ds) {
								if(0 == ds.errorCode && _repassword == _password) {
									_vm.step = 3;
								} else {
									app.toast.m_show_text('密码不一致');
								}
							}, function(err) {
								app.modal.m_error('提示', err);
							})
						},
						oninvalid: function() {

						}
					},
					form_step_3: { // 第三步的表单
						model: {
							password: null,
						},
						onsubmit: function() {
							var _user = app.data.user;
							var _data = {
								memberId: _user.id,
								password: _vm.form_step_3.model.password
							};
							app.service.balance.m_vd_step_3(_data, function(ds) {
								if(0 == parseInt(ds.data.code)) {
									_vm.m_pay();
								} else {
									app.toast.m_show_text('支付密码错误');
								}
								// 直接支付掉
							}, function(err) {
								app.modal.m_error('提示', err);
							});
							// svc.m_back_and_downpull() ;
						},
						oninvalid: function() {

						}
					}
				},
				methods: {
					//60s倒计时
					m_count_down: function() {
						var _timer = _dely;
						var _ir = setInterval(function() {
							if(_timer != 0) {
								_timer--;
								_vm.wtext = _timer + 's';
							} else {
								_vm.wtext = _dely + 's';
								clearInterval(_ir);
								view.m_reset_button('.req-code');
							}
						}, 1000);
					},
					m_pay: function() {
						var _user = app.data.user;
						console.log(_user)
						var _data = {
							token: _user.token,
							orderNo: _vm.order_ids.join(';'),
							charge: parseFloat(_vm.total)
						};
						app.service.balance.m_pay(_data, function(ds) {
							app.toast.m_show_text('支付成功，静待验货');
							var _source = view.query.source;
							svc.m_put_msg(_source, 'payok', _data);
							svc.m_back();
						}, function(err) {
							app.modal.m_error('提示', err);
						});
					},
					//获取验证码
					m_req_code: function() {
						if($$('.mobile').m_valid(true)) {
							app.loader.m_show(30);
							app.service.balance.m_get_code(_vm.form_step_1.model, function(ds) {
								app.loader.m_hide();
								app.toast.m_show_ok('发送成功');
								_vm.m_count_down();
							}, function(err) {
								app.loader.m_hide();
								app.modal.m_error('提示', err);
								view.m_reset_button('.req-code');
							});
						} else {
							view.m_reset_button('.req-code');
						}
					},
					m_whether_set_pwd: function() {
						var _user = app.data.user;
						var _data = {
							memberId: _user.id
						};
						app.service.balance.m_inquire_pwd(_data, function(ds) {
							if(ds.data.hasSet) {
								_vm.step = 3;
							} else {
								_vm.step = 1;
							}
						}, function(err) {
							app.modal.m_error('提示', err);
						})
					},
					//取消跳转订单详情
					m_cancel: function() {
						var _source = view.query.source;
						svc.m_put_msg(_source, 'paycancel');
					}
				}
			});
		});
		tpl.m_on('refresh', function() {
			// 连接进来
			var _data = app.local.m_get('balance.pay.data');
			var total = app.session.m_get('total')
			var url = location.href.split('#')[1].substr(0,12)=='order.detail'?true:false;
			console.log(_data)
			
			if(_data) {
				_vm.total = url?total:_data.total;
				_vm.order_ids = _data.order_ids;
				_vm.serial_no = _data.serial_no;
				_vm.balance = _data.balance;
			} else {
				app.modal.m_alert('提示', '缺少参数total');

			}
			_vm.m_whether_set_pwd();
			var _balance = app.session.m_get('balance');
			if(_balance) {
				_vm.balance = _balance;
			}
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

		// view.m_on("message", function(ev, msg) {
		//     /* 当 view 进入后, 从消息队列中获取消息列表, 循环触发 */
		//     // ev 事件源
		//     // msg 消息对象 属性: name, params
		//     switch(msg.name) {
		//         case "info" : { // 监视消息名称
		//             // ... 
		//             console.log(msg.params) ;
		//             _vm. goods_freight = msg.params.goods_freight ;
		//             _vm.total_freight = msg.params.total_freight ;
		//         }
		//     }
		// }) ;
	}
});