const question  = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choice-text'))
let currentQuestion = {}
let score = 0
let questionCounter = 0
let acceptAnswers = false
let avalibaleQuestions = []
let progressText = document.getElementById('progressText')
let scoreText = document.getElementById('score')
let progressBarMeasure = document.getElementById('progressBarMeasure')

let questions = [];
fetch("https://opentdb.com/api.php?amount=15&category=9&difficulty=easy&type=multiple").then(res =>{
    
    return res.json()
}).then(loadedQuestions =>{
    
    questions = loadedQuestions.results.map(loadedQuestion =>{
    let questionList = {
        question: loadedQuestion.question
     }
     
     
     questionList.answerIndex = Math.floor(Math.random() *3) +1
    //  console.log(questionList.answerIndex);
     let answerChoices = [...loadedQuestion.incorrect_answers]
      
     let theAnswer = loadedQuestion.correct_answer
    //  console.log(theAnswer);
     answerChoices.splice(questionList.answerIndex-1, 0, theAnswer)
     answerChoices.forEach( (choice, index) =>{
         questionList["choice" + (index +1)] =choice
     })
     return questionList
   })

   startGame()
    
})
 


let answerPoints = 5
let max_questions = 10

function  startGame() {
    score = 0;
    questionCounter = 0
    avalibaleQuestions = [...questions]
    getQuestion()
    
}


getQuestion = () =>{

    if (avalibaleQuestions.length ===0 || questionCounter >= max_questions) {
        localStorage.setItem('mostRecentScore', score)
        //it will direct to the end page

        return window.location.assign('end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter}/ ${max_questions}`
    progressBarMeasure.style.width = `${questionCounter/max_questions *100}%`

    let questionIndex = Math.floor(Math.random()* avalibaleQuestions.length)
    currentQuestion = avalibaleQuestions[questionIndex]
    question.innerText = currentQuestion.question
    choices.forEach(choice =>{
         let num = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + num]
        
    })

    avalibaleQuestions.splice(questionIndex, 1)
     acceptAnswers = true

}


choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptAnswers) return

        acceptAnswers = false

        const selectedChoice = e.target
        const selectedAnswer = parseInt(selectedChoice.dataset['number'])
        console.log( selectedAnswer);
        console.log(currentQuestion.answerIndex);
        
    
        let answerClass= selectedAnswer == currentQuestion.answerIndex ? 'correct' : 'incorrect'
         selectedChoice.parentElement.classList.add(answerClass)

         setTimeout(() => {
            selectedChoice.parentElement.classList.remove(answerClass)
            
            if (selectedAnswer == currentQuestion.answerIndex) {
                incrementScore(answerPoints)
                
            }
            getQuestion()
            
          
         }, 500);
        
        
    })
})

incrementScore = num =>{
    score += num
    scoreText.innerText = score
}




