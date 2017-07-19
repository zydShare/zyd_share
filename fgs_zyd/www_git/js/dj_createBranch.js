$(function() {
	//url参数和全局变量
	var onlyID = decodeURI(html_name('onlyID'));

	//类型
	var data = {};
	data.onlyID = onlyID;
	data = JSON.stringify(data);
	$.ajax({
		type: "POST",
		url: "/ajax.post?func=CZ_fgs_price_dujia",
		data: 'data=' + data,
		success: function(p) {
			console.log(p)
			if(p.状态 == '成功') {
				$('#type_name').html(p.类型名称);
				$('#type_name').attr('data_id', p.类型id);
				$('#package_money').html(Number(p.类型金额).toFixed(2));
				$('#sum').html(Number(p.类型金额).toFixed(2));
				$('#sum').attr('data_money', p.类型金额);
				subscribe();
			}
		}
	})
	//认股股数
	function subscribe() {
		var money_st = $("#sum").attr('data_money');
		var count_st = $(".write").val();
		var max_count = 100;
		var money = money_st;
		$('#sum').html((count_st * money_st).toFixed(2));

		$(".doincre").click(function() {
			var count = $(".write").val();
			count++;
			$(".write").val(count);
			if(count > max_count) {
				$(".write").val(max_count);
				count = max_count;
				$('#sum').html((count * money).toFixed(2));
				t = 3;
				var money_max_tips = '购买数量不能大于100'
				tips(money_max_tips);
			} else if(count > 100) {
				console.log(max_count);
				console.log(count);
				$(".write").val(100);
				count = 100;
				$('#sum').html((count * money).toFixed(2));
				t = 3;
				var money_max_tips = '购买数量不能大于100'
				tips(money_max_tips);
			} else {
				$('#sum').html((count * money).toFixed(2));
			}

		});
		$(".dodecre").click(function() {
			var count = $(".write").val();
			count--;
			$(".write").val(count);
			if(count < 1) {
				$(".write").val(1);
				count = 1;
				$('#sum').html((count * money).toFixed(2));
				//		t = 3;
				//		var money_min_tips = '购买数量不能小于1'
				//		tips(money_min_tips);
			} else {
				$('#sum').html((count * money).toFixed(2));
			}
		});

		$(".write").bind('input propertychange', function() {
			var count_input = $(".write").val();
			if(parseInt(count_input) > max_count) {
				t = 3;
				tips('购买数量不能大于100');
				$(".write").val(1);
				$("#sum").html(Number(money_st).toFixed(2));
			} else {
				console.log(count_input, money)
				$('#sum').html((count_input * money).toFixed(2));
			}

		})
		$(".write").change(function() {
			var count_input = $(".write").val();
			if(count_input == "") {
				$(".write").val(1);
				$("#sum").html(Number(money_st).toFixed(2));
			}
		})
	}

	//服务商手机号
	$('#fws_tel').focus(function() {
		$('#fws_tel').val($('#fws_tel').val());
		$('#fws_name').html('');
	});
	$('#fws_tel').blur(function() {
		var phone = $('#fws_tel').val();
		var data = {};
		data.onlyID = onlyID;
		data.账号 = phone;
		data = JSON.stringify(data);
		if(phone !== '') {
			$.ajax({
				url: "/ajax.post?func=CZ_fgs_name",
				type: "POST",
				data: 'data=' + data,
				success: function(d) {
					console.log(d)
					if(d.状态 == '成功') {
						$('#fws_name').html(d.姓名);
					} else if(d.状态 != "成功") {
						$('#fws_tel').val($('#fws_tel').val());
						$('#fws_name').html('');
						t = 3;
						tips(d.状态);
					}
				}
			});
		}
	});

	//下一步
	$("#nextBtn").on("click", function() {
		var area_info = $('#area').html().replace(/(^\s*)|(\s*$)/g, "").split(" ")
		var shengfen = area_info[0];
		var shiji = area_info[1];
		var shengid = $('#area').attr('data-shengid');
		var shiid = $('#area').attr('data-shiid');
		var fgs_id = $('#area_code').text() + $("#serial_number").val();
		var fgs_name = $("#branch_name").val();
		var fgs_pass = $("#fgs_password").val();
		var fws_phone = $("#fws_tel").val();
		var fgs_type = $('#type_name').html();
		var fws_name = $("#fws_name").html();
		var num_input = $('.num_input').val();
		var setID = $('#type_name').attr('data_id');
		console.log(shiid);
		console.log(shengid);
		if(shengfen == '请选择省') {
			t = 3;
			tips("请选择省份");
		} else if(shiji == '请选择市' || shiji == undefined || shiji == null) {
			t = 3;
			tips("请选择城市");
		} else if(shengid != shiid) {
			t = 3;
			tips("所选择省份和城市必须同步");
		} else if(fgs_id == '') {
			t = 3;
			tips("请输入分公司编号");
			return false;
		} else if($("#serial_number").val().length < 3) {
			t = 3;
			tips("请输入3-6位分公司编号");
			return false;
		} else if(fgs_name == "") {
			t = 3;
			tips("请输入分公司名称");
			return false;
		} else if(fgs_name.length < 2) {
			t = 3;
			tips("请输入2-12位分公司名称");
			return false;
		} else if(fgs_pass == "") {
			t = 3;
			tips("请输入分公司密码");
			return false;
		} else if(fgs_pass.length < 6) {
			t = 3;
			tips("请输入6-8位分公司密码");
			return false;
		} else if(fws_phone == "") {
			t = 3;
			tips("请输入服务商手机号码");
			return false;
		} else {
			var data = {};
			data.onlyID = onlyID;
			data.选择省份 = shengfen;
			data.选择城市 = shiji;
			data.推荐人手机号 = fws_phone;
			data.推荐人姓名 = fws_name;
			data.分公司编号 = fgs_id;
			data.分公司名称 = fgs_name;
			if(fgs_pass == null || fgs_pass == "") {
				data.分公司密码 = "";
			} else {
				data.分公司密码 = ($.md5(fgs_pass));
			}
			data.分公司类型 = fgs_type;
			data.认购股份 = num_input;
			data.分公司设置id = setID;
			data = JSON.stringify(data);
			console.log(data);
			$.ajax({
				url: "/ajax.post?func=CZ_fgs_Create_Sglobal",
				type: "POST",
				data: 'data=' + data,
				success: function(json) {
					//							console.log(json)
					if(json.状态 == "成功") {
						var prams = "prepay_id=" + json.prepay_id + "&appid=" + json.appid + "&onlyID=" + json.onlyID + "&sign=" + json.sign;
//						window.location.href = json.收银台 + "?" + prams;
					} else if(json.状态 != "成功") {
						t = 3;
						tips(json.状态);
					}
				}
			});
		}
	})
});

