package com.congthanh.project.serviceImplement.management;

import com.congthanh.project.dto.management.DepartmentDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.management.Department;
import com.congthanh.project.repository.management.DepartmentRepository;
import com.congthanh.project.service.management.DepartmentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentServiceImplement implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<DepartmentDTO> getAllDepartment() {
        List<Department> list = departmentRepository.findAll();
        List<DepartmentDTO> result = new ArrayList<>();
        for (Department department: list) {
            DepartmentDTO departmentDTO = modelMapper.map(department, DepartmentDTO.class);
            result.add(departmentDTO);
        }
        return result;
    }
}
