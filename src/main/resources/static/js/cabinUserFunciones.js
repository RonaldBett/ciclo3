function restGetClients() {
    $.ajax({
        url: "http://129.146.210.200:8080/api/Client/all",
        type: "GET",
        datatype: "json",
        success: function (respuesta) {
            llenarListaClientes(respuesta)
        },
        error: function (xhr, status) {
            console.log("Error en el metodo restGet()");
        }
    });
}

let clientes;
function llenarListaClientes(datos){
    clientes = datos;
}

function restGetCabins() {
    $.ajax({
        url: "http://129.146.210.200:8080/api/Cabin/all",
        type: "GET",
        datatype: "json",
        success: function (respuesta) {
            llenarDivItems(respuesta)
        },
        error: function (xhr, status) {
            console.log("Error en el metodo restGet()");
        }
    });
}


function restPostReservation(datos) {
    let datospeticion = JSON.stringify(datos);
    $.ajax({
        url: "http://129.146.210.200:8080/api/Reservation/save",
        data: datospeticion,
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            console.log("datos enviados");
        },
        error: function (xhr, status) {
            console.log("Error en el metodo restPost()");
        }
    });
}

function restPostMessage(datos) {
    let datospeticion = JSON.stringify(datos);
    $.ajax({
        url: "http://129.146.210.200:8080/api/Message/save",
        data: datospeticion,
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            console.log("datos enviados");
        },
        error: function (xhr, status) {
            console.log("Error en el metodo restPost()");
        }
    });
}

function crearCard(datos){
    let card = `<div id = ${datos.id} class = "card m-2" style = "width:18rem;">`
        card +=  "<div id = 'div_card_body' class = 'card-body'>"
        card +=    `<h5 id = 'card_title' class = "card-title">${datos.brand}</h5>`
        card +=    `<h6 id = 'card_subtitle' class = "card-subtitle mb-2 text-muted">${datos.category.name}</h6>`
        card +=    `<h6 id = 'card_subtitle_2' class = "card-subtitle mb-2 text-muted">Habitaciones: ${datos.rooms}</h6>`
        card +=    `<p  id = 'card_description' class = "card-text">${datos.description}</p>`;
        card +=    "<button class = 'btn btn-dark' onclick = 'funcionBotonMensaje(" + datos.id + ")'>Mensaje</button> &nbsp"
        card +=    "<button class = 'btn btn-dark' onclick = 'funcionBotonAlquilar(" + datos.id + ")'>Alquilar</button>"
        card +=   `</div>
                 </div>`;
    console.log("id = " + datos.id)
    $("#div_rows_items").append(card);
    return card;
}

function llenarDivItems(datos) {
    $("#div_rows_items").empty();
    for (i = 0; i < datos.length; i++) {
        crearCard(datos[i])
    }
}

function funcionBotonMensaje(id){
    let boton = "<button'boton_enviar' class='btn btn-dark m-3' id='botonEnviar' onclick='funcionBotonEnviar(" + id + ")'> Enviar </button>";
    $("#div_botones_message").append(boton);
    $("#div_overlay_message").toggle();
}

function funcionBotonAlquilar(id){
    let boton = "<button class='btn btn-dark m-3' id='botonReservar' onclick='funcionBotonReservar(" + id + ")'> Reservar </button>";
    $("#div_botones_reserv").append(boton);
    $("#div_overlay_reserv").toggle();
} 

function funcionBotonEnviar(id){
    var messageText = $("#field_messageText").val();
    var cabin = id;
    var password = $("#field_mess_clientPass").val();

    if(validacionesEnviar(messageText,password)){return};
    let cliente = validarPassword(password);
    if(!cliente){ 
        swal("Usuario no registrado");
        return 
    }
    idClient = cliente.idClient;

    let datos = {
        messageText: messageText,
        cabin: {id:cabin},
        client: {idClient: idClient}
    }
    
    swal("¿Seguro que desea enviar el mensaje?", {
        buttons: {
          cancel: "Cancelar",
          catch: {
            text: "Confirmar",
            value: "catch",
          },
        },
      })
      .then((value) => {
        switch (value) {

          case "catch":
            console.log(datos);
            restPostMessage(datos)
            swal("Procesando!", "Terminado!", "success");
            funcionBotonCancelar()
            break;
        }
      });
}

function funcionBotonReservar(id){
    var startDate = $("#field_startDate").val();
    var devolutionDate = $("#field_devolutionDate").val();
    var cabin = id;
    var password = $("#field_reser_clientPass").val();

    if(validacionesReservar(startDate,devolutionDate,password)){return};

    let cliente = validarPassword(password);
    if(!cliente){ 
        swal("Usuario no registrado");
        return 
    }
    idClient = cliente.idClient;
    
    let datos = {
        startDate: startDate,
        devolutionDate: devolutionDate,
        cabin: {id:cabin},
        client: {idClient: idClient}  
    }
    swal("¿Seguro que desea hacer la reservación?", {
        buttons: {
          cancel: "Cancelar",
          catch: {
            text: "Confirmar",
            value: "catch",
          },
        },
      })
      .then((value) => {
        switch (value) {

          case "catch":
            console.log(datos);
            restPostReservation(datos);
            swal("Procesando!", "Terminado!", "success");
            funcionBotonCancelar()
            break;
        }
      });
}

function funcionBotonCancelar(){
    $("#div_overlay_reserv").hide();
    $("#div_overlay_message").hide();
    $("#botonEnviar").remove();
    $("#botonReservar").remove();

    document.getElementById('field_startDate').value = "";
    document.getElementById('field_devolutionDate').value = "";
    document.getElementById('field_reser_clientPass').value = "";

    document.getElementById('field_messageText').value = "";
    document.getElementById('field_mess_clientPass').value = "";
}

function validacionesReservar(startDate,devolutionDate,password){
    if (startDate == "" || devolutionDate == "" || password == "") {
        swal("Debe ingresar todos los campos");
        return true;
    }

    if (startDate>devolutionDate) {
        swal("La fecha inicial no puede superar la fecha final");
        return true;
    }   
} 

function validacionesEnviar(messageText,password){
    if (messageText == "" || password == "") {
        swal("Debe ingresar todos los campos");
        return true;
    }   
} 

function validarPassword(password){
    console.log(clientes)
    for (let i = 0; i < clientes.length; i++) {
        if(clientes[i].password == password){
            return clientes[i];
        }
    }   

    return false;
} 

function validarAgregar(a, b) {
    if (a == "" || b == "" || b == null) {
        return true;
    }
    return false
}

function bloquearFechas(){
    var fecha = new Date();
    var year = fecha.getFullYear();
    var day = fecha.getDate();
    var _month = fecha.getMonth();
    var month = _month + 1;
    if (month < 10)
    { var mes = "0" + month;}
    else
    { var mes = month.toString;}
    document.getElementById('field_startDate').min = year+'-'+month+'-'+day; 
    document.getElementById('field_devolutionDate').min = year+'-'+month+'-'+day;
}