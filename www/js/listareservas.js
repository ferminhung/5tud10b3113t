$(document).on("pageshow","#listareservas",function(event, ui){
    var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
    //var sNombre=aSesion["nombre"];
    $("#InfoReserva").html("<span class='icon-user'></span> Trainer: "+sIdentificador);
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    $("#labDescripcion").text(" Disponibles para "+dd+"/"+mm+"/"+yyyy);
    
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'ListaEventos'
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
            $("#listaClases option").remove();
            $("#listaClases").append('<option value="SIN"> -------- </option>');
            if(respuesta!="SIN REGISTROS"){
                var aAreas = JSON.parse(respuesta);
                $.each( aAreas, function( i, value ) { 
                    $("#listaClases").append('<option value="'+value['id']+'" ">'+value['strGrado']+'</option>');
                })
            }
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#volverInicio").click(function(){
        $.mobile.changePage("paneladmin.html",{ transition : "fade" });

    });

    $("#listaClases").change(function(){
        var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
        var sEvento=document.formReservas.listaClases.value;
        var fecha = yyyy+'-'+mm+'-'+dd;

        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sIDEventoPhp:sEvento, sFechaPhp:fecha, Mandato:'VerAsistencia'
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
                
                var html = '';
                if (respuesta!="SIN"){
                    var aTletas = JSON.parse(respuesta);
                    var ij=0;
                    $.each( aTletas, function( i, value ) {
                        ij+=1;
                        html += '<tr id="fila'+ij+'"style="display: block !important;"><td style="width:50px !important;">'+ij+'</td><td style="width:150px !important;">'+value['nombres']+'</td><td style="width:100px !important;"><button id="bt'+ij+'" onclick="poner('+value['id']+','+sIdentificador+','+ij+')" class="btn-act"> Marcar</button></td></tr>';
                    });
                    html += '';
                }else{
                    html += '<tr style="display: block !important;"><td style="width:50px !important;"></td><td style="width:150px !important;">Sin Registros</td><td style="width:100px !important;"></td></tr>';
                }
                $('#tablafiliados').removeClass('ui-table ui-table-reflow');
                $('#afiliados').html('<center>'+html+'</center>');
                $('#afiliados').trigger('create');
                $("#labCupos").text(ij);

            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });

        verasistencia(sIdentificador,sEvento,fecha);
    });
});

function poner(id,codigo,i){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    var fecha = yyyy+'-'+mm+'-'+dd;
    $.ajax({
        data:{
            sCodigoWebPhp:codigo, sCodAlumnoPhp:id, sFechaPhp:fecha, Mandato:'MarcarAsistencia'
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
            if(respuesta=='MARCADO')  {
                document.getElementById("bt"+i).className = "btn-deact";
                document.getElementById("bt"+i).innerHTML = "Marcado";
                var sEvento=document.formReservas.listaClases.value;
                verasistencia(codigo,sEvento,fecha);
            }
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
        
}

function verasistencia(sIdentificador,sEvento,fecha){
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, sIDEventoPhp:sEvento, sFechaPhp:fecha, Mandato:'AsistenciaDia'
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
            
            var html = '';
            if (respuesta!="SIN"){
                var aTletas = JSON.parse(respuesta);
                var ij=0;
                $.each( aTletas, function( i, value ) {
                    ij+=1;
                    html += '<tr id="fila'+ij+'"style="display: block !important;"><td style="width:50px !important;">'+ij+'</td><td style="width:150px !important;">'+value['nombres']+'</td><td style="width:100px !important;"><button id="bt'+ij+'" onclick="quitar('+value['id']+','+sIdentificador+','+ij+')" class="btn-burbit-yellow"> Quitar</button></td></tr>';
                });
                html += '';
            }else{
                html += '<tr style="display: block !important;"><td style="width:50px !important;"></td><td style="width:150px !important;">Sin Registros</td><td style="width:100px !important;"></td></tr>';
            }
            $('#tablasistencia').removeClass('ui-table ui-table-reflow');
            $('#asistentes').html('<center>'+html+'</center>');
            $('#asistentes').trigger('create');
            $("#labAsistentes").text(ij);

        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
}
