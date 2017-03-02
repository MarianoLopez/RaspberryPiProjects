function httpcall(r,g,b){  
  $.get( "http://raspberrypi:8080/led", { red: r, green: g,blue:b},
    function(data ){
      console.log(data);
    }
  );
}




var colorhex = "#FF0000";
var color = "#FF0000";
var colorObj = w3color(color);
function mouseOverColor(hex) {
    document.getElementById("divpreview").style.visibility = "visible";
    document.getElementById("divpreview").style.backgroundColor = hex;
    document.body.style.cursor = "pointer";
}
function mouseOutMap() {
    if (hh == 0) {
        document.getElementById("divpreview").style.visibility = "hidden";
    } else {
      hh = 0;
    }
    document.getElementById("divpreview").style.backgroundColor = colorObj.toHexString();
    document.body.style.cursor = "";
}
var hh = 0;
function clickColor(hex, seltop, selleft, html5) {
    var c, cObj, colormap, areas, i, areacolor, cc;
    if (html5 && html5 == 5)  {
        c = document.getElementById("html5colorpicker").value;
    } else {
        if (hex == 0)  {
            c = document.getElementById("entercolor").value;
        } else {
            c = hex;
        }
    }
    cObj = w3color(c);
    colorhex = cObj.toHexString();
    if (cObj.valid) {
        clearWrongInput();
    } else {
        wrongInput();
        return;
    }
    r = cObj.red;
    g = cObj.green;
    b = cObj.blue;
    document.getElementById("colornamDIV").innerHTML = (cObj.toName() || "");
    document.getElementById("colorhexDIV").innerHTML = cObj.toHexString();
    document.getElementById("colorrgbDIV").innerHTML = cObj.toRgbString();
    document.getElementById("colorhslDIV").innerHTML = cObj.toHslString();    
    if ((!seltop || seltop == -1) && (!selleft || selleft == -1)) {
        colormap = document.getElementById("colormap");
        areas = colormap.getElementsByTagName("AREA");
        for (i = 0; i < areas.length; i++) {
            areacolor = areas[i].getAttribute("onmouseover").replace('mouseOverColor("', '');
            areacolor = areacolor.replace('")', '');
            if (areacolor.toLowerCase() == colorhex) {
                cc = areas[i].getAttribute("onclick").replace(')', '').split(",");
                seltop = Number(cc[1]);
                selleft = Number(cc[2]);
            }
        }
    }
    if ((seltop+200)>-1 && selleft>-1) {
        document.getElementById("selectedhexagon").style.top=seltop + "px";
        document.getElementById("selectedhexagon").style.left=selleft + "px";
        document.getElementById("selectedhexagon").style.visibility="visible";
  } else {
        document.getElementById("divpreview").style.backgroundColor = cObj.toHexString();
        document.getElementById("selectedhexagon").style.visibility = "hidden";
  }
    document.getElementById("selectedcolor").style.backgroundColor = cObj.toHexString();
    document.getElementById("html5colorpicker").value = cObj.toHexString();  
  changeColor();
  httpcall(r,g,b)
}
function wrongInput() {
    document.getElementById("entercolorDIV").className = "has-error";
    document.getElementById("wronginputDIV").style.display = "block";
}
function clearWrongInput() {
    document.getElementById("entercolorDIV").className = "";
    document.getElementById("wronginputDIV").style.display = "none";
}
function changeRed(value) {
    document.getElementById('valRed').innerHTML = value;
    changeAll();
}
function changeGreen(value) {
    document.getElementById('valGreen').innerHTML = value;
    changeAll();
}
function changeBlue(value) {
    document.getElementById('valBlue').innerHTML = value;
    changeAll();
}
function changeAll() {
    var r = document.getElementById('valRed').innerHTML;
    var g = document.getElementById('valGreen').innerHTML;
    var b = document.getElementById('valBlue').innerHTML;
    document.getElementById('change').style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById('changetxt').innerHTML = "rgb(" + r + ", " + g + ", " + b + ")";
    document.getElementById('changetxthex').innerHTML = w3color("rgb(" + r + "," + g + "," + b + ")").toHexString();
}

function hslLum_top() {
  var i, a, match;
  var color = document.getElementById("colorhexDIV").innerHTML;
  var hslObj = w3color(color);
  var h = hslObj.hue;
  var s = hslObj.sat;
  var l = hslObj.lightness;
  var arr = [];
  for (i = 0; i <= 20; i++) {
      arr.push(w3color("hsl(" + h + "," + s + "," + (i * 0.05) + ")"));
  }
  arr.reverse();
  a = "<h3 class='w3-center'>Lighter / Darker:</h3><table class='colorTable' style='width:100%;'>";
  match = 0;
  for (i = 0; i < arr.length; i++) {
    if (match == 0 && Math.round(l * 100) == Math.round(arr[i].lightness * 100)) {
      a += "<tr><td></td><td></td><td></td></tr>";
      a += "<tr>";
      a += "<td style='text-align:right;'><b>" + Math.round(l * 100) + "%&nbsp;</b></td>";
      a += "<td style='background-color:" + w3color(hslObj).toHexString() + "'><br><br></td>";
      a += "<td>&nbsp;<b>" + w3color(hslObj).toHexString() + "</b></td>";
      a += "</tr>";
      a += "<tr><td></td><td></td><td></td></tr>";
      match = 1;      
    } else {
      if (match == 0 && l > arr[i].lightness) {
        a += "<tr><td></td><td></td><td></td></tr>";
        a += "<tr>";
        a += "<td style='text-align:right;'><b>" + Math.round(l * 100) + "%&nbsp;</b></td>";
        a += "<td style='background-color:" + w3color(hslObj).toHexString() + "'></td>";
        a += "<td>&nbsp;<b>" + w3color(hslObj).toHexString() + "</b></td>";
        a += "</tr>";
        a += "<tr><td></td><td></td><td></td></tr>";
        match = 1;
      }
      a += "<tr>";
      a += "<td style='width:40px;text-align:right;'>" + Math.round(arr[i].lightness * 100) + "%&nbsp;</td>";
      a += "<td style='cursor:pointer;background-color:" + arr[i].toHexString() + "' onclick='clickColor(\"" + arr[i].toHexString() + "\")'></td>";
      a += "<td style='width:80px;'>&nbsp;" + arr[i].toHexString() + "</td>";
      a += "</tr>";
    }
  }
  a += "</table>";
  document.getElementById("lumtopcontainer").innerHTML = a;
}


function changeColor(value) {
  hslLum_top();  
}
window.onload = function() {
    var x = document.createElement("input");
    x.setAttribute("type", "color");
    if (x.type == "text") {
        document.getElementById("html5DIV").style.visibility = "hidden";
    }
}
function submitOnEnter(e) {
    keyboardKey = e.which || e.keyCode;
    if (keyboardKey == 13) {
        clickColor(0,-1,-1);
    }
}