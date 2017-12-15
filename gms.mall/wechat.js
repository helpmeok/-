/*
	系统公共微信模块
*/
define(function(require, exports, module) {
	function Wechat() {
		var _defs = {

		} ;
		var _settings = null ;
		/*
			模块配置
		*/
		this.m_config = function(opts) {
			_settings = $.extend(_defs, opts) ;
		}
		/*
			微信分享
		*/
		this.m_share = function() {

		}
		/*
			隐藏基础菜单
		*/
		this.m_hide_basic_menu = function() {

		}
		/*
			显示基础菜单
		*/
		this.m_show_basic_menu = function() {

		}
		/*
			微信支付
		*/
		this.m_pay = function(d, onok, oncancel) {
			var _config = app.service.api.wechat.m_get_pay_config(d) ;
			function _onBridgeReady() {
			    WeixinJSBridge.invoke('getBrandWCPayRequest', _config, function(res) {     
			        if('get_brand_wcpay_request:ok' == res.err_msg) {
			        	if($.isFunction(onok)) { // 支付成功
			        		onok() ;
			        	}
			        } else if('get_brand_wcpay_request:cancel' == res.err_msg) {
			        	if($.isFunction(oncancel)) { // 支付成功
			        		oncancel() ;
			        	}
			        }
			   }) ;
			}
			if (typeof WeixinJSBridge == "undefined") {
				if(document.addEventListener) {
			       document.addEventListener('WeixinJSBridgeReady', _onBridgeReady, false) ;
			   }else if(document.attachEvent) {
			       document.attachEvent('WeixinJSBridgeReady', _onBridgeReady) ;
			       document.attachEvent('onWeixinJSBridgeReady', _onBridgeReady) ;
			   }
			} else {
			   _onBridgeReady() ;
			}
		}		
	}
	module.exports = Wechat ; // 模块导出
}) ;