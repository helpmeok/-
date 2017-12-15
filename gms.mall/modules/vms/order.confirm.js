define(function (require, exports, module) {
    module.exports = function (tpl, view, stc, svc) {
        require('../styles/order.confirm.css'); // 载入 css 样式表
        var _vm = null;
        tpl.m_on("init", function () {
            _vm = tpl.m_vm({
                data: {
                    title: '订单确认',
                    address: null,
                    goods_detail: [],
                    goods_freight: 0, //运费
                    total_freight: 0, //快递合计金额
                    total: 0, //自提合计金额
                    order_ids: [],
                    serial_no: null,
                    goods_id: null, //订单号
                    from: 0,
                    payType: 4,
                    form: {
                        model: {
                            invoiceTitle: null,
                            ein: null,
                            addressId: null,
                            sendType: 1,
                            setInvoice: false,
                            remark: null
                        },
                        onsubmit: function (model) {
                            var _user = app.data.user;
                            model.memberId = _user.id;
                            model.goodsId = _vm.goods_id.join(';');
                            model.payType = _vm.payType;
                         
                            app.service.order.m_submit_confirm(model, function (ds) {
                                _vm.order_ids = ds.data.orderNos;
                                _vm.serial_no = ds.data.serialNo;
                                // 改变商品的状态
                                _vm.m_goods_wait_pay();
                                // _vm.m_payment();
                            }, function (err) {
                                app.modal.m_error('提示', err);
                            });
                        },
                        oninvalid: function () {
                            view.m_reset_button('.submit');
                        }
                    }
                },
                watch: {
                    payType: function (val) {
                        if ('3 == val') {
                            _vm.from = 0
                        }
                    }
                },
                methods: {
                    //支付方式
                    m_payment: function () {
                        var _send_type = _vm.form.model.sendType;
                        var _pay_type = _vm.payType;
                        var _total = 2 == _send_type ? this.total : this.total_freight;
                        _vm.form.model.balance = app.data.user.balance;
                        app.session.m_set('total',_total);
//                      app.session.m_set('balance.pay.data', {
//                          total: _total,
//                          order_ids: this.order_ids,
//                          serial_no: this.serial_no,
//                          balance: _vm.form.model.balance
//                      });
                        app.local.m_set('balance.pay.data', {
                            total: _total,
                            order_ids: this.order_ids,
                            serial_no: this.serial_no,
                            balance: _vm.form.model.balance
                        });
                        var _user = app.data.user;
                        var param = {
                            token: _user.token,
                            orderNo: _vm.order_ids.join(';'),
                            charge: _total
                        };
						console.log(_pay_type)
                        /*if ('pc' == app.m_device()) {
                            app.util.m_link(window.__api + '/api/pay/unionpay?token=' + param.token + '&&charge=' + param.charge + '&&orderNo=' + param.orderNo);
                        } else {
                            svc.m_push('union.pay');
                            app.session.m_set("url", param);
                        }*/

                        // 银联贷记卡支付
                         if(_pay_type == 3){
                             console.log("进入了银联贷记卡");
                             if ('pc' == app.m_device()) {
                                 app.util.m_link(window.__api + '/api/pay/unionpay?token=' + param.token + '&&charge=' + param.charge + '&&orderNo=' + param.orderNo);
                             } else {
                                 svc.m_push('union.pay');
                                 app.session.m_set("url", param);
                             }
                         }
                        // 银联储蓄卡支付
                         else if(_pay_type == 5){
                             console.log("进入了银联储蓄卡");
                             if ('pc' == app.m_device()) {
                                 app.util.m_link(window.__api + '/api/pay/unionpayDeposit?token=' + param.token + '&&charge=' + param.charge + '&&orderNo=' + param.orderNo);
                             } else {
                                 svc.m_push('union.pay');
                                 app.session.m_set("url", param);
                             }
                         }
                        // 余额支付
                         else{
                             svc.m_pop('balance.pay');
                         }
                    },
                    m_address_choose: function () { // 选择地址
                        if (1 == this.from) return;
                        var _id = null;
                        if (this.address) {
                            _id = this.address.id;
                        }
                        svc.m_push('address.list?source=order.confirm&id=' + _id);
                    },
                    m_load_defualt_address: function () {
                        var _user = app.data.user;
                        app.service.address.m_get_default({memberId: _user.id}, function (ds) {
                            if (ds.data) {
                                _vm.form.model.addressId = ds.data.id;
                            }
                            _vm.address = ds.data;
                        }, function (err) {
                            app.modal.m_error('提示', err);
                        });
                    },
                    m_goods_wait_pay: function () {
                        this.from = 1;
                        var _data = app.session.m_get('order.confirm.data');
                        for (var i = 0; i < _data.length; i++) {
                            _data[i].orderNo = _vm.order_ids[i];
                            _data[i].serialNo = _vm.serial_no;
                            _data[i].flag = 1;
                        }
                        app.session.m_set('order.confirm.data', _data);
                    },
                    m_load_goods_detail: function () {
                        var _item = null;
                        var _goods_freight = 0;
                        var _total_freight = 0;
                        var _total = 0;
                        var _goods_id = [];
                        var _order_ids = [];
                        var _serial_no = null;
                        var _from = 0;
                        var _data = app.session.m_get('order.confirm.data');
                        for (var i = 0; i < _data.length; i++) {
                            _item = _data[i];
                            _goods_freight += parseInt(_item.goodsFreight);
                            _goods_id.push(_item.goodsId);
                            if (null == _item.num) {
                                _item.num = 1;
                            }
                            if (1 == _item.flag) {
                                _from = 1;
                            }
                            _order_ids.push(_item.orderNo); // 收集订单号
                            _serial_no = _item.serialNo;
                            _total += parseInt(_item.goodsPrice * _item.num);
                            _total_freight += parseInt(_item.goodsPrice * _item.num) + parseInt(_item.goodsFreight);
                        }
                        _vm.from = _from;
                        _vm.goods_detail = _data;
                        _vm.goods_id = _goods_id;
                        _vm.goods_freight = _goods_freight;
                        _vm.total = _total;
                        _vm.order_ids = _order_ids;
                        _vm.serial_no = _serial_no;
                        _vm.total_freight = _total_freight;
                    }
                }
            });
        });

        tpl.m_on('refresh', function () {
            // 连接进来
            _vm.m_load_defualt_address();
            _vm.m_load_goods_detail();
            return _vm.m_refresh();
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
        view.m_on("message", function (ev, msg) {
            /* 当 view 进入后, 从消息队列中获取消息列表, 循环触发 */
            // ev 事件源
            // msg 消息对象 属性: name, params
            switch (msg.name) {
                case "address.choose" : { // 监视消息名称
                    // ... 
                    _vm.address = msg.params;
                    if (_vm.address) {
                        _vm.form.model.addressId = _vm.address.id;
                    }
                    // 放入缓存
                    app.toast.m_show_ok('地址已更改');
                    break;
                }
                case 'address.remove' : {
                    if (_vm.address && _vm.address.id == msg.params) {
                        _vm.address = null;
                        _vm.form.model.addressId = null;
                    }
                    break;
                }
                case 'payok' : {
                    svc.m_push('order.detail?id=' + _vm.serial_no);
                    break;
                }
                case 'paycancel' : {
                    svc.m_push('order.detail?id=' + _vm.serial_no);
                    break;
                }
            }
        });
    }
});