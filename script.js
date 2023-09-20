const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingbtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsform = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');



const words = ["safe", "citizen", "engineer", "married", "disease", "they", "slip", "indeed", "given", "partly",
    "indeed", "bill", "substance", "dinner", "balloon", "took", "support", "imagine", "end", "call",
    "he", "rise", "period", "shot", "trouble", "gas", "comfortable", "principle", "dance", "importance",
    "example", "verb", "powder", "fifty", "honor", "action", "tall", "brief", "cannot", "castle",
    "search", "condition", "solid", "won", "there", "it", "nor", "detail", "grabbed", "of",
    "dead", "particularly", "direction", "image", "lovely", "beat", "rocket", "triangle", "underline", "stared",
    "affect", "satisfied", "theory", "hurry", "curious", "green", "jump", "line", "model", "silly",
    "current", "nice", "third", "family", "radio", "small", "many", "nodded", "applied", "movie",
    "check", "bet", "accept", "cap", "themselves", "grew", "putting", "bone", "popular", "frozen",
    "quiet", "highway", "together", "duck", "parent", "element", "feathers", "peace", "blow", "at",
    "station", "progress", "coming", "tie", "dawn", "cow", "victory", "failed", "above", "sure"];

let randomWord = '';

let score = 0;

let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'medium';

text.focus(); // Makes the cursor point at the input bar automatically

const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval); // Clears any time interval func. running
        // game over 
        gameOver();
    }
}

// Showing end screen, when game ends

function gameOver() {

    endgameEl.innerHTML = `<h1>Game Over</h1>
                            <br>
                            <h2>Your final score is ${score}</h2>
                            
                <button onclick="location.reload()">Reload</button>`;
    endgameEl.style.display = 'flex';
}

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

function addWordToDom() {

    randomWord = getRandomWord()
    return word.innerHTML = randomWord;
}

addWordToDom();

text.addEventListener('input', e => {
    const input = e.target.value;
    if (input === randomWord) {
        addWordToDom();
        updateScore();

        if (difficulty === 'veteran')
            time += 1;
        else if (difficulty === 'hard')
            time += 2;
        else if (difficulty === 'medium')
            time += 3;
        else
            time += 5;

        updateTime();

        e.target.value = '';
    }
})

// listening to the settings button
settingbtn.addEventListener('click', e => {
    settings.classList.toggle('hide');
})

// listening to the settings dropdown menu
settingsform.addEventListener('change', e => {

    difficulty = e.target.value;

    localStorage.setItem('difficulty', difficulty);

})


