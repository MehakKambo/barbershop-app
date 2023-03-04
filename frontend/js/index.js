//flip the card
function flipCard(id) {
    var card = document.getElementById(id);
    card.classList.toggle("clicked");
}

//message for the feedback
function messageReceived() {
    let name = document.getElementById("name").value;
    alert(name + ", thank you for reaching out! Your message has been received," + 
            " we will get back to you within 24hrs.")
}

// set the min date to today's for booking appointment
const today = new Date().toISOString().split("T")[0]
const date = document.getElementById("dateP")
date.setAttribute('min', today)

// don't allow a weekend selection for date
date.addEventListener('input', function(e) {
    var day = new Date(this.value).getUTCDay();
    if([6,0].includes(day)) {
        e.preventDefault()
        this.value = ''
        alert('Sorry, we are closed on weekends. Select any weekday!')
    }
})

