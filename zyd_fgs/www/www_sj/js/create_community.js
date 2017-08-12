$(function() {
	var onlyID = decodeURI(html_name('onlyID'));

	var quyu = "";
	var jine = 0;
	var fenID = null;
	var quhao = '';
	var zhishu_fgs = '';
	//循环省
	var data = {};

	data = JSON.stringify(data);
	$.ajax({
		url: "/ajax.post?func=CZ_fgs_shengfen",
		type: "POST",
		data: 'data=' + data,
		success: function(s) {
			//					console.log(s);
			if(s.状态 == '成功') {
				s.省份.forEach(function(item) {
					$('#fgs-sheng').append("<option value='" + item.省份 + "'  placeholder=''>" + item.省份 + "</option>")
				})
			}
		}
	});
	//点击省

	$("#fgs-sheng").change(function() {
		$('#fgs-shi').empty();
		$('#fgs-qu').empty();
		var data = {};
		data.省 = $('#fgs-sheng').val();
		data = JSON.stringify(data);
		$.ajax({
			url: "/ajax.post?func=CZ_fgs_shijihuoqu",
			type: "POST",
			data: 'data=' + data,
			success: function(d) {
				if(d.状态 == '成功') {
					$('#fgs-shi').append("<option value='请选择市'  placeholder=''>请选择市</option>");
					d.市级列表.forEach(function(item) {
						$('#fgs-shi').append("<option value='" + item.城市 + "' data-id='" + item.区号 + "' placeholder=''>" + item.城市 + "</option>");

					});
					$('#fgs-qu').append("<option value='请选择区' >请选择区</option>")
				} else if(d.状态 == '请输入省份') {
					$('#fgs-shi').append("<option value=''>请选择市</option>");
					$('#fgs-qu').append("<option value=''>请选择区</option>")
				}
			}
		});
	});
	//点击市
	$('#fgs-shi').change(function() {
		$('.fgs-gl-name').empty();
		if($("#fgs-shi option:selected").html() == "请选择市") {
			$('.in-sp').html("区号");

		} else {
			$('.in-sp').html($("#fgs-shi option:selected").attr("data-id"));

		}
		$("#changeInput").remove();
		$('#fgs-qu').remove();
		fgs_panduan = $('#fgs-shi').val();
		var da = {};
		var arr = ($('#fgs-shi').val()).split(",");
		da.市 = arr[0];
		da = JSON.stringify(da);
		$.ajax({
			url: "/ajax.post?func=CZ_fgs_qujihuoqu",
			type: "POST",
			data: 'data=' + da,
			success: function(d) {

				if(d.状态 == '成功') {
					$('.he-body').append('<select id="fgs-qu"><option value="请选择区">请选择区</option></select>');
					d.区级列表.forEach(function(item) {
						$('#fgs-qu').append("<option value='" + item.名称 + "' >" + item.名称 + "</option>")
					})
					$('.fgs-gl-name').html("")
					var fgs = {};

					fgs_leixing = $('#f-company-name').val();
					//					  fgs_leixing =$('#f-company-name option:selected').text();
					//					 fgs_leixing =document.getElementById("f-company-name").option;
					fgs.城市 = arr[0];
					fgs.分公司类型 = fgs_leixing;
					fgs = JSON.stringify(fgs);
					$.ajax({
						url: "/ajax.post?func=CZ_fgs_GLfgslist",
						type: "POST",
						data: 'data=' + fgs,
						success: function(s) {
							if(s.状态 == '成功') {
								if(s.列表 == "" || s.列表 == null) {
									//									$('.fgs-gl-name').append("<option value='无可选管理分公司'>无可选管理分公司</option>");
									$('.fgs-gl-name').append("<option value='请选择'>请选择</option>");
								} else {
									$('.fgs-gl-name').append("<option value='请选择'>请选择</option>");
									s.列表.forEach(function(i) {
										$('.fgs-gl-name').append("<option value='" + i.名称 + "'>" + i.名称 + "</option>");
									})
								}
							} else if(json.状态 != "成功") {
								t = 3;
								toast(json.状态);
							}
						}
					});

					$("#fgs-qu").change(function() {

						quyu = $(this).val();

					});
				} else {
					$(".he-body").append('<input type="text" id="changeInput" placeholder="请详细填写"/>');
					$("#changeInput").change(function() {
						quyu = $("#changeInput").val();
					})
					var fgs = {};

					fgs_leixing = $('#f-company-name').val();
					//					  fgs_leixing =$('#f-company-name option:selected').text();
					//					 fgs_leixing =document.getElementById("f-company-name").option;
					fgs.城市 = arr[0];
					fgs.分公司类型 = fgs_leixing;
					fgs = JSON.stringify(fgs);
					$.ajax({
						url: "/ajax.post?func=CZ_fgs_GLfgslist",
						type: "POST",
						data: 'data=' + fgs,
						success: function(s) {
							if(s.状态 == '成功') {
								if(s.列表 == "" || s.列表 == null) {
									$('.fgs-gl-name').append("<option value='无可选管理分公司'>无可选管理分公司</option>");
									//									$(".in-span").html('');
								} else {
									$('.fgs-gl-name').append("<option value='请选择'>请选择</option>");
									s.列表.forEach(function(i) {
										$('.fgs-gl-name').append("<option value='" + i.名称 + "'>" + i.名称 + "</option>");
									})
									$(".in-span").html('0.00');
								}
							} else if(json.状态 != "成功") {
								t = 3;
								toast(json.状态);
							}
						}
					});
				}
			}
		});
	});
	//创建社区代理分公司
	var fgs_leixing = "";
	var fgs_panduan = ""
	$("#f-company-name").change(function() {
		$('.fgs-gl-name').empty();
		var fgs = {};
		fgs_panduan = $('#fgs-shi').val();
		fgs_leixing = $('#f-company-name').val();

		fgs.城市 = fgs_panduan;
		fgs.分公司类型 = fgs_leixing;
		fgs = JSON.stringify(fgs);
		$.ajax({
			url: "/ajax.post?func=CZ_fgs_GLfgslist",
			type: "POST",
			data: 'data=' + fgs,
			success: function(s) {
				console.log(s)
				if(s.状态 == '成功') {
					if(s.列表 == "" || s.列表 == null) {
						$('.fgs-gl-name').append("<option value='无可选管理分公司'>无可选管理分公司</option>");

					} else {
						$('.fgs-gl-name').append("<option value='请选择'>请选择</option>");
						s.列表.forEach(function(i) {
							$('.fgs-gl-name').append("<option value='" + i.编号 + "'>" + i.名称 + "</option>");
						})
					}
				} else if(json.状态 != "成功") {
					t = 3;
					toast(json.状态);
				}
			}
		});
	});

	//服务商手机号
	$('#fuwu_tel').click(function() {
		$('#fuwu_name').val('');
	});
	$('#fuwu_tel').blur(function() {
		var fuwu_tel = $(this).val();

		if(fuwu_tel != null && fuwu_tel != "") {
			var data = {};
			data.onlyID = onlyID;
			data.账号 = $('#fuwu_tel').val();
			data = JSON.stringify(data);
			$.ajax({
				url: "/ajax.post?func=CZ_fgs_name",
				type: "POST",
				data: 'data=' + data,
				success: function(d) {
					if(d.状态 == '成功') {
						$('#fuwu_name').val(d.姓名);
						推荐人姓名 = d.姓名;
					} else if(d.状态 != "成功") {
						推荐人姓名 = '';
						$('#fuwu_tel').val("");
						t = 3;
						toast(d.状态);
					}
				}
			});
		}
	});

	//选择类型

	var r = {};
	r.onlyID = onlyID;
	r = JSON.stringify(r);
	$.ajax({
		url: "/ajax.post?func=CZ_fgs_price_shequ",
		type: "POST",
		data: 'data=' + r,
		success: function(s) {
			if(s.状态 == '成功') {
				s.套餐列表.forEach(function(i) {
					$('#f-company-name').append("<option value='" + i.名称 + "' id='f-comp-name'>" + i.名称 + "&nbsp;" + i.单股金额 + "</option>");

					jine = i.单股金额;
					fenID = i.id;
				})
			}
		}
	})
	//类型返回金额
	//	$('#f-company-name').change(function() {
	//		$(".in-span").html("");
	//		$(".in-span").html(jine + ".00");
	//	})
	//下一步
	$(".button1").click(function() {
		var shengfen = $("#fgs-sheng").val();
		var shiji = $("#fgs-shi").val();
		var fgs_id = $("#fgs_bianhao1").val();
		var fgs_name = $("#fgs_name1").val();
		var fgs_pass = $("#fgs_pwd1").val();
		var fgs_type = $("#f-company-name").val();
		var fws_phone = $("#fuwu_tel").val();;
		var fgs_gl_name = $(".fgs-gl-name").val();
		var fuwu_name = $("#fuwu_name").val();

		var pic = "ic_type_warning.png";
		var content = "";
		var reload = function() {};

		if(shengfen == '请选择省') {
			//			t = 3;
			//			toast("请选择省份");

			content = '请选择省份';
			layObj.tips(pic, content, reload);

		} else if(shiji == '请选择市' || shiji == undefined || shiji == null) {
			//			t = 3;
			//			toast("请选择城市");

			content = '请选择城市';
			layObj.tips(pic, content, reload);

		} else if(quyu == '' || quyu == "请选择区") {
			//			t = 3;
			//			toast("请完善分公司区域信息");

			content = '请完善分公司区域信息';
			layObj.tips(pic, content, reload);

		} else if(fgs_id == '') {
			//			t = 3;
			//			toast("请输入分公司编号");
			//			return false;

			content = '请输入分公司编号';
			layObj.tips(pic, content, reload);
		} else if(fgs_name == "") {
			//			t = 3;
			//			toast("请输入分公司名称");
			//			return false;

			content = '请输入分公司名称';
			layObj.tips(pic, content, reload);
		} else if(fgs_pass == "") {
			//			t = 3;
			//			toast("请输入分公司密码");
			//			return false;

			content = '请输入分公司密码';
			layObj.tips(pic, content, reload);
		} else if(fgs_type == '请选择' || fgs_type == null) {
			//			t = 3;
			//			toast("请选择分公司类型");
			//			return false;

			content = '请选择分公司类型';
			layObj.tips(pic, content, reload);
		} else if(fws_phone == "") {
			//			t = 3;
			//			toast("请输入服务商手机号");
			//			return false;

			content = '请输入服务商手机号';
			layObj.tips(pic, content, reload);
		} else if(fgs_id.length < 3) {
			//			t = 3;
			//			toast("请输入3-6位分公司编号");
			//			return false;

			content = '请输入3-6位分公司编号';
			layObj.tips(pic, content, reload);
		} else if(fgs_name.length < 2) {
			//			t = 3;
			//			toast("请输入2-12位分公司名称");
			//			return false;

			content = '请输入2-12位分公司名称';
			layObj.tips(pic, content, reload);
		} else if(fgs_pass.length < 6) {
			//			t = 3;
			//			toast("请输入6-8位分公司密码");
			//			return false;

			content = '请输入6-8位分公司密码';
			layObj.tips(pic, content, reload);
		} else {
			var data = {};
			data.onlyID = onlyID;
			data.选择省份 = shengfen;
			data.推荐人手机号 = fws_phone;
			data.选择城市 = shiji;
			data.选择区 = quyu;
			console.log(data.选择区)
			data.推荐人姓名 = fuwu_name;
			data.分公司编号 = $(".in-sp").html() + $("#fgs_bianhao1").val();
			data.分公司名称 = fgs_name;
			var fgs_gl = $(".fgs-gl-name").val();
			console.log(fgs_gl)
			if(fgs_gl == '请选择') {
				data.推荐分公司编号 = '';
			} else if(fgs_gl == '无可选管理分公司') {
				data.推荐分公司编号 = '';
			} else {
				data.推荐分公司编号 = fgs_gl;
			}
			if(fgs_pass == null || fgs_pass == "") {
				data.分公司密码 = "";
			} else {
				data.分公司密码 = ($.md5(fgs_pass));
			}
			data.分公司类型 = fgs_type;
			data.认购股份 = '1';
			data.分公司设置id = fenID;
			appType();
			data.is_shop = app_type;
			data = JSON.stringify(data);
			console.log(data)
			$.ajax({
				url: "/ajax.post?func=CZ_fgs_create_sq",
				type: "POST",
				data: 'data=' + data,
				success: function(json) {
					if(json.状态 == "成功") {
						var prams = "prepay_id=" + json.prepay_id + "&appid=" + json.appid + "&onlyID=" + json.onlyID + "&sign=" + json.sign;
						window.location.href = json.收银台 + "?" + prams;
					} else if(json.状态 != "成功") {
						t = 3;
						toast(json.状态);
					}
				}
			});
		}
	})
	$('#f-company-name').change(function() {
		if($("#f-company-name option:selected").html() == "请选择") {
			$(".in-span").html("0.00");
		} else {
			$(".in-span").html(jine + ".00");
		}

	})

})