
//
function getHeadNav(tar){
	$.ajax({
		url:"../commonPage/sellernev.html",
		type:"get",
		dataType:"html",
		success:function(data){
			var reg = /<body>[\s\S]*<\/body>/g;
            var html = reg.exec(data)[0];
			$('.'+tar).before(html);
			var link =$('<link rel="styleSheet" href="../../../css/l_sellerShare.css" />');
			$('head').append(link);
		}
	})
};

function ajaxBottom(place1){
	$.ajax({
		type:'get',
		url:'cartBottom.html',
		dataType:'html',
		success:function(data){
			var data =$(data);
			$('#'+place1).after(data[0]);
		}
	})
};