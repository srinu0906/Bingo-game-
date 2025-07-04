function borderBulb() {
    const height = window.innerHeight;
    const width = window.innerWidth;
    var h_bulbs;
    if (width > 700){
        h_bulbs = 14;
    }
    else{
        h_bulbs = Math.ceil(width / 50);
    }
    
    const v_bulbs = Math.floor(height / 100);

    document.getElementById('top').innerHTML = "";
    document.getElementById('bottom').innerHTML = ""
    for (i = 0; i < h_bulbs; i++) {
        document.getElementById('top').innerHTML += "<span></span>";
        document.getElementById('bottom').innerHTML += "<span></span>";
    }

    document.getElementById('left').innerHTML = "";
    document.getElementById('right').innerHTML = "";
    for (i = 0; i < v_bulbs; i++) {
        document.getElementById('left').innerHTML += "<span></span>";
        document.getElementById('right').innerHTML += "<span></span>";
    }
}