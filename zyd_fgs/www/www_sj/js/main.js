require.config({
	baseUrl: "js/",
	paths: {

		//		lib层
		//		jquery: 'lib/jquery-3.1.1.min',
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

		//		ui层
		layFun_: 'layFun',
		common: 'common',
		reward_way: 'rewardWay',
		create_city: 'create_city',
		create_community: 'create_community',
		join_city: 'join_city',
		join_community: 'join_community',
		mou_fengongsi: 'mou_fengongsi',
		partner: 'partner',
		entrepreneur: 'entrepreneur'
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

		'entrepreneur': {
			deps: ['jquery', 'common', 'share', 'init']
		},
		'partner': {
			deps: ['jquery', 'common', 'share', 'init']
		},
		'reward_way': {
			deps: ['jquery', 'common', 'share', 'init', 'layFun_init', 'layer_init']
		},
		'create_city': {
			deps: ['jquery', 'common', 'share', 'util', 'layFun_util', 'layer_util', 'MD5']
		},
		'create_community': {
			deps: ['jquery', 'common', 'share', 'util', 'layFun_util', 'layer_util', 'MD5']
		},
		'join_city': {
			deps: ['jquery', 'common', 'share', 'util', 'layFun_util', 'layer_util', 'MD5']
		},
		'join_community': {
			deps: ['jquery', 'common', 'share', 'util', 'layFun_util', 'layer_util', 'MD5']
		},
		'mou_fengongsi': {
			deps: ['jquery', 'bootstrap', 'common', 'share', 'util', 'layFun_util', 'layer_util', 'MD5']
		}

	}
});