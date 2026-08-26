let player1Id = null;
let player2Id = null;

function searchPlayer(playerNumber) {
  let searchText = document.getElementById("search" + playerNumber).value;

  fetch("http://127.0.0.1:8000/search?player=" + searchText)
    .then(response => response.json())
    .then(data => {
      let resultsDiv = document.getElementById("results" + playerNumber);
      resultsDiv.innerHTML = "";

      data.response.forEach(item => {
        let player = item.player;
        let div = document.createElement("div");
        div.className = "result-item";
        div.textContent = player.name + " (" + player.nationality + ")";
        div.onclick = function() {
          savePlayer(playerNumber, player.id, player.name);
        };
        resultsDiv.appendChild(div);
      });
    });
}

function savePlayer(playerNumber, id, name) {
  if (playerNumber === 1) {
    player1Id = id;
  } else {
    player2Id = id;
  }

  document.getElementById("saved" + playerNumber).textContent = "Saved: " + name;
  document.getElementById("results" + playerNumber).innerHTML = "";
}

function compareStats() {
  if (player1Id === null || player2Id === null) {
    alert("Please search and save both players first.");
    return;
  }

  Promise.all([
    fetch("http://127.0.0.1:8000/stats?player_id=" + player1Id).then(res => res.json()),
    fetch("http://127.0.0.1:8000/stats?player_id=" + player2Id).then(res => res.json())
  ]).then(results => {
    let p1 = results[0].response[0];
    let p2 = results[1].response[0];

    let p1Stats = p1.statistics[0];
    let p2Stats = p2.statistics[0];

    let html = `
      <table border="1" cellpadding="10">
        <tr><th></th><th>${p1.player.name}</th><th>${p2.player.name}</th></tr>
        <tr><td>Club</td><td>${p1Stats.team.name}</td><td>${p2Stats.team.name}</td></tr>
        <tr><td>Goals</td><td>${p1Stats.goals.total}</td><td>${p2Stats.goals.total}</td></tr>
        <tr><td>Assists</td><td>${p1Stats.goals.assists}</td><td>${p2Stats.goals.assists}</td></tr>
        <tr><td>Appearances</td><td>${p1Stats.games.appearences}</td><td>${p2Stats.games.appearences}</td></tr>
      </table>
    `;

    document.getElementById("comparison-output").innerHTML = html;
  });
}