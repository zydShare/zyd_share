var layObj = {
	//	'content': function(width, height, title, contentHtml, skin, callback) {
	//		skin = skin ? skin : '';
	//		layer.open({
	//			type: 1,
	//			title: title,
	//			skin: skin,
	//			fix: false,
	//			area: [width + 'px', height + 'px'], //宽高
	//			content: contentHtml,
	//			offset: '100px',
	//			success: function(layero, index) {
	//				if(callback) {
	//					callback(layero, index);
	//				}
	//			}
	//		});
	//	},
	'tips_new': function(tit, content, btn1_opt) {
		layer.open({
			type: 1,
			title: tit,
			content: '<div class="lay-main" ><div class="msg"><span>' + content + '</span></div></div>',
			btn: ['确定'],
			offset: ['25%'],
			skin: 'layui-layer-diy w51', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 0,
			isOutAnim: false,
			btn1: function(index, layero) {
				layer.close(index);
				//				btn1_opt();
			}
		});
	},
	'tips': function(pic, content, btn1_opt) {
		layer.open({
			type: 1,
			title: '提示',
			content: '<div class="lay-main" ><div class="msg-img" ><img src="img/' + pic + '" /></div><div class="msg"><span>' + content + '</span></div></div>',
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
	//
	//	'list': function(title, btn1_opt) {
	//		layer.open({
	//			type: 1,
	//			title: false,
	//			content: '<div class="lay-main" ><div class="ticket-title">' + title + '</div><div class="ticket-list" id="business-list"> <ul></ul> </div></div>',
	//			btn: ['取消'],
	//			skin: 'layui-layer-diy btn-1 w16',
	//			anim: 4,
	//			scrollbar: false,
	//			btn1: function(index, layero) {
	//				$("#container-box").removeClass('alpha');
	//				$("body").removeClass('alpha');
	//				layer.close(index);
	//				btn1_opt();
	//			},
	//			success: function(layero, index) {}
	//		});
	//	},
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
			//			success:function(layero, index) {
			//				//背景层不允许滚动
			////				$("#container-box").addClass('alpha');
			////				$("body").addClass('alpha');
			//			}
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
}