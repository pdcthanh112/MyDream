package com.congthanh.project.service.ecommerce;

import com.congthanh.project.dto.ecommerce.VoucherDTO;

public interface VoucherService {

    VoucherDTO getVoucherByCode(String code);

    VoucherDTO createVoucher(VoucherDTO voucherDTO);

    boolean checkValidVoucher(String code);
}
