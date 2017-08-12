//			url参数和全局变量
var onlyID = decodeURI(html_name('onlyID'));
var conid;
var ys = 0;
var bottom_height = $(window).height() - $(".fixed-top").height();
$(".list").height(bottom_height);

//			跳转功能页面
$('.fgs-join').click(function() {
	window.location.href = "join_community.html?onlyID=" + onlyID;
});

$('.fgs-create').click(function() {
	window.location.href = "create_community.html?onlyID=" + onlyID;
})

$('.fgs-setReward').click(function() {
	window.location.href = "fgs_setTheReward.html?onlyID=" + onlyID + "&fgsType=shequ";
})

$(document).ready(function() {

	var data = {};
	data.onlyID = onlyID;
	data.页数 = ys;
	data = JSON.stringify(data);
	$.ajax({
		type: "POST",
		url: "/ajax.post?func=CZ_fgs_shequlist",
		data: 'data=' + data,
		success: function(p) {
			if(p.状态 == '成功' && p.分公司条数 !== 0) {
				no_more_init._delete();

				$.each(p.分公司列表, function(i) {
					conid = p.分公司列表[i].编号;

					$(".fgs-list").append('<li class="fgs-items bgc-fff" onclick="con_detail(\'' + onlyID + '\',\'' + conid + '\',\'' + p.分公司列表[i].类别 + '\')"> <div class="list-top flex-hb-vt"> <div class="id-icon"><img src="" /></div> <div class="id-main"> <p class="fgs-name col-333">' + p.分公司列表[i].分公司名称 + '</p> <p class="fgs-location col-666">' + p.分公司列表[i].省 + p.分公司列表[i].市 + '</p> <p class="col-666">编号：<span class="fgs-number col-666">' + p.分公司列表[i].编号 + '</span></p> </div> <div class="id-title"><img src="" /></div> </div> <div class="list-bottom flex-hb-vc"> <p class="id-type col-666">' + p.分公司列表[i].类型 + ' </p> <p class="col-666">所占股份：<span class="id-sum col-666">' + p.分公司列表[i].所占股数 + '</span>股</p> </div> </li>');
					//								console.log(i)
					if(p.分公司列表[i].类别 == "创始人") {
						$(".fgs-items .id-icon img:eq(" + i + ")").attr("src", "img/2_ic_founder.png");
						$(".fgs-items .id-title img:eq(" + i + ")").attr("src", "img/2_tran_founder.png");
					} else if(p.分公司列表[i].类别 == "股东") {
						$(".fgs-items .id-icon img:eq(" + i + ")").attr("src", "img/2_ic_partner.png");
						$(".fgs-items .id-title img:eq(" + i + ")").attr("src", "img/2_tran_partner.png");
					}
					if($(".fgs-location:eq(" + i + ")").html().length > 14) {
						$(".id-main p:nth-child(3):eq(" + i + ")").css("margin-top", ".15rem");
					}
				})
				if(p.分公司条数 < 10) {
					no_more_init.content = '已无更多数据';
					no_more_init.dom = $('.fgs-list');
					no_more_init._add(no_more_init.dom, no_more_init.content);
				} else if(p.分公司条数 == 10) {
					no_more_init.content = '正在加载数据';
					no_more_init.dom = $('.fgs-list');
					no_more_init._add(no_more_init.dom, no_more_init.content);
				}
			} else {
				$(".fgs-list").append('<button class="nomore"><img src="img/2_nomore.png"/></button>');
			}
			ys = p.页数;
		}
	})
})

$(".list").unbind("scroll").bind("scroll", function(e) {
	var scrollTop = $(this).scrollTop();
	var windowHeight = $(this).height();
	var scrollHeight = this.scrollHeight;

	if(scrollTop + windowHeight === scrollHeight) {
		var r = {};
		r.onlyID = onlyID;
		r.页数 = ys;
		r = JSON.stringify(r);
		$.ajax({
			url: "/ajax.post?func=CZ_fgs_shequlist",
			type: "POST",
			data: 'data=' + r,
			success: function(p) {
				if(p.状态 == '成功') {
					no_more_init._delete();

					if(p.分公司条数 != 0) {
						//						t = 2;
						//						tips("正在加载数据");

						$.each(p.分公司列表, function(i) {
							conid = p.分公司列表[i].编号;

							$(".fgs-list").append('<li class="fgs-items bgc-fff" onclick="con_detail(\'' + onlyID + '\',\'' + conid + '\',\'' + p.分公司列表[i].类别 + '\')"> <div class="list-top flex-hb-vt"> <div class="id-icon"><img src="" /></div> <div class="id-main"> <p class="fgs-name col-333">' + p.分公司列表[i].分公司名称 + '</p> <p class="fgs-location col-666">' + p.分公司列表[i].省 + p.分公司列表[i].市 + '</p> <p class="col-666">编号：<span class="fgs-number col-666">' + p.分公司列表[i].编号 + '</span></p> </div> <div class="id-title"><img src="" /></div> </div> <div class="list-bottom flex-hb-vc"> <p class="id-type col-666">' + p.分公司列表[i].类型 + ' </p> <p class="col-666">所占股份：<span class="id-sum col-666">' + p.分公司列表[i].所占股数 + '</span>股</p> </div> </li>');
							console.log(((i) + (ys + 1) * 10))
							if(p.分公司列表[i].类别 == "创始人") {
								$(".fgs-items .id-icon img:eq(" + ((i) + (ys) * 10) + ")").attr("src", "img/2_ic_founder.png");
								$(".fgs-items .id-title img:eq(" + ((i) + (ys) * 10) + ")").attr("src", "img/2_tran_founder.png");
							} else if(p.分公司列表[i].类别 == "股东") {
								$(".fgs-items .id-icon img:eq(" + ((i) + (ys) * 10) + ")").attr("src", "img/2_ic_partner.png");
								$(".fgs-items .id-title img:eq(" + ((i) + (ys) * 10) + ")").attr("src", "img/2_tran_partner.png");
							}
							if($(".fgs-location:eq(" + ((i) + (ys) * 10) + ")").html().length > 14) {
								$(".id-main p:nth-child(3):eq(" + ((i) + (ys) * 10) + ")").css("margin-top", ".15rem");
							}
						})
						if(p.分公司条数 == 10) {
							no_more_init.content = '正在加载数据';
							no_more_init.dom = $('.fgs-list');
							no_more_init._add(no_more_init.dom, no_more_init.content);
						}

					} else if(p.分公司条数 == 0) {
						//						t = 2;
						//						tips("已无更多数据");
						no_more_init.content = '已无更多数据';
						no_more_init.dom = $('.fgs-list');
						no_more_init._add(no_more_init.dom, no_more_init.content);
					}
					ys = p.页数;
				}
			}

		})
	}
})

function con_detail(a, b, c) {
	window.location.href = "mou_fengongsi.html?onlyID=" + a + "&conid=" + b + "&status=" + c;
}