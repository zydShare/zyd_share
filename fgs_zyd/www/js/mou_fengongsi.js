//获取身份,是否有修改权限
var status = decodeURI(html_name('status'));
if(status === "创始人") {
	$('#changePassword').show();
}

//传入唯一ID和分公司编号
var onlyID = decodeURI(html_name('onlyID'));
var conid = decodeURI(html_name('conid'));
var tqMon;

//判断有无数据并页面跳转
function my_details() {
	var data = {};
	data.onlyID = onlyID;
	data.分公司编号 = conid;
	data = JSON.stringify(data);
	$.ajax({
		type: "POST",
		url: "/ajax.post?func=CZ_fgs_my_gains",
		data: 'data=' + data,
		success: function(a) {
			//						console.log(a);
			if(a.状态 == "成功") {
				if(a.列表.length === 0) {
					window.location.href = "404.html?onlyID=" + onlyID + "&conid=" + conid + "&tit=我的赠送明细";
				} else {
					window.location.href = "fgs_returns_detailed.html?onlyID=" + onlyID + "&conid=" + conid;
				}
			} else {
				window.location.href = "404.html?onlyID=" + onlyID + "&conid=" + conid + "&tit=我的赠送明细";
			}
		}
	});
}

function fgs_bonus_details() {
	var data = {};
	data.分公司编号 = conid;
	data.onlyID = onlyID;
	data = JSON.stringify(data);
	$.ajax({
		type: "post",
		url: "/ajax.post?func=CZ_fgs_redmx",
		data: 'data=' + data,
		success: function(d) {
			if(d.状态 == "成功") {
				if(d.列表.length === 0) {
					window.location.href = "404.html?onlyID=" + onlyID + "&conid=" + conid + "&tit=分公司分红明细";
				} else {
					window.location.href = "fgs_bonus_details.html?onlyID=" + onlyID + "&conid=" + conid;
				}
			} else {
				window.location.href = "404.html?onlyID=" + onlyID + "&conid=" + conid + "&tit=分公司分红明细";
			}
		}
	});
}

function fgs_not_reward() {
	var data = {};
	data.分公司编号 = conid;
	data.onlyID = onlyID;
	data = JSON.stringify(data);
	$.ajax({
		type: "post",
		url: "/ajax.post?func=CZ_fgs_weifenrun",
		data: 'data=' + data,
		success: function(d) {
			//						console.log(d);
			if(d.状态 == "成功") {
				if(d.未分润列表.length === 0) {
					window.location.href = "404.html?onlyID=" + onlyID + "&conid=" + conid + "&tit=未分润奖励";
				} else {
					window.location.href = "fgs_not_reward.html?onlyID=" + onlyID + "&conid=" + conid;
				}
			} else {
				window.location.href = "404.html?onlyID=" + onlyID + "&conid=" + conid + "&tit=未分润奖励";
			}
		}
	});
}

function fgs_package() {
	window.location.href = "fgs_package.html?onlyID=" + onlyID + "&conid=" + conid;
}

function fgs_member() {
	var data = {};
	data.分公司编号 = conid;
	data.onlyID = onlyID;
	data = JSON.stringify(data);
	$.ajax({
		type: "post",
		url: "/ajax.post?func=CZ_fgs_people",
		data: 'data=' + data,
		success: function(d) {
			if(d.状态 == "成功") {
				if(d.分公司成员列表.length === 0) {
					window.location.href = "404.html?onlyID=" + onlyID + "&conid=" + conid + "&tit=分公司成员";
				} else {
					window.location.href = "fgs_member.html?onlyID=" + onlyID + "&conid=" + conid;
				}
			} else {
				window.location.href = "404.html?onlyID=" + onlyID + "&conid=" + conid + "&tit=分公司成员";
			}
		}
	});
}

function fgs_changeRewardWay() {
	window.location.href = "fgs_rewardWay.html?onlyID=" + onlyID + "&conid=" + conid;
}

$("#cancel").click(function() {
	$("#text").val("");
	$("#cancel").attr("data-dismiss", "modal");
});

