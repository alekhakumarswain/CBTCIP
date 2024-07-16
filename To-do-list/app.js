document.addEventListener('DOMContentLoaded', () => {
    const addDayBtn = document.getElementById('add-day-btn');
    const newDayNameInput = document.getElementById('new-day-name');
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskTitleInput = document.getElementById('new-task-title');
    const taskList = document.getElementById('task-list');
    const completedTaskList = document.getElementById('completed-task-list');
    const daySelection = document.getElementById('day-selection');
    const taskInterface = document.getElementById('task-interface');
    const dayTitle = document.getElementById('day-title');
    const backBtn = document.getElementById('back-btn');
    const dayList = document.getElementById('day-list');

    let taskCount = 0;
    let selectedDay = null;

    loadDays();
    loadTasks();

    addDayBtn.addEventListener('click', addDay);
    addTaskBtn.addEventListener('click', addTask);
    backBtn.addEventListener('click', showDaySelection);

    function addDay() {
        const dayName = newDayNameInput.value.trim();
        if (dayName === '') return;

        const dayItem = createDayItem(dayName);
        dayList.appendChild(dayItem);

        saveDay(dayName);
        newDayNameInput.value = '';
    }

    function createDayItem(dayName) {
        const dayItem = document.createElement('li');
        dayItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        dayItem.innerText = dayName;

        const actionButtons = document.createElement('div');
        actionButtons.className = 'action-buttons';

        const selectBtn = document.createElement('button');
        selectBtn.className = 'btn btn-sm btn-success mr-2';
        selectBtn.innerHTML = '<i class="fas fa-check"></i>';
        selectBtn.addEventListener('click', () => {
            selectedDay = dayName;
            showTaskInterface(dayName);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger';
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.addEventListener('click', () => {
            deleteDay(dayItem, dayName);
        });

        actionButtons.appendChild(selectBtn);
        actionButtons.appendChild(deleteBtn);
        dayItem.appendChild(actionButtons);

        return dayItem;
    }

    function deleteDay(dayItem, dayName) {
        dayItem.remove();
        let days = getDaysFromStorage();
        days = days.filter(day => day !== dayName);
        localStorage.setItem('days', JSON.stringify(days));

        let tasks = getTasksFromStorage();
        tasks = tasks.filter(task => task.day !== dayName);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks(selectedDay);
    }

    function showDaySelection() {
        daySelection.classList.remove('d-none');
        taskInterface.classList.add('d-none');
        taskList.innerHTML = '';
        completedTaskList.innerHTML = '';
        selectedDay = null;
    }

    function showTaskInterface(day) {
        daySelection.classList.add('d-none');
        taskInterface.classList.remove('d-none');
        dayTitle.innerText = `Add New Task - ${day}`;
        loadTasks(day);
    }

    function addTask() {
        const taskTitle = newTaskTitleInput.value.trim();
        if (taskTitle === '') return;

        taskCount++;
        const task = {
            id: Date.now(),
            title: taskTitle,
            count: taskCount,
            day: selectedDay,
            completed: false
        };

        addTaskToDOM(task);
        saveTask(task);

        newTaskTitleInput.value = '';
    }

    function addTaskToDOM(task) {
        if (task.day !== selectedDay) return;

        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        taskItem.setAttribute('data-id', task.id);
        taskItem.innerHTML = `
            <span>${task.title} (${task.count})</span>
            <div class="action-buttons">
                <button class="complete-btn btn btn-sm btn-success mr-2"><i class="fas fa-check"></i></button>
                <button class="delete-btn btn btn-sm btn-danger"><i class="fas fa-times"></i></button>
            </div>
        `;

        if (task.completed) {
            completedTaskList.appendChild(taskItem);
            taskItem.classList.add('completed');
            taskItem.querySelector('.action-buttons').remove();
        } else {
            taskList.appendChild(taskItem);
            taskItem.querySelector('.complete-btn').addEventListener('click', () => {
                completeTask(taskItem);
            });
            taskItem.querySelector('.delete-btn').addEventListener('click', () => {
                deleteTask(taskItem);
            });
        }
    }

    function completeTask(taskItem) {
        const taskId = taskItem.getAttribute('data-id');
        let tasks = getTasksFromStorage();
        tasks = tasks.map(task => {
            if (task.id == taskId) {
                task.completed = true;
                task.completedAt = new Date().toLocaleString();
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        const taskText = taskItem.querySelector('span').innerText;
        const completedItem = document.createElement('li');
        completedItem.className = 'list-group-item completed';
        completedItem.innerHTML = `${taskText} - Completed at ${new Date().toLocaleString()}`;
        completedTaskList.appendChild(completedItem);
        taskItem.remove();
    }

    function deleteTask(taskItem) {
        const taskId = taskItem.getAttribute('data-id');
        let tasks = getTasksFromStorage();
        tasks = tasks.filter(task => task.id != taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskItem.remove();
    }

    function saveTask(task) {
        const tasks = getTasksFromStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTasksFromStorage() {
        return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    }

    function loadTasks(day = null) {
        const tasks = getTasksFromStorage();
        taskCount = tasks.length > 0 ? Math.max(...tasks.map(task => task.count)) : 0;

        taskList.innerHTML = '';
        completedTaskList.innerHTML = '';

        tasks.forEach(task => {
            if (day === null || task.day === day) {
                addTaskToDOM(task);
            }
        });
    }

    function saveDay(dayName) {
        const days = getDaysFromStorage();
        days.push(dayName);
        localStorage.setItem('days', JSON.stringify(days));
    }

    function getDaysFromStorage() {
        return localStorage.getItem('days') ? JSON.parse(localStorage.getItem('days')) : [];
    }

    function loadDays() {
        const days = getDaysFromStorage();
        days.forEach(dayName => {
            const dayItem = createDayItem(dayName);
            dayList.appendChild(dayItem);
        });
    }
});
