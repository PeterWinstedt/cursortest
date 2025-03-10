document.addEventListener('DOMContentLoaded', () => {
    // API URL
    const apiUrl = '/api/tasks';
    
    // DOM Elements
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Fetch all tasks
    const fetchTasks = async () => {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch tasks: ${response.status}`);
            }
            
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            showError('Failed to load tasks. Please try again later.');
        }
    };
    
    // Add a new task
    const addTask = async (description) => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description })
            });
            
            if (!response.ok) {
                throw new Error(`Failed to add task: ${response.status}`);
            }
            
            await fetchTasks();
            taskInput.value = '';
        } catch (error) {
            console.error('Error adding task:', error);
            showError('Failed to add task. Please try again.');
        }
    };
    
    // Complete a task
    const completeTask = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT'
            });
            
            if (!response.ok) {
                throw new Error(`Failed to complete task: ${response.status}`);
            }
            
            await fetchTasks();
        } catch (error) {
            console.error('Error completing task:', error);
            showError('Failed to update task. Please try again.');
        }
    };
    
    // Render tasks in the DOM
    const renderTasks = (tasks) => {
        taskList.innerHTML = '';
        
        if (tasks.length === 0) {
            taskList.innerHTML = '<li class="empty-message">No tasks yet. Add one above!</li>';
            return;
        }
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = task.isCompleted;
            checkbox.disabled = task.isCompleted;
            checkbox.addEventListener('change', () => completeTask(task.id));
            
            const span = document.createElement('span');
            span.className = `task-text ${task.isCompleted ? 'completed' : ''}`;
            span.textContent = task.description;
            
            li.appendChild(checkbox);
            li.appendChild(span);
            taskList.appendChild(li);
        });
    };
    
    // Show error message
    const showError = (message) => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        document.querySelector('.container').prepend(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    };
    
    // Event Listeners
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = taskInput.value.trim();
        
        if (description) {
            addTask(description);
        }
    });
    
    // Initialize the app
    fetchTasks();
}); 