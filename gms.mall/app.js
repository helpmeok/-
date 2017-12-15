var _Libary = require('../library/api') ;
var _library = new _Libary({
	// mongodb : {
	// 	path : 'mongodb://39.108.126.6:27017/education',
	// 	name : 'education'
	// },
	port : 8888,
	static_dir : __dirname + '/public'
}) ;
app = _library.init() ; // 返回一个 app
Result = _library.Result ;



