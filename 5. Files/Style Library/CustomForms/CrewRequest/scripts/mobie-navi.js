$(function(){
	$('.nav-button').click(function(){
		$(this).toggleClass('active')
		$('.navigation').toggleClass('active');
		$('.content-container ').toggleClass('active');
		$('.footer ').toggleClass('active');
		});
	});