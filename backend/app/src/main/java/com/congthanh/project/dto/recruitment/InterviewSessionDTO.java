package com.congthanh.project.dto.recruitment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewSessionDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String candidateId;

    private String status;
}
