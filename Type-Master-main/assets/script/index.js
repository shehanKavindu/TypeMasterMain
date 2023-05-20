'use strict';

import Score from './Score.js';

import { onEvent, getElement, select, date } from './Utility.js';

const display = select('.word-box');
const input = select('.input');
const start = select('.start-game');
const restart = getElement('restart');
const restartBtn = getElement('game-restart');
const hits = select('.hits p');
const timer = select('.timer');
const datePost = `${date()}`;
const displayDate = select('.date');
const overlay = select('.overlay');
const scoreBoard = select('.scoreboard');
const highScore = select('.score-store');
const highScoreBoard = select('.inner-box');
const points = select('.point');
const percent = select('.percent');
const close = select('.close');
const showHighScore = select('.show-highscore');
const array = [];


const startAudio = new Audio('./assets/audio/bg.mp3');
startAudio.type = 'audio/mp3';
startAudio.loop = true;

const hitAudio = new Audio('./assets/audio/score.wav');
hitAudio.type = 'audio/wav';

const countAudio = new Audio('./assets/audio/count.mp3');
countAudio.type = 'audio/mp3';

const gameoverAudio = new Audio('./assets/audio/gameover.wav');
gameoverAudio.type = 'audio/wav';


const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
'weather', 'resources', 'history', 'dream', 'character', 'money', 'absolute',
'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
'banana', 'artificial', 'computer', 'management', 'discovery', 'ambition', 'music',
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
'keyboard','fuck','colombo', 'rangerover','window'];


// To append date
let p1 = document.createElement('p');
p1.classList.add("date-p");
p1.innerText = datePost;
displayDate.append(p1);


// To get random words from the array
function randomWord() {
    let word = words[Math.floor(Math.random() * words.length)];
    words.splice(word, 1);
    return word;
};

let scoreArray = [];
let itemArray = [];
function appendWord() {
    // To append the randomword to the word box
    let selectedWord = document.createElement('p');
    selectedWord.classList.add("wordbox-p");
    selectedWord.innerText = randomWord();
    display.append(selectedWord);
   

    let count = 1;
    let inner;
    onEvent('keyup', input, () => {

        const wordRandom = selectedWord;
        let wordInput = input.value.trim().toLowerCase();
        if (wordInput === wordRandom.innerText) {
            hitAudio.play();
            inner = `${count}` ; 
            array.push(inner);
            hits.innerHTML = `Hits: ${count}`;
            points.innerHTML = `${count}`;
            input.value = '';
            selectedWord.innerText = randomWord();
            count++; 
        }
        let score = new Score(datePost, inner, calcpercent());
        percent.innerText = `Progress: ${score.percentage}%`
        let scoreObject = { hits: score.hits, progress: score.percentage };
        scoreArray.push(scoreObject);
    });
  array.splice(0); 
} 


let countdownTime = 90;
let timeinterval;
let isStarted = true;

// Function to start Timer and Display Timer
function startTimer() {
  if (isStarted) {
    isStarted = false;
    timer.innerHTML = countdownTime;
    timeinterval = setInterval(displayTime, 1000);
  }
};

function displayTime() {
  countdownTime --;
  timer.innerHTML = countdownTime;

  if (countdownTime === 0) {
    isStarted = true;
    clearInterval(timeinterval);
    countdownTime = 90;
    startAudio.pause();
    gameoverAudio.play();
    input.setAttribute("disabled", " ")
    displayBoard();
  }
};

function stopTimer() {
    clearInterval(timeinterval);
}

function resetTime() {
    stopTimer();

    setTimeout(() => {
      countdownTime = 90
      timer.innerHTML = countdownTime;
      timeinterval = setInterval(displayTime, 1000);
    }, 4500)
}

function calcpercent() {
    let num = Math.floor((array.length * 100) / 90);
    let result = num.toFixed(2);
    return result;
}

function displayBoard() {
    scoreBoard.style.display = "block";
    overlay.style.display = "block";
    //highScore.classList.add('is-visible');
    //displayScores();
}


