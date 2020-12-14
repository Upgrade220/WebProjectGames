const dialog = document.querySelector('dialog');
const finalButton = document.getElementById('finalButton');
const finalVideo = document.getElementById('finalVideo');
finalVideo.volume = 0.2;
finalVideo.loop = true;

let cards = new Array(20);
let cardsIndexes = new Array(20).fill(0);
let test = new Array(20).fill(0);

let firstCard = null;
let firstCardIndex = null;
let turn = 1;
let totalPairs = 0;

const bgAudio = new Audio('memory/candyland.mp3');
bgAudio.volume = 0.1;
bgAudio.loop = true;

document.querySelector('.game__meme').addEventListener('click', () => toggleAudio(bgAudio));

function toggleAudio(audio) {
    if (audio.paused) {
        audio.play();
    }
    else {
        audio.pause();
    }
}

function randomInteger(max) {
    let rand = Math.random() * (max + 1);
    return Math.floor(rand);
}

function showCard(card) {
    let cardEl = document.getElementById(card);
    let index = Number(card.match(/\d+/)[0]);
    cardEl.style.backgroundImage = `url(memory/${cards[index]})`;
    return index;
}

function hideCards() {
    let cells = document.querySelectorAll('.game__cell');
    for (let cell of cells) {
        cell.style.backgroundImage = 'url(memory/bg.webp)'
    }
}

function flipCard(card) {
    let cardEl = document.getElementById(card);
    if (cardEl.style.backgroundImage === `url("memory/bg.webp")`) {
        let index = showCard(card);
        if (turn === 1) {
            firstCard = card;
            firstCardIndex = cardsIndexes[index];
            turn++;
        }
        else {
            if (firstCardIndex !== cardsIndexes[index]) {
                let fCardEl = document.getElementById(firstCard);
                setTimeout(function () {
                    fCardEl.style.backgroundImage = 'url(memory/bg.webp)';
                    cardEl.style.backgroundImage = 'url(memory/bg.webp)';
                }, 1000)
            }
            else {
                totalPairs++;
            }
            turn = 1;
        }
    }
    if (totalPairs === 10) {
        endGame();
    }
}

function initializeGame() {
    let i = 0;
    while (cards.includes(undefined)) {
        let firstPlaced = false;
        while (!firstPlaced) {
            let randInt1 = randomInteger(19);
            if (cards[randInt1] === undefined) {
                cards[randInt1] = `item${i}.webp`;
                cardsIndexes[randInt1] = i;
                firstPlaced = true;
            }
        }
        let secondPlaced = false;
        while (!secondPlaced) {
            let randInt2 = randomInteger(19);
            if (cards[randInt2] === undefined) {
                cards[randInt2] = `item${i}.webp`;
                cardsIndexes[randInt2] = i;
                secondPlaced = true;
            }
        }
        i++;
    }

    for (let i = 0; i < cards.length; i++) {
        test[Number(cards[i].match(/\d+/)[0])]++;
    }

    let cells = document.querySelectorAll('.game__cell');
    for (let cell of cells) {
        showCard(cell.id);
    }

    setTimeout(hideCards, 3000);

    bgAudio.play();

    firstCard = null;
    firstCardIndex = null;
    turn = 1;
    totalPairs = 0;
}

finalButton.addEventListener('click', function () {
    dialog.close();
    finalVideo.pause();
    finalVideo.currentTime = 0.0;
    initializeGame();
})

function endGame() {
    bgAudio.pause();
    bgAudio.currentTime = 0.0;
    dialog.show();
    finalVideo.play();
}

initializeGame();
