define(function(require, exports, module) {
	require('http://cdn.ronghub.com/RongIMLib-2.2.5.min.js') ;
	/*
		封装聊天
	*/
	function RyService(config) {

		/*
			主持人头像
		*/
		var _headimgurl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCRjZEMjY5QzJFODMxMUU1QjFBNERBMUQ0MDY2Q0Y3RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCRjZEMjY5RDJFODMxMUU1QjFBNERBMUQ0MDY2Q0Y3RiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJGNkQyNjlBMkU4MzExRTVCMUE0REExRDQwNjZDRjdGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJGNkQyNjlCMkU4MzExRTVCMUE0REExRDQwNjZDRjdGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hk+LVQAACwFJREFUeNrsnXlUU1ca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' ;
		var _chat = this ;
		var _id = null ;


		this.m_send = function(data) { // 发送消息
			return new Promise(function(next, fail) {
				var _msg_name = 'custom' ;
				var _object_name = 'app:custom' ;
				var _msg_tag = new RongIMLib.MessageTag(true, true) ;
				var _propertys = ["content", "extra"] ; // 消息类中的属性名。
				var _data = data ;
				RongIMClient.registerMessageType(_msg_name, _object_name, _msg_tag, _propertys) ;
				var _msg = new RongIMClient.RegisterMessage.custom({content : JSON.stringify(_data), extra: 'msgWithVip'}) ;
				var _type = RongIMLib.ConversationType.CHATROOM ;
				RongIMClient.getInstance().sendMessage(_type, _id, _msg, {
					onSuccess: function (msg) {
	                    next(msg) ;
	                },
	                onError : fail
				}) ;
			}) ;
		}

		
		this.m_exit = function() {
			RongIMClient.getInstance().disconnect() ;
			return this ;
		}
		this.m_quit_chat_room = function(id) { // 退出聊天室
			return new Promise(function(next, fail) {
				RongIMClient.getInstance().quitChatRoom(id, {
				  onSuccess: function() {
				  	next() ;
				  },
				  onError: function(error) {
				  	next() ;
				  }
				}) ;
			}) ;
			return this ;
		}

		/*
			处理消息
		*/
		function _m_process_msg(data) {
			if(!app.data.user) {
				return null ;
			}
			var _content = null ;
			var _type = null ;
			var _params = null ;
			var _data = null ;
			if(data.content.message) {
				_params = data.content.message.content ;
				try {
					_content = JSON.parse(_params.content) ;
				} catch(e) {

				}
			} else if(data.content) {
				_params = data.content ;
				try {
					_content = JSON.parse(_params.content) ;
				} catch(e) {

				}
			}
			var _diff = data.receivedTime - data.sentTime ;
			var _is_history = false ;
			if(_diff > 4 * 1000) {
				_is_history = true ;
			}

			if('msgWithVip' == _params.extra) { // 文本消息
				_data = {
					userPortrait : _content.userPortrait,
					type : 'text',
					status : 1,
					nickname : _content.userName,
					username : _content.userName,
					from : app.data.user.mobile == _content.mobile ? 1 : 0,
					msg : _content.msg.replace(/<script[\s\S]*?<\/script>/i, '脚本注入')
				}
			} else if('screenWarn' == _params.extra) { // 主持人消息
				_data = {
					userPortrait : _headimgurl,
					type : 'text',
					status : 1,
					nickname : _content.nickname,
					from : 0,
					msg : "<span class = 'at'>{content}</span>".replace('{content}', _content.content)
				}
			} else if('PCImageExtra' == _params.extra) {
				// 图片消息
				_data = {
					userPortrait : _headimgurl,
					type : 'image',
					status : 1,
					nickname : '主持人',
					from : 0,
					image : _params.imageUri,
					msg : "<img width = '150px' src = '{src}' />".replace('{src}', _params.imageUri)
				}
			} else if('VoiceMessage' == _params.messageName) { // 语音消息
				_content = JSON.parse(_params.extra) ;
				_data = {
					userPortrait : _content.userPortrait,
					type : 'voice',
					status : 1,
					nickname : _content.userName,
					from : 0,
					msg : '<div class = "voice"><audio></audio><i class = "icon-voice2fill"></i> {duration}</div>'.replace('{duration}', _params.duration)
				}
			} else if('ImageMessage' == _params.messageName) {
				_content = JSON.parse(_params.extra) ;
				_data = {
					userPortrait : _content.userPortrait,
					type : 'image',
					status : 1,
					image : _params.imageUri,
					nickname : _content.userName,
					from : app.data.user.mobile == _content.mobile ? 1 : 0,
					msg : "<img width = '150px' src = '{src}' />".replace('{src}', _params.imageUri)
				}
			} else if('leader' == _params.extra && !_is_history) { // 收到出价信息
				_data = {
					userPortrait : _content.userPortrait,
					type : 'leader',
					status : 1,
					nickname : _content.member,
					from : app.data.user.mobile == _content.mobile ? 1 : 0,
					price : _content.price,
					msg : '<div class = "outprice"><i class = "icon-rechargefill fg-lightyellow"></i> {price}</div>'.replace('{price}', _content.price)
				}
			} else if('countDownStart' == _params.extra && !_is_history) { // 开始倒计时
				var _content = parseInt(_params.content) ;
				_data = {
					type : 'countDown',
					number : _content,
					// collectionId : _content.collectionId
				}
			} else if('redpackage' == _params.extra) { // 收到红包消息
				_data = {
					userPortrait : _headimgurl,
					type : 'redpackage',
					status : 1,
					nickname : '系统消息',
					from : 0,
					redpackageid : _params.content,
					msg : heredoc(function() {
						/*
							<div class="button readpackage">
								<div class = 'box'>
									<div class = 'wrap'>
										<div class = 'l'>
											<i class = 'icon-redpackagefill'></i>
										</div>
										<div class = 'r'>
											<em>查看红包</em>
											<p>点击领取</p>
										</div>
									</div>
									<span class = 'form'>古美术红包</span>
								</div>
							</div>
						*/
					})
				}
			} else if('nextCollection' == _params.extra && _is_history) { // 下一件
				var _content = JSON.parse(_params.content) ;
				_data = {
					type : 'nextCollection',
					status : 1,
					nickname : '系统消息',
					from : 0,
					userPortrait : _headimgurl,
					msg : _content.message,
				}
			} else if('TextMessage' == _params.messageName) {
				_data = {
					userPortrait : _headimgurl,
					type : 'text',
					status : 1,
					nickname : '主持人',
					from : 0,
					msg : _params.content
				}
			} else if('msgBidsuccess' == _params.extra && !_is_history) {
				var _content = JSON.parse(_params.content) ;
				_data = {
					type : 'msgBidsuccess',
					status : 1,
					nickname : '系统消息',
					from : 0,
					userPortrait : _headimgurl,
					msg : _content.message,
				}
			} else if('auctionSucceed' == _params.extra && _is_history) {
				_data = {
					type : 'auctionSucceed',
					status : 1,
					nickname : '系统消息',
					from : 0,
					userPortrait : _headimgurl,
					msg : _params.content
				}
			} else if('auctionCollectionDate' == _params.extra && _is_history) { // 订单支付
				_data = {
					type : 'auctionCollectionDate',
					order : JSON.parse(_params.content)
				}
			}
			return _data ;
		}
		this.m_init = function(token) {
			RongIMClient.init(config.key) ; // 聊天初始化
			RongIMClient.connect(token, {
				onTokenIncorrect : function(err) {
					
				},
		        onSuccess : function (userid) {
		            if($.isFunction(config.oninit)) {
		            	config.oninit.call(_chat) ;
		            }
		        }
		    }) ;
		    RongIMClient.setOnReceiveMessageListener({
	        	onReceived: function (data) { // 接受消息
        			var _msg = _m_process_msg.call(_chat, data) ;
        			if(_msg) {
        				if($.isFunction(config.onmsg)) {
	        				config.onmsg.call(_chat, _msg) ;
	        			}	
        			}
	        	}
	        }) ;
	        RongIMClient.setConnectionStatusListener({
		        onChanged : function (status) {
		            switch (status) {
		                case RongIMLib.ConnectionStatus.CONNECTED:
		                    console.log('链接成功');
		                    break;
		                case RongIMLib.ConnectionStatus.CONNECTING:
		                    console.log('正在链接');
		                    break;
		                case RongIMLib.ConnectionStatus.DISCONNECTED:
		                    console.log('断开连接');
		                    break;
		                case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
		                    console.log('其他设备登录');
		                    break;
		                case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
		                    console.log('域名不正确');
		                    break;
		                case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
		                    console.log('网络不可用');
		                    break;
		            }
		        }
		    }) ;
		}

		var _is_history = false ;

		this.m_join_chat_room = function(args) {
			_id = args.id ;
			RongIMClient.getInstance().joinChatRoom(_id, 10, { // 获取场次
                onSuccess: function (data) { // 加入聊天室
                	_is_history = true ;
                	// _m_get_message_list() ;
                }, onError: function (err) {
                    console.log(err);
                }
            }) ;
		    
		}

		function _m_init() { // 初始化
			// "k51hidwq1bh5b"
		    

			return this ;
		}
		_m_init() ;
	}
	module.exports = RyService ;
}) ;