import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';
import NextPage from './components/NextPage/NextPage';
import Test from './components/NextPage/Test';
import Weather from './components/Tabs/weather';
import {BrowserRouter, Routes, Route} from "react-router-dom"
// App.js
 // Import the Dashboard component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/LoginSignup' element={<LoginSignup />}></Route>
        <Route path='/NextPage' element={<NextPage />}></Route>
        <Route path='/Test' element={<Test />}></Route>
        <Route path='/Weather' element={<Weather />}></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;