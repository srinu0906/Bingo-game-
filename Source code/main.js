function generateCode() {
  code = Math.ceil(Math.random() * 10000);
  document.getElementById('code').value = code;
  console.log("hi");
}

function fillTable() {
  //here we are filling the numbers num into the indices genreated randomly in the range
  var num = 1, index;

  while (num <= 25) {
    index = (Math.ceil(Math.random() * 100) % 25) + 1;
    if (!tableIndex[index]) {
      document.getElementById(`${index}`).innerText = num;
      //document.getElementById(`${index}`).style.background = "white";
      tableIndex[index] = num;
      num++;
    }
  }
}

var tableIndex = new Array(26);
var markedIndex = new Array(26).fill(false);
var myNumCounter = 1, oppNumCounter = 1, myBingos = 0, oppBingos = 0;
var player = document.getElementById("player").innerText;
var gameRunning = false, myTurn = false, oppTurn = false;
var midinterval;

function main(index) {
  if (!markedIndex[index]) {
    if ((!gameRunning && !myTurn && !oppTurn) || (gameRunning && myTurn && !oppTurn)) {
      gameRunning = true;
      markNumber(index);
      checkBingo(index);
      sendMsg(tableIndex[index]);
      myNumCounter++;
      myTurn = false;
      oppTurn = true;
      midinterval = setInterval(() => {
        receiveMsg();
        checkOppBingo();
        console.log(player + " Requesting Number");
      }, 1000);
    }
  }
}

function markOpp(index) {
  if (!markedIndex[index]) {
     if (gameRunning && !myTurn && oppTurn) {
      markNumber(index);
      checkBingo(index);
      checkOppBingo();
      console.log("Oppsite's number marked");
      oppNumCounter++;
      oppTurn = false;
      myTurn = true;
    }
  }
}


function checkBingo(index) {
  console.log("Checking Bingo")
  var i;
  var rows = [ [1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25] ];
  var columns = [ [1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],[5,10,15,20,25] ];
  var diagonals = [ [1,7,13,19,25],[5,9,13,17,21] ];
  var bingos=0;

  for( i = 0; i<rows.length; i++){
    if ((rows[i].indexOf(index) > -1) && (markedIndex[rows[i][0]] && markedIndex[rows[i][1]] && markedIndex[rows[i][2]]  && markedIndex[rows[i][3]] && markedIndex[rows[i][4]]))
    {
      console.log("bingo");
      bingos++;
      break;
    }
  }

  for( i = 0; i<columns.length; i++){
    if ((columns[i].indexOf(index) > -1) && (markedIndex[columns[i][0]] && markedIndex[columns[i][1]] && markedIndex[columns[i][2]]  && markedIndex[columns[i][3]] && markedIndex[columns[i][4]]))
    {
      console.log("bingo");
      bingos++;
      break;
    }
  }
  for( i = 0; i<diagonals.length; i++){
    if ((diagonals[i].indexOf(index) > -1) && (markedIndex[diagonals[i][0]] && markedIndex[diagonals[i][1]] && markedIndex[diagonals[i][2]]  && markedIndex[diagonals[i][3]] && markedIndex[diagonals[i][4]]))
    {
      console.log("bingo");
      bingos++;
    }
  }
  
  if(bingos>0) {
    for(i=0; i<bingos;i++) {
      myBingos++;
      bingo();
    }
  }
  markBingos("p1",myBingos);
}

function bingo() {
  var xhttpr = new XMLHttpRequest();
  var msgInfo = {"Table": bingoTable,"Player":player,"Bingos":myBingos};
  msgInfo = JSON.stringify(msgInfo);
  xhttpr.onload = function () {
    console.log(this.responseText);
  }
  xhttpr.open("POST","bingo.php?q="+msgInfo,true);
  xhttpr.send();
}

function checkOppBingo() {
  var xhttpr = new XMLHttpRequest();
  var msgInfo = {"Table": bingoTable,"Player":player};
  msgInfo = JSON.stringify(msgInfo);

  console.log("Checking opp Bingo");
  xhttpr.onload = function () {
    console.log(this.responseText);
    oppBingos = Number.parseInt(this.responseText);
    markBingos("p2",oppBingos);
  }
  xhttpr.open("GET","bingo.php?q="+msgInfo,true);
  xhttpr.send();
}

function markNumber(id) {
  document.getElementById(id).classList.add("marked-box");
  markedIndex[id] = true;
  console.log("Marked Index : "+id)
}



