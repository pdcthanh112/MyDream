package com.congthanh.project.serviceImpl.ecommerce;

import com.congthanh.project.dto.ecommerce.VoucherDTO;
import com.congthanh.project.entity.ecommerce.Voucher;
import com.congthanh.project.model.ecommerce.mapper.VoucherMapper;
import com.congthanh.project.repository.ecommerce.voucher.VoucherRepository;
import com.congthanh.project.service.ecommerce.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;

@Service
public class VoucherServiceImpl implements VoucherService {

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private VoucherMapper voucherMapper;

    @Override
    public VoucherDTO getVoucherByCode(String code) {
        Voucher result = voucherRepository.getVoucherByCode(code);
        return voucherMapper.mapVoucherEntityToDTO(result);
    }

    @Override
    public VoucherDTO createVoucher(VoucherDTO voucherDTO) {
        Voucher existVoucher = voucherRepository.getVoucherByCode(voucherDTO.getCode());
        if(existVoucher != null) throw new RuntimeException("Code exits");
        Voucher voucher = Voucher.builder()
                .code(voucherDTO.getCode())
                .type(voucherDTO.getType())
                .value(voucherDTO.getValue())
                .usageLimit(voucherDTO.getUsageLimit())
                .description(voucherDTO.getDescription())
                .startDate(voucherDTO.getStartDate())
                .endDate(voucherDTO.getEndDate())
                .status("NEW")
                .createdDate(Instant.now().getEpochSecond())
                .updatedDate(Instant.now().getEpochSecond())
                .build();
        Voucher result = voucherRepository.save(voucher);
        return voucherMapper.mapVoucherEntityToDTO(result);
    }

    @Override
    public boolean checkValidVoucher(String code) {
        Voucher voucher = voucherRepository.getVoucherByCode(code);

        LocalDateTime currentDate = LocalDateTime.now();
        if(currentDate.isBefore(voucher.getStartDate()) || currentDate.isAfter(voucher.getEndDate())) return false;
        if(voucher.getUsageLimit() == 0) return false;
        return true;
    }
}
