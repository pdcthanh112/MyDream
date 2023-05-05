package com.congthanh.project.service.management;

import com.congthanh.project.dto.management.DepartmentDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;

import java.util.List;

public interface DepartmentService {
    public List<DepartmentDTO> getAllDepartment();
}
