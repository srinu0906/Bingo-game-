<?php

$obj = json_decode($_REQUEST['q'],true);
$hostname = "sql201.infinityfree.com";
$username = "if0_37608552";
$password = "R4K5V8nRMZ";
$database = "if0_37608552_bingo";

if($conn = mysqli_connect($hostname,$username,$password,$database)) {
    $table = $obj["Table"];
    $query = "TRUNCATE $table";
    $res = mysqli_query($conn,$query);
    echo $res?1:0;
}
else {
    echo "Error in connecting to Database";
}
mysqli_close($conn);

?>