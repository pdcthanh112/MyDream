package com.congthanh.project.controller.ecommerce;

import com.congthanh.project.constant.common.ResponseStatus;
import com.congthanh.project.dto.ecommerce.VoucherDTO;
import com.congthanh.project.model.ecommerce.response.ErrorDTO;
import com.congthanh.project.model.ecommerce.response.Response;
import com.congthanh.project.service.ecommerce.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ecommerce/voucher")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @GetMapping("/getByCode")
    public ResponseEntity<Object> getVoucherByCode(@RequestParam("code") String code) {
        VoucherDTO data = voucherService.getVoucherByCode(code);
        if (data == null) {
            ErrorDTO error = new ErrorDTO();
            error.setErrorCode(40404);
            error.setMessage("not found code");
            error.setStatus(ResponseStatus.STATUS_FAILED);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
        Response<VoucherDTO> response = new Response<>();
        response.setData(data);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Get all successfully");
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/create")
    public ResponseEntity<Response<VoucherDTO>> createVoucher(@RequestBody VoucherDTO voucherDTO) {
        VoucherDTO data = voucherService.createVoucher(voucherDTO);
        Response<VoucherDTO> response = new Response<>();
        response.setData(data);
        response.setStatus(ResponseStatus.STATUS_SUCCESS);
        response.setMessage("Created successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/checkValid")
    public ResponseEntity<String> validateVoucher(@RequestParam("code") String code) {
        boolean isVoucherValid = voucherService.checkValidVoucher(code);

        if (isVoucherValid) {
            return ResponseEntity.ok("Voucher is valid");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Voucher is not valid");
        }
    }
}
