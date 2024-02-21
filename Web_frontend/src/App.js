import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';
import NextPage from './components/NextPage/NextPage';

import {BrowserRouter, Routes, Route} from "react-router-dom"
// App.js
import Dashboard from './components/Dashboard/Dashboard'; // Import the Dashboard component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/LoginSignup' element={<LoginSignup />}></Route>
        <Route path='/' element={<Dashboard />}></Route> {/* Dashboard as the root or another path */}
      </Routes>
    </BrowserRouter>
  );
}


export default App;