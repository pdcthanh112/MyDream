package com.congthanh.project.repository.ecommerce.voucher;

import com.congthanh.project.entity.ecommerce.Voucher;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface VoucherCustomRepository {

    Voucher getVoucherByCode(String code);
}
