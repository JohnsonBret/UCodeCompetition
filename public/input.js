function changeLocation(event)
{
    var clickedLocation = event.target.parentElement.getAttribute("id");

    var location = document.getElementById("displayLocation");
    location.value = event.target.getAttribute("value");
    location.innerHTML = event.target.innerHTML;
}

function changeVote(event)
{
    var clickedVote = event.target.parentElement.getAttribute("id");

    var vote = document.getElementById("displayVote");
    vote.value = event.target.getAttribute("value");
    vote.innerHTML = event.target.innerHTML;
}

function changeLevel(event)
{
    var clickedLevel = event.target.parentElement.getAttribute("id");

    var level = document.getElementById("competitionLevel");
    level.value = event.target.getAttribute("value");
    level.innerHTML = event.target.innerHTML;
}

const postRegistration = async ()=>{



    var name = document.getElementById("studentName").value;
    var email = document.getElementById("studentEmail").value;
    var tier = document.getElementById("competitionLevel").value;
    var location = document.getElementById("displayLocation").value;
    var vote = document.getElementById("displayVote").value;

    console.log(`Post Registration Name ${name} Email ${email} Location ${location} vote${vote}`);

    const rawResponse = await fetch('/register', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, name: name, tier: tier, location: location, vote: vote})
    });
        const content = await rawResponse.json()
        //const content = await rawResponse;
    
    
    if(rawResponse.status == 200)
    {
        console.log(`Status 200`);
        showRegistrationMessage(`Congratulations! ${name} you are now registered for the competition!`);
    }
    else
    {
        console.log(content.errorMsg)
        showRegistrationMessage("Did you add all the required fields? Did you already sign up?");
    }

}

const showRegistrationMessage = (message) =>{
    var msgP = document.getElementById("registrationMsg");
    msgP.style = "visibility: visible;";
    msgP.innerHTML = message;
    setTimeout(() => {
        msgP.style = "visibility: hidden;";
    }, 5000);
}


window.onload = function(){
    console.log("loaded")
    let submitButton = document.getElementById("joinBtn");

    submitButton.addEventListener("click", postRegistration);
}



