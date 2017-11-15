
var curI =$('.banner-img .img').index();
var imgL =$('.banner-img').children().length;
var img  =$('.banner-img .img');

// 首页轮播
function rightClick(){
	if(curI<imgL-1){				
		img.eq(curI+1).show().siblings().hide();
		curI++;
	}else{
		curI=0;
		img.eq(curI).show().siblings().hide();
	}
}
function leftClick(){
	if(curI>0){
		img.eq(curI-1).show().siblings().hide();
		curI--;
	}else{
		curI = imgL-1;
		img.eq(curI).show().siblings().hide();
	}
}

// 判断浏览器是否是移动端
function isMobile() {
    return navigator.userAgent.match(/(iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|Webos|symbian|windows phone)/i);
}
if(isMobile()){
	$('.btn-left').bind('tap',leftClick);
	$('.btn-right').bind('tap',rightClick);
}else{
	$('.btn-left').bind('click',leftClick);
	$('.btn-right').bind('click',rightClick);
}