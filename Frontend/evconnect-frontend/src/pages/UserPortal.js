import React, { useState } from "react";
import api from "../services/api";

function UserPortal() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    vehicleName: "",
    numberPlate: ""
  });

  const [userId, setUserId] = useState(null);
  const [userLat, setUserLat] = useState("");
  const [userLon, setUserLon] = useState("");
  const [owners, setOwners] = useState([]);
  const [activeOwnerId, setActiveOwnerId] = useState(null);

  const handleRegister = async () => {
    const response = await api.post("/users/register", user);
    setUserId(response.data.id);
    alert("User Registered Successfully");
  };

  const searchNearby = async () => {
    const response = await api.get(
      `/owners/nearby?userLat=${userLat}&userLon=${userLon}&maxKm=10`
    );
    setOwners(response.data);
  };

  const handleBook = async (ownerId) => {
    const response = await api.put(
      `/owners/book?userId=${userId}&ownerId=${ownerId}`
    );

    alert(response.data);

    if (response.data === "Booking successful") {
      setActiveOwnerId(ownerId);
    }
  };

  const handleDone = async () => {
    const response = await api.put(
      `/owners/release?userId=${userId}`
    );

    alert(response.data);
    setActiveOwnerId(null);
    searchNearby();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Portal</h1>

      <h2>Register User</h2>

      <input
        placeholder="Name"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <br />

      <input
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <br />

      <input
        placeholder="Phone"
        onChange={(e) => setUser({ ...user, phone: e.target.value })}
      />
      <br />

      <input
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <br />

      <input
        placeholder="Vehicle Name"
        onChange={(e) => setUser({ ...user, vehicleName: e.target.value })}
      />
      <br />

      <input
        placeholder="Number Plate"
        onChange={(e) => setUser({ ...user, numberPlate: e.target.value })}
      />
      <br />

      <button onClick={handleRegister}>Register</button>

      <hr />

      <h2>Search Nearby Chargers</h2>

      <input
        placeholder="Latitude"
        value={userLat}
        onChange={(e) => setUserLat(e.target.value)}
      />
      <br />

      <input
        placeholder="Longitude"
        value={userLon}
        onChange={(e) => setUserLon(e.target.value)}
      />
      <br />

      <button onClick={searchNearby}>Search</button>

      <hr />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Owner ID</th>
            <th>Owner</th>
            <th>Charger Type</th>
            <th>Price/hr</th>
            <th>Distance</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Book</th>
            <th>Done</th>
          </tr>
        </thead>

        <tbody>
          {owners.map((owner, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{owner.name}</td>
              <td>{owner.chargerType}</td>
              <td>{owner.pricePerHour}</td>
              <td>{owner.distanceKm}</td>
              <td>{owner.latitude}</td>
              <td>{owner.longitude}</td>
            
                <td>
                    <button
                        disabled={activeOwnerId !== null}
                        onClick={() => handleBook(owner.id)}
                    >
                        Book
                    </button>
                </td>

                <td>
                    <button
                        disabled={activeOwnerId !== owner.id}
                        onClick={handleDone}
                    >
                        Done
                    </button>
                </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserPortal;