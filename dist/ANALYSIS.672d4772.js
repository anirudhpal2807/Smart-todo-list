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
const currentMonth = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const monthlyCompleted = document.getElementById('monthlyCompleted');
const productiveWeek = document.getElementById('productiveWeek');
const priorityFocus = document.getElementById('priorityFocus');
const allTaskCount = document.getElementById('allTaskCount');
const activeTaskCount = document.getElementById('activeTaskCount');
const filterCompletedCount = document.getElementById('filterCompletedCount');
const todayTaskCount = document.getElementById('todayTaskCount');
const todayCompletedCount = document.getElementById('todayCompletedCount');
const todayActiveCount = document.getElementById('todayActiveCount');
// State
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let currentView = 'daily';
let currentWeek = new Date();
let currentMonthDate = new Date();
// Initialize Charts
let dailyChartInstance = new Chart(dailyChart, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Tasks Completed',
                data: [],
                backgroundColor: '#3498db'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});
let weeklyChartInstance = new Chart(weeklyChart, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Tasks Completed',
                data: [],
                borderColor: '#3498db',
                tension: 0.1
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});
let monthlyChartInstance = new Chart(monthlyChart, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Tasks Completed',
                data: [],
                borderColor: '#3498db',
                tension: 0.1,
                fill: true,
                backgroundColor: 'rgba(52, 152, 219, 0.1)'
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5
                }
            }
        }
    }
});
let dailyPieChartInstance = new Chart(dailyPieChart, {
    type: 'pie',
    data: {
        labels: [
            'Completed',
            'Active'
        ],
        datasets: [
            {
                data: [
                    0,
                    0
                ],
                backgroundColor: [
                    '#27ae60',
                    '#e74c3c'
                ]
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        let value = context.raw || 0;
                        let total = context.dataset.data.reduce((a, b)=>a + b, 0);
                        let percentage = total > 0 ? Math.round(value / total * 100) : 0;
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    }
});
let weeklyPieChartInstance = new Chart(weeklyPieChart, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [
                    '#1abc9c',
                    '#2ecc71',
                    '#3498db',
                    '#9b59b6',
                    '#e74c3c',
                    '#f1c40f',
                    '#e67e22'
                ]
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        let value = context.raw || 0;
                        let total = context.dataset.data.reduce((a, b)=>a + b, 0);
                        let percentage = total > 0 ? Math.round(value / total * 100) : 0;
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    }
});
let priorityPieChartInstance = new Chart(priorityPieChart, {
    type: 'pie',
    data: {
        labels: [
            'Urgent & Important',
            'Not Urgent but Important',
            'Urgent but Not Important',
            'Not Urgent & Not Important'
        ],
        datasets: [
            {
                data: [
                    0,
                    0,
                    0,
                    0
                ],
                backgroundColor: [
                    '#e74c3c',
                    '#2ecc71',
                    '#f1c40f',
                    '#95a5a6'
                ]
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        let value = context.raw || 0;
                        let total = context.dataset.data.reduce((a, b)=>a + b, 0);
                        let percentage = total > 0 ? Math.round(value / total * 100) : 0;
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    }
});
// Functions
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateStats();
    updateCharts();
    renderTasks();
}
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''} ${task.priority || ''}`;
    li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>
        <span class="task-date">${formatDate(task.date)}</span>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
    `;
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', ()=>toggleTask(task.id));
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', ()=>deleteTask(task.id));
    return li;
}
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
}
function formatMonthYear(date) {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });
}
function addTask(text, date, priority) {
    if (text.trim() === '') return;
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        date: date || new Date().toISOString().split('T')[0],
        priority: priority !== 'none' ? priority : ''
    };
    tasks.push(task);
    saveTasks();
    taskInput.value = '';
    taskDate.value = '';
    taskPriority.value = 'none';
}
function toggleTask(id) {
    tasks = tasks.map((task)=>{
        if (task.id === id) return {
            ...task,
            completed: !task.completed
        };
        return task;
    });
    saveTasks();
}
function deleteTask(id) {
    tasks = tasks.filter((task)=>task.id !== id);
    saveTasks();
}
function filterTasks(filter) {
    currentFilter = filter;
    renderTasks();
}
function switchView(view) {
    currentView = view;
    document.querySelectorAll('.view-btn').forEach((btn)=>{
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    document.querySelectorAll('.task-view').forEach((view)=>{
        view.classList.toggle('active', view.id === `${currentView}View`);
    });
    renderTasks();
}
function getWeekDates(date) {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return {
        start,
        end
    };
}
function updateWeekDisplay() {
    const { start, end } = getWeekDates(currentWeek);
    weekRange.textContent = `Week of ${formatDate(start.toISOString())} - ${formatDate(end.toISOString())}`;
}
function updateMonthDisplay() {
    currentMonth.textContent = formatMonthYear(currentMonthDate);
}
function getFirstAndLastDayOfMonth(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    return {
        firstDay,
        lastDay
    };
}
function renderTasks() {
    if (currentView === 'daily') renderDailyView();
    else if (currentView === 'weekly') renderWeeklyView();
    else if (currentView === 'matrix') renderMatrixView();
}
function renderDailyView() {
    taskList.innerHTML = '';
    let filteredTasks = tasks;
    if (currentFilter === 'active') filteredTasks = tasks.filter((task)=>!task.completed);
    else if (currentFilter === 'completed') filteredTasks = tasks.filter((task)=>task.completed);
    filteredTasks.forEach((task)=>{
        taskList.appendChild(createTaskElement(task));
    });
}
function renderWeeklyView() {
    const { start, end } = getWeekDates(currentWeek);
    const weekTasks = tasks.filter((task)=>{
        const taskDate = new Date(task.date);
        return taskDate >= start && taskDate <= end;
    });
    document.querySelectorAll('.day-column').forEach((column)=>{
        const dayTasks = weekTasks.filter((task)=>{
            const taskDate = new Date(task.date);
            return taskDate.getDay() === parseInt(column.dataset.day);
        });
        const taskList = column.querySelector('.day-tasks');
        taskList.innerHTML = '';
        dayTasks.forEach((task)=>{
            taskList.appendChild(createTaskElement(task));
        });
    });
}
function renderMatrixView() {
    // Clear all quadrants
    document.querySelectorAll('.matrix-tasks').forEach((list)=>{
        list.innerHTML = '';
    });
    // Filter active tasks only for the matrix
    const activeTasks = tasks.filter((task)=>!task.completed);
    // Group tasks by priority
    const quadrant1Tasks = activeTasks.filter((task)=>task.priority === 'urgent-important');
    const quadrant2Tasks = activeTasks.filter((task)=>task.priority === 'not-urgent-important');
    const quadrant3Tasks = activeTasks.filter((task)=>task.priority === 'urgent-not-important');
    const quadrant4Tasks = activeTasks.filter((task)=>task.priority === 'not-urgent-not-important');
    // Add tasks to their respective quadrants
    quadrant1Tasks.forEach((task)=>{
        document.querySelector('#quadrant1 .matrix-tasks').appendChild(createTaskElement(task));
    });
    quadrant2Tasks.forEach((task)=>{
        document.querySelector('#quadrant2 .matrix-tasks').appendChild(createTaskElement(task));
    });
    quadrant3Tasks.forEach((task)=>{
        document.querySelector('#quadrant3 .matrix-tasks').appendChild(createTaskElement(task));
    });
    quadrant4Tasks.forEach((task)=>{
        document.querySelector('#quadrant4 .matrix-tasks').appendChild(createTaskElement(task));
    });
}
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter((task)=>task.completed).length;
    const active = total - completed;
    const rate = total === 0 ? 0 : Math.round(completed / total * 100);
    // Update the main stats
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    completionRateEl.textContent = `${rate}%`;
    // Update the filter counts
    allTaskCount.textContent = total;
    activeTaskCount.textContent = active;
    filterCompletedCount.textContent = completed;
    // Update today's stats
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter((task)=>task.date === today);
    const todayCompleted = todayTasks.filter((task)=>task.completed).length;
    const todayTotal = todayTasks.length;
    const todayActive = todayTotal - todayCompleted;
    const todayRate = todayTotal === 0 ? 0 : Math.round(todayCompleted / todayTotal * 100);
    // Update progress bar
    todayProgress.style.width = `${todayRate}%`;
    todayStats.textContent = `${todayCompleted}/${todayTotal} tasks completed`;
    // Update daily summary counters
    todayTaskCount.textContent = todayTotal;
    todayCompletedCount.textContent = todayCompleted;
    todayActiveCount.textContent = todayActive;
    // Update monthly stats
    updateMonthlyStats();
}
function updateMonthlyStats() {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth(year, month);
    const monthTasks = tasks.filter((task)=>{
        const taskDate = new Date(task.date);
        return taskDate >= firstDay && taskDate <= lastDay;
    });
    const monthCompleted = monthTasks.filter((task)=>task.completed).length;
    monthlyCompleted.textContent = monthCompleted;
    // Find most productive week
    const weeks = [];
    let currentStart = new Date(firstDay);
    while(currentStart <= lastDay){
        const weekEnd = new Date(currentStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        const weekTasks = tasks.filter((task)=>{
            const taskDate = new Date(task.date);
            return taskDate >= currentStart && taskDate <= weekEnd && task.completed;
        });
        weeks.push({
            start: new Date(currentStart),
            end: new Date(weekEnd > lastDay ? lastDay : weekEnd),
            completed: weekTasks.length
        });
        currentStart.setDate(currentStart.getDate() + 7);
    }
    if (weeks.length > 0) {
        const mostProductive = weeks.reduce((prev, current)=>prev.completed > current.completed ? prev : current);
        if (mostProductive.completed > 0) productiveWeek.textContent = `${formatDate(mostProductive.start.toISOString())} - ${formatDate(mostProductive.end.toISOString())} (${mostProductive.completed})`;
        else productiveWeek.textContent = 'No tasks completed';
    } else productiveWeek.textContent = 'No data';
    // Find priority focus
    const priorityCounts = {
        'urgent-important': monthTasks.filter((t)=>t.priority === 'urgent-important').length,
        'not-urgent-important': monthTasks.filter((t)=>t.priority === 'not-urgent-important').length,
        'urgent-not-important': monthTasks.filter((t)=>t.priority === 'urgent-not-important').length,
        'not-urgent-not-important': monthTasks.filter((t)=>t.priority === 'not-urgent-not-important').length
    };
    const maxPriority = Object.entries(priorityCounts).reduce((a, b)=>a[1] > b[1] ? a : b, [
        'none',
        0
    ]);
    const priorityNames = {
        'urgent-important': 'Urgent & Important',
        'not-urgent-important': 'Not Urgent but Important',
        'urgent-not-important': 'Urgent but Not Important',
        'not-urgent-not-important': 'Not Urgent & Not Important',
        'none': 'None'
    };
    priorityFocus.textContent = maxPriority[1] > 0 ? `${priorityNames[maxPriority[0]]} (${maxPriority[1]})` : 'None';
}
function updateCharts() {
    updateDailyChart();
    updateWeeklyChart();
    updateMonthlyChart();
    updatePieCharts();
}
function updateDailyChart() {
    const last7Days = [
        ...Array(7)
    ].map((_, i)=>{
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
    }).reverse();
    const completedTasksByDay = last7Days.map((date)=>tasks.filter((task)=>task.completed && task.date === date).length);
    dailyChartInstance.data.labels = last7Days.map((date)=>new Date(date).toLocaleDateString('en-US', {
            weekday: 'short'
        }));
    dailyChartInstance.data.datasets[0].data = completedTasksByDay;
    dailyChartInstance.update();
}
function updateWeeklyChart() {
    const { start, end } = getWeekDates(currentWeek);
    const weekDays = [];
    const completedTasks = [];
    for(let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)){
        weekDays.push(formatDate(d.toISOString()));
        const dayTasks = tasks.filter((task)=>task.date === d.toISOString().split('T')[0] && task.completed);
        completedTasks.push(dayTasks.length);
    }
    weeklyChartInstance.data.labels = weekDays;
    weeklyChartInstance.data.datasets[0].data = completedTasks;
    weeklyChartInstance.update();
    // Update most productive day
    const maxTasks = Math.max(...completedTasks);
    const mostProductiveIndex = completedTasks.indexOf(maxTasks);
    mostProductiveDay.textContent = weekDays[mostProductiveIndex];
    // Update weekly goal progress
    const weeklyTotal = tasks.filter((task)=>{
        const taskDate = new Date(task.date);
        return taskDate >= start && taskDate <= end;
    }).length;
    const weeklyCompleted = tasks.filter((task)=>{
        const taskDate = new Date(task.date);
        return taskDate >= start && taskDate <= end && task.completed;
    }).length;
    const weeklyRate = weeklyTotal === 0 ? 0 : Math.round(weeklyCompleted / weeklyTotal * 100);
    weeklyGoalProgress.textContent = `${weeklyRate}%`;
}
function updateMonthlyChart() {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth(year, month);
    const daysInMonth = lastDay.getDate();
    const days = [];
    const completedByDay = [];
    for(let i = 1; i <= daysInMonth; i++){
        const day = new Date(year, month, i);
        days.push(i);
        const dayTasks = tasks.filter((task)=>task.date === day.toISOString().split('T')[0] && task.completed);
        completedByDay.push(dayTasks.length);
    }
    monthlyChartInstance.data.labels = days;
    monthlyChartInstance.data.datasets[0].data = completedByDay;
    monthlyChartInstance.update();
}
function updatePieCharts() {
    // Update daily pie chart (completed vs active tasks)
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter((task)=>task.date === today);
    const todayCompleted = todayTasks.filter((task)=>task.completed).length;
    const todayActive = todayTasks.length - todayCompleted;
    dailyPieChartInstance.data.datasets[0].data = [
        todayCompleted,
        todayActive
    ];
    dailyPieChartInstance.update();
    // Update weekly pie chart (tasks by day of week)
    const { start, end } = getWeekDates(currentWeek);
    const weekdayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    const tasksByDay = [
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];
    const weekTasks = tasks.filter((task)=>{
        const taskDate = new Date(task.date);
        return taskDate >= start && taskDate <= end;
    });
    weekTasks.forEach((task)=>{
        const day = new Date(task.date).getDay();
        tasksByDay[day]++;
    });
    // Only include days with tasks
    const filteredDays = [];
    const filteredCounts = [];
    tasksByDay.forEach((count, index)=>{
        if (count > 0) {
            filteredDays.push(weekdayNames[index]);
            filteredCounts.push(count);
        }
    });
    weeklyPieChartInstance.data.labels = filteredDays;
    weeklyPieChartInstance.data.datasets[0].data = filteredCounts;
    weeklyPieChartInstance.update();
    // Update priority pie chart
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth(year, month);
    const monthTasks = tasks.filter((task)=>{
        const taskDate = new Date(task.date);
        return taskDate >= firstDay && taskDate <= lastDay;
    });
    const priorityCounts = [
        monthTasks.filter((t)=>t.priority === 'urgent-important').length,
        monthTasks.filter((t)=>t.priority === 'not-urgent-important').length,
        monthTasks.filter((t)=>t.priority === 'urgent-not-important').length,
        monthTasks.filter((t)=>t.priority === 'not-urgent-not-important').length
    ];
    priorityPieChartInstance.data.datasets[0].data = priorityCounts;
    priorityPieChartInstance.update();
}
// Event Listeners
addTaskBtn.addEventListener('click', ()=>addTask(taskInput.value, taskDate.value, taskPriority.value));
taskInput.addEventListener('keypress', (e)=>{
    if (e.key === 'Enter') addTask(taskInput.value, taskDate.value, taskPriority.value);
});
filterBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        filterBtns.forEach((b)=>b.classList.remove('active'));
        btn.classList.add('active');
        filterTasks(btn.dataset.filter);
    });
});
viewBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        viewBtns.forEach((b)=>b.classList.remove('active'));
        btn.classList.add('active');
        switchView(btn.dataset.view);
    });
});
analyzerTabs.forEach((tab)=>{
    tab.addEventListener('click', ()=>{
        analyzerTabs.forEach((t)=>t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.analysis-view').forEach((view)=>{
            view.classList.toggle('active', view.id === `${tab.dataset.tab}Analysis`);
        });
    });
});
prevWeekBtn.addEventListener('click', ()=>{
    currentWeek.setDate(currentWeek.getDate() - 7);
    updateWeekDisplay();
    renderTasks();
    updateWeeklyChart();
});
nextWeekBtn.addEventListener('click', ()=>{
    currentWeek.setDate(currentWeek.getDate() + 7);
    updateWeekDisplay();
    renderTasks();
    updateWeeklyChart();
});
prevMonthBtn.addEventListener('click', ()=>{
    currentMonthDate.setMonth(currentMonthDate.getMonth() - 1);
    updateMonthDisplay();
    updateMonthlyStats();
    updateMonthlyChart();
    updatePieCharts();
});
nextMonthBtn.addEventListener('click', ()=>{
    currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
    updateMonthDisplay();
    updateMonthlyStats();
    updateMonthlyChart();
    updatePieCharts();
});
// Set initial date input to today
taskDate.value = new Date().toISOString().split('T')[0];
// Initial render
updateWeekDisplay();
updateMonthDisplay();
renderTasks();
updateStats();
updateCharts();

//# sourceMappingURL=ANALYSIS.672d4772.js.map
