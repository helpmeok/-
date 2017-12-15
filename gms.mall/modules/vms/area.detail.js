define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/area.detail.css'); // 载入 css 样式表
        var _vm = null;
        tpl.m_on("init", function() {
            
            _vm = tpl.m_vm({
                data: {
                    title: '专区详情',
                    list: [],
                    banner_url : null,
                    type: '',
                    init_banner_url : 'http://7xkvov.com2.z0.glb.qiniucdn.com/@/data/web/accountList/2b702e9f88b1406cbb8ec5a0551dc779.jpg',
                    renders: {
                        default: {
                            model: {
                                list: []
                            },
                            ondata: function() {
                                return new Promise(function(next, fail) {
                                    var _param = {
                                        goodsBrand: '',
                                        optype: 2
                                    } ;
                                    if(_vm.type) {
                                        _param = {
                                            goodsBrand: _vm.type,
                                            optype: 2
                                        } ;
                                    }
                                    app.service.category.m_jp_list(_param, function(ds) {
                                        var _list = [] ;
                                        if(ds.data) {
                                            _list = ds.data.goods ;
                                        }
                                        next({
                                            list: _list,
                                        });
                                    }, function(err) {
                                        fail(err) ;
                                    }) ;
                                }) ;
                            }
                        }
                    }
                },
                methods: {
                    m_load_banner : function() {
                        app.service.banner.m_get(null, function(ds) {
                            if(ds.data && ds.data.length) {
                                _vm.banner_url = ds.data[0].imgUrl ;
                            } else {
                                _vm.banner_url = init_banner_url ;
                            }
                        }) ;
                    },
                    m_refresh_find: function() {
                        app.service.category.m_list(null, function(ds) {
                            _vm.list = ds.data;
                        })
                    },
                    m_push: function(el) {
                        var url = 'goods.detail?id=' + el.id;
                        svc.m_push(url);
                    },

                }
            }) ;
        });
        tpl.m_on('refresh', function() {
            // 连接进来
            var _type = view.query.type ;
            _vm.type = _type ;
            _vm.$watch('type', function() {
                _vm.m_refresh() ;
            }) ;
            _vm.m_refresh_find() ;
            _vm.m_refresh() ;
            _vm.m_load_banner() ;
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

    }
});