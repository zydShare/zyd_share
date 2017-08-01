var layObj = {
	tit: "",
	lay_content: "",
	lay_input: "",	
	pic: "",
	btn1_opt: function() {},
	btn2_opt: function() {},
	success: function() {},
	reload: function() {},
	F_button: function() {},
	T_button: function() {},


	'tips_new': function(tit, content, btn1_opt) {
		layer.open({
			type: 1,
			title: tit,
			content: '<div class="lay-main flex-hc-vc" ><div class="content"><span>' + content + '</span></div></div>',
			btn: ['确定'],
			offset: ['25%'],
			skin: 'layui-layer-diy w56', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 0,
			isOutAnim: false,
			btn1: function(index, layero) {
				layer.close(index);
				//				btn1_opt();
			},
			success: function(layero, index) {
				
			}
		});
	},
	'tips': function(pic, content, btn1_opt) {
		layer.open({
			type: 1,
			title: '提示',
			content: '<div class="lay-main flex-hl-vc" ><div class="msg-img" ><img src="img/' + pic + '" /></div><div class="msg"><span>' + content + '</span></div></div>',
			btn: ['确定'],
			offset: ['25%'],
			skin: 'layui-layer-diy w51', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 0,
			isOutAnim: false,
			btn1: function(index, layero) {
				layer.close(index);
				btn1_opt();
			}
		});
	},
	'content_1': function(tit, input, btn1_opt, btn2_opt) {
		layer.open({
			type: 1,
			title: tit,
			content: '<div class="lay-main flex-hc-vc" >' + input + '</div>',
			closeBtn: 0,
			offset: ['25%'],
			btn: ['是', '否'],
			skin: 'layui-layer-diy w16',
			anim: 0,
			isOutAnim: false,
			btn1: function(index, layero) {
				btn1_opt(layero, index)
			},
			btn2: function(index, layero) {
				layer.close(index);

			}
		});
	},
	'content_2': function(tit, input, btn1_opt) {
		layer.open({
			type: 1,
			title: tit,
			content: '<div class="lay-main" >' + input + '</div>',
			closeBtn: 1,
			btn: ['确定'],
			skin: 'layui-layer-diy w16',
			anim: 4,
			btn1: function(index, layero) {
				btn1_opt(layero, index)
			}
		});
	},
	'content_3': function(tit, input, btn1_opt, btn2_opt, success) {
		layer.open({
			type: 1,
			title: tit,
			content: '<div class="lay-main" >' + input + '</div>',
			closeBtn: 0,
			offset: ['25%'],
			btn: ['确定', '取消'],
			skin: 'layui-layer-diy w16 btn-2',
			anim: 0,
			isOutAnim: false,
			scrollbar: false,
			btn1: function(layero, index) {
				//启用滚动条
				$(document.body).css({
					"overflow-x": "auto",
					"overflow-y": "auto"
				});

				btn1_opt(layero, index);
			},
			btn2: function(index, layero) {
				//启用滚动条
				$(document.body).css({
					"overflow-x": "auto",
					"overflow-y": "auto"
				});
				layer.close(index);
			},
			success: function(layero, index) {
				//禁止滚动条

				$(document.body).css({
					"overflow-x": "hidden",
					"overflow-y": "hidden"
				});
				success(layero, index)
			}

		});
	},
	'content_4': function(tit, text, btn1_opt, btn2_opt, success) {
		layer.open({
			type: 1,
			title: tit,
			content: '<div class="lay-main_mrg" >' + text + '</div>',
			closeBtn: 0,
			offset: ['25%'],
			btn: ['确定', '取消'],
			skin: 'layui-layer-diy w16 btn-2',
			anim: 0,
			isOutAnim: false,
			scrollbar: false,
			btn1: function(index, layero) {
				btn1_opt(layero, index);
			},
			btn2: function(index, layero) {
				layer.close(index);
			}
			//			success: function(layero, index) {
			//				success(layero, index)
			//			}

		});
	}
}