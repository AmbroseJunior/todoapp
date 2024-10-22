package com.nnamdicodes.todoapp.repository;

import com.nnamdicodes.todoapp.model.task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository

public interface TaskRepository extends JpaRepository<task, Long> {
    @Query("SELECT t FROM task t WHERE " +
            "LOWER(t.taskName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.status) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<task> findTaskByKeyword(@Param("keyword") String keyword);
}
