# User Guide: TodoList Analyzer

This guide will help you navigate and utilize all features of the TodoList Analyzer application effectively.

## Getting Started

### First Login

1. Open the application in your browser at `http://localhost:4200` (local) or at the deployed URL
2. You'll be presented with a login/signup screen
3. Create an account or use the demo mode by clicking "Try Demo"

### Dashboard Overview

The main dashboard is divided into these sections:

- **Task List**: Your current tasks, organized by due date
- **Quick Add**: Rapidly add new tasks
- **Analysis Panel**: Overview of your productivity metrics
- **Categories**: Filter tasks by different categories
- **Calendar View**: See tasks in calendar format

## Managing Tasks

### Creating Tasks

To create a new task:

1. Click the "+ New Task" button or use the Quick Add panel
2. Enter task title (required)
3. Set additional information (optional):
   - **Description**: Detailed information about the task
   - **Category**: Assign to a category (Work, Personal, etc.)
   - **Priority**: Set importance (Low, Medium, High, Urgent)
   - **Due Date**: When the task should be completed
   - **Estimated Time**: How long you expect the task to take
   - **Subtasks**: Break down complex tasks into smaller steps

### Managing Existing Tasks

- **Complete a Task**: Click the checkbox next to any task
- **Edit a Task**: Click the task title or the edit (pencil) icon
- **Delete a Task**: Click the delete (trash) icon next to the task
- **Reorder Tasks**: Drag and drop tasks to reorder within their lists

### Using Categories

Categories help organize your tasks by type:

1. **Default Categories**: Work, Personal, Health, Shopping, Learning
2. **Create Custom Category**:
   - Go to Settings → Categories
   - Click "Add New Category"
   - Enter name and select color
   - Click "Save"
3. **Assign to Task**:
   - When creating/editing a task, select category from dropdown
   - Or drag a task to a category in the sidebar

### Setting Priorities

Priority levels help you focus on what matters most:

- **Low (Blue)**: Tasks that can wait
- **Medium (Yellow)**: Normal priority tasks
- **High (Orange)**: Important tasks that need attention soon
- **Urgent (Red)**: Critical tasks requiring immediate attention

To set priority:
1. When creating/editing a task, select from the priority dropdown
2. Alternatively, right-click a task to quickly change priority

## Advanced Features

### Recurring Tasks

For tasks that repeat regularly:

1. When creating/editing a task, toggle "Make recurring"
2. Select frequency: Daily, Weekly, Monthly, Custom
3. Set end date or number of occurrences (optional)
4. Click "Save"

### Task Dependencies

Link tasks that depend on each other:

1. Edit a task
2. Scroll to "Dependencies" section
3. Search for and select prerequisite tasks
4. Click "Save"

Dependent tasks will be marked and can't be completed until prerequisites are done.

### Batch Operations

Perform actions on multiple tasks:

1. Hold Ctrl/Cmd while clicking tasks to select multiple
2. Right-click and choose:
   - Complete All
   - Delete All
   - Change Category
   - Change Priority
   - Set Due Date

### Filters and Sorting

Customize your task view:

1. Click "Filter" in the main toolbar
2. Set filters:
   - By category
   - By priority
   - By due date range
   - By completion status
3. Sort by:
   - Due date
   - Priority
   - Creation date
   - Alphabetical
   - Custom order

### Task Templates

Save time with templates for recurring task types:

1. Create a task with all desired attributes
2. Click "⋮" (more options) and select "Save as Template"
3. Name your template
4. To use: Click "+ New Task" and select "From Template"

## Analysis Features

### Productivity Dashboard

Access detailed analysis:

1. Click "Analysis" in the main navigation
2. View default reports:
   - Task completion rate
   - Priority distribution
   - Category breakdown
   - Time to completion trends

### Custom Reports

Create personalized analysis views:

1. Go to Analysis → Custom Reports
2. Click "New Report"
3. Select metrics and dimensions
4. Choose visualization type
5. Save report with custom name

For more details on analysis features, see [ANALYSIS_FEATURES.md](./ANALYSIS_FEATURES.md).

## Settings and Customization

### Appearance

Customize the look and feel:

1. Go to Settings → Appearance
2. Choose theme (Light, Dark, System)
3. Select accent color
4. Adjust text size
5. Toggle compact view

### Notifications

Set up reminders:

1. Go to Settings → Notifications
2. Toggle notifications on/off
3. Configure:
   - Due date reminders (how far in advance)
   - Daily digest of upcoming tasks
   - Milestone celebrations

### Data Management

Manage your task data:

1. Go to Settings → Data
2. Options:
   - Export data (CSV, JSON)
   - Import tasks
   - Clear completed tasks
   - Reset all data

## Keyboard Shortcuts

Increase productivity with keyboard shortcuts:

- **N**: New task
- **E**: Edit selected task
- **Delete**: Delete selected task
- **Space**: Complete/uncomplete selected task
- **↑/↓**: Navigate between tasks
- **Ctrl+F**: Open search
- **Tab**: Cycle through sections
- **Ctrl+S**: Save current changes
- **F1**: Open this help guide

## Mobile Use

The TodoList Analyzer is fully responsive for mobile devices:

- Swipe right on a task to complete
- Swipe left to delete
- Tap and hold for more options
- Use the bottom navigation bar for section access

## Troubleshooting

### Common Issues

- **Tasks not saving**: Check your internet connection
- **Analysis not updating**: Try refreshing the page
- **Categories missing**: Check if they're hidden in filter settings

### Data Recovery

If you accidentally delete data:

1. Go to Settings → Data → Recovery
2. Select the "Restore from backup" option
3. Choose a backup point from the last 30 days

## Getting Help

If you need additional assistance:

- Click the "?" icon in the top corner for contextual help
- Check the documentation at [docs/](./index.md)
- Submit issues on GitHub 