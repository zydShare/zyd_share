$(function(){
	$(".untreated").on("click",function(){
		$(this).addClass("spanBorder");
		$(".treated").removeClass("spanBorder");
		$(".admiContentListB").css("display","block");
		$(".admiContentList").css("display","none");
	});
	$(".treated").on("click",function(){
		$(this).addClass("spanBorder");
		$(".untreated").removeClass("spanBorder");
		$(".admiContentList").css("display","block");
		$(".admiContentListB").css("display","none")
	});
	
	$(".admiContentListB .admiContent-content").on("click",function(){
		window.location.href="rejectReson.html";
	});
})
