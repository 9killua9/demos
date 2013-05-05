/* @author: Leandro Salar, Marcelo Salar. @version: 0.1;  */

/* Declaracion de variables
============================ */
$url     = 'http://www.reiatsu.com.ar/phonegap/fiestas_frizze/php/ajax.php';
$urlFbk  = 'php/facebook/ajax.php';
$nImagen = 0;
$cargador1 = '<div class="positionAbsolute aja cargador overflowHidden" style=" height:134px !important; background:url(template/fondo/pattern_40.gif) repeat scroll 0 0 transparent; opacity:.9; z-index:900; width:'+parseInt($(window).width())+'px;">\
                <div class="container" style="margin-top:27px !important;">\
                    <div class="content">\
                    <div class="ball"></div>\
                    <div class="ball1"></div>\
                    </div>\
                </div>\
            </div>';

$cargador = '<div class="positionAbsolute aja cargador overflowHidden" style=" height:'+parseInt($(window).height())+'px !important; background:url(template/fondo/pattern_40.gif) repeat scroll 0 0 transparent; opacity:.9; z-index:900; width:'+parseInt($(window).width())+'px;">\
                <div class="container" style="margin-top:27px !important;">\
                    <div class="content">\
                    <div class="ball"></div>\
                    <div class="ball1"></div>\
                    </div>\
                </div>\
            </div>';


