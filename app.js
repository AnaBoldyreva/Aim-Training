const startBtn = document.getElementById('start'); // Изменено
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 20;
let timer;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

//debug
// startGame(); // Удалите этот вызов, если не нужна отладка

function startGame() {
    clearInterval(timer); // Очищаем предыдущий интервал, если он был
    timer = setInterval(decreaseTime, 1000); // Устанавливаем новый интервал
    createRandomCricle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    clearInterval(timer);
    alert('Игра окончена!');
    board.innerHTML = '';
}

function createRandomCricle() {
    const circle = document.createElement('div');
    const size = Math.random() * 100 + 30; 
    const x = Math.random() * (board.offsetWidth - size);
    const y = Math.random() * (board.offsetHeight - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    board.append(circle);

    circle.addEventListener('click', () => {
        circle.remove(); 
        createRandomCricle(); 
    });
}