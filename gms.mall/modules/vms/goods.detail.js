define(function(require, exports, module) {
			module.exports = function(tpl, view, stc, svc) {
				require('../styles/goods.detail.css');
				var _vm = null;
				tpl.m_on("init", function() {
					_vm = this.m_vm({
						data: {
							title: "商品详情",
							tab_index: 0,
							discuss_list: [],
							page_size: 10,
							curr_page: 1,
							status: null,
							swiper: {},
							id: view.query.id,
							list: {},
							renders: {
								default: {
									model: {
										message: [],
										collectionPic: [],
										explain: null,
									},
									ondata: function() {
										return new Promise(function(next) {
											var _data = {
												id: view.query.id
											}
											app.service.goods.m_detail(_data, function(ds) {
												var _list = [];
												_data = {
													goodsId: ds.data.goods[0].id,
													goodsImages: ds.data.goods[0].mainImages,
													goodsName: ds.data.goods[0].goodsName,
													goodsPrice: ds.data.goods[0].sellingPrice,
													goodsFreight: ds.data.goods[0].freight,
													num: null,
													form: 1
												}

												_list.push(_data);
												var _item = null;
												for(var i = 0; i < ds.data.goods.length; i++) {
													_item = ds.data.goods[i];
												}
												console.log(ds.data.goods)
												next({
													message: ds.data.goods,
													collectionPic: _item.images,
													explain: ds.data.goodsDesc,
												});
												_vm.data = _list;
											}, function(err) {
												app.modal.m_error('校验失败', err);
											});
										});
									}
								}
							}
						},
						watch: {
							tab_index: function(data) {
								if(1 == data && this.user) {
									_vm.m_load_comment_list();
								}
							}
						},
						computed: {
							user: function() {
								return app.data.user;
							}
						},
						methods: {
							//获取评论列表
							m_load_comment_list: function() {
								var _user = app.data.user;
								var _data = {
									id: _vm.id,
									pageSize: _vm.page_size,
									curPage: _vm.curr_page,
									memberId: _user.id,
								};
								app.service.comment.m_list(_data, function(ds) {
									_vm.discuss_list = ds.data.rows;
								}, function(err) {
									app.modal.m_error('提示', err);
								});
							},
							m_load_commrnt_next_page: function() {
								_vm.curr_page++;
								_vm.m_load_comment_list();
							},
							m_load_comment_prev_page: function() {
								_vm.curr_page--;
								_vm.m_load_comment_list();
							},
							// 提交评论
							m_add_comment: function() {
								app.modal.m_editor('评论', 'text', '', '请输入评论内容', function(text) {
									var _user = app.data.user;
									var _data = {
										goodsId: _vm.id,
										content: text,
										memberId: _user.id,
									}
									app.service.comment.m_save(_data, function(ds) {
										/*成功*/
										app.toast.m_show_text(ds.data);
										_vm.m_load_comment_list()
									}, function(err) {
										app.modal.m_error('提示', err);
									})
								});
							},
							m_joincart: function() {
								if(!this.user) { //去登录
									svc.m_push('user.login');
								} else { //否则去确认订单
									var _data = {
										goodsId: _vm.id,
										memberId: this.user.id,
									}
									app.service.car.m_join(_data, function(ds) {
										app.toast.m_show_ok("加入成功");
									}, function(err) {
										app.modal.m_error('提示', err);
									});
								}
							},
							m_toggle_zan: function(el) {
								var _user = app.data.user;
								var _data = {
									goodsId: _vm.id,
									memberId: _user.id,
									discussId: el.id,
									opType: el.hasZan ? 0 : 1
								}
								app.service.zan.m_point(_data, function(ds) {
									el.hasZan = !el.hasZan;
									app.toast.m_show_text(ds.data)
								}, function(err) {
									app.modal.m_error('提示', err)
								});
							},
							// 点击购买
							// 
							m_buy: function() {
								var _user = app.data.user;
								if(!_user) { //去登录
									svc.m_push('user.login');
								} else { //否则去确认订单
									svc.m_push('order.confirm');
									var _goodslist = _vm.data;
									app.session.m_set('order.confirm.data', _goodslist);
								}
							},
							m_call: function() { // 联系客服
								app.toast.m_show_text('即将开放,敬请期待..')
							},
							m_photo_browse: function() {
								app.session.m_set('photo.browse.list', this.$model.collectionPic);
								app.session.m_set('photo.browse.index', this.swiper.m_get_index());
								svc.m_push('photo.browse');
							},
							m_local: function() {
								if(!!app.data.user) {
									var _id = app.data.user.id;
									app.service.agent.m_detail({
										memberId: _id
									}, function(ds) {
										
										_vm.list = ds.data;
									}, function(err) {
										_vm.list.mobile = '0592-5796738';
									})
								} else {
									_vm.list.mobile = '0592-5796738';
								}
							}
						}
					});
				});
				tpl.m_on('refresh', function() {
						/* 每当模板渲染时触发 */
						_vm.m_local();
						
						if(undefined !== view.query.menberid) {
							app.session.m_set('parentid', view.query.menberid)
						}
						//页面只刷新一次
//							var u = navigator.userAgent,
//								appVer = navigator.appVersion;
//							var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器   
//							var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端    
//							if(isAndroid) {
//								var url = location.href;
//							var reload = url.split('?');
//							if(reload[1].substr(-1) != '&') {
//								url += '&';
//
//								location.reload();
//							}
//								location.href = url;
							
//							}


//							var url = location.href;
//							var reload = url.split('?');
//							if(reload[1].substr(-1) != '&') {
//								url += '&';
//									location.reload();
//		
//							}
//							location.href = url;


							return _vm.m_refresh();
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

					view.m_on("message", function(ev, msg) {
						/* 当 view 进入后, 从消息队列中获取消息列表, 循环触发 */
						// ev 事件源
						// msg 消息对象 属性: name, params
						switch(msg.name) {
							case "<name>":
								{ // 监视消息名称
									// ... 
									break;
								}
						}
					});
				}
			});