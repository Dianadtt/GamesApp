var apiURL = "https://games-app-siit.herokuapp.com";

async function getGamesList() {
    const response = await fetch(apiURL + "/games");
    return response.json();
}

async function deleteGame(gameID) {
    const response = await fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    })
    return response.text();
}

async function createGameRequest(gameObject) {
    const response = await fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: gameObject
    });
    return response.json();
};

async function updateGameRequest(gameId, updateGameObj) {
    const response = await fetch(apiURL + `/games/${gameId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: updateGameObj
    })
    return response.json()
}