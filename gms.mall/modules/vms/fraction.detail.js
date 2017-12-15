define(function(require, exports, module) {
	module.exports = function(tpl, view, stc, svc) {
		var _vm = null ;
        require('../styles/fraction.detail.css') ;
		tpl.m_on("init", function() {
			_vm = this.m_vm({
				data : {
					title : '评分系统' ,
                    monthScoreNum : 0,
                    dayScoreNum : 0,
                    desc : '',
					optype : 3,
					form : {
                        model : {
                            price : null,
                            goodsId : null,
                            memberId : null,
                            scoring : null,
                            // ----
                            grade : null,
                            years : null,
                            years : null,
                            material : null,
                            crafts : null,
                            style : null,
                            size : null,
                            source : null,
                            pictureQuality : null,
                            marketFever : null,
                            vals : {
                                grade : false,
                                years : false,
                                years : false,
                                material : false,
                                crafts : false,
                                style : false,
                                size : false,
                                source : false,
                                pictureQuality : false,
                                marketFever : false,    
                            },
                            description : '',
                        },
                        onrefresh : function() {
                            return new Promise(function(next, fail) {
                                var _user = app.data.user ;
                                var _data = {
                                     memberId : _user.id,
                                     optype : _vm.optype
                                } ;
                                app.service.distri.m_get_current(_data, function(ds) {
                                    with(ds) {
                                        _vm.dayScoreNum = data.dayScoreNum ;
                                        _vm.monthScoreNum = data.monthScoreNum ;    
                                    }
                                    if(ds.data.goodsDetail) {
                                        ds.data.goodsDetail.goodsId = ds.data.goodsDetail.id ;
                                        next(ds.data.goodsDetail) ;
                                    } else {
                                        next() ;
                                    }
                                }) ;
                            }) ;
                        },
                        onsubmit : function(model) { // 提交数据
                            var _user = app.data.user ;
                            var _user = app.data.user ;
                            var _form = this ;
                            var _data = model.vals ;
                            $.extend(_data, {
                                memberId : _user.id,
                                goodsId : model.goodsId,
                                description : _vm.desc,
                                scoring : _vm.total_score,
                                price : model.price
                            }) ;
                            app.modal.m_confirm("提示", "确认提交?", function() {
                                app.service.distri.m_add(_data, function(ds) {
                                    // app.toast.m_show_ok('已评分') ;
                                    //  
                                    app.toast.m_show_ok('评分成功') ;
                                    view.m_reset_button('.submit') ;
                                   _vm.desc = '' ;
                                    _form.m_reset() ;
                                    _form.m_refresh() ;
                                }, function(err) {
                                    app.modal.m_error('提示', err) ;
                                    view.m_reset_button('.submit') ;
                                }) ;
                            }, function(err) {
                                view.m_reset_button('.submit') ;
                            }) ;
                      
                        },
                        oninvalid : function() { // 表单无效
                            view.m_reset_button('.submit') ;
                        }
                    },
				},
				computed : {
				    total_score : function() {
				        //  总分 / 总条数 * 选中条数
				        var _keys = Object.keys(this.form.model.vals) ;
                        var _score = 10 ;
				        var _number = _keys.length ;
				        var _choose = 0 ;
                        for(var i = 0; i < _keys.length; i++) {
                            if(this.form.model.vals[_keys[i]]) {
                                _choose ++ ;
                            }
                        }
                        var _scoring =Math.floor(_score / _number * _choose) ;
				        return _scoring ;
				    }
				},
				methods : {


				}
			}) ;
		}) ;
		tpl.m_on("refresh", function() {
			/* 每当模板渲染时触发 */
			return _vm.form.m_refresh() ;
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