package com.evconnect.evconnect.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class NearbyOwnerResponse {

    private Long id;
    private String name;
    private String chargerType;
    private Double pricePerHour;
    private Double latitude;
    private Double longitude;
    private Double distanceKm;
}