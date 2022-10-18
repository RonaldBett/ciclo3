function restGet() {
    $.ajax({
        url: "http://129.146.210.200:8080/api/Message/all",
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
        url: "http://129.146.210.200:8080/api/Message/" + id,
        type: "GET",
        datatype: "json",
        success: function (respuesta) {
            if(opt == "cli"){
                llenarDivDetalleClient(respuesta)
            }else if(opt == "cab"){
                llenarDivDetalleCabin(respuesta)
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
        url: "http://129.146.210.200:8080/api/Message/save",
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
        url: "http://129.146.210.200:8080/api/Message/update",
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
        url: "http://129.146.210.200:8080/api/Message/" + id,
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
    let card = `<div id = ${datos.idMessage} class = "card m-2" style = "width:18rem;">`
        card +=  "<div id = 'div_card_body' class = 'card-body'>"
        card +=    "<a role='button' style = 'text-decoration: none' onclick = 'auxiliarClient(" + datos.idMessage + ")'><h5 id = 'card_title' class = 'card-title'>Cliente: "+ datos.client.name +"</h5></a>"
        card +=    `<h6 id = 'card_subtitle' class = "card-subtitle mb-2 text-muted">Mensaje: ${datos.messageText}</h6>`
        card +=    "<a role='button' style = 'text-decoration: none' onclick = 'auxiliarCabin(" + datos.idMessage + ")'><h6 class = 'card-subtitle mb-2 text-muted'>Cabaña</h6></a>"
        card +=    "<button class = 'btn btn-dark' onclick = 'funcionBotonBorrar(" + datos.idMessage + ")'>Borrar</button> &nbsp"
        card +=   `</div>
                 </div>`;
    console.log("id = " + datos.idMessage)
    $("#div_rows_items").append(card);
    return card;
}

function llenarDivItems(datos) {
    $("#div_rows_items").empty();
    for (i = 0; i < datos.length; i++) {
        crearCard(datos[i])
    }
}


function funcionBotonBorrar(id) {
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
            restDelete(id)
            swal("Eliminando!", "Eliminado!", "success");
            $("#" + id).remove();
            break;
        }
      });
}



function crearCardClient(datos){
    let card = `<div id = detalle_${datos.idClient} class = "card m-2" style = "width:18rem;">`
        card +=  "<div id = 'div_card_body' class = 'card-body'>"
        card +=    `<h5 class = 'card-title'>Nombre: ${datos.name}</h5>`
        card +=    `<h6 class = "card-subtitle mb-2 text-muted">Email: ${datos.email}</h6>`
        card +=    `<h6 class = "card-subtitle mb-2 text-muted">Password: ${datos.password}</h6>`
        card +=   `</div>
                 </div>`;
    console.log("id = " + datos.idClient)
    $("#div_rows_items_detalle").append(card);
    return card;
}

function llenarDivDetalleClient(datos) {
    $("#div_rows_items_detalle").empty();
    crearCardClient(datos.client);
    $("#div_titulo_popup2").append("<h2 id = 'titulo_detalle'>Cliente</h2>")
    $("#div_overlay_2").toggle();
}

function auxiliarClient(id){
    restGetId(id,"cli")
}

function ocultarDivDetalle(){
    $("#titulo_detalle").remove()
    $("#div_overlay_2").toggle();
}



function crearCardCabin(datos){
    let card = `<div id = detalle_${datos.id} class = "card m-2" style = "width:18rem;">`
        card +=  "<div id = 'div_card_body' class = 'card-body'>"
        card +=    `<h5 class = 'card-title'>Marca: ${datos.brand}</h5>`
        card +=    `<h6 class = "card-subtitle mb-2 text-muted">Categoría: ${datos.category.name}</h6>`
        card +=   `</div>
                 </div>`;
    console.log("id = " + datos.id)
    $("#div_rows_items_detalle").append(card);
    return card;
}

function llenarDivDetalleCabin(datos) {
    $("#div_rows_items_detalle").empty();
    crearCardCabin(datos.cabin);
    $("#div_titulo_popup2").append("<h2 id = 'titulo_detalle'>Cabaña</h2>")
    $("#div_overlay_2").toggle();
}
function auxiliarCabin(id){
    restGetId(id,"cab")
}