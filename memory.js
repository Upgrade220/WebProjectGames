let cards = new Array(20);
let cardsIndexes = new Array(20).fill(0);
let test = new Array(20).fill(0);

let firstCard = null;
let firstCardIndex = null;
let turn = 1;
let totalPairs = 0;

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
        cell.style.backgroundImage = 'url(memory/bg.png)'
    }
}

function flipCard(card) {
    let cardEl = document.getElementById(card);
    if (cardEl.style.backgroundImage === `url("memory/bg.png")`) {
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
                    fCardEl.style.backgroundImage = 'url(memory/bg.png)';
                    cardEl.style.backgroundImage = 'url(memory/bg.png)';
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
                cards[randInt1] = `item${i}.png`;
                cardsIndexes[randInt1] = i;
                firstPlaced = true;
            }
        }
        let secondPlaced = false;
        while (!secondPlaced) {
            let randInt2 = randomInteger(19);
            if (cards[randInt2] === undefined) {
                cards[randInt2] = `item${i}.png`;
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

    firstCard = null;
    firstCardIndex = null;
    turn = 1;
    totalPairs = 0;
}

function endGame() {
    alert('finish');
    initializeGame();
}

initializeGame();