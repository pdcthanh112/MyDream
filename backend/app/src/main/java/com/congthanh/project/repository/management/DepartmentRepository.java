package com.congthanh.project.repository.management;

import com.congthanh.project.entity.management.Department;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface DepartmentRepository extends JpaRepository<Department, Integer> {

}
