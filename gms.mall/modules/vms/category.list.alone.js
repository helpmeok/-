define(function(require, exports, module) {
	module.exports = function(tpl, view, stc, svc) {
		require('../styles/category.list.alone.css'); // 载入 css 样式表
		var _vm = null;
		tpl.m_on("init", function() {
			_vm = tpl.m_vm({
				data: {
					title: view.query.title,
					renders: {
						default: {
							model: {
								list: []
							},
							ondata: function() {
								return new Promise(function(next, fall) {
									var _param = {
										classifyId: view.query.id,
										optype: 4
									}
									app.service.category.m_al_list(_param, function(ds) {
										next({
											list: ds.data.goods,
										});
									})
								})
							}
						},
					}
				},
				methods: {
					m_push: function(el) {
						var url = 'goods.detail?id=' + el.id;
						svc.m_push(url);
					}
				}
			});
		});
		tpl.m_on('refresh', function() {
			// 连接进来
			require('../styles/category.list.alone.css'); // 载入 css 样式表
			document.addEventListener('touchmove', touch, false);
			function delayImageLoad() {
				console.log('执行了')
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

	}
});