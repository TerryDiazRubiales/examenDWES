let d = document;

function eliminarProductos(evento) {
    const cod = evento.cod.value;
    const unidades = evento.unidades.value;
    
    // recojo cod y unidades y se lo meto a params para que luego lo envie a json que quiero
     let params = "cod="+cod+"&unidades="+unidades;
    
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // al darle al boton eliminar recoge los datos y los manda
            cargarCesta();
            
           }
        };
        xhttp.open("POST", "eliminar_json.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(params);
}

 function cargarCesta() {
     let productos;
     let mostrar = d.getElementById('productos');
     
     var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            let p = d.createElement("p");
            
            if (Objet.values()<=0) {
                p.textContent = "Cesta Vacia";
            } else {
               
               let tablaCesta = crearTablaCesta(productos);
               mostrar.appendChild(tablaCesta);
            }
           let cesta = JSON.parse(xhttp.responseText);
            
           }
        };
        xhttp.open("GET", "cesta_json.php", true);
        xhttp.send();
 }
 
 function crearTablaCesta(productos) {
     Object.entries(productos);
     
    let tabla = d.createElement("table");
    let cabecera =  ["Código", "Descripción", "Precio", "Unidades", "Eliminar"];
    
    let filaCabecera = crear_fila(cabecera, 'th');
    
    tabla.appendChild(filaCabecera);
    
    for (clave in productos) {
        let filaProducto = crear_fila(productos[clave], 'td');
        let codigo = productos[clave].cod;
        let formulario = crearFormulario('Eliminar',codigo, 'eliminarProductos');
        filaProducto.insertAdjacentHTML("afterend", formulario);
        
        tabla.appendChild(filaProducto);
    }
    
    return tabla;
     
 }
 
 function obtenerPrecioTotal() {
     
 }

function crear_fila(campos, tipo) {
    var fila = document.createElement("tr");
    for (var i = 0; i < campos.length; i++) {
        var celda = document.createElement(tipo);
        celda.innerHTML = campos[i];
        fila.appendChild(celda);
    }
    return fila;
}

function crearFormulario(texto, cod, funcion) {
    var formu = document.createElement("form");
    var unidades = document.createElement("input");
    unidades.value = 1;
    unidades.name = "unidades";
    var codigo = document.createElement("input");
    codigo.value = cod;
    codigo.type = "hidden";
    codigo.name = "cod";
    var bsubmit = document.createElement("input");
    bsubmit.type = "submit";
    bsubmit.value = texto;
    bsubmit.id = "borrar";
    formu.setAttribute("onsubmit", funcion + '(this); return false;');
    formu.appendChild(unidades);
    formu.appendChild(codigo);
    formu.appendChild(bsubmit);
    return formu;
}