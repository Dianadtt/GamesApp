var apiURL = "https://games-world.herokuapp.com";

function getGamesList() {
    return fetch('https://games-world.herokuapp.com/games')
        .then((response) => {
            return response.json();
        })
}

function deleteGame(gameID) {
    return fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    }).then((response) => {
        return response.text();
    })

}

function createGameRequest(gameObject) {
    return fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: gameObject
    }).then((response) => {
        return response.json();
    });
}

function updateGameRequest(gameId, updateGameObj) {
    return fetch(apiURL + `/games/${gameId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: updateGameObj
    }).then((response) => {
        return response.json()
    })
}