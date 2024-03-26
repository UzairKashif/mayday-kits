import "./App.css";
import LoginSignup from "./components/LoginSignup/login";
import Dashboard from "./components/Dashboard/Dashboard";
import Weather from "./components/Weather/weather";
import Firms from "./components/Firms/firms";
import "@radix-ui/themes/styles.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

// App.js
// Import the Dashboard component

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          {/* <Route path="/" element={<Navigate replace to="/Dashboard" />} /> */}

          <Route path="/login" element={<LoginSignup />}></Route>

          <Route
            path="/Dashboard"
            element={<Dashboard />}
            handler={Dashboard}
          ></Route>
          <Route path="/Weather" element={<Weather />}></Route>
          <Route path="/firms" element={<Firms />}></Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
