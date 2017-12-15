define(function(require, exports, module) {
	module.exports = function(tpl, view, stc, svc) {
		require('../styles/home.css'); // 载入 css 样式表
		var _vm = null;
		tpl.m_on("init", function() {
			_vm = tpl.m_vm({
				data: {
					title: '古美术商城',
					tel: {},
					renders: {
						ads: {
							model: {
								list: []
							},
							ondata: function() {
								return new Promise(function(next, fail) {
									app.service.ads.m_list(null, function(ds) {
										next({
											list: ds.data
										});
									}, function(err) {
										app.modal.m_error('提示', err);
										fail(err);
									});
								});
							}
						},
						category: {
							model: {
								list: []
							},
							ondata: function() {
								return new Promise(function(next, fail) {
									app.service.category.m_all_list(null, function(ds) {
										_vm.list = ds.data;
										next({
											list: ds.data
										});
									}, fail);
								});
							}
						},
						out: {
							model: {
								list: []
							},
							ondata: function() {
								return new Promise(function(next, fail) {
									app.service.home.out.m_list(null, function(ds) {
										next({
											list: ds
										});
									}, fail);
								});
							}
						},
						// //活动频道
						// act : {
						// 	model : {
						// 		list : []
						// 	},
						// 	ondata : function() {
						// 		return new Promise(function(next, fail) {
						// 			app.service.act.m_list(null, function(ds) {
						// 				next({list : ds.list}) ;
						// 			}, fail) ;
						// 		}) ;
						// 	}
						// },
						foot: {
							model: {
								list: []
							},
							ondata: function() {
								return new Promise(function(next, fail) {
									app.service.home.foot.m_list(null, function(ds) {
										next({
											list: ds.list
										});
									}, fail);
								});
							}
						},
						goodslist: {
							model: {
								list: []
							},
							ondata: function() {
								return new Promise(function(next, fall) {
									app.service.category.m_list(null, function(ds) {
										next({
											list: ds.data
										});
									})
								})
							}
						},
						hot: {
							model: {
								list: []
							},
							ondata: function() {
								return new Promise(function(next, fall) {
									var _data = {
										more: false,
										newsTypeId: null
									};
									app.service.hot.m_list(_data, function(ds) { //热门资讯
										next({
											list: ds.data.newsList
										});
									})
								})
							}
						},
						fine: {
							model: {
								list: []
							},
							ondata: function() {
								return new Promise(function(next, fall) {
									app.service.fine.m_list(null, function(ds) { //精品资讯
										next({
											list: ds.data.slice(0, 6)
										});
									})
								})
							}
						}
					}
				},
				methods: {
					m_push: function(el) {
						var url = 'area.detail?type=' + el;
						svc.m_push(url);
					},
					m_poo: function() {
						svc.m_pop('share');
					},
					m_hot_detail: function() {
						svc.m_push('hot.detail');
					},
					m_content: function(data) {
						var ds = data.content;
						app.session.m_set("d", ds);
						svc.m_push('hot.list');
					},
					m_category: function(data) {
						var url = 'category.list.alone?id=' + data.id + '&&title=' + data.classifyName;
						svc.m_push(url);
					},
					m_fine: function() {
						svc.m_push('fine.list');
					},
					m_fine_push: function(el) {
						var url = 'goods.detail?id=' + el.goodsId;
						svc.m_push(url);
					},
					m_load: function() {
						var url = 'seckill.act';
						svc.m_push(url);
					},
					m_get_formios: function() {
						var m = view.query.mobile;
						var p = view.query.password;
						if(undefined !== m && undefined !== p) { //iOS已经把参数带到地址栏
							// 去登录
							var _param = {
								mobile: m,
								password: p,
								oauthType: 4,
								msgCode: null
							};
							app.service.user.m_login(_param, function(ds) {
								app.data.user = ds.data.member;

							}, function(err) {
								app.modal.m_error('提示', err);
							});
						}
					},
					m_tel_phone: function() {
//						如果有登录

						if (!!app.data.user) {
							var _id = app.data.user.id;
						app.service.agent.m_detail({
							memberId: _id
						}, function(ds) {
                        console.log( ds.data)
							_vm.tel = ds.data.mobile
							
						}, function(err) {
							_vm.tel = '0592-5796738'
						})
						}else{
							_vm.tel = '0592-5796738'
						}
					},
					m_ceshi:function(){
						console.log('111')
					}
				}
			});
		});

		tpl.m_on('refresh', function() {
			// 连接进来

			_vm.m_get_formios();
			setTimeout(function() {
				_vm.m_tel_phone();
			}, 500)
			return _vm.m_refresh();
		});

		view.m_on("active", function() {
			/* 当 view 激活时触发(在 enter 事件之前, 简单点说如果有过度动画, 将会在过度之前触发) */
			var str = location.href;
			console.log(str)
			if(str.indexOf('=') != -1) {
				if(!!str.split('=')[1].substr(0, 32)) {
					var _id = str.split('=')[1].substr(0, 32);
					localStorage.setItem('parentId', _id)
				}
			}

		});
		view.m_on("enter", function() {
			/* 当 view 进入时触发 */
			document.addEventListener('touchmove', touch, false);
			function delayImageLoad() {

				setTimeout(function() {
					// 遍历所有的图片
					$('.lazy').each(function(index,item) {
						if($(window).height() + $(document).scrollTop() >= $(this).offset().top) {
							$(this).attr('src', $(this).attr('data-original'))
						}
					})
				}, 50);
			}
			setTimeout(function () {
				delayImageLoad();
			},50)

			function touch(event) {
				delayImageLoad();
				// 当窗口大小改变或者文档滑动时，调用延迟加载方法进行判断
			}
			$(window).on('resize', delayImageLoad);
		});

		view.m_on("frozen", function() {
			/* 当 view 失效时触发 (如果有过度动画, 将会在过度之前触发) */
		});

		view.m_on("leave", function() {
			/* 当 view 离开时触发 (如果有过度动画, 将会在过度之后触发) */
		});
	}
});