function main(choice) {
  const buttons_area = document.getElementById("buttons-area");
  if (choice=='create') {
    buttons_area.innerHTML="<h3>Your pair code</h3><br><input class='code-box' type='text' value='12345' disabled><h3> Send this code to other player</h3><button id='start' class='buttons'>Start Game</button>";
  }
  else if(choice=='enter')
  {
    buttons_area.innerHTML="<h3>Enter pair code</h3><input type='text' class='code-box'><br><button id='start' class='buttons'>Start Game</button>";
  }
}