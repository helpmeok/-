define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/search.css') ; // 载入 css 样式表
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : '搜索',
                    iteams : '1' ,
                    values : '',
                    list : {
                        goodsList : []
                    },
                    rcList:[
                        "瓷器","水墨","玉雕","山水","籽料","小叶紫檀","寿山石"
                    ],
                    pageIndex : 1 , //页数
                    pageSize : 15 , //条数
                    form : {
                        msgs : {},
                        model : {
                            mobile : null,
                            password : null,
                            msgCode : null
                        },
                        onsubmit : function(model) {

                        },
                        oninvalid : function() {
                            view.m_reset_button('.submit') ;
                        }
                    }
                },
                methods : {
                    m_search : function() {
                        var _data = {
                            value : _vm.values ,
                            optype : _vm.iteams ,
                            pageIndex : _vm.pageIndex ,
                            pageSize : _vm.pageSize
                        };
                        app.service.search.m_list(_data, function(ds) {
                            if(ds.data.goodsList != 0){
                                _vm.list = ds.data;
                            }else{
                                app.modal.m_alert("提示", "没有相关内容", function () {});
                            }
                        }, function(err) {
                            app.modal.m_error('提示', err) ;
                        })
                    },
                    m_get_value:function ($event) {
                        _vm.values = $event.target.innerHTML;
                    },
                    m_push:function (id) {
                        svc.m_push("goods.detail?id="+id);
                    },
                    m_search_next_page : function() {//下一页
                        _vm.pageIndex ++ ;
                        _vm.m_search() ;
                    },  
                    m_search_prev_page : function() {//上一页
                        _vm.pageIndex -- ;
                        _vm.m_search() ;
                    }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
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