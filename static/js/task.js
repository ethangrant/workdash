function addTask() {
    let taskEl = document.querySelector('.task').cloneNode(true);
    document.querySelector('.timers').append(taskEl);
}

/**
 * @param {HTMLButtonElement} button 
 * @returns 
 */
function deleteTask(button) {
    let taskElements = document.querySelectorAll('.task');

    if (taskElements.length === 1) {
        return;
    }

    let parent = button.parentNode;
    while (parent !== null && !parent.classList.contains('task')) {
        parent = parent.parentNode;
    }

    parent.remove();
}