function markBingos(id,bingos) {
  const bingoArr=['b','i','n','g','o'];
  if(bingos){
    for(let i = 0; i<bingos;i++) {
      var bid = id+'-'+bingoArr[i];
      console.log("marked-box =>",bid);
      document.getElementById(bid).classList.add("marked-bingo");
      if(i == 4){
        var msg;
        if(myBingos == 5){
          msg = "<h1>You Won</h1>";
          popUp();
        }
        else if (oppBingos == 5){
          msg = "<h1>Opponent Won</h1>";
          popUp();
        }
        else {
          msg = "<h1>Draw</h1>";
          popUp();
        }
        gameRunning = false;
        clearInterval(midinterval);
        document.getElementById("result").innerHTML = msg;
      }
    }
  }
}

function popUp(){
  const popUp = document.getElementById("pop-up");
  popUp.style.visibility = "visible";
  popUp.classList.add("pop-up-anim");

}

function sendMsg(msg) {
  console.log(player + " Sending Message: " + msg);
  var xhttpr = new XMLHttpRequest();
  var msgInfo = { "Table": tableName, "Turn": myNumCounter, "Player": player, "Msg": msg };
  xhttpr.onload = function () {
    document.getElementById("status").innerText="YOU Marked: "+msg;
    checkOppBingo();
  }
  msgInfo = JSON.stringify(msgInfo);
  xhttpr.open("POST", "db.php?q=" + msgInfo, true);
  xhttpr.send();
}

function receiveMsg() {

  var xhttpr = new XMLHttpRequest();
  var msgInfo = { "Table": tableName, "Turn": oppNumCounter, "Player": player };
  msgInfo = JSON.stringify(msgInfo);
  xhttpr.onload = function () {
    msg = this.responseText;
    
    if (msg == 0 || msg == null) {
      return false;
    }
    else {
      gameRunning = true;
      myTurn = false;
      oppTurn = true;
      document.getElementById("status").innerText="OPP Marked: " + this.responseText;
      console.log(player + " Received Message:" + this.responseText);
        markOpp(tableIndex.indexOf(Number.parseInt(this.responseText)));
        if (oppNumCounter > 1) {
          clearInterval(midinterval);
          console.log("Requesting Stopped")
        }
      return true;
    }
  }
  xhttpr.open("GET", "db.php?q=" + msgInfo, true);
  xhttpr.send();
}

function truncateTable() {

  var xhttpr = new XMLHttpRequest();
  var msgInfo = { "Table": tableName };
  xhttpr.onload = function () {
    console.clear();
    console.log("Game Restarted");
  }
  msgInfo = JSON.stringify(msgInfo);
  xhttpr.open("POST", "restart.php?q=" + msgInfo, true);
  xhttpr.send();
}

function restartGame(){
  console.log("clear()");
  console.log("cleared");
 
  const popUp = document.getElementById("pop-up");
  popUp.style.visibility = "hidden";
  popUp.classList.remove("pop-up-anim");
  document.getElementById("status").innerText="marked";

  const bingoArr=['b','i','n','g','o'];
  for(let i = 0; i<5;i++) {
    var bid = 'p1'+'-'+bingoArr[i];
    document.getElementById(bid).classList.remove("marked-bingo");
    var bid = 'p2'+'-'+bingoArr[i];
    document.getElementById(bid).classList.remove("marked-bingo");
  }
  tableIndex = new Array(26);
  markedIndex = new Array(26).fill(false);
  myNumCounter = 1, oppNumCounter = 1, myBingos = 0, oppBingos = 0;
  player = document.getElementById("player").innerText;
  gameRunning = false, myTurn = false, oppTurn = false;
  for(let i = 1; i<=25;i++) {
      document.getElementById(`${i}`).classList.remove("marked-box");
    }
    console.log("above");
  bingo();
  truncateTable();
  fillTable();
  console.log("below");
  var interval = setInterval(() => {
    receiveMsg();
    console.log(player + " Waiting for game to Start");
    if (gameRunning) {
      clearInterval(interval);
      console.log("Waiting Stopped");
    }
  }, 2000);
}

var interval = setInterval(() => {
  receiveMsg();
  console.log(player + " Waiting for game to Start");
  if (gameRunning) {
    clearInterval(interval);
    console.log("Waiting Stopped");
  }
}, 1000);