$(document).ready(function(){
});
/* Comienzo de las funciones 
=================================================================== */
function cargaEventosHome(prov)
{
    $data = 'donde='+prov+'&h=cargaEventosHome';
    lmPost($url,$data,"cargaEventosHome");
}
function cargaFuncionesEvAc(prov,id)
{   
    $("form[name=guardaAsociado] input[name=id]").val(id);
    $data = 'donde='+$("#donde").html()+'&h=traeInfo&id='+id;
    lmPost($url,$data,"traeInfo");
}
function cargaFuncionesEvPas(id)
{
    $data = 'donde='+$("#donde").html()+'&h=traeInfo&id='+id;
    lmPost($url,$data,"traeInfoPas");
}
function buscaPorMes(mes)
{
    var tam=35;
    $(".mesesDelAno").animate({height:tam},500,function(){});   

    $data = 'donde='+$("#donde").html()+'&h=cargaEventosHomeMes&mes='+mes;
    lmPost($url,$data,"cargaEventosHome");    
}
function buscadorDeDatos(buscar)
{
    $data = 'donde='+$("#donde").html()+'&h=traeInfoParaElBuscador&buscar='+buscar;
    lmPost($url,$data,"traeInfoParaElBuscador");
}
function buscadorSeccion()
{
    $("form[name=buscadorFrizze]").submit(function(a){
        a.preventDefault();
        return false;
    });  
    $(".buscadorImagen").click(function(){

       if($("form[name=buscadorFrizze] input[name=buscar]").val() != '' && $("form[name=buscadorFrizze] input[name=buscar]").val().length >= 1)
       {

            $buscar = $("form[name=buscadorFrizze] input[name=buscar]").val();
            buscadorDeDatos($buscar);
       }
       else
       {    
            $("form[name=buscadorFrizze] input[name=buscar]").attr('placeholder','Ingrese evento');
       }

    });
}
function get_random_color()
{
  //return '#'+'0123456789abcdef'.split('').map(function(v,i,a){return i>5 ? null : a[Math.floor(Math.random()*8)] }).join(''); 
  var rint = Math.round(0xffffff * Math.random());
  return 'rgba(' + (rint >> 21) + ',' + (rint >> 4 & 255) + ',' + (rint & 255) + ', 0.3)';
}
/* Funciones de el framework para leer los resultados del ajax
=================================================================== */
function termina(xq,v)
{
    /**
     * xq -> corresponde al caso del switch
     * v -> resultado en array que envia el ajax
     */
    if( xq == "traeFotos" )
    {
        
        $i = 0;
        $ht ='';

        if(v != null)
        {
            for($i=0; $i < v['cantidad']; $i++)
            {
                $ht += '<div class="floatLeft muestraImagenes overflowHidden seisSieteSeisOcho cursorPointer"> <img src="'+v['img'][$i]['source']+'" /></div>';
            }
            
            $(".muestraDireccion a").attr("href","http://www.facebook.com/"+v['album']);
            $("#cargaFotelis").html($ht);
        }
    }
    else if( xq == "cargaEventosHome" )
    {
        $i                  = 0;
        $j                  = 0;
        $b                  = 0;
        $ht                 = '<div class="header">PR&Oacute;XIMAS FIESTAS</div><div class="headerSombra"></div>';
        $htv                = '';
        fechaEventoActual   = '';

        if(v != null)
        {
            for($i=0; $i < v['vueltas']; $i++)
            {
                fechaEventoActual   = v[$i]['fecha'].split(".");
                var mes             = parseInt(fechaEventoActual[1]);
                var dia             = parseInt(fechaEventoActual[0]);
                if(mes >= v['compara_mes'])
                {
                    if (v[$i]['id_galeria'] != "-")
                    {
                        $verGaleria = v[$i]['id_galeria'];
                        $esty       = 'style="color:#ffffff;"'; 
                    }
                    else
                    {
                        $verGaleria = "#";
                        $esty       = 'style="text-decoration: line-through !important; color:#999999;"';
                    }

                    /*$col = get_random_color();*/

                    if($i%2 == 0)
                        $col = "rgba(0,0,0, 0.71)";/*$col = "rgba(5,33,248, 0.2)";*/
                    else
                        $col = "rgba(255,255,255, 0.1)";

                    if(mes == v['compara_mes'] && dia > v['compara_dia'])
                    {
                        $ht += '<div class="swiper-slide W257X112" id="'+v[$i]['id']+'" style="height:133px !important; background-color:'+$col+' ">\
                                    <div class="floatLeft overflowHidden contenedorImagenMini miniImagenFiesta">\
                                        <img src="http://www.reiatsu.com.ar/clientes/frizze/facebook/fiestas_frizze/'+v[$i]['imagen']+'" class="floatLeft" style="width:60px;" />\
                                        <div class="floatLeft" style=" width:120px;text-align:center;font-size:0.8em !important">'+v[$i]['fecha']+'</div>\
                                    </div>\
                                    <div class="floatLeft acomodaTextoIzquierda">\
                                        <p class="floatLeft nombreDelBoliche futura w100" style="margin-bottom:5px !important;"><strong>'+v[$i]['titulo']+'</strong></p>\
                                        <p class="floatLeft direccionDelBoliche futura" style="margin-top:8px;">'+v[$i]['dir_boliche']+'</p>\
                                        <p class="floatLeft provinciaDelBoliche futura" style="clear:both;">'+v[$i]['barrio']+'</p>\
                                        <p class="floatLeft botonVerMas icon add">[ + info]</p>\
                                    </div>\
                                </div>';
                            $j++;
                    }
                    else if( mes > v['compara_mes'] )
                    {
                        $ht += '<div class="swiper-slide W257X112" id="'+v[$i]['id']+'" style="height:133px !important; background-color:'+$col+' ">\
                                    <div class="floatLeft overflowHidden contenedorImagenMini miniImagenFiesta">\
                                        <img src="http://www.reiatsu.com.ar/clientes/frizze/facebook/fiestas_frizze/'+v[$i]['imagen']+'" class="floatLeft" style="width:60px;" />\
                                        <div class="floatLeft" style=" width:120px;text-align:center;font-size:0.8em !important">'+v[$i]['fecha']+'</div>\
                                    </div>\
                                    <div class="floatLeft acomodaTextoIzquierda">\
                                        <p class="floatLeft nombreDelBoliche futura w100" style="margin-bottom:5px !important;"><strong>'+v[$i]['titulo']+'</strong></p>\
                                        <p class="floatLeft direccionDelBoliche futura" style="margin-top:8px;">'+v[$i]['dir_boliche']+'</p>\
                                        <p class="floatLeft provinciaDelBoliche futura" style="clear:both;">'+v[$i]['barrio']+'</p>\
                                        <p class="floatLeft botonVerMas icon add">[ + info]</p>\
                                    </div>\
                                </div>';
                            $j++;
                    }
                    else
                    {
                        $htv += '<div class="floatLeft cajitaEventoBoliche" id="'+v[$i]['id']+'">\
                                    <div class="floatLeft overflowHidden clickReemplazlocajitaEventoBoliche contenedorImagenMini imagenBoliche">\
                                        <img src="'+v[$i]['imagen']+'" class="floatLeft" />\
                                    </div><div class="clearBoth"></div>\
                                    <div class="floatLeft futura nombreBoliche clickReemplazlocajitaEventoBoliche">'+v[$i]['titulo']+'</div>\
                                    <div class="floatLeft futura fechaBoliche clickReemplazlocajitaEventoBoliche">'+v[$i]['fecha']+'</div>\
                                    <div class="clearBoth"></div><div class="floatLeft verGaleria"><a href="'+$verGaleria+'" '+$esty+' target="_blank">VER GALERIA</a></div> \
                                </div>';
                                $b++;

                    } //Si el evento que compara es de este mes pero ya paso
                }
                else
                {
                    $htv += '<div class="floatLeft cajitaEventoBoliche" id="'+v[$i]['id']+'">\
                                    <div class="floatLeft overflowHidden clickReemplazlocajitaEventoBoliche contenedorImagenMini imagenBoliche">\
                                        <img src="'+v[$i]['imagen']+'" class="floatLeft" />\
                                    </div><div class="clearBoth"></div>\
                                    <div class="floatLeft futura nombreBoliche clickReemplazlocajitaEventoBoliche">'+v[$i]['titulo']+'</div>\
                                    <div class="floatLeft futura fechaBoliche clickReemplazlocajitaEventoBoliche">'+v[$i]['fecha']+'</div>\
                                    <div class="clearBoth"></div><div class="floatLeft verGaleria"><a href="'+$verGaleria+'" '+$esty+' target="_blank">VER GALERIA</a></div> \
                                </div>';
                                $b++;
                } //Si el evento que compara es del mes pasado

            } // termina bucle
            
            /*$("#cargaBoliViejos").html($htv);*/
            $("#cargaPresentes")
                .css({height:parseInt($(window).height())+'px', 'overflow-x':'hidden', 'overflow-y':'auto', width:parseInt($(window).width())+3})
                .html($ht)
                .niceScroll({touchbehavior:true});

            $(".cargador").remove();


            $(".W257X112").on( "swiperight", function() {
                $(".acomodaAlto").css("-webkit-transform","translate3d(0px, 0px, 0px)");
                $(this).css("overflow","hidden").append($cargador1);
                id = $(this).attr("id");
                muestraEvento(id,'eventosactivos.php'); 
            });
            
            $("html, body").width(parseInt($(window).width())).height(parseInt($(window).height()));
            cargaSlides();
        }   
    }
    else if( xq == "traeInfo" )
    {
        if(v != null)
       {    
            $w = parseInt($(window).width());
            $ht = '<div class="header">VER M&Aacute;S INFO</div><div class="headerSombra"></div>';
            $ht += '<div class="contenedor floatLeft">\
                        <div class="titulo"> \
                            <strong>'+v[0]['titulo']+'</strong> (<small style="font-size:16px; color:#cdcdcd"> '+v[0]['fecha']+' </small>)\
                            <img src="template/fondo/bandera.png" style="width: 50px; margin-right:3px !important;float: right; margin-top: -17px !important;" />\
                        </div>\
                        <div class="imagen">\
                            <img src="https://maps.googleapis.com/maps/api/staticmap?center='+v[0]['dir_boliche']+', '+v[0]['barrio']+', '+v[0]['provincia']+', Argentina&zoom=16&size='+parseInt($(window).width())+'x200&markers='+v[0]['dir_boliche']+', '+v[0]['barrio']+', '+v[0]['provincia']+'|&sensor=false" width="'+parseInt($(window).width())+'" height="200" />\
                        </div>\
                        <div class="dir" style="height: 53px; padding: 9px !important; padding-top: 20px !important;font-size:17px;">\
                            <img src="template/fondo/pin.png" style="width: 50px; margin-right:3px !important;float: right; margin-top: -17px !important;" />'+v[0]['dir_boliche']+', '+v[0]['barrio']+'\
                        </div>\
                        <div class="texto" style="padding:12px !important;">'+v[0]['texto']+'</div>\
                   </div>';

            $("#muestraContenido").html($ht);
            $(".acomodaAlto").css("-webkit-transform","translate3d(-"+($w)+"px, 0px, 0px)");
            $(".cargador").remove();

            sum = parseInt($(".titulo").height()) + parseInt($(".imagen").height()) + parseInt($(".dir").height());
            tot = parseInt($(window).height())-sum;
            $(".texto").height(tot-150);
            $(".texto").niceScroll({touchbehavior:true});
        }
    }
    else if( xq == "traeInfoPas" )
    {
        if(v != null)
        {
            if(v[0]['fotos'] != null && v[0]['fotos'] != "" && v[0]['fotos'] != undefined)
                var $im = '<img src="'+v[0]['fotos']+'" class="fotoFacebook" style="width:280px; height:auto; border-radius:12px;margin-top:-27px;"/>'
            else
                var $im = 'Proximamente';

            if(v[0]['id_galeria'] != "" && v[0]['id_galeria'] != null && v[0]['id_galeria'] != undefined)
                $que = v[0]['id_galeria'];
            else
                que = "#";
            $("#imgBol").attr("src",v[0]['imagen']+'?v=1');
            $("#textoBol").html(v[0]['texto']);
            $("#tituBol").html(v[0]['titulo']);
            $("#fechaBol").html(v[0]['fecha']);
            $("#dirBol,#address").html(v[0]['dir_boliche']);
            $(".eve").attr("href",$que);
            $("#cargaFotelis").html($im);

            $("#textoBol").niceScroll({touchbehavior:true});
        }   
    }
    else if( xq == "traeInfoParaElBuscador" )
    {
        if(v != null)
        {
            $i                  = 0;
        $j                  = 0;
        $b                  = 0;
        $ht                 = '';
        $htv                = '';
        fechaEventoActual   = '';

            for($i=0; $i < v['vueltas']; $i++)
            {
                fechaEventoActual   = v[$i]['fecha'].split(".");
                var mes             = parseInt(fechaEventoActual[1]);
                var dia             = parseInt(fechaEventoActual[0]);
                if(mes >= v['compara_mes'])
                {
                    if(mes == v['compara_mes'] && dia > v['compara_dia'])
                    {
                        $ht += '<div class="floatLeft W257X112 repEstilo" id="'+v[$i]['id']+'">\
                                <div class="floatLeft overflowHidden contenedorImagenMini miniImagenFiesta">\
                                    <img src="'+v[$i]['imagen']+'" class="floatLeft" />\
                                </div>\
                                <div class="floatLeft w180">\
                                    <p class="floatLeft diaDeLaSemanaFiesta futura w100">'+v[$i]['fecha']+'</p>\
                                    <p class="floatLeft nombreDelBoliche futura w100">'+v[$i]['titulo']+'</p>\
                                    <p class="floatLeft direccionDelBoliche futura">'+v[$i]['dir_boliche']+'</p>\
                                    <div class="clearBoth"></div>\
                                    <p class="floatLeft provinciaDelBoliche futura">'+v[$i]['barrio']+'</p>\
                                </div>\
                            </div>';
                            $j++;
                    }
                    else if( mes > v['compara_mes'] )
                    {
                        $ht += '<div class="floatLeft W257X112 repEstilo" id="'+v[$i]['id']+'">\
                                <div class="floatLeft overflowHidden contenedorImagenMini miniImagenFiesta">\
                                    <img src="'+v[$i]['imagen']+'" class="floatLeft" />\
                                </div>\
                                <div class="floatLeft w180">\
                                    <p class="floatLeft diaDeLaSemanaFiesta futura w100">'+v[$i]['fecha']+'</p>\
                                    <p class="floatLeft nombreDelBoliche futura w100">'+v[$i]['titulo']+'</p>\
                                    <p class="floatLeft direccionDelBoliche futura">'+v[$i]['dir_boliche']+'</p>\
                                    <div class="clearBoth"></div>\
                                    <p class="floatLeft provinciaDelBoliche futura">'+v[$i]['barrio']+'</p>\
                                </div>\
                            </div>';
                            $j++;
                    }
                    else
                    {
                        $htv += '<div class="floatLeft W257X112 repEstilo" id="'+v[$i]['id']+'">\
                                <div class="floatLeft overflowHidden contenedorImagenMini miniImagenFiesta">\
                                    <img src="'+v[$i]['imagen']+'" class="floatLeft" />\
                                </div>\
                                <div class="floatLeft w180">\
                                    <p class="floatLeft diaDeLaSemanaFiesta futura w100">'+v[$i]['fecha']+'</p>\
                                    <p class="floatLeft nombreDelBoliche futura w100">'+v[$i]['titulo']+'</p>\
                                    <p class="floatLeft direccionDelBoliche futura">'+v[$i]['dir_boliche']+'</p>\
                                    <div class="clearBoth"></div>\
                                    <p class="floatLeft provinciaDelBoliche futura">'+v[$i]['barrio']+'</p>\
                                </div>\
                            </div>';
                                $b++;

                    } //Si el evento que compara es de este mes pero ya paso
                }
                else
                {
                    $htv += '<div class="floatLeft W257X112 repEstilo" id="'+v[$i]['id']+'">\
                                <div class="floatLeft overflowHidden contenedorImagenMini miniImagenFiesta">\
                                    <img src="'+v[$i]['imagen']+'" class="floatLeft" />\
                                </div>\
                                <div class="floatLeft w180">\
                                    <p class="floatLeft diaDeLaSemanaFiesta futura w100">'+v[$i]['fecha']+'</p>\
                                    <p class="floatLeft nombreDelBoliche futura w100">'+v[$i]['titulo']+'</p>\
                                    <p class="floatLeft direccionDelBoliche futura">'+v[$i]['dir_boliche']+'</p>\
                                    <div class="clearBoth"></div>\
                                    <p class="floatLeft provinciaDelBoliche futura">'+v[$i]['barrio']+'</p>\
                                </div>\
                            </div>';
                                $b++;
                } //Si el evento que compara es del mes pasado

            } // termina bucle
            
            
            $(".cajitaEventoBoliche").click(function(){
                id = $(this).attr("id");
                muestraEvento(id,'eventospasados.php');
            });

            $(".W257X112").click(function(){
                id = $(this).attr("id");
                muestraEvento(id,'eventosactivos.php');
            });

            $(".muestraElResultadoQueTraeElBuscador").html($ht);
            $(".muestraElResultadoQueTraeElBuscadorV").html($htv);
        }   
           
            //$("#imgBol").attr("src",v[0]['imagen']+'?v=1');            

    }
    else if( xq == "donde" )
    {
        if(v != null)
            if(v['aviso'] != "")
                cargaLoadDelSite(v['aviso']);

    }
    else if( xq == "cargaEmail" )
    {
        $(".campoAvisoEmailVacio, .campoAvisoEmailIncorrecto").hide();
        $(".asociateAlEvento").append('<div class="floatLeft campoAvisoEmailIncorrecto"><p class="floatLeft">'+v['aviso']+'</p></div>');
    }

}