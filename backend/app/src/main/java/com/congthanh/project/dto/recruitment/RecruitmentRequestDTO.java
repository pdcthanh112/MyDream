package com.congthanh.project.dto.recruitment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruitmentRequestDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String name;

    private int amount;

    private String address;

    private Date expiriedDate;

    private String description;

    private String requirement;

    private String benefit;
}
