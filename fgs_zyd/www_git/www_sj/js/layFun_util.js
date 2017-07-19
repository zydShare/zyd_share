var layObj = {
	'tips_new': function(tit, content, btn1_opt) {
		layer.open({
			type: 1,
			title: tit,
			content: '<div class="lay-main" ><div class="msg"><span>' + content + '</span></div></div>',
			btn: ['确定'],
			offset: ['25%'],
			skin: 'layui-layer-diy w14', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 0,
			isOutAnim: false,
			btn1: function(index, layero) {
				layer.close(index);
			}
		});
	},
	'tips': function(pic, content, btn1_opt) {
		layer.open({
			type: 1,
			title: '提示',
			content: '<div class="lay-main flex-hb-vc" ><div class="msg-img" ><img src="img/' + pic + '" /></div><div class="msg"><span>' + content + '</span></div><div class="msg-img msg-stub" style="visibility: hidden;"><img /></div></div>',
			btn: ['我知道了'],
			offset: ['25%'],
			skin: 'layui-layer-diy w14', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 0,
			isOutAnim: false,
			btn1: function(index, layero) {
				layer.close(index);
				btn1_opt();
			},
			success:function(layer, oindex) {
				var _text = $(".msg span").html().length;
				if(_text>=10){
					$(".lay-main").removeClass('flex-hb-vc').addClass('flex-hl-vc');
					$(".msg").css('width','9rem');
					$(".msg-stub").hide();
				}
				console.log(_text);
			},
		});
	},
	'content': function(tit, input, btn1_opt, btn2_opt) {
		layer.open({
			type: 1,
			title: tit,
			content: '<div class="lay-main" >' + input + '</div>',
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
				btn1_opt(layero, index);
			},
			btn2: function(index, layero) {
				layer.close(index);
			},
			success: function(layero, index) {
				success(layero, index)
			}

		});
	},
}