window.onload = function (){
const list  = document.getElementById('list')
const scores = JSON.parse(localStorage.getItem('highScores')) ||[]
 
console.log(scores);

scores.map(item =>{
  return list.innerHTML += `<li>Name : ${item.name} , Score: ${item.score}</li>`
}) 

// scoresList.forEach(element => {
//       list.innerHTML = element
// });




 

 
}

// scores.map(item =>{
    
// })