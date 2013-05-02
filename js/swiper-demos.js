/*
Author: Vladimir Kharlampidi, The iDangero.us
*/
document.createElement('header');
document.createElement('footer');

$(document).ready(function(){
	$("form[name=cargaInicio]").submit(function(a){
            a.preventDefault();
            id = $("select[name=cambiaProvincia]").val();
            provContDonde(id,"0");
    });
})
function funcionesDeCarga()
{
	$w = parseInt($(window).width());
	$h = parseInt($(window).height());
	
	$(".acomodaAlto, .swiper-n3, .red-slide, .swiper-n1, .swiper-n2").height($h);
	$(".pagination-nested1").attr('style',"margin-top:"+($h-30)+'px !important;');

	keyname = window.localStorage.key("prov");
    // keyname is now equal to "key"
    prov = window.localStorage.getItem(keyname);

    cargaEventosHome(prov);
	
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
	/*var swiperN4 = $('.swiper-n4').swiper({
		pagination : '.pagination-n4',
		slidesPerSlide : 2,
		mode: 'vertical'
	});*/
}

