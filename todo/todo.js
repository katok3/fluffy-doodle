document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const STORAGE_KEY = 'todoList_v2';

    // Загрузка задач при старте
    loadTasks();

    function createTaskElement(text, completed = false) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-content">
                <div class="checkbox"></div>
                <span>${text}</span>
            </div>
            <div class="controls">
                <button class="editButton">✎</button>
                <button class="deleteButton">×</button>
            </div>
        `;

        if (completed) li.classList.add('completed');

        // Обработчики событий
        li.querySelector('.checkbox').addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.querySelector('.editButton').addEventListener('click', () => {
            const span = li.querySelector('span');
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            input.classList.add('edit-input');
            
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    span.textContent = input.value;
                    saveTasks();
                    input.replaceWith(span);
                }
            });

            input.addEventListener('blur', () => {
                span.textContent = input.value;
                saveTasks();
                input.replaceWith(span);
            });

            span.replaceWith(input);
            input.focus();
        });

        li.querySelector('.deleteButton').addEventListener('click', () => {
            li.style.animation = 'slideOut 0.3s ease';
            li.addEventListener('animationend', () => li.remove());
            saveTasks();
        });

        return li;
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            const li = createTaskElement(text);
            taskList.prepend(li);
            taskInput.value = '';
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        tasks.reverse().forEach(task => {
            const li = createTaskElement(task.text, task.completed);
            taskList.prepend(li);
        });
    }

    // Обработчики событий
    addButton.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Анимация удаления
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOut {
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
});

