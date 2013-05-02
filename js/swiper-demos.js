/*
Author: Vladimir Kharlampidi, The iDangero.us
*/
document.createElement('header');
document.createElement('footer');

$(document).ready(function(){
	cargaSlides();
})
function funcionesDeCarga()
{
	$w = parseInt($(window).width());
	$h = parseInt($(window).height());
	$wDos = $w*3;

	$(".swiper-slide").width($w);
	$(".swiper-wrapper").width($wDos);

	cargaSlides();
}


function cargaSlides()
{

	/* Nested Swipers. Vertical Swiper inside of horizontal: */	
	var swiperN1 = $('.swiper-n1').swiper({
		pagination : '.pagination-n1',
		slidesPerSlide : 1,
	});
	var swiperN2 = $('.swiper-n2').swiper({
		pagination : '.pagination-n2',
		slidesPerSlide : 2,
		mode: 'vertical'
	});
	var swiperN3 = $('.swiper-n3').swiper({
		pagination : '.pagination-n3',
		slidesPerSlide : 3,
		mode: 'vertical'
	});
	var swiperN4 = $('.swiper-n4').swiper({
		pagination : '.pagination-n4',
		slidesPerSlide : 2,
		mode: 'vertical'
	});
}

