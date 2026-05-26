package com.evconnect.evconnect.controller;

import com.evconnect.evconnect.entity.Owner;
import com.evconnect.evconnect.model.NearbyOwnerResponse;
import com.evconnect.evconnect.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/owners")
@CrossOrigin("*")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @PostMapping("/register")
    public Owner registerOwner(@RequestBody Owner owner) {
        return ownerService.registerOwner(owner);
    }

    @GetMapping("/all")
    public List<Owner> getAllOwners() {
        return ownerService.getAllOwners();
    }

    @GetMapping("/nearby")
    public List<NearbyOwnerResponse> findNearbyOwners(
            @RequestParam double userLat,
            @RequestParam double userLon,
            @RequestParam double maxKm
    ) {
        return ownerService.findNearbyOwners(userLat, userLon, maxKm);
    }

    @PutMapping("/book")
    public String bookCharger(
            @RequestParam Long userId,
            @RequestParam Long ownerId
    ) {
        return ownerService.bookCharger(userId, ownerId);
    }

    @PutMapping("/release")
    public String releaseCharger(
            @RequestParam Long userId
    ) {
        return ownerService.releaseCharger(userId);
    }
}