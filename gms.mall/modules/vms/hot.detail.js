define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/hot.detail.css') ; // 载入 css 样式表
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : '热门资讯',
                    status : '2',
                    goodslist : [],
                    svl : new SepVirtualList({
                        size : 20,
                        buffer : 10,
                        ih : 134 + 10
                    }),
                    // renders : {
                    //     default : {
                    //         model : {
                    //             list : []
                    //         },
                    //         ondata : function() {
                    //             return new Promise(function(next, fail) {
                    //                 var _user = app.data.user ;
                    //                 var _data = {
                    //                     memberId : _user.id,
                    //                     status : _vm.status
                    //                 } ;
                    //                 app.service.order.m_list(_data, function(ds) {
                    //                     next({
                    //                         list : ds.data
                    //                     }) ;
                    //                     _vm.svl.m_bind(ds.data) ;
                    //                 }, function(err) {
                    //                     fail(err) ;
                    //                 }) ;
                    //             })
                    //         },
                    //         ondata_after : function() {
                    //         }
                    //     }
                    // }
                },
                // computed : {
                //     toggle_checked : function() {
                //         return 0 != this.unpay_size && this.unpay_size == this.$model.list.length && this.unpay_size == this.choose_counter ;
                //     },
                //     choose_counter : function() {
                //         var _counter = 0 ;
                //         _vm.goodslist = [] ;
                //         this.m_foreach_goods(function(item) {
                //             if(item.checked) {
                //                 _counter ++ ;
                //                 _vm.goodslist.push(item) ;

                //             }
                //         }) ;
                //         return _counter ;
                //     },
                //     unpay_size : function() {
                //         var _size = 0 ;
                //         this.m_foreach_goods(function(item) {
                //             if(1 == item.status) {
                //                 _size ++ ;
                //             }
                //         }) ;
                //         return _size ;
                //     }
                // },
                methods : {

                    m_change_tab_type : function(data) {
                        this.status = data ;
                    }


                    // m_foreach_goods : function(callback) { // 遍历所有商品
                    //     var _list = this.$model.list ;
                    //     var _item = null ;
                    //     for(var i = 0; i < _list.length; i++) {
                    //         _item = _list[i] ;
                    //         if($.isFunction(callback)) {
                    //             callback.call(this, _item) ;
                    //         }
                    //     }
                    // },
                    // m_toggle_checked : function(ev) {
                    //     var _checked = ev.target.checked ;
                    //     this.m_foreach_goods(function(item) {
                    //         item.checked = _checked ;
                    //     }) ;
                    // },
                    // m_pay : function(el) {
                    //     var list = [] ;
                    //     var _data  = {
                    //         goodsId : el.goodsId,
                    //         goodsImages : el.goodsImages,
                    //         goodsName : el.goodsName,
                    //         goodsPrice : el.goodsPrice,
                    //         goodsFreight : el.freight,
                    //         num : el.num,
                    //         orderNo : el.orderNo,
                    //         serialNo : el.serialNo,
                    //         flag : 1 // 表示需要去支付
                    //     } ;
                    //     list.push(_data) ;
                    //     svc.m_push('order.confirm') ;
                    //     app.session.m_set('order.confirm.data', list) ;
                    // }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
            // _vm.status = view.query.status ;
            // if(!_vm.status) {
            //     _vm.status = '' ;
            // }
            // _vm.$watch('status', function() {
            //     _vm.m_refresh() ;
            // }) ;
            // return _vm.m_refresh() ;
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
                
                case 'payok' : {
                    
                    break ;
                }
                case 'paycancel' : {
               
                    break ;
                }
            }
        }) ;
    }
}) ;