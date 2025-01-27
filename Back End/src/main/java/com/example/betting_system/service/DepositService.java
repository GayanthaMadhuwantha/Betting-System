package com.example.betting_system.service;

import com.example.betting_system.model.Deposit;
import com.example.betting_system.model.User;
import com.example.betting_system.repository.DepositRepository;
import com.example.betting_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class DepositService {

    @Autowired
    private DepositRepository depositRepository;

    @Autowired
    private UserRepository userRepository;

    private static final String SLIP_UPLOAD_DIR = "slips/";

    public void createDeposit(Long userId, Deposit.DepositMethod depositMethod, BigDecimal amount, MultipartFile slipFile) throws IOException {
        User user = userRepository.findById(userId).orElseThrow();

        Deposit deposit = new Deposit();
        deposit.setUser(user);
        deposit.setDepositMethod(depositMethod);
        deposit.setAmount(amount);
        deposit.setCreatedAt(LocalDateTime.now());

        if (depositMethod == Deposit.DepositMethod.BANK_TRANSFER && slipFile != null) {
            String fileName = storeSlipFile(slipFile);
            deposit.setSlipFilePath(fileName);
        }

        depositRepository.save(deposit);
    }

    public List<Deposit> getPendingDeposits() {
        return depositRepository.findByStatus(Deposit.DepositStatus.PENDING);
    }

    public void approveDeposit(Long id) {
        Deposit deposit = depositRepository.findById(id).orElseThrow();
        User user = deposit.getUser();

        user.setBalance(user.getBalance().add(deposit.getAmount()));
        userRepository.save(user);

        deposit.setStatus(Deposit.DepositStatus.APPROVED);
        deposit.setUpdatedAt(LocalDateTime.now());
        depositRepository.save(deposit);
    }

    private String storeSlipFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(SLIP_UPLOAD_DIR + fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, file.getBytes());
        return fileName;
    }

    public List<Deposit> getDepositsByUserId(Long userId) {
        return depositRepository.findByUserId(userId);
    }


}
