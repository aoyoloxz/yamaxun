$(function(){
	//下拉框
//	downbox();
	
    $(".l_sheraNavMianLeft li").on("mouseenter",function(){
    	$("#lshareNavbox").css("width","720px")
		$(".l_sheraNavMianRight").css("display","block")//给a标签添加事件
		
       var index=$(this).index();  //获取当前a标签的个数  
       $(".l_sheraNavMianRight li").eq(index).css("display","block") //返回上一层，在下面查找css名为box隐藏，然后选中的显示  

    })	
    
    $(".l_sheraNavMianLeft li").on("mouseleave",function(){
    	$("#lshareNavbox").css("width","177px")
		$(".l_sheraNavMianRight").hide()//给a标签添加事件
		
       var index=$(this).index();  //获取当前a标签的个数  
       console.log(index)
		$(".l_sheraNavMianRight li").eq(index).css("display","none") //返回上一层，在下面查找css名为box隐藏，然后选中的显示  
    })	
    //卖家账户信息---点击显示
//  $().each(function(){
    		$(".sellerAccountCenter3_1 div").find("a").click(function(){
    			$(this).next().show().parent().siblings().find("p").hide()
    		})
//  })
});