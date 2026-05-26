package com.evconnect.evconnect.repository;

import com.evconnect.evconnect.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
}