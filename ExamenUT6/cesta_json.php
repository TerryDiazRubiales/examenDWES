<?php
require_once 'include/CestaCompra.php';
require_once 'include/sesiones.php';

comprobar_sesion();
$cesta = CestaCompra::carga_cesta();
$productos = $cesta->get_productos();

echo json_encode($productos);


 ?>
