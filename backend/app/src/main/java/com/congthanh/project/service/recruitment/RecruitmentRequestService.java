package com.congthanh.project.service.recruitment;

import com.congthanh.project.dto.recruitment.RecruitmentRequestDTO;
import com.congthanh.project.dto.response.ResponseWithTotalPage;
import com.congthanh.project.entity.recruitment.RecruitmentRequest;

public interface RecruitmentRequestService {

    public ResponseWithTotalPage<RecruitmentRequestDTO> getAllRecruitmetRequest(int pageNo, int pageSize);

    public RecruitmentRequest createRecruitmentRequest(RecruitmentRequestDTO recruitmentRequestDTO);

    public RecruitmentRequest updateRecruitmentRequest(RecruitmentRequestDTO recruitmentRequestDTO);

    public boolean deleteRecruitmentRequest(int id);

}
