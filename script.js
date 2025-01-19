
const sendBtn = document.querySelector(".form_send");
const sendGeo = document.querySelector(".form_geo");
const echoUrl = "wss://ws.ifelse.io/";
let echoMessage;
echoMessage = new WebSocket(echoUrl);


function writeMessage (message, className){
    let pre = document.createElement("p");
    const chatContainer = document.querySelector(".form__chat")
    pre.classList.add("myMessage", className);
    pre.textContent = message;
    chatContainer.appendChild(pre);
}

sendBtn.addEventListener('click', () => {
    const myInput = document.querySelector("input");
    const messageText = myInput.value;
    if (echoMessage.readyState === WebSocket.OPEN) {
        writeMessage(messageText, 'user__message');
        echoMessage.send(messageText);
        myInput.value = '';}
})

echoMessage.onmessage = function (evt)  {  
    writeMessage(evt.data, 'server__message');
}

function writeGeo (coords, className){
    let linkGeo = document.createElement("a");
    const chatContainer = document.querySelector(".form__chat")
    linkGeo.classList.add("myMessage", className);
    linkGeo.textContent = 'Гео-локация';
    linkGeo.href = `https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}`;
    linkGeo.target = "_blank";
    chatContainer.appendChild(linkGeo);
}

sendGeo.addEventListener('click', () => {
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        writeGeo({ latitude, longitude }, 'map__message');
    }, (error) => {
        writeMessage('Невозможно определить местоположение: ' + error.message, 'error__message');
    });
}
else {
    writeMessage('Геолокация не поддерживается вашим устройством', 'error__message');
  }
});