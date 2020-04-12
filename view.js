//var container1 = document.querySelector(".container")
getGamesList(function(arrayOfGames) {
    for (let i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i])
    };
});

function createDomElement(gameObj) {
    var container1 = document.querySelector(".container")
    const gameElement = document.createElement("div")
    gameElement.innerHTML = `<h1>${gameObj.title}</h1> 
                        <img src="${gameObj.imageUrl}" />
                         <p>${gameObj.description}</p> 
                        <button class="delete-btn" game-id="${gameObj._id}">Delete Game</button>
                        <button class="update-btn" game-id="${gameObj._id}">Edit Game</button>`;
    gameElement.setAttribute('id', gameObj._id);
    container1.appendChild(gameElement);
    gameElement.getElementsByClassName('delete-btn')[0].addEventListener("click", function(event) {
        deleteGame(event.target.getAttribute("game-id"), function(apiResponse) {
            removeDeletedElementFromDOM(event.target.parentElement);
        });
    });
    gameElement.getElementsByClassName('update-btn')[0].addEventListener("click", function(event) {
        showUpdateFormInDOM(event.target.parentElement, gameObj);
    });
}

function updateDomElement(gameObj) {
    const gameElement = document.getElementById(gameObj._id);
    gameElement.innerHTML = `<h1>${gameObj.title}</h1> 
                        <img src="${gameObj.imageUrl}" />
                         <p>${gameObj.description}</p> 
                        <button class="delete-btn" game-id="${gameObj._id}">Delete Game</button>
                        <button class="update-btn" game-id="${gameObj._id}">Edit Game</button>`;
    gameElement.getElementsByClassName('delete-btn')[0].addEventListener("click", function(event) {
        deleteGame(event.target.getAttribute("game-id"), function(apiResponse) {
            removeDeletedElementFromDOM(event.target.parentElement);
        });
    });
    gameElement.getElementsByClassName('update-btn')[0].addEventListener("click", function(event) {
        showUpdateFormInDOM(event.target.parentElement, gameObj);
    });
}

function removeDeletedElementFromDOM(domElement) {
    domElement.remove()
}

//----------------cod eu ---------------------------
function showUpdateFormInDOM(domElement, gameObj) {
    const form = document.getElementById("updateForm");
    const gameTitleElement = form.querySelector('input[name=gameTitle]');
    const gameDescriptionElement = form.querySelector('textarea[name=gameDescription]');
    const gameImageUrlElement = form.querySelector('input[name=gameImageUrl]');

    gameTitleElement.value = gameObj.title;
    gameDescriptionElement.value = gameObj.description;
    gameImageUrlElement.value = gameObj.imageUrl;
    domElement.appendChild(form);

    form.querySelector('button[id=saveGameBtn]').addEventListener('click', function(e) {
        e.preventDefault();
        var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitleElement.value)
        urlencoded.append("releaseDate", gameObj.releaseDate)
        urlencoded.append("gender", gameObj.gender)
        urlencoded.append("publisher", gameObj.publisher)
        urlencoded.append("imageUrl", gameImageUrlElement.value)
        urlencoded.append("description", gameDescriptionElement.value);
        updateGameRequest(gameObj._id, urlencoded, function(updatedGame) {
            if (updatedGame !== undefined) {
                updatedGame._id = gameObj._id;
                updateDomElement(updatedGame);
            }
            document.getElementById('formContainer').appendChild(form);
        });
    });
    form.querySelector('button[id=cancelUpdateGameBtn]').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('formContainer').appendChild(form);
    });
}


//----------------cod eu -----------------------------
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

        createGameRequest(urlencoded, createDomElement);
    }
})