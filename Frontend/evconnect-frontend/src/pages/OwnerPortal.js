import React, { useState } from "react";
import api from "../services/api";

function OwnerPortal() {
  const [owner, setOwner] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    latitude: "",
    longitude: "",
    chargerType: "",
    pricePerHour: ""
  });

  const handleRegister = async () => {
    try {
      await api.post("/owners/register", owner);
      alert("Owner Registered Successfully");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Owner Portal</h1>

      <input
        placeholder="Name"
        onChange={(e) => setOwner({ ...owner, name: e.target.value })}
      />
      <br />

      <input
        placeholder="Email"
        onChange={(e) => setOwner({ ...owner, email: e.target.value })}
      />
      <br />

      <input
        placeholder="Phone"
        onChange={(e) => setOwner({ ...owner, phone: e.target.value })}
      />
      <br />

      <input
        placeholder="Password"
        onChange={(e) => setOwner({ ...owner, password: e.target.value })}
      />
      <br />

      <input
        placeholder="Latitude"
        onChange={(e) => setOwner({ ...owner, latitude: e.target.value })}
      />
      <br />

      <input
        placeholder="Longitude"
        onChange={(e) => setOwner({ ...owner, longitude: e.target.value })}
      />
      <br />

      <input
        placeholder="Charger Type"
        onChange={(e) => setOwner({ ...owner, chargerType: e.target.value })}
      />
      <br />

      <input
        placeholder="Price Per Hour"
        onChange={(e) => setOwner({ ...owner, pricePerHour: e.target.value })}
      />
      <br />

      <button onClick={handleRegister}>Register Owner</button>
    </div>
  );
}

export default OwnerPortal;