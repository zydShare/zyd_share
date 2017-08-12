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

	//公司编号返回公司名称
	$('#join_bh').focus(function() {
//		$('#join_bh').val('')
		$('#fgs_name').html('');
	});
	$("#join_bh").blur(function() {
		var fgs_num = $(this).val();
		var data = {};
		data.分公司编号 = fgs_num;
		data = JSON.stringify(data);
		if(fgs_num !== '') {
			$.ajax({
				url: "/ajax.post?func=CZ_fgs_DJname",
				type: "POST",
				data: 'data=' + data,
				success: function(json) {
					console.log(json)
					if(json.状态 == "成功") {
						$("#fgs_name").html(json.分公司名称);
					} else if(json.状态 != "成功") {
						t = 3;
						tips(json.状态);
						$('#join_bh').val('');
						$('#fgs_name').html('');
					}
				}
			});
		}
	});
	//认股股数
	function subscribe() {
		var money_st = $("#sum").attr('data_money');
		var count_st = $(".write").val();
		var max_count = 100;
		var money = money_st;
		$('#sum').html((count_st * money_st).toFixed(2));

		$(".doincre").off("click").on("click", function() {
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
		$(".dodecre").off("click").on("click", function() {
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
				//							console.log(count_input, money)
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
//		$('#fws_tel').val($('#fws_tel').val());
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
//					console.log(d)
					if(d.状态 == '成功') {
						$('#fws_name').html(d.姓名);
					} else if(d.状态 != "成功") {
						$('#fws_tel').val("");
						$('#fws_name').html('');
						t = 3;
						tips(d.状态);
					}
				}
			});
		}
	});

	//下一步
	$("#nextBtn").off("click").on("click", function() {
		var fgs_id = $("#join_bh").val();
		var fgs_name = $("#fgs_name").html();
		var fgs_pass = $("#fgs_password").val();
		var fws_phone = $("#fws_tel").val();
		var num_input = $('.num_input').val();
		var total_money = $("#sum").html();
		var setID = $('#type_name').attr('data_id');
		var fws_name = $("#fws_name").html();
		
		var pic = "ic_type_warning.png";
		var content = "";
		var reload = function() {};
		
		if(fgs_id == '') {
//			t = 3;
//			tips("请输入分公司数字编号");
//			return false;
			
			content = '请输入分公司数字编号';
			layObj.tips(pic, content, reload);
		}else if(fgs_name == "") {
//			t = 3;
//			tips("请输入分公司名称");
//			return false;
			
			content = '请输入分公司名称';
			layObj.tips(pic, content, reload);
		} else if(fgs_pass == "") {
//			t = 3;
//			tips("请输入分公司密码");
//			return false;
			
			content = '请输入分公司密码';
			layObj.tips(pic, content, reload);
		} else if(fgs_pass.length < 6) {
//			t = 3;
//			tips("请输入6至8位数字密码");
//			return false;
			
			content = '请输入6至8位数字密码';
			layObj.tips(pic, content, reload);
		} else if(fws_phone == "") {
//			t = 3;
//			tips("请输入服务商手机号码");
//			return false;
			
			content = '请输入服务商手机号码';
			layObj.tips(pic, content, reload);
		} else if(fws_name == "") {
//			t = 3;
//			tips("请输入服务商名称");
//			return false;
			
			content = '请输入服务商名称';
			layObj.tips(pic, content, reload);
		}else {
			var data = {};
			data.onlyID = onlyID;
			data.分公司编号 = fgs_id;
			data.分公司名称 = fgs_name;
			if(fgs_pass == null || fgs_pass == "") {
				data.分公司密码 = "";
			} else {
				data.分公司密码 = ($.md5(fgs_pass));
			}
			data.服务商手机号 = fws_phone;
			data.设置id = setID;
			data.金额 = total_money;
			data.股数 = num_input;
			appType();
		data.is_shop = app_type;
			data = JSON.stringify(data);
			//						console.log(data)
			$.ajax({
				url: "/ajax.post?func=CZ_fgs_Join_Sqlobal",
				type: "POST",
				data: 'data=' + data,
				success: function(json) {
					//								console.log(json);
					if(json.状态 == "成功") {
						var prams = "prepay_id=" + json.prepay_id + "&appid=" + json.appid + "&onlyID=" + json.onlyID + "&sign=" + json.sign;
						window.location.href = json.收银台 + "?" + prams;
					} else if(json.状态 != "成功") {
//						t = 3;
//						tips(json.状态);
						content = json.状态;
						layObj.tips(pic, content, reload);
					}
				}
			});
		}
	})
})