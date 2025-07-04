<?php

header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");

if($_SERVER["REQUEST_METHOD"]=="POST") {
    $obj = json_decode($_REQUEST['q'],true);

    $hostname = "sql201.infinityfree.com";
    $username = "if0_37608552";
    $password = "R4K5V8nRMZ";
    $database = "if0_37608552_bingo";

    if($conn = mysqli_connect($hostname,$username,$password,$database)){
        $table = $obj["Table"];
        $player = $obj["Player"];
        $bingos = (int) $obj["Bingos"];

        $query = "UPDATE $table SET Bingos = $bingos WHERE Player = '$player'";

        $res = mysqli_query($conn,$query);
        echo "From server".$res;

        mysqli_close($conn);
    }
}

else if($_SERVER["REQUEST_METHOD"]=="GET") {
    $obj = json_decode($_REQUEST['q'],true);

    $hostname = "sql201.infinityfree.com";
    $username = "if0_37608552";
    $password = "R4K5V8nRMZ";
    $database = "if0_37608552_bingo";

    if($conn = mysqli_connect($hostname,$username,$password,$database)){
        $table = $obj["Table"];
        $player = $obj["Player"];

        $query = "SELECT Bingos FROM $table Where Player != '$player'";

        $res = mysqli_query($conn,$query);
        $arr = mysqli_fetch_array($res);

        echo $arr["Bingos"];


        mysqli_close($conn);
    }
}

?>