let storeHits = document.createElement('div');
storeHits.classList.add("box");

function storeScore() {
    
    let lastItem = scoreArray[scoreArray.length - 1];
    itemArray.push(lastItem);
    itemArray.sort((s1, s2) => (s1.hits < s2.hits) ? 1 : (s1.hits > s2.hits) ? -1 : 0); 
    itemArray.splice(3);
    
    localStorage.setItem('scores', JSON.stringify(itemArray));
    console.log(localStorage);
}


function displayScores() {
    storeScore();
    const scores = JSON.parse(localStorage.getItem('scores'));

    if(localStorage.length > 0) {
      storeHits.innerHTML = scores.map((score) => 
        `${score.hits} words || ${score.progress}% <br>`
      ) .join('');
      highScoreBoard.append(storeHits);
    }
}


function startGame() {
    finalMessage.classList.remove('show');
    overlay.style.display = "none";
    appendWord();
    startAudio.play();
    input.removeAttribute('disabled');
    input.focus();
    startTimer();
    restart.classList = 'is-visible';
    start.classList.add("not-visible");
    timer.style.display = 'block';
}

const number = document.querySelectorAll('.number span');
const counter = select('.counter');
const finalMessage = document.querySelector('.final');


function resetDOM() {
  counter.classList.remove('hide');
  finalMessage.classList.remove('show');
    
  number.forEach(num => {
    num.classList.value = '';
  });

    number[0].classList.add('in');
}

function runAnimation() {
  number.forEach((num, index) => {
    const penultimate = number.length - 1;
    num.addEventListener('animationend', (e) => {
      if(e.animationName === 'goIn' && index !== penultimate){
        num.classList.remove('in');
        num.classList.add('out');
      } else if (e.animationName === 'goOut' && num.nextElementSibling){
        num.nextElementSibling.classList.add('in');
      } else {
        counter.classList.add('hide');
        finalMessage.classList.add('show');
      }
    });
  });
  countAudio.play();
}

function restartGame() {
    startAudio.pause();
    input.value = '';
    let count = 0;
    hits.innerHTML = `Hits: ${count}`
    display.innerHTML = '';
    resetDOM()
    resetTime()
    startCounter.style.display = "block"
    overlay.style.display = "block"
    runAnimation();
    setTimeout(() => {
        startGame();
    }, 4500);
}


// Event listeners
onEvent('click', restart, () => {
    startTimer();
    restartGame();
})

onEvent('click', restartBtn, () => {
    scoreBoard.style.display = "none";
    overlay.style.display = "none";
    highScore.classList.remove('is-visible');
    startTimer();
    restartGame();
})

onEvent('click', start, function(event) {
  event.preventDefault();
  startGame();
})

close.addEventListener('click', () => {
    scoreBoard.style.display = "none";
    overlay.style.display = "none";
    // highScore.classList.remove('is-visible');
});

overlay.addEventListener('click', () => {
    scoreBoard.style.display = "none";
    overlay.style.display = "none";
    // highScore.classList.remove('is-visible');
});

onEvent('click', showHighScore, () => {

  if(localStorage.length === 0) {
    return false;
  } else {
    overlay.style.display = "block";
    highScore.classList.add('is-visible');
  }
})



// Modal
const dialog = select('dialog');
const dialogStart = select('.start-me');
const startCounter = select('.counter');

window.addEventListener("load", () => {
    dialog.showModal();
});

onEvent('click', dialogStart, () => {
    dialog.close()
    startCounter.style.display = "block"
    overlay.style.display = "block"
    runAnimation();
    setTimeout(() => {
        startGame();
    }, 4500);
})

onEvent('click', dialog, function(event) {
    const rect = this.getBoundingClientRect();

    if (event.clientY < rect.top  || event.clientY > rect.bottom ||
        event.clientX < rect.left || event.clientX > rect.right) {
            dialog.close();
    }
});
