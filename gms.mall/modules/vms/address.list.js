define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/address.list.css') ; // 载入 css 样式表
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : '我的收货地址',
                    chooseid : null,
                    renders : {
                        default : {
                            model : {
                                list : []
                            },
                            ondata : function() {
                                return new Promise(function(next, fail) {
                                    var _user = app.data.user ;
                                    app.service.address.m_list({memberId : _user.id}, function(ds) {
                                        next({list : ds.data}) ;
                                    }, function(err) {
                                        app.modal.m_error('提示', err) ;
                                        fail(err)
                                    }) ;
                                }) ;
                            }
                        }
                    }
                },
                methods : {
                    m_choose : function(el) {
                        svc.m_force_put_msg('order.confirm', 'address.choose', el) ;
                        var _source = view.query.source ;
                        svc.m_back(_source) ;
                    },
                    m_address_edit : function(el) {
                        var _url = 'address.edit?source='+ view.query.source +'&id=' + el.id ;
                        svc.m_push(_url) ;
                        app.session.m_set('data', el) ;

                    }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
            _vm.chooseid = view.query.id ; 
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