////	选择省市
////function clickit() {
//
//	var success = function() {
//		var quhao = '';
//		var data = {};
//		data = JSON.stringify(data);
//		$.ajax({
//			url: "/ajax.post?func=CZ_fgs_shengfen",
//			type: "POST",
//			data: 'data=' + data,
//			success: function(s) {
//				if(s.状态 == '成功') {
//
//					$(".fgs-2-sheng").append('<li class="flex-hc-vc " data-index="0"></li> <li class="flex-hc-vc"></li>');
//					//获取省级列表
//					s.省份.forEach(function(item, i) {
//						$(".fgs-2-sheng li:last-child").before('<li class="flex-hc-vc" data-index="' + (i + 1) + '">' + item.省份 + '</li>');
//					})
//					$(".fgs-2-sheng li:nth-child(2)").addClass("focus").removeClass("nofocus")
//					shi_get();
//
//					var li_i, li_h, li_data;
//
//					var lastMoveTime = 0;
//					var lastMoveStart = 0;
//					var stopInertiaMove = false;
//
//					var dom_1 = $(".fgs-2-sheng");
//					var dom_2 = $(".fgs-2-shi");
//
//					function sheng_change_focus() {
//						li_h = $(".fgs-2-sheng li").height();
//						if(dom_1.scrollTop()<(li_h/2)){
//							li_i=0;
//						}else{
//						li_i = Math.round(dom_1.scrollTop() / li_h);
//							
//						}
//
//
//						console.log(dom_1.scrollTop());
//						console.log(li_i);
//						dom_1.scrollTop(li_i * li_h);
//						li_data = $(".fgs-2-sheng li:eq(" + (li_i + 1) + ")").attr("data-index");
//						if(li_data == (li_i + 1)) {
//							$(".fgs-2-sheng li:eq(" + (li_i + 1) + ")").removeClass("nofocus").addClass("focus")
//							$(".fgs-2-sheng li:eq(" + (li_i + 1) + ")").siblings().removeClass("focus").addClass("nofocus")
//						}
//
//					}
//
//					function shi_change_focus() {
//						li_h = $(".fgs-2-shi li").height();
//
//						if(dom_1.scrollTop()<(li_h/2)){
//							li_i=0;
//						}else{
//						li_i = Math.round(dom_2.scrollTop() / li_h);
//							
//						}
//
//						console.log(dom_1.scrollTop());
//						console.log(li_i);
//						dom_2.scrollTop(li_i * li_h);
//						li_data = $(".fgs-2-shi li:eq(" + (li_i + 1) + ")").attr("data-index");
//						if(li_data == (li_i + 1)) {
//							$(".fgs-2-shi li:eq(" + (li_i + 1) + ")").removeClass("nofocus").addClass("focus")
//							$(".fgs-2-shi li:eq(" + (li_i + 1) + ")").siblings().removeClass("focus").addClass("nofocus")
//						}
//					}
//
//					function shi_get() {
//						var data2 = {};
//						data2.省 = $(".fgs-2-sheng li.focus").html();
//						data2 = JSON.stringify(data2);
//						$.ajax({
//							url: "/ajax.post?func=CZ_fgs_shijihuoqu",
//							type: "POST",
//							data: 'data=' + data2,
//							success: function(d) {
//								//获取市级列表
//								if(d.状态 == '成功') {
//									$(".fgs-2-shi").empty();
//									$(".fgs-2-shi").append('<li class="flex-hc-vc " data-index="0"></li> <li class="flex-hc-vc"></li>');
//									d.市级列表.forEach(function(item, i) {
//										$(".fgs-2-shi li:last-child").before('<li class="flex-hc-vc" data-index="' + (i + 1) + '" data_id=' + item.区号 + '>' + item.城市 + '</li>');
//									});
//									$(".fgs-2-shi li:nth-child(2)").addClass("focus").removeClass("nofocus")
//								}
//							}
//						})
//					}
//
//						dom_1.bind(touchEvents.touchstart, function(event) {
//							//mousewheel
//							sheng_change_focus()
//							//惯性缓动 var nowTime = new Date().getTime(); console.log(nowTime,"-------------klaus-------------"); console.log(lastMoveTime,"-------------laura-------------");  stopInertiaMove = true; console.log(stopInertiaMove); if(nowTime - lastMoveTime > 300) {  }
//
//						})
//
//						dom_1.bind(touchEvents.touchmove, function(event) {
//							sheng_change_focus()
//
//						})
//
//						dom_1.bind(touchEvents.touchend, function(event) {
//							sheng_change_focus()
//
//							//调用获取市级列表
//							shi_get()
//
//							dom_2.bind(touchEvents.touchend, function(event) {
//								shi_change_focus()
//							});
//							dom_2.bind(touchEvents.touchmove, function(event) {
//								shi_change_focus()
//							});
//
//							dom_2.bind(touchEvents.touchend, function(event) {
//								shi_change_focus()
//							});
//
//						});
//
//
//				}
//			}
//		});
//
//	}
//
//	var layer_input = '<div class="flex-hc-vc laymain"> <ul class="fgs-2-sheng "></ul>  <ul class="fgs-2-shi"></ul> </div> <div class="flex-hc-vc comeback"> <p class="sheng"></p> <p class="shi"></p> </div>';
//
//	var T_button = function(index) {
//
//		var area_code = $(".fgs-2-shi li").attr('data_id');
//		var sheng = $(".comeback .sheng").text();
//		var shi = $(".comeback .shi").text();
//		if(sheng == null || sheng == '' || sheng == undefined) {
//			t = 3;
//			tips('请完善区域信息');
//			return false;
//		} else if(shi == null || shi == '' || shi == undefined) {
//			t = 3;
//			tips('请完善区域信息');
//			return false;
//		}
//
//		$("#area_code").html(area_code);
//		$("#area").html($(".comeback").text().replace(/(^\s*)|(\s*$)/g, ""));
//		layer.close(index);
//	}
//
//	var F_button = function() {}
//	layObj.content_3("选择省市", layer_input, T_button, F_button, success);
//
//	var touchEvents = {
//		touchstart: "touchstart",
//		touchmove: "touchmove",
//		touchend: "touchend",
//		// @desc:判断是否pc设备，若是pc，需要更改touch事件为鼠标事件，否则默认触摸事件
//		initTouchEvents: function() {
//			if(isPC()) {
//				this.touchstart = "mousedown";
//				this.touchmove = "mousemove";
//				this.touchend = "mouseup";
//			}
//		}
//	};
//}

