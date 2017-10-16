var username = '';
var email = '';

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  username = getCookie("username");
  if(username != "") {
    alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:","");
    if(username != "" && username != null) {
      setCookie("username", username, 30);
    }
    email = prompt("Please enter your email:","");
    if(email != "" && email != null) {
      setCookie("email", email, 30);
    }
  }
}

// Check browser support
if(typeof(Storage) !== "undefined") {
  if(localStorage.getItem("username")) {
    username = localStorage.getItem("username");
    email = localStorage.getItem("email");
    alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:","");
    if(username != "" && username != null) {
      localStorage.setItem("username", username);
    }
    email = prompt("Please enter your email:","");
    if(email != "" && email != null) {
      localStorage.setItem("email", email);
    }
  }
} else {
  checkCookie();
}
