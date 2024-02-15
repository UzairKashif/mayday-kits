import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';
import NextPage from './components/NextPage/NextPage';

import {BrowserRouter, Routes, Route} from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/LoginSignup' element={<LoginSignup />}></Route>
        <Route path='/NextPage' element={<NextPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;