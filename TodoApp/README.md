# To-Do List Application

A simple, responsive To-Do List application built with ASP.NET Core 9 and vanilla JavaScript.

## Features

- Add new tasks
- View all tasks
- Mark tasks as completed
- Responsive design that works on both desktop and mobile devices

## Technology Stack

- Backend: .NET 9 with C# (ASP.NET Core Web API)
- Frontend: HTML, JavaScript, CSS
- Data Storage: In-memory list (could be extended to use a database or JSON file)

## Project Structure

- `Models/` - Contains the data models (TaskItem)
- `Controllers/` - Contains the API controllers
- `Services/` - Contains business logic
- `wwwroot/` - Contains frontend files (HTML, CSS, JavaScript)

## API Endpoints

| Method | Endpoint     | Description             | Request Body                  | Response Body           |
|--------|--------------|-------------------------|-------------------------------|-------------------------|
| GET    | /api/tasks   | Retrieve all tasks      | None                          | List of tasks (JSON)    |
| POST   | /api/tasks   | Add a new task          | { "description": <string> }   | New task (JSON)         |
| PUT    | /api/tasks/{id} | Mark a task as completed | None                     | Updated task (JSON)     |

## Running the Application

1. Make sure you have .NET 9 SDK installed
2. Clone this repository
3. Navigate to the project directory
4. Run the following command:

```
dotnet run
```

5. Open your browser and go to `http://localhost:5000`

## Future Enhancements

- Task deletion functionality
- Due dates for tasks
- Task categories/tags
- User authentication
- Persistent storage with a database 