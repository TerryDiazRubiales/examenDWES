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
     
     var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            
           let cesta = JSON.parse(xhttp.responseText);
            mostrarCesta(cesta);
           }
        };
        xhttp.open("GET", "cesta_json.php", true);
        xhttp.send();
 }
 
 const mostrarCesta = (cesta) => {
    /* let mostrar = d.getElementById('productos'); */

    let $divCesta = d.getElementById('productos');
    let $div = $divCesta.querySelector('table');
    
    /* remover la tabla que ya hay dentro de div productos */
    if ($div) {
        $div.remove();
    }
    /* remover el p que hay con el precio dentro de div productos */
    let $p = $divCesta.querySelector('p')
    if($p){
        $p.remove();
    }

    if (Object.keys(cesta).length <= 0) {
        $p = d.createElement('p');
        $p.textContent = "Cesta Vacía";
        $divCesta.insertAdjacentElement('beforeend',$p);
        
    } else {
        let tablaCesta = crearTablaCesta(cesta);
        $divCesta.insertAdjacentElement('beforeend',tablaCesta);
    }

 }

 function crearTablaCesta(productos) {
    let tabla = d.createElement("table");
    let cabecera =  ["Código", "Descripción", "Precio", "Unidades", "Eliminar"];
    
    let filaCabecera = crear_fila(cabecera, 'th');
    
    tabla.appendChild(filaCabecera);
    
    for (clave in productos) {
        let filaProducto = crear_fila(clave, 'td');
        let codigo = clave.cod;
        let formulario = crearFormulario('Eliminar',codigo, 'eliminarProductos');
        let tdForm = createElement("td");
        tdForm.appendChild(formulario);
        filaProducto.insertAdjacentHTML("afterend", tdForm);
        
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