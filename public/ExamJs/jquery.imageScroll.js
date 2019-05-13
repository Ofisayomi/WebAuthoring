$(document).ready(function() {
	var step = 130;

	$('.arrow_left').click(function() {
		var left = parseInt($(".reel").css("left"));
		if ((left < 0) && !$(".reel").is(':animated')) {
			$(".reel").animate({ left: '+=' + step}, 'fast');
			$('.arrow_right').css('backgroundPosition', 'bottom');
			if (left >= -step) {
				$('.arrow_left').css('backgroundPosition', 'top');
			}
		}
		return false;
	});
	$('.arrow_right').click(function() {
		var left = parseInt($(".reel").css("left"));
		var window =  parseInt($(".window").css("width"));
		var reel = parseInt($(".reel").css("width"));
		var az = Math.abs(left) - window;
		if ((left > window - reel + step/2) && !$(".reel").is(':animated')) {
			$(".reel").animate({ left: '-=' + step}, 'fast');
			$('.arrow_left').css('backgroundPosition', 'bottom');
			if (left < window - reel + step*1.5) {
				$('.arrow_right').css('backgroundPosition', 'top');
			}
		}
		return false;
	});
});

$(window).load(function() {
	if (parseInt($(".reel").css("width")) > parseInt($(".window").css("width"))) {
		$('.arrow_right').css('backgroundPosition', 'bottom');
	}
});
