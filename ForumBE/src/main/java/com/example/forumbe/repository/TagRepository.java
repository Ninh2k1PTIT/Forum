package com.example.forumbe.repository;

import com.example.forumbe.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query(value = "SELECT * FROM Tags t WHERE t.name LIKE %:name% ", nativeQuery = true)
    List<Tag> findByName(@Param("name") String name);
}
