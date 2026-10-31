import { Navigate, Route, Routes } from "react-router-dom";

import Register from "./pages/Register.jsx";
import SignIn from "./pages/SignIn.jsx";
import Success from "./pages/Success.jsx";
import Profile from "./pages/Profile.jsx";
export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/register" replace />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/signin"
        element={<SignIn />}
      />
      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/success"
        element={<Success />}
      />

      <Route
        path="*"
        element={<Navigate to="/register" replace />}
      />
    </Routes>
  );
}