package com.example.SpringSecurity.repository;


import com.example.SpringSecurity.model.MemberModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberModel, Integer> {
    Optional<MemberModel> findByUsername(String username);

}
