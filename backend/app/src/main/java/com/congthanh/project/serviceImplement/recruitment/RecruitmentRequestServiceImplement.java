package com.congthanh.project.serviceImplement.recruitment;

import com.congthanh.project.dto.recruitment.RecruitmentRequestDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.recruitment.RecruitmentRequest;
import com.congthanh.project.service.recruitment.RecruitmentRequestService;
import org.springframework.stereotype.Service;

@Service
public class RecruitmentRequestServiceImplement implements RecruitmentRequestService {
    @Override
    public ResponseWithTotalPage<RecruitmentRequestDTO> getAllRecruitmetRequest(int pageNo, int pageSize) {
        return null;
    }

    @Override
    public RecruitmentRequest createRecruitmentRequest(RecruitmentRequestDTO recruitmentRequestDTO) {
        return null;
    }

    @Override
    public RecruitmentRequest updateRecruitmentRequest(RecruitmentRequestDTO recruitmentRequestDTO) {
        return null;
    }

    @Override
    public boolean deleteRecruitmentRequest(int id) {
        return false;
    }
}
