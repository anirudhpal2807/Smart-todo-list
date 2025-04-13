# API Documentation

This section provides comprehensive documentation for the TodoList Analyzer API, allowing developers to integrate with and extend the application.

## Overview

The TodoList Analyzer API is a RESTful API that provides programmatic access to tasks, categories, analysis data, and user settings. It enables developers to:

- Create, read, update, and delete tasks
- Access and manipulate task categories
- Retrieve analysis and productivity metrics
- Manage user settings and preferences

## API Versions

| Version | Status | Support End Date |
|---------|--------|------------------|
| v1      | Active | TBD              |
| Beta    | Testing| N/A              |

## Authentication

All API requests require authentication. The API supports:

- Bearer token authentication
- OAuth 2.0 
- API keys (for service accounts)

See the [Authentication Guide](authentication.md) for detailed instructions.

## Base URL

```
https://api.todolist-analyzer.com/v1
```

For testing and development:
```
https://api-dev.todolist-analyzer.com/v1
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute for free accounts
- 1000 requests per minute for premium accounts

Rate limit headers are included in API responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1605138972
```

## Available Endpoints

### Tasks

| Endpoint | Method | Description |
|----------|--------|-------------|
| [/tasks](endpoints/tasks.md) | GET | List all tasks |
| /tasks | POST | Create a new task |
| /tasks/{id} | GET | Get a specific task |
| /tasks/{id} | PUT | Update a task |
| /tasks/{id} | DELETE | Delete a task |
| /tasks/batch | POST | Batch operations on tasks |

### Categories

| Endpoint | Method | Description |
|----------|--------|-------------|
| [/categories](endpoints/categories.md) | GET | List all categories |
| /categories | POST | Create a new category |
| /categories/{id} | GET | Get a specific category |
| /categories/{id} | PUT | Update a category |
| /categories/{id} | DELETE | Delete a category |

### Analysis

| Endpoint | Method | Description |
|----------|--------|-------------|
| [/analysis/summary](endpoints/analysis.md) | GET | Get productivity summary |
| /analysis/completion | GET | Get task completion statistics |
| /analysis/trends | GET | Get productivity trends |
| /analysis/custom | POST | Run a custom analysis query |

### Users

| Endpoint | Method | Description |
|----------|--------|-------------|
| [/user](endpoints/user.md) | GET | Get user profile |
| /user | PUT | Update user profile |
| /user/settings | GET | Get user settings |
| /user/settings | PUT | Update user settings |

### System

| Endpoint | Method | Description |
|----------|--------|-------------|
| [/system/status](endpoints/system.md) | GET | Get API status |
| /system/version | GET | Get API version information |

## Response Format

All API responses are in JSON format and follow this structure:

```json
{
  "data": { /* response data */ },
  "meta": {
    "request_id": "req_123456",
    "timestamp": "2023-06-01T12:00:00Z"
  },
  "pagination": {
    "total": 100,
    "per_page": 20,
    "current_page": 1,
    "last_page": 5,
    "next_page_url": "/api/tasks?page=2",
    "prev_page_url": null
  }
}
```

Error responses include additional information:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Missing required field: title",
    "details": { /* additional error info */ }
  },
  "meta": {
    "request_id": "req_123456",
    "timestamp": "2023-06-01T12:00:00Z"
  }
}
```

## Pagination

List endpoints support pagination with these query parameters:

- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 20, max: 100)

## Filtering

Most list endpoints support filtering with these query parameters:

- `filter[field]`: Filter by field value
- `search`: Search across all searchable fields
- `sort`: Field to sort by (prefix with - for descending order)

Example:
```
/api/tasks?filter[status]=active&filter[priority]=high&sort=-due_date
```

## SDK Libraries

We provide official SDK libraries for popular programming languages:

- [JavaScript/TypeScript](https://github.com/yourusername/todolist-analyzer-js)
- [Python](https://github.com/yourusername/todolist-analyzer-python)
- [PHP](https://github.com/yourusername/todolist-analyzer-php)

## Webhooks

The API supports webhooks for event notifications. See the [Webhooks Guide](webhooks.md) for setup instructions.

## Changelog

See the [API Changelog](changelog.md) for recent changes and updates.

## Support

For API support:

- Email: api-support@todolist-analyzer.com
- Developer Forum: [dev.todolist-analyzer.com](https://dev.todolist-analyzer.com)
- Issue Tracker: [GitHub Issues](https://github.com/yourusername/todolist-analyzer/issues) 