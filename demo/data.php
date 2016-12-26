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
$sql = "SELECT * from note WHERE user_id = 1";

$result = $conn->query($sql);

$returnArr = [];
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
       $returnArr[] = $row;
    }
}

$conn->close();

return json_encode($returnArr, true);