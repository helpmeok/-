define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/card.css') ;
        var _vm = null;
        tpl.m_on("init", function() {
            _vm = this.m_vm({
                data: {
                    title : "我的银行卡",
                    list : [],
                    icom : 'http://7xkvov.com2.z0.glb.qiniucdn.com/@/data/banklogo/boc.ico', 
                    renders: {
                        default: {
                            model: {
                                list : [] ,
                            },
                            ondata: function() {
                                return new Promise(function(next) {
                                    var _user = app.data.user ;
                                	var _data = {
                                		memberId : _user.id,
                                	}
                                    app.service.bank.m_list(_data, function(ds) {
                                    	var _data = ds.data ;
                                        next({
                                        	list : _data
                                        }) ;
                                    }) ;
                                });
                            }
                        }
                    }
                },
                methods: {
                    m_remove_from_list : function(el) {
                        var _user = app.data.user ;
                    	app.modal.m_confirm('提示', '是否删除该银行卡', function() {
                    		var _param = {
                    			memberId : _user.id ,
                    			id : el.id ,
                    		}
                    		app.service.bank.m_remove(_param , function(ds) {//请求成功
                    		    //解约成功
                    		    app.toast.m_show_ok(ds.data.message) ;
                    		    _vm.$model.list.remove(el) ;
                    		} , function(err) {
                    		    //解约失败
                    		    app.toast.m_show_ok(err.data.message) ;
                    		})  
                    	})
                    },
                    m_my_back:function () {
                        console.log("触发了回到首页的事件");
                        svc.m_back("#/home");
                    }
                }
            });
        });

        tpl.m_on('refresh', function() {
            /* 每当模板渲染时触发 */
            var _user = app.data.user ;
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
            switch (msg.name) {
                case "<name>":
                    { // 监视消息名称
                        // ... 
                        break;
                    }
            }
        });


    }
});