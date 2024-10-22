package com.nnamdicodes.todoapp.controller;

import com.nnamdicodes.todoapp.exception.TaskNotFoundException;
import com.nnamdicodes.todoapp.model.task;
import com.nnamdicodes.todoapp.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("/task/filter")
    public List<task> filterTasks(@RequestParam("keyword") String keyword) {
        return taskRepository.findTaskByKeyword(keyword);
    }

    @PostMapping("/task")
    task newTask(@RequestBody task newTask) {
        return taskRepository.save(newTask);
    }

    @GetMapping("/tasks")
    List<task> getAllTasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/task/{id}")
    task getTaskById(@PathVariable("id") Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
    }

    @PutMapping("/user/{id}")
    task updateTask(@PathVariable("id") Long id, @RequestBody task newTask) {
        return taskRepository.findById(id).map(task -> {
            task.setTaskName(newTask.getTaskName());
            task.setDescription(newTask.getDescription());
            task.setStatus(newTask.getStatus());
            task.setDueDate(newTask.getDueDate());
            return taskRepository.save(task);
        }).orElseThrow(() -> new TaskNotFoundException(id));
    }

    @DeleteMapping("/task/{id}")
    String deleteTask(@PathVariable("id") Long id) {
        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException(id);
        }
        taskRepository.deleteById(id);
        return "Task" + id + " has been deleted";
    }


}