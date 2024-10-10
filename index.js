// i looked up on stackoverflow how one would keep the details from a function call in stasis, so they can be retrieved in another route. This is how i check the questions answer.
const session = require('express-session')
const express = require('express');
const { getQuestion } = require('./utils/mathUtilities');
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

app.get('/quiz', (req, res) => {
    const theQuiz = getQuestion();
    req.session.theQuiz = theQuiz;
    res.render('quiz',{theQuiz:theQuiz});
});

//Handles quiz submissions.
app.post('/quiz', (req, res) => {
    const { answer } = req.body;
    const theQuiz = req.session.theQuiz;
    if(answer != theQuiz.quizAnswer){
        console.log(`WRONG. CORRECT ANSWER IS ${theQuiz.quizAnswer}`);
    }else{
        console.log(`CORRECT. THE ANSWER IS ${answer}`);
    }
    

    //answer will contain the value the user entered on the quiz page
    //Logic must be added here to check if the answer is correct, then track the streak and redirect properly
    //By default we'll just redirect to the homepage again.
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});