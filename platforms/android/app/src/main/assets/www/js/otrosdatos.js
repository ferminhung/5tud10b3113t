$(document).on("pageshow","#otrosdatos",function(event,ui){


    var sIdentificador=localStorage.getItem("codigoweb");
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'VerCamposActivos'
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
            var aFicha = JSON.parse(respuesta);
            var ij=0;
            $.each( aFicha, function( i, value ) { 
            	$('#itemsdatos').append('<label>'+value['datoV']+'</label><input id="F'+i+'" ></input>');
                ij=ij+1;
            })
            $('#itemsdatos').trigger('create');
            localStorage.setItem("iTotalCampos",ij);
        },error:function(jqXHR, textStatus, errorThrown){
            $.mobile.loading( "hide" );
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'TraerOtrosDatos'
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
            var aFicha = JSON.parse(respuesta);
            var iTotal = 0;
            var ij=1;
            iTotal=localStorage.getItem("iTotalCampos");
            $.each( aFicha, function( i, value ) { 
                for (var ix =0 ; ix <= iTotal; ix++) {
                    $('#F'+ix).val(value['extra'+ij]);
                    ij=ij+1;
                 }
            })
        },error:function(jqXHR, textStatus, errorThrown){
            $.mobile.loading( "hide" );
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });


    $('#volver').click(function(){
        $.mobile.changePage("panel.html",{ transition : "flip" });
    });


    $('#btGuardarOtros').click(function(){
        var iTotal = 0;
        iTotal=localStorage.getItem("iTotalCampos");
        var arreglo = [iTotal];
        for (var i = 0; i <= iTotal-1; i++) {
            arreglo[i]=$('#F'+i).val();
        }
        var sArreglo = JSON.stringify(arreglo);
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sOtrosDatosPhp:sArreglo, Mandato:'GuardarOtrosDatos'
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
                alert(respuesta);
            },error:function(jqXHR, textStatus, errorThrown){
                $.mobile.loading( "hide" );
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });
        
});

