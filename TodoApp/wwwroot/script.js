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
        
        // Sort tasks: incomplete tasks first, then completed tasks
        const sortedTasks = [...tasks].sort((a, b) => {
            // If completion status is different, sort by completion status
            if (a.isCompleted !== b.isCompleted) {
                return a.isCompleted ? 1 : -1; // false comes before true
            }
            // If both have same completion status, maintain original order (by ID)
            return a.id - b.id;
        });
        
        sortedTasks.forEach(task => {
            const li = document.createElement('li');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = task.isCompleted;
            checkbox.disabled = task.isCompleted;
            checkbox.addEventListener('change', () => completeTask(task.id));
            
            const taskContent = document.createElement('div');
            taskContent.className = 'task-content';
            
            const span = document.createElement('span');
            span.className = `task-text ${task.isCompleted ? 'completed' : ''}`;
            span.textContent = task.description;
            
            const timestamp = document.createElement('small');
            timestamp.className = 'task-timestamp';
            if (task.createdAt) {
                const date = new Date(task.createdAt);
                timestamp.textContent = `Added on: ${date.toLocaleString()}`;
            } else {
                timestamp.textContent = 'No timestamp available';
            }
            
            taskContent.appendChild(span);
            taskContent.appendChild(timestamp);
            
            li.appendChild(checkbox);
            li.appendChild(taskContent);
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