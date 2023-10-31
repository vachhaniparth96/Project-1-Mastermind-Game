// constants
const colors = ['red', 'blue', 'yellow', 'green', 'black', 'white'];
const accColors = ['black', 'white', 'chocolate'];
// state variables
let code = [];
let guess =[];
let guessAcc = [];
let guessDock = [];
let guessAttempt = 1; //will increase to maximum of 6 to allow for looping of the base functionality
let codeCracked = false;

// cached elements
//start button
const startButtonEl = document.querySelector('#start');

//color buttons
const redButtonEl = document.querySelector('#red');
const blueButtonEl = document.querySelector('#blue');
const yellowButtonEl = document.querySelector('#yellow');
const greenButtonEl = document.querySelector('#green');
const blackButtonEl = document.querySelector('#black');
const whiteButtonEl = document.querySelector('#white');


//popup buttons and elements
const popup = document.querySelector('#popup');
const instructions = document.querySelector('.instructions-popup');
const quitButtonEl = document.querySelector('#quit');
const playAgainButtonEl = document.querySelector('#play-again');
const instructionsButtonEl = document.querySelector('#instructions');
const closeButtonEl = document.querySelector('#close');


// event listeners
redButtonEl.addEventListener('click', handleClick);
blueButtonEl.addEventListener('click', handleClick);
yellowButtonEl.addEventListener('click', handleClick);
greenButtonEl.addEventListener('click', handleClick);
blackButtonEl.addEventListener('click', handleClick);
whiteButtonEl.addEventListener('click', handleClick);
quitButtonEl.addEventListener('click', () => {
    popup.close();
});
startButtonEl.addEventListener('click', startGame)
playAgainButtonEl.addEventListener('click', () => {
    popup.close();
    init();
});
instructionsButtonEl.addEventListener('click', () => {
    instructions.showModal();
});
closeButtonEl.addEventListener('click',() => {
    instructions.close();
});

// functions
function generateCode() { //generates the code to be guessed by the player
    for(let i=0;i<4;i++) {
        let codeSequence = Math.floor(Math.random()*colors.length);
        code.push(codeSequence);
    }
}

generateCode();

function gamePinColor(pinNumber, index, id) { //function to change colors of guess pins based off the guess
    if(colors[index]==='red') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor = "red";
    } else if(colors[index]=== 'blue') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor = "blue";
    } else if(colors[index]=== 'yellow') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor = "yellow";
    } else if(colors[index]=== 'green') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor = "green";
    } else if(colors[index]=== 'black') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor = "black";
    } else if(colors[index]=== 'white') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor = "white";
    }
}

function dockPinColor(pinNumber, index, id) { //function to change colors of the dock to allow the user to track their guess before they input the sequence
    if(colors[index]==='red') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor = "red";
    } else if(colors[index]=== 'blue') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor = "blue";
    } else if(colors[index]=== 'yellow') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor = "yellow";
    } else if(colors[index]=== 'green') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor = "green";
    } else if(colors[index]=== 'black') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor = "black";
    } else if(colors[index]=== 'white') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor = "white";
    }
    if(guessDock.length === 4) {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor = 'gray';
    }
}

function accPinColor(pinNumber, index, id) { //function to change the colors of the accuracy pins based off the submitted guess
    if(accColors[index] === 'black') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor ='black';
    } else if(accColors[index]==='white') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor = 'white';
    } else if(accColors[index]==='chocolate') {
        document.querySelector(`${id} div:nth-child(${pinNumber})`).style.backgroundColor ='chocolate';
    }
}

function handleClick(e) {
    if(guess.length<4) { //pushes colorindex values into the guess array and the guessDock array as the user selects them
        guess.push(colors.indexOf(e.target.id));
        guessDock.push(colors.indexOf(e.target.id));
        guessDock.forEach((el,i) =>{
            dockPinColor(i+1,el,'#guess-dock');
    }) 
    check();
    }
}

function checkAccuracy(guess, code) { //Function to determine how accurate the user input is to the generated code
    for(let i=0;i<guess.length;i++) {
        if(guess[i]===code[i]) {
            guessAcc.push(accColors.indexOf('black'));
        } else if(code.includes(guess[i])) {
            guessAcc.push(accColors.indexOf('white'));
        } 
        if(guess[i]!==code[i] && code.includes(guess[i])===false) {
            guessAcc.push(accColors.indexOf('chocolate'));
        }
    }
    guessAcc.sort();
}

function check() { //Checks for a valid guess length before generating the user input and accuracy of the guess onto the game board
    if(guess.length === 4) {
        guess.forEach((el,i)=> {
            gamePinColor(i+1,el,'#guess'+guessAttempt); //Generates user input in appropriate guess slot on game board
            guessDock = [];
        })
    checkAccuracy(guess,code);
    guessAcc.forEach((el,i) => {
        accPinColor(i+1,el,'#accuracy'+guessAttempt); //Generates accuracy results in appropriate slot on game board
    })
    checkForWin();
    guessAttempt++; //increments the attempts to reflect the 'round' the user is on
    }
}

function checkForWin() {
    if(guess.toString() === code.toString()) { //Checks to see if input sequence matches the generated sequence for the winning condition
        let p = document.createElement('p');
        p.innerText = 'Congratulations! You have cracked the code!'; //Adds winning condition message to the modal
        popup.insertBefore(p, playAgainButtonEl);
        popup.showModal(); //Displays winning condition modal
        codeCracked = true;
        code.forEach((el,i) => { //Displays the secret code in the answer box.
            gamePinColor(i+1, el, '#answer');
        });
    } else {
        if(guessAttempt === 6) { //Checks to see if all maximum guess attempts have been used for the losing condition
            let p = document.createElement('p');
            p.innerText = 'You have failed to crack the code.'; //Adds losing condition message to the modal
            popup.insertBefore(p, playAgainButtonEl);
            popup.showModal(); //Displays losing condition modal
            code.forEach((el,i) => { //Displays the secret code in the answer box.
                gamePinColor(i+1, el, '#answer');
            })
            
        } else {
            guess = [];
            guessAcc=[];
        }
    }
    return codeCracked;
}

function init() {
    code = [];
    guess = [];
    guessAcc = [];
    round = 1;
    location.reload();
}

function startGame(e) {
    e.preventDefault();
}