package com.evconnect.evconnect.service;

import com.evconnect.evconnect.entity.Owner;
import com.evconnect.evconnect.entity.User;
import com.evconnect.evconnect.model.NearbyOwnerResponse;
import com.evconnect.evconnect.repository.OwnerRepository;
import com.evconnect.evconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplate restTemplate;

    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }

    public Owner registerOwner(Owner owner) {
        owner.setIsAvailable(true);
        return ownerRepository.save(owner);
    }

    public List<NearbyOwnerResponse> findNearbyOwners(double userLat, double userLon, double maxKm) {

        List<Owner> owners = ownerRepository.findAll();
        List<NearbyOwnerResponse> result = new ArrayList<>();

        for (Owner owner : owners) {

            if (!owner.getIsAvailable()) {
                continue;
            }

            String url =
                    "http://router.project-osrm.org/route/v1/driving/"
                            + userLon + "," + userLat + ";"
                            + owner.getLongitude() + "," + owner.getLatitude()
                            + "?overview=false";

            try {
                Map response = restTemplate.getForObject(url, Map.class);

                List routes = (List) response.get("routes");

                if (routes != null && !routes.isEmpty()) {

                    Map route = (Map) routes.get(0);

                    double distanceKm = Math.round(
                            (((Number) route.get("distance")).doubleValue() / 1000) * 100.0
                    ) / 100.0;

                    if (distanceKm <= maxKm) {
                        result.add(
                                new NearbyOwnerResponse(
                                        owner.getId(),
                                        owner.getName(),
                                        owner.getChargerType(),
                                        owner.getPricePerHour(),
                                        owner.getLatitude(),
                                        owner.getLongitude(),
                                        distanceKm
                                )
                        );
                    }
                }

            } catch (Exception e) {
                System.out.println("OSRM failed for owner: " + owner.getName());
            }
        }

        return result;
    }

    public String bookCharger(Long userId, Long ownerId) {

        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Owner> ownerOptional = ownerRepository.findById(ownerId);

        if (userOptional.isEmpty() || ownerOptional.isEmpty()) {
            return "User or Owner not found";
        }

        User user = userOptional.get();
        Owner owner = ownerOptional.get();

        if (user.getHasActiveBooking()) {
            return "You already have an active booking";
        }

        if (!owner.getIsAvailable()) {
            return "Charger not available";
        }

        user.setHasActiveBooking(true);
        user.setBookedOwnerId(ownerId);

        owner.setIsAvailable(false);

        userRepository.save(user);
        ownerRepository.save(owner);

        return "Booking successful";
    }

    public String releaseCharger(Long userId) {

        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isEmpty()) {
            return "User not found";
        }

        User user = userOptional.get();

        if (!user.getHasActiveBooking()) {
            return "No active booking";
        }

        Optional<Owner> ownerOptional = ownerRepository.findById(user.getBookedOwnerId());

        if (ownerOptional.isPresent()) {
            Owner owner = ownerOptional.get();
            owner.setIsAvailable(true);
            ownerRepository.save(owner);
        }

        user.setHasActiveBooking(false);
        user.setBookedOwnerId(null);

        userRepository.save(user);

        return "Charging completed";
    }
}