define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/category.list.css') ; // 载入 css 样式表
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : '分类',
                    list : [],
                    index : 0
                },

                computed : {
                    items : function() {
                        var _item = this.list[this.index] ;
                        var _items = [] ;
                        if(_item) {
                            _items = _item.childs ;    
                        }
                        return _items ;
                    }
                },

                methods : {
                   m_load_items_from_index : function(index) {
                       this.index = index ;
                   },
                   m_push : function(el) {
                       var url = 'goods.list?id=' + el.id ;
                       svc.m_push(url) ;
                   },
                   m_load_category : function() {
                        app.service.category.m_all_list(null, function(ds) {
                            _vm.list = ds.data ;
                        }, function(err) {
                            app.modal.m_error('提示', err) ;
                        }) ;
                   }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
            _vm.m_load_category() ;
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