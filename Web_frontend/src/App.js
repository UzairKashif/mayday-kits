import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Dashboard from './components/Dashboard/Dashboard';
import FirebaseAuth from './components/FirebaseAuth';
import Weather from './components/Weather/weather';
import Firms from './components/Firms/firms';
import '@radix-ui/themes/styles.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
// App.js
 // Import the Dashboard component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/LoginSignup' element={<LoginSignup />}></Route>
        <Route path='/Dashboard' element={<Dashboard />}></Route>
        <Route path='/auth' element={<FirebaseAuth/>}></Route>
        <Route path='/Weather' element={<Weather />}></Route>
        <Route path='/firms' element={<Firms/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}


export default App;