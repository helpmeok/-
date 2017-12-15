define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/address.edit.css') ; // 载入 css 样式表
        require('regions') ;
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : null,
                    regions: window.m_get_regions(),
                    form : {
                        msgs : {},
                        model : {
                            id : view.query.id,
                            setDefault : false,
                            addressDetail : '',
                            addressee : '',
                            memberId : app.data.user.id,
                            mobile : ''
                        },
                        onsubmit : function(model) {
                            // 把 model
                            // 保存地址的业务逻辑
                            var _user = app.data.user ;
                            if(!model.memberId) {
                                model.memberId = _user.id ;
                            }
                            app.service.address.m_save(_vm.form.model, function(ds) {
                                view.m_reset_button('.submit') ;
                                svc.m_back_and_downpull() ;  
                            }, function(err) {
                                app.modal.m_error('提示', err.data.message) ;
                                view.m_reset_button('.submit') ;
                            }) ;
                        },
                        oninvalid : function() {
                            view.m_reset_button('.submit') ;
                        },
                        onrefresh : function() {
                            return new Promise(function(next, fail) {
                                var _id = view.query.id ;
                                if(_id) {
                                    // 通过地址ID获取地址信息
                                    app.service.address.m_get(_id, function(ds) {
                                        next(ds.data) ;
                                    }) ;
                                } else {
                                    next() ;
                                }
                            }) ;
                        }
                    }
                },
                methods : {
                    m_remove : function() {
                        app.modal.m_confirm('提示', '是否确认删除', function() {
                            var _user = app.data.user ;
                            var _id = view.query.id ;
                            var _source = view.query.source ;
                            var _data = {
                                memberId : _user.id,
                                id : _id
                            }
                            app.service.address.m_delete(_data, function(ds) {
                                svc.m_force_put_msg(_source, 'address.remove', _id) ;
                                app.toast.m_show_text('删除成功') ;
                                svc.m_back_and_downpull() ;
                            }, function(err) {
                                app.modal.m_error('提示', err) ;
                            })
                        })
                    }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
            return _vm.form.m_refresh() ;
        }) ;
        


        view.m_on("active", function() {
            /* 当 view 激活时触发(在 enter 事件之前, 简单点说如果有过度动画, 将会在过度之前触发) */    
            _vm.title = view.query.id ? '编辑收货地址' : '新增收货地址' ;
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