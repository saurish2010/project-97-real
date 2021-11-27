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
  room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;

    console.log(firebase_message_id);
    console.log(message_data);
   
    name = message_data['name'];
    message = message_data['message'];
    like = message_data['like'];
    name_with_tag = "<h3>" +name+ "<img class='user_tick' src='tick.png'> </h3>";
    message_with_tag = "<h4 class='message'>" +message+ "</h4>";
    like_buttton = "<button class='btn btn-success' id="+firebase_message_id+" onclick='updateLike(this.id)' value="+like+">";
    span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " +like+ "</span></button><hr>";

    row = name_with_tag + message_with_tag + like_buttton +span_with_tag;
    document.getElementById("output").innerHTML += row;

 } });  }); }
getData();

function send()
{

       msg = document.getElementById("msg").value;

       firebase.database().ref("/").child(room_name).push({
             name : user_name,
             message : msg,
             like : 0
       });

       document.getElementById("msg").value = "";

}

function updateLike(message_id)
{

       console.log("clicked on the like button" +message_id);
       button_id = message_id;
       likes = document.getElementById(button_id).value;
       updatedlikes = Number(likes) + 1;
       console.log(updatedlikes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updatedlikes
      });      

}

function logout()
{

  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";

}