
function restGet() {
    $.ajax({
        url: "http://129.146.210.200:8080/api/Client/all",
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

function restGetId(id,opt) {
    $.ajax({
        url: "http://129.146.210.200:8080/api/Client/" + id,
        type: "GET",
        datatype: "json",
        success: function (respuesta) {
            if(opt == "res"){
                llenarDivDetalleReservas(respuesta)
            }else if(opt == "mess"){
                llenarDivDetalleMessage(respuesta)
            }else if(opt == "borr"){
                funcionBotonBorrar(respuesta)
            }else{
                mostrarDivAct(respuesta)
            }
            console.log(respuesta)
        },
        error: function (xhr, status) {
            console.log("Error en el metodo restGetId()");
        }
    });
}

function restPost(datos) {
    let datospeticion = JSON.stringify(datos);
    $.ajax({
        url: "http://129.146.210.200:8080/api/Client/save",
        data: datospeticion,
        type: "POST",
        contentType: "application/JSON",
        success: function (respuesta) {
            crearCard(respuesta)
            console.log("datos enviados");
        },
        error: function (xhr, status) {
            console.log("Error en el metodo restPost()");
        }
    });
}

function restPut(datos) {
    let datospeticion = JSON.stringify(datos);
    $.ajax({
        url: "http://129.146.210.200:8080/api/Client/update",
        data: datospeticion,
        type: "PUT",
        contentType: "application/JSON",
        success: function (respuesta) {
            console.log("datos enviados");
        },
        error: function (xhr, status) {
            console.log("Error en el metodo restPut()");
        }
    });
}

function restDelete(id) {
    $.ajax({
        url: "http://129.146.210.200:8080/api/Client/" + id,
        type: "DELETE",
        contentType: "application/JSON",
        success: function (respuesta) {
            console.log("Elemento eliminado, id = " + id);
        },
        error: function (xhr, status) {
            console.log("Error en el metodo restDelete()");
        }
    });
}

function crearCard(datos){
    let card = `<div id = ${datos.idClient} class = "card m-2" style = "width:18rem;">`
        card +=  "<div id = 'div_card_body' class = 'card-body'>"
        card +=    `<h5 id = 'card_title' class = "card-title">${datos.name}</h5>`
        card +=    `<h6 id = 'card_subtitle' class = "card-subtitle mb-2 text-muted">Edad: ${datos.age} Años</h6>`
        card +=    `<h6 id = 'card_subtitle_2' class = "card-subtitle mb-2 text-muted">Email: ${datos.email}</h6>`
        card +=    `<p  id = 'card_description' class = "card-text">Password: ${datos.password}</p>`;
        card +=    "<a role='button' style = 'text-decoration: none' onclick = 'auxiliarReservation(" + datos.idClient + ")'><h6 class = 'card-subtitle mb-2 text-muted'>Reservaciones</h6></a>"
        card +=    "<a role='button' style = 'text-decoration: none' onclick = 'auxiliarMessage(" + datos.idClient + ")'><h6 class = 'card-subtitle mb-2 text-muted'>Mensajes</h6></a>"
        card +=    "<button class = 'btn btn-dark' onclick = 'auxiliarBorrar(" + datos.idClient + ")'>Borrar</button> &nbsp"
        card +=    "<button class = 'btn btn-dark' onclick = 'restGetId(" + datos.idClient + ")'>Actualizar</button>"
        card +=   `</div>
                 </div>`;
    console.log("id = " + datos.idClient)
    $("#div_rows_items").append(card);
    return card;
}


function actualizarCard(datos){
    $("#" + datos.idClient + " #div_card_body").empty();
    let nuevo =  `<h5 id = 'card_title' class = "card-title">${datos.name}</h5>`
        nuevo += `<h6 id = 'card_subtitle2' class = "card-subtitle mb-2 text-muted">Edad: ${datos.age} Años</h6>`
        nuevo += `<h6 id = 'card_subtitle_2' class = "card-subtitle mb-2 text-muted">Email: ${datos.email}</h6>`
        nuevo += `<p id = 'card_description' class = "card-text">Password: ${datos.password}</p>`;
        nuevo += "<a role='button' style = 'text-decoration: none' onclick = 'auxiliarReservation(" + datos.idClient + ")'><h6 class = 'card-subtitle mb-2 text-muted'>Reservaciones</h6></a>"
        nuevo += "<a role='button' style = 'text-decoration: none' onclick = 'auxiliarMessage(" + datos.idClient + ")'><h6 class = 'card-subtitle mb-2 text-muted'>Mensajes</h6></a>"
        nuevo += "<button class = 'btn btn-dark' onclick = 'auxiliarBorrar(" + datos.idClient + ")'>Borrar</button> &nbsp"
        nuevo += "<button class = 'btn btn-dark' onclick = 'restGetId(" + datos.idClient + ")'>Actualizar</button>";
    $("#" + datos.idClient + " #div_card_body").append(nuevo);
}

function llenarDivItems(datos) {
    $("#div_rows_items").empty();
    for (i = 0; i < datos.length; i++) {
        crearCard(datos[i])
    }
}

function funcionBotonAgregar() {
    var email = $("#field_email").val();
    var password = $("#field_password").val();
    var name = $("#field_name").val();
    var age = $("#field_age").val();

    if (validarAgregar(email, password, name)) {
        swal("Debe ingresar 'Nombre', 'Correo' y 'Contraseña'")
        return
    };

    let datos = {
        email: email,
        password: password,
        name: name,
        age: age,
    }

    restPost(datos);
    mostrarOcultarDivAddAct();
}

function funcionBotonActualizar(id){
    var id = id;
    var email = $("#field_email").val();
    var password = $("#field_password").val();
    var name = $("#field_name").val();
    var age = $("#field_age").val();

    if (validarAgregar(email, password, name)) {
        swal("Debe ingresar 'Nombre', 'Correo' y 'Contraseña'")
        return
    };

    let datos = {
        idClient:id,
        email: email,
        password: password,
        name: name,
        age: age,
    }

    actualizarCard(datos)
    restPut(datos);
    mostrarOcultarDivAddAct()
}

function funcionBotonBorrar(datos) {
    if (datos.reservations.length != 0 || datos.messages.length != 0) {
        swal("No puede borrar un cliente que contenga mensajes o reservaciones")
        return
    }
    swal("¿Seguro que desea borrar el ítem?", {
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
            restDelete(datos.idClient)
            swal("Eliminando!", "Eliminado!", "success");
            $("#" + datos.idClient).remove();
            break;
        }
      });
}
function auxiliarBorrar(id){
    restGetId(id,"borr")
}

function mostrarDivAdd(){
    let boton = "<button class = 'btn btn-dark' id='botonAddAct' onclick='funcionBotonAgregar()'> Agregar </button>";
    mostrarOcultarDivAddAct('Agregar',boton);
}

function mostrarDivAct(datos){
    var id = datos.idClient;
    let boton = "<button class = 'btn btn-dark' id='botonAddAct' onclick='funcionBotonActualizar(" + id + ")'> Actualizar </button>";
    mostrarOcultarDivAddAct('Actualizar',boton);
    document.getElementById('field_email').value = datos.email;
    document.getElementById('field_password').value = datos.password;
    document.getElementById('field_name').value = datos.name;
    document.getElementById('field_age').value = datos.age;
}

function mostrarOcultarDivAddAct(titulo,boton){
    $("#div_agregar_titulo").empty();
    $("#botonAddAct").remove();
    $("#div_agregar_titulo").append("<h5 class = 'text-md-center m-4'>" + titulo + "</h5>");
    $("#div_botones").append(boton);
    document.getElementById('field_email').value = "";
    document.getElementById('field_password').value = "";
    document.getElementById('field_name').value = "";
    document.getElementById('field_age').value = "";
    $("#div_overlay").toggle();
    $("#botonAgregarItem").toggle();
}

function validarAgregar(a, b , c) {
    if (a == "" || b == "" || c == "") {
        return true;
    }
    return false
}



function crearCardReservas(datos){
    let card = `<div id = detalle_${datos.idReservation} class = "card m-2" style = "width:18rem;">`
        card +=  "<div id = 'div_card_body' class = 'card-body'>"
        card +=    `<h5 class = 'card-title'>Cabaña: ${datos.cabin.brand}</h5>`
        card +=    `<h6 class = "card-subtitle mb-2 text-muted">Fecha Inicio: ${datos.startDate}</h6>`
        card +=    `<h6 class = "card-subtitle mb-2 text-muted">Fecha Final: ${datos.devolutionDate}</h6>`
        card +=   `</div>
                 </div>`;
    console.log("id = " + datos.idReservation)
    $("#div_rows_items_detalle").append(card);
    return card;
}

function llenarDivDetalleReservas(datos) {
    if (datos.reservations.length == 0) {
        swal("Este cliente no tiene reservaciones")
        return
    }
    $("#div_rows_items_detalle").empty();
    for (i = 0; i < datos.reservations.length; i++) {
        crearCardReservas(datos.reservations[i]);
    }
    $("#div_titulo_popup2").append("<h2 id = 'titulo_detalle'>Reservaciones</h2>")
    $("#div_overlay_2").toggle();
}

function auxiliarReservation(id){
    restGetId(id,"res")
}

function ocultarDivDetalle(){
    $("#titulo_detalle").remove()
    $("#div_overlay_2").toggle();
}



function crearCardMessage(datos){
    let card = `<div id = detalle_${datos.idMessage} class = "card m-2" style = "width:18rem;">`
        card +=  "<div id = 'div_card_body' class = 'card-body'>"
        card +=    `<h5 class = 'card-title'>Cabaña: ${datos.cabin.brand}</h5>`
        card +=    `<h6 class = "card-subtitle mb-2 text-muted">Mensaje: ${datos.messageText}</h6>`
        card +=   `</div>
                 </div>`;
    console.log("id = " + datos.idMessage)
    $("#div_rows_items_detalle").append(card);
    return card;
}

function llenarDivDetalleMessage(datos) {
    if (datos.messages.length == 0) {
        swal("Este cliente no tiene mensajes")
        return
    }
    $("#div_rows_items_detalle").empty();
    for (i = 0; i < datos.messages.length; i++) {
        crearCardMessage(datos.messages[i]);
    }
    $("#div_titulo_popup2").append("<h2 id = 'titulo_detalle'>Mensajes</h2>")
    $("#div_overlay_2").toggle();
}

function auxiliarMessage(id){
    restGetId(id,"mess")
}
