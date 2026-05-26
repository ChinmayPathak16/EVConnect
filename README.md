# EVConnect ⚡

EVConnect is a full-stack EV charging station booking platform that connects electric vehicle users with nearby private charging station owners.

The platform allows EV users to search for nearby chargers, view distance and location details, book an available charger, and mark charging as completed. Private charger owners can register their charging stations and make them available for users.

---

## Problem Statement

As electric vehicle adoption grows, finding nearby charging stations remains a challenge, especially in emergencies or residential areas where public infrastructure is limited.

EVConnect solves this by enabling individuals with private EV charging ports to rent them out, creating a peer-to-peer charging ecosystem.

---

## Features

### User Portal
- User registration
- Search nearby charging stations
- Real-time road distance calculation
- View charger details:
  - Owner Name
  - Charger Type
  - Price per Hour
  - Distance
  - Latitude
  - Longitude
- Book charger
- Only one active booking allowed per user
- Mark charging as completed

### Owner Portal
- Owner registration
- Add charging station details
- Store charger information in database
- Make charging station available to users

---

## Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM

### Backend
- Spring Boot
- Java
- REST APIs

### Database
- MySQL

### External API
- OSRM (Open Source Routing Machine)
  - Used for road-based distance calculation

---

## Project Architecture

```text
EVConnect
│
├── Backend
│   └── Spring Boot Application
│
├── Frontend
│   └── React Application
│
└── MySQL Database
