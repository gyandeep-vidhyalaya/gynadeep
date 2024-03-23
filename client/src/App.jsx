import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import Home from './screens/Home'
import AdminLogin from './screens/AdminLogin'
import Admin from './screens/Admin';
import Activities from './screens/Activities';
import AboutUs from './screens/AboutUs';
import Results from './screens/Results';
import ActivityPage from './screens/ActivityPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/admin' element={<AdminLogin/>}/>
        <Route exact path='/settings' element={<Admin/>}/>
        <Route exact path='/activities' element={<Activities/>}/>
        <Route exact path='/results' element={<Results/>}/>
        <Route exact path='/aboutus' element={<AboutUs/>}/>
        <Route exact path='/activity/:id' element={<ActivityPage/>}/> {/* Modified route */}
      </Routes>
    </Router>
  )
}

export default App;
