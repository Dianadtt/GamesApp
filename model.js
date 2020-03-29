var apiURL = "https://games-world.herokuapp.com";

fetch(apiURL + "/games", {
    method: "GET",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
}).then(function(response) {
    return response.json();
}).then(function(arrayOfGames) {
    // console.log("the respons " + arrayOfGames);

    var container1 = document.querySelector(".container")

    //     for (let i = 0; i < arrayOfGames.length; i++) {
    //         // console.log(arrayOfGames[i]);
    //         const h1 = document.createElement("h1")
    //         const p = document.createElement("p")
    //         const img = document.createElement("img")

    //         h1.innerHTML = arrayOfGames[i].title;
    //         p.innerHTML = arrayOfGames[i].description;
    //         img.setAttribute("src", arrayOfGames[i].imageUrl);

    //         container.appendChild(h1)
    //         container.appendChild(img)
    //         container.appendChild(p)
    //             // arrayOfGames[i].title
    //             // arrayOfGames[i].description
    //             // arrayOfGames[i].imageUrl
    //     }
    // });

    //optimizare
    let gameElements = ""
    for (let i = 0; i < arrayOfGames.length; i++) {
        // gameElements += "<h1>" + arrayOfGames[i].title + "</h1>" +
        //     "<img src='" + arrayOfGames[i].imageUrl + "' />" +
        //     "<p>" + arrayOfGames[i].description + "</p>" +
        //     "<button class= 'delete-btn' id ='" +
        //     " onClick= \"deleteGame('" + arrayOfGames[i]._id + "')\">Delete</button>'";

        gameElements += `<h1>${arrayOfGames[i].title}</h1> 
                        <img src="${arrayOfGames[i].imageUrl}" />
                         <p>${arrayOfGames[i].description}</p> 
                        <button class="delete-btn" onclick="deleteGame('${arrayOfGames[i]._id}')">Delete</button>`;

    }
    container1.innerHTML = gameElements;

});

function deleteGame(gameID) {
    //console.log("delete the game ", gameID)
    fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"

    }).then(function(r) {
        return r.text();

    }).then(function(apiresponse) {
        console.log(apiresponse)
        location.reload(true)
    });
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

        const requestParams = {
            title: gameTitle.value,
            releaseDate: gameRelease.value,
            gender: gameGender.value,
            publisher: gamePublisher.value,
            imageUrl: gameImageUrl.value,
            description: gameDescription.value
        };
        createGameRequest(requestParams)
    }
});

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

function createGameRequest(gameObject) {
    fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(gameObject)
    })
}