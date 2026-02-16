package com.example.demo.controller;

import com.example.demo.dto.Todo;
import com.example.demo.repository.TodoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class TodoController {
    private TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @GetMapping("/todos")
    public List<Todo> getTodos() {
        List<Todo> todoList = (List<Todo>) todoRepository.findAll();
        // sort by order number
        todoList = todoList.stream()
                .sorted(Comparator.comparingInt(Todo::getOrderNumber)).collect(Collectors.toList());
        return todoList;
    }

    @PostMapping("/todos")
    void saveTodo(@RequestBody Todo todo) {
        if (todo.getOrderNumber() == 0) {
            // get the latest order number
            int lastestOrderNumber = getTodos().stream()
                    .mapToInt(Todo::getOrderNumber)
                    .max()
                    .orElse(0);
            todo.setOrderNumber(lastestOrderNumber + 1);
        }
        if (todo.getName() != null) {
            todoRepository.save(todo);
        }
    }

    @GetMapping("/todos/{id}")
    public Todo getTodo(@PathVariable Long id) {
        return todoRepository.findById(id).orElse(new Todo());
    }

    @DeleteMapping("/todos/{id}")
    public void deleteTodo(@PathVariable Long id) {
        if (id != null && id > 0) {
            Todo todo = todoRepository.findById(id).orElse(new Todo());
            final int orderNumber = todo.getOrderNumber();
            todoRepository.deleteById(id);
            // reorder the remaining list starting from the last order number
            // might be simpler to do with SQL like UPDATE todo SET ordernumber = ordernumber + 1 where ordernumber > :ordernumber;
            List<Todo> todoList = (List<Todo>) todoRepository.findAll();
            todoList.stream()
                    .filter(t -> t.getOrderNumber() > orderNumber)
                    .forEach(t -> {
                        t.setOrderNumber(t.getOrderNumber() - 1);
                        todoRepository.save(t);
                    });
        }
    }

    @GetMapping("/todos/{id1}/{id2}")
    public void swap(@PathVariable Long id1, @PathVariable Long id2) {
        Todo todo1 = todoRepository.findById(id1).orElse(new Todo());
        Todo todo2 = todoRepository.findById(id2).orElse(new Todo());
        if (todo1.getOrderNumber() > 0 && todo2.getOrderNumber() > 0) {
            // swap the order numbers
            int temp = todo1.getOrderNumber();
            todo1.setOrderNumber(todo2.getOrderNumber());
            todo2.setOrderNumber(temp);

            todoRepository.save(todo1);
            todoRepository.save(todo2);
        }
    }
}