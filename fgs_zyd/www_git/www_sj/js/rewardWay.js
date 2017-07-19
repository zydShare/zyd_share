var onlyID = decodeURI(html_name('onlyID'));
var conid = decodeURI(html_name('conid'));
var flag;
var lastTime;

$(document).ready(function(){
	
$(".spinner").hide();

	$('#switchIcon').on('click', function() {
	var src = $('#switchIcon').attr('src');
	if(src == 'img/2_not_selected.png') {
		$('#switchIcon').attr('src', 'img/2_selected.png');
		$('#switchIcon').attr('data', 'selected');
		flag = true;
	} else {
		$('#switchIcon').attr('src', 'img/2_not_selected.png');
		$('#switchIcon').attr('data', 'unselected');
		flag = false;
	}
})

//	奖励方式显示
var r = {};
r.onlyID = onlyID;
r.分公司编号 = conid;
r = JSON.stringify(r);
$.ajax({
	type: "POST",
	url: "/ajax.post?func=CZ_fgs_typelist",
	data: 'data=' + r,
	success: function(s) {
		console.log(s)

		if(s.状态 == "成功") {

			var d1 = new Date(s.切换时间);
			var d2 = new Date();
			var d3 = (d2 - d1) / 1000 / (60 * 60 * 24);

			if(s.切换时间 != '') {
				$('.last').html('<div class="lastSwitch">您已于<span id="lastTime">&nbsp;' + s.切换时间 + '&nbsp;</span>切换奖励方式</div>');
			}

			if(d3 <= 30) {
				$('#confirmBtn').attr('data', 'false');
				$('#confirmBtn').attr('data-day', 30 - Math.floor(d3));
			} else if(s.切换时间 == null || s.切换时间 == '' || d3 > 30) {
				$('#confirmBtn').attr('data', 'true');
				$('#confirmBtn').attr('data-day', 30 - Math.floor(d3));
			}

			if(s.切换类型 === '积分') {
				$('.dqjl_result').text("直接奖励");
				$('.qhjl_result span').text("套餐奖励");
			} else if(s.切换类型 === '套餐') {
				$('.dqjl_result').text("套餐奖励");
				$('.qhjl_result span').text("直接奖励");
			}
		} else {
			t = 3;
			tips(s.状态);
		}
	}
})

$("#confirmBtn").on('click', function() {
	var qhlx = {
		套餐奖励: '套餐',
		直接奖励: '积分'
	};
	var qhText = $('.qhjl_result span').text();
	if($('#switchIcon').attr('data') != "selected") {
		t = 3;
		tips("请选择您需切换的奖励方式");
	} else {
		var tj = $('#confirmBtn').attr('data');
		if(tj == 'true') {
			var layer_input = '<div class="content" style="margin: 0 auto; padding-top: .15rem; display: table;"><input type="password" id="fgs-password" class="fgs-password" minlength="6" maxlength="8" onclick="shuru2(this);" onkeyup="shuru2(this);" placeholder="请您输入分公司密码" /></div>';
			var T_button = function(layero, index) {
				$(".test-tips").empty();
				var test = $("#fgs-password").val();
				if(test.length == "" || test.length == null) {
					$(".content").append('<div class="test-tips"><span class="colff0">分公司密码不能为空</span></div>')

				} else if(test.length < 6) {
					$(".content").append('<div class="test-tips"><span class="colff0">分公司密码不能小于6位</span></div>')
				} else {
					var r = {};
					r.onlyID = onlyID;
					r.分公司编号 = conid;
					r.分公司密码 = test;
					if(flag) {
						r.切换类型 = qhlx[qhText];
					}
					r = JSON.stringify(r);
					$.ajax({
						type: "POST",
						url: "/ajax.post?func=CZ_fgs_qhType",
						data: 'data=' + r,
						success: function(s) {
							$(".test-tips").empty();					
							if(s.状态 != "成功") {
								$(".content").append('<div class="test-tips"><span class="colff0">' + s.状态 + '</span></div>')
							} else {
								layer.close(index);
								var pic = "ic_type_success.png";
								var content = "切换成功";
								var reload = function() { history.go(-1); }
								layObj.tips(pic, content, reload);
							}
						}
					})
				}
			}
			var F_button = function() {}
			layObj.content("分公司密码", layer_input, T_button, F_button);
//			layObj.content_2("分公司密码", layer_input, T_button);

		} else {
			var content = "您在" + $("#lastTime").html() + "已进行修改操作，</br>" + $("#confirmBtn").attr("data-day") + "天后方可进行修改";
			var reload = function() { history.go(0); }
			layObj.tips_new("失败", content);
		}
	}
})
})
