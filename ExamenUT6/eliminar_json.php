<?php
require_once 'include/CestaCompra.php';
require_once 'include/sesiones.php';

comprobar_sesion();
$cesta = CestaCompra::carga_cesta();

if (isset($_POST['cod']) && isset($_POST['unidades'])) {
    $codigo_producto=$_POST['cod'];
    $unidades = $POST['unidades'];
    $cesta->elimina_unidades($_POST['cod'], $_POST['unidades']);
    $cesta->guarda_cesta();
}


 ?>
