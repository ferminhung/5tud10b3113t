var totalRows = 5;
var activeRow = 1;


$(document).on("pageshow","#crearwod",function(event,ui){

    $('#volver').click(function(){
        $.mobile.changePage("paneladmin.html",{ transition : "flip" });
    });

    $('#iratras').click(function(){
        $.mobile.changePage("menuwod.html",{ transition : "flip" });
    });


    $(".editor").jqte({titletext:[
        {title:"Formato"},
        {title:"Tamaño"},
        {title:"Color"},
        {title:"Bold",hotkey:"B"},
        {title:"Italic",hotkey:"I"},
        {title:"Underline",hotkey:"U"},
        {title:"Lista Ordenada",hotkey:"."},
        {title:"Lista sin Orden",hotkey:","},
        {title:"Subscript",hotkey:"down arrow"},
        {title:"Superscript",hotkey:"up arrow"},
        {title:"Outdent",hotkey:"left arrow"},
        {title:"Indent",hotkey:"right arrow"},
        {title:"Justificar Izquierda"},
        {title:"Justificar Centrado"},
        {title:"Justificar Derecha"},
        {title:"Strike Through",hotkey:"K"},
        {title:"Add Link",hotkey:"L"},
        {title:"Remove Link",hotkey:""},
        {title:"Cleaner Style",hotkey:"Delete"},
        {title:"Horizontal Rule",hotkey:"H"},
        {title:"Source",hotkey:""}
    ]});
    
    

    $('#btGrabarWOD').click(function(){
        var sIdentificador=localStorage.getItem("codigoweb");   //aSesion["CodigoWeb"];
        var sFecha=$("#tFecha").val();
        var i=0;
        var sWOD=$(".editor").val();
        

        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sFechaPhp:sFecha, sWODPhp:"["+sWOD+"]", Mandato:'GrabarCartel'
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
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });


    });
    $('#btHome').click(function(){
        $.mobile.changePage("paneladmin.html",{ transition : "flip" });
    });

     
    
    // setTimeout(CargarPromociones(), 500);

});

