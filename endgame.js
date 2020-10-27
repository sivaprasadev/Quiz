const username = document.getElementById('username');
const saveScoreBtn  = document.getElementById('saveScoreBtn');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore');

 const Highscore = JSON.parse(localStorage.getItem("Highscores")) || [];
 const MAX_HIGH_SCORE = 5 ;
saveScoreBtn.disabled = true;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {

    saveScoreBtn.disabled = !username.value;

});



saveHighScore = (e) => {
    e.preventDefault();
    
    const score = {

        score: mostRecentScore,
        name : username.value,
    };

    Highscore.push(score);
    Highscore.sort((a, b) =>  b.score - a.score)
    Highscore.splice(5);

    localStorage.setItem("Highscores", JSON.stringify(Highscore));
    window.location.assign("/");

}