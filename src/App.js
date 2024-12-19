import React from "react";
import "./App.css";
import AppRoutes from "./Routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
// import NotificationDisplay from "./Hub/NotificationDisplay";
function App() {
  return (
    <Router>
      {/* <NotificationDisplay /> */}
      <ReactNotifications />
      <AppRoutes />
    </Router>
  );
}

export default App;
