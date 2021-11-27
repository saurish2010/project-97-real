var firebaseConfig = {
    apiKey: "AIzaSyBpv3d7EjZNBru2CDt9ssagUqLDU5bJT8M",
    authDomain: "lets-chat-web-app-1a10e.firebaseapp.com",
    databaseURL: "https://lets-chat-web-app-1a10e-default-rtdb.firebaseio.com",
    projectId: "lets-chat-web-app-1a10e",
    storageBucket: "lets-chat-web-app-1a10e.appspot.com",
    messagingSenderId: "997907621054",
    appId: "1:997907621054:web:ff066cfd302645d7ba6aef"
  };
  
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");
    document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;

         console.log("room_name - " +Room_names);
         row = "<div class='room_name' id="+Room_names+" onclick='RedirectToRoomName(this.id)'>#" +Room_names+ "</div><hr>";
         document.getElementById("output").innerHTML += row;

      });});}
getData();

function addRoom() {

      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose : "adding room name"
      });

      localStorage.setItem("room_name" , room_name);

      window.location = "lets_chat_page.html";

}

function RedirectToRoomName(name) {

       console.log(name);

       localStorage.setItem("room_name" , name);

       window.location = "lets_chat_page.html";

}

function logout() {

       localStorage.removeItem("user_name");
       localStorage.removeItem("room_name");
       window.location = "index.html";

}