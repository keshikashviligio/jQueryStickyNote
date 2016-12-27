<?php
/**
 * Created by PhpStorm.
 * User: koco
 * Date: 12/26/2016
 * Time: 6:45 PM
 */
$conn = new mysqli('localhost', 'root', '', 'jqstickynote');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$id = $_POST['id'];
$user = 1;

$sql = "DELETE FROM note WHERE id=$id";

//echo $sql;
$result = $conn->query($sql);

$returnArr = [
    'success' => $result,
    'id' => $id,
];

$conn->close();

echo json_encode($returnArr, true);