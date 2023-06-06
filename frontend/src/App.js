// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BookingForm from "./pages/BookingForm";
import BookedRides from "./pages/BookingForm/list";

function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <BookingForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <PrivateRoute>
                <BookingForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings-list"
            element={
              <PrivateRoute>
                <BookedRides />
              </PrivateRoute>
            }
          />
        </Routes>
    </Router>
  );
}

export default App;
