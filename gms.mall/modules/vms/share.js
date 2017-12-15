define(function(require, exports, module) {
    module.exports = function(tpl, view, stc, svc) {
        require('../styles/share.css') ;
        var _vm = null ;
        tpl.m_on("init", function() {
            _vm = tpl.m_vm({
                data : {
                    title : null,
                    status : 0,
                    user:{},
                    url : null
                },
                mounted : function() { // 初始化
                    // 引入
                    var _url = (window.location.href).replace("user.center","/") ;

                    var _user = app.data.user ;
                    var _self = this ;
                    var _Clipboard = require('../../plugs/clipboard.min.js') ;
                    var _e_copy_link = $(this.$el).find('.copy-link').get(0) ; // 拿到 DOM 对象
                    var _clipboard = new _Clipboard(_e_copy_link) ;
                    _clipboard.on('success', function() { // 复制成功
                        _self.status = 1 ;
                    }) ;
                    _clipboard.on('error', function() { // 复制错误
                        _self.status = 0 ;
                    }) ;
                    if(null != _user && 0 != _user.length )  {//添加一个memberId
                        this.url = decodeURIComponent(_url +'?memberId=' + _user.id) ;
                        app.local.m_set("parentId", this.url) ;
                    } else {
                        this.url = decodeURIComponent(_url) ; 
                    }
                },
                methods : {
                    m_copy_link : function() {
                    	console.log(this)
                        if(1 == this.status) {
                            app.toast.m_show_ok('已复制') ;
                        } else if(0 == this.status) {
                            app.toast.m_show_no('复制失败') ;
                        }
                    },
                    m_share_wexin : function() {
                        if('iOS' == app.m_device()) { // 苹果设备
                            _vm.i() ;
                        } else if ('android' == app.m_device() ) {// 安卓设备
                            _vm.s() ;
                        }
                        svc.m_back_and_downpull();
                    },
                    // m_share_weibo : function() {
                    //     app.toast.m_show_text('即将开放,敬请期待..')
                    // },
                    m_share_eweima : function() {
                        svc.m_back(null, function() {
                        	console.log(_vm.url)
                        	console.log(_vm.user.id)
                            this.m_pop('share.erweima?url='+_vm.url+"?memberId="+_vm.user.id) ;
                        }) ;
                    },
                    i : function() {
                    	function setupWebViewJavascriptBridge(callback) {
									if(window.WebViewJavascriptBridge) {
										return callback(WebViewJavascriptBridge);
									}
									if(window.WVJBCallbacks) {
										return window.WVJBCallbacks.push(callback);
									}
									window.WVJBCallbacks = [callback];
									var WVJBIframe = document.createElement('iframe');
									WVJBIframe.style.display = 'none';
									WVJBIframe.src = 'https://__bridge_loaded__';
									document.documentElement.appendChild(WVJBIframe);
									setTimeout(function() {
										document.documentElement.removeChild(WVJBIframe)
									}, 0)
								   }
								setupWebViewJavascriptBridge(function(bridge) {
									bridge.callHandler('share', {'friend_url':app.local.m_get("parentId")}, function responseCallback(responseData) {
										
									})
								})
                        window.webkit.messageHandlers.share.postMessage( {friend_url : app.local.m_get("parentId")} ) ;
                    },
                    s : function() {
                        if ('android' == app.m_device() ){
                            window.android.share(app.local.m_get("parentId")) ;
                        }
                    }
                }
            }) ;
        }) ;
        tpl.m_on('refresh', function() {
            // 连接进来
            _vm.user = app.data.user;
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