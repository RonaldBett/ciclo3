function restGetCategories() {
    $.ajax({
        url: "http://129.146.210.200:8080/api/Category/all",
        type: "GET",
        datatype: "json",
        success: function (respuesta) {
            setCategories(respuesta);
        },
        error: function (xhr, status) {
            console.log("Error en el metodo restGetCategories()");
        }
    });
}

function restGet() {
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

function restGetId(id, opt) {
    $.ajax({
        url: "http://129.146.210.200:8080/api/Cabin/" + id,
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
        url: "http://129.146.210.200:8080/api/Cabin/save",
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
        url: "http://129.146.210.200:8080/api/Cabin/update",
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
        url: "http://129.146.210.200:8080/api/Cabin/" + id,
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
    let catego = "";
    if (datos.category.name != null && datos.category.name != undefined) {
        catego += datos.category.name;
    }
    let card = `<div id = ${datos.id} class = "card m-2" style = "width:18rem;">`
        card +=  "<div id = 'div_card_body' class = 'card-body'>"
        card +=    `<h5 id = 'card_title' class = "card-title">${datos.brand}</h5>`
        card +=    `<h6 id = 'card_subtitle' class = "card-subtitle mb-2 text-muted">${catego}</h6>`
        card +=    `<h6 id = 'card_subtitle_2' class = "card-subtitle mb-2 text-muted">Habitaciones: ${datos.rooms}</h6>`
        card +=    `<p  id = 'card_description' class = "card-text">${datos.description}</p>`;
        card +=    "<a role='button' style = 'text-decoration: none' onclick = 'auxiliarReservation(" + datos.id + ")'><h6 class = 'card-subtitle mb-2 text-muted'>Reservaciones</h6></a>"
        card +=    "<a role='button' style = 'text-decoration: none' onclick = 'auxiliarMessage(" + datos.id + ")'><h6 class = 'card-subtitle mb-2 text-muted'>Mensajes</h6></a>"
        card +=    "<button class = 'btn btn-dark' onclick = 'auxiliarBorrar(" + datos.id + ")'>Borrar</button> &nbsp"
        card +=    "<button class = 'btn btn-dark' onclick = 'restGetId(" + datos.id + ")'>Actualizar</button>"
        card +=   `</div>
                 </div>`;
    console.log("id = " + datos.id)
    $("#div_rows_items").append(card);
    return card;
}


function actualizarCard(datos){
    $("#" + datos.id + " #div_card_body").empty();
    let nuevo =  `<h5 id = 'card_title' class = "card-title">${datos.brand}</h5>`
        nuevo += `<h6 id = 'card_subtitle2' class = "card-subtitle mb-2 text-muted">Habitaciones: ${datos.rooms}</h6>`
        nuevo += `<p id = 'card_description' class = "card-text">${datos.description}</p>`;
        nuevo += "<a role='button' style = 'text-decoration: none' onclick = 'auxiliarReservation(" + datos.id + ")'><h6 class = 'card-subtitle mb-2 text-muted'>Reservaciones</h6></a>"
        nuevo += "<a role='button' style = 'text-decoration: none' onclick = 'auxiliarMessage(" + datos.id + ")'><h6 class = 'card-subtitle mb-2 text-muted'>Mensajes</h6></a>"
        nuevo += "<button class = 'btn btn-dark' onclick = 'auxiliarBorrar(" + datos.id + ")'>Borrar</button> &nbsp"
        nuevo += "<button class = 'btn btn-dark' onclick = 'restGetId(" + datos.id + ")'>Actualizar</button>";
    $("#" + datos.id + " #div_card_body").append(nuevo);
}

function llenarDivItems(datos) {
    $("#div_rows_items").empty();
    for (i = 0; i < datos.length; i++) {
        crearCard(datos[i])
    }
}

function funcionBotonAgregar() {
    var brand = $("#field_brand").val();
    var rooms = $("#field_rooms").val();
    var category = $("#field_category").val();
    var description = $("#field_description").val();
    var name = $("#field_name").val();

    if (validarAgregar(brand, category)) {
        swal("Debe ingresar 'Marca' y 'Categoria'")
        return
    };

    let datos = {
        brand: brand,
        rooms: rooms,
        category: { "id": category },
        description: description,
        name: name
    }
    restPost(datos);
    mostrarOcultarDivAddAct();
}

function funcionBotonActualizar(id){
    var id = id;
    var brand = $("#field_brand").val();
    var rooms = $("#field_rooms").val();
    var category = $("#field_category").val();
    var description = $("#field_description").val();
    var name = $("#field_name").val();

    if (validarAgregar(brand, category)) {
        swal("Debe ingresar 'Marca' y 'Categoria'")
        return
    };

    let datos = {
        id: id,
        brand: brand,
        rooms: rooms,
        category: { "id": category },
        description: description,
        name: name
    }

    actualizarCard(datos)
    restPut(datos);
    mostrarOcultarDivAddAct()
}

function funcionBotonBorrar(datos) {
    if (datos.reservations.length != 0 || datos.messages.length != 0) {
        swal("No puede borrar una cabaña que contenga mensajes o reservaciones")
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
            restDelete(datos.id)
            swal("Eliminando!", "Eliminado!", "success");
            $("#" + datos.id).remove();
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
    var id = datos.id;
    let boton = "<button class = 'btn btn-dark' id='botonAddAct' onclick='funcionBotonActualizar(" + id + ")'> Actualizar </button>";
    mostrarOcultarDivAddAct('Actualizar',boton);
    document.getElementById('field_brand').value = datos.brand;
    document.getElementById('field_rooms').value = datos.rooms;
    document.getElementById('field_description').value = datos.description;
    document.getElementById('field_name').value = datos.name;
    if (datos.category == null) {
        document.getElementById('field_category').value = "";
    }else{
        document.getElementById('field_category').value = datos.category.id;
    }
    
}

function mostrarOcultarDivAddAct(titulo,boton){
    $("#div_agregar_titulo").empty();
    $("#botonAddAct").remove();
    $("#div_agregar_titulo").append("<h5 class = 'text-md-center m-4'>" + titulo + "</h5>");
    $("#div_botones").append(boton);
    document.getElementById('field_brand').value = "";
    document.getElementById('field_rooms').value = "";
    document.getElementById('field_category').value = "";
    document.getElementById('field_description').value = "";
    document.getElementById('field_name').value = "";
    $("#div_overlay").toggle();
    $("#botonAgregarItem").toggle();
}

function setCategories(datos){
    for (let i = 0; i < datos.length; i++) {
        $("#field_category").append(`<option value='${datos[i].id}'>${datos[i].name}</option>`);
    }
}

function validarAgregar(a, b) {
    if (a == "" || b == "" || b == null) {
        return true;
    }
    return false
}




function crearCardReservas(datos){
    let card = `<div id = detalle_${datos.idReservation} class = "card m-2" style = "width:18rem;">`
        card +=  "<div id = 'div_card_body' class = 'card-body'>"
        card +=    `<h5 class = 'card-title'>Cabaña: ${datos.client.name}</h5>`
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
        swal("Esta cabaña no tiene reservaciones")
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
        card +=    `<h6 class = "card-subtitle mb-2 text-muted">Mensaje: ${datos.messageText}</h6>`
        card +=   `</div>
                 </div>`;
    console.log("id = " + datos.idCMessage)
    $("#div_rows_items_detalle").append(card);
    return card;
}

function llenarDivDetalleMessage(datos) {
    if (datos.messages.length == 0) {
        swal("Esta cabaña no tiene mensajes")
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