//下拉框
function downbox() {
	//下拉框
	display("#nav-shop", "#lshareNavbox");
	display("#nav-link-yourAccount", ".l_share1");
	display("#nav-link-prime", ".l_share2");
	display("#nav-link-wishlist", ".l_share3");

	function display(a, b) {
		$(a).mouseenter(function() {
			$(b).mouseenter(function() {
				$(b).css("display", "block")
			});
			$(b).css("display", "block");
		});
		$(a).mouseleave(function() {
			$(b).mouseleave(function() {
				$(b).css("display", "none")
			});
			$(b).css("display", "none");
		});
	}
}
//点击弹出框
function showBox() {
	//显示参数
	shows(".l_wishShowUp1", ".l_wishCreatefloat1")
	shows(".l_wishShowUp2", ".l_wishCreatefloat2")
	shows(".l_wishShowUp2", ".l_wishCreatefloat2")
	shows(".l_wishMainMainBottomRightHover a", ".l_wishMainMainBottomRightHover div")
	shows(".l_wishShowUp3", ".l_wishCreatefloat3")
	shows(".l_wishShowUp4", ".l_wishCreatefloat4")
	shows(".a-dropdown-prompt", ".wishShowup")
	shows(".wishShowup2_1", ".wishShowup2")

	//隐藏参数
	hides(".l_wishHide1", ".l_wishCreatefloat1")
	hides(".l_wishHide2", ".l_wishCreatefloat2")
	hides(".l_wishHide3", ".l_wishCreatefloat3")
	hides(".l_wishHide4", ".l_wishCreatefloat4")
	hides(".l_wishShowUp3", ".l_wishCreatefloat2")
	hides(".l_wishMainMainBottomRightHoverHide1", ".l_wishMainMainBottomRightHover div")
	//	hides(document, ".wishShowup")
	//	hides(document, ".wishShowup2")
	//点击显示
	function shows(a, b) {
		$(a).click(function() {
			$(b).show();
			return false;
		})
		$(b).click(function() {
			return false;
		});
		$(document).click(function() {
			$(b).hide();
		});
	}
	//点击隐藏
	function hides(a, b) {
	
		$(a).click(function() {
			$(b).hide()
		})
	}
}
//加减按钮
function AddReduce() {
	//加的参数
	Adds(".wishAdd", ".wishAdd_Reduce")
	Adds(".wishAdd1", ".wishAdd_Reduce1")
	//减的参数
	Reduces(".wishReduce", ".wishAdd_Reduce")
	Reduces(".wishReduce1", ".wishAdd_Reduce1")

	//加
	function Adds(a, b) {
		$(a).click(function() {
			var value = $(b).val()
			$(b).val(++value)
		})
	}
	//减
	function Reduces(a, b) {
		$(a).click(function() {
			var value = $(b).val()
			$(b).val(--value)
		})
	}
}