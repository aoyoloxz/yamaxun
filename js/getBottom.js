

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