var nameEl = document.getElementById('area');
var dataEl = document.getElementById('area_code');

var first = []; /* 省，直辖市 */
var second = []; /* 市 */
var third = []; /* 镇 */

var selectedIndex = [0, 0]; /* 默认选中的地区 */

var checked = [0, 0]; /* 已选选项 */

function creatList(obj, list) {
	obj.forEach(function(item, index, arr) {
		var temp = new Object();
		//		城市名
		temp.text = item.name;
		temp.data = item.quhao;
		temp.value = index;
		temp.num = item.index;
		console.log(temp.value)
		//		console.log(temp.num )
		list.push(temp);

	})

}

creatList(city, first);

if(city[selectedIndex[0]].hasOwnProperty('sub')) {
	creatList(city[selectedIndex[0]].sub, second);
	console.log(creatList(city[selectedIndex[0]].sub, second))
} else {
	second = [{ text: '', value: 0 }];
}

if(city[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
	creatList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
	console.log(creatList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third))
} else {
	third = [{ text: '', value: 0 }];
}

var picker = new Picker({
	data: [first, second],
	selectedIndex: selectedIndex,
	title: '选择省市'
});

picker.on('picker.select', function(selectedVal, selectedIndex) {

	var text1 = first[selectedIndex[0]].text;
	var text2 = second[selectedIndex[1]].text;
	var text4 = second[selectedIndex[1]].data;

	var text5 = first[selectedIndex[0]].value;
	var text6 = second[selectedIndex[1]].num - 1;

	console.log(text5)
	console.log(text6)
	//	var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
	nameEl.innerHTML = text1 + ' ' + text2;
	nameEl.setAttribute('data-shengid', text5);
	nameEl.setAttribute('data-shiid', text6);

	dataEl.innerHTML = text4;

});

