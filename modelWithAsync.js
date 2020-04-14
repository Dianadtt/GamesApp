var apiURL = "https://games-world.herokuapp.com";

async function getGamesList() {
    const response = await fetch('https://games-world.herokuapp.com/games');
    return response.json();
}
// getGamesList()
//     .then(arrayOfGames => {
//         const games = arrayOfGames.map(arrayOfGames => arrayOfGames.title).join("\n");
//         console.log(arrayOfGames)
//         console.log(games)
//     })
//     .catch(reason => console.log("the error is: ", reason.message))


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