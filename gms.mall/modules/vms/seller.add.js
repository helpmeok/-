define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/seller.add.css') ; // 载入 css 样式表
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : '申请成为商家',
                    tel:'',
                    model : {
                        memberId :null, //会员ID
                        name : null, //商家名字
                        sexType : null, //性别 0男 1 女
                        mobile : null, //联系电话
                        idcnPicFront : null, //身份证正面照
                        idcnPicBack : null, //身份证反面照
                        address : null, //详细地址
                        companyName : null, //公司名字
                        orgCode : null, //组织机构代码
                        businessPic : null, //营业执照
                        checked : true //阅读协议
                   
                    },
                    form : {
                        model : {
                        },
                        onsubmit : function() {
                            _vm.model.memberId = app.data.user.id ;
                            console.log(_vm.model);
                            app.service.seller.m_add(
                                _vm.model,
                                function(ds) {
                                    console.log(ds);
                                    svc.m_pop('business?id=1');
                                    view.m_reset_button('.submit') ;
                                },
                                function(err) {
                                    console.log("请求失败");
                                    console.log(err);
                                    // if("12" === err.data.code) {
                                    //     svc.m_back() ;
                                    // }
                                app.toast.m_show_text(err.data.message) ;
                            });
                            view.m_reset_button('.submit') ;
                        },
                        oninvalid : function() {
                            view.m_reset_button('.submit') ;
                        }
                    }
                },
                methods : {
                    m_look : function() {
                        svc.m_pop('agreement') ;
                    },
                    m_get_tel:function  () {
                    	console.log(app.data.user)
                    	if (!!app.data.user) {
                    		var _id = app.data.user.id;
                    		var _data = {
                    			id:_id
                    		}
						app.service.user.m_get_info(_data, function(ds) {
									console.log(ds.data)
									_vm.model.mobile = ds.data.mobile;
						}, function(err) {
							
						})
                    	}else{
                    		svc.m_push('user.login?')
                    	}
                    }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
            // app.session.m_get
            _vm.m_get_tel()
        }) ;
        view.m_on("active", function() {
            /* 当 view 激活时触发(在 enter 事件之前, 简单点说如果有过度动画, 将会在过度之前触发) */  
        }) ;
        view.m_on("enter", function() {
            /* 当 view 进入时触发 */  
            // var l_checked =app.session.m_get('checked') ;///设置同意协议
            // _vm.model.checked = l_checked ;
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
            // 
            // 
            switch(msg.name) {
                case "state" : { // 监视消息名称
                    // ... 
                    _vm.model.checked = msg.params;
                    break ;
                }
            }
            
        }) ;
    }
}) ;