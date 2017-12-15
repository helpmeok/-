define(function (require, exports, module) {
    module.exports = function (tpl, view, stc, svc) {
        // require('../styles/user.reg.css') ; // 载入 css 样式表
        var _vm = null;
        tpl.m_on("init", function () {
            _vm = tpl.m_vm({
                data: {
                    title: '提现',
                    id: null,
                    balance: 0,
                    window: {},
                    bank_list: [],
                    bank_list_length: 0,
                    isIOS:null,
                    isAndroid:null,
                    count:0,
                    form: {
                        msgs: {},
                        model: {
                            memberId: '',
                            money: '',
                            memberBankCardId: ''
                        },
                        onsubmit: function (model) {
                            view.m_reset_button('.submit');

                            var param = {
                                memberId: _vm.id,
                                money: _vm.form.model.money,
                                memberBankCardId: _vm.form.model.memberBankCardId
                            };

                            app.service.user.m_apply_cash(
                                param,
                                function (res) {
                                    app.modal.m_alert("提示", res.data, function () {
                                    	svc.m_back_and_downpull()
                                    });
                                    
                                },
                                function (err) {
                                    app.modal.m_alert("提示", err.errorMessage, function () {
                                    });
                                }
                            );
                        },
                        oninvalid: function () {
                            view.m_reset_button('.submit');
                        }
                    }
                },
                methods: {
                    m_onload_info: function () {
                        var user = app.data.user;
                        _vm.id = user.id;

                        var param = {
                            memberId: _vm.id
                        };
                        app.service.user.m_find_mem_bank_card_list(
                            param,
                            function (res) {
                                _vm.bank_list = res.data;
                                _vm.bank_list_length = _vm.bank_list.length;
                            },
                            function (err) {
                                // console.log("请求失败");
                            }
                        )
                    },
                    m_my_back: function () {
                        svc.m_back_and_downpull();
                    },
                    m_push: function () {
                        svc.m_push('card.list');
                    },
                    m_select_handle:function  (a) {
                    	_vm.count++;
                    	 if (_vm.count%2==0) {
                    		$('.isAndroid').css({
                    			display:'none'
                    		})
                    	}else{
                    		$('.isAndroid').css({
                    			display:'block'
                    		})
                    	}
                    },
                    m_item_handle:function(a){
                    var id=	$(`.${a}`).data('id')
                    _vm.form.model.memberBankCardId = id;
                    var text = $(`.${a}`).text().trim()
                    console.log('111')
                    $('.select-text').text(text)
                    _vm.count++;
                    if (_vm.count%2==0) {
                    		$('.isAndroid').css({
                    			display:'none'
                    		})
                    	}else{
                    		$('.isAndroid').css({
                    			display:'block'
                    		})
                    	}
                    	 
                    }
                   
                }
            });
        });
        tpl.m_on('refresh', function () {
            // 连接进来
            _vm.m_onload_info();

            // 获取上一个页面的session值
            var _mGetInfo = app.session.m_get("mGetInfo");
            _vm.mGetInfo = _mGetInfo;
            _vm.balance = _vm.mGetInfo.balance;
            var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器   
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端   
			if (isiOS) {
				_vm.isIOS=true;
				_vm.isAndroid = false;
			}
			if (isAndroid) {
					
			       _vm.isIOS = false;
			       _vm.isAndroid = true;
			}
			
        });

        view.m_on("active", function () {
            /* 当 view 激活时触发(在 enter 事件之前, 简单点说如果有过度动画, 将会在过度之前触发) */
        });
        view.m_on("enter", function () {
            /* 当 view 进入时触发 */
        });

        view.m_on("frozen", function () {
            /* 当 view 失效时触发 (如果有过度动画, 将会在过度之前触发) */
        });

        view.m_on("leave", function () {
            /* 当 view 离开时触发 (如果有过度动画, 将会在过度之后触发) */
        });

    }
});