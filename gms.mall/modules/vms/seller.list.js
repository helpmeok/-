define(function(require, exports, module) {
    require('../styles/seller.list.css') ;
    module.exports = function(tpl, view, stc, svc) {
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : '商家中心',
                    status : 0,
                    renders : {
                        default : {
                            model : {
                                list : []
                            },
                            ondata : function() {
                                return new Promise(function(next, fail) {
                                    var _merchantId = view.query.merchantId ;
                                    var _data = {
                                        merchantId : _merchantId,
                                        optype : _vm.status
                                    } ;
                                    app.service.seller.m_list(_data, function(ds) {
                                        next({
                                            list : ds.data
                                        }) ;
                                        // _vm.svl.m_bind(ds.data) ;
                                        console.log(ds);
                                    }, function(err) {
                                        fail(err) ;
                                    }) ;
                                })
                            },
                            ondata_after : function() {
                                
                            }
                        }
                    }
                },
                methods : {
                    m_push:function () {
                        svc.m_push("gdsGoods.update.mobile");
                    }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {

            _vm.$watch('status', function() {
                _vm.m_refresh() ;
            }) ;
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

        // view.m_on("message", function(ev, msg) {
        //     /* 当 view 进入后, 从消息队列中获取消息列表, 循环触发 */
        //     // ev 事件源
        //     // msg 消息对象 属性: name, params
        //     switch(msg.name) {
        //         case "info" : { // 监视消息名称
        //             // ... 
        //             console.log(msg.params) ;
        //             _vm. goods_freight = msg.params.goods_freight ;
        //             _vm.total_freight = msg.params.total_freight ;
        //         }
        //     }
        // }) ;
    }
}) ;