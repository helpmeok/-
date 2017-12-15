/*
	系统公共微信模块
*/
define(function(require, exports, module) {
	function Ali() {
		var _defs = {

		} ;
		var _settings = null ;
		/*
			模块配置
		*/
		this.m_config = function(opts) {
			_settings = $.extend(_defs, opts) ;
		};
		/*
			微信分享
		*/
		this.m_share = function() {

		};
		/*
			隐藏基础菜单
		*/
		this.m_hide_basic_menu = function() {

		};
		/*
			显示基础菜单
		*/
		this.m_show_basic_menu = function() {

		};
		/*
			阿里支付
		*/
		this.m_pay = function(d) {
			var _form = app.service.api.ali.m_get_pay_config(d) ;
			// console.log('配置', _config) ;
			// var _e_form = $('<form></form>').attr('method', 'post').attr('target', '_blank').attr('action', _url).appendTo(document.body) ;
			// _e_form.submit() ;
			// _e_form.remove() ;
			// 
			var _e_form = $(_form) ;
			_e_form.insertBefore(document.body) ;
		}		
	}
	module.exports = Ali ; // 模块导出
}) ;