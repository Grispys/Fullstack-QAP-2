// i looked up on stackoverflow how one would keep the details from a function call in stasis, so they can be retrieved in another route. This is how i check the questions answer.
const session = require('express-session')
const express = require('express');
const { getQuestion, isCorrectAnswer, getCurrentStreak} = require('./utils/mathUtilities');
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



//Some routes required for full functionality are missing here. Only get routes should be required
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/leaderboards', (req, res) => {
    res.render('leaderboards');
});

app.get('/incorrect', (req, res) =>{
    res.render('incorrect');
});

app.get('/quiz', (req, res) => {
    const theQuiz = getQuestion();
    req.session.theQuiz = theQuiz;
    res.render('quiz',{theQuiz:theQuiz});
});

app.get('/correct', (req, res) =>{
    const currentStreak = getCurrentStreak();
    res.render('correct', {currentStreak});
});



//Handles quiz submissions.
app.post('/quiz', (req, res) => {
    const { answer } = req.body;
    const theQuiz = req.session.theQuiz;
   
    let theTruth = isCorrectAnswer(answer, theQuiz)
    if (theTruth.theTruth ===false){
        res.redirect('/incorrect');
    }else{
        res.redirect('/correct');
    }
    
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});