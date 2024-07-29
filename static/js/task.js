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

function submitTasks() {
    let json = tasksAsJson();
    postTasks(json)
}

function postTasks(payload) {
    let postUrl = window.location.origin + "/postTasks"
    fetch(postUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

/**
 * submit form data in a json format so we can marshal to a struct on the backend.
 * 
 * @param {*} form 
 * @returns 
 */
function tasksAsJson() {
    let tasks = [];
    let taskElements = document.querySelectorAll('.task')

    taskElements.forEach((taskEl, index) => {
        let task = {}
        let inputs = taskEl.querySelectorAll('input');
        let hours = taskEl.querySelector('.hours').innerHTML;
        let minutes = taskEl.querySelector('.minutes').innerHTML;
        let seconds = taskEl.querySelector('.seconds').innerHTML;

        let duration = getSecondsFromTime(parseInt(hours), parseInt(minutes), parseInt(seconds));

        taskEl.querySelector('input[name="duration"]').value = duration;

        inputs.forEach((input, index) => {
            task[input.name] = input.value
        });

        tasks.push(task)
    });

    return JSON.stringify(tasks);
}