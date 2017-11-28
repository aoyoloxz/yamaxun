$(function() {
	
	//付费方式弹出框------未封装
	$(".L_sellerChangPayShow").click(function() {
		$(".sellerSetPayWayBlock").show()
	})
	$(".L_sellerChangPayHide").click(function() {
		$(".sellerSetPayWayBlock").hide()
	})
	$(".sellerSetPayWayBlock1").click(function() {
		$('.sellerSetPayWayBlock1').each(function() {
			if($(this).is(":checked")) {
				console.log("zzz")
				$(".l_sellerChangPaySure").removeAttr("disabled");
			}
		})
	})

	$(".l_sellerChangPaySure").click(function() {
		if(typeof($(".l_sellerChangPaySure").attr("disabled")) == "undefined") {
			console.log("zzz")
			$(".sellerSetPayWayBlock").hide()
		}

	})
	//	$(".L_sellerChangPayShow").click(function(){
	//		$(".sellerSetPayWayBlock").hide()
	//	})s

})