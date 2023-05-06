package com.congthanh.project.service.management;

import com.congthanh.project.dto.management.DepartmentDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.management.Department;

import java.util.List;

public interface DepartmentService {
    public List<DepartmentDTO> getAllDepartment();

    public Department createDepartment(DepartmentDTO departmentDTO);

    public Department updateDepartment(DepartmentDTO departmentDTO);

    public boolean deleteDepartment(int id);
}
