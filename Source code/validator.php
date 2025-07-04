<?php
$tablename = "b".$_POST['code'];
$bingotable = 'bingo'.$_POST["code"];
//$player2 = $_POST['name'];

$hostname = "sql201.infinityfree.com";
$username = "if0_37608552";
$password = "R4K5V8nRMZ";
    $database = "if0_37608552_bingo";
 
$conn = mysqli_connect($hostname,$username,$password,$database);
if($conn){

    $query = "SHOW TABLES LIKE '$tablename'";
    $res =  mysqli_fetch_array(mysqli_query($conn,$query),MYSQLI_BOTH);
    if($res){

        $html = file_get_contents("game.html");
        $html = str_replace(["{tablename}","{0}","{bingotable}","{p1}","{p2}"],[$tablename,"2",$bingotable,"YOU","OPP"],$html);
        echo $html;
    }
    else{
        $html = file_get_contents("validator.html");
        echo $html;
    }

} 

else{
    echo"Cannot connect to the database";
}

mysqli_close($conn);
?>