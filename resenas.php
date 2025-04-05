<?php
// Configurar cabecera para devolver JSON
header('Content-Type: application/json');

// Conectar a la base de datos
$conn = new mysqli('127.0.0.1', 'root', '', 'test');

// Verificar la conexión
if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión: " . $conn->connect_error]);
    exit;
}

// Verificar el tipo de solicitud (GET o POST)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Solicitud GET para obtener reseñas

    // Consulta para obtener las reseñas
    $sql = "SELECT Nombre, Comentario, Valoracion FROM resenas";
    $result = $conn->query($sql);

    $resenas = []; // Crear un array vacío para almacenar las reseñas

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $resenas[] = $row; // Agregar cada fila al array
        }
    }

    // Devolver el JSON con las reseñas
    echo json_encode($resenas);
    exit;
}

// Si la solicitud es POST, procesamos el envío de una nueva reseña
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos enviados desde el frontend (en formato JSON)
    $data = json_decode(file_get_contents("php://input"), true);

    // Obtener los datos del formulario
    $nombre = $data['nombre'];
    $comentario = $data['comentario'];
    $valoracion = $data['valoracion'];

    // Validar que los datos no estén vacíos
    if (empty($nombre) || empty($comentario) || empty($valoracion)) {
        echo json_encode(["error" => "Todos los campos son requeridos."]);
        exit;
    }

    // Insertar los datos en la base de datos
    $sql = "INSERT INTO resenas (Nombre, Comentario, Valoracion) VALUES ('$nombre', '$comentario', '$valoracion')";

    if ($conn->query($sql) === TRUE) {
        // Si la inserción fue exitosa, devolver un JSON con éxito
        echo json_encode(['success' => true]);
    } else {
        // Si hubo un error, devolver un JSON con el error
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
    exit;
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
