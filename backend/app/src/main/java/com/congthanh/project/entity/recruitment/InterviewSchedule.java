package com.congthanh.project.entity.recruitment;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "interview_schedule")
public class InterviewSchedule implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String candidateId;

    private String type;

    private String address;

    private Date date;

    private Time time;

    private String linkMeeting;

    private String room;

    private int round;

    private String status;
}
