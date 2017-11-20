$(function() {
	$('#pricingTabs a').click(function(e) {
		e.preventDefault()
		$(this).tab('show')
	});
	
	$(document).ready(function() {
		$("#calendar").bootstrapDatepickr();
	});
	
})