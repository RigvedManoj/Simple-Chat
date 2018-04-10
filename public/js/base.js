
var socket = io();
var name="";
//Function that gets username from input.
//Function also creates textarea,send button and ul elements.
//makes innerHTML of div empty.
function run() {
  name = document.getElementById("name").value;
  if (name != "") {
    socket.emit("join", name);
    document.getElementById("demo").innerHTML = "";
    var ul = document.createElement("ul");
    ul.id="messages";
    document.getElementById("main").appendChild(ul);
    var input=document.createElement("textarea");
    input.autofocus=true;
    input.id="textarea";
    var button=document.createElement("button");
    button.id="b";
    button.innerHTML="send";
    button.onclick=submit;
    document.getElementById("main").appendChild(input);
    document.getElementById("main").appendChild(button);
  }
}
//Function gets input in textarea.
//adds name of user to the chat message.
//socket emits message to server.
function submit(){
  value = document.getElementById("textarea").value;
  document.getElementById("textarea").value="";
  socket.emit('chat message',name+": "+value);
}
//Function gets message from socket.
//creates a span,li and br element.
//if msg contains name of user, display message as red and to the right.
//appends span and br to li and li to ul.
socket.on('chat message', function(msg){
  var span=document.createElement("span");
  var li=document.createElement("li");
  var br=document.createElement("br");
  span.innerHTML=msg;
  var l=msg.split(":");
  if(l[0]===name)
  {
    span.style.cssFloat="right";
    span.style.background="red";
  }
  else
  span.style.cssFloat="left";
  li.appendChild(span);
  li.appendChild(br);
  var ul=document.getElementById("messages");
  ul.appendChild(li);
});