//全局变量
var page = 0;
var bottom_height = $(window).height() - $("header").height();
$(".live-container").height(bottom_height);

$(document).ready(function() {
	function load(page) {
		var data = {};
		data.页数 = page;
		data = JSON.stringify(data);
		console.log(data)
		$.ajax({
			type: "POST",
			url: "/ajax.post?func=CZ_Qun_Admin_findzhibojian",
			data: 'data=' + data,
			success: function(p) {
				console.log(p)
				if(p.状态 == '成功' && p.条数 !== 0) {
					$.each(p.列表, function(i) {
						$(".live-container").append(' <li class="live-items"> <div class="live-items-top flex-hl-vc"> <div class="live-items-left live-avatar flex-hc-vc"> <img src="' +
							p.列表[i].头像 + '" /> </div> <div class="live-items-main live-main flex-v flex-hc-vl flex1"> <div class="live-items-main-title"> <span class="group-title">' +
							p.列表[i].名称 + '</span> </div> <div class="live-items-main-owner"> <span>主播：</span> <span class="group-owner">' +
							p.观看记录[0].主播账号 + '</span> </div> </div> <div class="live-items-right live-id flex-hr-vb"> <span class="group-owner-id type-a">群主</span>  </div> </div> <div class="live-items-bottom" style="background: url(' +
							p.列表[i].图片 + ') no-repeat"> <div class="live-play flex-hc-vc"> <img src="img/ic-live-play.png" /> </div> <div class="live-action flex-hc-vc"> <span class="stop-live flex-hc-vc flex1">停用直播权限</span> <span class="dismiss-group flex-hc-vc flex1">解散该群</span> </div> </div>  </li>  ')
					});
					$(".stop-live").click(function() {
						var data1 = {};
						data1.直播间id = "1086";
						data1.账号 = "13635750336";
						data1 = JSON.stringify(data1);
						console.log(data1)
						$.ajax({
							type: "POST",
							url: "/ajax.post?func=CZ_Qun_stopzhibo",
							data: 'data=' + data1,
							success: function(p) {
								console.log(p)
							}
						})

					})
				}

			}
		})
	}

	//	首页加载
	load(0);
	//	分页加载
	$(".live-container").unbind("scroll").bind("scroll", function(e) {
		var scrollTop = $(this).scrollTop();
		var windowHeight = $(this).height();
		var scrollHeight = this.scrollHeight;
		//		console.log(scrollTop, windowHeight, scrollHeight);
		if(scrollTop + windowHeight === scrollHeight) {
			page++;
			load(page);
		}
	})

})

//if($(".main").hasClass("type-true")) {
//	$(".main").html('<div class="live-nomre flex-v flex-hc-vc"><img src="img/ic-no-live.png"/></div>')
//	$(".live-container").hide();
//} else {
//	$(".live-container").show();
//}
//