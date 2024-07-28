var globalTimer;

/**
 * @param {HTMLButtonElement} button 
 */
function startTimer(button) {
    let parent = button.parentNode.parentNode;

    // timer already running
    if (parent.classList.contains('active')) {
        return;
    }

    // stop other timers
    let runningTimerEl = document.querySelector('.timer.active')
    if (runningTimerEl) {
        runningTimerEl.classList.remove('active');
        clearInterval(globalTimer);
    }

    var sec = 0;
    var hoursEl = parent.querySelector('.hours');
    var minutesEl = parent.querySelector('.minutes');
    var secondsEl = parent.querySelector('.seconds');

    sec = getSecondsFromTime(
        parseInt(hoursEl.innerHTML),
        parseInt(minutesEl.innerHTML),
        parseInt(secondsEl.innerHTML)
    );

    parent.classList.add('active');

    globalTimer = setInterval(function () {
        secondsEl.innerHTML = pad(++sec % 60);
        minutesEl.innerHTML = pad(parseInt(sec / 60 % 60, 10));
        hoursEl.innerHTML = pad(parseInt(sec / 3600 % 60, 10));
    }, 1000);
}

/**
 * @param {number} hours 
 * @param {number} minutes 
 * @param {number} seconds 
 * @returns 
 */
function getSecondsFromTime(hours, minutes, seconds) {
    let hoursInSeconds = hours * 3600;
    let minutesInSeconds = minutes * 60

    return hoursInSeconds + minutesInSeconds + seconds;
}

/**
 * @param {number} val 
 * @returns 
 */
function pad(val) {
    return val > 9 ? val : "0" + val;
}

function stopTimer(button) {
    let parent = button.parentNode.parentNode;

    if (!parent.classList.contains('active')) {
        return;
    }

    parent.classList.remove('active')

    clearInterval(globalTimer);
}

function clearTimer(button) {
    let parent = button.parentNode.parentNode;
    let timerElements = [
        parent.querySelector('.hours'),
        parent.querySelector('.minutes'),
        parent.querySelector('.seconds')
    ]

    timerElements.forEach(element => {
        element.innerHTML = '00'
    });

    clearInterval(globalTimer);
}