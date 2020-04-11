//var container1 = document.querySelector(".container")
getGamesList(function(arrayOfGames) {
    for (let i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i])
    };
});

function createDomElement(gameObj) {
    var container1 = document.querySelector(".container")
    const gameElement = document.createElement("div")
    gameElement.innerHTML += `<h1>${gameObj.title}</h1> 
                        <img src="${gameObj.imageUrl}" />
                         <p>${gameObj.description}</p> 
                        <button class="delete-btn" id="${gameObj._id}">Delete Game</button>;
                        <button class="update-btn" id="${gameObj._id}">Edit Game</button>`;

    container1.appendChild(gameElement);
    //---------------------------------------------
    gameElement.setAttribute("id", gameObj._id)
    document.getElementById(`${gameObj._id}`).addEventListener("click", function(event) {
        console.log(event.target)
        if (event.target.classList.contains('delete-btn')) {
            document.getElementById(`${gameObj._id}`).addEventListener("click", function(event) {
                // console.log(event.target);
                deleteGame(event.target.getAttribute("id"), function(apiResponse) {
                    console.log(apiResponse)
                    removeDeletedElementFromDOM(event.target.parentElement);
                })
            })
        } else if (event.target.classList.contains('update-btn')) {
            document.getElementById(`${gameObj._id}`).addEventListener("click", function(event) {
                updateGameRequest(event.target.getAttribute("id"), function(updatedGame) {
                    console.log(updatedGame)
                    updateGameInDOM(event.target.parentElement)
                })
            })
        }
    })

    ///---------------------cod clasa---------------------
    // document.getElementById(`${gameObj._id}`).addEventListener("click", function(event) {
    //     deleteGame(event.target.getAttribute("id"), function(apiResponse) {
    //         console.log(apiResponse)
    //         removeDeletedElementFromDOM(event.target.parentElement);
    //     });
    // })

    // });
    //-------------------cod clasa-----------------------------------

    // //----------------cod eu--------------------------------------------
    // document.getElementById(`${gameObj._id}`).addEventListener("click", function(event) {
    //     updateGame(event.target.getAttribute("id"), function(updatedGame) {
    //         console.log(updatedGame)
    //         updateGameInDOM(event.target.parentElement)
    //     })
    // });
    //-----------------------------------


    function removeDeletedElementFromDOM(domElement) {
        domElement.remove()
    }

    //----------------cod eu ---------------------------
    function updateGameInDOM() {
        const form = document.getElementById("updateForm")

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

}