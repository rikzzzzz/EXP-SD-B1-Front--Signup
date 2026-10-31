
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser, logoutUser } from "../services/authService.js";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        setError(err.message || "Unable to load profile.");

        // If token is invalid or expired, clear it.
        logoutUser();
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  function handleLogout() {
    logoutUser();
    navigate("/login", { replace: true });
  }

  if (loading) {
    return <p>Loading your profile...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate("/login")}>
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <p><strong>ID:</strong> {user?.id}</p>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
