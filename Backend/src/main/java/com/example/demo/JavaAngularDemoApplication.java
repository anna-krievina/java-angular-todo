package com.example.demo;

import com.example.demo.dto.Todo;
import com.example.demo.repository.TodoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class JavaAngularDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(JavaAngularDemoApplication.class, args);
	}

	@Bean
	CommandLineRunner init(TodoRepository todoRepository) {
		return args -> {
			String[] todos = { "Laundry", "Shopping", "Gaming", "Eating", "Work" };

			for (int i = 0; i < todos.length; i++) {
				Todo todo = new Todo();
				todo.setName(todos[i]);
				todo.setOrderNumber(i + 1);
				todoRepository.save(todo);
			}
		};
	}
}
