(function($) {
	$(document).ready(function(){
		$('.red').on('click',function() {
			$(this).toggleClass("selected");
			$(document).click(function() {
    			$(this).toggleClass("selected");
			});
		});
		$('.black').on('click',function() {
			$(this).toggleClass("selected");
		});
	})
})(jQuery)