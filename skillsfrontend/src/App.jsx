import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Homepage/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Matches from "./pages/Matches";
import Requests from "./pages/Requests";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserProfile from "./pages/UserProfile";
import Messaging from "./pages/Messaging";


function App() {
  return (
    <Router>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <Home />
            }
          />

          <Route
            path="/login"
            element={
              <Login />
            }
          />


          <Route
            path="/register"
            element={
              <Register />
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/matches"
            element={
              <PrivateRoute>
                <Matches />
              </PrivateRoute>
            }
          />

          <Route
            path="/requests"
            element={
              <PrivateRoute>
                <Requests />
              </PrivateRoute>
            }
          />

          <Route
            path="/user/:id"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            } />


          <Route
            path="/chat/:id"
            element={
              <PrivateRoute>
                <Messaging />
              </PrivateRoute>
            } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;