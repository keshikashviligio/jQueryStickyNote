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
$width = $_POST['width'];
$height = $_POST['height'];
$x = $_POST['x'];
$y = $_POST['y'];
$text = $_POST['text'];
$title = $_POST['title'];
$theme = $_POST['theme'];
$user = 1;

$sql = "UPDATE note SET width='".$width."', height='".$height."', x='".$x."', y='".$y."', title='".$title."', text= '".$text."', theme= '".$theme."', user_id='".$user."' WHERE id=$id";

//echo $sql;
$result = $conn->query($sql);

$returnArr = [
    'success' => $result,
    'id' => $id,
];

$conn->close();

echo json_encode($returnArr, true);