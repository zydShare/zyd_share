$(function() {
			var onlyID = decodeURI(html_name('onlyID'));
			var data = {};
			var count = $("#kuangq").val();
			var shezhiID = null;
			var jine = 0;

			//获取当前页面高度
			var winHeight = $(window).height();
			$(window).resize(function() {
				var thisHeight = $(this).height();
				if(winHeight - thisHeight > 50) {
					//窗口发生改变(大),故此时键盘弹出
					//当软键盘弹出，在这里面操作
					$('footer').css({ 'display': 'none' });
				} else {
					//窗口发生改变(小),故此时键盘收起
					//当软键盘收起，在此处操作
					$('footer').css({ 'display': 'block' });
				}
			});

			//公司编号返回公司名称
			$("#bianhao").blur(function() {
				$(".jia").unbind('click');
				$(".jian").unbind('click');
				var bianhao2 = $(this).val();
				var data = {};
				data.分公司编号 = $(this).val();
				data = JSON.stringify(data);
				$.ajax({
					url: "/ajax.post?func=CZ_fgs_fgsnameSQ",
					type: "POST",
					data: 'data=' + data,
					success: function(json) {

						if(json.状态 == "成功") {

							$("#fgs_name").val(json.分公司名称);

						} else if(json.状态 != "成功") {
							t = 3;
							toast(json.状态);
							$("#bianhao").val('');
						}
					}

				});

				$("#bianhao").click(function() {

					$("#fgs_name").val('');
					$("#f-company-name").val('请选择');
					$(".in-span").html("0.00");
					$(".kuang").val("1");
				})

			})
			$(document).ready(function() {
				//公司编号返回类型
				$('#f-company-name').empty();
				var data = {};
				data.onlyID = onlyID;
				data = JSON.stringify(data);
				$.ajax({
					url: "/ajax.post?func=CZ_fgs_price_shequ",
					type: "POST",
					data: 'data=' + data,
					success: function(json) {
						if(json.状态 == "成功") {
							json.套餐列表.forEach(function(name, key) {
								jine = parseInt(name.单股金额);
								$('#f-company-name').append("<option value='请选择'>请选择</option>")
								$('#f-company-name').append("<option value='" + name.名称 + "' id='f-comp-name'>" + name.名称 + "&nbsp;" + name.单股金额 + "</option>");
								shezhiID = name.id
							})
						} else if(json.状态 != "成功") {
							$('#f-company-name').append("<option value='请选择'>请选择</option>")
						}
					}

				});
			})

			$("#f-company-name").change(function() {
				//				console.log($('#f-company-name').val());
				//				var atr1=($('#f-company-name')).split(" ");
				//				$("#f-company-name").val(atr1[0]);

				$(".in-span").html(jine.toFixed(2));
				if($(this).val() === '请选择') {
					$(".in-span").html("0.00");
					$(".kuang").val("1");
					$(".jia").unbind('click');
					$(".jian").unbind('click');
				} else {
					$(".jia").click(function(e) {
						count = $("#kuangq").val();
						count++;
						$("#kuangq").val(count);
						if(count > 10) {
							$("#kuangq").val(10);
							count = 10;
							t = 3;
							toast("不能超过10股");
							$(".in-span").html((jine * count).toFixed(2))
						} else {
							$(".in-span").html((jine * count).toFixed(2))
						}
					});
					$(".jian").click(function(e) {
						count = $("#kuangq").val();
						count--;
						$("#kuangq").val(count);
						if(count < 1) {
							$("#kuangq").val(1);
							count = 1;
							t = 3;
							toast("不能少于1股");
							$(".in-span").html((jine * count).toFixed(2))
						} else {
							$(".in-span").html((jine * count).toFixed(2))
						}

					});

				}
			})

			//用户手机带出姓名
			$('#f_phone').click(function() {
				$("#f_name").val('');
			});
			$("#f_phone").blur(function() {
				var f_phone1 = $(this).val();

				if(f_phone1 == null || f_phone1 == "") {
					t = 3;
					toast('请输入服务商手机号');
				}
				var data = {};
				data.onlyID = onlyID;
				data.账号 = $(this).val();
				data = JSON.stringify(data);
				$.ajax({
					url: "/ajax.post?func=CZ_fgs_name",
					type: "POST",
					data: 'data=' + data,
					success: function(json) {
						if(json.状态 == "成功") {
							$("#f_name").val(json.姓名);
						} else if(json.状态 != "成功") {
							t = 3;
							toast(json.状态);
							$("#f_phone").val('');
						}
					}

				});
			})

			//接受协议
			//			var xieyi=$("#liexing").val()
			//			
			//			$(".xieyi").click(function(){
			//				window.location.href = "http://localhost:8988/xieyi.html&xieyi="+xieyi+"";
			//			})

			//下一步

			$(".button1").click(function() {
				
				var fgs_id = $("#bianhao").val();
				var fgs_name = $("#fgs_name").val();
				var fgs_pass = $("#mima").val();
				var fws_phone = $("#f_phone").val();
				var fws_name = $("#f_name").val();
				var fgs_type = $("#f-company-name").val();

				var pic = "ic_type_warning.png";
				var content = "";
				var reload = function() {};

				if(fgs_id == "") {
					//					t = 3;
					//					toast("请输入分公司编号");
					//					return false;
					content = '请输入分公司编号';
					layObj.tips(pic, content, reload);
				} else if(fgs_type == '请选择' || fgs_type == null) {
					//					t = 3;
					//					toast('请选择分公司类型');

					content = '请选择分公司类型';
					layObj.tips(pic, content, reload);
				} else if(fgs_pass == "") {
					//					t = 3;
					//					toast("请输入分公司密码");
					//					return false;
					content = '请输入分公司密码';
					layObj.tips(pic, content, reload);

				} else if(fws_phone == "") {
					//					t = 3;
					//					toast("请输入服务商手机号");
					//					return false;
					content = '请输入服务商手机号';
					layObj.tips(pic, content, reload);
				} else {
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
					data.服务商姓名 = fws_name;
					data.设置id = shezhiID;
					data.金额 = $(".in-span").html();
					data.股数 = $(".kuang").val();
					data = JSON.stringify(data);
					$.ajax({
						url: "/ajax.post?func=CZ_fgs_join_shequglobal",
						type: "POST",
						data: 'data=' + data,
						success: function(json) {
							if(json.状态 == "成功") {
								var prams = "prepay_id=" + json.prepay_id + "&appid=" + json.appid + "&onlyID=" + json.onlyID + "&sign=" + json.sign;
								window.location.href = json.收银台 + "?" + prams;

							} else if(json.状态 != "成功") {
								content = json.状态;
								layObj.tips(pic, content, reload);
							}
						}

					});
				}
			})
		})