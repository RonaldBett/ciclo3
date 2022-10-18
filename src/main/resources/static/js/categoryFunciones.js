function restGet() {
    $.ajax({
        url: "http://129.146.210.200:8080/api/Category/all",
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

function restGetId(id) {
    let categoria;
    $.ajax({
        async: false,
        url: "http://129.146.210.200:8080/api/Category/" + id,
        type: "GET",
        datatype: "json",
        success: function (respuesta) {            
            categoria = respuesta;   
        },
        error: function (xhr, status) {
            console.log("Error en el metodo restGetId()");
        }
    });
    return categoria
}

function restPost(datos) {
    let datospeticion = JSON.stringify(datos);
    $.ajax({
        url: "http://129.146.210.200:8080/api/Category/save",
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
        url: "http://129.146.210.200:8080/api/Category/update",
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
        url: "http://129.146.210.200:8080/api/Category/" + id,
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
    let card = `<div id = ${datos.id} class = "card m-2" style = "width:18rem;">`
        card +=  "<div id = 'div_card_body' class = 'card-body'>"
        card +=    `<h5 id = 'card_title' class = "card-title">${datos.name}</h5>`
        card +=    "<a role='button' style = 'text-decoration: none' onclick = 'llenarDivDetalle(" + datos.id + ")'><h6 class = 'card-subtitle mb-2 text-muted'>Cabañas</h6></a>"
        card +=    `<h6 class = "card-subtitle mb-2 text-muted">Id: ${datos.id}</h6>`
        card +=    `<p id = 'card_description' class = "card-text">${datos.description}</p>`;
        card +=    "<button class = 'btn btn-dark' onclick = 'funcionBotonBorrar(" + datos.id + ")'>Borrar</button> &nbsp"
        card +=    "<button class = 'btn btn-dark' onclick = 'mostrarDivAct(" + datos.id + ")'>Actualizar</button>"
        card +=   `</div>
                 </div>`;
                 console.log("id = " + datos.id)
    $("#div_rows_items").append(card);
    return card;
}

function actualizarCard(datos){
    $("#" + datos.id + " #div_card_body").empty();
    let nuevo =  `<h5 id = 'card_title' class = "card-title">${datos.name}</h5>`
        nuevo += "<a role='button' style = 'text-decoration: none' onclick = 'llenarDivDetalle(" + datos.id + ")'><h6 class = 'card-subtitle mb-2 text-muted'>Cabañas</h6></a>";
        nuevo += `<h6 class = "card-subtitle mb-2 text-muted">Id: ${datos.id}</h6>`
        nuevo += `<p id = 'card_description' class = "card-text">${datos.description}</p>`;
        nuevo += "<button class = 'btn btn-dark' onclick = 'funcionBotonBorrar(" + datos.id + ")'>Borrar</button> &nbsp"
        nuevo += "<button class = 'btn btn-dark' onclick = 'mostrarDivAct(" + datos.id + ")'>Actualizar</button>";
    $("#" + datos.id + " #div_card_body").append(nuevo);
}

function llenarDivItems(datos) {
    $("#div_rows_items").empty();
    for (i = 0; i < datos.length; i++) {
        crearCard(datos[i])
    }
}

function funcionBotonAgregar() {
    var name = $("#field_name").val();
    var description = $("#field_description").val();

    if (validarAgregar(name, description)) {
        swal("Debe ingresar 'Nombre' y 'Descripción'")
        return
    };

    let datos = {
        name: name,
        description: description,
    }
    restPost(datos);
    mostrarOcultarDivAddAct()
}

function funcionBotonActualizar(id){
    var id = id;
    var name = $("#field_name").val();
    var description = $("#field_description").val();
    

    if (validarAgregar(name, description)) {
        swal("Debe ingresar 'Nombre' y 'Descripción'")
        return
    };

    let datos = {
        id: id,
        name: name,
        description: description  
    }

    actualizarCard(datos)
    restPut(datos);
    mostrarOcultarDivAddAct()
}

function funcionBotonBorrar(id) {
    let datos = restGetId(id);
    if (datos.cabins.length != 0) {
        swal("No puede borrar una categoria que contenga cabañas")
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
            restDelete(id)
            swal("Eliminando!", "Eliminado!", "success");
            $("#" + id).remove();
            break;
        }
      });
}

function mostrarDivAdd(){
    let boton = "<button class = 'btn btn-dark' id='botonAddAct' onclick='funcionBotonAgregar()'> Agregar </button>";
    mostrarOcultarDivAddAct('Agregar',boton);
}

function mostrarDivAct(id){
    let boton = "<button class = 'btn btn-dark' id='botonAddAct' onclick='funcionBotonActualizar(" + id + ")'> Actualizar </button>";
    mostrarOcultarDivAddAct('Actualizar',boton);
    document.getElementById('field_name').value = $("#" + id + " #card_title").html();
    document.getElementById('field_description').value = $("#" + id + " #card_description").html();    
}

function mostrarOcultarDivAddAct(titulo,boton){
    $("#div_agregar_titulo").empty();
    $("#botonAddAct").remove();
    $("#div_agregar_titulo").append("<h5 class = 'text-md-center m-4'>" + titulo + "</h5>");
    $("#div_botones").append(boton);
    document.getElementById('field_name').value = "";
    document.getElementById('field_description').value = "";
    $("#div_overlay").toggle();
}

function validarAgregar(a, b) {
    if (a == "" || b == "" || b == null) {
        return true;
    }
    return false
}



function crearCardDetalle(datos){
    let card = `<div id = detalle_${datos.id} class = "card m-2" style = "width:18rem;">`
        card +=  "<div id = 'div_card_body' class = 'card-body'>"
        card +=    `<h5 class = 'card-title'>${datos.brand}</h5>`
        card +=    `<h6 class = "card-subtitle mb-2 text-muted">Habitaciones: ${datos.id}</h6>`
        card +=    `<p class = "card-text">${datos.description}</p>`;
        card +=   `</div>
                 </div>`;
    console.log("id = " + datos.id)
    $("#div_rows_items_detalle").append(card);
    return card;
}

function llenarDivDetalle(id) {
    let datos = restGetId(id);
    if (datos.cabins.length == 0) {
        swal("Esta categoría no tiene cabañas")
        return
    }
    $("#div_rows_items_detalle").empty();
    for (i = 0; i < datos.cabins.length; i++) {
        crearCardDetalle(datos.cabins[i]);
    }
    $("#div_overlay_2").toggle();
}

function ocultarDivDetalle(){
    $("#div_overlay_2").toggle();
}

