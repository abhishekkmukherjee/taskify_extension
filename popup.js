// Initialize tasks with some example data
let tasks = [
  {
      id: 1,
      title: "Complete project proposal",
      completed: false,
      time: "Today, 3:00 PM",
      tag: "Work",
      starred: true
  },
  {
      id: 2,
      title: "Schedule team meeting",
      completed: false,
      time: "Today, 5:00 PM",
      tag: "Work",
      starred: false
  },
  {
      id: 3,
      title: "Prepare client presentation",
      completed: true,
      time: "Today, 11:30 AM",
      tag: "Work",
      starred: true
  },
  {
      id: 4,
      title: "Buy groceries",
      completed: false,
      time: "Today, 6:30 PM",
      tag: "Personal",
      starred: false
  }
];

// DOM Elements
const taskList = document.getElementById('task-list');
const addTaskInput = document.getElementById('add-task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const tabButtons = document.querySelectorAll('.tab-button');
const themeToggle = document.getElementById('theme-toggle');

// Current filter
let currentFilter = 'today';

// Load tasks from storage or use defaults
function loadTasks() {
  chrome.storage.local.get(['tasks'], function(result) {
      if (result.tasks) {
          tasks = result.tasks;
      }
      renderTasks();
  });
}

// Save tasks to storage
function saveTasks() {
  chrome.storage.local.set({ tasks: tasks });
}

// Load theme preference
function loadTheme() {
  chrome.storage.local.get(['darkTheme'], function(result) {
      if (result.darkTheme) {
          document.body.classList.add('dark-theme');
          themeToggle.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
          `;
      }
  });
}

// Toggle theme
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  
  // Update theme icon
  if (isDark) {
      themeToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
      `;
  } else {
      themeToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
      `;
  }
  
  // Save theme preference
  chrome.storage.local.set({ darkTheme: isDark });
}

// Render tasks based on current filter
function renderTasks() {
  // Clear current tasks
  taskList.innerHTML = '';
  
  // Filter tasks based on current tab
  let filteredTasks = tasks;
  
  if (currentFilter === 'today') {
      filteredTasks = tasks.filter(task => task.time.includes('Today'));
  } else if (currentFilter === 'important') {
      filteredTasks = tasks.filter(task => task.starred);
  }
  
  // Check if there are no tasks to display
  if (filteredTasks.length === 0) {
      showEmptyState();
      return;
  }
  
  // Render each task
  filteredTasks.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.className = 'task-item';
      taskElement.dataset.id = task.id;
      
      const starredClass = task.starred ? 'task-starred' : '';
      
      taskElement.innerHTML = `
          <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
          <div class="task-content">
              <h3 class="task-title">${task.title}</h3>
              <div class="task-details">
                  <span>${task.time}</span>
                  <span class="task-tag">${task.tag}</span>
              </div>
          </div>
          <div class="task-actions">
              <button class="icon-button tooltip ${starredClass}" data-tooltip="Mark as important">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${task.starred ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
              </button>
          </div>
      `;
      
      taskList.appendChild(taskElement);
      
      // Add event listeners
      const checkbox = taskElement.querySelector('.task-checkbox');
      checkbox.addEventListener('change', function() {
          toggleTaskCompletion(task.id);
      });
      
      const starButton = taskElement.querySelector('.task-actions .icon-button');
      starButton.addEventListener('click', function() {
          toggleTaskImportance(task.id);
      });
  });
}

// Show empty state when no tasks match the filter
function showEmptyState() {
  let message = '';
  
  if (currentFilter === 'today') {
      message = 'No tasks for today';
  } else if (currentFilter === 'important') {
      message = 'No important tasks';
  } else {
      message = 'No tasks yet';
  }
  
  taskList.innerHTML = `
      <div class="empty-state">
          <div class="empty-state-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
          </div>
          <h3 class="empty-title">${message}</h3>
          <p class="empty-subtitle">Start adding tasks to stay organized</p>
      </div>
  `;
}

// Add a new task
function addTask(title) {
  const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
      time: 'Today',
      tag: 'Personal',
      starred: false
  };
  
  tasks.unshift(newTask);
  saveTasks();
  renderTasks();
}

// Toggle task completion status
function toggleTaskCompletion(taskId) {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
  }
}

// Toggle task importance (star)
function toggleTaskImportance(taskId) {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
      task.starred = !task.starred;
      saveTasks();
      renderTasks();
  }
}

// Set up tab navigation
function setupTabs() {
  tabButtons.forEach(button => {
      button.addEventListener('click', function() {
          tabButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          currentFilter = this.dataset.tab;
          renderTasks();
      });
  });
}

// Initialize the extension
function init() {
  // Load tasks from storage
  loadTasks();
  
  // Load theme preference
  loadTheme();
  
  // Set up tab navigation
  setupTabs();
  
  // Add new task
  addTaskBtn.addEventListener('click', function() {
      const taskText = addTaskInput.value.trim();
      if (taskText) {
          addTask(taskText);
          addTaskInput.value = '';
      }
  });
  
  // Add task on Enter key
  addTaskInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          addTaskBtn.click();
      }
  });
  
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
}

// Run initialization
document.addEventListener('DOMContentLoaded', init);