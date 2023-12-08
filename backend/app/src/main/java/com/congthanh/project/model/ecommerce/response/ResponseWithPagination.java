package com.congthanh.project.model.ecommerce.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseWithPagination<T> {

  private int totalPage;

  private List<T> responseList;

}
