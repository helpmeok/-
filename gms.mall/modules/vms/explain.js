define(function(require, exports, module) {
    require('../styles/explain.css') ;
    module.exports = function(tpl, view, stc, svc) {
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : '',
                    id : '',
                },
                methods : {
                    m_load_init : function() {
                        var _id = view.query.id ;
                        _vm.id = _id
                        switch (_id)
                        {
                            case "1":
                                this.title = '品质保证'
                                break ;
                            case "2":
                                this.title ='支付方式'
                                break ;
                            case "3":
                                this.title ='售后服务'
                                break ;
                            case "4":
                                this.title ='帮助中心'
                                break ;
                        }
                    }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            _vm.m_load_init()
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