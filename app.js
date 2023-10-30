console.log('js: loaded')

// constants
const colors = ['red', 'blue', 'yellow', 'green', 'black', 'white']
const accColors = ['black', 'white', 'chocolate']
// state variables
let code = [];
let guess =[];
let guessAcc = [];
let round = 1; //will increase to maximum of 6 to allow for looping of the base functionality
let codeCracked = false;
// cached elements
//start button
startButtonEl = document.querySelector('#start')
//color buttons
redButtonEl = document.querySelector('#red')
blueButtonEl = document.querySelector('#blue')
yellowButtonEl = document.querySelector('#yellow')
greenButtonEl = document.querySelector('#green')
blackButtonEl = document.querySelector('#black')
whiteButtonEl = document.querySelector('#white')

// event listeners
redButtonEl.addEventListener('click', handleClick)
blueButtonEl.addEventListener('click', handleClick)
yellowButtonEl.addEventListener('click', handleClick)
greenButtonEl.addEventListener('click', handleClick)
blackButtonEl.addEventListener('click', handleClick)
whiteButtonEl.addEventListener('click', handleClick)

// functions
function generateCode() { //generates the code to be guessed by the player
    for(let i=0;i<4;i++) {
        let codeSequence = Math.floor(Math.random()*colors.length)
        code.push(codeSequence);
    }
}

function gamePinColor(pin, colorIndex, id) { //function to change color of pin
    let gamePin = document.querySelector(`${id} div:nth-child(${pin})`);
    if(colors[colorIndex]==='red') {
        gamePin.style.backgroundColor = "red";
    } else if(colors[colorIndex]=== 'blue') {
        gamePin.style.backgroundColor = "blue";
    } else if(colors[colorIndex]=== 'yellow') {
        gamePin.style.backgroundColor = "yellow";
    } else if(colors[colorIndex]=== 'green') {
        gamePin.style.backgroundColor = "green";
    } else if(colors[colorIndex]=== 'black') {
        gamePin.style.backgroundColor = "black";
    } else if(colors[colorIndex]=== 'white') {
        gamePin.style.backgroundColor = "white";
    }
    // console.log(gamePin)
}

function accPinColor(pin, colorIndex, id) {
    let accPin = document.querySelector(`${id} div:nth-child(${pin})`);
    if(accColors[colorIndex] === 'black') {
        accPin.style.backgroundColor ='black';
    } else if(accColors[colorIndex]==='white') {
        accPin.style.backgroundColor = 'white';
    } else if(accColors[colorIndex]==='chocolate') {
        accPin.style.backgroundColor ='chocolate';
    }
    // console.log(accPin);
    // console.log(accColors[colorIndex]);
}

function handleClick(e) {
    if(guess.length<4) {
        guess.push(colors.indexOf(e.target.id))
    } 
    // console.log(e.target)
    // console.log(guess)
    render();
}

function getGuess() {
    
}
function render() {
    console.log(guess)
        check()
        // console.log(code)
        // console.log(guessAcc)
    }


function checkAccuracy(guess, code) {
    for(let i=0;i<guess.length;i++) {
        if(guess[i]===code[i]) {
            guessAcc.push(accColors.indexOf('black'))
        } else if(code.includes(guess[i])) {
            guessAcc.push(accColors.indexOf('white'))
        } 
        if(guess[i]!==code[i] && code.includes(guess[i])===false) {
            guessAcc.push(accColors.indexOf('chocolate'))
        }
    }
    guessAcc.sort();
    // console.log(guessAcc)
}

generateCode()
// console.log(code)

code.forEach((el,i) => { //displays the secret code in the answer box. Will move to an if statement so that it only displays in winning or losing conditions.
    gamePinColor(i+1, el, '#answer');
})

function check() {
    if(guess.length === 4) {
        guess.forEach((el,i)=> {
            gamePinColor(i+1,el,'#guess'+round)
        })
    checkAccuracy(guess,code);
    guessAcc.forEach((el,i) => {
        accPinColor(i+1,el,'#accuracy'+round)
    })

    checkForWin()
    console.log(guess)
    console.log(codeCracked)
    round++;
}
console.log(round)
}

function checkForWin() {
    guess.forEach(function(el,i) {
        if(el == code[i]) {
            console.log(el, code[i])
            console.log('Congratulations! You have cracked the code!')
            codeCracked = true;
        } else if (round === 6) {
            console.log('You have failed to crack the code')
        }
        codeCracked = false;
    })
    guess = [];
    guessAcc=[];
    return codeCracked;
}