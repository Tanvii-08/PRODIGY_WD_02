let startTime;
let updatedTime;
let difference;
let timeInterval;
let savedTime = 0;
let running = false;
let lapCounter = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const time = document.getElementById('time');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        timeInterval = setInterval(updateTime, 1);
        startStopBtn.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(timeInterval);
        savedTime = difference;
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(timeInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    startStopBtn.textContent = 'Start';
    time.textContent = '00:00:00';
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = time.textContent;
        lapCounter++;
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    time.textContent = `${(hours < 10) ? '0' + hours : hours}:${(minutes < 10) ? '0' + minutes : minutes}:${(seconds < 10) ? '0' + seconds : seconds}`;
}
