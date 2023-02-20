function flipCard(id) {
    var card = document.getElementById(id);
    card.classList.toggle("clicked");
}

function messageReceived() {
    let name = document.getElementById("name").value;
    alert(name + ", thank you for reaching out! Your message has been received," + 
            " we will get back to you within 24hrs.")
}