package com.congthanh.project.dto.recruitment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewSessionDTO   {

    private Long id;

    private String candidateId;

    private String status;

}
