<?php
if($_SERVER["REQUEST_METHOD"]=="POST") {
    insertValues(json_decode($_REQUEST['q'],true));
}
else if($_SERVER["REQUEST_METHOD"]=="GET") {
    retriveValues(json_decode($_REQUEST['q'],true));
}

function insertValues($obj) {
    $hostname = "sql201.infinityfree.com";
    $username = "if0_37608552";
    $password = "R4K5V8nRMZ";
    $database = "if0_37608552_bingo";

    if($conn = mysqli_connect($hostname,$username,$password,$database))
    {
        $table = $obj["Table"];
        $turn = $obj["Turn"];
        $player = $obj["Player"];
        //echo "<script>console.log(post)</script>";
        $msg = $obj["Msg"];

        $query = "INSERT INTO $table VALUES ( $turn, '$player','$msg')";
        $res = mysqli_query($conn,$query);

        echo $res?1:0;
    }
    else{
        echo "Error in connecting to Database";
    }

    mysqli_close($conn);
}

function retriveValues($obj) {
    $hostname = "sql201.infinityfree.com";
    $username = "if0_37608552";
    $password = "R4K5V8nRMZ";
    $database = "if0_37608552_bingo";

    if($conn = mysqli_connect($hostname,$username,$password,$database))
    {
        $table = $obj["Table"];
        $turn = $obj["Turn"];
        $player = $obj["Player"];

        $query = "SELECT Msg FROM $table WHERE Turn = $turn and Player != '$player'";
        //echo "<script>console.log(get)</script>";
        $res = mysqli_query($conn,$query);
        $arr = mysqli_fetch_assoc($res);
        $msg = "";
        if(($arr)&&($arr["Msg"] == "bingo")){
            while($arr) {

                $arr = mysqli_fetch_assoc($res);
            }

        }
            echo $arr?$arr["Msg"]:0;
    }
    else{
        echo "Error in connecting to Database";
    }
    mysqli_close($conn);
}
?>