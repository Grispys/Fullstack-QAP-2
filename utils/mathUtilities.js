/**
 * Gets a random multiplication, division, subtraction or addition question
 * 
 * @returns {} The randomly generated math question
 */

let currentStreak = 0;

// leaderboard will be an array that can only have 10 numbers in it (use slice) it will be sorted greatest to least, and if addToBoard tries to add a number that is < the lowest
// score on the board, it will not be added.
let leaderboard = [];


function addToBoard(currentStreak){
    // time variable has to be INSIDE function to create the correct time whenevr function called
    let time = new Date().toLocaleString();
    let scoreToAdd = {
        currentStreak: currentStreak,
        time: time
    };

    if (leaderboard.length < 10) {
        // leaderboard has less than 10 items just add the new score directly
        leaderboard.push(scoreToAdd);
    } else {
        let lowestStreak = Math.min(...leaderboard.map(entry => entry.currentStreak));
        //if new score higher than lowest on leaderboard repolace that one
        if (currentStreak > lowestStreak) {
            let lowestIndex = leaderboard.findIndex(entry => entry.currentStreak === lowestStreak);
            leaderboard[lowestIndex] = scoreToAdd;
        } else {
            console.log("Score too low to put on the leaderboard");
        }
    }
    
    // sort so that the highest number is at the top of the leaderbaord
    leaderboard.sort((a, b) => b.currentStreak - a.currentStreak);
    
    // keep only the top 10 entries by slicing away the lowest
    leaderboard.splice(10); 

    console.log(leaderboard);
}


function getCurrentStreak() {
    return currentStreak;
  }

function getQuestion() {
    let x = Math.floor(Math.random() * 100) +1
    let y = Math.floor(Math.random() * 100 ) +1
    let sign = ["+","-","*","/"]
    let chosenSign = sign[Math.floor(Math.random() *sign.length)];
    let question = `${x} ${chosenSign} ${y}`
    let questionAnswer
    switch(chosenSign) {
        case'+':
            questionAnswer = x + y;
            break
        case'-':
            questionAnswer = x - y;
            break
        case'/':
            questionAnswer = x / y;
            break
        case'*':
            questionAnswer = x * y;
            break

    }
    return {
       quizQuestion: question, quizAnswer: questionAnswer
    }
}

/**
 * Parses the provided question and gets whether or not the provided answer is correct
 * 
 * @param {*} question The question being answered
 * @param {*} answer The potential answer
 * @returns {boolean} True if the answer was correct, false otherwise.
 */
function isCorrectAnswer(answer, theQuiz) {
    if (answer != theQuiz.quizAnswer) {
        console.log(`WRONG. CORRECT ANSWER IS ${theQuiz.quizAnswer}`);
        addToBoard(currentStreak);
        currentStreak = 0;
        console.log(currentStreak)
        return { theTruth: false, currentStreak: currentStreak }
        
    } else {
        console.log(`CORRECT. THE ANSWER IS ${answer}`);
        currentStreak += 1;
        addToBoard(currentStreak)
        console.log(currentStreak)
        return { theTruth: true, currentStreak: currentStreak }; // Correct answer
    }
}
    

module.exports = {
    getQuestion,
    isCorrectAnswer,
    getCurrentStreak,
    leaderboard,
    addToBoard
}