$(document).on("pageshow","#panel",function(event, ui){
    //var aSesion = check_session();
    var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
    localStorage.setItem("imagenPago", "");

    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'Institucion'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){  
            var sAcad = respuesta;
            $("#nombreacad").text(sAcad);
        },error:function(jqXHR, textStatus, errorThrown){
            $.mobile.loading( "hide" );
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });


    //var sNombre=aSesion["nombre"];
    $("#hdCabeceraUser").html("<span class='icon-user'></span> "+sIdentificador);
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'NombreUsuario'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){  
            var sFitness = respuesta;
            $("#hdHeadPanel").text(sFitness);
        },error:function(jqXHR, textStatus, errorThrown){
            $.mobile.loading( "hide" );
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $('#liSolicitudes').click(function(){
        var sSugerencia=prompt("Tus sugerencias son bienvenidas");
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sSugerenciaPhp:sSugerencia, Mandato:'Sugerencia'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $('.cargando').fadeIn();
            },success:function(respuesta){  
                alert(respuesta);
            },error:function(jqXHR, textStatus, errorThrown){
                $.mobile.loading( "hide" );
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });
    $('#liStalk').click(function(){
		if($('#espacioStalk').html().length>10){
			$("#espacioStalk").html(" ");
		}else{
			$("#espacioStalk").html('<br><br><label style="color:yellow;"><span class="icon-search"></span>Buscando Actividad</label>');
			$.ajax({
				data:{
					sCodigoWebPhp:sIdentificador, Mandato:'Stalker'
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
					$("#espacioStalk").html(" ");
					var icono="icon-checkmark";
					var color="white";
					if(respuesta!="SIN REGISTROS"){
						 $('#espacioStalk').html('<br>');
						var aStalk = JSON.parse(respuesta);
						var aListaStalk=JSON.parse(aStalk[0].listaStalker);
						var aListaClases=JSON.parse(aStalk[0].clases)
						var clase="-";
						var claseID="0";
						$.each( aListaStalk, function( i, value ) { 
							switch(value['Proceso']){
								case 'WOD':
									icono="icon-eye";
									color="white";
									break;
								case 'Reservar':
									icono="icon-checkmark";
									color="green";
									break;
								case 'MeGustaElWOD':
									icono="icon-heart";
									color="yellow";
									break;
								case 'QuitarReserva':
									icono="icon-box-remove";
									color="red";
									break;
							}
							claseID=value['apellidos'];
							$.each( aListaClases, function( i, value ) { 
								if(value['id']==claseID){
									clase=value['strGrado'];
								}
							});
							$("#espacioStalk").append('<label style="color:'+color+';"><span class="'+icono+'"></span>['+value['telef']+'] '+clase+"-> "+value['nombres']+'</label>');
							clase="-";
						});
					}
				},error:function(jqXHR, textStatus, errorThrown){
                    $.mobile.loading( "hide" );
					ajax_error(jqXHR, textStatus, errorThrown,true);
				}
			});
			$('#espacioStalk').append('<br><br><br><br><br><br><br><br> ');
			$('#espacioStalk').trigger('create');
		}
    });
    
    $('#liMarcas').click(function(){
        $.mobile.changePage("evaluaciones.html",{ transition : "fade" });
    });
    $('#irInvitado').click(function(){
        $.mobile.changePage("invitado.html",{ transition : "fade" });
    });
    $('#liCuenta').click(function(){
        $.mobile.changePage("atletaficha.html",{ transition : "fade" });
    });
    $('#irDiccionario').click(function(){
        $.mobile.changePage("diccionario.html",{ transition : "fade" });
    });
    $("#liWOD").click(function(){
        $.mobile.changePage("wod.html",{ transition : "fade" });
    });
    $("#liReservas").click(function(){
        $.mobile.changePage("reserva.html",{ transition : "fade" });
    });
    $("#liPerfil").click(function(){
        $.mobile.changePage("miperfil.html",{ transition : "fade" });
    });
    $("#liPagos").click(function(){
        $.mobile.changePage("pagos.html",{ transition : "fade" });
    });
    
        
    $("#liRMs").click(function(){
        $.mobile.changePage("ficharm.html",{ transition : "fade" });
    });
    $("#liCerrar").click(function(){
        $.mobile.changePage("inicio.html",{ transition : "fade" });
    });
    
    var sFondo=localStorage.getItem("Fondo");   //aSesion["CodigoWeb"];
    if (sFondo==''){
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador,Mandato:'Fondo'
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
                var aPerfil = JSON.parse(respuesta);
                var imagen = new Image();

                $.each( aPerfil, function( i, value ) {
                    alert(value["observacion"]);
                });
            },error:function(jqXHR, textStatus, errorThrown){
                $.mobile.loading( "hide" );
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    }

    var sCartel=localStorage.getItem("Cartel");   //aSesion["CodigoWeb"];

    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'Cartel'
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
            var aPerfil = JSON.parse(respuesta);
            var imagen = new Image();
            var canvas = document.getElementById('espaciocartel');
            var ctx=canvas.getContext("2d");

            $.each( aPerfil, function( i, value ) {
                switch (value["codGrado"]){
                    case '2':
                        //$('#espaciocartel').html("");
                        if(sCartel!=value["observacion"]){
                            imagen.src = value["observacion"];
                            imagen.height=canvas.height;
                            var iw=imagen.width;
                            var ih=imagen.height;
                            imagen.onload = function(){
                                ctx.drawImage(imagen,0,0);
                            }
                            var image_data = canvas.toDataURL('image/png').slice(22);
                            localStorage.setItem('imagenCartel', image_data); // save image data
                            localStorage.setItem("Cartel", value["observacion"]);
                            //$('#espaciocartel').html(imagen);

                        }else{
                            var picture = localStorage.getItem('imagenCartel'); 



                            imagen.src = "data:image/png;base64," + picture; 
                            alert("data:image/png;base64," + picture);
                            imagen.onload = function() {
                                ctx.drawImage(imagen, 0, 0);
                            };
                            var prueba = document.getElementById('prueba');
                            prueba.src="data:image/png;base64," + picture;
                        }
                        break;
                }
            });
        },error:function(jqXHR, textStatus, errorThrown){
            $.mobile.loading( "hide" );
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });


    /*$.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'Mensajes'
        },
        url:'http://condominioagil.com/appMovil/ajaxService.php',
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){  
            var aMensajes = JSON.parse(respuesta);
            $.each( aMensajes, function( i, value ) {
                $("#h4Mensaje").text(value['sms_mensaje']);
            });
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });*/
});

