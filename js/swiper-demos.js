$cargador = '<div class="positionAbsolute aja" style="z-index:900; width:'+parseInt($(window).width())+'px; height:'+parseInt($(window).height())+'px;">\
                <div class="w100 h100 floatLeft cargador" style="background-color:#000000">\
                <div> Cargando </div>\
                <div id="circular" class="">\
                    <div id="circular_1" class="circular"></div>\
                    <div id="circular_2" class="circular"></div>\
                    <div id="circular_3" class="circular"></div>\
                    <div id="circular_4" class="circular"></div>\
                    <div id="circular_5" class="circular"></div>\
                    <div id="circular_6" class="circular"></div>\
                    <div id="circular_7" class="circular"></div>\
                    <div id="circular_8" class="circular"></div>\
                    <div class="clearfix"></div>\
                </div>\
                <div class="imagencita">\
                    <img src="template/fondo/2.png" alt="envases"/>\
                </div>\
            </div></div>';

document.createElement('header');
document.createElement('footer');

$(document).ready(function(){

	$("form[name=cargaInicio]").submit(function(a){
            a.preventDefault();
            id = $("select[name=cambiaProvincia]").val();
            alerg(id);
            if(id != "-" )
            	provContDonde(id,"0");
            else
            	alert("Elija una provincia");
    });
    $("#cargaPresentes").html($cargador);
});
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
	/*var swiperN2 = $('.swiper-n2').swiper({
		pagination : '.pagination-n2',
		slidesPerSlide : 2,
		mode: 'vertical'
	});*/
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

function muestraEvento(id)
{
	$data = 'donde='+$("#donde").html()+'&h=traeInfo&id='+id;
    lmPost($url,$data,"traeInfo");
}
