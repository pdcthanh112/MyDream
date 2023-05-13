package com.congthanh.project.dto.management;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String accountId;
    private String email;
}
