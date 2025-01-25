package com.example.betting_system.controller;

import com.example.betting_system.model.Notice;
import com.example.betting_system.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    @Autowired
    private NoticeRepository noticeRepository;

    // Directory to save uploaded files
    private static final String UPLOAD_DIR = "uploads/";

    /**
     * Add a new notice with file upload (Admin only).
     */
    @PostMapping
    public ResponseEntity<String> addNotice(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("file") MultipartFile file) {

        try {
            // Check if the directory exists, if not, create it
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            if (!isValidFileType(file.getOriginalFilename())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file type!");
            }

            if (file.getSize() > 5 * 1024 * 1024) { // 5 MB limit
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File size exceeds the limit of 5 MB!");
            }

            // Save the uploaded file
            String fileName = file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.write(filePath, file.getBytes());

            // Save the notice to the database
            Notice notice = new Notice();
            notice.setTitle(title);
            notice.setDescription(description);
            notice.setFilePath(filePath.toString());
            noticeRepository.save(notice);

            return ResponseEntity.ok("Notice added successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
        }
    }

    /**
     * Get all notices (Accessible to all users).
     */
    @GetMapping
    public ResponseEntity<List<Notice>> getAllNotices() {
        List<Notice> notices = noticeRepository.findAll();
        return ResponseEntity.ok(notices);
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/{id}")
    public ResponseEntity<String> updateNotice(
            @PathVariable Long id,
            @RequestBody Notice updatedNotice) {

        Optional<Notice> optionalNotice = noticeRepository.findById(id);
        if (optionalNotice.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Notice existingNotice = optionalNotice.get();
        existingNotice.setTitle(updatedNotice.getTitle());
        existingNotice.setDescription(updatedNotice.getDescription());
        existingNotice.setFilePath(updatedNotice.getFilePath());

        noticeRepository.save(existingNotice);

        return ResponseEntity.ok("Notice updated successfully!");
    }

   // @Secured("ROLE_ADMIN")
    // Delete Notice
    @DeleteMapping
    public ResponseEntity<String> deleteNotice() {
        /*if (!noticeRepository.existsById(id)) {
            System.out.println("No Notice Found");
            return ResponseEntity.notFound().build();
        }*/

        noticeRepository.deleteAll();
        return ResponseEntity.ok("Notice deleted successfully!");
    }

    private boolean isValidFileType(String filename) {
        String[] allowedExtensions = { ".jpg", ".jpeg", ".png", ".pdf", ".docx" };
        for (String ext : allowedExtensions) {
            if (filename != null && filename.toLowerCase().endsWith(ext)) {
                return true;
            }
        }
        return false;
    }
}
