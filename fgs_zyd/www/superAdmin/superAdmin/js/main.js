require.config({
	baseUrl: "js/",
	paths: {

		//		lib层

		jquery: 'lib/jquery.min',
		util: 'lib/util',
		init: 'lib/init',
		share: 'lib/share',
		cookie: 'lib/cookie',
		iscroll: 'lib/iscroll',
		MD5: 'lib/jQuery.md5',
		layer_init: 'lib/layer',
		layer_util: 'lib/layer',
		bootstrap: 'lib/bootstrap.min',
		flexible: 'lib/ydui.flexible',

		//		ui层
		layFun_: 'layFun',
		common: 'common',
		super_live_group: 'super_live_group'
		
	},
	map: {
		'*': {
			'css': 'lib/css'
		}
	},
	shim: {　　　　　　
		'layer_init': {　　　　　　　　
			deps: [
				'jquery',
				'css!../css/layer.css',
				'css!../css/layerDiy_init.css'
			]　　　
		},
		'layer_util': {　　　　　　　　
			deps: [
				'jquery',
				'css!../css/layer.css',
				'css!../css/layerDiy_util.css'
			]　　　
		},
		'layFun_init': {　　　　　　　　
			deps: [
				'layer_init'
			]　　　
		},
		'layFun_util': {　　　　　　　　
			deps: [
				'layer_util'
			]　　　
		},
		'MD5': {　　　　　　　　
			deps: [
				'jquery'
			]　　　
		},
		'cookie': {　　　　　　　　
			deps: [
				'jquery'
			]　　　
		},
		'common': {　　　　　　　　
			deps: [
				'jquery'
			]　　　
		},
		'bootstrap': {　　　　　　　　
			deps: [
				'jquery'
			]　　　
		},

		'super_live_group': {
			deps: ['flexible', 'jquery', 'common', 'share']
		},
		

	}
});