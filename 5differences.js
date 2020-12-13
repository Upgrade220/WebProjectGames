let count = 0;
const dialog = document.querySelector('dialog');
const finalButton = document.getElementById('finalButton');

const finalAudio = new Audio('Cyberpunk-2077.mp3');
finalAudio.volume = 0.2;

const bgAudio = new Audio('19-2000.mp3');
bgAudio.volume = 0.1;

const toysPositions = [[70, 349, 70, 100],
[100, 340, 100, 130],
[140, 290, 170, 230],
[170, 240, 230, 300],
[189, 233, 300, 399]]

bgAudio.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);

function clicked(element) {
    let start = Date.now();

    let timer = setInterval(function () {
        let timePassed = Date.now() - start;
        if (element.getBoundingClientRect().top > window.screen.height) {
            clearInterval(timer);
            element.style.display = "none";
            return;
        }
        draw(timePassed);
    }, 20);

    function draw(timePassed) {
        element.style.top = element.getBoundingClientRect().top + 'px';
    }

    count++;
    if (count === 5) {
        count = 0;
        endGame();
    }
}

function getRandomImage(image, filetype, count) {
    let rand = Math.random() * (count);
    return image + Math.floor(rand) + "." + filetype;
}

function getRandomNum(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function initializeGame() {
    let elki = document.getElementsByClassName("imagebg");
    for (let elka of elki) {
        elka.style.backgroundImage = "url('" + getRandomImage("elka", "jpg", 1) + "')";
    }

    for (let i = 0; i < 5; i++) {
        let toy = document.getElementById(`toy${i}`);
        toy.src = getRandomImage("igrushka", "png", 5);
        toy.style.display = '';
        toy.style.top = '';
        toy.style.left = getRandomNum(toysPositions[i][0], toysPositions[i][1]) + "px";
        toy.style.bottom = getRandomNum(toysPositions[i][2], toysPositions[i][3]) + "px";
    }

    let bg = () => bgAudio.play().catch(() => setTimeout(bg, 1000));
    bg();
}

initializeGame();

finalButton.addEventListener('click', function () {
    finalAudio.pause();
    finalAudio.currentTime = 0.0;
    dialog.close();
    initializeGame();
})


function endGame() {
    dialog.show();
    bgAudio.pause();
    bgAudio.currentTime = 0.0;
    finalAudio.play();
}
