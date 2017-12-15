/*
	sepui main file ( 入口文件 )
*/
// ------------------ (start) -------------------
define(function(require, exports, module) {

	app.m_set_mode("mobile"); // 设置 app 模式 mobile or pc
	app.m_set_container($('.sepui')); // 设置 sepui 容器
	require("main.css");
	// 导入全局样式文件
	var _Wechat = require('./wechat'); // 引入系统公共微信模块
	var _Ali = require('./ali'); // 引入系统公共阿里模块
	require("//at.alicdn.com/t/font_294536_uuxllcyriokwqaor.css"); // 图标库
	require("//at.alicdn.com/t/font_431959_s1b76gdzot21emi.css");
	var _svc = new SepViewController(app.m_get_container()); // 创建一个视图控制器( 核心对象 svc )
	app.m_set_theme('base'); // 设置红色主题
	SepRequest.keys.status = 'errorCode';
	SepRequest.keys.info = 'message';
	SepRequest.codes.oks = [0]; // 正常
	SepRequest.codes.sessionlesses = [24002, 24001]; // 未登录
	function _m_is_weixin() {
		var _ua = window.navigator.userAgent.toLowerCase();
		if(_ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	}
	if(_m_is_weixin()) {
		app.m_get_container().addClass('weixin');
	}
	app.wx = new _Wechat();
	app.ali = new _Ali();
	/*
		微信登录
	*/
	function _m_wechat_login(token) {
		return new Promise(function(next, fail) {
			app.service.user.m_get_info_from_token(token, function(ds) {
				app.session.m_set('user', ds.data);
				next(ds.data);
			}, function(err) {
				fail(err);
				app.modal.m_error('提示', err);
			});
		});
	}
	/*
		缓存登录
	*/
	function _m_cache_login() {
		return new Promise(function(next, fail) {
			var _query = app.m_query();
			if(_query.token) { // 若存在 token 则通过微信登录
				_m_wechat_login(_query.token).then(next).catch(fail);
			} else {
				var _user = app.session.m_get('user');
				next(_user);
			}
		});
	}

	function _m_init() { // 初始化
		return new Promise(function(next) {
			// 这里可以做一些初始化的工作
			next();
		});
	}
	_m_init().then(function() {
		return new Promise(function(next) {
			_m_cache_login().then(next);
		});
	}).then(function(user) {
		// app.data.user = user ;
		if(user) { // 登录成功
			app.data.user = user;
		}
		app.m_set_title('古美术商城'); // 设置标题
		/* 关键视图配置代码 */
		_svc.m_config({
			async: false, // 不使用异步
			views: [{
					name: "home",
					path: "$root",
					slide_back: false
				}, // name : 视图名称 path : 视图URL路径 $root 表示根路径 slide_back 表示不可滑动
				{
					name: 'cart.list',
					slide_back: false
				}, // 购物车列表
				{
					name: 'user.center',
					slide_back: false
				}, // 用户中心
				{
					name: 'hot.detail'
				}, //热门资讯
				{
					name: 'hot.list'
				}, //资讯列表
				{
					name: 'fine.list'
				}, //资讯列表
				{
					name: 'category.list.alone'
				}, //资讯列表
				{
					name: 'category.list'
				}, // 分类列表
				{
					name: "goods.list"
				}, // 商品列表
				{
					name: 'area.detail'
				}, // 专区详情
				{
					name: "goods.detail"
				}, // 商品详情
				{
					name: 'order.list'
				}, // 订单列表
				{
					name: 'order.confirm'
				}, // 订单确认
				{
					name: 'order.detail'
				}, // 订单详情
				{
					name: 'msg.list'
				}, //消息中心
				{
					name: 'balance.pay',
					width: '80%',
					height: 'auto'
				},
				{
					name: 'card.list'
				}, //银行卡列表
				{
					name: 'card.edit'
				}, //添加银行卡
				{
					name: 'distri.detail'
				}, //分销详情
				{
					name: 'distri.order.detail'
				}, //分销订单详情
				{
					name: 'fraction.detail'
				}, //评分详情
				{
					name: 'photo.browse',
					animate: {
						name: 'vr'
					},
					downpull_refresh: null
				},
				{
					name: 'search',
					animate: {
						name: 'vr'
					}
				},
				{
					name: 'address.list'
				}, // 地址列表
				{
					name: 'address.edit'
				}, // 地址编辑
				{
					name: 'help.edit'
				}, // 帮助中心
				{
					name: 'help.list'
				}, // 帮助中心 - 问题列表
				{
					name: 'help.detail'
				}, // 帮助中心 - 问题详情
				{
					name: 'help.add'
				}, // 帮助中心 - 反馈提交
				{
					name: 'user.info'
				}, // 用户信息
				{
					name: 'user.settings'
				}, // 用户设置
				{
					name: 'user.balance'
				}, // 账户余额
				{
					name: 'user.balance.detail'
				}, //账户明细
				{
					name: 'user.recharge'
				}, // 账户充值
				{
					name: 'user.balance.extract'
				}, // 提现
				{
					name: 'user.extract.record'
				}, // 申请记录
				{
					name: 'user.update.password'
				}, // 修改登录密码
				{
					name: 'user.reg'
				}, // 用户注册
				{
					name: 'user.reg.second'
				}, // 用户注册2
				{
					name: 'user.reg.third'
				}, // 用户注册3
				{
					name: 'user.login',
					animate: {
						name: 'vr'
					},
					slide_back: false
				}, // 用户登录
				{
					name: 'agentlist'
				}, //经纪人列表
				{
					name: 'user.findpwd'
				}, //忘记密码
				{
					name: 'seller.add'
				}, //申请成为商家
				{
					name: 'seller.list'
				}, //商家中心
				{
					name: 'savant.list'
				}, //专家中心
				{
					name: 'savant.add'
				}, //申请成为专家
				{
					name: 'business',
					width: '90%',
					height: 'auto'
				},
				{
					name: 'explain',
					width: '90%',
					height: 'auto',
				},
				{
					name: 'agreement',
					width: '90%',
					height: '90%',
					slide_back: false
				},
				{
					name: 'seckill.act',
				}, //秒杀
				{
					name: 'seckill.detail'
				}, //秒杀详情
				{
					name: 'union.pay',
					animate: {
						name: 'vr'
					},
					slide_back: false
				}, //银联支付
				{
					name: 'share',
					height: 'auto',
					modal: false
				},
				{
					name: 'share.weixin',
					modal: false
				},
				{
					name: 'share.erweima',
					modal: false
				},
				{
					name: 'user.reward.extract'
				}, // 完善会员信息页面
				{
					name: 'card.list'
				}, // 绑定银行卡
				{
					name: 'union.recharge',
					animate: {
						name: 'vr'
					},
					slide_back: false
				}, //银联充值

				{
					name: 'gdsGoods.update.mobile'
				}, // 商品编辑页面【后台管理用的】
				{
					name: 'gdsGoods.list'
				} // 商品编辑页面【后台管理用的】
			]
		});
		app.m_init(_svc); // 整个应用开始初始化
		// app.m_set_welcome(['home']) ;
		_svc.m_set_mode(app.m_get_taste()); // 设置模式 app.m_get_mode() 可返回 极速模式 和 兼容模式
		// new _SepGlobal().m_install(_svc) ;
		/* 配置导航条 */
		var _nav = null;
		_svc.m_on('complete', function(ev, v) {
			// app.modal.m_editor('标题', 'text', '', '请输入评论内容') ;
			// app.modal.m_error = function() {

			// }
			app.modal.m_error = function(title, err) {
				if(-1 == SepRequest.codes.errors.indexOf(err.data[SepRequest.keys.status])) {
					app.modal.m_alert(title, err.data[SepRequest.keys.info]);
				}
			}
		});
		app.nav = _nav = new SepNav(_svc, ".nav", [ // 创建导航条
			{
				text: "首页",
				name: "$root",
				icon: "icon-home",
				onicon: "icon-homefill"
			},
			{
				text: "拍卖",
				name: "pm",
				onclick: function() {
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
						bridge.callHandler('back', {}, function responseCallback(responseData) {

						})
					})
					window.location.href = 'http://www.gmsweipai.com/gms.app/#/';
					window.webkit.messageHandlers.back.postMessage(null);
					return false;
				},
				icon: "icon-hammer",
				onicon: "icon-hammerfill"
			},
			{
				text: "购物车",
				name: "cart.list",
				icon: "icon-cart",
				onicon: "icon-cartfill"
			}, // 专题列表
			{
				text: "我的",
				name: "user.center",
				icon: "icon-my",
				onicon: "icon-myfill"
			}
		]);
		_svc.m_init(); // 视图控制器开始初始化
	}).catch(function(err) {});
});
// ------------------ (end) -------------------