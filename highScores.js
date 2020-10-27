const highScoreList = document.getElementById("highScoreList");
const Highscores = JSON.parse(localStorage.getItem('Highscores')) || [];

highScoreList.innerHTML =
Highscores.map(score =>{
    
return `<li class="high-score">${score.name}-${score.score}</li>`

}).join();
