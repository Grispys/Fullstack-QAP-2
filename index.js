// i looked up on stackoverflow how one would keep the details from a function call in stasis, 
// so they can be retrieved in another route. This is how I check the questions answer.
const session = require('express-session');
const express = require('express');
const { getQuestion, isCorrectAnswer, getCurrentStreak, addToBoard } = require('./utils/mathUtilities');
const { leaderboard } = require('./utils/mathUtilities');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static('public')); // To serve static files (e.g., CSS)
app.use(session({
    secret: 'test2',
    resave: false,
    saveUninitialized: true
}));

// this here is a quick function with some help from a user on stackoverflow (i love u) 
// that will make sure theQuiz is fully made before moving on the other routes.
// i kept getting a "quizAnswer undefined" error in both the website and on unit tests. now it works!
function ensureQuizInitialized(req, res, next) {
    if (!req.session.theQuiz) {
    
        return res.redirect('/quiz'); 
    }
    next();
}


app.get('/', (req, res) => {
    const currentStreak = getCurrentStreak();
    res.render('index', { currentStreak });
});

app.get('/leaderboards', (req, res) => {
    res.render('leaderboards', { leaderboard });
});

app.get('/incorrect', (req, res) => {
    res.render('incorrect');
});

app.get('/quiz', (req, res) => {
    const theQuiz = getQuestion();
    req.session.theQuiz = theQuiz; // Initialize theQuiz
    res.render('quiz', { theQuiz });
});

app.get('/correct', (req, res) => {
    const currentStreak = getCurrentStreak();
    res.render('correct', { currentStreak });
});

// Handles quiz submissions, with middleware to check quiz initialization
app.post('/quiz', ensureQuizInitialized, (req, res) => {
    const { answer } = req.body; // Get the answer from the request body
    const theQuiz = req.session.theQuiz; // Retrieve the quiz object from the session

    // Call isCorrectAnswer to validate the answer
    let result = isCorrectAnswer(answer, theQuiz);

    // Redirect based on whether the answer is correct
    if (!result.theTruth) {
        res.redirect('/incorrect'); // Redirect to incorrect page if the answer is wrong
    } else {
        res.redirect('/correct'); // Redirect to correct page if the answer is right
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});










// //Handles quiz submissions.
// app.post('/quiz', (req, res) => {
//     const { answer } = req.body;
//     const theQuiz = req.session.theQuiz;
   
//     let theTruth = isCorrectAnswer(answer, theQuiz)
//     if (theTruth.theTruth ===false){
//         res.redirect('/incorrect');
//     }else{
//         res.redirect('/correct');
//     }
    
// });