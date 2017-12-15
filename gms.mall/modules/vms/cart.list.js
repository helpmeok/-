define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/cart.list.css') ; // 载入 css 样式表
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    iseditor : false,
                    title : '购物车',
                    choose_counter : 0,
                    toggle_checked:false,
                    choose_list : [],
                    actionsheet : {
                        params : {
                            onshow_before : function() {
                                _vm.m_get_choose_list().then(function(data) {
                                    _vm.choose_list = data ;
                                }) ;
                                tpl.m_get_ele().find('.viewbox').addClass('effect') ;
                            },
                            onhide_before : function() {
                                tpl.m_get_ele().find('.viewbox').removeClass('effect') ;
                            }
                        }
                    },
                    renders : {
                        default : {
                            model : {
                                list : []
                            },
                            ondata : function() {
                                return new Promise(function(next, fail) {
                                    var _id = app.data.user.id ;
                                    app.service.cart.m_list({memberId : _id
                                    }, function(ds) {
                                        var _list = ds.data ;
                                        _list = _list ? _list : [] ;
                                        console.log(_list)
                                        next({list : _list}) ;
                                    }, function(err) {
                                        app.modal.m_error('提示', err) ;
                                    })
                                })
                            }
                        }
                    }
                },
                computed : {
                    //全选
//                  toggle_checked : function() {
//                      var _list = this.$model.list ;                        
//                      return 0 != this.choose_counter && (_list.length - this.abnormal_size) == this.choose_counter ;
//						
//                  },
                    abnormal_size : function() {
                        var _size = 0 ;
                        this.m_foreach_goods(function(item) {
                            if(item.hasOrder) {
                                _size ++ ;
                            }
                        }) ;
                        return _size ;
                    },
                    total : function() {
                        var _total = 0 ;
                        this.choose_counter = 0 ;
                        this.m_foreach_goods(function(item) {
                            if(item.checked) {
                                this.choose_counter ++ ;
                                _total += parseFloat(item.goodsPrice) * item.num ;
                            }
                        }) ;
                        return _total ;
                    }
                },
                methods : {
                    //确认下单
                    m_generate_order : function() {
                        var _goodslist = [] ;
                        this.m_foreach_goods(function(item) {
                            if(item.checked) {
                                var _data = {
                                    goodsId : item.goodsId,
                                    goodsImages : item.goodsImages,
                                    goodsName : item.goodsName,
                                    goodsPrice : item.goodsPrice,
                                    goodsFreight : item.goodsFreight,
                                    num : item.num,
                                    flag : 0 // 表示需要提交订单
                                }
                                _goodslist.push(_data) ;
                            }
                        }) ;
                        svc.m_push('order.confirm') ;
                        app.session.m_set('order.confirm.data', _goodslist) ;
                        this.actionsheet.m_hide() ;
                    },
                    m_get_choose_list : function() {
                        var _goodslist = [] ;
                        return new Promise(function(next) {
                            _vm.m_foreach_goods(function(item) {
                                if(item.checked) {
                                    _goodslist.push(item) ;
                                }
                            }) ;
                            next(_goodslist) ;
                        }) ;
                    },
                    //点击结算弹出
                    m_foreach_goods : function(callback) { // 遍历所有商品
                        var _list = this.$model.list ;
                        var _item = null ;
                        for(var i = 0; i < _list.length; i++) {
                            _item = _list[i] ;
                            if($.isFunction(callback)) {
                                callback.call(this, _item) ;
                            }
                        }
                    },
                    //删除异常商品
                    m_remove_abnormal : function() {
                        app.modal.m_confirm('提示', '是否确认删除异常商品?', function() {
                            var _user = app.data.user ;
                            app.service.goods.m_remove_abnormal({
                                memberId : _user.id,
                                optype : 2
                            }, function(ds) {
                                _vm.m_refresh() ;
                                app.toast.m_show_ok('删除成功') ;
                            }, function(err) {
                                app.modal.m_error('提示', err) ;
                            }) ;
                        }) ;
                    },
                    m_toggle_editor : function() { // 编辑
                        this.iseditor = !this.iseditor ;
                    }, 
                    //删除选中商品
                    m_choose_removes : function() { // 选中商品删除
                        var _goodsids = [] ;
                        var _goodslist = [] ;
                        this.m_foreach_goods(function(item) {
                            if(item.checked) {
                                _goodslist.push(item) ;
                                _goodsids.push(item.goodsId) ;    
                            }
                        }) ;
                        app.modal.m_confirm('提示', '是否确认删除选中商品?', function() {
                            var _user = app.data.user ;
                            app.service.goods.m_removes({
                                memberId : _user.id,
                                optype : 1,
                                goodsId : _goodsids.join(';')
                            }, function(ds) {
                                for(var i = 0; i < _goodslist.length; i++) {
                                    _vm.$model.list.remove(_goodslist[i]) ;
                                }
                                app.toast.m_show_ok('删除成功') ;
                            }, function(err) {
                                app.modal.m_error('提示', err) ;
                            }) ;
                        }) ;
                    },
                    //删除单个商品
                    m_remove : function(el) {
                        app.modal.m_confirm('提示', '是否确认删除该商品?', function() {
                            var _user = app.data.user ;
                            app.service.goods.m_removes({
                                memberId : _user.id,
                                optype : 1,
                                goodsId : el.goodsId
                            }, function(ds) {
                                _vm.$model.list.remove(el) ;
                                app.toast.m_show_ok('删除成功') ;
                            }, function(err) {
                                app.modal.m_error('提示', err) ;
                            }) ;
                        }) ;
                    },
                    //全选商品
                    m_toggle_checked : function(ev) {
                        var _checked = ev.target.checked ;
                        _vm.toggle_checked = _checked;
                        this.m_foreach_goods(function(item) {
                            if(item.hasOrder) {
                                item.checked = _checked ;
                            }
                        }) ;
                    },
                    //跳转到商品详情
                    m_push : function(el) {
                        var goodid = el.goodsId ;
                        svc.m_push("goods.detail?id="+ goodid) ;
                    }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
            _vm.iseditor = false ;
            return _vm.m_refresh() ;
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

    }
}) ;