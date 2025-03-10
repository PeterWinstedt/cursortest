using Microsoft.AspNetCore.Mvc;
using TodoApp.Models;
using TodoApp.Services;

namespace TodoApp.Controllers;

[ApiController]
[Route("api/tasks")]
public class TaskController : ControllerBase
{
    private readonly TaskService _taskService;

    public TaskController(TaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    public IActionResult GetTasks() => Ok(_taskService.GetTasks());

    [HttpPost]
    public IActionResult AddTask([FromBody] TaskRequest request)
    {
        var task = _taskService.AddTask(request.Description);
        return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public IActionResult CompleteTask(int id)
    {
        var task = _taskService.CompleteTask(id);
        return task == null ? NotFound() : Ok(task);
    }
}

public record TaskRequest(string Description); 