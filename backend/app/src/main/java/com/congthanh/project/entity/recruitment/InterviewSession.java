package com.congthanh.project.entity.recruitment;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "interview_session")
public class InterviewSession implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String candidateId;

    private String status;
}