var data = {};
data.onlyID = onlyID;
data.分公司编号 = conid;
data = JSON.stringify(data);
$.ajax({
	type: "POST",
	url: "/ajax.post?func=CZ_fgs_moneyxianshi",
	data: 'data=' + data,
	success: function(a) {
		if(a.状态 == "成功") {
			document.title = a.分公司名称;
			$("#f_company").html(a.总账户);
			$("#tiqu").html(a.提取整万);
			tqMon = Number(a.提取整万);
			if(tqMon != 0 && tqMon >= 100) {
				$('#libut').off('click').on('click', function() {
					real_name_authentication();
				})
			} else {
				$('#libut').on('click', function() {
					var pic = "ic_type_warning.png";
					var content = "";
					var reload = function() {};
					//					t = 3;
					//					toast('可提取积分不足');
					content = '可提取积分不足';
					layObj.tips(pic, content, reload);
				})
			}
		} else {
			t = 3;
			toast(a.状态);
		}
	}
});
//实名认证ajax函数
function real_name_authentication() {
	var data = {};
	data.onlyID = onlyID;
	data = JSON.stringify(data);
	$.ajax({
		type: "POST",
		url: "/ajax.post?func=CZ_fgs_shiming",
		data: 'data=' + data,
		success: function(d) {
			if(d.状态 == "您未在环游购进行实名认证，无法进行提取操作！"){
				var pic = "ic_type_warning.png";
				var content = "";
				var reload = function() {};
				content = d.状态;
				layObj.tips(pic, content, reload);
			}else if(d.状态 == "成功"){
				$('#myModal').modal('show');
			}
		}
	});
}

//修改密码
var pwd;
var pwd1;
var oldPwd;
var isPass = false;
$("#pass_sure").off('click').on('click', function() {
	pwd = $("#newPassword").val();
	pwd1 = $("#newPassword1").val();
	oldPwd = $("#oldPassword").val();
	if(oldPwd.length === 0) {
		t = 3;
		setTimeout(function() {
			toast("请输入分公司原密码")
		}, 300);
	} else if(pwd.length === 0) {
		t = 3;
		setTimeout(function() {
			toast("请输入分公司新密码")
		}, 300);
	} else if(pwd1.length === 0) {
		t = 3;
		setTimeout(function() {
			toast("请再次确认新密码")
		}, 300);
	} else if(pwd.length < 6 || pwd.length > 8) {
		t = 3;
		setTimeout(function() {
			toast("请输入6位到8位的密码")
		}, 300);
	} else if(pwd !== pwd1) {
		t = 3;
		setTimeout(function() {
			toast("两次密码不一致")
		}, 300);
	} else if(isPass) {
		return;
	} else {
		isPass = true;
		var data = {};
		data.onlyID = onlyID;
		data.编号 = conid;
		if(pwd == null || pwd == "") {
			data.分公司密码 = "";
		} else {
			data.分公司密码 = ($.md5(pwd));
		}
		if(oldPwd == null || oldPwd == "") {
			data.原密码 = "";
		} else {
			data.原密码 = ($.md5(oldPwd));
		}
		data = JSON.stringify(data);
		$.ajax({
			type: "POST",
			url: "/ajax.post?func=CZ_fgs_pwd",
			data: 'data=' + data,
			success: function(d) {
				if(d.状态 == "修改成功") {
					//					t = 3;
					//					toast(d.状态);

					$('#myModal1').modal('hide');
					$("#newPassword").val('');
					$("#newPassword1").val('');
					$("#oldPassword").val('');

					var btn1_opt = function() {};
					var pic = "ic_type_success.png";
					var content = d.状态;
					layObj.tips(pic, content, btn1_opt);

					setTimeout(function() {
						isPass = false
					}, 1000);
				} else {
					t = 3;
					toast(d.状态);
					setTimeout(function() {
						isPass = false
					}, 1000);
				}
			}
		});
	}
});

$('#pass_qx').click(function() {
	$('#myModal1').modal('hide');
	$("#newPassword").val('');
	$("#newPassword1").val('');
	$("#oldPassword").val('');
})

//立即提取

