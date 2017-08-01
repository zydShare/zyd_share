//toast定时
//修改人：周文丽
//修改时间 ：2017/4/14
//修改内容：toast内容以及样式

//var t = 3;
//function toast_old(status) {
//	console.log(t);
//	$(".toast_z").show();
//	$(".toast_z .toast-su").html(status);
//	var i = setTimeout(toast, 1000);
//	t--;
//	if(t <= 0) {
//		$(".toast_z").hide();
//		clearTimeout(i);
//	}
//}

//toast定时加入震动
//修改人：马瑞刚

function tips(status) {
	$(".tips").show().addClass('shake');
	$(".tips .tips-in").html(status);
	var i = setTimeout(tips, 1000);
	t--;
	if(t <= 0) {
		$(".tips").hide();
		clearTimeout(i);
	}
}

function toast(status) {
	$(".toast").show().addClass('shake');
	$(".toast .toast-su").html(status);
	var i = setTimeout(toast, 1000);
	t--;
	if(t <= 0) {
		$(".toast").hide();
		clearTimeout(i);
	}
}

//input修复
//修改人:陈廷星
//修改时间:2017/5/17
//修改内容：修复移动端input软键盘弹出导致fixed失效

//获取当前页面高度
var winHeight = $(window).height();

$(window).resize(function() {
	var thisHeight = $(this).height();
	if(winHeight - thisHeight > 50) {
		//窗口发生改变(大),故此时键盘弹出
		//当软键盘弹出，在这里面操作
		$('footer').css({
			'display': 'none'
		});
	} else {
		//窗口发生改变(小),故此时键盘收起
		//当软键盘收起，在此处操作
		$('footer').css({
			'display': 'block'
		});
	}
});

//无更多数据和加载更多数据提示功能封装
var no_more = {};
no_more.content = '';
no_more.dom = '';
no_more._add = function(dom, content) {
	dom.append('<div class="nomore-tips flex-hc-vc" style="height: 2.5rem;width: 100%;"> <hr class="flex1" style="margin: 0 .75rem;" /> <p class="" style="font-size:.7rem">' + content + '</p> <hr class="flex1" style="margin: 0 .75rem;" /> </div>')
}
no_more._delete = function() {
	$(".nomore-tips").remove();
}

//无更多数据和加载更多数据提示功能封装
var no_more_init = {};
no_more_init.content = '';
no_more_init.dom = '';
no_more_init._add = function(dom, content) {
	dom.append('<div class="nomore-tips flex-hc-vc" style="height: 1rem;width: 100%;"> <hr class="flex1" style="margin: 0 .3rem;" /> <p class="" style="font-size:.28rem">' + content + '</p> <hr class="flex1" style="margin: 0 .3rem;" /> </div>')
}
no_more_init._delete = function() {
	$(".nomore-tips").remove();
}

/*限制只有中文和字母*/
function shuru1(a) {
	a.value = a.value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g, '')

}

/*限制只有数字*/
function shuru2(a) {
	a.value = a.value.replace(/\D/g, '')

}

/*限制只有数字字母*/
function shuru3(a) {
	a.value = a.value.replace(/[^\a-\z\A-\Z0-9]/g, '')

}

/*限制只有中文、英文、数字、空格*/
function shuru4(a) {
	a.value = a.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]/g, '')

}

/*限制只有中文*/
function shuru5(a) {
	a.value = a.value.replace(/[^\u4E00-\u9FA5]/g, '')

}

/*限制只有中文、英文、数字*/
function shuru6(a) {
	a.value = a.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')
}