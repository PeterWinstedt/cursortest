using System.Text.Json;
using TodoApp.Models;

namespace TodoApp.Services;

public class TaskService
{
    private List<TaskItem> _tasks = new();
    private int _nextId = 1;
    private readonly string _dataFilePath;
    private readonly IWebHostEnvironment _environment;

    public TaskService(IWebHostEnvironment environment)
    {
        _environment = environment;
        
        // Create separate data files for different environments
        string envName = _environment.EnvironmentName.ToLower();
        _dataFilePath = Path.Combine(_environment.ContentRootPath, $"tasks_{envName}.json");
        
        LoadTasksFromFile();
    }

    public List<TaskItem> GetTasks() => _tasks;

    public TaskItem AddTask(string description)
    {
        var task = new TaskItem { Id = _nextId++, Description = description, IsCompleted = false };
        _tasks.Add(task);
        SaveTasksToFile();
        return task;
    }

    public TaskItem? CompleteTask(int id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task != null)
        {
            task.IsCompleted = true;
            SaveTasksToFile();
        }
        return task;
    }

    private void LoadTasksFromFile()
    {
        if (File.Exists(_dataFilePath))
        {
            try
            {
                string json = File.ReadAllText(_dataFilePath);
                var savedData = JsonSerializer.Deserialize<TasksData>(json);
                if (savedData != null)
                {
                    _tasks = savedData.Tasks;
                    _nextId = savedData.NextId;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading tasks: {ex.Message}");
                // In case of errors, start with an empty list
                _tasks = new List<TaskItem>();
                _nextId = 1;
            }
        }
    }

    private void SaveTasksToFile()
    {
        try
        {
            var data = new TasksData
            {
                Tasks = _tasks,
                NextId = _nextId
            };
            
            string json = JsonSerializer.Serialize(data, new JsonSerializerOptions
            {
                WriteIndented = true
            });
            
            File.WriteAllText(_dataFilePath, json);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error saving tasks: {ex.Message}");
        }
    }
}

// Helper class for serialization
public class TasksData
{
    public List<TaskItem> Tasks { get; set; } = new();
    public int NextId { get; set; } = 1;
} 