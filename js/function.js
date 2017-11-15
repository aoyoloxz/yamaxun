//下拉框
function downbox(){
	//下拉框
	display("#nav-shop","#lshareNavbox");
	display("#nav-link-yourAccount",".l_share1");
	display("#nav-link-prime",".l_share2");
	display("#nav-link-wishlist",".l_share3");

	function display(a,b){
		$(a).mouseenter(function(){
			$(b).mouseenter(function(){
				$(b).css("display","block")
			});
			$(b).css("display","block");
		});
		$(a).mouseleave(function(){
			$(b).mouseleave(function(){
				$(b).css("display","none")
			});
			$(b).css("display","none"); 
		});
	}
}