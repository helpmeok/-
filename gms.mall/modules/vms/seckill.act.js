define(function (require, exports, module) {
    var _dely = 60;
    module.exports = function (tpl, view, stc, svc) {
        require('../styles/seckill.act.css'); // 载入 css 样式表
        var _vm = null;
        tpl.m_on("init", function () {
            _vm = tpl.m_vm({
                data: {
                    title: '秒杀',
                    tom: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAChCAIAAADvHXwiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMzEzZjg1Zi0yZjExLTRjZTgtOTU5OC0yNjE0ZDFkNWMyMmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzNBRUU4OUJBQkQ5MTFFNzk1RjVFOUZFNTAwMTcwRjUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzNBRUU4OUFBQkQ5MTFFNzk1RjVFOUZFNTAwMTcwRjUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpkYjJmNDYxNi02ODhhLTQyMmUtODgwMy0zY2I0YmI0ODIwNzQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDMxM2Y4NWYtMmYxMS00Y2U4LTk1OTgtMjYxNGQxZDVjMjJh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',
                    models: {},
                    neartype: null,
                    start: '2',
                    startTime: null,
                    priceBetween: null,
                    classifyId: [],
                    case1: [],//手慢无
                    case2: [],//专属推荐
                    case3: [],//必抢美品
                    case4: []//图片
                },
                watch: {
                    startTime: function (val) {
                        _vm.startTime = val;
                        _vm.case1 = [];
                        _vm.case2 = [];
                        _vm.case3 = [];
                        _vm.case4 = [];
                        _vm.m_ready();
                        _vm.m_refresh();
                    },
                    priceBetween: function (val) {
                        _vm.priceBetween = val;
                        _vm.case1 = [];
                        _vm.case2 = [];
                        _vm.case3 = [];
                        _vm.case4 = [];
                        _vm.m_ready();
                        _vm.m_refresh();
                    },
                    classifyId: function (val) {
                        _vm.classifyId = val;
                        _vm.case1 = [];
                        _vm.case2 = [];
                        _vm.case3 = [];
                        _vm.case4 = [];
                        _vm.m_ready();
                        _vm.m_refresh();
                    }
                },
                methods: {
                    m_next: function () {
                        _vm.start = "1";
                    },
                    m_prev: function () {
                        _vm.start = "2";
                    },
                    m_ready: function () {
                        var _data = {
                            startTime: _vm.startTime,
                            classifyId: _vm.classifyId.join(';'),
                            priceBetween: _vm.priceBetween
                        };
                        app.service.seckill.m_list(
                            _data,
                            function (ds) {
                                var _d = ds.data.skillTypeList;
                                for (var i = 0; i < _d.length; i++) {
                                    if ("1" == _d[i].type) { //手慢无
                                        _vm.case1.push(_d[i]);
                                    }
                                    if ("2" == _d[i].type) {//专属推荐
                                        _vm.case2.push(_d[i]);
                                    }
                                    if ("3" == _d[i].type) {//必抢美品
                                        _vm.case3.push(_d[i]);
                                    }
                                    if ("4" == _d[i].type) {//图片
                                        _vm.case4.push(_d[i]);
                                    }
                                }
                                _vm.models = ds.data;
                            },
                            function (err) {
                                app.toast.m_show_text(err.data.message);
                            }
                        );
                    },
                    m_push: function (el) {
                        svc.m_push('seckill.detail?id='+el.id);
                    }
                }
            });
        });
        tpl.m_on('refresh', function () {
            // 连接进来
            _vm.m_ready();
        });
        view.m_on("active", function () {
            /* 当 view 激活时触发(在 enter 事件之前, 简单点说如果有过度动画, 将会在过度之前触发) */
        });
        view.m_on("enter", function () {
            /* 当 view 进入时触发 */
        });
        view.m_on("frozen", function () {
            /* 当 view 失效时触发 (如果有过度动画, 将会在过度之前触发) */
        });
        view.m_on("leave", function () {
            /* 当 view 离开时触发 (如果有过度动画, 将会在过度之后触发) */
        });
        view.m_on("message", function (ev, msg) {
            /* 当 view 进入后, 从消息队列中获取消息列表, 循环触发 */
            // ev 事件源
            // msg 消息对象 属性: name, params
            // switch(msg.name) {
            //     case "Ylogin" : { // 监视消息名称
            //         // ... 
            //         // msg.params
            //         _vm.formreg = msg.params ;
            //         break ;
            //     }
            // }
        });
    }
});
