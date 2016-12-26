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
$width = $_POST['width'];
$height = $_POST['height'];
$x = $_POST['x'];
$y = $_POST['y'];
$text = $_POST['text'];
$title = $_POST['title'];
$theme = $_POST['theme'];
$user = 1;

$sql = "INSERT INTO note (width, height, x, y, title, text, theme, user_id) VALUES ()";

$result = $conn->query($sql);

$returnArr = [
    'success' => (bool)$result,
];

$conn->close();

return json_encode($returnArr, true);