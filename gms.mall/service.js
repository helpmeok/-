define(function (require, exports, module) { // 编写业务逻辑功能
    var _req = new SepRequest();
    require('db');
    module.exports = {
        api: {
            qiniu: {
                m_token: function (key, onok, onno) {
                    var _url = "http://wap.gmsweipai.com/gms/api/common/qiniu/token";
                    _req.m_send(_url, "post", {key: key}, onok, onno);
                }
            },
            ali: {
                m_get_pay_config: function (d) {
                    var _config = null;
                    $.ajax({
                        async: false,
                        type: 'post',
                        url: __api + '/api/pay/aliPay',
                        data: d,
                        success: function (ds) {
                            // _url = 'https://openapi.alipay.com/gateway.do?' + ds.data ;
                            _config = ds.data;
                        }
                    });
                    return _config;
                }
            },
            wechat: {
                m_get_jssdk_config: function (url) {
                    var _config = null;
                    $.ajax({
                        async: false,
                        url: __api + '/api/login/getJsApiTicket',
                        data: {
                            url: window.location.href.split('#')[0]
                        },
                        success: function (ds) {
                            _config = ds.data;
                        }
                    });
                    return _config;
                },
                m_get_pay_config: function (d) {
                    var _config = null;
                    $.ajax({
                        async: false,
                        type: 'post',
                        url: __api + '/api/pay/weixinPay',
                        data: d,
                        success: function (ds) {
                            _config = ds.data;
                        }
                    });
                    return _config;
                }
            }
        },
        uploader: {
            m_start: function (file, onprogress, onok, onno) {
                function _m_upload(key, file) {
                    var _formdata = new FormData();
                    module.exports.api.qiniu.m_token(key, function (token) {
                        _formdata.append("token", token.uptoken); // 上传令牌
                        _formdata.append("key", key); // 设置文件名称
                        _formdata.append("file", file); // 设置文件本身
                        $.ajax({
                            url: "http://upload.qiniu.com/",
                            type: "post",
                            data: _formdata,
                            xhr: function () {
                                var _xhr = $.ajaxSettings.xhr();
                                if (_xhr.upload) {
                                    _xhr.upload.addEventListener("progress", function (ev) {
                                        var _pv = (ev.loaded / ev.total) * 100;
                                        onprogress(_pv);
                                    }, false); // 上传进度回调
                                    _xhr.upload.addEventListener("error", onno);
                                }
                                return _xhr;
                            },
                            contentType: false,
                            processData: false,
                            success: function (data) {
                                var _url = __qiniu_base + '/' + data.key;
                                onok(file, key, _url);
                            },
                            error: function (ev) {
                                if ($.isFunction(onno)) {
                                    onno(ev);
                                }
                            }
                        });
                    });
                }

                var _file = file;
                var _format = _file.name.substring(_file.name.lastIndexOf(".") + 1);
                var _key = uuid() + "." + _format;
                _m_upload(_key, _file);
            }
        },
        home: {
            category: {
                m_list: function (d, onok, onno) {
                    onok(db.home.category.list);
                }
            },
            class: {
                m_list: function (d, onok, onno) {
                    var _url = __api + '/api/goodsClassify/findList';
                    _req.m_send(_url, 'post', d, onok, onno);
                }
                // m_list : function(d, onok, onno) {
                //     onok(db.home.class.list) ;   
                // } 
            },
            out: {
                m_list: function (d, onok, onno) {
                    onok(db.home.out.list);
                }
            },
            foot: {
                m_list: function (d, onok, onno) {
                    onok(db.home.foot);
                }
            }
        },
        ads: {
            m_list: function (d, onok, onno) {
                var _url = __api + '/api/advertise/findIndexAdvertise';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        goods: {
            m_list: function (d, onok, onno) {
                var _url = __api + '/api/goods/findSlider';
                _req.m_send(_url, 'post', d, onok, onno);
                // onok(db.goods.list) ;
            },
            m_detail: function (d, onok, onno) {
                var _url = __api + '/api/goods/findGoodsDetail';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_removes: function (d, onok, onno) {
                var _url = __api + '/api/goods/delGoodsCar';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_remove_abnormal: function (d, onok, onno) {
                var _url = __api + '/api/goods/delGoodsCar';
                _req.m_send(_url, 'post', d, onok, onno);
            },

            // 商品编辑页面【后台管理用的】
            m_find_insert_goods_info: function (d, onok, onno) {
                var _url = __api + '/api/goods/findInsertGoodsInfo';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            // 添加商品【后台管理用的】
            m_insert_goods: function (d, onok, onno) {
                var _url = __api + '/api/goods/insertGoods';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        order: {
            //我的订单列表
            m_list: function (d, onok, onno) {
                var _url = __api + '/api/order/findOrderList';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            // 提交订单
            m_submit_confirm: function (d, onok, onno) {
                var _url = __api + '/api/order/setOrder';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_detail: function (d, onok, onno) {
                var _url = __api + '/api/order/findOrderDetail';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_icon_list: function (onok) {
                onok({
                    status: 200,
                    data: db.order.list
                })
            },

            m_remove: function (d, onok, onno) {
                var _url = __api + '/api/order/cancle';
                _req.m_send(_url, 'post', d, onok, onno);
            },

            // 确认收货
            m_receive_goods: function (d, onok, onno) {
                var _url = __api + '/api/order/receiveGoods';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        car: {
            m_join: function (d, onok, onno) {
                var _url = __api + '/api/goods/intoGoodsCar';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        //购物车
        cart: {
            m_list: function (d, onok, onno) {
                var _url = __api + '/api/goods/findGoodsCarList';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        //收货地址
        address: {
            //地址列表
            m_list: function (d, onok, onno) {
                var _url = __api + '/api/member/findMemAddressList';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            //查找会员默认收货地址
            m_get_default: function (d, onok, onno) {
                var _url = __api + '/api/member/findMemberAddressDefault';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            //添加、修改地址
            m_save: function (d, onok, onno) {
                var _url = __api + '/api/member/saveOrUpdateMemberAddress';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_get: function (id, onok, onno) {
                var _url = __api + '/api/member/findAddressDetail';
                _req.m_send(_url, 'post', {id: id}, onok, onno);
            },
            m_delete: function (d, onok, onno) {
                var _url = __api + '/api/member/delMemAddress';
                _req.m_send(_url, 'post', d, onok, onno);
            },
        },
        //支付方式
        balance: {
            m_get_code: function (d, onok, onno) {
                var _url = __api + '/api/login/getCode';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_step_2: function (d, onok, onno) {
                var _url = __api + '/api/member/setPayPassword';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_pay: function (d, onok, onno) {
                var _url = __api + '/api/pay/balancePay';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_vd_step_1: function (d, onok, onno) {
                var _url = __api + '/api/member/checkMemSetPayPasswordCode';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_vd_step_2: function (d, onok, onno) {
                var _url = __api + '/api/pay/balancePay';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_vd_step_3: function (d, onok, onno) {
                var _url = __api + '/api/member/checkMemPayPassword';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            //判断是否设置过支付密码
            m_inquire_pwd: function (d, onok, onno) {
                var _url = __api + '/api/member/findMemSetPayPassword';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        category: {
            m_list: function (d, onok, onno) {
                var _url = __api + '/api/brand/findList';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_all_list: function (d, onok, onno) {
                var _url = __api + '/api/goodsClassify/findList';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            // 根据专区编码获取商品列表
            m_jp_list: function (d, onok, onno) {
                var _url = __api + '/api/goods/findList';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            //根据商品分类获取商品列表
            m_fl_list: function (d, onok, onno) {
                var _url = __api + '/api/goods/findList';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_al_list: function (d, onok, onno) {
                var _url = __api + '/api/goods/findList';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        comment: {
            m_list: function (d, onok, onno) {
                var _url = __api + '/api/goods/findGoodsDiscuss';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_save: function (d, onok, onno) {
                var _url = __api + '/api/goods/intoGoodsDiscuss';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        zan: {
            m_point: function (d, onok, onno) {
                var _url = __api + '/api/goods/goodsDiscussZan';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        user: {
            //注册
            m_reg: function (d, onok, onno) {
                var _url = __api + '/api/login/regeist';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_get_reg: function (d, onok, onno) {
                var _url = __api + "/api/rand/randImag/check?mobile={mobile}&code={code}&businessType={businessType}&timeStamp={timeStamp}";
                _url = _url.replace('{mobile}', d.mobile).replace('{code}', d.code).replace('{timeStamp}', d.timeStamp).replace('{businessType}', d.businessType);
                _req.m_send(_url, 'get', d, onok, onno);
            },
            m_get_msg_code: function (d, onok, onno) {
                var _url = __api + '/api/login/getCode/check';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            //登录
            m_login: function (d, onok, onno) {
                var _url = __api + '/api/login/doLogin';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            //获取用户详情
            m_get_info: function (d, onok, onno) {
                var _url = __api + '/api/member/findMemberDetail';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            //修改用户信息
            m_save_info: function (d, onok, onno) {
                var _url = __api + '/api/member/updateMember';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            // 修改用户登录密码
            m_save_password: function (d, onok, onno) {
                var _url = __api + '/api/member/updateMemberPassword';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_refresh_password: function (d, onok, onno) {
                var _url = __api + '/api/member/refreshMemberPassword';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            // 通过用户Token获取用户信息
            m_get_info_from_token: function (token, onok, onno) {
                var _url = __api + '/api/member/findMemberDetailByToken';
                _req.m_send(_url, 'post', {token: token}, onok, onno);
            },

            // 查找明细
            m_get_member_detail: function (d, onok, onno) {
                var _url = __api + '/api/member/detailList';
                _req.m_send(_url, 'post', d, onok, onno);
            },

            // 查找会员申请余额提现记录列表
            m_get_member_apply_cash_list: function (d, onok, onno) {
                var _url = __api + '/api/member/applyCashList';
                _req.m_send(_url, 'post', d, onok, onno);
            },

            // 查找会员信息是否完善
            m_find_member_is_detail: function (d, onok, onno) {
                var _url = __api + '/api/member/findMemberIsDetail';
                _req.m_send(_url, 'post', d, onok, onno);
            },

            // 查找会员信息是否完善
            m_complete_member: function (d, onok, onno) {
                var _url = __api + '/api/member/completeMember';
                _req.m_send(_url, 'post', d, onok, onno);
            },

            // 获取会员银行卡列表信息
            m_find_mem_bank_card_list: function (d, onok, onno) {
                var _url = __api + '/api/member/findMemBankCardList';
                _req.m_send(_url, 'post', d, onok, onno);
            },

            // // 银联充值
            // m_pay_unionpay_recharge: function (d, onok, onno) {
            //     var _url = __api + '/api/pay/unionpay/recharge';
            //     _req.m_send(_url, 'post', d, onok, onno);
            // },

            // 提现奖励余额
            m_apply_reward_cash: function (d, onok, onno) {
                var _url = __api + '/api/member/applyRewardCash';
                _req.m_send(_url, 'post', d, onok, onno);
            },

            // 提现余额
            m_apply_cash: function (d, onok, onno) {
                var _url = __api + '/api/member/applyCash';
                _req.m_send(_url, 'post', d, onok, onno);
            }


        },
        sms: {
            m_send_reg_code: function (mobile, onok, onno) {
                var _url = __api + '/api/login/getCode';
                _req.m_send(_url, 'post', {mobile: mobile, businessType: 1}, onok, onno);
            },
            m_send_login_code: function (mobile, onok, onno) {
                var _url = __api + '/api/login/getCode';
                _req.m_send(_url, 'post', {mobile: mobile, businessType: 5}, onok, onno);
            },
            m_send_findpwd_code: function (mobile, onok, onno) {
                var _url = __api + '/api/login/getCode';
                _req.m_send(_url, 'post', {mobile: mobile, businessType: 2}, onok, onno);
            }
        },
        banner: {
            m_get: function (d, onok, onno) {
                var _url = __api + '/api/advertise/findBrandIndexAdvertise';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        bank: {
            m_list: function (d, onok, onno) {
                var _url = __api + '/api/member/findMemBankCardList';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_remove: function (d, onok, onno) {
                var _url = __api + '/api/member/delMemBankCard';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_add: function (d, onok, onno) {
                var _url = __api + '/api/member/intoMemberCard';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            //获取系统目前支持的银行列表
            m_find_bank_list: function (d, onok, onno) {
                var _url = __api + "/api/member/findBankList";
                _req.m_send(_url, "post", d, onok, onno);
            }
        },
        msg: {
            m_list: function (d, onok, onno) {
                var _url = __api + "/api/member/memberSmsList";
                _req.m_send(_url, "post", d, onok, onno);
            }
        },
        distri: {
            m_get_detail: function (d, onok, onno) {
                var _url = __api + "/api/reward/findDetail";
                _req.m_send(_url, "post", d, onok, onno);
            },
            m_get_current: function (d, onok, onno) {
                var _url = __api + "/api/goods/findList";
                _req.m_send(_url, "post", d, onok, onno);
            },
            m_add: function (d, onok, onno) {
                var _url = __api + '/api/goods/intoGoodsScoring';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_order_detail: function (d, onok, onno) {
                var _url = __api + "/api/reward/findOrderDetail";
                _req.m_send(_url, "post", d, onok, onno);
            },
        },
        search: {
            m_list: function (d, onok, onno) {
                var _url = __api + "/api/goods/goodsSearch";
                _req.m_send(_url, "post", d, onok, onno);
            },
        },
        help: {
            m_edit: function (d, onok, onno) {
                onok(db.help.edit);
            },
            m_list: function (d, onok, onno) {
                onok(db.help.list);
            },
            m_detail: function (d, onok, onno) {
                // var _url = __api + "" ;
                // _req.m_send(_url, "post", d, onok, onno) ;  
            },
            m_add: function (d, onok, onno) {
                var _url = __api + '/api/member/coupleBack';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        act: {
            m_list: function (d, onok, onno) {
                onok(db.act);
            }
        },
        hot: {
            m_list: function (d, onok, onno) {
                var _url = __api + '/api/news/findList';
                _req.m_send(_url, 'post', d, onok, onno);
            },
        },
        fine: {
            m_list: function (d, onok, onno) {
                var _url = __api + '/api/goods/findSlider';
                _req.m_send(_url, 'post', d, onok, onno);
            },
        },
        merchant: {
            m_detail: function (d, onok, onno) {
                var _url = __api + '/api/member/merchantPage';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        professor: {
            m_detail: function (d, onok, onno) {
                var _url = __api + '/api/member/professorPage';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        seller: {
            m_add: function (d, onok, onno) {
                var _url = __api + '/api/member/merchant/applyMerchan';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_list: function (d, onok, onno) {
                var _url = __api + '/api/member/merchant/getGoodsListInfo';
                _req.m_send(_url, 'post', d, onok, onno);
            },
        },
        savant: {
            m_add: function (d, onok, onno) {
                var _url = __api + '/api/member/professor/applyProfessor';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        agent: {
            m_detail: function (d, onok, onno) {
                var _url = __api + '/api/member/account/info';
                _req.m_send(_url, 'post', d, onok, onno);
            }
        },
        seckill: {
            m_list: function (d, onok, onno) {
                var _url = __api + '/api/goods/skill/findGoodsSkillList';
                _req.m_send(_url, 'post', d, onok, onno);
            },
            m_detail: function (d, onok, onno) {
                var _url = __api + '/api/goods/skill/findDetail';
                _req.m_send(_url, 'post', d, onok, onno);
            },
        },
    };
});
