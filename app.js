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
const startButtonEl = document.querySelector('#start')
//color buttons
const redButtonEl = document.querySelector('#red')
const blueButtonEl = document.querySelector('#blue')
const yellowButtonEl = document.querySelector('#yellow')
const greenButtonEl = document.querySelector('#green')
const blackButtonEl = document.querySelector('#black')
const whiteButtonEl = document.querySelector('#white')
const popup = document.querySelector('#popup')
const instructions = document.querySelector('.instructions-popup')

//win/lose
// winEl = document.querySelector('#win')
// loseEl = document.querySelector('#lose')
quitButtonEl = document.querySelector('#quit')
playAgainButtonEl = document.querySelector('#play-again')
instructionsButtonEl = document.querySelector('#instructions')
closeButtonEl = document.querySelector('#close')

// event listeners
redButtonEl.addEventListener('click', handleClick)
blueButtonEl.addEventListener('click', handleClick)
yellowButtonEl.addEventListener('click', handleClick)
greenButtonEl.addEventListener('click', handleClick)
blackButtonEl.addEventListener('click', handleClick)
whiteButtonEl.addEventListener('click', handleClick)
quitButtonEl.addEventListener('click', () => {
    popup.close();
})
startButtonEl.addEventListener('click', startGame)
playAgainButtonEl.addEventListener('click', () => {
    popup.close();
    init();
})
instructionsButtonEl.addEventListener('click', () => {
    instructions.showModal();
})
closeButtonEl.addEventListener('click',() => {
    instructions.close();
})

// functions
// console.log(playAgainButtonEl)
// console.log(quitButtonEl)
// console.log(startButtonEl)
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
    // console.log(e.target.id)
    // console.log(quitButtonEl)
    // console.dir(quitButtonEl)
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
    // console.log(guess)
    // console.log(codeCracked)
    round++;
}
// console.log(round)
}

function checkForWin(){
    if(guess.toString() === code.toString()) {
        // winEl.style.visibility = 'visible';
        // popup.innerText='Congratulations! You have cracked the code!'
        let p = document.createElement('p')
        p.innerText = 'Congratulations! You have cracked the code!'
        popup.insertBefore(p, playAgainButtonEl)
        popup.showModal();
        codeCracked = true;
        code.forEach((el,i) => { //displays the secret code in the answer box. Will move to an if statement so that it only displays in winning or losing conditions.
            gamePinColor(i+1, el, '#answer');
        })
    } else {
        if(round === 6) {
            let p = document.createElement('p')
            p.innerText = 'You have failed to crack the code.'
            popup.insertBefore(p, playAgainButtonEl)
            popup.showModal();
            code.forEach((el,i) => { //displays the secret code in the answer box. Will move to an if statement so that it only displays in winning or losing conditions.
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

// function quitGame(e) {
//     e.preventDefault();
//         loseEl.close();
//         winEl.close();
// }
// //     loseEl.style.visibility = 'hidden';
//     // winEl.style.visibility = 'hidden';
// //     console.log(e.target.id)
//     }
// }

function startGame(e) {
    e.preventDefault();
    if(e.target.id==='start') {
        init();
        console.log(e.target.id)
    }
}