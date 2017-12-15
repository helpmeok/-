define(function (require, exports, module) {
    module.exports = function (tpl, view, stc, svc) {
        require('../styles/order.detail.css');
        var _image_base = 'modules/images/order.detail';
        var _icons = {
            1: _image_base + '/icom1.png',
            2: _image_base + '/icom6.png',
            3: _image_base + '/icom6.png',
            4: _image_base + '/icom1.png',
            5: _image_base + '/icom4.png',
            6: _image_base + '/icom4.png',
            7: _image_base + '/icom4.png',
            8: _image_base + '/icom5.png',
            9: _image_base + '/icom5.png',
            10: _image_base + '/icom5.png',
            11: _image_base + '/icom2.png',
            12: _image_base + '/icom2.png',
            13: _image_base + '/icom3.png'
        };
        var _vm = null;
        tpl.m_on("init", function () {
            _vm = tpl.m_vm({
                data: {
                    title: '订单详情',
                    options: {},
                    orderStatus: null,
                    icons: _icons,
                    total: 0,
                    text: null,
                    order_ids: [],
                    id: null,
                    timers: 0,
                    out_timers: {},
                    orderNo: null,
                    goodsId:'',
                    tel:'',
                    renders: {
                        default: {
                            model: {
                                addressDetail: {},
                                goodsDetail: {},
                                orderDetail: {}
                            },
                            ondata: function () {
                                return new Promise(function (next, fail) {
                                    var _serial_no = view.query.id;
                                    var _user = app.data.user;
                                    _vm.id = _user.id;
                                    var _data = {
                                        memberId: _user.id,
                                        serialNo: _serial_no
                                    };
                                    app.service.order.m_detail(_data, function (ds) {
                                        var _item = null;
                                        var _list = ds.data;
                                        var _addressdetail = null;
                                        var _goodsdetail = null;
                                        var _orderdetail = null;
                                        var _total = 0;
                                        for (var i = 0; i < _list.orderDetailList.length; i++) {
                                            _item = _list.orderDetailList[i];
                                            _addressdetail = _item.addressDetail;
                                            _goodsdetail = _item.goodsDetail;
                                            _orderdetail = _item.orderDetail;
                                            _vm.orderStatus = parseInt(_orderdetail.orderStatus);
                                            _vm.orderNo = parseInt(_orderdetail.orderNo);
                                            _vm.order_ids.push(_orderdetail.orderNo);
                                            _vm.total = _orderdetail.orderPrice;
                                        }
                                        console.log(_vm.orderStatus)
                                       
                                        next({
                                            addressDetail: _addressdetail,
                                            goodsDetail: _goodsdetail,
                                            orderDetail: _orderdetail
                                        });
                                        
                                        _vm.timers = _orderdetail.orderTimestamp;
                                    }, function (err) {
                                        fail(err);
                                        app.modal.m_error('提示', err);
                                    })
                                });
                            }
                        }
                    }
                },
                methods: {
                    m_check_timer: function () { // 倒计时结束
                        _vm.orderStatus = "-1";
                    },
                    m_copy: function () {
                    	
                        var Clipboard = require('../../plugs/clipboard.min.js');
                        var _e_copy = $(this.$el).find('.copy').get(0); // 拿到 DOM 对象
                        var _clipboard = new Clipboard(_e_copy);
                        var _orderNo = _vm.order_ids.join(';');
                        _clipboard.on('success', function () { // 复制成功
                            app.toast.m_show_ok('已复制');
                        });
                        _clipboard.on('error', function () { // 复制错误
                            app.toast.m_show_no('复制失败')
                        });
                        _vm.text = _orderNo;
                    },
                    //拨打电话
                    m_call: function () {
//                         window.location.href = 'tel:400838626' ;
//                      app.toast.m_show_text('400838626')
                        
                    },
                    //选择支付方式
                    m_pay: function () {
                        _vm.options.m_show();
                    },
                    //余额支付
                    m_balance_pay: function () {
                        svc.m_pop('balance.pay');
                        _vm.options.m_hide();
                    },
                    // 微信支付
                    m_wechat_pay: function () {
                        var _user = app.data.user;
                        
                        app.wx.m_pay({
                            openid: _user.openid,
                            token: _user.token,
                            orderNo: _vm.order_ids.join(';'),
                            charge: _vm.total
                        }, function (ds) { // onok
                            _vm.options.m_hide();

                        }, function (err) { // onno
                        });
                    },
                    //支付宝支付
                    m_ali_pay: function () {
                        var _user = app.data.user;
                        app.ali.m_pay({
                            token: _user.token,
                            orderNo: _vm.order_ids.join(';'),
                            charge: _vm.total
                        }, function (ds) { // onok

                        }, function (err) { // onno
                        });
                    },
                    //银联支付
                    m_yl_pay: function () {
                        var _user = app.data.user;
                        var param = {
                            token: _user.token,
                            charge: _vm.renders.default.model.orderDetail.orderPrice,
                            orderNo: _vm.renders.default.model.orderDetail.orderNo
                        };
                        //支付总金额
                        //订单号
                        if ('pc' == app.m_device()) {
                            app.util.m_link(window.__api + '/api/pay/unionpay?token=' + param.token + '&&charge=' + param.charge + '&&orderNo=' + param.orderNo);
                        } else {
                            svc.m_push('union.pay');
                            app.session.m_set("url", param);
                        }
                    },
                    //退款
                    m_refund: function () {
							app.modal.m_confirm('提示', '确认要申请退款?', function () {
                           
                        })
                    },

                    //待发货
                    m_send: function () {

                    },

                    // 待付款
                    m_wait_pay: function () {

                    },
                    // 确认收货
                    m_receive: function () {
                        var params = {
                            orderNo: _vm.orderNo,
                            memberId: _vm.id
                        };
                        app.service.order.m_receive_goods(
                            params,
                            function (res) {
                                app.modal.m_alert("提示", res.data.message, function () {
                                });
                            },
                            function (err) {
                                app.modal.m_alert("提示", err.data.message, function () {
                                });
                            }
                        );
                    },

                    //取消订单
                    m_cancel_order: function () {
                        app.modal.m_confirm('提示', '确认取消订单?', function () {
                            var _user = app.data.user;
                            var _data = {
                                orderNo: _vm.order_ids.join(';'),
                                memberId: _user.id,
                            }
                            app.service.order.m_remove(_data, function (ds) {
                                app.toast.m_show_text('订单取消成功');
                                svc.m_back_and_downpull();

                            }, function (err) {
                                app.modal.m_error('提示', err)
                            })
                        })
                    },
                    //删除订单
                    m_delete_order: function () {
                        app.modal.m_confirm('提示', '确认删除订单?', function () {
                        	var _user = app.data.user;
                            var _data = {
                                orderNo: _vm.order_ids.join(';'),
                                memberId: _user.id,
                            }
                            app.service.order.m_remove(_data, function (ds) {
                                app.toast.m_show_text('订单取消成功');
                                svc.m_back_and_downpull();

                            }, function (err) {
                                app.modal.m_error('提示', err)
                            })
                        })
                    },
                    /**
                     *以下是判断是否显示按钮
                     */
                    // 订单超时取消， 订单已关闭，  已完成
                    m_has_del: function () {
                        var _status = [11, 12, 13];
                        return _status.contains(this.orderStatus);
                    },
                    // 取消订单
                    m_has_cancel: function () {
                        var _status = [1];
                        return _status.contains(this.orderStatus);
                    },
                    // 付款
                    m_has_pay: function () {
                        var _status = [1];
                        return _status.contains(this.orderStatus);
                    },

                    // 待付款
                    m_has_wait_pay: function () {
                        var _status = [];
                        return _status.contains(this.orderStatus);
                    },

                    // 待发货
                    m_has_send: function () {
                        var _status = [];
                        return _status.contains(this.orderStatus);
                    },

                    // 待收货  已收货 退款待审核
                    m_has_refund: function () {
                        var _status = [6, 7,2];
                        return _status.contains(this.orderStatus);
                    },
                    // 退货待审核,退货待收货
                    m_has_refund_order: function () {
                        var _status = [8, 9];
                        return _status.contains(this.orderStatus);
                    },
                    // 退款待审核
                    m_has_refund_audit: function () {
                        var _status = [7];
                        return _status.contains(this.orderStatus);
                    },
                    // 确认收货
                    m_has_receive: function () {
                        var _status = [3];
                        return _status.contains(this.orderStatus);
                    },
                    //跳转详情页
                    m_push:function(id){
                    	
                    	var url = "goods.detail?id="+ id
                    	svc.m_redirect(url);
//                  	svc.m_push(url);
                    },
					m_tel_phone: function() {
//						如果有登录
						if (!!app.data.user) {
							var _id = app.data.user.id;
						app.service.agent.m_detail({
							memberId: _id
						}, function(ds) {
							_vm.tel = ds.data.mobile;
						}, function(err) {
							_vm.tel = '0592-5796738'
						})
						}else{
							_vm.tel = '0592-5796738'
						}
					}
                }
            });
        });
        tpl.m_on('refresh', function () {
            // 连接进来

            setTimeout(function () {
                _vm.m_copy();
                _vm.m_tel_phone();
            }, 300);
            
            return _vm.m_refresh();
        });

        view.m_on("active", function () {
            /* 当 view 激活时触发(在 enter 事件之前, 简单点说如果有过度动画, 将会在过度之前触发) */
           _vm.goodsId = localStorage.getItem('goodsId')//获取商品详情的id
           setTimeout(function  () {
           app.session.m_set('total',_vm.total)
           },500)

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