const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
    test("Tests that getQuestion generates an `x (math sign) y` question", () =>{
        const question = getQuestion().quizQuestion;
        const correctFormat = /^\d+(\s*[\+\-\*/]\s*\d+)$/;
        expect(typeof question).toBe('string');
        expect(question).not.toBe('');
        expect(question).toMatch(correctFormat);
    });
});

describe("Tests for isCorrectAnswer", () => {
    test("Tests that an incorrect answer is detected", () =>{
        const quiz = getQuestion();
        const givenAnswer = quiz.quizAnswer - 1 //simulates incorrectedness
        const isCorrect = isCorrectAnswer(givenAnswer, quiz).theTruth

        expect(isCorrect).toBe(false);
    });

    test("Tests that a correct answer is detected", () =>{
        const quiz = getQuestion();
        const givenAnswer = quiz.quizAnswer //simulates incorrectedness
        const isCorrect = isCorrectAnswer(givenAnswer, quiz).theTruth

        expect(isCorrect).toBe(true);
    })
});