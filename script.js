// Fix Chart.js import - use script tag in HTML instead
// import Chart from 'chart.js/auto';
// The above import was causing issues since you're not using a bundler

// DOM Elements
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskPriority = document.getElementById('taskPriority');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const viewBtns = document.querySelectorAll('.view-btn');
const analyzerTabs = document.querySelectorAll('.analyzer-tab');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const completionRateEl = document.getElementById('completionRate');
const dailyChart = document.getElementById('dailyChart');
const weeklyChart = document.getElementById('weeklyChart');
const monthlyChart = document.getElementById('monthlyChart');
const dailyPieChart = document.getElementById('dailyPieChart');
const weeklyPieChart = document.getElementById('weeklyPieChart');
const priorityPieChart = document.getElementById('priorityPieChart');
const todayProgress = document.getElementById('todayProgress');
const todayStats = document.getElementById('todayStats');
const mostProductiveDay = document.getElementById('mostProductiveDay');
const weeklyGoalProgress = document.getElementById('weeklyGoalProgress');
const prevWeekBtn = document.getElementById('prevWeek');
const nextWeekBtn = document.getElementById('nextWeek');
const weekRange = document.getElementById('weekRange');
const monthDisplay = document.getElementById('monthDisplay');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const monthlyCompleted = document.getElementById('monthlyCompleted');
const productiveWeek = document.getElementById('productiveWeek');
const priorityFocus = document.getElementById('priorityFocus');
const allTaskCount = document.getElementById('allTaskCount');
const activeTaskCount = document.getElementById('activeTaskCount');
const completedTaskCount = document.getElementById('completedTaskCount');
const todayTaskCount = document.getElementById('todayTaskCount');
const todayCompletedCount = document.getElementById('todayCompletedCount');
const todayActiveCount = document.getElementById('todayActiveCount');

// Chart references
let chartInstances = {
  dailyChart: null,
  weeklyChart: null,
  monthlyChart: null,
  dailyPieChart: null,
  weeklyPieChart: null,
  monthlyPieChart: null
};

// State
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let currentView = 'daily';
let currentWeek = new Date();
let currentMonthDate = new Date();
let currentMonth = new Date();
let selectedDay = null;

// Initialize the application
function init() {
  // Set today's date as default for new tasks
  const today = new Date().toISOString().split('T')[0];
  if (taskDate) taskDate.value = today;
  
  // Setup event listeners for task management
  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', handleAddTask);
  }
  
  if (taskInput) {
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleAddTask();
    });
  }

  // Setup filter buttons
  if (filterBtns && filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        if (filter) filterTasks(filter);
      });
    });
  }

  // Setup view buttons
  if (viewBtns && viewBtns.length > 0) {
    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        if (view) switchView(view);
      });
    });
  }

  // Setup analyzer tabs
  if (analyzerTabs && analyzerTabs.length > 0) {
    analyzerTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabView = tab.getAttribute('data-tab');
        if (tabView) switchAnalyzerTab(tabView);
      });
    });
  }

  // Setup week navigation
  if (prevWeekBtn) {
    prevWeekBtn.addEventListener('click', goToPrevWeek);
  }
  if (nextWeekBtn) {
    nextWeekBtn.addEventListener('click', goToNextWeek);
  }

  // Setup month navigation
  if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', goToPrevMonth);
  }
  if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', goToNextMonth);
  }

  // Load tasks from local storage
  loadTasks();

  // Load saved view preference
  const savedView = localStorage.getItem('currentView');
  if (savedView) {
    currentView = savedView;
  }
  
  // Initialize view
  switchView(currentView);
  
  // Update stats and charts
  updateStats();
  updateWeekDisplay();
  initializeCharts();
  
  // Log initialization status to help with debugging
  console.log('App initialized. Current view:', currentView);
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  updateStats();
  updateCharts();
  renderTasks();
}

