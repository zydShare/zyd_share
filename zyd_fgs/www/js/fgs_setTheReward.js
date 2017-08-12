$(function() {
	//判断分公司类型
	var fgsType = decodeURI(html_name('fgsType'));
	//传入唯一ID
	var onlyID = decodeURI(html_name('onlyID'));
	var ys = 0;

	var dataname;
	var dataid;

	if(fgsType === 'shi') {
		$(document).ready(function() {
			var data = {};
			data.onlyID = onlyID;
			data.页数 = ys;
			data = JSON.stringify(data);
			$.ajax({
				type: "POST",
				url: "/ajax.post?func=CZ_fgs_shi_default",
				data: 'data=' + data,
				success: function(d) {
					console.log(d);
					if(d.状态 == '成功' && d.条数 !== 0) {
						no_more_init._delete();

						$('.haveDate').show();
						$('.defaultInfo .default').attr('dataName', d.默认分公司名称);
						$('.defaultInfo .default').attr('dataId', d.默认分公司编号);
						$('#fgsName').text(d.默认分公司名称);
						$('#fgsID').text(d.默认分公司编号);
						var tips = d.说明.split("。");
						$.each(tips, function(i, item) {
							$('.tsText').append('<p>' + item + '</p>');
						})
						$.each(d.列表, function(i, item) {
							if(d.默认分公司编号 !== item.分公司id) {
								$('.defaultInfo').append('<li class="set"><div class="defaultImg clearfix"></div><div class="fgsInfo clearfix">' +
									'<p class="fgs_name">' + item.分公司名称 + '</p>' +
									'<p class="fgsNumber">编号<span class="fgs_id">' + item.分公司id + '</span></p></div>' +
									'<div class="selectImg clearfix"></div><div class="line"></div><div class="setbox"><p class="setImg clearfix"><img src="img/2-not-selected.png"/></p><p class="setText clearfix">默认设置</p></div></li>');
							}
						});

						if(d.条数 < 10) {
							no_more_init.content = '已无更多数据';
							no_more_init.dom = $('.defaultInfo');
							no_more_init._add(no_more_init.dom, no_more_init.content);
						} else if(d.条数 == 10) {
							no_more_init.content = '正在加载数据';
							no_more_init.dom = $('.defaultInfo');
							no_more_init._add(no_more_init.dom, no_more_init.content);
						}

						dataname = $('.defaultInfo li').attr('dataname');
						dataid = $('.defaultInfo li').attr('dataid');
					} else {
						$('.haveDate').hide();
						$('.noData').show();
					}
					ys = d.页数;
				}
			})

			$('.scrollDiv').unbind("scroll").bind("scroll", function(e) {
				var scrollTop = $(this).scrollTop();
				var windowHeight = Math.ceil($(this).height());
				var scrollHeight = this.scrollHeight;
				//				console.log(scrollTop, windowHeight, scrollHeight);
				if(scrollTop + windowHeight === scrollHeight) {

					var r = {};
					r.onlyID = onlyID;
					r.页数 = ys;
					r = JSON.stringify(r);
					$.ajax({
						url: "/ajax.post?func=CZ_fgs_shi_default",
						type: "POST",
						data: 'data=' + r,
						success: function(d) {
							//							console.log(d);
							if(d.状态 == '成功' && d.条数 !== 0) {
								no_more_init._delete();

								$.each(d.列表, function(i, item) {
									if(d.默认分公司编号 !== item.分公司id) {
										$('.defaultInfo').append('<li class="set"><div class="defaultImg clearfix"></div><div class="fgsInfo clearfix">' +
											'<p class="fgs_name">' + item.分公司名称 + '</p>' +
											'<p class="fgsNumber">编号<span class="fgs_id">' + item.分公司id + '</span></p></div>' +
											'<div class="selectImg clearfix"></div><div class="line"></div><div class="setbox"><p class="setImg clearfix"><img src="img/2-not-selected.png"/></p><p class="setText clearfix">默认设置</p></div></li>');
									}
								});

								if(d.条数 == 10) {
									no_more_init.content = '正在加载数据';
									no_more_init.dom = $('.defaultInfo');
									no_more_init._add(no_more_init.dom, no_more_init.content);
								}
							} else {
								no_more_init._delete();

								no_more_init.content = '已无更多数据';
								no_more_init.dom = $('.defaultInfo');
								no_more_init._add(no_more_init.dom, no_more_init.content);
							}
							ys = d.页数;
						}
					})
				}
			})

		})

		//点击默认设置
		$(document).off("click").on("click", ".defaultInfo li .setbox", function() {
			var i = $(this).closest("li").index();
			var conid = $('.defaultInfo li').eq(i).find('.fgsNumber .fgs_id').text();
			var d = {};
			d.onlyID = onlyID;
			d.编号 = conid;
			d.类别 = '市代理分公司';
			d = JSON.stringify(d);
			$.ajax({
				type: "POST",
				url: "/ajax.post?func=CZ_fgs_time_default",
				data: 'data=' + d,
				success: function(p) {
					//					console.log(p);
					if(p.状态 == '成功') {
						//						$('#myModal').modal('show');
						layObj.lay_text = '<div class="content" style="text-align:center;font-size: 0.3rem;color: #333;height:1.3rem;line-height:1.3rem;width:100%;">确定设置该分公司为默认奖励分公司？</div>';
						layObj.T_button = function(layero, index) {

							var data = {};
							data.onlyID = onlyID;
							data.编号 = conid;
							data = JSON.stringify(data);
							$.ajax({
								type: "POST",
								url: "/ajax.post?func=CZ_fgs_shi_updatedefault",
								data: 'data=' + data,
								success: function(p) {
									//									console.log(p);

									if(p.状态 == '成功') {

										//										$(".content").append('<div class="test-tips"><span class="colff0">' +p.状态 + '</span></div>')
										layer.close(index);
										layObj.pic = "ic_type_success.png";
										layObj.lay_content = "设置成功";
										layObj.reload = function() {

											$('.defaultInfo .selectImg img').hide();
											$('.defaultInfo .defaultImg img').hide();
											$('.defaultInfo li:first').remove();
											$('.defaultInfo').prepend('<li class="set"><div class="defaultImg clearfix"></div><div class="fgsInfo clearfix">' +
												'<p class="fgs_name">' + dataname + '</p>' +
												'<p class="fgsNumber">编号<span class="fgs_id">' + dataid + '</span></p></div>' +
												'<div class="selectImg clearfix"></div><div class="line"></div><div class="setbox"><p class="setImg clearfix"><img src="img/2-not-selected.png"/></p><p class="setText clearfix">默认设置</p></div></li>');
											$('.defaultInfo li:gt(0)').find('.setImg img').attr('src', 'img/2-not-selected.png');
											$('.defaultInfo li').eq(i).find('.defaultImg').html('<img src="img/2-default.png" />');
											$('.defaultInfo li').eq(i).find('.setImg img').attr('src', 'img/2-selected.png');
											setTimeout(function() {
												history.go(-1);
											}, 1000);
										}
										layObj.tips(layObj.pic, layObj.lay_content, layObj.reload);
									} else {
										layer.close(index);
										
										layObj.lay_content = p.状态;
										layObj.reload = function() {
											history.go(0);
										}
										layObj.tips_new("失败", layObj.lay_content);
									}
								}
							})
						}

						layObj.F_button = function() {};
						layObj.content_4("提示", layObj.lay_text, layObj.T_button, layObj.F_button);

					} else {

						layObj.lay_content = (p.状态).replace(/,|，/g,"<br>");
						layObj.reload = function() {
							history.go(0);
						}
						layObj.tips_new("失败", layObj.lay_content);
					}
				}
			});
		})
	} else if(fgsType === 'shequ') {
		$(document).ready(function() {
			var data = {};
			data.onlyID = onlyID;
			data.页数 = ys;
			data = JSON.stringify(data);
			$.ajax({
				type: "POST",
				url: "/ajax.post?func=CZ_fgs_shequ_default",
				data: 'data=' + data,
				success: function(d) {
					console.log(d);
					if(d.状态 == '成功' && d.条数 !== 0) {
						no_more_init._delete();

						$('.haveDate').show();
						$('.defaultInfo .default').attr('dataName', d.默认分公司名称);
						$('.defaultInfo .default').attr('dataId', d.默认分公司编号);
						$('#fgsName').text(d.默认分公司名称);
						$('#fgsID').text(d.默认分公司编号);
						var tips = d.说明.split("。");
						$.each(tips, function(i, item) {
							$('.tsText').append('<p>' + item + '</p>');
						})
						$.each(d.列表, function(i, item) {
							if(d.默认分公司编号 !== item.分公司id) {
								$('.defaultInfo').append('<li class="set"><div class="defaultImg clearfix"></div><div class="fgsInfo clearfix">' +
									'<p class="fgs_name">' + item.分公司名称 + '</p>' +
									'<p class="fgsNumber">编号<span class="fgs_id">' + item.分公司id + '</span></p></div>' +
									'<div class="selectImg clearfix"></div><div class="line"></div><div class="setbox"><p class="setImg clearfix"><img src="img/2-not-selected.png"/></p><p class="setText clearfix">默认设置</p></div></li>');
							}
						});

						if(d.条数 < 10) {
							no_more_init.content = '已无更多数据';
							no_more_init.dom = $('.defaultInfo');
							no_more_init._add(no_more_init.dom, no_more_init.content);
						} else if(d.条数 == 10) {
							no_more_init.content = '正在加载数据';
							no_more_init.dom = $('.defaultInfo');
							no_more_init._add(no_more_init.dom, no_more_init.content);
						}
						dataname = $('.defaultInfo li').attr('dataname');
						dataid = $('.defaultInfo li').attr('dataid');
					} else {
						$('.haveDate').hide();
						$('.noData').show();
					}
					ys = d.页数;
				}
			})

			$('.scrollDiv').unbind("scroll").bind("scroll", function(e) {
				var scrollTop = $(this).scrollTop();
				var windowHeight = Math.ceil($(this).height());
				var scrollHeight = this.scrollHeight;

				if(scrollTop + windowHeight === scrollHeight) {
					var r = {};
					r.onlyID = onlyID;
					r.页数 = ys;
					r = JSON.stringify(r);
					console.log(r);
					$.ajax({
						url: "/ajax.post?func=CZ_fgs_shequ_default",
						type: "POST",
						data: 'data=' + r,
						success: function(d) {
							//							console.log(d);
							if(d.状态 == '成功' && d.条数 !== 0) {
								no_more_init._delete();

								$.each(d.列表, function(i, item) {
									if(d.默认分公司编号 !== item.分公司id) {
										$('.defaultInfo').append('<li class="set"><div class="defaultImg clearfix"></div><div class="fgsInfo clearfix">' +
											'<p class="fgs_name">' + item.分公司名称 + '</p>' +
											'<p class="fgsNumber">编号<span class="fgs_id">' + item.分公司id + '</span></p></div>' +
											'<div class="selectImg clearfix"></div><div class="line"></div><div class="setbox"><p class="setImg clearfix"><img src="img/2-not-selected.png"/></p><p class="setText clearfix">默认设置</p></div></li>');
									}
								});

								if(d.条数 == 10) {
									no_more_init.content = '正在加载数据';
									no_more_init.dom = $('.defaultInfo');
									no_more_init._add(no_more_init.dom, no_more_init.content);
								}
							} else {
								no_more_init._delete();
								no_more_init.content = '已无更多数据';
								no_more_init.dom = $('.defaultInfo');
								no_more_init._add(no_more_init.dom, no_more_init.content);
							}
							ys = d.页数;
						}
					})
				}
			})

		})

		//点击默认设置
		$(document).off("click").on("click", ".defaultInfo li .setbox", function() {
			var i = $(this).closest("li").index();
			var conid = $('.defaultInfo li').eq(i).find('.fgsNumber .fgs_id').text();
			var d = {};
			d.onlyID = onlyID;
			d.编号 = conid;
			d.类别 = '社区代理分公司';
			d = JSON.stringify(d);
			$.ajax({
				type: "POST",
				url: "/ajax.post?func=CZ_fgs_time_default",
				data: 'data=' + d,
				success: function(p) {
					//					console.log(p);
					if(p.状态 == '成功') {
						//						$('#myModal').modal('show');
						layObj.lay_text = '<div class="content" style="text-align:center;font-size: 0.3rem;color: #333;height:1.3rem;line-height:1.3rem;width:100%;">确定设置该分公司为默认奖励分公司？</div>';
						layObj.T_button = function(layero, index) {

							var data = {};
							data.onlyID = onlyID;
							data.编号 = conid;
							data = JSON.stringify(data);
							$.ajax({
								type: "POST",
								url: "/ajax.post?func=CZ_fgs_shequ_updatedefault",
								data: 'data=' + data,
								success: function(p) {
									//									console.log(p);

									if(p.状态 == '成功') {

										//										$(".content").append('<div class="test-tips"><span class="colff0">' +p.状态 + '</span></div>')
										layer.close(index);
										layObj.pic = "ic_type_success.png";
										layObj.lay_content = "设置成功";
										layObj.reload = function() {

											$('.defaultInfo .selectImg img').hide();
											$('.defaultInfo .defaultImg img').hide();
											$('.defaultInfo li:first').remove();
											$('.defaultInfo').prepend('<li class="set"><div class="defaultImg clearfix"></div><div class="fgsInfo clearfix">' +
												'<p class="fgs_name">' + dataname + '</p>' +
												'<p class="fgsNumber">编号<span class="fgs_id">' + dataid + '</span></p></div>' +
												'<div class="selectImg clearfix"></div><div class="line"></div><div class="setbox"><p class="setImg clearfix"><img src="img/2-not-selected.png"/></p><p class="setText clearfix">默认设置</p></div></li>');
											$('.defaultInfo li:gt(0)').find('.setImg img').attr('src', 'img/2-not-selected.png');
											$('.defaultInfo li').eq(i).find('.defaultImg').html('<img src="img/2-default.png" />');
											$('.defaultInfo li').eq(i).find('.setImg img').attr('src', 'img/2-selected.png');
											setTimeout(function() {
												history.go(-1);
											}, 1000);
										}
										layObj.tips(layObj.pic, layObj.lay_content, layObj.reload);
									} else {
										layer.close(index);
										
										layObj.lay_content = p.状态;
										layObj.reload = function() {
											history.go(0);
										}
										layObj.tips_new("失败", layObj.lay_content);
									}
								}
							})
						}

						layObj.F_button = function() {};
						layObj.content_4("提示", layObj.lay_text, layObj.T_button, layObj.F_button);

					} else {
						layObj.lay_content = (p.状态).replace(/,|，/g,"<br>");
						layObj.reload = function() {
							history.go(0);
						}
						layObj.tips_new("失败", layObj.lay_content);
					}
				}
			});
		})
	}
})