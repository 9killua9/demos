/* @author: Leandro Salar, Marcelo Salar. @version: 0.1;  */

/* Declaracion de variables
============================ */
$url     = 'http://www.reiatsu.com.ar/phonegap/fiestas_frizze/php/ajax.php';
$urlFbk  = 'php/facebook/ajax.php';
$nImagen = 0;

/* Inicio del doc  
=================== */
$(document).ready(function(){
    /* clase .nada hace que no se envien datos ni funcionen clicks 
==================================================================== */    

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
function provContDonde(id,p)
{
    id = parseInt(id);
    switch(id)
    {
        case 0:
            //Buenos aires
            prov = "Buenos Aires";
        break;
        case 3:
            prov = "Cordoba";
        break;
        case 2:
            prov = "Entre Rios";
        break;
        case 12:
            prov = "Jujuy";
        break;
        case 16:
            prov = "Mendoza";
        break;
        case 17:
            prov = "Neuquen";
        break;
        case 10:
            prov = "Salta";
        break;
        case 15:
            prov = "San Juan";
        break;
        case 20:
            prov = "Santa Cruz";
        break;
        case 4:
            prov = "Santa Fe";
        break;
        case 9:
            prov = "Santiago del Estero";
        break;
        case 11:
            prov = "Tucuman";
        break;
        case 12:
            prov = "Jujuy";
        break;
        case 8:
            prov = "Catamarca";
        break;
        case 14:
            prov = "Chaco";
        break;
        case 13:
            prov = "Formosa";
        break;
        case 5:
            prov = "Corrientes";
        break;
        case 6:
            prov = "Misiones";
        break;
        case 7:
            prov = "La Rioja";
        break;
        case 1:
            prov = "San Luis";
        break;
        case 23:
            prov = "La Pampa";
        break;
        case 18:
            prov = "Rio Negro";
        break;
        case 21:
            prov = "Tierra del Fuego";
        break;
        case 19:
            prov = "Chubut";
        break;
        default:
            prov = "no disponible";
        break;
    }
    window.localStorage.setItem("prov", prov);
    keyname = window.localStorage.key("prov");
    // keyname is now equal to "key"
    prov = window.localStorage.getItem(keyname);

    window.location.href="interna.html";
}
function get_random_color()
{
  //return '#'+'0123456789abcdef'.split('').map(function(v,i,a){return i>5 ? null : a[Math.floor(Math.random()*8)] }).join(''); 
  var rint = Math.round(0xffffff * Math.random());
  return 'rgba(' + (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255) + ', 0.3)';
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
        $ht                 = '';
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

                    $col = get_random_color();
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
                                        <p class="floatLeft botonVerMas icon add">ver info</p>\
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
                                        <p class="floatLeft botonVerMas icon add">ver info</p>\
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
            $("#cargaPresentes").html($ht);
            
            $(".W257X112").click(function(){
                id = $(this).attr("id");
                muestraEvento(id,'eventosactivos.php');
            });

            cargaSlides();
        }   
    }
    else if( xq == "traeInfo" )
    {
        if(v != null)
        {
            $("#imgBol").attr("src",v[0]['imagen']+'?v=1');
            $("#textoBol").html(v[0]['texto']);
            $("#tituBol").html(v[0]['titulo']);
            $("#fechaBol").html(v[0]['fecha']);
            $("#dirBol,#address").html(v[0]['dir_boliche']);
            initialize();
            codeAddress(v[0]['dir_boliche']);
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