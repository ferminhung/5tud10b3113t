$(document).on("pageshow","#evaluaciones",function(event,ui){

    $('#volver').click(function(){
        $.mobile.changePage("panel.html",{ transition : "flip" });
    });

    var sIdentificador=localStorage.getItem("codigoweb");    
    $('#slcEval').change(function(){
        var sEval=$('#slcEval').val();
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sEvalPhp:sEval, Mandato:'VerEvaluacion'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $.mobile.loading( "show", {
                  text: "cargando",
                  textVisible: true,
                  theme: "a",
                  html: ""
                });
            },success:function(respuesta){
                $.mobile.loading( "hide" );  
                $('#espacioeval').html(respuesta);
            },error:function(jqXHR, textStatus, errorThrown){
                $.mobile.loading( "hide" );
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });
   

    
});

