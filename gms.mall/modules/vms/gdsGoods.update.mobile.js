define(function(require, exports, module) {

	module.exports = function(tpl, view, stc, svc) {
		require('../styles/gdsGoods.update.mobile.css'); // 载入 css 样式表
		var _vm = null;
		tpl.m_on("init", function() {
			_vm = tpl.m_vm({
				data: {
					title: '编辑商品',
					brand: [],
					calssify: [],
					calssify2: [],
					grand: [],
					years: [],
					rate: [],
					unit: [],
					count1: 0,
					count2: 0,
					count3: 0,
					count4: 0,
					count5: 0,
					count6: 0,
					model: {
						goodsCode: null,
						goodsName: null,
						goodsBrand: '',
						classifyIdFirst: '',
						classifyIdSecond: '',
						years: '',
						goodsPrice: null,
						grade: '',
						freight: null,
						boxCost: null,
						length: null,
						width: null,
						height: null,
						weight: null,
						unit: '',
						material: null,
						crafts: null,
						owner: null,
						style: null,
						shape: null,
						rate: '',
						images: '',
						imageArray: [],
						memberId: null,
						description: '',
						goodsSource:''
					},
					form: {
						model: {},
						onsubmit: function() {
							_vm.model.memberId = app.data.user.id;
							if(_vm.model.imageArray.length < 9) {
								app.modal.m_alert("提示", "图片不能少于9张", function() {});
								return false;
							}
							_vm.model.images = _vm.model.imageArray.join(";");
							console.log(_vm.model)
							if (_vm.model.goodsBrand=='佛教频道') {
								_vm.model.goodsBrand =9
							}
							if (_vm.model.goodsBrand=='日本回流') {
								_vm.model.goodsBrand =1
							}
							if (_vm.model.goodsBrand=='北美回流专区') {
								_vm.model.goodsBrand =3
							}
							if (_vm.model.goodsBrand=='景德镇') {
								_vm.model.goodsBrand =5
							}
							
							console.log(_vm.model)
							app.service.goods.m_insert_goods(
								_vm.model,
								function(res) {
									svc.m_back_and_downpull();
									// view.m_reset_button('.submit') ;
								},
								function(err) {
									// view.m_reset_button('.submit') ;
									console.log(err);
								}
							);

							view.m_refresh();
						},
						oninvalid: function() {
							view.m_reset_button('.submit');
						}
					}
				},
				methods: {
					m_find_insert_goods_info: function() {
						app.service.goods.m_find_insert_goods_info(
							null,
							function(res) {
								
								_vm.brand = res.data.brand;
								_vm.years = res.data.years;
								_vm.calssify = {};
								var len = res.data.calssify.length;
								while(len--) {
									_vm.calssify[res.data.calssify[len].value] = res.data.calssify[len];
								}
								_vm.grand = res.data.grand;
								_vm.rate = res.data.rate;
								_vm.unit = res.data.unit;
							},
							function(err) {
								console.log("请求失败");
							}
						)
					},
					m_my_back: function() {
						svc.m_back();
					},
					m_select_goodsBrand: function(a) {

						$(`.${a}`).css({
							background: 'cyan'
						}).siblings().css({
							background: '#FFFFFF'
						})
						var text = $(`.${a}`).text();
						$(`.${a}`).parent().css({
							display: 'none'
						}).siblings('.edit').children('p').text(text);
						
						_vm.model.goodsBrand = text.trim();
						console.log(_vm.model.goodsBrand)
					},
					m_box_goodsBrand: function() {
						_vm.count1++;
						$('.android-hide').css({
							display: 'none'
						})
						if(_vm.count1 % 2 == 0) {

							$('.mask-brand').css({
								display: 'none'
							})

						} else {
							$('.mask-brand').css({
								display: 'block'
							})
						}
					},
					m_select_years: function(a) {
						$(`.${a}`).css({
							background: 'cyan'
						}).siblings().css({
							background: '#FFFFFF'
						})
						var text = $(`.${a}`).text()
						$(`.${a}`).parent().css({
							display: 'none'
						}).siblings('.edit').children('p').text(text);
						var index = $(`.${a}`).index();
						_vm.model.years = index;
					},
					m_box_years: function() {
						_vm.count2++;
$('.android-hide').css({
							display: 'none'
						})
						if(_vm.count2 % 2 == 0) {

							$('.mask-years').css({
								display: 'none'
							})

						} else {
							$('.mask-years').css({
								display: 'block'
							})
						}
					},
					m_select_grand: function(a) {
						$(`.${a}`).css({
							background: 'cyan'
						}).siblings().css({
							background: '#FFFFFF'
						})
						var text = $(`.${a}`).text()
						$(`.${a}`).parent().css({
							display: 'none'
						}).siblings('.edit').children('p').text(text);
						var index = $(`.${a}`).index();
						_vm.model.grade = index;
					},
					m_box_grand: function() {
						_vm.count3++;
$('.android-hide').css({
							display: 'none'
						})
						if(_vm.count3 % 2 == 0) {

							$('.mask-grand').css({
								display: 'none'
							})

						} else {
							$('.mask-grand').css({
								display: 'block'
							})
						}
					},
					m_select_unit: function(a) {
						$(`.${a}`).css({
							background: 'cyan'
						}).siblings().css({
							background: '#FFFFFF'
						})
						var text = $(`.${a}`).text()
						$(`.${a}`).parent().css({
							display: 'none'
						}).siblings('.edit').children('p').text(text);
						var index = $(`.${a}`).index();
						_vm.model.unit = index;
					},
					m_box_unit: function() {
						_vm.count4++;
						$('.android-hide').css({
							display: 'none'
						})
						if(_vm.count4 % 2 == 0) {

							$('.mask-unit').css({
								display: 'none'
							})

						} else {
							$('.mask-unit').css({
								display: 'block'
							})
						}
					},
					m_select_calssify: function(a) {
						$(`.${a}`).css({
							background: 'cyan'
						}).siblings().css({
							background: '#FFFFFF'
						})
						var text = $(`.${a}`).text()
						$(`.${a}`).parent().css({
							display: 'none'
						}).siblings('.edit').children('p').text(text);
						var val = $(`.${a}`).attr('id')
						_vm.model.classifyIdFirst = val;
					},
					m_box_calssify: function() {
						_vm.count5++;
						$('.android-hide').css({
							display: 'none'
						})
						if(_vm.count5 % 2 == 0) {

							$('.mask-calssify').css({
								display: 'none'
							})

						} else {
							$('.mask-calssify').css({
								display: 'block'
							})
						}
					},
					m_select_rate: function(a) {
						$(`.${a}`).css({
							background: 'cyan'
						}).siblings().css({
							background: '#FFFFFF'
						})
						var text = $(`.${a}`).text()
						$(`.${a}`).parent().css({
							display: 'none'
						}).siblings('.edit').children('p').text(text);
						var index = $(`.${a}`).index()+1;
						console.log(index)
						_vm.model.rate = index;
					},
					m_box_rate: function() {

						_vm.count6++;
						$('.android-hide').css({
							display: 'none'
						})
						if(_vm.count6 % 2 == 0) {

							$('.mask-rate').css({
								display: 'none'
							})

						} else {
							$('.mask-rate').css({
								display: 'block'
							})
						}
					}
				}
			});
		});

		//      $('select').each(function(index,element) {
		//	console.log(element)
		//				
		//      })
		tpl.m_on('refresh', function() {
			// 连接进来
			_vm.m_find_insert_goods_info();

			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器   
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端   
			
			if(isAndroid) {
				$('.isIphone').css({
					display: 'none'
				})
				$('.isAndroid').css({
					display: 'block'
				})
			}else if(isiOS) {
				$('.isIphone').css({
					display: 'block'
				})
				$('.isAndroid').css({
					display: 'none'
				})
			}else{
				$('.isIphone').css({
					display: 'none'
				})
				$('.isAndroid').css({
					display: 'block'
				})
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
		view.m_on("message", function(ev, msg) {
			/* 当 view 进入后, 从消息队列中获取消息列表, 循环触发 */
			// ev 事件源
			// msg 消息对象 属性: name, params
			switch(msg.name) {
				case "state":
					{ // 监视消息名称
						// ...
						//
						_vm.model.checked = msg.params
						break;
					}
			}
		});

	}
});