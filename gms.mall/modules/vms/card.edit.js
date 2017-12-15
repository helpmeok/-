define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        var _vm = null ;
        require('../styles/add.card.css') ;
        require('regions') ;
        tpl.m_on("init", function() {
            _vm = this.m_vm({
                data: {
                    title: "添加银行卡",
                    regions: window.m_get_regions(),
                    bank_list: [],
                    renders: {
                        default: {
                            model: {
                                province : '' ,         //当前选择的省份
                                city : '' ,             //当前选择的城市
                                district : '' ,         //当前选择的地区
                                banktype: '' ,          //银行类型
                                subbranch: '' ,         //支行
                                cardcode: '' ,          //银行卡号
                                cardholder: ''          //持卡人
                            },
                            ondata: function() {
                                return new Promise(function(next) {
                                    app.service.bank.m_find_bank_list (null,function(ds) {
                                        _vm.bank_list = ds.data;
                                        next();
                                    })
                                } )
                            }
                        }
                    },
                    form: {
                        onsubmit: function(data) {
                            var _user = app.data.user ;
                            var _param = {
                                memberId : _user.id ,
                                bankType : data.banktype ,
                                province : data.province ,
                                city : data.city + data.district,
                                subbranch : data.subbranch ,
                                cardNo : data.cardcode ,
                                cardHolder : data.cardholder ,
                            }
                            app.service.bank.m_add(_param , function(ds) {
                                app.modal.m_alert("提示" , ds.data.message , function() {
                                    svc.m_put_msg('money.mycard', 'save') ;
                                    svc.m_back_and_downpull() ;
                                }) ;
                                view.m_reset_button('.submit') ;
                            }, function(err) {
                                app.toast.m_show_text(err.data.message) ;
                                view.m_reset_button('.submit') ;
                            })
                        },
                        oninvalid: function(err) {
                            view.m_reset_button('.submit') ;
                        }
                    }
                },
                computed: {
                    citys : function() {
                        var _province = this.m_find_province(this.$model.province) ;
                        if(_province) {
                            return _province.city ;
                        } else {
                            return [] ;
                        }
                    },
                    areas : function() {
                        var _city = this.m_find_city(this.$model.province, this.$model.city) ;
                        if(_city) {
                            return _city.area ;
                        } else {
                            return [] ;
                        }
                    }
                },

                methods: {
                    m_find_province : function(name) {
                        if(null == name) return null ;
                        for(var i = 0; i < this.regions.length; i++) { 
                            var _province = this.regions[i] ;
                            if(_province.name == name) {
                                return _province ;
                            }
                        }
                        return null ;
                    },
                    m_find_city : function(province_name, city_name) {
                        if(!(province_name && city_name)) return null ;
                        var _province = this.m_find_province(province_name) ;
                        var _citys = _province.city ;
                        for(var i = 0; i < _citys.length; i++) {
                            if(_citys[i].name == city_name) {
                                return _citys[i] ;
                            }
                        }
                        return null ;
                    },
                    m_choose_province : function() {
                        _vm.$model.city = '';//当前选择的城市
                        _vm.$model.district = '';//当前选择的地区
                    },
                    m_choose_city : function() {
                        _vm.$model.district = '';//当前选择的地区
                    },
                    // m_load_bank_list: function() {
                    //     app.service.bank.m_list(null, function(data) {
                    //         _vm.bank_list = data.bankVoList;
                    //     });
                    //     
                    //     
                    // },
                    m_auto_format_card_code: function() { // 自动格式化卡号
                        var _val = this.$model.cardcode;
                        _val = _val.replace(/\s/g, '').replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
                        this.$model.cardcode = _val;
                    }
                }
            });
        });

        tpl.m_on('refresh', function() {
            /* 每当模板渲染时触发 */
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
