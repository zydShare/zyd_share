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
	'tips': function(pic, content, btn1_opt) {
		layer.open({
			type: 1,
			title: '提示',
			content: '<div class="lay-main p-t-1r" ><div class="msg-img" ><img src="img/' + pic + '" /></div><div class="msg"><span>' + content + '</span></div></div>',
			btn: ['确定'],
			skin: 'layui-layer-diy w12', //样式类名
			closeBtn: 0, //不显示关闭按钮
			anim: 4,
			btn1: function(index, layero) {
				layer.close(index);
				btn1_opt();
			}
		});
	},
	'list': function(title, btn1_opt) {
		layer.open({
			type: 1,
			title: false,
			content: '<div class="lay-main" ><div class="ticket-title">' + title + '</div><div class="ticket-list" id="business-list"> <ul></ul> </div></div>',
			btn: ['取消'],
			skin: 'layui-layer-diy btn-1 w16',
			anim: 4,
			scrollbar: false,
			btn1: function(index, layero) {
				$("#container-box").removeClass('alpha');
				$("body").removeClass('alpha');
				layer.close(index);
				btn1_opt();				
			},
			success: function(layero, index) {}
		});
	},
	'confirm': function(btn1_opt,btn2_opt,success_opt) {
		layer.open({
			type: 1,
			title: false,
			content: '<div class="lay-main" ><div class="text-title flex flex-hc" id="tips-title"></div><div class="text-content flex flex-hc" id="tips-content"></div></div>',
			closeBtn: 0,
			btn: ['是', '否'],
			skin: 'layui-layer-diy btn-2 w16',
			anim: 4,
			btn1: function(index, layero) {
//				isChoose = '是';
//				window.location.href = "agreement_1.html?phone=" + phone + "&ophone=" + ophone + "&oname=" + oname + "&random=" + random + "&stype=" + stype + "&djtype=" + djtype + "&isChoose=" + isChoose + "&shequ=" + shequ + "&shi=" + shi;
			},
			btn2: function(index, layero) {
//				isChoose = '否';
//				window.location.href = "agreement_1.html?phone=" + phone + "&ophone=" + ophone + "&oname=" + oname + "&random=" + random + "&stype=" + stype + "&djtype=" + djtype + "&isChoose=" + isChoose + "&shequ=" + shequ + "&shi=" + shi;
			},
			success: function(layero, index) {
				success_opt();
			}
		});
	}
}