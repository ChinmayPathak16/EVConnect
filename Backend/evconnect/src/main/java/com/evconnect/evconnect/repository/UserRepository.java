package com.evconnect.evconnect.repository;

import com.evconnect.evconnect.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}