// Update createTaskElement to make it more robust
function createTaskElement(task) {
  if (!task) return null;

  try {
    // Function to get priority class
    const getPriorityClass = (priority) => {
      switch (priority) {
        case 'urgent-important': return 'priority-urgent-important';
        case 'not-urgent-important': return 'priority-not-urgent-important';
        case 'urgent-not-important': return 'priority-urgent-not-important';
        case 'not-urgent-not-important': return 'priority-not-urgent-not-important';
        default: return '';
      }
    };

    // Function to get priority label
    const getPriorityLabel = (priority) => {
      switch (priority) {
        case 'urgent-important': return 'Urgent & Important';
        case 'not-urgent-important': return 'Not Urgent but Important';
        case 'urgent-not-important': return 'Urgent but Not Important';
        case 'not-urgent-not-important': return 'Not Urgent & Not Important';
        default: return '';
      }
    };

    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''} ${getPriorityClass(task.priority)}`;
    li.dataset.id = task.id;
    
    const taskDate = formatDate(task.date);

    li.innerHTML = `
      <div class="task-content">
        <label class="checkbox-container">
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <span class="checkmark"></span>
        </label>
        <div class="task-info">
          <p class="task-text">${task.text}</p>
          <div class="task-meta">
            <span class="task-date"><i class="far fa-calendar"></i> ${taskDate}</span>
            <span class="task-priority">${getPriorityLabel(task.priority)}</span>
          </div>
        </div>
      </div>
      <button class="delete-btn"><i class="fas fa-trash"></i></button>
    `;

    // Add event listeners to the task item
    const checkbox = li.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        toggleTask(task.id);
      });
    }

    const deleteBtn = li.querySelector('.delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        deleteTask(task.id);
      });
    }

    return li;
  } catch (error) {
    console.error('Error creating task element:', error, task);
    return null;
  }
}

// Format date for display
function formatDate(dateString) {
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Add a new task
function handleAddTask() {
  const text = taskInput.value.trim();
  const date = taskDate.value;
  const priority = taskPriority.value;

  if (text && date && priority !== 'none') {
    addTask(text, date, priority);
    taskInput.value = '';
    taskPriority.value = 'none';
    
    // Keep the date as is for convenience when adding multiple tasks
  }
}

function addTask(text, date, priority) {
  const newTask = {
    id: Date.now(),
    text,
    date,
    priority,
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  updateStats();
  updateCharts();
}

// Toggle task completion status
function toggleTask(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
  updateStats();
  updateCharts();
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
  updateStats();
  updateCharts();
}

// Filter tasks by status
function filterTasks(filter) {
  currentFilter = filter;
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
  });
  renderTasks();
}

// Update the switchView function
function switchView(view) {
  // Update current view
  currentView = view;
  
  // Update view buttons
  const viewButtons = document.querySelectorAll('.view-btn');
  viewButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === view);
  });
  
  // Update view displays
  const taskViews = document.querySelectorAll('.task-view');
  taskViews.forEach(v => {
    v.classList.toggle('active', v.id === `${view}View`);
  });
  
  // Special handling for views that need refreshing
  if (view === 'weekly') {
    renderWeekView();
  } else if (view === 'matrix') {
    renderMatrixView();
  } else if (view === 'monthly') {
    renderCalendar();
  } else if (view === 'daily') {
    renderDailyView();
  }
  
  // Save current view preference
  localStorage.setItem('currentView', view);
}

// Switch between analyzer tabs
function switchAnalyzerTab(tab) {
  analyzerTabs.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
  });

  document.querySelectorAll('.analysis-view').forEach(view => {
    view.classList.remove('active');
  });

  document.getElementById(`${tab}Analysis`).classList.add('active');
}

// Get week dates (Sunday to Saturday)
function getWeekDates(date) {
  const day = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
  const diff = date.getDate() - day;
  const sunday = new Date(date);
  sunday.setDate(diff);
  
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(sunday);
    nextDate.setDate(sunday.getDate() + i);
    weekDates.push(nextDate);
  }
  return weekDates;
}

// Navigate to previous week
function goToPrevWeek() {
  const prevWeek = new Date(currentWeek);
  prevWeek.setDate(prevWeek.getDate() - 7);
  currentWeek = prevWeek;
  updateWeekDisplay();
  renderWeekView();
}

// Navigate to next week
function goToNextWeek() {
  const nextWeek = new Date(currentWeek);
  nextWeek.setDate(nextWeek.getDate() + 7);
  currentWeek = nextWeek;
  updateWeekDisplay();
  renderWeekView();
}

// Update week display
function updateWeekDisplay() {
  const weekDates = getWeekDates(currentWeek);
  const startDate = weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endDate = weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  weekRange.textContent = `Week of ${startDate} - ${endDate}`;
}

// Format date to YYYY-MM-DD for comparison
function formatDateForComparison(date) {
  return date.toISOString().split('T')[0];
}

// Render tasks based on current view and filter
function renderTasks() {
  if (currentView === 'daily') {
    renderDailyView();
  } else if (currentView === 'weekly') {
    renderWeekView();
  } else if (currentView === 'matrix') {
    renderMatrixView();
  } else if (currentView === 'monthly') {
    renderCalendar();
  }
}

// Render daily view
function renderDailyView() {
  // Get today's date in YYYY-MM-DD format for comparison
  const today = new Date().toISOString().split('T')[0];
  
  // Filter tasks based on the currentFilter
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  // Count today's tasks
  const todayTasksList = tasks.filter(task => task.date === today);
  const todayCompletedList = todayTasksList.filter(task => task.completed);
  const todayActiveList = todayTasksList.filter(task => !task.completed);

  // Update task counts if elements exist
  if (todayTaskCount) todayTaskCount.textContent = todayTasksList.length;
  if (todayCompletedCount) todayCompletedCount.textContent = todayCompletedList.length;
  if (todayActiveCount) todayActiveCount.textContent = todayActiveList.length;
  if (allTaskCount) allTaskCount.textContent = tasks.length;
  if (activeTaskCount) activeTaskCount.textContent = tasks.filter(task => !task.completed).length;
  if (completedTaskCount) completedTaskCount.textContent = tasks.filter(task => task.completed).length;

  // Update task list if element exists
  if (taskList) {
    // Clear the task list
    taskList.innerHTML = '';

    // Add filtered tasks to the list
    filteredTasks.forEach(task => {
      const taskElement = createTaskElement(task);
      if (taskElement) {
        taskList.appendChild(taskElement);
      }
    });
  }

  // Update today's progress indicators
  updateTodayProgressIndicators(todayTasksList, todayCompletedList);
}

// Add the updateTodayProgressIndicators function
function updateTodayProgressIndicators(todayTasks, completedTasks) {
  // Update today's progress bar if it exists
  const progressBar = document.getElementById('todayProgress');
  const statsText = document.getElementById('todayStats');
  
  if (progressBar || statsText) {
    const todayTasksCount = todayTasks.length;
    const completedCount = completedTasks.length;
    const progressPercentage = todayTasksCount > 0 ? (completedCount / todayTasksCount) * 100 : 0;
    
    if (progressBar) {
      progressBar.style.width = `${progressPercentage}%`;
    }
    
    if (statsText) {
      statsText.textContent = `${completedCount}/${todayTasksCount} tasks completed`;
    }
  }
}

// Render weekly view
function renderWeekView() {
  // Get dates for the current week
  const weekDates = getWeekDates(currentWeek);
  
  // Clear all day columns
  document.querySelectorAll('.day-column .day-tasks').forEach(column => {
    column.innerHTML = '';
  });
  
  // Add tasks to the appropriate day columns
  weekDates.forEach((date, index) => {
    const formattedDate = formatDateForComparison(date);
    const dayTasks = tasks.filter(task => task.date === formattedDate);
    const dayColumn = document.querySelector(`.day-column[data-day="${index}"] .day-tasks`);
    
    dayTasks.forEach(task => {
      dayColumn.appendChild(createTaskElement(task));
    });
  });
}

// Render matrix view
function renderMatrixView() {
  // Clear all quadrants
  document.querySelectorAll('.matrix-quadrant .matrix-tasks').forEach(quadrant => {
    quadrant.innerHTML = '';
  });
  
  // Filter tasks by priority and add to appropriate quadrants
  const quadrant1Tasks = tasks.filter(task => task.priority === 'urgent-important');
  const quadrant2Tasks = tasks.filter(task => task.priority === 'not-urgent-important');
  const quadrant3Tasks = tasks.filter(task => task.priority === 'urgent-not-important');
  const quadrant4Tasks = tasks.filter(task => task.priority === 'not-urgent-not-important');
  
  const quadrant1 = document.querySelector('#quadrant1 .matrix-tasks');
  const quadrant2 = document.querySelector('#quadrant2 .matrix-tasks');
  const quadrant3 = document.querySelector('#quadrant3 .matrix-tasks');
  const quadrant4 = document.querySelector('#quadrant4 .matrix-tasks');
  
  quadrant1Tasks.forEach(task => {
    quadrant1.appendChild(createTaskElement(task));
  });
  
  quadrant2Tasks.forEach(task => {
    quadrant2.appendChild(createTaskElement(task));
  });
  
  quadrant3Tasks.forEach(task => {
    quadrant3.appendChild(createTaskElement(task));
  });
  
  quadrant4Tasks.forEach(task => {
    quadrant4.appendChild(createTaskElement(task));
  });
}

// Update stats
function updateStats() {
  // Calculate total stats
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const completionRate = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;
  
  // Update total stats display
  totalTasksEl.textContent = totalTasksCount;
  completedTasksEl.textContent = completedTasksCount;
  completionRateEl.textContent = `${completionRate}%`;
  
  // Update today's stats
  const today = new Date().toISOString().split('T')[0];
  const todayTasksList = tasks.filter(task => task.date === today);
  const todayCompletedCount = todayTasksList.filter(task => task.completed).length;
  const todayTasksCount = todayTasksList.length;
  const todayProgressPercentage = todayTasksCount > 0 ? (todayCompletedCount / todayTasksCount) * 100 : 0;
  
  todayProgress.style.width = `${todayProgressPercentage}%`;
  todayStats.textContent = `${todayCompletedCount}/${todayTasksCount} tasks completed`;
  
  // Find most productive day
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayTaskCounts = Array(7).fill(0);
  
  tasks.forEach(task => {
    if (task.completed) {
      const taskDate = new Date(task.date);
      const dayOfWeek = taskDate.getDay();
      dayTaskCounts[dayOfWeek]++;
    }
  });
  
  const maxTaskCount = Math.max(...dayTaskCounts);
  if (maxTaskCount > 0) {
    const mostProductiveIndex = dayTaskCounts.indexOf(maxTaskCount);
    mostProductiveDay.textContent = dayNames[mostProductiveIndex];
  } else {
    mostProductiveDay.textContent = '-';
  }
  
  // Update weekly goal progress
  weeklyGoalProgress.textContent = `${completionRate}%`;
}

// Initialize charts
function initializeCharts() {
  // Helper function to create or update a chart
  const createOrUpdateChart = (canvasId, chartType, chartKey, data, options) => {
    try {
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;
      
      // Destroy existing chart instance if it exists
      if (chartInstances[chartKey]) {
        chartInstances[chartKey].destroy();
      }
      
      // Create new chart
      const ctx = canvas.getContext('2d');
      if (ctx) {
        chartInstances[chartKey] = new Chart(ctx, {
          type: chartType,
          data: data,
          options: options || {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    } catch (error) {
      console.error(`Error creating ${chartKey}:`, error);
    }
  };

  // Update charts with current data
  updateCharts();
}

// Update all charts
function updateCharts() {
  try {
    // Helper function to get dates for the last 7 days
    const getLast7Days = () => {
      const dates = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }
      return dates;
    };

    // Helper function to get last 6 months
    const getLast6Months = () => {
      const months = [];
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
      
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setDate(1); // First day of month
        date.setMonth(date.getMonth() - i);
        months.push({
          date: new Date(date),
          label: `${monthNames[date.getMonth()]} ${date.getFullYear()}`
        });
      }
      return months;
    };

    const dates = getLast7Days();
    const completedCounts = dates.map(date => 
      tasks.filter(task => task.date === date && task.completed).length
    );

    // Daily Chart Data
    const dailyChartData = {
      labels: dates.map(date => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })),
      datasets: [{
        label: 'Tasks Completed',
        data: completedCounts,
        backgroundColor: '#3498db',
      }]
    };
    
    // Weekly Chart Data
    const weeks = [];
    for (let i = 3; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      weeks.push(weekStart);
    }
    
    const weeklyData = weeks.map(weekStart => {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      return tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate >= weekStart && taskDate <= weekEnd && task.completed;
      }).length;
    });
    
    const weeklyChartData = {
      labels: weeks.map(date => {
        const endDate = new Date(date);
        endDate.setDate(date.getDate() + 6);
        return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      }),
      datasets: [{
        label: 'Tasks Completed',
        data: weeklyData,
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        tension: 0.1,
        fill: true
      }]
    };
    
    // Monthly Chart Data
    const months = getLast6Months();
    const monthlyData = months.map(month => {
      const nextMonth = new Date(month.date);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      return tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate >= month.date && taskDate < nextMonth && task.completed;
      }).length;
    });
    
    const monthlyChartData = {
      labels: months.map(month => month.label),
      datasets: [{
        label: 'Tasks Completed',
        data: monthlyData,
        backgroundColor: '#3498db',
      }]
    };
    
    // Today's tasks for daily stats
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(task => task.date === today);
    const todayCompleted = todayTasks.filter(task => task.completed).length;
    
    // Daily Pie Chart Data
    const dailyPieData = {
      labels: ['Completed', 'Active'],
      datasets: [{
        data: [todayCompleted, Math.max(0, todayTasks.length - todayCompleted)],
        backgroundColor: ['#27ae60', '#e74c3c'],
      }]
    };
    
    // Weekly Pie Chart Data
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayTaskCounts = Array(7).fill(0);
    
    tasks.forEach(task => {
      if (task.completed) {
        const taskDate = new Date(task.date);
        const dayOfWeek = taskDate.getDay();
        dayTaskCounts[dayOfWeek]++;
      }
    });
    
    const weeklyPieData = {
      labels: dayNames,
      datasets: [{
        data: dayTaskCounts,
        backgroundColor: [
          '#1abc9c', '#2ecc71', '#3498db', 
          '#9b59b6', '#e74c3c', '#f1c40f', '#e67e22'
        ],
      }]
    };
    
    // Monthly Pie Chart Data - By Priority
    const priorityCounts = {
      'urgent-important': 0,
      'not-urgent-important': 0,
      'urgent-not-important': 0,
      'not-urgent-not-important': 0
    };
    
    tasks.forEach(task => {
      if (task.priority && priorityCounts.hasOwnProperty(task.priority)) {
        priorityCounts[task.priority]++;
      }
    });
    
    const monthlyPieData = {
      labels: [
        'Urgent & Important', 
        'Not Urgent but Important', 
        'Urgent but Not Important',
        'Not Urgent & Not Important'
      ],
      datasets: [{
        data: [
          priorityCounts['urgent-important'],
          priorityCounts['not-urgent-important'],
          priorityCounts['urgent-not-important'],
          priorityCounts['not-urgent-not-important']
        ],
        backgroundColor: [
          '#e74c3c', '#3498db', '#f1c40f', '#1abc9c'
        ],
      }]
    };
    
    // Update most productive week and priority focus
    updateMonthlyStats();
    
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 }
        }
      }
    };
    
    const pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              let value = context.raw || 0;
              let total = context.dataset.data.reduce((a, b) => a + b, 0);
              let percentage = total > 0 ? Math.round((value / total) * 100) : 0;
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    };
    
    // Create/update all charts (only if the elements exist)
    if (document.getElementById('dailyChart')) {
      updateChart('dailyChart', 'bar', 'dailyChart', dailyChartData, chartOptions);
    }
    
    if (document.getElementById('weeklyChart')) {
      updateChart('weeklyChart', 'line', 'weeklyChart', weeklyChartData, chartOptions);
    }
    
    if (document.getElementById('monthlyChart')) {
      updateChart('monthlyChart', 'bar', 'monthlyChart', monthlyChartData, chartOptions);
    }
    
    if (document.getElementById('dailyPieChart')) {
      updateChart('dailyPieChart', 'pie', 'dailyPieChart', dailyPieData, pieChartOptions);
    }
    
    if (document.getElementById('weeklyPieChart')) {
      updateChart('weeklyPieChart', 'pie', 'weeklyPieChart', weeklyPieData, pieChartOptions);
    }
    
    if (document.getElementById('monthlyPieChart')) {
      updateChart('monthlyPieChart', 'pie', 'monthlyPieChart', monthlyPieData, pieChartOptions);
    }
    
  } catch (error) {
    console.error("Error updating charts:", error);
  }
}

// Update the updateChart function to safely handle Chart.js
function updateChart(canvasId, chartType, chartKey, data, options) {
  try {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    // Check if Chart is defined
    if (typeof Chart === 'undefined') {
      console.error('Chart.js is not loaded');
      return;
    }
    
    // Destroy existing chart instance if it exists
    if (chartInstances[chartKey]) {
      chartInstances[chartKey].destroy();
    }
    
    // Create new chart
    const ctx = canvas.getContext('2d');
    if (ctx) {
      chartInstances[chartKey] = new Chart(ctx, {
        type: chartType,
        data: data,
        options: options || {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  } catch (error) {
    console.error(`Error updating ${chartKey}:`, error);
  }
}

// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Remove the redundant initializeMonthlyView function as we now handle it in init
// and update renderCalendar to work directly
function renderCalendar() {
  const calendarDays = document.getElementById('calendarDays');
  if (!calendarDays) return; // Exit if element not found
  
  const monthDisplayEl = document.getElementById('monthDisplay');
  
  // Clear previous calendar
  calendarDays.innerHTML = '';
  
  // Set month display
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
  monthDisplayEl.textContent = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
  
  // Calculate first day of the month
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const firstDayIndex = firstDay.getDay(); // 0 for Sunday
  
  // Calculate last day of the month
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const totalDays = lastDay.getDate();
  
  // Calculate last day of previous month
  const prevLastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
  const prevLastDayDate = prevLastDay.getDate();
  
  // Calculate days to show from next month
  const nextDays = 7 - ((firstDayIndex + totalDays) % 7 || 7);
  
  // Render days from previous month
  for (let i = firstDayIndex; i > 0; i--) {
      const dayEl = createCalendarDay(prevLastDayDate - i + 1, true);
      calendarDays.appendChild(dayEl);
  }
  
  // Render days of current month
  const today = new Date();
  for (let i = 1; i <= totalDays; i++) {
      const isToday = 
          i === today.getDate() && 
          currentMonth.getMonth() === today.getMonth() && 
          currentMonth.getFullYear() === today.getFullYear();
      
      const dayEl = createCalendarDay(i, false, isToday);
      
      // Add tasks for this day
      const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i).toISOString().split('T')[0];
      addTasksToCalendarDay(dayEl, dayDate);
      
      calendarDays.appendChild(dayEl);
  }
  
  // Render days from next month
  for (let i = 1; i <= nextDays; i++) {
      const dayEl = createCalendarDay(i, true);
      calendarDays.appendChild(dayEl);
  }
  
  // Update month summary
  updateMonthSummary();
}

function createCalendarDay(day, isOtherMonth, isToday = false) {
    const dayEl = document.createElement('div');
    dayEl.classList.add('calendar-day');
    
    if (isOtherMonth) {
        dayEl.classList.add('other-month');
    }
    
    if (isToday) {
        dayEl.classList.add('today');
    }
    
    const dateEl = document.createElement('div');
    dateEl.classList.add('calendar-date');
    dateEl.textContent = day;
    dayEl.appendChild(dateEl);
    
    const taskList = document.createElement('ul');
    taskList.classList.add('calendar-task-list');
    dayEl.appendChild(taskList);
    
    return dayEl;
}

function addTasksToCalendarDay(dayEl, dateStr) {
    const tasks = getTasks().filter(task => task.date === dateStr);
    const taskList = dayEl.querySelector('.calendar-task-list');
    
    if (tasks.length > 0) {
        // Add task count badge
        const countBadge = document.createElement('div');
        countBadge.classList.add('day-task-count');
        countBadge.textContent = tasks.length;
        dayEl.appendChild(countBadge);
        
        // Add tasks to the list (max 3)
        const maxToShow = Math.min(tasks.length, 3);
        for (let i = 0; i < maxToShow; i++) {
            const taskItem = document.createElement('li');
            taskItem.classList.add('calendar-task-item');
            if (tasks[i].completed) {
                taskItem.classList.add('completed');
            }
            taskItem.textContent = truncateText(tasks[i].text, 15);
            taskItem.setAttribute('data-id', tasks[i].id);
            taskList.appendChild(taskItem);
        }
        
        // Add "more" indicator if needed
        if (tasks.length > 3) {
            const moreItem = document.createElement('li');
            moreItem.classList.add('calendar-task-item');
            moreItem.textContent = `+${tasks.length - 3} more`;
            taskList.appendChild(moreItem);
        }
    }
}

function updateMonthSummary() {
    // Get current month's start and end dates
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    const startDateStr = startOfMonth.toISOString().split('T')[0];
    const endDateStr = endOfMonth.toISOString().split('T')[0];
    
    // Filter tasks for this month
    const tasks = getTasks().filter(task => {
        return task.date >= startDateStr && task.date <= endDateStr;
    });
    
    const completedTasks = tasks.filter(task => task.completed);
    
    // Update summary
    document.getElementById('monthTaskCount').textContent = tasks.length;
    document.getElementById('monthCompletedCount').textContent = completedTasks.length;
    document.getElementById('monthActiveCount').textContent = tasks.length - completedTasks.length;
}

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Update the refresh function
function refreshView() {
  const storedView = localStorage.getItem('currentView');
  if (storedView) {
    currentView = storedView;
    switchView(currentView);
  } else {
    renderDailyView();
    updateDailySummary();
  }
}

// Add updateDailySummary function
function updateDailySummary() {
  // Get today's date in YYYY-MM-DD format for comparison
  const today = new Date().toISOString().split('T')[0];
  
  // Count today's tasks
  const todayTasksList = tasks.filter(task => task.date === today);
  const todayCompletedList = todayTasksList.filter(task => task.completed);
  const todayActiveList = todayTasksList.filter(task => !task.completed);

  // Update task counts
  todayTaskCount.textContent = todayTasksList.length;
  todayCompletedCount.textContent = todayCompletedList.length;
  todayActiveCount.textContent = todayActiveList.length;
}

// Add the missing getTasks function
function getTasks() {
  return tasks;
}

// Add month navigation functions
function goToPrevMonth() {
  currentMonth.setMonth(currentMonth.getMonth() - 1);
  renderCalendar();
}

function goToNextMonth() {
  currentMonth.setMonth(currentMonth.getMonth() + 1);
  renderCalendar();
}

// Add a loadTasks function to handle loading tasks from localStorage
function loadTasks() {
  try {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
      console.log(`Loaded ${tasks.length} tasks from localStorage`);
    } else {
      console.log('No saved tasks found');
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
    tasks = [];
  }
}

// Add updateMonthlyStats function
function updateMonthlyStats() {
  try {
    // Find most productive week
    const weeksData = [];
    
    // Calculate for the last 4 weeks
    for (let i = 0; i < 4; i++) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() - (i * 7));
      
      const startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 6);
      
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      
      const weekTasks = tasks.filter(task => {
        const taskDate = task.date;
        return taskDate >= startDateStr && taskDate <= endDateStr && task.completed;
      });
      
      weeksData.push({
        week: i + 1,
        startDate: startDate,
        endDate: endDate,
        completedCount: weekTasks.length
      });
    }
    
    // Sort by number of completed tasks
    weeksData.sort((a, b) => b.completedCount - a.completedCount);
    
    // Update most productive week
    const mostProductiveWeekEl = document.getElementById('mostProductiveWeek');
    if (mostProductiveWeekEl && weeksData.length > 0 && weeksData[0].completedCount > 0) {
      const week = weeksData[0];
      mostProductiveWeekEl.textContent = `Week ${week.week}: ${week.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${week.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} (${week.completedCount} tasks)`;
    } else if (mostProductiveWeekEl) {
      mostProductiveWeekEl.textContent = 'No completed tasks yet';
    }
    
    // Find priority focus
    const priorityCounts = {
      'urgent-important': 0,
      'not-urgent-important': 0,
      'urgent-not-important': 0,
      'not-urgent-not-important': 0
    };
    
    tasks.forEach(task => {
      if (task.priority && priorityCounts.hasOwnProperty(task.priority)) {
        priorityCounts[task.priority]++;
      }
    });
    
    // Find highest priority
    let highestPriority = '';
    let highestCount = 0;
    
    for (const priority in priorityCounts) {
      if (priorityCounts[priority] > highestCount) {
        highestCount = priorityCounts[priority];
        highestPriority = priority;
      }
    }
    
    // Map priority to readable name
    const priorityNames = {
      'urgent-important': 'Urgent & Important',
      'not-urgent-important': 'Not Urgent but Important',
      'urgent-not-important': 'Urgent but Not Important',
      'not-urgent-not-important': 'Not Urgent & Not Important'
    };
    
    // Update priority focus
    const priorityFocusEl = document.getElementById('priorityFocus');
    if (priorityFocusEl && highestCount > 0) {
      priorityFocusEl.textContent = priorityNames[highestPriority];
    } else if (priorityFocusEl) {
      priorityFocusEl.textContent = 'No tasks yet';
    }
    
    // Update monthly goal progress
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    const monthlyGoalProgressEl = document.getElementById('monthlyGoalProgress');
    if (monthlyGoalProgressEl) {
      monthlyGoalProgressEl.textContent = `${progressPercentage}%`;
    }
  } catch (error) {
    console.error('Error updating monthly stats:', error);
  }
} 