$(document).on("pageshow","#ficharm",function(event, ui){
    var sIdentificador=localStorage.getItem("codigoweb");
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'VerRM'
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
            var aRM = JSON.parse(respuesta);
            $.each( aRM, function( i, value ) { 
                document.formRM.tRM1.value=value['RM1'];
                document.formRM.tRM2.value=value['RM2'];
                document.formRM.tRM3.value=value['RM3'];
                document.formRM.tRM4.value=value['RM4'];
                document.formRM.tRM5.value=value['RM5'];
                document.formRM.tRM6.value=value['RM6'];
                document.formRM.tRM7.value=value['RM7'];
                document.formRM.tRM8.value=value['RM8'];
            })
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#volver").click(function(){
        $.mobile.changePage("panel.html",{ transition : "fade" });
    });
    $("#btHome").click(function(){
        $.mobile.changePage("panel.html",{ transition : "fade" });
    });

    $("#liGuardarRM").click(function(){
        $.mobile.changePage("pagos.html",{ transition : "fade" });
    });

});
