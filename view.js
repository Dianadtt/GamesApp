var container1 = document.querySelector(".container")

getGamesList(function(arrayOfGames) {
    for (let i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i])

        document.getElementsById(`${arrayOfGames[i]._id}`).addEventListener("click", function(event) {

            deleteGame(event.target.getAttribute("id"), function(apiResponse) {
                console.log(apiResponse)
                removeDeleteElementFromDOM(event.target.parentElement)
            });
        });
    };
});

function createDomElement(gameObj) {
    var container1 = document.querySelector(".container")
    const gameElement = document.createElement("div")
    gameElement.innerHTML += `<h1>${arrayOfGames[i].title}</h1> 
                        <img src="${arrayOfGames[i].imageUrl}" />
                         <p>${arrayOfGames[i].description}</p> 
                        <button class="delete-btn" id="${arrayOfGames[i]._id}">Delete</button>`;

}

function removeDeleteElementFromDOM(domElement) {
    domElement.remove()
}

function validateFormElement(inputElement, errorMessage) {
    if (inputElement.value === "") {
        if (!document.querySelector('[rel="' + inputElement.id + '"]')) {
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if (document.querySelector('[rel="' + inputElement.id + '"]')) {
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
}

function validateReleaseTimestampElement(inputElement, errorMessage) {
    if (isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
}

function buildErrorMessage(inputEl, errosMsg) {
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
}
document.querySelector(".submitBtn").addEventListener("click", function(event) {
    event.preventDefault();

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGender = document.getElementById("gameGender");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validateFormElement(gameTitle, "the title is required!")
    validateFormElement(gameGender, "the gender is required!")
    validateFormElement(gameImageUrl, "the image URL is required!")
    validateFormElement(gameRelease, "the release date is required!")

    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");


    if (gameTitle.value !== "" && gameGender.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitle.value)
        urlencoded.append("releaseDate", gameRelease.value)
        urlencoded.append("gender", gameGender.value)
        urlencoded.append("publisher", gamePublisher.value)
        urlencoded.append("imageUrl", gameImageUrl.value)
        urlencoded.append("description", gameDescription.value)
        console.log("the ", urlencoded)
            //http://www.google.com/some/path/to/place/on/server?cheie1=valoare1&cheie2=valoare2   
            // const json = {
            //     title: gameTitle.value,
            //     releaseDate: gameRelease.value,
            //     gender: gameGender.value,
            //     publisher: gamePublisher.value,
            //     imageUrl: gameImageUrl.value,
            //     description: gameDescription.value
            // };
        createGameRequest(urlencoded, function(newlyCreatedGame) {

        })
    }
});