picker.on('picker.change', function(index, selectedIndex) {
	if(index === 0) {
		firstChange();
	} else if(index === 1) {
		secondChange();
	}

	function firstChange() {
		second = [];
		//		third = [];
		checked[0] = selectedIndex;
		var firstCity = city[selectedIndex];
		if(firstCity.hasOwnProperty('sub')) {
			creatList(firstCity.sub, second);

			var secondCity = city[selectedIndex].sub[0]
			if(secondCity.hasOwnProperty('sub')) {
				//				creatList(secondCity.sub, third);
			} else {
				//				third = [{ text: '', value: 0 }];
				checked[2] = 0;
			}
		} else {
			second = [{ text: '', value: 0 }];
			third = [{ text: '', value: 0 }];
			checked[1] = 0;
			checked[2] = 0;
		}

		picker.refillColumn(1, second);
		picker.refillColumn(2, third);
		picker.scrollColumn(1, 0)
		picker.scrollColumn(2, 0)
	}

	function secondChange() {
		//		third = [];
		checked[1] = selectedIndex;
		var first_index = checked[0];
		if(city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
			var secondCity = city[first_index].sub[selectedIndex];
			//			creatList(secondCity.sub, third);
			picker.refillColumn(2, third);
			picker.scrollColumn(2, 0)
		} else {
			//			third = [{ text: '', value: 0 }];
			//			checked[2] = 0;
			//			picker.refillColumn(2, third);
			//			picker.scrollColumn(2, 0)
		}
	}

});

picker.on('picker.valuechange', function(selectedVal, selectedIndex) {
	console.log(selectedVal);
	console.log(selectedIndex);
});

nameEl.addEventListener('click', function() {
	picker.show();
});