function addMessage(data) {
    let messageStatus = data.status;
    let messageText = data.text;

    createMessageElement(messageStatus, messageText);

    setInterval(function() {
        clearMessages()
    }, 5000)
}

function createMessageElement(status, text) {
    let msg = `<div class='${status}'><span>${text}</span></div>`
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = msg;

    document.querySelector('.messages').appendChild(tempDiv.firstElementChild)
}

function clearMessages() {
    document.querySelector('.messages').innerHTML = '';
}