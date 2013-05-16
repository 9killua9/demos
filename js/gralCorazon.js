/* @author: Leandro Salar, Marcelo Salar. @version: 0.1;  */

/* Declaracion de variables
============================ */
$(document).ready(function(){
    $(".bot1Volv").on('click',function(){
            location.href="index.html";
    });

    $(".saca img, .saca").click(function(){
        n1 = $("input[name=nombre1]").val();
        n2 = $("input[name=nombre2]").val();
        if(n1 != "" && n2 != "")
        {
            $(".estilosde").fadeOut("fast");
            com1 = n1.length;
            com2 = n2.length;

            if(com1>=com2)
            {
                cien = com1;
                saca = com2;
            }
            else
            {
                cien = com2;
                saca = com1;
            }

            porcent  = Math.round(Math.random()*90) * cien / 100;

            $(".contenidoCorazonTexto").html('Coinciden en un '+parseInt(porcent)+'0%').show();
            $(".contenidoCorazon img").addClass("loop");
        }
        else
            alert("Complete los nombres para saber tu coincidencia.");
    });
});

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
        
    }
    

}