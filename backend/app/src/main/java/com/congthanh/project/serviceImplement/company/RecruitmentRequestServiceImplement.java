package com.congthanh.project.serviceImplement.company;

import com.congthanh.project.dto.company.RecruitmentRequestDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.company.RecruitmentRequest;
import com.congthanh.project.service.company.RecruitmentRequestService;
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
