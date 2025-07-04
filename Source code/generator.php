<?php
$tablename = 'b'.$_POST["code"];
$bingotable = 'bingo'.$_POST["code"];
//$player1 = $_POST["name"];

$hostname = "sql201.infinityfree.com";
$username = "if0_37608552";
$password = "R4K5V8nRMZ";
$database = "if0_37608552_bingo";

$conn = mysqli_connect($hostname,$username,$password,$database);

if($conn){
    

    $query = "CREATE TABLE IF NOT EXISTS $tablename (Turn INT, Player VARCHAR(20) , Msg VARCHAR(7))";

    $res = mysqli_query($conn,$query);
    

    $query = "CREATE TABLE IF NOT EXISTS $bingotable (Player VARCHAR(20) , Bingos int)";

    mysqli_query($conn,$query);

    $query = "INSERT into $bingotable Values( 'Player1',0),( 'Player2',0)";

    mysqli_query($conn,$query);

    $html = file_get_contents("game.html");
    $html = str_replace(["{tablename}","{0}","{bingotable}","{p1}","{p2}"],[$tablename,"1",$bingotable,"YOU","OPP"],$html);
    echo $html;
    
}

mysqli_close($conn);
?>