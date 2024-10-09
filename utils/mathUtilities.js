/**
 * Gets a random multiplication, division, subtraction or addition question
 * 
 * @returns {} The randomly generated math question
 */
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
function isCorrectAnswer(question, answer) {
    return false;
}

module.exports = {
    getQuestion,
    isCorrectAnswer
}