# Tasks API

The Tasks API allows you to create, read, update, and delete tasks in the TodoList Analyzer.

## Get All Tasks

Retrieves a list of tasks for the authenticated user.

**Request**

```
GET /api/v1/tasks
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `filter[status]` | string | Filter by status: `active`, `completed`, `archived` |
| `filter[priority]` | string | Filter by priority: `low`, `medium`, `high`, `urgent` |
| `filter[category_id]` | integer | Filter by category ID |
| `filter[due_date_start]` | date | Filter by due date start (format: YYYY-MM-DD) |
| `filter[due_date_end]` | date | Filter by due date end (format: YYYY-MM-DD) |
| `search` | string | Search in task title and description |
| `sort` | string | Sort by field: `created_at`, `updated_at`, `due_date`, `priority`, `title` (prefix with `-` for descending) |
| `page` | integer | Page number for pagination |
| `per_page` | integer | Number of items per page (max: 100) |

### Response

```json
{
  "data": [
    {
      "id": 123,
      "title": "Complete project proposal",
      "description": "Draft the proposal for the new client project",
      "status": "active",
      "priority": "high",
      "due_date": "2023-06-15T00:00:00Z",
      "estimated_time": 120,
      "category_id": 2,
      "category": {
        "id": 2,
        "name": "Work",
        "color": "#ff5722"
      },
      "tags": ["proposal", "client"],
      "is_recurring": false,
      "has_subtasks": true,
      "created_at": "2023-06-01T14:30:00Z",
      "updated_at": "2023-06-02T09:15:00Z"
    },
    // ... more tasks
  ],
  "meta": {
    "request_id": "req_123456",
    "timestamp": "2023-06-05T12:00:00Z"
  },
  "pagination": {
    "total": 45,
    "per_page": 20,
    "current_page": 1,
    "last_page": 3,
    "next_page_url": "/api/v1/tasks?page=2",
    "prev_page_url": null
  }
}
```

## Get a Specific Task

Retrieves a single task by ID.

**Request**

```
GET /api/v1/tasks/{task_id}
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `task_id` | integer | The ID of the task |

### Response

```json
{
  "data": {
    "id": 123,
    "title": "Complete project proposal",
    "description": "Draft the proposal for the new client project",
    "status": "active",
    "priority": "high",
    "due_date": "2023-06-15T00:00:00Z",
    "estimated_time": 120,
    "actual_time": 90,
    "category_id": 2,
    "category": {
      "id": 2,
      "name": "Work",
      "color": "#ff5722"
    },
    "tags": ["proposal", "client"],
    "is_recurring": false,
    "recurring_pattern": null,
    "parent_task_id": null,
    "subtasks": [
      {
        "id": 124,
        "title": "Research competitors",
        "status": "completed",
        "due_date": "2023-06-10T00:00:00Z"
      },
      {
        "id": 125,
        "title": "Create presentation slides",
        "status": "active",
        "due_date": "2023-06-14T00:00:00Z"
      }
    ],
    "attachments": [
      {
        "id": 45,
        "filename": "requirements.pdf",
        "size": 1024000,
        "mime_type": "application/pdf",
        "url": "https://api.todolist-analyzer.com/v1/attachments/45"
      }
    ],
    "dependencies": [
      {
        "id": 120,
        "title": "Initial client meeting",
        "status": "completed"
      }
    ],
    "notes": "Client prefers a focus on cost-saving measures",
    "created_at": "2023-06-01T14:30:00Z",
    "updated_at": "2023-06-02T09:15:00Z",
    "completed_at": null
  },
  "meta": {
    "request_id": "req_789012",
    "timestamp": "2023-06-05T12:05:00Z"
  }
}
```

## Create a New Task

Creates a new task.

**Request**

```
POST /api/v1/tasks
```

### Request Body

```json
{
  "title": "Prepare client presentation",
  "description": "Create slides for the quarterly meeting",
  "status": "active",
  "priority": "high",
  "due_date": "2023-07-10T15:00:00Z",
  "estimated_time": 180,
  "category_id": 2,
  "tags": ["presentation", "quarterly", "meeting"],
  "is_recurring": false,
  "parent_task_id": null,
  "dependencies": [122, 123]
}
```

### Required Fields

- `title`: string

### Optional Fields

- `description`: string
- `status`: string (default: "active")
- `priority`: string (one of: "low", "medium", "high", "urgent", default: "medium")
- `due_date`: ISO 8601 date-time string
- `estimated_time`: integer (minutes)
- `category_id`: integer
- `tags`: array of strings
- `is_recurring`: boolean (default: false)
- `recurring_pattern`: object (required if is_recurring is true)
  - `frequency`: string (one of: "daily", "weekly", "monthly", "yearly")
  - `interval`: integer
  - `end_date`: ISO 8601 date-time string (optional)
  - `count`: integer (optional)
- `parent_task_id`: integer (optional, for subtasks)
- `dependencies`: array of task IDs

### Response

