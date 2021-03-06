var apiURL = "https://games-app-siit.herokuapp.com";

function getGamesList(callbackFunction) {
    fetch(apiURL + "/games", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        return response.json();
    }).then(function(arrayOfGames) {
        callbackFunction(arrayOfGames);
    });
}


function deleteGame(gameID, callbackFunction) {
    fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    }).then(function(r) {
        return r.text();
    }).then(function(apiresponse) {
        callbackFunction(apiresponse)
    });
}


function createGameRequest(gameObject, callBackCreateGame) {
    fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: gameObject
    }).then(function(response) {
        return response.json();
    }).then(function(createdGame) {
        console.log(createdGame);
        callBackCreateGame(createdGame)
    });
};


function updateGameRequest(gameId, updateGameObj, callBackUpdateGame) {
    fetch(apiURL + `/games/${gameId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: updateGameObj
    }).then(function(response) {
        return response.json();
    }).then(function(updatedGame) {
        console.log(updatedGame);
        callBackUpdateGame(updatedGame);
    });
}