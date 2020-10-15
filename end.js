const userName = document.getElementById('username')
const saveBtn = document.getElementById('saveScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const finalScore = document.getElementById('finalScore')
finalScore.innerText = 'Your score:' + mostRecentScore

const highScores = JSON.parse(localStorage.getItem("highScores")) || []


userName.addEventListener('keyup', () =>{
    saveBtn.disabled = !userName.value
    
})


submitScore = e =>{
  e.preventDefault()
  let scores = {
    name: userName.value,
    score: mostRecentScore
  }
  highScores.push(scores)
  highScores.sort((a,b) => b.score -a.score)
  highScores.splice(5)
  localStorage.setItem('highScores', JSON.stringify(highScores))
  setTimeout(() => {
    window.location.assign('/')
  }, 500);
}