```json
{
  "data": {
    "id": 130,
    "title": "Prepare client presentation",
    "description": "Create slides for the quarterly meeting",
    "status": "active",
    "priority": "high",
    "due_date": "2023-07-10T15:00:00Z",
    "estimated_time": 180,
    "category_id": 2,
    "category": {
      "id": 2,
      "name": "Work",
      "color": "#ff5722"
    },
    "tags": ["presentation", "quarterly", "meeting"],
    "is_recurring": false,
    "recurring_pattern": null,
    "parent_task_id": null,
    "subtasks": [],
    "attachments": [],
    "dependencies": [
      {
        "id": 122,
        "title": "Gather quarterly data",
        "status": "active"
      },
      {
        "id": 123,
        "title": "Complete project proposal",
        "status": "active"
      }
    ],
    "created_at": "2023-06-05T12:10:00Z",
    "updated_at": "2023-06-05T12:10:00Z"
  },
  "meta": {
    "request_id": "req_789013",
    "timestamp": "2023-06-05T12:10:00Z"
  }
}
```

### Error Responses

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `missing_required_field` | A required field is missing |
| 400 | `invalid_field_value` | A field has an invalid value |
| 404 | `category_not_found` | The specified category does not exist |
| 404 | `dependency_not_found` | One or more dependency tasks do not exist |
| 409 | `circular_dependency` | The dependencies would create a circular reference |

## Update a Task

Updates an existing task.

**Request**

```
PUT /api/v1/tasks/{task_id}
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `task_id` | integer | The ID of the task to update |

### Request Body

```json
{
  "title": "Prepare quarterly client presentation",
  "priority": "urgent",
  "status": "active",
  "due_date": "2023-07-09T15:00:00Z"
}
```

Only include the fields you want to update. All other fields will remain unchanged.

### Response

```json
{
  "data": {
    "id": 130,
    "title": "Prepare quarterly client presentation",
    "description": "Create slides for the quarterly meeting",
    "status": "active",
    "priority": "urgent",
    "due_date": "2023-07-09T15:00:00Z",
    "estimated_time": 180,
    "category_id": 2,
    "category": {
      "id": 2,
      "name": "Work",
      "color": "#ff5722"
    },
    "tags": ["presentation", "quarterly", "meeting"],
    "is_recurring": false,
    "recurring_pattern": null,
    "parent_task_id": null,
    "subtasks": [],
    "attachments": [],
    "dependencies": [
      {
        "id": 122,
        "title": "Gather quarterly data",
        "status": "active"
      },
      {
        "id": 123,
        "title": "Complete project proposal",
        "status": "active"
      }
    ],
    "created_at": "2023-06-05T12:10:00Z",
    "updated_at": "2023-06-05T12:15:00Z"
  },
  "meta": {
    "request_id": "req_789014",
    "timestamp": "2023-06-05T12:15:00Z"
  }
}
```

## Delete a Task

Deletes a task.

**Request**

```
DELETE /api/v1/tasks/{task_id}
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `task_id` | integer | The ID of the task to delete |

### Response

```json
{
  "data": {
    "success": true,
    "message": "Task deleted successfully"
  },
  "meta": {
    "request_id": "req_789015",
    "timestamp": "2023-06-05T12:20:00Z"
  }
}
```

### Error Responses

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 404 | `task_not_found` | The specified task does not exist |
| 403 | `task_has_dependencies` | Other tasks depend on this task |

## Complete a Task

Marks a task as completed.

**Request**

```
POST /api/v1/tasks/{task_id}/complete
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `task_id` | integer | The ID of the task to complete |

### Request Body

```json
{
  "actual_time": 160,
  "notes": "Added additional slides for budget section"
}
```

### Optional Fields

- `actual_time`: integer (minutes spent on the task)
- `notes`: string (additional completion notes)

### Response

```json
{
  "data": {
    "id": 130,
    "title": "Prepare quarterly client presentation",
    "status": "completed",
    "actual_time": 160,
    "notes": "Added additional slides for budget section",
    "completed_at": "2023-06-05T12:25:00Z",
    "updated_at": "2023-06-05T12:25:00Z"
  },
  "meta": {
    "request_id": "req_789016",
    "timestamp": "2023-06-05T12:25:00Z"
  }
}
```

## Batch Operations

Perform operations on multiple tasks at once.

**Request**

```
POST /api/v1/tasks/batch
```

### Request Body

```json
{
  "operation": "update",
  "task_ids": [130, 131, 132],
  "data": {
    "category_id": 3,
    "priority": "high"
  }
}
```

### Supported Operations

- `update`: Update multiple tasks with the same data
- `delete`: Delete multiple tasks
- `complete`: Mark multiple tasks as completed

### Response

```json
{
  "data": {
    "success": true,
    "affected_tasks": 3,
    "failed_tasks": []
  },
  "meta": {
    "request_id": "req_789017",
    "timestamp": "2023-06-05T12:30:00Z"
  }
}
```

## Error Codes

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | `invalid_request` | The request was invalid |
| 400 | `missing_required_field` | A required field is missing |
| 400 | `invalid_field_value` | A field has an invalid value |
| 403 | `permission_denied` | You don't have permission for this operation |
| 404 | `task_not_found` | The specified task does not exist |
| 404 | `category_not_found` | The specified category does not exist |
| 409 | `circular_dependency` | The dependencies would create a circular reference |
| 429 | `rate_limit_exceeded` | You've exceeded the rate limit |

## Webhook Events

The following webhook events are available for tasks:

- `task.created`: Triggered when a new task is created
- `task.updated`: Triggered when a task is updated
- `task.deleted`: Triggered when a task is deleted
- `task.completed`: Triggered when a task is marked as completed