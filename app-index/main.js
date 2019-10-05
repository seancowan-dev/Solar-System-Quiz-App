`use strict`

function serveQuiz() {
    console.log(STORE.planets[0].mercury[2].facts);
    renderCurrentFormState();
    // validateUserAnswer('jupiter', 9);
    // handleUserScore(true);
    // handleUserPosition(false);
    // renderQuestion('venus');
    // renderOptions('venus');
    // renderUserInformation(position, score);
    renderPlanetProfile();
}

function renderCurrentFormState() {
    $()
}

/*Check the user's input answer against the correct answer
    Passed 'planet' and 'id' where;
    planet is the planet name currently in the DOM
    id is the question number n of 16 currently in the DOM */
function validateUserAnswer(planet, id) {
     const position = planetToNumber(planet); // find planet position in array
     const userAnswer = $("input[name=user-answers]:checked").parent('label').text().trim(); // find what answer the user picked
     let correctAnswer = ''; // placeholder for correct answer
     for (let i=0; i <= 2; i++) { // loop through array until
        currId = STORE.planets[position][planet][i].id; // current id to look at
        if (currId === id) { // if it matches passed id
            correctAnswer = STORE.planets[position][planet][i].correct; // set correct answer
        }
     }

     if (userAnswer === correctAnswer) { // if user answer is right return true, if it is not return false
         console.log('true');
     }
     else 
        console.log('false');

}

// Increment user score and return updated string
function handleUserScore(isCorrect) {
    if (isCorrect === true) {
        STORE.scoreCorrect++;
        return `Correct: ${STORE.scoreCorrect} Incorrect: ${STORE.scoreIncorrect}`;
    }
    else if (isCorrect === false) {
        STORE.scoreIncorrect++;
        return `Correct: ${STORE.scoreCorrect} Incorrect: ${STORE.scoreIncorrect}`;
    }
    else { // Catch to make sure only boolean is being passed
        console.log('Oops it looks like you based a non-boolean value.  Pass boolean only');
    }
}

// Increment or reset user position based on value of hasRestarted, return updated string
function  handleUserPosition(hasRestarted) {
       if (hasRestarted === true) {
           STORE.questionNumber = 0;
           return `Question: ${STORE.questionNumber}/16`;
       }
       else if (hasRestarted === false) {
           STORE.questionNumber++;
           return `Question: ${STORE.questionNumber}/16`;
       }
       else { // Catch to make sure only boolean is being passed
           console.log('Oops it looks like you based a non-boolean value.  Pass boolean only');
       }
}

/* Is passed the current planet
    returns a completed DOM element containing the options for the current question*/
function renderOptions(planet) {
        const currentQuestion = STORE.questionNumber; // get current question number
        const position = planetToNumber(planet); // convert planet to array position number
        const length = STORE.planets[position][planet].length; // count length of planet array
        let options = '';
        let testId = '';
        let output = '<span class="multiple-choice js-multiple-choice" role="question choices">';
        for (let i = 0; i < length; i++) { // for each element in the planets specific array
            testId = STORE.planets[position][planet][i].id; // check the id property
            if (typeof(testId) != 'undefined') { 
                // one part of the planet array does not contain question information, catch to remove
                if (testId === currentQuestion) { // if id property is equal to currentQuestion
                options = STORE.planets[position][planet][i].options; // set question options
                }
            }
        }
        for (let i = 0; i <= 3; i++) { // loop through the options array
            output += `<label for="user-answer-${i}" class="radio-labels">
                        <input type="radio" name="user-answers" id="user-answer-${i}" class="user-answer-${i}">
                        ${options[i]}</label>`; // create the apprporiate DOM elements for that option
        }
        output += '</span>';
        $('.js-multiple-choice').replaceWith(output); //temporary
}

function renderQuestion(planet) {
        const currentQuestion = STORE.questionNumber; // get current question number
        const position = planetToNumber(planet); // convert planet to array position number
        const length = STORE.planets[position][planet].length; // count length of planet array
        let question = '';
        let testId = '';
        let output = '';
        for (let i = 0; i < length; i++) { // for each element in the planets specific array
            testId = STORE.planets[position][planet][i].id; // check the id property
            if (typeof(testId) != 'undefined') { 
                // one part of the planet array does not contain question information, catch to remove
                if (testId === currentQuestion) { // if id property is equal to currentQuestion
                question = STORE.planets[position][planet][i].question; // set question
                }
            }
        }
        output = `<section class="quiz-questions-answers js-quiz-questions-answers">${question}</section>`; // build apprporiate DOM elements
        $('.js-quiz-questions-answers').replaceWith(output); //temporary
}

// Pass completed strings from handleUserScore and handleUserPosition 
function renderUserInformation(position, score) {
    let output = `<section class="quiz-progress js-quiz-progress">
                    <span class="question-number">${position}</span>
                    <span class="question-grading">${score}</span>
                    </section>`;
    $('.js-quiz-progress').replaceWith(output);
}

function renderPlanetProfile () {
    if (STORE.questionNumber === 0) {
        let output = `<h1>Solar System Quiz</h1>
        <p>Journey through the Solar System with this short quiz and learn some cool facts along the way.</p>`;
        $('.js-quiz-intro-planet-profile').append(output);
    }
    else {
        for (let i = 0; i < STORE.planets.length; i++) {
            let planet = Object.keys(STORE.planets[i]).toString();
            /* for (let j = 0; j < STORE.planets[i][planet].length; j++) {
                console.log(STORE.planets[i][planet][j]);
            }*/
            
            console.log(planet);
            for (let j = 0; j < STORE.planets[i][planet].length; j++) {
                let id = STORE.planets[i][planet][j].id;
                if (typeof(id) != 'undefined') { 
                    if (id === STORE.questionNumber) {
                        let output = `<h1>${planet}</h1>
                        <p></p>`;
                         $('.js-quiz-intro-planet-profile').append(output);
                    }
                }
            }
        }
    }
}

// Takes a planet name as an input and returns its (array position) number
function planetToNumber(planet) {
    let planetNum = 0;
    switch (planet) {
        case 'mercury':
            planetNum = 0;
            break;
        case 'venus':
             planetNum = 1;
            break;
        case 'earth':
             planetNum = 2;
            break;
        case 'mars':
             planetNum = 3;
            break;  
        case 'jupiter':
             planetNum = 4;
            break; 
        case 'saturn':
            planetNum = 5;
            break;   
        case 'uranus':
            planetNum = 6;
            break;   
        case 'neptune':
            planetNum = 7;
            break;   
    }
    return planetNum;
}

$(serveQuiz);