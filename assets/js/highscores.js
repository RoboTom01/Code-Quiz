let highscores = document.getElementById("highscores");

function retrieveScores() {
    let storedUsers = JSON.parse(localStorage.getItem("highscores"));
    console.log(storedUsers);
    for (let i = 0; i < storedUsers.length; i++) {
      let scoresDiv = document.createElement("div");
      scoresDiv.innerHTML = 
        "User: " + storedUsers[i].user + " Score: " + storedUsers[i].userScoreFinal + "%";
        scoresDiv.style.fontSize = "25px";
        highscores.append(scoresDiv);
    }
  }
  
retrieveScores();