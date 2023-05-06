package com.congthanh.project.serviceImplement.management;

import com.congthanh.project.constant.common.Status;
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
import java.util.Optional;

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
        for (Department department : list) {
            DepartmentDTO departmentDTO = modelMapper.map(department, DepartmentDTO.class);
            result.add(departmentDTO);
        }
        return result;
    }

    @Override
    public Department createDepartment(DepartmentDTO departmentDTO) {
        Optional<Department> existDepartment = departmentRepository.findByName(departmentDTO.getName());
        if (existDepartment.isPresent()) {
            throw new RuntimeException("Department ton tai");
        } else {
            Department department = Department.builder()
                    .name(departmentDTO.getName())
                    .status(Status.STATUS_ACTIVE)
                    .build();
            Department response = departmentRepository.save(department);
            return response;
        }

    }

    @Override
    public Department updateDepartment(DepartmentDTO departmentDTO) {
        Department department = departmentRepository.findById(departmentDTO.getId()).orElseThrow(() -> new RuntimeException("Category not found"));

        department.setName(departmentDTO.getName());
        departmentRepository.save(department);
        return department;
    }

    @Override
    public boolean deleteDepartment(int id) {
        Department department = departmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Department not found"));
        if (department.getStatus().equalsIgnoreCase(Status.STATUS_DELETED)) {
            throw new RuntimeException("Department have deleted before");
        } else {
            boolean result = departmentRepository.deleteDepartment(id);
            return result;
        }
    }
}
