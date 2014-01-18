$(function(){
	$("a[rel='tab']").click(function (e) {
		e.preventDefault();

		pageurl = $(this).attr('href');

		$.ajax({
			url: pageurl+'?rel=tab',
			success: function(data) {
				$('#content').html(data);
			}
		});

		if(pageurl != window.location){
			window.history.pushState({path:pageurl},'',pageurl);
		}

		return false;
	});
});