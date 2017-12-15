define(function(require, exports, module) {
	module.exports = function(tpl, view, stc, svc) {
		var _vm = null ;
		require('../styles/help.add.css') ;
		tpl.m_on("init", function() {
			_vm = this.m_vm({
				data : {
					title : "我要反馈",
					// list : '[]',
					textlength : '' ,
					model : {
					    memberId : null,
					    professorName : null,
					    birthday : null,
					    job : null,
					    mobile : null,
					    bankCardNo : null,
					    idcnNo : null,
					    address : null,
					    marjor : null,
					    certificate : null,
					    idcnPicFront : null,
					    idcnPicBack : null,
					    sexType : null,
					    checked : true, //阅读协议
					},
					renders: {
					    default: {
					        model: {
					            
					        },
					        ondata: function() {
					            
					        }
					    }
					},
					form : {
                        model : {
                        	requestion : '' ,
                        	images : null,
                        },
                        onsubmit : function(model) {
                        	var _user = app.data.user ;
                        	model.memberId = _user.id ;

                        	app.service.help.m_add(model, function(ds) {
                        		app.modal.m_alert("提示", ds.data, function() {
                        			svc.m_back() ;	
                        			view.m_reset_button('.submit') ;
                        		})
                        		view.m_reset_button('.submit') ;
                        	}, function(err) {
                        		app.modal.m_error('提示', err) ;
                        		view.m_reset_button('.submit') ;
                        	})
                        },
                        oninvalid : function() {

                        }
                    }
				},
				methods : {
					
				}
			}) ;
		}) ;
		tpl.m_on("refresh", function() {
			/* 每当模板渲染时触发 */
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