$("#tiqu_sure").off('click').on('click', function() {
	var tiqu = Number($("#tiqu").html());
	var money = $("#text").val();
	if(money == '' || Number(money) == 0) {
		t = 2;
		setTimeout(function() {
			toast("积分不能为空")
		}, 300);
	} else if(money > tiqu) {
		t = 2;
		setTimeout(function() {
			toast("可提取积分不足")
		}, 300);
	} else if(money % 100 !== 0) {
		t = 2;
		setTimeout(function() {
			toast("积分必须为整百")
		}, 300);
	} else {
		var isAjax = false;
		$('#myModal').modal('hide');
		$('#pay_code').show();
		$('#pay_close').off('click').on('click', function() {
			$('#ipt').val('');
			$('#pay_code').hide();
		})
		$('.zwl-m').html(Number(money).toFixed(2));
		$(".zwl-a").off('click').on('click', function() {
			if(isAjax) {
				return;
			} else if(pw === "") {
				t = 2;
				toast("请输入支付密码");
			} else {
				isAjax = true;
				var r = {};
				r.积分 = money;
				r.分公司编号 = conid;
				r.onlyID = onlyID;
				r.密码 = ($.md5(pw));
				r = JSON.stringify(r);
				$.ajax({
					type: "POST",
					url: "/ajax.post?func=CZ_fgs_LJtiqu",
					data: 'data=' + r,
					success: function(d) {
						console.log(d);
						if(d.状态 == "提取成功") {
							$('#pay_code').hide();
							//							t = 2;
							//							toast(d.状态);
							var pic = "ic_type_success.png";
							var reload = function() {
								window.history.go(0);
							};
							var content = d.状态;
							layObj.tips(pic, content, reload);
						} else if(d.状态 != "您当日密码错误次数超过5次，今日不可进行此操作" && d.状态 != "提取成功") {
							reset_password()
							t = 2;
							toast(d.状态);
							setTimeout(function() {
								isAjax = false;
							}, 1000);
						} else if(d.状态 == "您当日密码错误次数超过5次，今日不可进行此操作") {

							reset_password()
							$('#pay_code').hide();
							var pic_2 = "ic_type_fail.png";
							var content_2 = d.状态;
							var reload_2 = function() {};
							layObj.tips(pic_2, content_2, reload_2);

						}
					}
				});
			}

		})

	}
});

function reset_password() {
	$('#ipt').val("");
	$('.zwl-box li').text("");
	$(".zwl-a").attr("disabled", "disabled").removeClass("open-btn").addClass("close-btn");

}

$('#myModal').on('hide.bs.modal', function() {
	$("#text").val("");
});

/*调键盘*/
var pw = "";
var numLen = "";
$(document).off("keyup").keyup(function(e) {
	numLen = 6;
	pw = $('#ipt').val();
	var list = $('.zwl-box li');

	for(var i = 0; i < numLen; i++) {
		if(pw[i]) {
			if(pw.length < 6) {
				$(list[i]).text('●');
				$(".zwl-a").attr("disabled", "disabled");
			} else if(pw.length == 6) {
				$(list[i]).text('●');
				$(".zwl-a").removeAttr("disabled").removeClass("close-btn").addClass("open-btn");
			}

		} else {
			$(".zwl-a").attr("disabled", "disabled").removeClass("open-btn").addClass("close-btn");
			$(list[i]).text('');
		}
	}
});

//获取当前页面高度
(function getOS() {
	var ua = window.navigator.userAgent.toLowerCase(),
		iPhone = /iphone/i.test(ua) ? true : false,
		android = /android/i.test(ua) ? true : false;
	//					return {android:android, iPhone:iPhone};

})()

var winHeight = $(window).height();

$(window).resize(function() {
	var thisHeight = $(this).height();
	if(winHeight != thisHeight && winHeight > thisHeight) {
		//窗口发生改变(大),故此时键盘弹出
		//当软键盘弹出，在这里面操作
		$('.password_con').css({
			'margin-top': '10%'
		});
		$(".toast").hide();

	} else {
		$('.password_con').css({
			'margin-top': '40%'
		});
	}

})